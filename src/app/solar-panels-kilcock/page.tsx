import type { Metadata } from "next";
import { getSolarLocationBySlug } from "@/config/solar-locations-full";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";
import { SolarLocationTemplateContent, buildFaq, getRelatedTownLinks, getRecentProjectForLocation } from "@/components/solar/SolarLocationTemplateContent";

export const metadata: Metadata = {
  title: "Solar Panels Kilcock | Solar PV Installation Meath | Fennor",
  description: "Professional solar panel installation in Kilcock and surrounding areas. SEAI grant supported solar PV systems installed by Fennor.",
};

export default function SolarPanelsKilcockPage() {
  const location = getSolarLocationBySlug("kilcock");
  if (!location) return null;
  const faq = buildFaq(location);
  const relatedTownLinks = getRelatedTownLinks(location);
  return (
    <SolarLocationLayout
      headline={`Solar Panel Installation in ${location.name}`}
      subline={`Solar PV installation in ${location.name}. SEAI registered. Free quote.`}
      faq={faq}
      contactAnchorText={`solar panels ${location.name}`}
      electricalAnchorText={`electrician ${location.name}`}
      buildersAnchorText="builders Meath" renovationsAnchorText="house renovations Meath"
      relatedTownLinks={relatedTownLinks}
      recentProject={getRecentProjectForLocation(location)}
    >
      <SolarLocationTemplateContent location={location} />
    </SolarLocationLayout>
  );
}
