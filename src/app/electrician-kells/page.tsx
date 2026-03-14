import type { Metadata } from "next";
import Link from "next/link";
import { ElectricianLocationLayout } from "@/components/electrical/ElectricianLocationLayout";

export const metadata: Metadata = {
  title: "Electrician Kells | Electrical Services Kells Co. Meath | Fennor Developments",
  description:
    "Electrician in Kells. Domestic & commercial electrical, rewires, new builds. Compliant, insured. Serving Kells and North Meath. Free quote.",
};

const FAQ = [
  {
    question: "Do you provide electrical services in Kells?",
    answer:
      "Yes. We provide domestic and commercial electrical services across Kells and North Meath. We&apos;re based in Slane and regularly work in the Kells area.",
  },
  {
    question: "What electrical work do you do in Kells?",
    answer:
      "We do new builds, extensions, rewires, consumer unit upgrades, smart home and lighting, and commercial work. We also wire for solar PV and EV chargers.",
  },
  {
    question: "Are you fully insured and certified?",
    answer:
      "Yes. We work to current wiring standards and provide clear documentation and certification. We&apos;re fully insured for work in Kells and the wider area.",
  },
  {
    question: "How do I get an electrical quote in Kells?",
    answer:
      "Contact us to describe your project. We&apos;ll arrange a site visit where needed and provide a clear quote with timelines.",
  },
];

export default function ElectricianKellsPage() {
  return (
    <ElectricianLocationLayout
      headline="Electrician Kells"
      subline="Domestic and commercial electrical services in Kells, Co. Meath. Compliant, insured."
      faq={FAQ}
      solarAnchorText="solar panels Kells"
      buildersAnchorText="builders Meath"
    >
      <p>
        If you need an electrician in Kells, Fennor Developments provides domestic and commercial electrical services across Kells and North Meath. We&apos;re based in Slane and work regularly in the Kells area, so we can schedule jobs without long lead times. Whether you need a rewire, a consumer unit upgrade, new build wiring or smart home systems, we deliver compliant work with full documentation and certification.
      </p>

      <p>
        We&apos;ve been delivering electrical and construction work across Meath and North Leinster for over 20 years. Kells and the surrounding area have a mix of town and rural properties, and we&apos;re used to the variety—period homes needing rewires, one-off builds, and extensions. We work to current standards, are fully insured, and we specialise in solar-ready and EV-ready wiring so your home is prepared for future upgrades.
      </p>

      <h2>Electrical services in Kells</h2>
      <p>
        Our electrical work in Kells covers new builds, extensions, complete rewires, consumer unit replacements, and smart home or lighting control. For older properties we carry out rewires that are safe, compliant and future-proof. We also wire for solar PV and EV chargers. For commercial customers we provide fit-outs, maintenance and compliance work. We keep the process clear: we quote for the scope agreed, provide certification where required, and work to your schedule where possible.
      </p>

      <p>
        Many of our Kells customers return for follow-up work or when they&apos;re ready to add solar or an EV charger. We coordinate with builders and other trades when needed, and we provide the paperwork you need for insurance and resale. We&apos;re also SEAI registered for solar installations, so if you want both electrical work and solar in Kells, we can handle the full job.
      </p>

      <h2>Why choose us in Kells</h2>
      <p>
        Being local means we can respond quickly to enquiries and return for aftercare. We give honest advice, clear quotes and no hidden extras. We work to the current national wiring rules and provide the documentation you need. If you&apos;re in Kells and need an electrician, get in touch for a free discussion. We&apos;ll outline the work and provide a clear quote. See our main <Link href="/electrical">electrical services page</Link> for our full range, or <Link href="/contact">contact us</Link> to book.
      </p>
    </ElectricianLocationLayout>
  );
}
