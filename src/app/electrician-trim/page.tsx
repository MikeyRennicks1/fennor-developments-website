import type { Metadata } from "next";
import Link from "next/link";
import { ElectricianLocationLayout } from "@/components/electrical/ElectricianLocationLayout";

export const metadata: Metadata = {
  title: "Electrician Trim | Electrical Services Trim Co. Meath | Fennor Developments",
  description:
    "Electrician in Trim. Domestic & commercial electrical, rewires, smart home. Compliant, insured. Serving Trim and the Boyne Valley. Free quote.",
};

const FAQ = [
  {
    question: "Do you provide electrical services in Trim?",
    answer:
      "Yes. We provide domestic and commercial electrical services across Trim and the Boyne Valley. We&apos;re based in Slane and regularly work in Trim.",
  },
  {
    question: "What electrical work do you do in Trim?",
    answer:
      "We do new builds, extensions, rewires, consumer unit upgrades, smart home and lighting, and commercial work. We also wire for solar PV and EV chargers.",
  },
  {
    question: "Are you fully insured and certified?",
    answer:
      "Yes. We work to current wiring standards and provide clear documentation and certification. We&apos;re fully insured for domestic and commercial work in Trim and the wider area.",
  },
  {
    question: "How do I get an electrical quote in Trim?",
    answer:
      "Contact us to describe your project. We&apos;ll arrange a site visit where needed and provide a clear quote with no hidden extras.",
  },
];

export default function ElectricianTrimPage() {
  return (
    <ElectricianLocationLayout
      headline="Electrician Trim"
      subline="Domestic and commercial electrical services in Trim, Co. Meath. Compliant, insured."
      faq={FAQ}
      solarAnchorText="solar panels Trim"
      buildersAnchorText="builders Meath"
    >
      <p>
        If you need an electrician in Trim, Fennor Developments provides domestic and commercial electrical services across Trim and the Boyne Valley. We&apos;re based in Slane and work regularly in Trim, so we can schedule assessments and jobs efficiently. From rewires and consumer unit upgrades to new build wiring and smart home systems, we deliver compliant work with full documentation and certification.
      </p>

      <p>
        We&apos;ve been delivering electrical and construction work across Meath and North Leinster for over 20 years. Trim&apos;s mix of period and modern housing means we&apos;re used to a variety of projects—full rewires in older homes, wiring for extensions, and new build electrical from first fix to handover. We work to current standards, are fully insured, and we specialise in solar-ready and EV-ready wiring so your home is prepared for the future.
      </p>

      <h2>Electrical services in Trim</h2>
      <p>
        Our electrical work in Trim covers new builds, extensions, rewires, consumer unit replacements, and smart home or lighting control. For older properties we carry out complete rewires that are safe and compliant. We also wire for solar PV and EV chargers, so if you&apos;re planning solar panels or an electric vehicle, we can ensure your installation is ready. For commercial customers we provide fit-outs, maintenance and compliance work.
      </p>

      <p>
        We keep the process clear: we quote for the scope agreed, provide certification where required, and work to your schedule where possible. Many of our Trim customers return for follow-up work or when they add solar or an EV charger. We also work with builders and developers in the area, so we&apos;re used to coordinating with other trades.
      </p>

      <h2>Why choose us in Trim</h2>
      <p>
        Being local means we can respond quickly and return for aftercare. We give honest advice, clear quotes and no hidden extras. We work to the current national wiring rules and provide the paperwork you need for insurance and resale. We&apos;re SEAI registered for solar, so if you want both electrical work and solar in Trim, we can coordinate the job.
      </p>

      <p>
        If you&apos;re in Trim and need an electrician, get in touch for a free discussion. We&apos;ll outline the work and provide a clear quote. See our main <Link href="/electrical">electrical services page</Link> for our full range, or <Link href="/contact">contact us</Link> to book.
      </p>
    </ElectricianLocationLayout>
  );
}
