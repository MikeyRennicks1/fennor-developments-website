/**
 * Company contact details for PDFs, footer, and contact page.
 */

export const company = {
  name: "Fennor Developments Ltd",
  tagline: "Building Smarter. Powering the Future.",
  address: "Slane, Co. Meath, Ireland",
  // We show two contact emails across the website and PDFs.
  emails: ["info@fennor.ie", "mikey@fennor.ie"],
  // Backwards-compatible single-email field (prefer `company.emails` in new code).
  email: "info@fennor.ie",
  phone: "083 858 5498",
  phoneAlt: "086 192 1591",
  website: "https://www.fennor.ie",
  social: {
    facebook: "https://www.facebook.com/p/FennorDevelopments-61553207511388/",
    instagram: "https://www.instagram.com/fennordevelopments",
    linkedin: "https://www.linkedin.com/in/fennor-developments-78b245299/",
  },
} as const;
