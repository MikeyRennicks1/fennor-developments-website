import type { Metadata } from "next";
import Link from "next/link";
import { BuildersSeoLayout } from "@/components/builders/BuildersSeoLayout";

export const metadata: Metadata = {
  title: "One Off Houses Meath | Custom Builds Co. Meath | Fennor",
  description:
    "One off houses Meath. Custom one-off builds from plot to handover. Energy-efficient, solar-ready. Navan, Slane, Trim, Kells. 20+ years. Enquire for serious homeowners.",
};

const FAQ = [
  {
    question: "Do you build one off houses in Meath?",
    answer:
      "Yes. We deliver one-off house builds across Co. Meath from plot to handover. We&apos;re based in Slane and work throughout the county. We offer turnkey one-off builds with one point of contact.",
  },
  {
    question: "What is a one off house build?",
    answer:
      "A one-off house is a custom-built home on its own site, rather than part of a development. We manage the full build from planning (if needed) through to handover, including project management, trades and electrical/solar integration.",
  },
  {
    question: "How long does a one off house build take in Meath?",
    answer:
      "Timeline depends on size, design and planning. We&apos;ll outline a realistic schedule when we quote. We provide structured project management and keep you informed at every stage.",
  },
  {
    question: "Do you build energy-efficient one off houses?",
    answer:
      "Yes. We build with energy efficiency in mind and integrate electrical and solar. We&apos;re SEAI registered for solar and can make your one-off house solar-ready and EV-ready from the start.",
  },
];

export default function OneOffHousesMeathPage() {
  return (
    <BuildersSeoLayout
      headline="One Off Houses Meath"
      subline="Custom one-off house builds across Co. Meath. Plot to handover, energy-efficient."
      faq={FAQ}
      electricalAnchorText="electrician Meath"
      solarAnchorText="solar panels Meath"
    >
      <p>
        Building a one off house in Meath is a major investment, and choosing the right builder is essential. Fennor Developments has been delivering one-off house builds across Co. Meath for over 20 years. We&apos;re based in Slane and work throughout the county—Navan, Trim, Kells, Ashbourne and the wider Boyne Valley. We offer a turnkey service: we take your project from plot to handover, with one point of contact and structured project management. We work with serious homeowners who are ready to invest in a quality build, and we take every enquiry seriously. We don&apos;t over-promise; we outline what&apos;s possible, give you a clear scope and timeline, and deliver to the standard we quote.
      </p>

      <p>
        A one-off house is a custom-built home on its own site, designed and built to your requirements rather than as part of a housing estate. That means you get a home that fits your site, your lifestyle and your budget. We can work with your architect or we can advise on layout and design; we&apos;ll manage the build from planning (if needed) through to handover. We coordinate all trades, we provide clear documentation at every stage, and we integrate electrical and solar so your one-off house is energy-efficient and future-proof. We&apos;re one of the few builders who can do the electrical and solar work in-house: we&apos;re SEAI registered for solar and we carry out our own electrical work, so your new home can be solar-ready and EV-ready from day one.
      </p>

      <h2>Why choose us for one off houses in Meath</h2>
      <p>
        Choosing a builder who specialises in one-off houses in Meath means you get a team that&apos;s used to the full process—from site and planning through to finish and handover. We&apos;ve built one-off houses across the county, so we understand local conditions, planning and building practice. We provide structured project management so you&apos;re not left coordinating multiple trades yourself; we take responsibility for the build and keep you informed. We also believe in building for the long term: good insulation, energy-efficient construction and integration with solar and electrical so your running costs stay manageable and your home is ready for the future.
      </p>

      <p>
        Our one-off house builds in Meath are fully insured and we provide the documentation you need for mortgage drawdown and insurance. We work to agreed scopes and timelines and we don&apos;t add hidden extras. We&apos;ll outline the build schedule when we quote, and we&apos;ll keep you updated at every stage. We build to current building regulations and we work with engineers and architects when the project requires it. The result is a one-off house that you&apos;re proud of and that stands the test of time.
      </p>

      <h2>From plot to handover</h2>
      <p>
        Our one-off house service in Meath covers the full journey from plot to handover. If you have a site and you&apos;re ready to build, we&apos;ll work with you (and your architect if you have one) to finalise the design and layout. We&apos;ll manage planning if required, we&apos;ll coordinate the build and we&apos;ll deliver a home that&apos;s ready to move into. We integrate electrical and solar from the start, so your one-off house can have solar PV and EV charging built in, and we can install those systems ourselves. You get one team for the construction and the energy side, which simplifies the process and ensures everything is done to the same standard.
      </p>

      <p>
        If you&apos;re planning a one off house in Meath and you&apos;re serious about building, get in touch. We&apos;ll discuss your site, your plans and your budget, and we&apos;ll outline how we work and what we can deliver. For more on our building and renovation approach, see our main <Link href="/building-renovations">Building & Renovations</Link> page, or <Link href="/contact">contact us</Link> to enquire about your one-off build.
      </p>
    </BuildersSeoLayout>
  );
}
