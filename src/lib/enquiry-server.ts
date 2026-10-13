import { createHmac, randomBytes } from 'node:crypto';
import { ENQUIRY_RECIPIENTS } from '../config/contact';
import { ENQUIRY_UNAVAILABLE, enquiryText, validateEnquiry } from './enquiry';

const MAX_BODY_BYTES = 16000;
const RATE_WINDOW_MS = 15 * 60 * 1000;
type Bucket = { count: number; expires: number };

/** Best-effort per-process guard, not a distributed/serverless rate-limit guarantee. */
export function createEnquiryRateLimiter(now = Date.now) {
  const buckets = new Map<string, Bucket>();
  const salt = randomBytes(32);
  return (address: string) => {
    const time = now();
    for (const [key, bucket] of buckets) if (bucket.expires <= time) buckets.delete(key);
    const key = createHmac('sha256', salt).update(address).digest('hex');
    const bucket = buckets.get(key);
    if (bucket && bucket.count >= 5) return false;
    if (bucket) bucket.count += 1;
    else {
      if (buckets.size >= 5000) return false;
      buckets.set(key, { count: 1, expires: time + RATE_WINDOW_MS });
    }
    return true;
  };
}

type Dependencies = {
  fetch?: typeof fetch;
  env?: { RESEND_API_KEY?: string; RESEND_FROM?: string; VERCEL?: string };
  allowRequest?: (address: string) => boolean;
};

function response(data: Record<string, unknown>, status: number, extraHeaders?: Record<string, string>) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...extraHeaders } });
}

async function readBoundedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) { await reader.cancel(); throw new Error('body-too-large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks).toString('utf8');
}

/** Injected dependencies let tests exercise delivery without touching a real inbox. */
export function createEnquiryHandler(dependencies: Dependencies = {}) {
  const fetchEmail = dependencies.fetch ?? fetch;
  const allowRequest = dependencies.allowRequest ?? createEnquiryRateLimiter();
  return async function POST(request: Request) {
    const env = dependencies.env ?? process.env;
    const origin = request.headers.get('origin');
    if (origin !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') return response({ error: 'Please send your enquiry from the Fennor website.' }, 403);
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return response({ error: 'This form could not be read. Please reload the page.' }, 415);
    if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) return response({ error: 'Your message is too long. Please shorten it.' }, 413);
    // Vercel overwrites this header at its edge; do not trust arbitrary forwarded IPs elsewhere.
    const address = env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown' : 'local-or-untrusted-proxy';
    if (!allowRequest(address)) return response({ error: `Too many attempts just now. Please wait 15 minutes, email ${ENQUIRY_RECIPIENTS.join(' and ')} or call 089 403 2737.` }, 429, { 'Retry-After': '900' });
    let parsed: unknown;
    try { parsed = JSON.parse(await readBoundedBody(request)); }
    catch (error) { return response({ error: error instanceof Error && error.message === 'body-too-large' ? 'Your message is too long. Please shorten it.' : 'This form could not be read. Please reload the page.' }, error instanceof Error && error.message === 'body-too-large' ? 413 : 400); }
    const validation = validateEnquiry(parsed);
    if (!validation.ok) return response({ error: validation.error }, 400);
    const key = env.RESEND_API_KEY?.trim();
    const from = env.RESEND_FROM?.trim();
    // Only an explicitly configured Fennor-domain sender may send; Resend verifies it.
    if (!key || !from || /[\r\n]/.test(from) || !/^(?:[^<>]+\s*<)?[^\s<>@]+@(?:[a-z\d-]+\.)*fennor\.ie>?$/i.test(from)) return response({ error: ENQUIRY_UNAVAILABLE }, 503);
    const enquiry = validation.value;
    try {
      const delivered = await fetchEmail('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `fennor-enquiry-${enquiry.requestId}` },
        body: JSON.stringify({ from, to: ENQUIRY_RECIPIENTS, ...(enquiry.email ? { reply_to: enquiry.email } : {}), subject: `Website enquiry: ${enquiry.topic}`, text: enquiryText(enquiry) }),
        signal: AbortSignal.timeout(12000),
      });
      const result = await delivered.json().catch(() => null) as { id?: unknown } | null;
      if (!delivered.ok || typeof result?.id !== 'string' || !result.id) return response({ error: ENQUIRY_UNAVAILABLE }, 502);
      return response({ success: true, message: 'Your enquiry has been accepted for delivery to Fennor. We will review your plans and contact you to agree the next step.' }, 200);
    } catch { return response({ error: ENQUIRY_UNAVAILABLE }, 502); }
  };
}
