/** Public contact details shared by the website and its server-side email delivery. */
export const ENQUIRY_RECIPIENTS = ['info@fennor.ie', 'mikey@fennor.ie'] as const;

type EnquiryEmailOptions = {
  subject?: string;
  body?: string;
  primary?: (typeof ENQUIRY_RECIPIENTS)[number];
};

/** Opens the visitor's email app with both inboxes included; online forms use Resend. */
export function enquiryEmailHref({ subject, body, primary }: EnquiryEmailOptions = {}) {
  const recipients = primary ?? ENQUIRY_RECIPIENTS.join(',');
  const fields: [string, string][] = [];
  if (primary) fields.push(['cc', ENQUIRY_RECIPIENTS.filter(email => email !== primary).join(',')]);
  if (subject) fields.push(['subject', subject]);
  if (body) fields.push(['body', body]);
  const query = fields.map(([name, value]) => `${name}=${encodeURIComponent(value)}`).join('&');
  return `mailto:${recipients}${query ? `?${query}` : ''}`;
}
