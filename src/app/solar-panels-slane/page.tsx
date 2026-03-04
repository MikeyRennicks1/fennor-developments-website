import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";

export const metadata: Metadata = {
  title: "Solar Panels Slane | Solar PV Installation Slane Co. Meath | Fennor Developments",
  description:
    "Solar panel installation in Slane, Co. Meath. Local SEAI registered installer. Hybrid inverters, batteries. Free assessment. Based in Slane.",
};

const FAQ = [
  {
    question: "Are you based in Slane?",
    answer:
      "Yes. Fennor Developments is based in Slane, Co. Meath. We install solar panels in Slane and across Meath, Louth, Dublin and surrounding counties. Being local means we can assess and install quickly and are on hand for aftercare.",
  },
  {
    question: "Do you install solar on period or older homes in Slane?",
    answer:
      "Yes. Slane has many period and character homes. We install on slate and tile roofs where structurally suitable and ensure all work meets current standards. We’ll assess your roof and advise on the best layout and system size.",
  },
  {
    question: "What’s included in a solar quote for Slane?",
    answer:
      "We quote for panels, hybrid inverter, mounting and labour. Optional add-ons include battery storage and monitoring. The quote is fixed for the scope agreed, and we outline SEAI grant eligibility and typical payback so you can decide with full information.",
  },
  {
    question: "How do I get a solar quote in Slane?",
    answer:
      "Contact us to book a free roof assessment. We’ll visit, discuss your usage and goals, and send a clear quote. You can also use our solar calculator online for an estimate, then we’ll refine it with a site visit.",
  },
];

const RECENT_PROJECT = {
  title: "Slane period home – solar PV on slate roof",
  description:
    "A Slane homeowner wanted to reduce bills and add battery storage for evening use. We installed a 12-panel system with hybrid inverter and battery on a slate roof, with minimal visual impact. The customer qualified for the SEAI grant and now self-consumes most of their daytime use.",
};

export default function SolarPanelsSlanePage() {
  return (
    <SolarLocationLayout headline="Solar Panels Slane" subline="Local solar PV installation in Slane, Co. Meath. SEAI registered." faq={FAQ} contactAnchorText="solar installers in Slane" electricalAnchorText="electrician Meath" buildersAnchorText="builders Meath" renovationsAnchorText="house renovations Meath" relatedTownLinks={[{ label: "Solar Panels Meath", href: "/solar-panels-meath" }, { label: "Solar Panels Navan", href: "/solar-panels-navan" }, { label: "Solar Panels Trim", href: "/solar-panels-trim" }]} recentProject={RECENT_PROJECT}>
      <p>
        Solar panel installation in Slane gives local homeowners and businesses a way to cut electricity costs and use cleaner energy. Slane and the surrounding Boyne Valley have a mix of period homes, modern builds and farms — all of which can benefit from well-designed solar PV. Fennor Developments is based in Slane and has installed solar across the village and wider area, so we understand local roofs, planning and the needs of Slane residents.
      </p>

      <p>
        We design systems to suit your property and your usage. That might mean a straightforward panel-and-inverter setup or a system with battery storage for evening use. We work on slate, tile and suitable flat roofs and ensure every installation is compliant and eligible for the SEAI grant where applicable. As a local, SEAI registered installer, we handle the grant paperwork and provide long-term support so your system performs for years.
      </p>

      <h2>Why choose a Slane-based solar installer</h2>
      <p>
        Being based in Slane means we can respond quickly to enquiries, carry out assessments without long travel times and return easily for any follow-up. We know the area’s roof types and typical building styles, which helps us give accurate quotes and avoid surprises on the day. Many of our Slane customers appreciate having a local contact who understands their property and can offer ongoing advice on monitoring, batteries or future upgrades.
      </p>

      <p>
        Our installations use hybrid inverters as standard, so you can add battery storage later if you wish. We also set up monitoring so you can see production and savings. From the first visit to handover, we keep the process clear and minimise disruption. We’re fully insured and provide the documentation you need for warranties and for the SEAI grant application. Solar PV works well in Irish conditions, including overcast days; typical payback in the Slane area is in the region of 3–8 years depending on system size and usage.
      </p>

      <p>
        We size systems to match your consumption so you don’t over or under-size. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires, including solar-ready setups. Panels typically last 25 years or more, so the investment pays back over the long term.
      </p>

      <h2>SEAI grants and solar in Slane</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Slane and across Ireland. We help you check eligibility and complete the application. Our installs meet the standard required for the grant, so you can claim up to €1,800 where eligible. For Slane homeowners, that grant makes solar more affordable and shortens payback.
      </p>

      <p>
        Slane and the Boyne Valley have a strong mix of residential and farm buildings. We install on both: domestic systems for homes and, where appropriate, larger or farm installations. Every job is quoted clearly, with no hidden extras, and we work around your schedule where we can. Because we’re local, we can often fit in assessments and installs without long waits, and we’re on hand for monitoring advice or battery additions later on.
      </p>

      <p>
        If you’re in Slane and considering solar panels, get in touch for a free roof assessment. We’ll explain system size, grant options and give you a clear quote. You can also use our <Link href="/calculator">solar calculator</Link> to estimate savings, read more about systems and grants on our main <Link href="/solar">solar PV page</Link>, or <Link href="/contact">contact us</Link> to book.
      </p>
    </SolarLocationLayout>
  );
}
