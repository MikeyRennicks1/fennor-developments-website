/**
 * FAQ questions and answers for FAQPage structured data (schema.org) on solar pages.
 * Used for rich results in search (e.g. FAQ snippets).
 */

export const SOLAR_FAQ_SCHEMA_ITEMS = [
  {
    question: "How much do solar panels cost in Meath?",
    answer:
      "Solar panel system costs in Meath typically range from roughly €5,000 to €12,000 or more before the SEAI grant, depending on system size, roof type and whether you add battery storage. After the SEAI solar electricity grant (up to €1,800 where eligible), net cost is lower. We provide a clear quote after a free roof assessment.",
  },
  {
    question: "Are there SEAI solar grants available?",
    answer:
      "Yes. The SEAI solar electricity grant is available to qualifying homes in Ireland. Eligibility depends on factors such as when your home was built and its BER. Grant amounts are up to €1,800 depending on system size. We are SEAI registered and help you through the application and paperwork.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most domestic solar PV installations are completed in one to two days. The exact timeline depends on system size, roof type and whether you add battery storage or other upgrades. We confirm the schedule after your assessment.",
  },
  {
    question: "Do solar panels work in Ireland?",
    answer:
      "Yes. Solar panels work well in Ireland. They generate electricity in daylight, including on overcast days. Modern panels are efficient in diffuse light, and typical payback is in the region of 3–8 years. Systems are designed for Irish conditions and can last 25 years or more.",
  },
] as const;

export function buildSolarFaqJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SOLAR_FAQ_SCHEMA_ITEMS.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
