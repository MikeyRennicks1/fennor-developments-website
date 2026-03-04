import { buildSolarFaqJsonLd } from "@/config/solar-faq-schema";

/** Renders FAQPage JSON-LD for solar pages (schema.org). */
export function SolarFaqJsonLd() {
  const jsonLd = buildSolarFaqJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
