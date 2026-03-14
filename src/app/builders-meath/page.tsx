import type { Metadata } from "next";
import Link from "next/link";
import { BuildersSeoLayout } from "@/components/builders/BuildersSeoLayout";

export const metadata: Metadata = {
  title: "Builders Meath | Domestic Builders & Renovations Co. Meath | Fennor Developments",
  description:
    "Builders in Meath. One-off builds, renovations, extensions. Plot to handover, energy-efficient. Navan, Slane, Trim, Kells. 20+ years. Enquire for serious homeowners.",
};

const FAQ = [
  {
    question: "Do you build and renovate across Meath?",
    answer:
      "Yes. We work across Co. Meath including Navan, Slane, Trim, Kells, Ashbourne and the wider county. We&apos;re based in Slane and deliver one-off builds, renovations and extensions from plot to handover.",
  },
  {
    question: "What building services do you offer in Meath?",
    answer:
      "We offer turnkey one-off house builds, major renovations and refurbishment, single and two-storey extensions, and full project management. We also integrate electrical and solar so your build is energy-efficient and future-proof.",
  },
  {
    question: "How long have you been building in Meath?",
    answer:
      "We&apos;ve been delivering construction and building work across Meath and Ireland for over 20 years. We work with serious homeowners ready to invest in a quality build or major renovation.",
  },
  {
    question: "How do I get a quote from builders in Meath?",
    answer:
      "Contact us with your project details. We take enquiries seriously and follow up with a clear process: we&apos;ll discuss your plans, outline scope and provide a no-nonsense quote. Use our contact page or the enquiry form.",
  },
];

export default function BuildersMeathPage() {
  return (
    <BuildersSeoLayout
      headline="Builders Meath"
      subline="Domestic builders and renovations across Co. Meath. One-off builds, extensions, plot to handover."
      faq={FAQ}
      electricalAnchorText="electrician Meath"
      solarAnchorText="solar panels Meath"
    >
      <p>
        Finding reliable builders in Meath is essential when you&apos;re planning a one-off house, a major renovation or an extension. Fennor Developments has been delivering domestic building and renovation work across Co. Meath for over 20 years. We&apos;re based in Slane and work throughout the county—from Navan, Trim and Kells to Ashbourne, Dunshaughlin and the wider Boyne Valley. We offer turnkey builds from plot to handover, major renovations and refurbishment, and single or two-storey extensions. Our approach is structured and clear: one point of contact, proper project management and documentation, and integration with electrical and solar so your home is energy-efficient and future-proof.
      </p>

      <p>
        We work with homeowners who are serious about investing in a quality build or renovation. That means we take every enquiry seriously and follow up with a no-nonsense process. We don&apos;t over-promise; we outline what&apos;s possible, give you a clear scope and timeline, and deliver to the standard we quote. Whether you have a site and are ready to build, or you&apos;re planning a major renovation or extension to an existing home, we can help. We also carry out our own electrical work and are SEAI registered for solar, so we can coordinate the full build or renovation and ensure the wiring and energy side is done right from the start.
      </p>

      <h2>Why choose builders in Meath</h2>
      <p>
        Choosing local builders in Meath means you get a team that knows the area, understands local planning and building practice, and can respond quickly when you need them. We&apos;ve worked on one-off houses, period renovations and modern extensions across the county, so we&apos;re used to the mix of projects that Meath homeowners bring. We provide structured project management so you&apos;re not left chasing multiple trades; we coordinate the build and keep the process clear. We also believe in building for the long term: energy-efficient construction, good insulation and integration with solar and electrical so your running costs stay manageable and your home is ready for the future.
      </p>

      <p>
        Our building and renovation work in Meath is fully insured and we provide clear documentation throughout. We work with architects and engineers when the project requires it, and we&apos;re happy to work from your plans or to advise on design and layout. For one-off builds we can take the project from planning through to handover; for renovations and extensions we&apos;ll scope the work, quote clearly and work to an agreed timeline. We don&apos;t add hidden extras—we agree the scope and stick to it, and we keep you informed at every stage.
      </p>

      <h2>What we build in Meath</h2>
      <p>
        Our building work in Meath covers one-off house builds, major renovations and extensions. For one-off builds we offer a turnkey service: we manage the project from plot to handover, so you have one point of contact and one team responsible for the build. For renovations we take on period refurbishment, internal remodelling and major upgrades—always with a clear scope and a realistic timeline. For extensions we build single and two-storey extensions that match your existing home and meet current building standards. We can work with your architect or we can advise on layout and design; the important thing is that we deliver a build you&apos;re happy with and that stands the test of time.
      </p>

      <p>
        We integrate electrical and solar into our builds and renovations. That means your new build or extension can be wired for solar PV and EV from the start, and we can install the electrical and solar systems ourselves. You get a single team for the construction and the energy side, which simplifies the process and ensures everything is coordinated. We&apos;re SEAI registered for solar, so if you want a new build or renovation that&apos;s energy-efficient and solar-ready, we can do it all.
      </p>

      <h2>Next steps</h2>
      <p>
        If you&apos;re looking for builders in Meath and you&apos;re serious about a new build, renovation or extension, get in touch. We&apos;ll discuss your project, outline how we work and provide a clear quote. For more on our approach and our full range of building and renovation services, see our main <Link href="/building-renovations">Building & Renovations</Link> page, or <Link href="/contact">contact us</Link> to enquire about your build.
      </p>
    </BuildersSeoLayout>
  );
}
