import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Blanchardstown | Dublin | Fennor Developments",
  description:
    "Solar panel installation in Blanchardstown, Dublin 15. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Blanchardstown and West Dublin.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Blanchardstown?",
    answer:
      "Yes. We install solar PV across Blanchardstown and West Dublin. We&apos;re based in Slane and regularly work in the Dublin 15 area, so we can schedule assessments and installs efficiently.",
  },
  {
    question: "What are the benefits of solar in Blanchardstown?",
    answer:
      "Solar PV can cut your electricity bills and reduce grid reliance. You can claim the SEAI grant where eligible (up to €1,800) and add battery storage. Typical payback is around 3–8 years.",
  },
  {
    question: "How long does installation take in Blanchardstown?",
    answer:
      "Most domestic solar installations in Blanchardstown are completed in one to two days. We&apos;ll confirm the schedule after your free roof assessment.",
  },
  {
    question: "Are you SEAI registered for Blanchardstown?",
    answer:
      "Yes. We&apos;re SEAI registered and install to the standard required for the SEAI solar electricity grant. We help Blanchardstown customers through the application so they can claim the grant where eligible.",
  },
];

const RECENT_PROJECT = {
  title: "Blanchardstown semi-d – 3.6 kWp solar PV",
  description:
    "We installed a 9-panel system with hybrid inverter for a semi-d in Blanchardstown. The customer wanted to reduce bills and prepare for a future battery. Installation took one day; they received the SEAI grant and now track production via the app.",
};

export default function SolarPanelsBlanchardstownPage() {
  return (
    <SolarLocationLayout headline="Solar Panels Blanchardstown" subline="Solar PV installation in Blanchardstown, Dublin 15. SEAI registered. Free quote." faq={FAQ} contactAnchorText="solar panels Blanchardstown" recentProject={RECENT_PROJECT}>
      <p>
        Solar panel installation in Blanchardstown helps West Dublin homeowners cut electricity costs and use cleaner energy. Blanchardstown and Dublin 15 have a mix of estates and one-off homes well suited to solar PV. Fennor Developments installs solar across Blanchardstown and the greater Dublin area from our base in Slane, with clear quotes, hybrid inverters and optional battery storage.
      </p>

      <p>
        We assess your roof, orientation and usage before recommending a system size. We install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar benefits in Blanchardstown</h2>
      <p>
        Solar PV in Blanchardstown can significantly reduce your electricity bills. Panels work well in Irish daylight conditions, and typical payback is in the region of 3–8 years. Adding battery storage lets you use more of your solar energy in the evening. We size systems to match your consumption and explain grant options and payback clearly. We design each system around your property and check for shading and options such as battery storage and monitoring.
      </p>

      <p>
        We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days. After installation, we provide full paperwork for warranties and for the SEAI grant. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires. Panels typically last 25 years or more.
      </p>

      <h2>SEAI grants and next steps</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Blanchardstown and across Ireland. We help you through the application and install to the standard required so you can receive the grant. If you&apos;re in Blanchardstown and thinking about solar panels, we offer a free roof assessment. Use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback, see our main <Link href="/solar">solar PV page</Link> for systems and grants, or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
