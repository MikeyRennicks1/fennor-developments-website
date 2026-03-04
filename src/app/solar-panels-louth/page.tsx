import type { Metadata } from "next";
import Link from "next/link";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";
import { SolarAreasGrid } from "@/components/solar/SolarAreasGrid";
import { getSolarLocationsByCounty } from "@/config/solar-locations-full";

export const metadata: Metadata = {
  title: "Solar Panels Louth | Solar PV Installation Co. Louth | Fennor Developments",
  description:
    "Solar panel installation across Louth. Drogheda, Dundalk, Ardee & Co. Louth. SEAI registered. Hybrid inverters, battery storage. Free quote.",
};

const FAQ = [
  {
    question: "Do you install solar panels in Co. Louth?",
    answer:
      "Yes. We install solar PV across Co. Louth including Drogheda, Dundalk, Ardee, Dunleer and surrounding areas. We’re based in Slane, Co. Meath, and regularly work in Louth, so we can assess and install without long lead times.",
  },
  {
    question: "Is the SEAI grant available for solar in Louth?",
    answer:
      "Yes. The SEAI solar electricity grant is available to eligible homes across Ireland, including Louth. We’re SEAI registered and help you through the application. You can claim up to €1,800 depending on system size, subject to eligibility.",
  },
  {
    question: "How long does a solar installation take in Louth?",
    answer:
      "Most domestic installations in Louth are completed in one to two days. We’ll confirm the schedule after your assessment. Roof access, system size and any extras like battery storage can affect the timeline.",
  },
  {
    question: "Why choose Fennor Developments for solar in Louth?",
    answer:
      "We’re a local installer with years of experience across the North East. We offer clear quotes, SEAI grant support, hybrid inverters and optional batteries. We’re fully insured, provide full documentation and are on hand for aftercare across Louth and Meath.",
  },
];

export default function SolarPanelsLouthPage() {
  return (
    <SolarLocationLayout headline="Solar Panels Louth" subline="Solar PV installation across Co. Louth. SEAI registered. Free assessment." faq={FAQ} contactAnchorText="solar panels Louth" electricalAnchorText="electrician Louth" buildersAnchorText="builders Meath" relatedTownLinks={[{ label: "Solar Panels Drogheda", href: "/solar-panels-drogheda" }, { label: "Solar Panels Dundalk", href: "/solar-panels-dundalk" }, { label: "Solar Panels Ardee", href: "/solar-panels-ardee" }]}>
      <p>
        Solar panel installation in Louth is increasingly popular as homeowners in Drogheda, Dundalk, Ardee and across the county look to cut electricity bills and reduce carbon. With the SEAI grant and modern solar technology, a well-designed system can pay back in a few years and deliver clean energy for decades. Fennor Developments installs solar across Co. Louth from our base in Slane, Co. Meath, offering clear quotes, hybrid inverters and optional battery storage.
      </p>

      <p>
        We cover the whole of Louth and work on a wide range of property types. Whether you’re in a town centre, a village or a one-off home, we assess your roof, orientation and usage before recommending a system size. We install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar PV across Co. Louth</h2>
      <p>
        Louth’s mix of coastal and inland locations means varied roof types and microclimates. We take that into account when designing your system: we check for shading, discuss your consumption and explain options such as batteries and monitoring. Our typical installs use hybrid inverters so you can add storage later if you choose. We keep the process straightforward and aim to complete most domestic installations in one to two days, with minimal disruption.
      </p>

      <p>
        After installation, you get monitoring so you can track production and savings. We provide full paperwork for warranties and for the SEAI grant, and we’re available for any follow-up. Choosing an installer who regularly works in Louth means you get someone who can return for servicing or upgrades and who understands the area.
      </p>

      <h2>Grants and getting a quote in Louth</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in Louth and the rest of Ireland. Eligibility depends on factors such as when your home was built and its BER. We help you understand the requirements and complete the application, and we install to the standard required so you can receive the grant. That support, combined with transparent pricing, makes solar in Louth a strong option for many households.
      </p>

      <p>
        We’ve installed solar across the North East for years and know the area’s building styles and typical usage patterns. That experience helps us recommend the right system size and avoid over- or under-sizing. From Drogheda to Dundalk and Ardee to the coast, we provide the same clear process: assessment, quote, install and documentation. If you add a battery or need advice later, we’re only a call away.
      </p>

      <p>
        If you’re in Louth and thinking about solar panels, we offer a free roof assessment. We’ll outline system size, grant options and a clear quote. You can also use our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback. For more on system sizes, inverters and batteries, see our main <Link href="/solar">solar PV page</Link> or contact us to book an assessment.
      </p>
      <SolarAreasGrid countyLabel="Co. Louth" towns={getSolarLocationsByCounty().find((c) => c.county === "Louth")?.towns ?? []} />
    </SolarLocationLayout>
  );
}
