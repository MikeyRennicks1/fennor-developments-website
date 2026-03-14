import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Ashbourne | Solar PV Installation Ashbourne Meath | Fennor Developments",
  description:
    "Solar panel installation in Ashbourne, Co. Meath. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Ashbourne, Ratoath and East Meath.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Ashbourne?",
    answer:
      "Yes. We install solar PV across Ashbourne and East Meath, including Ratoath and the M3 corridor. We&apos;re based in Slane and regularly work in the area.",
  },
  {
    question: "Why choose solar in Ashbourne?",
    answer:
      "Ashbourne&apos;s mix of established and new housing is well suited to solar. You can cut bills, claim the SEAI grant where eligible, and add battery storage. Typical payback is around 3–8 years.",
  },
  {
    question: "How long does a solar installation take in Ashbourne?",
    answer:
      "Most domestic installations in Ashbourne are completed in one to two days. We&apos;ll confirm the schedule after your free roof assessment.",
  },
  {
    question: "Is the SEAI grant available in Ashbourne?",
    answer:
      "Yes. The SEAI solar electricity grant is available to qualifying homes in Ashbourne and across Ireland. We&apos;re SEAI registered and help you through the application for up to €1,800 depending on system size.",
  },
];

const RECENT_PROJECT = {
  title: "Ashbourne estate – 4.2 kWp solar PV",
  description:
    "We completed a 10-panel system with hybrid inverter for a family home in an Ashbourne estate. The customer received SEAI grant approval; installation took one day. They now monitor production and savings via the app.",
};

export default function SolarPanelsAshbournePage() {
  return (
    <SolarLocationLayout headline="Solar Panels Ashbourne" subline="Solar PV installation in Ashbourne, Co. Meath. SEAI registered. Free quote." faq={FAQ} contactAnchorText="solar panels Ashbourne" electricalAnchorText="electrician Ashbourne" buildersAnchorText="builders Meath" renovationsAnchorText="house renovations Meath" relatedTownLinks={[{ label: "Solar Panels Meath", href: "/solar-panels-meath" }, { label: "Solar Panels Ratoath", href: "/solar-panels-ratoath" }, { label: "Solar Panels Dunshaughlin", href: "/solar-panels-dunshaughlin" }]} recentProject={RECENT_PROJECT}>
      <p>
        Solar panel installation in Ashbourne helps East Meath homeowners cut electricity costs and use cleaner energy. Ashbourne and the surrounding area have grown significantly, with a mix of estates and one-off homes well suited to solar PV. Fennor Developments installs solar across Ashbourne and Co. Meath, with clear quotes, hybrid inverters and optional battery storage.
      </p>

      <p>
        We assess your roof, orientation and usage before recommending a system size. We install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar benefits in Ashbourne</h2>
      <p>
        Solar PV in Ashbourne can significantly reduce your electricity bills. Modern panels work well in Irish conditions, and typical payback is in the region of 3–8 years. Adding battery storage improves self-consumption and evening use. We design systems to match your consumption and explain grant options and payback clearly. We check for shading, discuss your consumption and get the balance right so you don&apos;t over or under-size.
      </p>

      <p>
        We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days. After installation, we provide full paperwork for warranties and for the SEAI grant. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires. Panels typically last 25 years or more.
      </p>

      <h2>SEAI grants and next steps</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Ashbourne and across Ireland. We help you through the application and install to the standard required so you can receive the grant. If you&apos;re in Ashbourne and thinking about solar panels, we offer a free roof assessment. Use our <Link href="/calculator">solar calculator</Link> for an idea of savings, see our main <Link href="/solar">solar PV page</Link> for system details and grants, or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
