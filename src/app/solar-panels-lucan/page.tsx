import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Lucan | Solar PV Installation Lucan Dublin | Fennor Developments",
  description:
    "Solar panel installation in Lucan, Dublin. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Lucan, Clondalkin and West Dublin.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Lucan?",
    answer:
      "Yes. We install solar PV across Lucan and West Dublin. We're based in Slane and regularly work in the Dublin area, so we can schedule assessments and installs efficiently.",
  },
  {
    question: "What are the benefits of solar in Lucan?",
    answer:
      "Solar PV can cut your electricity bills and reduce grid reliance. You can claim the SEAI grant where eligible (up to €1,800) and add battery storage. Typical payback is around 3–8 years depending on system size and usage.",
  },
  {
    question: "How long does a solar installation take in Lucan?",
    answer:
      "Most domestic installations in Lucan are completed in one to two days. We'll confirm the schedule after your free roof assessment.",
  },
  {
    question: "Are you SEAI registered for Lucan installations?",
    answer:
      "Yes. We're SEAI registered and install to the standard required for the SEAI solar electricity grant. We help Lucan customers through the application so they can claim the grant where eligible.",
  },
];

const RECENT_PROJECT = {
  title: "Lucan estate – 4.2 kWp solar PV",
  description:
    "We completed a 10-panel system with hybrid inverter for a family home in Lucan. The customer received SEAI grant approval; installation took one day. They now monitor production and savings via the app.",
};

export default function SolarPanelsLucanPage() {
  return (
    <SolarLocationLayout
      headline="Solar Panels Lucan"
      subline="Solar PV installation in Lucan, Dublin. SEAI registered. Free quote."
      faq={FAQ}
      contactAnchorText="solar panels Lucan"
      recentProject={RECENT_PROJECT}
    >
      <p>
        Solar panel installation in Lucan helps West Dublin homeowners cut electricity costs and use cleaner energy. Lucan and the surrounding area have a mix of estates and one-off homes well suited to solar PV. Fennor Developments installs solar across Lucan and the greater Dublin area from our base in Slane, with clear quotes, hybrid inverters and optional battery storage. We work regularly in West Dublin and can schedule assessments and installs without long lead times.
      </p>

      <p>
        We assess your roof, orientation and usage before recommending a system size. We install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible. Our typical installs use hybrid inverters so you can add a battery later if you choose, and we provide monitoring so you can track production and savings.
      </p>

      <h2>Why choose solar in Lucan</h2>
      <p>
        Lucan's mix of housing types means we see a variety of roof types and electrical setups. We design each system around your property: we check for shading, discuss your consumption and explain options such as battery storage. Modern panels work well in Irish conditions, including overcast days, and typical payback is in the region of 3–8 years. Adding battery storage lets you use more of your solar energy in the evening and improves independence from the grid at peak times.
      </p>

      <p>
        We size systems to match your consumption so you don't over or under-size. We get the balance right and explain the numbers so you can decide with confidence. We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days. After installation, we provide full paperwork for warranties and for the SEAI grant, and we're on hand for any questions or future upgrades.
      </p>

      <h2>SEAI grants and next steps</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Lucan and across Ireland. Eligibility depends on factors such as when your home was built and its BER. We help you understand the requirements and complete the application, and we install to the standard required so you can receive the grant. That support, combined with transparent pricing, makes solar in Lucan a strong investment for many households.
      </p>

      <p>
        We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires. If you're in Lucan and thinking about solar panels, we offer a free roof assessment. Use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback, and visit our main <Link href="/solar">solar PV page</Link> for system details or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
