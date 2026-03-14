import type { Metadata } from "next";
import Link from "next/link";
import { ElectricianLocationLayout } from "@/components/electrical/ElectricianLocationLayout";

export const metadata: Metadata = {
  title: "Electrician Drogheda | Electrical Services Drogheda Louth | Fennor Developments",
  description:
    "Electrician in Drogheda. Domestic & commercial electrical, rewires, new builds. Compliant, insured. Serving Drogheda and the Boyne region. Free quote.",
};

const FAQ = [
  {
    question: "Do you provide electrical services in Drogheda?",
    answer:
      "Yes. We provide domestic and commercial electrical services across Drogheda and the Boyne region. We&apos;re based in Slane and regularly work in Drogheda.",
  },
  {
    question: "What electrical work do you do in Drogheda?",
    answer:
      "We do new builds, extensions, rewires, consumer unit upgrades, smart home and lighting, and commercial work. We also wire for solar PV and EV chargers.",
  },
  {
    question: "Are you fully insured and certified?",
    answer:
      "Yes. We work to current wiring standards and provide clear documentation and certification. We&apos;re fully insured for work in Drogheda and the wider area.",
  },
  {
    question: "How do I get an electrical quote in Drogheda?",
    answer:
      "Contact us to describe your project. We&apos;ll arrange a site visit where needed and provide a clear quote with timelines.",
  },
];

export default function ElectricianDroghedaPage() {
  return (
    <ElectricianLocationLayout
      headline="Electrician Drogheda"
      subline="Domestic and commercial electrical services in Drogheda, Co. Louth. Compliant, insured."
      faq={FAQ}
      solarAnchorText="solar panels Drogheda"
      buildersAnchorText="builders Meath"
    >
      <p>
        If you need an electrician in Drogheda, Fennor Developments provides domestic and commercial electrical services across Drogheda and the Boyne region. We&apos;re based in Slane and work regularly in Drogheda, so we can schedule jobs without long lead times. Whether you need a rewire, a consumer unit upgrade, new build wiring or smart home systems, we deliver compliant work with full documentation and certification.
      </p>

      <p>
        We&apos;ve been delivering electrical and construction work across the North East for over 20 years. Drogheda&apos;s mix of town and rural properties means we&apos;re used to a variety of projects—period rewires, extensions, and new build electrical from first fix to handover. We work to current standards, are fully insured, and we specialise in solar-ready and EV-ready wiring so your home is prepared for future upgrades.
      </p>

      <h2>Electrical services in Drogheda</h2>
      <p>
        Our electrical work in Drogheda covers new builds, extensions, complete rewires, consumer unit replacements, and smart home or lighting control. For older properties we carry out rewires that are safe and compliant. We also wire for solar PV and EV chargers. For commercial customers we provide fit-outs, maintenance and compliance work. We quote for the scope agreed, provide certification where required, and work to your schedule where possible.
      </p>

      <p>
        Many of our Drogheda customers return for follow-up work or when they&apos;re ready to add solar or an EV charger. We&apos;re also SEAI registered for solar installations, so if you want both electrical work and solar in Drogheda, we can handle the full job. We give honest advice, clear quotes and no hidden extras.
      </p>

      <h2>Why choose us in Drogheda</h2>
      <p>
        Being local means we can respond quickly and return for aftercare. We work to the current national wiring rules and provide the paperwork you need for insurance and resale. If you&apos;re in Drogheda and need an electrician, get in touch for a free discussion. We&apos;ll outline the work and provide a clear quote. See our main <Link href="/electrical">electrical services page</Link> for our full range, or <Link href="/contact">contact us</Link> to book.
      </p>
    </ElectricianLocationLayout>
  );
}
