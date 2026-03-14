import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Dunshaughlin | Meath | Fennor Developments",
  description:
    "Solar panel installation in Dunshaughlin, Co. Meath. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Dunshaughlin, Navan and Mid-Meath.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Dunshaughlin?",
    answer:
      "Yes. We install solar PV across Dunshaughlin and Mid-Meath, including Navan and the N3 corridor. We&apos;re based in Slane and regularly work in the area.",
  },
  {
    question: "What are the benefits of solar in Dunshaughlin?",
    answer:
      "Solar PV can cut your electricity bills and reduce grid reliance. You can claim the SEAI grant where eligible (up to €1,800) and add battery storage. Typical payback is around 3–8 years depending on system size and usage.",
  },
  {
    question: "How long does a solar installation take in Dunshaughlin?",
    answer:
      "Most domestic installations in Dunshaughlin are completed in one to two days. We&apos;ll confirm the schedule after your free roof assessment.",
  },
  {
    question: "Are you SEAI registered for Dunshaughlin installations?",
    answer:
      "Yes. We&apos;re SEAI registered and install to the standard required for the SEAI solar electricity grant. We help Dunshaughlin customers through the application so they can claim the grant where eligible.",
  },
];

const RECENT_PROJECT = {
  title: "Dunshaughlin one-off – 5 kWp solar PV and battery",
  description:
    "A family near Dunshaughlin wanted to maximise self-consumption. We installed a 14-panel system with hybrid inverter and battery. The customer qualified for the SEAI grant; installation was completed in two days.",
};

export default function SolarPanelsDunshaughlinPage() {
  return (
    <SolarLocationLayout
      headline="Solar Panels Dunshaughlin"
      subline="Solar PV installation in Dunshaughlin, Co. Meath. SEAI registered. Free quote."
      faq={FAQ}
      contactAnchorText="solar panels Dunshaughlin"
      electricalAnchorText="electrical services"
      buildersAnchorText="builders Meath"
      renovationsAnchorText="house renovations Meath"
      relatedTownLinks={[{ label: "Solar Panels Meath", href: "/solar-panels-meath" }, { label: "Solar Panels Ratoath", href: "/solar-panels-ratoath" }, { label: "Solar Panels Ashbourne", href: "/solar-panels-ashbourne" }]}
      recentProject={RECENT_PROJECT}
    >
      <p>
        Solar panel installation in Dunshaughlin helps Mid-Meath homeowners cut electricity costs and use cleaner energy. Dunshaughlin and the surrounding area have a strong mix of town and rural properties, many of which are well suited to solar PV. Fennor Developments installs solar across Dunshaughlin and Co. Meath, with clear quotes, hybrid inverters and optional battery storage. We&apos;re based in Slane and work regularly in the area, so we can schedule assessments and installs efficiently.
      </p>

      <p>
        We assess your roof, orientation and usage before recommending a system size. Whether you&apos;re in the village or in the countryside, we install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible. Our typical installs use hybrid inverters so you can add a battery later if you choose, and we provide monitoring so you can track production and savings.
      </p>

      <h2>Why choose solar in Dunshaughlin</h2>
      <p>
        Dunshaughlin&apos;s location and mix of housing make it well suited to solar. We design each system around your property: we check for shading, discuss your consumption and explain options such as battery storage. Modern panels work well in Irish conditions, including overcast days, and typical payback is in the region of 3–8 years. Adding battery storage lets you use more of your solar energy in the evening and improves independence from the grid at peak times.
      </p>

      <p>
        We size systems to match your consumption so you don&apos;t over or under-size. Too small and you miss savings; too large and payback stretches. We get the balance right and explain the numbers so you can decide with confidence. We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days, with minimal disruption. After installation, we&apos;re on hand for any questions or future upgrades.
      </p>

      <h2>SEAI grants and next steps</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Dunshaughlin and across Ireland. Eligibility depends on factors such as when your home was built and its BER. We help you understand the requirements and complete the application, and we install to the standard required so you can receive the grant. That support, combined with transparent pricing, makes solar in Dunshaughlin a strong investment for many.
      </p>

      <p>
        We provide full paperwork for warranties and for the SEAI grant, and we&apos;re available for servicing or upgrades. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires. If you&apos;re in Dunshaughlin and thinking about solar panels, we offer a free roof assessment. Use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback, and visit our main <Link href="/solar">solar PV page</Link> for system details or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
