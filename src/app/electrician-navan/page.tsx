import type { Metadata } from "next";
import Link from "next/link";
import { ElectricianLocationLayout } from "@/components/electrical/ElectricianLocationLayout";

export const metadata: Metadata = {
  title: "Electrician Navan | Electrical Services Navan Co. Meath | Fennor Developments",
  description:
    "Electrician in Navan. Domestic & commercial electrical services, rewires, smart home. Compliant, insured. Serving Navan and Co. Meath. Free quote.",
};

const FAQ = [
  {
    question: "Do you provide electrical services in Navan?",
    answer:
      "Yes. We provide domestic and commercial electrical services across Navan and Co. Meath. We&apos;re based in Slane and regularly work in Navan, so we can schedule assessments and jobs efficiently.",
  },
  {
    question: "What electrical work do you do in Navan?",
    answer:
      "We do new builds, extensions, rewires, consumer unit upgrades, smart home and lighting, and commercial fit-outs. We also wire for solar PV and EV chargers so your home is future-proof.",
  },
  {
    question: "Are you fully insured and certified?",
    answer:
      "Yes. We work to current wiring standards and provide clear documentation and certification. We&apos;re fully insured for domestic and commercial customers in Navan and the wider area.",
  },
  {
    question: "How do I get an electrical quote in Navan?",
    answer:
      "Contact us to describe your project. We&apos;ll arrange a site visit where needed, then provide a clear quote. For larger jobs we&apos;ll outline stages and timelines.",
  },
];

export default function ElectricianNavanPage() {
  return (
    <ElectricianLocationLayout
      headline="Electrician Navan"
      subline="Domestic and commercial electrical services in Navan. Compliant, insured, professional."
      faq={FAQ}
      solarAnchorText="solar panels Navan"
      buildersAnchorText="builders Meath"
    >
      <p>
        Finding a reliable electrician in Navan is essential for new builds, rewires, and upgrades. Fennor Developments provides domestic and commercial electrical services across Navan and Co. Meath. We&apos;re based in Slane and work regularly in Navan, so we know the area and can schedule jobs without long lead times. Whether you need a full rewire, a consumer unit upgrade, or wiring for a new extension, we deliver compliant work with clear documentation and certification.
      </p>

      <p>
        We&apos;ve been delivering electrical and construction work across North Leinster for over 20 years. That experience means we&apos;re used to the mix of housing in Navan—from period homes needing rewires to new estates and one-off builds. We work to current standards, provide full certification where required, and we&apos;re fully insured. We also specialise in solar-ready and EV-ready wiring, so your home is prepared for future upgrades.
      </p>

      <h2>Electrical services in Navan</h2>
      <p>
        Our electrical work in Navan covers the full range of domestic and commercial needs. For homeowners, we do new build wiring, extensions, rewires, consumer unit replacements, and smart home or lighting systems. For older properties we carry out complete rewires that are safe, compliant and future-proof. We also install and wire for solar PV and EV chargers, so if you&apos;re thinking about solar or an electric vehicle, we can ensure your board and circuits are ready.
      </p>

      <p>
        For commercial customers in Navan we provide fit-outs, maintenance and compliance work. We keep the process clear: we quote for the scope agreed, provide documentation and certificates, and work to your schedule where possible. Many of our Navan customers come back to us for follow-up work or when they&apos;re ready to add solar or an EV charger.
      </p>

      <h2>Why choose us in Navan</h2>
      <p>
        Being local means we can respond quickly to enquiries and return for aftercare or extra work. We give honest advice, clear quotes and no hidden extras. We work to the current national wiring rules and provide the paperwork you need for insurance and resale. We&apos;re also SEAI registered for solar installations, so if you want both electrical work and solar in Navan, we can coordinate the job.
      </p>

      <p>
        If you&apos;re in Navan and need an electrician, get in touch for a free discussion. We&apos;ll outline the work, provide a clear quote and explain the process. For more on our full range of services, see our main <Link href="/electrical">electrical services page</Link>, or <Link href="/contact">contact us</Link> to book.
      </p>
    </ElectricianLocationLayout>
  );
}
