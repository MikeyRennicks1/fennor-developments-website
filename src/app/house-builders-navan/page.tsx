import type { Metadata } from "next";
import Link from "next/link";
import { BuildersSeoLayout } from "@/components/builders/BuildersSeoLayout";

export const metadata: Metadata = {
  title: "Builders Navan | New Build & Renovation Meath | Fennor",
  description:
    "House builders in Navan. One-off builds, renovations, extensions. Plot to handover. Navan and Co. Meath. 20+ years. Enquire for serious homeowners.",
};

const FAQ = [
  {
    question: "Do you build houses in Navan?",
    answer:
      "Yes. We deliver one-off house builds, renovations and extensions across Navan and Co. Meath. We&apos;re based in Slane and work regularly in Navan, from plot to handover.",
  },
  {
    question: "What do house builders in Navan offer?",
    answer:
      "We offer turnkey one-off builds, major renovations, and extensions. We provide full project management, electrical and solar integration, and clear documentation. One point of contact from start to finish.",
  },
  {
    question: "Are you experienced house builders in the Navan area?",
    answer:
      "Yes. We&apos;ve been delivering building and construction work across Meath and Ireland for over 20 years. We&apos;ve built and renovated homes in and around Navan and know the area well.",
  },
  {
    question: "How do I get a quote from house builders in Navan?",
    answer:
      "Contact us with your project—new build, renovation or extension. We take enquiries seriously and will discuss your plans, outline scope and provide a clear quote. Use our contact page or enquiry form.",
  },
];

export default function HouseBuildersNavanPage() {
  return (
    <BuildersSeoLayout
      headline="House Builders Navan"
      subline="One-off builds, renovations and extensions in Navan and Co. Meath. Plot to handover."
      faq={FAQ}
      electricalAnchorText="electrician Navan"
      solarAnchorText="solar panels Navan"
    >
      <p>
        If you&apos;re looking for house builders in Navan, Fennor Developments delivers one-off house builds, major renovations and extensions across Navan and Co. Meath. We&apos;re based in Slane and work regularly in Navan, so we know the area and can schedule projects without long lead times. We offer a turnkey service for new builds—from plot to handover, with one point of contact—and we take on major renovations and single or two-storey extensions. We work with homeowners who are serious about investing in a quality build; we take every enquiry seriously and follow up with a clear, no-nonsense process.
      </p>

      <p>
        Navan has a mix of established estates and one-off homes, and we&apos;re used to both. For new builds we manage the full project: we work with you (and your architect if you have one) to get the design and layout right, then we deliver the build to an agreed standard and timeline. For renovations we scope the work, quote clearly and carry out period refurbishment, internal remodelling or major upgrades. For extensions we build single and two-storey extensions that match your home and meet current building standards. Throughout, we provide structured project management and clear documentation, and we integrate electrical and solar so your home is energy-efficient and future-proof.
      </p>

      <h2>Why choose house builders in Navan</h2>
      <p>
        Choosing house builders who work regularly in Navan means you get a team that knows the area and can respond when you need them. We&apos;ve delivered one-off houses and renovations in and around Navan for years, so we understand local planning, building practice and the mix of housing in the town. We don&apos;t subcontract and disappear—we manage the project and keep you informed. We&apos;re also one of the few builders who can handle the electrical and solar side in-house: we&apos;re SEAI registered for solar and we do our own electrical work, so your new build or renovation can be wired for solar PV and EV from the start, and we can install the systems ourselves. That simplifies the process and ensures everything is coordinated.
      </p>

      <p>
        Our building work is fully insured and we provide the documentation you need. We work to agreed scopes and timelines and we don&apos;t add hidden extras. For one-off builds we take the project from planning through to handover; for renovations and extensions we&apos;ll outline the work, quote clearly and stick to what we&apos;ve agreed. We build for the long term: good insulation, energy-efficient construction and integration with solar and electrical so your running costs stay manageable.
      </p>

      <h2>What we build in Navan</h2>
      <p>
        Our work as house builders in Navan covers one-off house builds, renovations and extensions. For one-off builds we offer turnkey from plot to handover: we manage the project, coordinate trades and deliver a home that&apos;s ready to move into. For renovations we take on period refurbishment, internal remodelling and major upgrades—always with a clear scope and realistic timeline. For extensions we build single and two-storey extensions that blend with your existing home and meet building regulations. We can work with your architect or we can advise on layout and design; the important thing is that we deliver a build you&apos;re happy with and that stands the test of time.
      </p>

      <p>
        We integrate electrical and solar into our builds and renovations. That means your new build or extension can be solar-ready and EV-ready from day one, and we can install the electrical and solar systems ourselves. You get one team for construction and energy, which reduces hassle and ensures everything is done to the same standard. If you&apos;re in Navan and you&apos;re serious about a new house, a renovation or an extension, get in touch. We&apos;ll discuss your project and provide a clear quote. See our main <Link href="/building-renovations">Building & Renovations</Link> page for our full approach, or <Link href="/contact">contact us</Link> to enquire.
      </p>
    </BuildersSeoLayout>
  );
}
