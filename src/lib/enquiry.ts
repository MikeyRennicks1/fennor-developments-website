/** Shared input limits; this module contains no server credentials. */
export const ENQUIRY_LIMITS = { name: 100, contact: 254, area: 120, details: 3000, topic: 120, context: 1800, page: 200, website: 200 } as const;

export type EnquiryPayload = Record<keyof typeof ENQUIRY_LIMITS, string> & { requestId: string };
export type ValidEnquiry = EnquiryPayload & { email: string; phone: string };
export type EnquiryValidation = { ok: true; value: ValidEnquiry } | { ok: false; error: string };

const emailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
const phonePattern = /^\+?[\d\s().-]+$/;
export const ENQUIRY_UNAVAILABLE = 'We could not confirm your enquiry was sent. Your details are still here. Please try again, email info@fennor.ie or call 089 403 2737.';

export function validateEnquiry(input: unknown): EnquiryValidation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, error: 'Please complete the enquiry form.' };
  const raw = input as Record<string, unknown>;
  const fields = {} as Record<keyof typeof ENQUIRY_LIMITS, string>;
  for (const [key, maximum] of Object.entries(ENQUIRY_LIMITS)) {
    const value = raw[key] ?? '';
    if (typeof value !== 'string' || value.length > maximum || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) return { ok: false, error: 'One of your entries is too long or contains unsupported characters. Please shorten it and try again.' };
    fields[key as keyof typeof ENQUIRY_LIMITS] = value.trim();
  }
  if (fields.website) return { ok: false, error: 'We could not accept this submission. Please contact Fennor directly.' };
  if (fields.name.length < 2 || /[\r\n]/.test(fields.name)) return { ok: false, error: 'Please enter your name (at least two characters).' };
  const email = emailPattern.test(fields.contact) ? fields.contact : '';
  const phone = !email && phonePattern.test(fields.contact) && fields.contact.replace(/\D/g, '').length >= 8 && fields.contact.replace(/\D/g, '').length <= 16 ? fields.contact : '';
  if (!email && !phone) return { ok: false, error: 'Please enter a valid email address or phone number so we can reply.' };
  if (/[\r\n]/.test(fields.contact + fields.topic + fields.area) || !fields.topic) return { ok: false, error: 'Please check your contact and project details.' };
  if (!/^\/[a-zA-Z0-9/_-]*$/.test(fields.page)) return { ok: false, error: 'Please reload this page and try again.' };
  if (typeof raw.requestId !== 'string' || !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(raw.requestId)) return { ok: false, error: 'Please reload this page and try again.' };
  return { ok: true, value: { ...fields, requestId: raw.requestId, email, phone } };
}

export function enquiryText(enquiry: ValidEnquiry) {
  return [
    'New Fennor website enquiry',
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email || 'Not supplied — use the phone number below'}`,
    `Phone: ${enquiry.phone || 'Not supplied'}`,
    `Town / county: ${enquiry.area || 'Not supplied'}`,
    `Topic: ${enquiry.topic}`,
    `Page: ${enquiry.page}`,
    '', 'Customer message:', enquiry.details || 'Please contact me about the project above.',
    ...(enquiry.context ? ['', 'Customer’s optional website tool choices (illustrative, not an agreed design):', enquiry.context] : []),
  ].join('\n');
}
