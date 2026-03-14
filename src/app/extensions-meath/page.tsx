import type { Metadata } from "next";
import Link from "next/link";
import { BuildersSeoLayout } from "@/components/builders/BuildersSeoLayout";

export const metadata: Metadata = {
  title: "Extensions Meath | House Extensions Co. Meath | Fennor Developments",
  description:
    "Extensions in Meath. Single and two-storey house extensions. Navan, Slane, Trim, Kells. Design and build. 20+ years. Enquire for serious homeowners.",
};

const FAQ = [
  {
    question: "Do you build house extensions in Meath?",
    answer:
      "Yes. We build single and two-storey house extensions across Co. Meath. We&apos;re based in Slane and work throughout the county. We can work with your architect or advise on design and layout.",
  },
  {
    question: "What types of extensions do you build in Meath?",
    answer:
      "We build single-storey and two-storey extensions that match your existing home and meet current building regulations. We can integrate electrical and solar so your extension is energy-efficient and future-proof.",
  },
  {
    question: "How long does an extension take in Meath?",
    answer:
      "Timeline depends on size and design. We&apos;ll outline a realistic schedule when we quote. We provide structured project management and keep you informed at every stage.",
  },
  {
    question: "Can you do electrical and solar as part of an extension in Meath?",
    answer:
      "Yes. We do our own electrical work and we&apos;re SEAI registered for solar. We can wire the extension and install or extend solar PV so one team handles the build and the energy side.",
  },
];

const EXTENSION_SERVICES = [
  { title: "Single-storey extensions", description: "Rear, side or wrap-around extensions. Match your existing home, meet building regs." },
  { title: "Two-storey extensions", description: "Two-storey extensions for extra living space and bedrooms. Full project management." },
  { title: "Design and build", description: "Work with your architect or we advise on layout and design. Clear scope and quote." },
  { title: "Electrical & solar integration", description: "Wire the extension, extend or install solar PV. In-house electrical and SEAI solar." },
  { title: "Project management", description: "Structured process, clear documentation. From planning to handover." },
];

export default function ExtensionsMeathPage() {
  return (
    <BuildersSeoLayout
      headline="Extensions Meath"
      subline="Single and two-storey house extensions across Co. Meath. Design and build, energy-efficient."
      faq={FAQ}
      services={EXTENSION_SERVICES}
      electricalAnchorText="electrician Meath"
      solarAnchorText="solar panels Meath"
    >
      <p>
        If you&apos;re planning extensions in Meath, Fennor Developments builds single and two-storey house extensions across Co. Meath. We&apos;re based in Slane and work throughout the county—Navan, Trim, Kells, Ashbourne and the wider Boyne Valley. We build extensions that match your existing home and meet current building regulations. We can work with your architect or we can advise on design and layout; we&apos;ll manage the project from planning (if needed) through to handover. We work with homeowners who are serious about investing in a quality extension; we take every enquiry seriously and we quote clearly. We don&apos;t add hidden extras, and we provide structured project management so you&apos;re not left coordinating multiple trades yourself.
      </p>

      <p>
        Extensions in Meath are a popular way to add space without moving. Whether you need a single-storey rear extension for a larger kitchen-diner, or a two-storey extension for extra bedrooms and living space, we can deliver. We build to a high standard and we integrate electrical and solar so your extension is energy-efficient and future-proof. We do our own electrical work and we&apos;re SEAI registered for solar, so we can wire the extension and install or extend solar PV as part of the project. That means one team for the build and the energy side—simpler for you and a consistent standard throughout.
      </p>

      <h2>Why choose us for extensions in Meath</h2>
      <p>
        Choosing a builder who specialises in extensions in Meath means you get a team that&apos;s used to working on existing homes. We understand how to tie an extension into your current building—matching materials, rooflines and finishes so the extension looks part of the original home. We provide one point of contact and we coordinate all trades; we don&apos;t leave you chasing electricians, plumbers and other contractors. We also believe in building for the long term: when we build an extension, we use good insulation and we integrate electrical and solar where it makes sense, so your extended home is energy-efficient and ready for the future.
      </p>

      <p>
        Our extension work in Meath is fully insured and we provide clear documentation. We work to agreed scopes and we keep you informed at every stage. We&apos;re happy to work with your architect or we can advise on layout and design. The result is an extension that you&apos;re happy with and that stands the test of time. We&apos;ve been delivering building work across Meath for over 20 years, so we have the experience to manage extension projects and the discipline to deliver on what we quote.
      </p>

      <h2>What we offer for extensions in Meath</h2>
      <p>
        Our extension work in Meath covers single-storey and two-storey extensions. We can build rear, side or wrap-around extensions depending on your site and your needs. We&apos;ll work with your architect or we can advise on design and layout; we&apos;ll manage planning if required and we&apos;ll deliver an extension that matches your home and meets building regulations. We integrate electrical and solar: we can wire the extension, upgrade the consumer unit if needed, and install or extend solar PV so your extended home is energy-efficient. We provide full project management from design through to handover, with clear documentation and one point of contact.
      </p>

      <p>
        If you&apos;re planning an extension in Meath and you&apos;re serious about the project, get in touch. We&apos;ll discuss your home, your plans and your budget, and we&apos;ll outline how we work and what we can deliver. For more on our building and renovation approach, see our main <Link href="/building-renovations">Building & Renovations</Link> page, or <Link href="/contact">contact us</Link> to enquire about your extension.
      </p>
    </BuildersSeoLayout>
  );
}
