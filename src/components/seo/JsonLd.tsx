import { brand } from "@/config/brand";
import { company } from "@/config/company";

const baseUrl = company.website || "https://fennordevelopments.ie";

/** Organization + LocalBusiness JSON-LD for search engines */
export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: baseUrl,
    logo: brand.logoPath ? `${baseUrl}${brand.logoPath}` : undefined,
    description: company.tagline,
    email: company.email,
    telephone: company.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Slane",
      addressRegion: "Co. Meath",
      addressCountry: "IE",
    },
    sameAs: [
      company.social.facebook,
      company.social.instagram,
      company.social.linkedin,
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#localbusiness`,
    name: company.name,
    image: brand.logoPath ? `${baseUrl}${brand.logoPath}` : undefined,
    url: baseUrl,
    telephone: company.phone.replace(/\s/g, ""),
    email: company.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Slane",
      addressRegion: "Co. Meath",
      addressCountry: "IE",
    },
    areaServed: [
      { "@type": "Place", name: "Meath" },
      { "@type": "Place", name: "Dublin" },
      { "@type": "Place", name: "Louth" },
      { "@type": "Place", name: "Ireland" },
    ],
    priceRange: "€€",
    openingHoursSpecification: undefined,
  };

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
    </>
  );
}
