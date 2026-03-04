/**
 * Reusable case study structure for solar, electrical and building projects.
 * Optional fields (systemInstalled, estimatedSavings, testimonial) support
 * all project types while keeping solar-specific details when relevant.
 */

export type CaseStudyServiceCategory = "solar" | "electrical" | "building";

export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudyTestimonial = {
  quote: string;
  author?: string;
  roleOrLocation?: string;
};

export type CaseStudyCta = {
  label: string;
  href: string;
};

export type CaseStudy = {
  /** Unique slug for URLs e.g. "solar-navan-estate" */
  slug: string;
  /** Project title e.g. "4.2 kWp solar PV, Navan estate" */
  projectTitle: string;
  /** Location e.g. "Navan, Co. Meath" */
  location: string;
  /** Service provided e.g. "Solar PV installation", "Electrical contracting", "Residential construction" */
  serviceProvided: string;
  /** Category for filtering and styling */
  serviceCategory: CaseStudyServiceCategory;
  /** Full project description */
  projectDescription: string;
  /** Optional: system installed (solar) or work completed (electrical/building). */
  systemInstalled?: string;
  /** Optional section title override e.g. "Work completed" for builds. */
  systemSectionTitle?: string;
  /** Optional: estimated savings (solar) or outcome (electrical/building). */
  estimatedSavings?: string;
  /** Optional section title override e.g. "Outcome" for builds. */
  outcomeSectionTitle?: string;
  /** Optional customer testimonial */
  testimonial?: CaseStudyTestimonial;
  /** Project images */
  images: CaseStudyImage[];
  /** Call to action (e.g. Get a quote) */
  cta: CaseStudyCta;
  /** Optional date or year for display */
  date?: string;
};
