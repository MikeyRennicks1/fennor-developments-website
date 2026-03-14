import type { Metadata } from "next";
import Link from "next/link";
import { BuildersSeoLayout } from "@/components/builders/BuildersSeoLayout";

export const metadata: Metadata = {
  title: "House Renovations Meath | Refurbishment Co. Meath | Fennor",
  description:
    "Renovations in Meath. Major house renovations, period refurbishment, extensions. Navan, Slane, Trim. 20+ years. Enquire for serious homeowners.",
};

const FAQ = [
  {
    question: "Do you do house renovations in Meath?",
    answer:
      "Yes. We deliver major house renovations and refurbishment across Co. Meath. We&apos;re based in Slane and work throughout the county. We take on period refurbishment, internal remodelling and major upgrades with a clear scope and timeline.",
  },
  {
    question: "What types of renovations do you do in Meath?",
    answer:
      "We do major renovations, period refurbishment, internal remodelling and structural upgrades. We also build extensions as part of a renovation. We integrate electrical and solar so your renovated home is energy-efficient.",
  },
  {
    question: "How do you manage renovation projects in Meath?",
    answer:
      "We provide structured project management: we scope the work, quote clearly and work to an agreed timeline. We coordinate trades and keep you informed. We don&apos;t add hidden extras—we agree the scope and stick to it.",
  },
  {
    question: "Can you do electrical and solar as part of a renovation in Meath?",
    answer:
      "Yes. We do our own electrical work and we&apos;re SEAI registered for solar. We can rewire, upgrade the consumer unit and install solar PV as part of your renovation, so one team handles the build and the energy side.",
  },
];

const RENOVATION_SERVICES = [
  { title: "Major renovations", description: "Full house renovations, structural work, internal remodelling. Clear scope and timeline." },
  { title: "Period refurbishment", description: "Period and character homes. Sensitive refurbishment, modern upgrades where needed." },
  { title: "Extensions with renovation", description: "Single and two-storey extensions as part of a wider renovation." },
  { title: "Electrical & solar integration", description: "Rewires, consumer units, solar PV. In-house electrical and SEAI registered solar." },
  { title: "Project management", description: "Structured process, clear documentation. From design to handover." },
];

export default function RenovationsMeathPage() {
  return (
    <BuildersSeoLayout
      headline="Renovations Meath"
      subline="House renovations and refurbishment across Co. Meath. Period refurbishment, extensions, plot to handover."
      faq={FAQ}
      services={RENOVATION_SERVICES}
      electricalAnchorText="electrician Meath"
      solarAnchorText="solar panels Meath"
    >
      <p>
        If you&apos;re planning renovations in Meath, Fennor Developments delivers major house renovations and refurbishment across Co. Meath. We&apos;re based in Slane and work throughout the county—Navan, Trim, Kells, Slane and the wider Boyne Valley. We take on period refurbishment, internal remodelling, structural upgrades and extensions as part of a wider renovation. We work with homeowners who are serious about investing in a quality renovation; we take every enquiry seriously and follow up with a clear process. We scope the work, quote clearly and work to an agreed timeline. We don&apos;t add hidden extras, and we provide structured project management so you&apos;re not left coordinating multiple trades yourself.
      </p>

      <p>
        Renovations in Meath can range from a full period refurbishment to a major internal remodelling or a renovation that includes an extension. We&apos;re used to the mix: we&apos;ve worked on period homes that need careful refurbishment and modern upgrades, and we&apos;ve carried out major renovations that include new extensions, rewires and solar installation. We do our own electrical work and we&apos;re SEAI registered for solar, so we can rewire, upgrade the consumer unit and install solar PV as part of your renovation. That means one team for the build and the energy side—simpler for you and a consistent standard throughout.
      </p>

      <h2>Why choose us for renovations in Meath</h2>
      <p>
        Choosing a builder who specialises in renovations in Meath means you get a team that&apos;s used to working on existing homes. We understand the challenges of period properties and we know how to plan a renovation so that the scope is clear and the timeline is realistic. We provide one point of contact and we coordinate all trades; we don&apos;t leave you chasing electricians, plumbers and other contractors. We also believe in building for the long term: when we renovate, we upgrade insulation and integrate electrical and solar where it makes sense, so your renovated home is energy-efficient and future-proof.
      </p>

      <p>
        Our renovation work in Meath is fully insured and we provide clear documentation. We work to agreed scopes and we keep you informed at every stage. We&apos;re happy to work with your architect or designer, or we can advise on layout and design. The result is a renovated home that you&apos;re happy with and that stands the test of time. We&apos;ve been delivering building and renovation work across Meath for over 20 years, so we have the experience to manage complex projects and the discipline to deliver on what we quote.
      </p>

      <h2>What we offer for renovations in Meath</h2>
      <p>
        Our renovation work in Meath covers major house renovations, period refurbishment, internal remodelling and structural upgrades. We also build extensions as part of a renovation—single or two-storey—so if you&apos;re extending and renovating, we can do both. We integrate electrical and solar: we can rewire, upgrade the consumer unit, and install solar PV and battery storage so your renovated home is energy-efficient and ready for the future. We provide full project management from design (or your plans) through to handover, with clear documentation and one point of contact.
      </p>

      <p>
        If you&apos;re planning renovations in Meath and you&apos;re serious about the project, get in touch. We&apos;ll discuss your home, your plans and your budget, and we&apos;ll outline how we work and what we can deliver. For more on our building and renovation approach, see our main <Link href="/building-renovations">Building & Renovations</Link> page, or <Link href="/contact">contact us</Link> to enquire about your renovation.
      </p>
    </BuildersSeoLayout>
  );
}
