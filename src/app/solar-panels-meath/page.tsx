import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";
import { SolarAreasGrid } from "@/components/solar/SolarAreasGrid";
import { getSolarLocationsByCounty } from "@/config/solar-locations-full";

export const metadata: Metadata = {
  title: "Solar Panels Meath | Solar PV Installation Co. Meath | Fennor Developments",
  description:
    "Solar panel installation across Meath. SEAI registered, hybrid inverters, battery storage. Navan, Slane, Trim, Kells & Co. Meath. Free quote.",
};

const FAQ = [
  {
    question: "Do you install solar panels across all of Meath?",
    answer:
      "Yes. We cover Co. Meath including Navan, Slane, Trim, Kells, Ashbourne, Dunshaughlin, Ratoath and surrounding areas. We’re based in Slane and regularly install solar PV and batteries right across the county.",
  },
  {
    question: "Can I get the SEAI solar grant in Meath?",
    answer:
      "The SEAI solar electricity grant is available to homes in Ireland, including Meath, subject to eligibility (e.g. built before 2021, BER requirements). We’re SEAI registered and help you through the application. Grant amounts are up to €1,800 depending on system size.",
  },
  {
    question: "How long does a typical solar installation take in Meath?",
    answer:
      "Most domestic installations in Meath are completed in one to two days. We’ll confirm the schedule after your assessment. Roof type, system size and any battery or inverter upgrades can affect the timeline.",
  },
  {
    question: "Why choose a local Meath installer for solar panels?",
    answer:
      "A local installer knows the area, can assess your roof and shading quickly, and is on hand for aftercare. We’ve installed solar across Meath for years and offer long-term support, clear documentation and SEAI grant assistance.",
  },
];

export default function SolarPanelsMeathPage() {
  return (
    <SolarLocationLayout headline="Solar Panels Meath" subline="Solar PV installation across Co. Meath. SEAI registered." faq={FAQ} contactAnchorText="solar installers in Meath" electricalAnchorText="electrician Meath" buildersAnchorText="builders Meath" renovationsAnchorText="house renovations Meath" relatedTownLinks={[{ label: "Solar Panels Navan", href: "/solar-panels-navan" }, { label: "Solar Panels Trim", href: "/solar-panels-trim" }, { label: "Solar Panels Kells", href: "/solar-panels-kells" }, { label: "Solar Panels Slane", href: "/solar-panels-slane" }]}>
      <p>
        Solar panel installation in Meath is one of the most effective ways to cut electricity bills and reduce carbon. With strong support from the SEAI grant and a growing number of homes and farms choosing solar, Co. Meath is well suited to solar PV — from Navan and Slane to Trim, Kells, Ashbourne and the wider county.
      </p>

      <p>
        Fennor Developments is based in Slane and has been installing solar panels across Meath for years. We design and fit systems that match your roof, your usage and your budget. Whether you’re in a period property or a new build, we work with slate, tile and flat roofs and ensure every installation is compliant, insured and built to last. We’re SEAI registered and guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Why solar makes sense in Meath</h2>
      <p>
        Meath’s mix of rural and suburban homes means varied roof types and orientations. We carry out a proper assessment before quoting: we look at roof pitch, shading, and your current usage so the system size and panel layout are right for your property. Many of our Meath customers see payback in the region of 3–8 years, with panels typically lasting 25 years or more. Adding battery storage lets you use more of your solar energy in the evening and improves independence from the grid.
      </p>

      <p>
        Hybrid inverters are at the heart of our typical installs. They maximise self-consumption and are ready for battery storage if you want to add it later. We also install monitoring so you can track production and savings. From initial quote to handover, we keep the process clear and minimise disruption. Our team is local, so we’re on hand for any follow-up and we provide full documentation for warranties and insurance.
      </p>

      <h2>SEAI grants and installation in Meath</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Ireland, including all of Meath. Eligibility depends on factors such as when your home was built and its BER. We help you understand the requirements and complete the application. Once approved, we install to the standard required for the grant and provide the paperwork you need to receive the payment. Combining the grant with today’s panel and inverter technology makes solar in Meath more affordable than ever.
      </p>

      <p>
        Meath’s climate is well suited to solar PV. Even with typical Irish weather, modern panels generate useful output on overcast days, and in summer you can often cover a large share of daytime use and feed surplus into a battery or the grid. We size systems so they’re not oversized for your consumption, which keeps payback realistic and avoids unnecessary cost. Whether you’re in a bungalow near Trim or a larger home near Ashbourne, we tailor the design to your property.
      </p>

      <p>
        If you&apos;re considering solar panels in Meath, the next step is a free roof assessment. We&apos;ll discuss your goals, explain system sizes and options such as batteries, and give you a clear quote. You can also use our <Link href="/calculator">solar calculator</Link> to get an idea of savings and payback. For the full picture — including grants and a tailored design — get in touch or read more on our main <Link href="/solar">solar PV page</Link>.
      </p>
      <SolarAreasGrid countyLabel="Co. Meath" towns={getSolarLocationsByCounty().find((c) => c.county === "Meath")?.towns ?? []} />
    </SolarLocationLayout>
  );
}
