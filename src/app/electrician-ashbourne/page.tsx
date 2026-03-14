import type { Metadata } from "next";
import Link from "next/link";
import { ElectricianLocationLayout } from "@/components/electrical/ElectricianLocationLayout";

export const metadata: Metadata = {
  title: "Electrician Ashbourne | Electrical Services Ashbourne Meath | Fennor Developments",
  description:
    "Electrician in Ashbourne. Domestic & commercial electrical, rewires, new builds. Compliant, insured. Serving Ashbourne, Ratoath and East Meath. Free quote.",
};

const FAQ = [
  {
    question: "Do you provide electrical services in Ashbourne?",
    answer:
      "Yes. We provide domestic and commercial electrical services across Ashbourne and East Meath, including Ratoath and the M3 corridor. We&apos;re based in Slane and regularly work in the area.",
  },
  {
    question: "What electrical work do you do in Ashbourne?",
    answer:
      "We do new builds, extensions, rewires, consumer unit upgrades, smart home and lighting, and commercial work. We also wire for solar PV and EV chargers.",
  },
  {
    question: "Are you fully insured and certified?",
    answer:
      "Yes. We work to current wiring standards and provide clear documentation and certification. We&apos;re fully insured for work in Ashbourne and the wider area.",
  },
  {
    question: "How do I get an electrical quote in Ashbourne?",
    answer:
      "Contact us to describe your project. We&apos;ll arrange a site visit where needed and provide a clear quote with no hidden extras.",
  },
];

export default function ElectricianAshbournePage() {
  return (
    <ElectricianLocationLayout
      headline="Electrician Ashbourne"
      subline="Domestic and commercial electrical services in Ashbourne, Co. Meath. Compliant, insured."
      faq={FAQ}
      solarAnchorText="solar panels Ashbourne"
      buildersAnchorText="builders Meath"
    >
      <p>
        If you need an electrician in Ashbourne, Fennor Developments provides domestic and commercial electrical services across Ashbourne and East Meath. We&apos;re based in Slane and work regularly in the area, so we can schedule assessments and jobs efficiently. Ashbourne has grown significantly, with a mix of estates and one-off homes—we&apos;re used to new build wiring, extensions, rewires and upgrades, and we deliver compliant work with full documentation and certification.
      </p>

      <p>
        We&apos;ve been delivering electrical and construction work across North Leinster for over 20 years. We work to current standards, are fully insured, and we specialise in solar-ready and EV-ready wiring so your home is prepared for future upgrades. Whether you&apos;re in an estate or a one-off home, we quote clearly, provide certification where required, and work to your schedule where possible.
      </p>

      <h2>Electrical services in Ashbourne</h2>
      <p>
        Our electrical work in Ashbourne covers new builds, extensions, complete rewires, consumer unit replacements, and smart home or lighting control. For older properties we carry out rewires that are safe and compliant. We also wire for solar PV and EV chargers, so if you&apos;re planning solar panels or an electric vehicle, we can ensure your installation is ready. For commercial customers we provide fit-outs, maintenance and compliance work.
      </p>

      <p>
        We keep the process clear: we quote for the scope agreed, provide the paperwork you need for insurance and resale, and coordinate with other trades when needed. Many of our Ashbourne customers return for follow-up work or when they add solar or an EV charger. We&apos;re also SEAI registered for solar installations, so we can handle both electrical work and solar in one coordinated job.
      </p>

      <h2>Why choose us in Ashbourne</h2>
      <p>
        Being local means we can respond quickly and return for aftercare. We give honest advice, clear quotes and no hidden extras. We work to the current national wiring rules. If you&apos;re in Ashbourne and need an electrician, get in touch for a free discussion. We&apos;ll outline the work and provide a clear quote. See our main <Link href="/electrical">electrical services page</Link> for our full range, or <Link href="/contact">contact us</Link> to book.
      </p>
    </ElectricianLocationLayout>
  );
}
