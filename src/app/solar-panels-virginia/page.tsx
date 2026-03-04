import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Virginia | Solar PV Installation Virginia Cavan | Fennor Developments",
  description:
    "Solar panel installation in Virginia, Co. Cavan. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Virginia and the Cavan-Meath border.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Virginia?",
    answer:
      "Yes. We install solar PV across Virginia and the Cavan-Meath border area. We're based in Slane and regularly work in Virginia and surrounding towns.",
  },
  {
    question: "What are the benefits of solar in Virginia?",
    answer:
      "Solar PV can cut your electricity bills and reduce grid reliance. You can claim the SEAI grant where eligible (up to €1,800) and add battery storage. Typical payback is around 3–8 years.",
  },
  {
    question: "How long does installation take in Virginia?",
    answer:
      "Most domestic solar installations in Virginia are completed in one to two days. We'll confirm the schedule after your free roof assessment.",
  },
  {
    question: "Are you SEAI registered for Virginia?",
    answer:
      "Yes. We're SEAI registered and install to the standard required for the SEAI solar electricity grant. We help Virginia customers through the application so they can claim the grant where eligible.",
  },
];

const RECENT_PROJECT = {
  title: "Virginia one-off – 5 kWp solar PV and battery",
  description:
    "A family near Virginia wanted to maximise self-consumption. We installed a 14-panel system with hybrid inverter and battery. The customer qualified for the SEAI grant; installation was completed in two days.",
};

export default function SolarPanelsVirginiaPage() {
  return (
    <SolarLocationLayout
      headline="Solar Panels Virginia"
      subline="Solar PV installation in Virginia, Co. Cavan. SEAI registered. Free quote."
      faq={FAQ}
      contactAnchorText="solar panels Virginia"
      recentProject={RECENT_PROJECT}
    >
      <p>
        Solar panel installation in Virginia helps homeowners in Cavan and the border area cut electricity costs and use cleaner energy. Virginia and the surrounding region have a mix of rural and town properties well suited to solar PV. Fennor Developments installs solar across Virginia and the North East, with clear quotes, hybrid inverters and optional battery storage.
      </p>

      <p>
        We assess your roof, orientation and usage before recommending a system size. We install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar benefits in Virginia</h2>
      <p>
        Solar PV in Virginia can significantly reduce your electricity bills. Panels work well in Irish daylight conditions, and typical payback is in the region of 3–8 years. Adding battery storage improves evening use. We size systems to match your consumption and explain grant options and payback so you can decide with confidence. We design each system around your property and check for shading and options such as battery storage.
      </p>

      <p>
        We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days. After installation, we provide full paperwork for warranties and for the SEAI grant. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires. Panels typically last 25 years or more.
      </p>

      <h2>SEAI grants and next steps</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Virginia and across Ireland. We help you through the application and install to the standard required so you can receive the grant. If you're in Virginia and thinking about solar panels, we offer a free roof assessment. Use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback, see our main <Link href="/solar">solar PV page</Link> for systems and grants, or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
