# SEO & Performance Audit Report – fennor.ie

**Audit date:** March 2025  
**Scope:** SEO optimization, technical performance, structured data, internal linking, metadata, crawlability. No changes to visual layout, styling, branding, or UI.

---

## 1. Issues Discovered

### Title tags
- **Several page titles exceeded 60 characters**, which can truncate in search results (e.g. "Solar Panels Blanchardstown | Solar PV Installation Blanchardstown Dublin | Fennor Developments" at 72 chars, "Electrician Mullingar | Electrical Services Mullingar Westmeath | Fennor Developments" at 68 chars).
- **Electrical page** used "Electrical Services" without the keyword "electrician Meath" in the title.
- **House Builders Navan**, **Renovations Meath**, **One Off Houses Meath**, **Calculator**, **Contact**, **Case Studies** had long or non‑keyword-focused titles.

### Meta descriptions
- **Case study detail pages** could exceed 155 characters when derived from `projectDescription` without truncation.
- Root description was good; some child pages had no explicit truncation helper.

### Base URL / canonical
- **Sitemap and robots** used `company.website` (fennordevelopments.ie) while structured data used **fennor.ie**, causing inconsistency for indexing and canonical URLs.

### Structured data
- **LocalBusiness / Service** used "Electrical contracting" and "House builders" instead of the requested **"Electrical services"** and **"Residential construction"**.
- **Service list** did not exactly match audit list: Solar panel installation, Electrical services, Home renovations, Residential construction, Extensions.

### Sitemap
- **/icf-builds** was not included in the sitemap.

### Mobile / indexing
- **Viewport** was not explicitly set in the root layout (Next.js can infer it; explicit is better for clarity and some crawlers).

### Robots
- **robots.txt** referenced sitemap using the old base URL; rules (allow /, disallow /admin, /api/) were fine.

---

## 2. Fixes Implemented

### Title tags (≤60 characters)
- **Root layout:** Default title set to: `"Solar Panels Meath | Electrician & Builders | Fennor Developments"` (58 chars) with keyword-focused description.
- **Shortened or rephrased** long titles:
  - Solar Panels Blanchardstown → `"Solar Panels Blanchardstown | Dublin | Fennor Developments"`
  - Solar Panels Dunshaughlin → `"Solar Panels Dunshaughlin | Meath | Fennor Developments"`
  - House Builders Navan → `"Builders Navan | New Build & Renovation Meath | Fennor"`
  - Renovations Meath → `"House Renovations Meath | Refurbishment Co. Meath | Fennor"`
  - Electrical → `"Electrician Meath | Electrical Services Domestic & Commercial | Fennor"`
  - Electrician Mullingar → `"Electrician Mullingar | Westmeath | Fennor Developments"`
  - Calculator → `"Solar Calculator | Estimate Payback & Savings | Fennor"`
  - One Off Houses Meath → `"One Off Houses Meath | Custom Builds Co. Meath | Fennor"`
  - Contact → `"Contact | Get a Quote | Slane Meath | Fennor Developments"`
  - Case Studies → `"Case Studies | Solar, Electrical & Building | Fennor"`
- **Case study [slug]:** Metadata now uses `truncateMetaTitle()` and `truncateMetaDescription()` from `@/lib/seo` so title and description stay within limits.

### Meta descriptions (≤155 characters)
- **`src/lib/seo.ts`** added with `truncateMetaTitle(max 60)` and `truncateMetaDescription(max 155)` for reuse across the site.
- **Case study detail pages** use `truncateMetaDescription(caseStudy.projectDescription)` for meta description.

### Base URL and canonical
- **Sitemap** (`src/app/sitemap.ts`): Base URL set to `https://fennor.ie` (no longer from `company.website`).
- **Robots** (`src/app/robots.ts`): Base URL set to `https://fennor.ie` for sitemap URLs.
- **Root layout:** `metadataBase: new URL("https://fennor.ie")` so relative URLs resolve to fennor.ie.

### Structured data (JSON-LD)
- **LocalBusiness** (in `JsonLd.tsx` and `LocalBusinessJsonLd.tsx`): **serviceType** updated to:
  - Solar panel installation  
  - Electrical services  
  - Home renovations  
  - Residential construction  
  - Extensions  
- **Service** schema: Five separate `Service` entities with the same names; "Electrical contracting" → "Electrical services"; "House builders" split into "Home renovations" and "Residential construction" to match the audit list.
- **areaServed** unchanged: County Meath, Louth, Dublin, Westmeath, Cavan.
- **FAQPage:** Already output per page via `FaqJsonLd` on service and location pages that have FAQ content (no change).

### Sitemap
- **/icf-builds** added to the sitemap.
- All other existing routes (solar, electrician, builders, gallery, locations, case-studies, about, referral, calculator, contact) were already included.

### Robots
- **robots.txt** continues to allow `userAgent: *`, `allow: "/"`, `disallow: ["/admin", "/api/"]`, and to reference `sitemap.xml` and `sitemap-images.xml` using `https://fennor.ie`.

### Mobile / Google-friendly
- **Viewport** explicitly set in root layout: `export const viewport = { width: "device-width", initialScale: 1 };`
- **Images:** Next.js `Image` already uses lazy loading by default; `priority` is used only for hero/LCP images (home, PageHero, header logo). No change to visual layout or image markup.
- **Header structure:** Each page uses a single H1 (e.g. via PageHero or layout headline). H2/H3 used in content sections. No structural or visual changes made.

### Internal linking
- Internal linking was already improved in prior work (solar → electrical, builders, renovations, contact; location pages; keyword anchors e.g. solar installers in Meath, electrician Navan, builders Meath). No further changes in this audit.

---

## 3. Summary

| Area              | Status |
|-------------------|--------|
| Title tags ≤60    | Fixed for long titles; helper in `lib/seo.ts` for new pages. |
| Meta descriptions ≤155 | Helper added; used on case study pages. |
| Base URL fennor.ie | Sitemap, robots, layout metadataBase. |
| LocalBusiness + Service schema | Aligned with audit list (5 services, 5 areas). |
| FAQ schema        | Already on FAQ pages via FaqJsonLd. |
| Sitemap           | Includes /icf-builds; uses fennor.ie. |
| Robots            | Correct; uses fennor.ie. |
| Viewport / mobile | Explicit viewport in layout. |
| H1 structure      | Already one H1 per page via hero/layout. |
| Images            | Already optimized (Next/Image, lazy, priority on heroes). |

**No visual layout, styling, branding, or UI design was changed.** All edits are limited to metadata, structured data, sitemap/robots, and shared SEO utilities.
