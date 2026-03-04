/**
 * Case studies for solar, electrical and building projects.
 * Use with CaseStudyTemplate for full layout or CaseStudyCard for listings.
 */

import type { CaseStudy } from "@/types/case-study";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "solar-navan-estate",
    projectTitle: "4.2 kWp solar PV, Navan estate",
    location: "Navan, Co. Meath",
    serviceProvided: "Solar PV installation",
    serviceCategory: "solar",
    projectDescription:
      "We completed a 10-panel solar PV system with hybrid inverter for a family home in a Navan estate. The installation was completed in one day; the customer received SEAI grant approval and now uses the app to track production and self-consumption. The system is sized for typical household use with scope to add battery storage later.",
    systemInstalled: "10 panels, 4.2 kWp, hybrid inverter, monitoring app. Roof: slate.",
    estimatedSavings: "Typical payback in the area is around 5–7 years. Estimated €400–600 per year depending on usage.",
    testimonial: {
      quote: "From quote to completion it was straightforward. We got the SEAI grant and the app shows exactly what we're generating.",
      author: "Homeowner",
      roleOrLocation: "Navan",
    },
    images: [
      { src: "/gallery/701cb181-471b-460a-a597-47d5747746be.JPG", alt: "Solar PV installation – Fennor Developments", caption: "Array and inverter" },
      { src: "/gallery/9b052b60-22c8-4542-94ee-99e54eff97f6.JPG", alt: "Solar installation – Fennor Developments", caption: "Installation complete" },
      { src: "/gallery/b69fab46-e6ad-43a1-af45-86d856f768c4.JPG", alt: "Solar panels – Fennor Developments", caption: "Panels on roof" },
    ],
    cta: { label: "Get a solar quote", href: "/contact" },
    date: "2024",
  },
  {
    slug: "rewire-trim-period-home",
    projectTitle: "Full rewire, period home",
    location: "Trim, Co. Meath",
    serviceProvided: "Electrical contracting",
    serviceCategory: "electrical",
    projectDescription:
      "Complete rewire of a period property in Trim, including new consumer unit, full house wiring and certification. The homeowner wanted a future-proof setup ready for solar and EV. We coordinated with other trades and delivered to schedule with full documentation for insurance and resale.",
    systemInstalled: "New consumer unit, full rewire, RCBO protection, solar-ready and EV-ready circuits.",
    systemSectionTitle: "Work completed",
    estimatedSavings: "Fully certified and documented for insurance and resale. Property ready for solar and EV installation.",
    outcomeSectionTitle: "Outcome",
    testimonial: {
      quote: "Professional from start to finish. We have the paperwork we need and the house is ready for solar when we are.",
      author: "Homeowner",
      roleOrLocation: "Trim",
    },
    images: [
      { src: "/gallery/701cb181-471b-460a-a597-47d5747746be.JPG", alt: "Electrical installation – Fennor Developments", caption: "Consumer unit" },
    ],
    cta: { label: "Get an electrical quote", href: "/contact" },
    date: "2024",
  },
  {
    slug: "one-off-build-meath",
    projectTitle: "One-off house build, plot to handover",
    location: "Co. Meath",
    serviceProvided: "Residential construction",
    serviceCategory: "building",
    projectDescription:
      "Turnkey one-off house build from plot to handover. We managed the full project with one point of contact, including electrical and solar integration so the home was energy-efficient and solar-ready from day one. Structured project management and clear documentation throughout.",
    systemInstalled: "Full build, electrical first and second fix, solar-ready wiring, BER target A2.",
    systemSectionTitle: "Work completed",
    estimatedSavings: "Handover on schedule. BER A2 achieved. Home solar-ready and future-proofed.",
    outcomeSectionTitle: "Outcome",
    testimonial: {
      quote: "One team from start to finish made it much simpler. We moved in on the date we were given.",
      author: "Homeowner",
      roleOrLocation: "Meath",
    },
    images: [
      { src: "/gallery/b69fab46-e6ad-43a1-af45-86d856f768c4.JPG", alt: "New build – Fennor Developments", caption: "Build complete" },
    ],
    cta: { label: "Enquire about your build", href: "/contact?enquiry=build" },
    date: "2024",
  },
];

/** Get a case study by slug. */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Get all case studies, optionally filtered by category. */
export function getCaseStudies(category?: CaseStudy["serviceCategory"]): CaseStudy[] {
  if (category) return CASE_STUDIES.filter((c) => c.serviceCategory === category);
  return [...CASE_STUDIES];
}
