/**
 * LocalBusiness JSON-LD for local service landing pages.
 * Business: Fennor Developments. Website: https://fennor.ie
 * Service areas: County Meath, Louth, Dublin, Westmeath, Cavan.
 */

import { company } from "@/config/company";

const BASE_URL = "https://fennor.ie";
const SERVICE_AREAS = [
  { "@type": "Place" as const, name: "County Meath" },
  { "@type": "Place" as const, name: "County Louth" },
  { "@type": "Place" as const, name: "County Dublin" },
  { "@type": "Place" as const, name: "County Westmeath" },
  { "@type": "Place" as const, name: "County Cavan" },
];

type LocalBusinessJsonLdProps = {
  /** Optional: emphasise this area on the page e.g. "Navan" */
  focusArea?: string;
};

export function LocalBusinessJsonLd({ focusArea }: LocalBusinessJsonLdProps) {
  const phone = company.phone.replace(/\s/g, "");
  const areaServed = focusArea
    ? [{ "@type": "Place" as const, name: focusArea }, ...SERVICE_AREAS]
    : SERVICE_AREAS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}#localbusiness`,
    name: "Fennor Developments",
    url: BASE_URL,
    telephone: phone,
    email: company.email,
    address: {
      "@type": "PostalAddress" as const,
      addressLocality: "Slane",
      addressRegion: "Co. Meath",
      addressCountry: "IE",
    },
    areaServed,
    serviceType: [
      "Solar panel installation",
      "Electrical services",
      "Home renovations",
      "Residential construction",
      "Extensions",
    ],
    priceRange: "€€",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
