import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Kells | Solar PV Installation Kells Co. Meath | Fennor Developments",
  description:
    "Solar panel installation in Kells, Co. Meath. SEAI registered. Hybrid inverters, batteries. Free assessment. Serving Kells, Nobber and North Meath.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Kells?",
    answer:
      "Yes. We install solar PV across Kells and North Meath. We’re based in Slane and regularly work in the Kells area, so we can arrange assessments and installs efficiently.",
  },
  {
    question: "What does a solar installation in Kells typically cost?",
    answer:
      "Costs depend on system size, roof type and whether you add battery storage. The SEAI grant (up to €1,800 where eligible) reduces the net cost. We provide a clear quote after a free roof assessment.",
  },
  {
    question: "How long does installation take in Kells?",
    answer:
      "Most domestic solar installations in Kells are completed in one to two days. We’ll confirm the schedule after your assessment.",
  },
  {
    question: "Are you SEAI registered for Kells installations?",
    answer:
      "Yes. We’re SEAI registered and install to the standard required for the SEAI solar electricity grant. We help Kells customers through the application so they can claim the grant where eligible.",
  },
];

const RECENT_PROJECT = {
  title: "Kells one-off home – 5 kWp with battery",
  description:
    "A family near Kells wanted to maximise self-consumption and add battery storage. We installed a 14-panel system with hybrid inverter and battery. The system was commissioned in one day and the customer qualified for the SEAI grant.",
};

export default function SolarPanelsKellsPage() {
  return (
    <SolarLocationLayout headline="Solar Panels Kells" subline="Solar PV installation in Kells, Co. Meath. SEAI registered. Free assessment." faq={FAQ} contactAnchorText="solar panels Kells" electricalAnchorText="electrician Kells" buildersAnchorText="builders Meath" renovationsAnchorText="house renovations Meath" relatedTownLinks={[{ label: "Solar Panels Meath", href: "/solar-panels-meath" }, { label: "Solar Panels Navan", href: "/solar-panels-navan" }, { label: "Solar Panels Trim", href: "/solar-panels-trim" }, { label: "Solar Panels Oldcastle", href: "/solar-panels-oldcastle" }]} recentProject={RECENT_PROJECT}>
      <p>
        Solar panel installation in Kells is a practical way for North Meath homeowners to cut electricity bills and reduce carbon. Kells and the surrounding area have a mix of town and rural properties, many of which are well suited to solar PV. Fennor Developments installs solar across Kells and Co. Meath, with clear quotes, hybrid inverters and optional battery storage.
      </p>

      <p>
        We assess your roof, orientation and usage before recommending a system size. Whether you’re in the town or in the countryside, we install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar benefits in Kells</h2>
      <p>
        Solar PV in Kells can cut your electricity bills and improve energy independence. Panels work in Irish daylight conditions, and typical payback is around 3–8 years. Adding battery storage lets you use more of your solar energy at night. We size systems to match your consumption and explain grant options and payback so you can decide with confidence. We design each system around your property: we check for shading and explain options such as battery storage and monitoring.
      </p>

      <p>
        We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days. After installation, we provide full paperwork for warranties and for the SEAI grant, and we&apos;re on hand for any questions or future upgrades. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires. Panels typically last 25 years or more.
      </p>

      <h2>SEAI grants and next steps</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Kells and across Ireland. We help you check eligibility and complete the application, and we install to the standard required so you can receive the grant. If you&apos;re in Kells and thinking about solar panels, we offer a free roof assessment. Use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback, see our main <Link href="/solar">solar PV page</Link> for systems and grants, or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
