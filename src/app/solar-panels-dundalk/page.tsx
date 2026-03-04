import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Dundalk | Solar PV Installation Dundalk Louth | Fennor Developments",
  description:
    "Solar panel installation in Dundalk, Co. Louth. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Dundalk and North Louth.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Dundalk?",
    answer:
      "Yes. We install solar PV across Dundalk and North Louth. We're based in Slane and regularly work in Dundalk, so we can schedule assessments and installs efficiently.",
  },
  {
    question: "What are the benefits of solar in Dundalk?",
    answer:
      "Solar PV can cut your electricity bills and reduce grid reliance. You can claim the SEAI grant where eligible (up to €1,800) and add battery storage. Typical payback is around 3–8 years.",
  },
  {
    question: "How long does installation take in Dundalk?",
    answer:
      "Most domestic solar installations in Dundalk are completed in one to two days. We'll confirm the schedule after your free roof assessment.",
  },
  {
    question: "Are you SEAI registered for Dundalk?",
    answer:
      "Yes. We're SEAI registered and install to the standard required for the SEAI solar electricity grant. We help Dundalk customers through the application so they can claim the grant where eligible.",
  },
];

const RECENT_PROJECT = {
  title: "Dundalk bungalow – 4.2 kWp with hybrid inverter",
  description:
    "We installed a 10-panel system with hybrid inverter for a bungalow near Dundalk. The customer wanted to reduce bills and add battery storage later. Installation took one day; they received the SEAI grant and now track production via the app.",
};

export default function SolarPanelsDundalkPage() {
  return (
    <SolarLocationLayout headline="Solar Panels Dundalk" subline="Solar PV installation in Dundalk, Co. Louth. SEAI registered. Free quote." faq={FAQ} contactAnchorText="solar panels Dundalk" electricalAnchorText="electrician Dundalk" buildersAnchorText="builders Meath" relatedTownLinks={[{ label: "Solar Panels Louth", href: "/solar-panels-louth" }, { label: "Solar Panels Drogheda", href: "/solar-panels-drogheda" }, { label: "Solar Panels Ardee", href: "/solar-panels-ardee" }]} recentProject={RECENT_PROJECT}>
      <p>
        Solar panel installation in Dundalk helps North Louth homeowners cut electricity costs and use cleaner energy. Dundalk and the surrounding area have a mix of town and rural properties, many well suited to solar PV. Fennor Developments installs solar across Dundalk and Co. Louth from our base in Slane, with clear quotes, hybrid inverters and optional battery storage.
      </p>

      <p>
        We assess your roof, orientation and usage before recommending a system size. We install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar benefits in Dundalk</h2>
      <p>
        Solar PV in Dundalk can significantly reduce your electricity bills. Panels work well in Irish daylight conditions, and typical payback is in the region of 3–8 years. Adding battery storage lets you use more of your solar energy in the evening. We size systems to match your consumption and explain grant options and payback clearly. We design each system around your property and check for shading and options such as battery storage and monitoring.
      </p>

      <p>
        We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days. After installation, we provide full paperwork for warranties and for the SEAI grant. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires. Panels typically last 25 years or more.
      </p>

      <h2>SEAI grants and next steps</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Dundalk and across Ireland. We help you through the application and install to the standard required so you can receive the grant. If you're in Dundalk and thinking about solar panels, we offer a free roof assessment. Use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback, see our main <Link href="/solar">solar PV page</Link> for systems and grants, or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
