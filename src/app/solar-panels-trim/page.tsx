import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Trim | Solar PV Installation Trim Co. Meath | Fennor Developments",
  description:
    "Solar panel installation in Trim, Co. Meath. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Trim and the Boyne Valley.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Trim?",
    answer:
      "Yes. We install solar PV across Trim and the wider Boyne Valley. We’re based in Slane and regularly work in Trim, so we can schedule assessments and installs without long lead times.",
  },
  {
    question: "What are the benefits of solar in Trim?",
    answer:
      "Trim’s mix of town and rural homes suits solar well. You can cut electricity bills, claim the SEAI grant where eligible, and add battery storage for evening use. Typical payback is around 3–8 years depending on system size and usage.",
  },
  {
    question: "How long does a solar installation take in Trim?",
    answer:
      "Most domestic installations in Trim are completed in one to two days. We’ll confirm the schedule after your free roof assessment.",
  },
  {
    question: "Are SEAI grants available for solar in Trim?",
    answer:
      "Yes. The SEAI solar electricity grant is available to qualifying homes in Trim and across Ireland. We’re SEAI registered and help you through the application. You can claim up to €1,800 depending on system size.",
  },
];

const RECENT_PROJECT = {
  title: "Trim bungalow – 3.6 kWp solar PV",
  description:
    "We installed a 9-panel system with hybrid inverter for a bungalow near Trim. The customer wanted to reduce bills and prepare for a future battery. Installation took one day; they received the SEAI grant and now track production via the app.",
};

export default function SolarPanelsTrimPage() {
  return (
    <SolarLocationLayout headline="Solar Panels Trim" subline="Solar PV installation in Trim, Co. Meath. SEAI registered. Free quote." faq={FAQ} contactAnchorText="solar installers in Trim" electricalAnchorText="electrician Trim" buildersAnchorText="builders Meath" renovationsAnchorText="house renovations Meath" relatedTownLinks={[{ label: "Solar Panels Meath", href: "/solar-panels-meath" }, { label: "Solar Panels Navan", href: "/solar-panels-navan" }, { label: "Solar Panels Kells", href: "/solar-panels-kells" }]} recentProject={RECENT_PROJECT}>
      <p>
        Solar panel installation in Trim helps homeowners and businesses in the Boyne Valley cut electricity costs and use cleaner energy. Trim and the surrounding area have a strong mix of period and modern housing, and more properties are choosing solar PV with the support of the SEAI grant. Fennor Developments installs solar across Trim and Co. Meath, with clear quotes, hybrid inverters and optional battery storage.
      </p>

      <p>
        We’re based in Slane and work regularly in Trim. We assess your roof, orientation and usage before recommending a system size, and we install on slate, tile and suitable flat roofs. Every job is compliant and fully documented, and we guide you through the SEAI grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar benefits in Trim</h2>
      <p>
        Solar PV in Trim can significantly reduce your electricity bills and improve energy independence. Modern panels work well in Irish conditions, including overcast days, and typical payback is in the region of 3–8 years. Adding battery storage lets you use more of your solar energy in the evening. We design systems to match your consumption so you don’t over or under-size. We check for shading, discuss your consumption and explain options such as battery storage; we get the balance right and explain the numbers so you can decide with confidence.
      </p>

      <p>
        We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days. After installation, we provide full paperwork for warranties and for the SEAI grant, and we’re on hand for any questions or future upgrades. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires. Panels typically last 25 years or more.
      </p>

      <h2>SEAI grants and next steps</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Trim. We help you check eligibility and complete the application, and we install to the standard required so you can receive the grant. That support, combined with transparent pricing, makes solar in Trim a strong investment for many. If you’re in Trim and thinking about solar panels, we offer a free roof assessment. Use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback, visit our main <Link href="/solar">solar PV page</Link> for system details, or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
