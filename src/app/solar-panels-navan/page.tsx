import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Navan | Solar PV Installation Navan | Fennor Developments",
  description:
    "Solar panel installation in Navan. SEAI registered installer. Hybrid inverters, battery storage. Free assessment & quote. Serving Navan and Co. Meath.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Navan?",
    answer:
      "Yes. We install solar PV systems across Navan and the wider Navan area, including estates and one-off homes. We’re based in Slane and regularly work in Navan, so we know the area and can schedule assessments and installs efficiently.",
  },
  {
    question: "What does a solar installation in Navan typically include?",
    answer:
      "We install panels, a hybrid inverter and optional battery storage. System sizes are tailored to your roof and usage. All work is compliant and we assist with the SEAI grant application. You also get monitoring and full documentation.",
  },
  {
    question: "How much can I save with solar panels in Navan?",
    answer:
      "Savings depend on system size, orientation, shading and how much electricity you use. Many homes in Navan see payback in roughly 3–8 years. Use our solar calculator for an estimate, and we’ll give you a clearer picture at the assessment.",
  },
  {
    question: "Are you SEAI registered for Navan installations?",
    answer:
      "Yes. We’re SEAI registered and install to the standard required for the SEAI solar electricity grant. We help Navan customers through the application so they can claim up to €1,800 where eligible.",
  },
];

const RECENT_PROJECT = {
  title: "4.2 kWp solar PV, Navan estate",
  description:
    "We recently completed a 10-panel system with hybrid inverter for a family home in a Navan estate. The installation took one day; the customer received SEAI grant approval and now uses the app to track production. Typical payback for this size in the area is around 5–7 years.",
};

export default function SolarPanelsNavanPage() {
  return (
    <SolarLocationLayout headline="Solar Panels Navan" subline="Solar PV installation in Navan. SEAI registered. Free quote." faq={FAQ} contactAnchorText="solar panels Navan" electricalAnchorText="electrician Navan" buildersAnchorText="builders Meath" renovationsAnchorText="house renovations Meath" relatedTownLinks={[{ label: "Solar Panels Meath", href: "/solar-panels-meath" }, { label: "Solar Panels Trim", href: "/solar-panels-trim" }, { label: "Solar Panels Slane", href: "/solar-panels-slane" }]} recentProject={RECENT_PROJECT}>
      <p>
        Solar panel installation in Navan is a practical way to lower electricity bills and reduce reliance on the grid. More homes and businesses in Navan are turning to solar PV, and with the SEAI grant and improved technology, it’s an option that pays back for many households. Fennor Developments installs solar across Navan and Co. Meath, with clear quotes, hybrid inverters and optional battery storage.
      </p>

      <p>
        We’re based in Slane and work regularly in Navan, so we know the area and its mix of housing. We assess your roof, orientation and usage before recommending a system size. Whether you’re in an estate or a one-off home, we install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar PV for Navan homes</h2>
      <p>
        Navan’s mix of older and newer housing means we see a variety of roof types and electrical setups. We design each system around your property: we check for shading, discuss your consumption and explain options such as battery storage and monitoring. Our typical installs use hybrid inverters so you can add a battery later if you choose. We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days.
      </p>

      <p>
        Solar PV works well in Irish conditions, including overcast days. Modern panels are efficient in diffuse light, and many Navan homes see payback in the region of 3–8 years depending on system size and usage. Adding battery storage lets you use more of your solar energy in the evening and reduces reliance on the grid at peak times. We size systems to match your consumption so you don’t over or under-size—too small and you miss savings, too large and payback stretches.
      </p>

      <p>
        After installation, you can monitor production and see how much you’re saving. We provide full paperwork for warranties and for the SEAI grant, and we’re available for any questions. Choosing a local installer means you get someone who can return for servicing or upgrades and who understands the conditions and building styles in the Navan area. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires, including solar-ready setups.
      </p>

      <h2>Grants and next steps in Navan</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Navan and the rest of Ireland. Eligibility depends on factors such as when your home was built and its BER. We help you understand the rules and complete the application, and we install to the standard required so you can receive the grant. That support, combined with transparent pricing and a system built for Irish conditions, makes solar in Navan a strong investment for many.
      </p>

      <p>
        Navan’s mix of new and older housing means we see everything from modern estates to period homes. We assess each roof on its merits and recommend a system that fits your consumption and budget. We get the balance right and explain the numbers so you can decide with confidence. After installation, we’re only a short drive away for any questions or future upgrades. Panels typically last 25 years or more, so the investment pays back over the long term.
      </p>

      <p>
        If you’re in Navan and thinking about solar panels, we offer a free roof assessment. We’ll outline system size, grant options and a clear quote. You can also try our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback. For full details on systems, inverters and batteries, visit our main <Link href="/solar">solar PV page</Link> or <Link href="/contact">contact us</Link> to book an assessment.
      </p>
    </SolarLocationLayout>
  );
}
