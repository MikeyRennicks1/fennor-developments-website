/**
 * Structured data (JSON-LD) for the website:
 * - Organization + LocalBusiness + SolarEnergyCompany + Electrician (Fennor Developments, https://fennor.ie)
 * - Service schema (5 services, areaServed: County Meath, Louth, Dublin, Westmeath, Cavan)
 * FAQ schema is output per-page via FaqJsonLd on service and location pages that have FAQ content.
 */
import { brand } from "@/config/brand";
import { company } from "@/config/company";

const baseUrl = "https://fennor.ie";
const phone = company.phone.replace(/\s/g, "");

const SERVICE_AREAS = [
  { "@type": "Place" as const, name: "County Meath" },
  { "@type": "Place" as const, name: "County Louth" },
  { "@type": "Place" as const, name: "County Dublin" },
  { "@type": "Place" as const, name: "County Westmeath" },
  { "@type": "Place" as const, name: "County Cavan" },
];

const ADDRESS = {
  "@type": "PostalAddress" as const,
  addressLocality: "Slane",
  addressRegion: "Co. Meath",
  addressCountry: "IE",
};

/** Slane, Co. Meath approximate coordinates for geo */
const GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: 53.71,
  longitude: -6.543,
};

/** Mon–Fri 8–6, Sat 9–1 (typical trade hours; adjust to actual if different) */
const OPENING_HOURS = {
  "@type": "OpeningHoursSpecification" as const,
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "08:00",
  closes: "18:00",
};

/** Organization + LocalBusiness + SolarEnergyCompany + Electrician + Service JSON-LD for search engines (schema.org) */
export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fennor Developments",
    url: baseUrl,
    logo: brand.logoPath
      ? { "@type": "ImageObject" as const, url: `${baseUrl}${brand.logoPath}`, width: 320, height: 112 }
      : undefined,
    description: company.tagline,
    email: company.email,
    telephone: phone,
    address: ADDRESS,
    sameAs: [
      company.social.facebook,
      company.social.instagram,
      company.social.linkedin,
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Electrician"],
    "@id": `${baseUrl}#localbusiness`,
    name: "Fennor Developments",
    image: brand.logoPath ? `${baseUrl}${brand.logoPath}` : undefined,
    url: baseUrl,
    telephone: phone,
    email: company.email,
    address: ADDRESS,
    geo: GEO,
    openingHoursSpecification: OPENING_HOURS,
    areaServed: SERVICE_AREAS,
    serviceType: [
      "Solar panel installation",
      "Solar PV installation",
      "Solar battery storage",
      "Electrical services",
      "Home renovations",
      "Residential construction",
      "Extensions",
    ],
    priceRange: "€€",
  };

  const services: Array<{ "@context": string; "@type": string; name: string; description: string; provider: { "@id": string }; areaServed: typeof SERVICE_AREAS }> = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Solar panel installation",
      description: "Design and installation of solar PV systems for homes and businesses across County Meath, Louth, Dublin, Westmeath and Cavan. SEAI registered.",
      provider: { "@id": `${baseUrl}#localbusiness` },
      areaServed: SERVICE_AREAS,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Electrical services",
      description: "Professional electrical services including installations, upgrades, testing and certification for residential and commercial properties across North Leinster.",
      provider: { "@id": `${baseUrl}#localbusiness` },
      areaServed: SERVICE_AREAS,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Home renovations",
      description: "Major house renovations, period refurbishment and internal remodelling. Serving County Meath, Louth, Dublin, Westmeath and Cavan.",
      provider: { "@id": `${baseUrl}#localbusiness` },
      areaServed: SERVICE_AREAS,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Residential construction",
      description: "One-off house builds and residential construction from plot to handover. Serving County Meath, Louth, Dublin, Westmeath and Cavan.",
      provider: { "@id": `${baseUrl}#localbusiness` },
      areaServed: SERVICE_AREAS,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Extensions",
      description: "Single and two-storey house extensions. Design and build or work with your architect. Serving County Meath, Louth, Dublin, Westmeath and Cavan.",
      provider: { "@id": `${baseUrl}#localbusiness` },
      areaServed: SERVICE_AREAS,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {services.map((service) => (
        <script
          key={service.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      ))}
    </>
  );
}
