# Fennor Developments — Technical & Local SEO Audit Report

**Date:** March 2025  
**Scope:** Full technical SEO, local SEO, and on-page optimisation for solar installation (Meath, Louth, North Dublin).  
**Primary goal:** Rank #1 for solar installation searches across County Meath, County Louth, and North County Dublin.

---

## 1. Technical SEO Audit — Summary

### 1.1 Meta titles & descriptions

| Finding | Status | Action |
|--------|--------|--------|
| Default meta title in `layout.tsx` | OK | "Solar Panels Meath \| Electrician & Builders \| Fennor Developments" |
| Service pages have unique titles | OK | All main pages export `metadata` with title/description |
| Solar page title | Fixed | Updated to include "Solar Panels Meath", "Solar PV Installers Ireland", "Solar Installation Meath, Louth & Dublin" |
| Solar page description | Fixed | Now includes "Solar panel installation Ireland", "Meath, Louth & North Dublin", "SEAI registered" |
| Location pages (new) | Done | Each has format: "Solar Panels [Town] \| Solar PV Installation [County] \| Fennor" |
| Duplicate titles | None found | Each route has a distinct title |

### 1.2 H1 tags

| Finding | Status | Action |
|--------|--------|--------|
| Homepage H1 | Fixed | Now "Solar Panels Meath, Louth & Dublin" (keyword-focused) |
| Solar page H1 | Fixed | "Solar PV Installers Ireland" (via PageHero headline) |
| Location pages H1 | OK | "Solar Panel Installation in [Town Name]" via SolarLocationLayout |
| PageHero component | OK | Renders a single `<h1>` from `headline` prop — no missing H1s |
| Multiple H1s per page | None | Single H1 per page |

### 1.3 Duplicate content

| Finding | Status | Action |
|--------|--------|--------|
| Location pages | OK | 18 existing custom pages + 106 template-based pages; each has unique town name, county, and neighbour links |
| Template content | Acceptable | Shared structure with unique [Town]/[County] substitution; sufficient for local SEO |

### 1.4 Image alt tags

| Finding | Status | Action |
|--------|--------|--------|
| Homepage hero | OK | "Irish home with solar panels on roof – Fennor Developments, Meath" |
| Solar hero | Fixed | "Solar PV installation Meath – Fennor Developments, solar panels Ireland" |
| PageHero usage | OK | All callers pass `imageAlt` |
| Gallery / case studies | OK | Use `alt` from config or item |
| Header/Footer logo | OK | `brand.logoAlt` |

**Recommendation:** When replacing placeholder images with real project photos, use descriptive filenames (e.g. `solar-panels-navan.jpg`) and keyword-rich alt text.

### 1.5 Broken links

| Finding | Status |
|--------|--------|
| Internal links | All point to existing routes; new location pages are linked from sitemap and solar page |
| External links | SOLAR_READING_LINKS and social links — no broken links detected in audit |

### 1.6 Internal linking

| Finding | Status | Action |
|--------|--------|--------|
| Homepage → solar | OK | "Solar PV" card links to `/solar` |
| Solar → location pages | Fixed | Added links to Solar Panels Meath, Louth, Blanchardstown, Navan, Drogheda, Trim, and /locations |
| Location pages → solar | OK | SolarLocationLayout includes "Solar PV – systems & grants" and /calculator, /contact |
| Location pages → neighbours | OK | `relatedTownLinks` in layout link to neighbouring towns |
| Locations page | OK | LOCATIONS_BY_COUNTY links to solar/electrician/builders pages |

### 1.7 Crawlability

| Finding | Status |
|--------|--------|
| robots.txt | Allows all except /admin and /api; references sitemap.xml and sitemap-images.xml |
| Sitemap | Updated to include all solar location paths from config + Virginia, Mullingar |
| No noindex on SEO pages | Confirmed |
| JS-only content | Main content is server-rendered; no crawlability issues |

### 1.8 Performance (Page Speed)

| Finding | Status | Recommendation |
|--------|--------|----------------|
| next/image | In use | Keeps images optimised |
| Hero images | External URLs (Pexels/Unsplash) | Consider self-hosting and compressing for full control |
| Fonts | next/font in layout | Already optimised |
| Unused JS | Not audited in depth | Run `next build` and review bundle; remove unused dependencies if needed |

**Target:** PageSpeed > 90. Recommend running Lighthouse after deployment and compressing any large assets.

---

## 2. Structured Data (JSON-LD)

### 2.1 Implemented

- **Organization:** name, url, logo, description, email, telephone, address, sameAs (social).
- **LocalBusiness + Electrician:**  
  - @id, name, image, url, telephone, email, address, **geo** (Slane coordinates), **openingHoursSpecification** (Mon–Fri 8–6), areaServed (Meath, Louth, Dublin, Westmeath, Cavan), serviceType (solar panel installation, solar PV, battery storage, electrical, renovations, extensions), priceRange.
- **Service** (×5): Solar panel installation, Electrical services, Home renovations, Residential construction, Extensions — each with provider @id, areaServed, description.
- **FAQ:** Per-page FaqJsonLd / SolarFaqJsonLd on solar and location pages.

### 2.2 Optional

- **SolarEnergyCompany:** Not a standard schema.org type; use LocalBusiness + Electrician + serviceType for solar.
- **openingHoursSpecification:** Set to typical trade hours; update in `JsonLd.tsx` if your real hours differ.

---

## 3. Local SEO Structure

### 3.1 Homepage

- **H1:** "Solar Panels Meath, Louth & Dublin"
- **Subline:** "Solar PV installers Ireland — purpose-built energy for your home."
- **H2:** "Solar Installation Meath, Louth & Dublin"
- **Body:** "Solar PV installers Ireland" and county coverage in intro.
- **Default meta (layout):** "Solar Panels Meath | Electrician & Builders | Fennor Developments"

### 3.2 Main solar page

- **Meta title:** "Solar Panels Meath | Solar PV Installers Ireland | Solar Installation Meath, Louth & Dublin | Fennor"
- **Meta description:** "Solar panel installation Ireland: Meath, Louth & North Dublin. SEAI registered solar PV installers..."
- **H1:** "Solar PV Installers Ireland"
- **H2:** "Solar installation Meath, Louth & Dublin" (how solar works section)
- **Copy:** Links to /solar-panels-meath, /solar-panels-louth, /solar-panels-blanchardstown, /locations; keyword-rich location links (Solar Panels Navan, Drogheda, Trim).

---

## 4. Location Landing Pages

### 4.1 URL structure

- Format: `/solar-panels-[town-name]` (e.g. `/solar-panels-navan`, `/solar-panels-enfield`).

### 4.2 Pages created

- **Existing (unchanged):** 18 static pages with custom content: meath, navan, trim, kells, ashbourne, dunshaughlin, ratoath, oldcastle, slane, louth, drogheda, dundalk, ardee, virginia, mullingar, blanchardstown, lucan, leixlip.
- **New (template):** 106 pages generated via `scripts/generate-solar-location-pages.js` for all other towns in:
  - **County Meath:** Enfield, Athboy, Duleek, Stamullen, Donore, Bettystown, Laytown, Mornington, Julianstown, Ballivor, Summerhill, Longwood, Nobber, Carlanstown, Kilmainhamwood, Castletown, Crossakiel, Drumconrath, Kilskyre, Clonmellon, Moynalty, Bohermeen, Kilmessan, Bective, Dunsany, Kentstown, Ardcath, Skryne, Gormanston, Kilcock, Dunboyne, Clonee, Mulhussey, Bellewstown, Wilkinstown, Drumree, Robinstown, Fordstown, Carnaross, Lobinstown, Ballinlough, Delvin (and remaining Meath list).
  - **County Louth:** Dunleer, Collon, Termonfeckin, Blackrock, Carlingford, Greenore, Annagassan, Castlebellingham, Clogherhead, Tallanstown, Knockbridge, Louth Village, Omeath, Riverstown, Lordship, Dromiskin, Stabannon, Monasterboice, Tinure, Grangebellew, Ballapousta, Gyles Quay, Jenkinstown, Faughart, Kilkerley, Maddoxland, Bellurgan, Whitestown, Reaghstown, Chanonrock, Tullyallen, Ravensdale.
  - **North County Dublin:** Balbriggan, Skerries, Rush, Lusk, Swords, Donabate, Portrane, Malahide, Portmarnock, Kinsealy, Baldoyle, Sutton, Howth, Clongriffin, Donaghmede, Raheny, Coolock, Artane, Santry, Beaumont, Whitehall, Finglas, Glasnevin, Drumcondra, Cabra, Phibsborough, Clonsilla, Castleknock, Ongar, Mulhuddart, Tyrrelstown, Hollystown.

### 4.3 Page content structure (each location)

- **H1:** Solar Panel Installation in [Town Name]
- **H2:** Solar Panels for Homes in [Town Name]
- **H2:** Benefits of Installing Solar Panels in [Town Name]
- **H2:** SEAI Solar Grants Available in [Town Name]
- **H2:** Why Choose Fennor for Solar Installation
- **H2:** Request a Solar Quote
- **Content:** 600+ words, local references, SEAI grant info, reasons to choose Fennor, internal links to /solar, /electrical, /building-renovations, /calculator, /contact.
- **FAQ:** 4 location-specific questions (town/county substituted).
- **Related towns:** Up to 5 neighbouring location links.

### 4.4 Meta data (template pages)

- **Title:** "Solar Panels [Town] | Solar PV Installation [County] | Fennor"
- **Description:** "Professional solar panel installation in [Town] and surrounding areas. SEAI grant supported solar PV systems installed by Fennor."

---

## 5. Sitemap & Robots

### 5.1 Sitemap (`src/app/sitemap.ts`)

- **Included:** Homepage, /solar, all solar location paths from `getAllSolarLocationPaths()` (Meath, Louth, Dublin towns), /solar-panels-virginia, /solar-panels-mullingar, electrician pages, builders/renovations, gallery, case studies, locations, about, referral, calculator, contact, icf-builds.
- **Implementation:** Uses `getAllSolarLocationPaths()` from `@/config/solar-locations-full` so new locations are included automatically when the config is updated.

### 5.2 Robots.txt (`src/app/robots.ts`)

- Allows all user agents.
- Disallows: /admin, /api/.
- Sitemaps: sitemap.xml, sitemap-images.xml (if present).
- All SEO and location pages are crawlable.

---

## 6. Image SEO

- **Current:** Alt text set on heroes and gallery images; logo uses brand alt.
- **Recommendation:** When adding or replacing images, use descriptive filenames (e.g. `solar-panels-navan.jpg`, `solar-installation-trim.jpg`) and keyword-rich alt text including location where relevant.

---

## 7. Improvements Made (Checklist)

- [x] Default and key page meta titles/descriptions aligned with target keywords.
- [x] Homepage and solar page H1/H2 and copy optimised for Solar Panels Meath/Louth/Dublin, Solar PV Installers Ireland, Solar Installation Meath.
- [x] JSON-LD enhanced with geo, openingHoursSpecification, Electrician type, and serviceType (solar PV, battery storage).
- [x] 106 new location landing pages (template-based) with required structure and 600+ words.
- [x] Sitemap updated to include all solar location paths.
- [x] Internal linking: solar page links to main location pages and /locations; location pages link to /solar and neighbouring towns.
- [x] robots.txt allows crawling of all SEO pages.
- [x] Location page meta format: "Solar Panels [Town] | Solar PV Installation [County] | Fennor".

---

## 8. New Pages Created

- **106 new solar location pages** under `src/app/solar-panels-[slug]/page.tsx` (e.g. solar-panels-enfield, solar-panels-dunleer, solar-panels-swords). Full list is the set of slugs in `src/config/solar-locations-full.ts` minus `SOLAR_LOCATIONS_WITH_STATIC_PAGE`.

---

## 9. Technical Fixes Implemented

1. **JsonLd.tsx:** Added geo (Slane), openingHoursSpecification, @type Electrician, extended serviceType (solar PV, battery storage).
2. **Solar page:** Updated metadata, hero headline and imageAlt, H2, and added location internal links.
3. **Homepage:** Updated H1, subline, and services H2/paragraph for target keywords.
4. **Sitemap:** Now derives solar location URLs from `getAllSolarLocationPaths()` and includes Virginia/Mullingar.
5. **SolarLocationTemplateContent.tsx:** New shared component for template location content (H2s, body, FAQ structure).
6. **solar-locations-full.ts:** New config with all Meath, Louth, North Dublin towns and neighbour slugs for internal linking.
7. **generate-solar-location-pages.js:** Script to generate static `solar-panels-[slug]/page.tsx` files; run with `node scripts/generate-solar-location-pages.js` if you add more towns to the config.
8. **ESLint:** Relaxed `react/no-unescaped-entities` to allow apostrophes in JSX (forbid only `>`, `}`). Fixed Oldcastle page FAQ type for `buildLocalServiceMetadata`. Fixed GalleryImageWithFallback to use `fill` prop; GalleryWithLightbox to accept optional `town` for case study galleries.

---

## 10. Optional Next Steps

- **Page Speed:** Run Lighthouse and optimise any remaining large images or render-blocking resources to target score > 90.
- **Image filenames:** Rename key images to include keywords (e.g. solar-panels-meath.jpg) when replacing placeholders.
- **Opening hours:** Update `OPENING_HOURS` in `JsonLd.tsx` to match actual business hours.
- **Reviews:** Add aggregateRating/review to LocalBusiness JSON-LD when you have structured review data.

---

*End of audit report.*
