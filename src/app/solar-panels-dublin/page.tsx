import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";
import { SolarAreasGrid } from "@/components/solar/SolarAreasGrid";
import { getSolarLocationsByCounty } from "@/config/solar-locations-full";

export const metadata: Metadata = {
  title: "Solar Panels Dublin | Solar PV Installation North County Dublin | Fennor",
  description:
    "Solar panel installation across North County Dublin. Swords, Blanchardstown, Malahide, Skerries & more. SEAI registered. Free quote.",
};

const dublinTowns = getSolarLocationsByCounty().find((c) => c.county === "Dublin")?.towns ?? [];

const FAQ = [
  {
    question: "Do you install solar panels in Dublin?",
    answer:
      "Yes. We install solar PV across North County Dublin including Swords, Blanchardstown, Malahide, Skerries, Balbriggan, Howth, Finglas and surrounding areas. We&apos;re based in Slane, Co. Meath, and regularly work across North Dublin.",
  },
  {
    question: "Is the SEAI grant available for solar in Dublin?",
    answer:
      "Yes. The SEAI solar electricity grant is available to eligible homes across Ireland, including Dublin. We&apos;re SEAI registered and help you through the application. You can claim up to €1,800 depending on system size.",
  },
  {
    question: "How long does a solar installation take in North Dublin?",
    answer:
      "Most domestic installations in North Dublin are completed in one to two days. We&apos;ll confirm the schedule after your assessment. Roof access, system size and any extras like battery storage can affect the timeline.",
  },
  {
    question: "Why choose Fennor for solar panels in Dublin?",
    answer:
      "We&apos;re an SEAI registered installer with years of experience across Meath, Louth and North Dublin. We offer clear quotes, grant support, hybrid inverters and optional batteries. We&apos;re fully insured and provide full documentation and aftercare.",
  },
];

export default function SolarPanelsDublinPage() {
  return (
    <SolarLocationLayout
      headline="Solar Panels Dublin"
      subline="Solar PV installation across North County Dublin. SEAI registered. Free assessment."
      faq={FAQ}
      contactAnchorText="solar panels Dublin"
      electricalAnchorText="electrical services Dublin"
      buildersAnchorText="building and renovations"
      relatedTownLinks={[
        { label: "Solar Panels Meath", href: "/solar-panels-meath" },
        { label: "Solar Panels Louth", href: "/solar-panels-louth" },
        { label: "Solar Panels Swords", href: "/solar-panels-swords" },
        { label: "Solar Panels Blanchardstown", href: "/solar-panels-blanchardstown" },
        { label: "Solar Panels Malahide", href: "/solar-panels-malahide" },
      ]}
    >
      <p>
        Solar panel installation in Dublin — especially North County Dublin — is one of the most effective ways to cut electricity bills and reduce carbon. With the SEAI grant and modern solar technology, a well-designed system can pay back in a few years and deliver clean energy for decades. Fennor Developments installs solar across North Dublin from our base in Slane, Co. Meath, offering clear quotes, hybrid inverters and optional battery storage.
      </p>

      <p>
        We cover North County Dublin including Swords, Blanchardstown, Malahide, Skerries, Balbriggan, Howth, Finglas, Clonsilla, Castleknock and the wider area. Whether you&apos;re in a suburb or a coastal town, we assess your roof, orientation and usage before recommending a system size. We install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar PV across North County Dublin</h2>
      <p>
        Dublin&apos;s mix of urban and coastal locations means varied roof types and orientations. We design each system around your property: we check for shading, discuss your consumption and explain options such as batteries and monitoring. Our typical installs use hybrid inverters so you can add storage later if you choose. We keep the process straightforward and aim to complete most domestic installations in one to two days.
      </p>

      <p>
        Solar PV works well in Irish conditions, including overcast days. Many homes in North Dublin see payback in the region of 3–8 years depending on system size and usage. Adding battery storage lets you use more of your solar energy in the evening. We also offer <Link href="/electrical">electrical services</Link> and <Link href="/building-renovations">building and renovations</Link> for complete home solutions.
      </p>

      <h2>SEAI grants and installation in Dublin</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes across Ireland, including Dublin. We help you understand the requirements and complete the application. Once approved, we install to the standard required for the grant. Combining the grant with today&apos;s panel and inverter technology makes solar in Dublin more affordable than ever.
      </p>

      <p>
        If you&apos;re considering solar panels in Dublin, the next step is a free roof assessment. We&apos;ll discuss your goals, explain system sizes and options such as batteries, and give you a clear quote. You can also use our <Link href="/calculator">solar calculator</Link> to get an idea of savings and payback. For the full picture, see our main <Link href="/solar">solar PV page</Link> or <Link href="/contact">contact us</Link>.
      </p>

      <SolarAreasGrid countyLabel="North County Dublin" towns={dublinTowns} />
    </SolarLocationLayout>
  );
}
