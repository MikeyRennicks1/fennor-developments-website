import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Ratoath | Solar PV Installation Ratoath Meath | Fennor Developments",
  description:
    "Solar panel installation in Ratoath, Co. Meath. SEAI registered. Hybrid inverters, battery storage. Free quote. Serving Ratoath, Ashbourne and East Meath.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Ratoath?",
    answer:
      "Yes. We install solar PV across Ratoath and East Meath, including Ashbourne and the M3 corridor. We&apos;re based in Slane and regularly work in the area.",
  },
  {
    question: "What are the benefits of solar in Ratoath?",
    answer:
      "Solar PV can cut your electricity bills and reduce grid reliance. You can claim the SEAI grant where eligible (up to €1,800) and add battery storage. Typical payback is around 3–8 years depending on system size and usage.",
  },
  {
    question: "How long does a solar installation take in Ratoath?",
    answer:
      "Most domestic installations in Ratoath are completed in one to two days. We&apos;ll confirm the schedule after your free roof assessment.",
  },
  {
    question: "Are you SEAI registered for Ratoath installations?",
    answer:
      "Yes. We&apos;re SEAI registered and install to the standard required for the SEAI solar electricity grant. We help Ratoath customers through the application so they can claim the grant where eligible.",
  },
];

const RECENT_PROJECT = {
  title: "Ratoath estate – 4.2 kWp solar PV",
  description:
    "We completed a 10-panel system with hybrid inverter for a family home in Ratoath. The customer received SEAI grant approval; installation took one day. They now monitor production and savings via the app.",
};

export default function SolarPanelsRatoathPage() {
  return (
    <SolarLocationLayout
      headline="Solar Panels Ratoath"
      subline="Solar PV installation in Ratoath, Co. Meath. SEAI registered. Free quote."
      faq={FAQ}
      contactAnchorText="solar panels Ratoath"
      electricalAnchorText="electrician Meath"
      buildersAnchorText="builders Meath"
      renovationsAnchorText="house renovations Meath"
      relatedTownLinks={[{ label: "Solar Panels Meath", href: "/solar-panels-meath" }, { label: "Solar Panels Dunshaughlin", href: "/solar-panels-dunshaughlin" }, { label: "Solar Panels Ashbourne", href: "/solar-panels-ashbourne" }]}
      recentProject={RECENT_PROJECT}
    >
      <p>
        Solar panel installation in Ratoath is increasingly popular as East Meath homeowners look to cut electricity bills and reduce carbon. Ratoath has grown significantly in recent years, with a mix of established estates and new developments that are well suited to solar PV. Fennor Developments installs solar across Ratoath and Co. Meath, with clear quotes, hybrid inverters and optional battery storage. We&apos;re based in Slane and work regularly in the area, so we can schedule assessments and installs without long lead times.
      </p>

      <p>
        Whether you&apos;re in an estate or a one-off home, we assess your roof, orientation and usage before recommending a system size. We install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible. Our typical installs use hybrid inverters so you can add a battery later if you choose, and we provide monitoring so you can track production and savings.
      </p>

      <h2>Why choose solar in Ratoath</h2>
      <p>
        Ratoath&apos;s mix of modern and older housing means we see a variety of roof types and electrical setups. We design each system around your property: we check for shading, discuss your consumption and explain options such as battery storage. Sizing correctly is important—too small and you miss savings, too large and payback stretches. We get the balance right and explain the numbers so you can decide with confidence. Many of our Ratoath customers see payback in roughly 3–8 years, with panels typically lasting 25 years or more.
      </p>

      <p>
        Solar PV works well in Irish conditions, including overcast days. Modern panels are efficient in diffuse light, and adding battery storage lets you use more of your solar energy in the evening. That improves self-consumption and reduces reliance on the grid at peak times. We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days, with minimal disruption.
      </p>

      <h2>SEAI grants and installation in Ratoath</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Ratoath and across Ireland. Eligibility depends on factors such as when your home was built and its BER. We help you understand the requirements and complete the application, and we install to the standard required so you can receive the grant. That support, combined with transparent pricing and a system built for Irish conditions, makes solar in Ratoath a strong investment for many households.
      </p>

      <p>
        After installation, we provide full paperwork for warranties and for the SEAI grant. We&apos;re available for any questions or future upgrades, and choosing a local installer means you get someone who can return for servicing and who understands the area. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires, including solar-ready setups.
      </p>

      <p>
        If you&apos;re in Ratoath and thinking about solar panels, we offer a free roof assessment. We&apos;ll outline system size, grant options and a clear quote. You can also use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback. For full details on systems, inverters and batteries, visit our main <Link href="/solar">solar PV page</Link> or <Link href="/contact">contact us</Link> to book an assessment.
      </p>
    </SolarLocationLayout>
  );
}
