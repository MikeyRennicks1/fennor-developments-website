# Fennor website preview

The new Fennor website: 52 service/content pages, plus privacy and company-information pages. Electrical now includes an overview, Domestic Electrical, Commercial Electrical, and Industrial Electrical & Maintenance.

## Preview deployment

This branch is for review, not a production launch. The existing `main` branch and live domains remain unchanged. Use the existing Vercel project with its Next.js framework integration and Node.js 24.x.

Install with `npm ci` and build with `npm run build`. Local development and preview use port 3100 (`npm run dev` or `npm start`). Vercel provides its own runtime.

## Private configuration

Configure `RESEND_API_KEY` and `RESEND_FROM` in the intended Vercel environment. Never commit credentials or expose them with a `NEXT_PUBLIC` prefix. The blank `.env.example` documents the required names. A real delivery check is still required before launch.

All online enquiry forms use the shared `/api/contact` handler, with server-owned recipients `info@fennor.ie` and `mikey@fennor.ie`. `RESEND_FROM` must use a verified sender on the Fennor domain; the handler intentionally does not fall back to Resend's onboarding sender. Direct email links open the visitor's email application with both recipients and are not sent through Resend.

Keep `FENNOR_SITE_LIVE` unset in Preview. Indexing remains disabled until a fresh, explicitly approved Production build passes the company/privacy launch guard. A previously built preview must not simply be promoted and assumed to become indexable.

## Before production

- Approve the final privacy notice and confirm actual data handling.
- Verify enquiry delivery to both company inboxes and the reply-to address.
- Resolve supplier-image permission and outstanding legacy-route decisions.
- Confirm an appropriate commercial hosting plan, domain configuration and rollback deployment.
- Recheck hosted mobile layouts, key journeys, redirects, metadata, robots and sitemap.

Research notes, QA captures, source footage and credentials are intentionally excluded from this deployment repository snapshot. The original local website folders are preserved separately. Calculators and visualisations are indicative, not surveys or guaranteed savings; project inspiration is not evidence of completed work.
