import type { Metadata } from "next";
import { LocalServicePageTemplate } from "@/components/seo/LocalServicePageTemplate";
import type { LocalServiceFaqItem } from "@/types/local-service-page";
import { buildLocalServiceMetadata } from "@/types/local-service-page";
import { SOLAR_HERO } from "@/config/images";

const CONTENT = {
  metaTitle: "Solar Panels Oldcastle | Solar PV Installation Co. Meath | Fennor",
  metaDescription:
    "Solar panel installation in Oldcastle, Co. Meath. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Oldcastle, Kells & North Meath.",
  h1: "Solar Panels Oldcastle",
  subline: "Solar PV installation in Oldcastle and North Meath. SEAI registered. Free assessment.",
  introParagraph:
    "Solar panel installation in Oldcastle and North Meath is a practical way for homeowners and farms to cut electricity bills and reduce reliance on the grid. With the SEAI grant and modern solar technology, a well-designed system can pay back in a few years and deliver clean energy for decades. Fennor Developments installs solar across Oldcastle, Kells, Virginia and the surrounding area from our base in Slane, offering clear quotes, hybrid inverters and optional battery storage. Whether you are in the town or in the countryside, we assess your roof, your usage and your goals before recommending a system size that fits your budget and your property.",
  benefitsSection: {
    title: "Why solar makes sense in Oldcastle and North Meath",
    content:
      "Solar PV reduces grid reliance and lowers electricity bills. In a region with a mix of family homes and farms, many properties have good roof space and daytime consumption patterns that suit solar. The SEAI solar electricity grant is available to qualifying homes, and we help you through the application so you can claim up to €1,800 depending on system size. Hybrid inverters maximise self-consumption and allow you to add battery storage later. You can monitor production and savings via an app, and systems are designed to last 25 years or more. Typical payback in the area is around 3–8 years depending on system size, orientation and how much electricity you use.",
  },
  experienceSection: {
    title: "Fennor Developments experience and installs",
    content:
      "Fennor Developments has been installing solar PV and delivering electrical and building work across Meath and the North East for over 20 years. We are SEAI registered and work to the standards required for the grant. We design and fit systems that match your roof, your usage and your budget—whether you are in Oldcastle, Kells, Virginia or the wider North Meath area. We install on slate, tile and suitable flat roofs and ensure every installation is compliant, insured and built to last. We provide full paperwork for warranties and for the SEAI grant, and we are on hand for aftercare, servicing or future upgrades. Our team knows the area and can schedule assessments and installs without long lead times.",
  },
  processSection: {
    title: "How we install solar in Oldcastle",
    content:
      "We keep the process straightforward. First, we arrange a free roof assessment where we look at orientation, shading and your current usage. We then provide a clear quote with system size, add-ons such as battery storage, and an estimate of grant eligibility. Once you decide to go ahead, we schedule the installation. Most domestic jobs in Oldcastle and the surrounding area are completed in one to two days. We install the panels, inverter and optional battery, and we wire and commission the system to the required standard. We assist with the SEAI grant paperwork and leave you with full documentation, monitoring access and our contact details for any questions or future upgrades.",
  },
  localRelevanceParagraph:
    "We cover Oldcastle, Kells, Virginia, Crossakiel and the wider North Meath area. Being local means we can respond quickly to enquiries and return for aftercare or extra work. We understand the mix of town and rural properties in the region and design systems that suit Irish conditions and building styles. If you are in Oldcastle or nearby and thinking about solar panels, we offer a free roof assessment and a clear, no-nonsense quote. We also offer electrical services for new builds and rewires and work with builders on new construction and renovations across Meath, Louth, Dublin, Cavan and Westmeath.",
  faq: [
    {
      question: "Do you install solar panels in Oldcastle?",
      answer:
        "Yes. We install solar PV across Oldcastle, Kells, Virginia and North Meath. We are based in Slane and regularly work in the area, so we can schedule assessments and installs without long lead times.",
    },
    {
      question: "What are the benefits of solar in Oldcastle?",
      answer:
        "You can cut electricity bills, claim the SEAI grant where eligible (up to €1,800), and add battery storage for evening use. Typical payback is around 3–8 years. Systems last 25 years or more and we provide full documentation and aftercare.",
    },
    {
      question: "How long does a solar installation take in Oldcastle?",
      answer:
        "Most domestic installations in Oldcastle and North Meath are completed in one to two days. We confirm the schedule after your free roof assessment. Roof type, system size and any battery or inverter options can affect the timeline.",
    },
    {
      question: "Are SEAI grants available for solar in Oldcastle?",
      answer:
        "Yes. The SEAI solar electricity grant is available to qualifying homes in Oldcastle and across Ireland. We are SEAI registered and help you through the application so you can claim up to €1,800 depending on system size.",
    },
  ] as [LocalServiceFaqItem, LocalServiceFaqItem, LocalServiceFaqItem, LocalServiceFaqItem],
  cta: {
    heading: "Get a solar quote in Oldcastle",
    body: "Book a free roof assessment. We will outline system size, grant options and a clear quote. No obligation.",
    buttonText: "Request a quote",
  },
};

export const metadata: Metadata = {
  ...buildLocalServiceMetadata(CONTENT),
};

export default function SolarPanelsOldcastlePage() {
  return (
    <LocalServicePageTemplate
      content={CONTENT}
      heroImageSrc={SOLAR_HERO}
      heroImageAlt="Solar panels Oldcastle – Fennor Developments"
      heroObjectPosition="center 35%"
      focusArea="Oldcastle"
      linkAnchors={{
        solar: "solar panel installation",
        electrical: "electrician Meath",
        building: "builders Meath",
        contact: "contact us",
      }}
    />
  );
}
