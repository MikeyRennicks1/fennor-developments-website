import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Ardee | Solar PV Installation Ardee Louth | Fennor Developments",
  description:
    "Solar panel installation in Ardee, Co. Louth. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Ardee, Dundalk and Mid-Louth.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Ardee?",
    answer:
      "Yes. We install solar PV across Ardee and Mid-Louth, including Dundalk and the N2 corridor. We&apos;re based in Slane and regularly work in the area.",
  },
  {
    question: "What are the benefits of solar in Ardee?",
    answer:
      "Solar PV can cut your electricity bills and reduce grid reliance. You can claim the SEAI grant where eligible (up to €1,800) and add battery storage. Typical payback is around 3–8 years depending on system size and usage.",
  },
  {
    question: "How long does a solar installation take in Ardee?",
    answer:
      "Most domestic installations in Ardee are completed in one to two days. We&apos;ll confirm the schedule after your free roof assessment.",
  },
  {
    question: "Are you SEAI registered for Ardee installations?",
    answer:
      "Yes. We&apos;re SEAI registered and install to the standard required for the SEAI solar electricity grant. We help Ardee customers through the application so they can claim the grant where eligible.",
  },
];

const RECENT_PROJECT = {
  title: "Ardee bungalow – 4.2 kWp solar PV",
  description:
    "We installed a 10-panel system with hybrid inverter for a bungalow near Ardee. The customer wanted to reduce bills and add battery storage later. Installation took one day; they received the SEAI grant and now track production via the app.",
};

export default function SolarPanelsArdeePage() {
  return (
    <SolarLocationLayout
      headline="Solar Panels Ardee"
      subline="Solar PV installation in Ardee, Co. Louth. SEAI registered. Free quote."
      faq={FAQ}
      contactAnchorText="solar panels Ardee"
      recentProject={RECENT_PROJECT}
    >
      <p>
        Solar panel installation in Ardee helps Mid-Louth homeowners cut electricity costs and use cleaner energy. Ardee and the surrounding area have a mix of town and rural properties, many well suited to solar PV. Fennor Developments installs solar across Ardee and Co. Louth from our base in Slane, with clear quotes, hybrid inverters and optional battery storage. We work regularly in the area and can schedule assessments and installs without long lead times.
      </p>

      <p>
        We assess your roof, orientation and usage before recommending a system size. We install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible. Our typical installs use hybrid inverters so you can add a battery later if you choose, and we provide monitoring so you can track production and savings.
      </p>

      <h2>Why choose solar in Ardee</h2>
      <p>
        Ardee&apos;s mix of period and modern housing means we see a variety of roof types and electrical setups. We design each system around your property: we check for shading, discuss your consumption and explain options such as battery storage. Modern panels work well in Irish conditions, including overcast days, and typical payback is in the region of 3–8 years. Adding battery storage lets you use more of your solar energy in the evening and improves independence from the grid.
      </p>

      <p>
        We size systems to match your consumption so you don&apos;t over or under-size. We get the balance right and explain the numbers so you can decide with confidence. We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days. After installation, we provide full paperwork for warranties and for the SEAI grant, and we&apos;re on hand for any questions or future upgrades.
      </p>

      <h2>SEAI grants and next steps</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Ardee and across Ireland. Eligibility depends on factors such as when your home was built and its BER. We help you understand the requirements and complete the application, and we install to the standard required so you can receive the grant. That support, combined with transparent pricing, makes solar in Ardee a strong investment for many households.
      </p>

      <p>
        We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires. If you&apos;re in Ardee and thinking about solar panels, we offer a free roof assessment. Use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback, and visit our main <Link href="/solar">solar PV page</Link> for system details or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
