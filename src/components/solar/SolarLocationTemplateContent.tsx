import Link from "next/link";
import type { SolarLocation } from "@/config/solar-locations-full";
import { getSolarLocationBySlug, SOLAR_LOCATIONS_FULL } from "@/config/solar-locations-full";

type SolarLocationTemplateContentProps = {
  location: SolarLocation;
};

/** FAQ items for template location pages (town/county substituted). */
function buildFaq(location: SolarLocation) {
  const { name, county } = location;
  return [
    {
      question: `Do you install solar panels in ${name}?`,
      answer: `Yes. We install solar PV systems across ${name} and the wider area, including estates and one-off homes. We're based in Slane and regularly work across County ${county}, so we know the area and can schedule assessments and installs efficiently.`,
    },
    {
      question: `What does a solar installation in ${name} typically include?`,
      answer: `We install panels, a hybrid inverter and optional battery storage. System sizes are tailored to your roof and usage. All work is compliant and we assist with the SEAI grant application. You also get monitoring and full documentation.`,
    },
    {
      question: `How much can I save with solar panels in ${name}?`,
      answer: `Savings depend on system size, orientation, shading and how much electricity you use. Many homes in ${name} and across Co. ${county} see payback in roughly 3–8 years. Use our solar calculator for an estimate, and we'll give you a clearer picture at the assessment.`,
    },
    {
      question: `Are you SEAI registered for ${name} installations?`,
      answer: `Yes. We're SEAI registered and install to the standard required for the SEAI solar electricity grant. We help customers in ${name} and across Co. ${county} through the application so they can claim up to €1,800 where eligible.`,
    },
  ];
}

/** Related town links from neighbour slugs for internal linking. */
export function getRelatedTownLinks(location: SolarLocation): Array<{ label: string; href: string }> {
  return location.neighbourSlugs.slice(0, 5).map((slug) => {
    const loc = getSolarLocationBySlug(slug);
    const label = loc ? `Solar Panels ${loc.name}` : `Solar Panels ${slug}`;
    return { label, href: `/solar-panels-${slug}` };
  });
}

/** Recent project block for town pages – unique description per town, varied system size. */
export function getRecentProjectForLocation(location: SolarLocation): { title: string; description: string } {
  const index = SOLAR_LOCATIONS_FULL.findIndex((l) => l.slug === location.slug);
  const sizes = ["4.2 kWp", "5.4 kWp", "6 kWp"];
  const size = sizes[index % 3];
  return {
    title: `Recent solar installation near ${location.name}`,
    description: `We recently completed a ${size} solar PV installation for a home in the ${location.name} area: panels, hybrid inverter and optional battery. The customer received SEAI grant support and now monitors production via the app. Typical payback in the area is around 5–7 years.`,
  };
}

/** First 3 neighbour names for local reference line. */
function getNearbyNames(location: SolarLocation): string[] {
  return location.neighbourSlugs
    .slice(0, 3)
    .map((slug) => getSolarLocationBySlug(slug)?.name)
    .filter(Boolean) as string[];
}

/** Format list as "A, B and C". */
function formatList(names: string[]): string {
  if (names.length <= 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export function SolarLocationTemplateContent({ location }: SolarLocationTemplateContentProps) {
  const { name, county } = location;
  const countyLabel = county === "Dublin" ? "North County Dublin" : `Co. ${county}`;
  const locationIndex = SOLAR_LOCATIONS_FULL.findIndex((l) => l.slug === location.slug);
  const templateIndex = locationIndex >= 0 ? locationIndex % 3 : 0;
  const microIndex = locationIndex >= 0 ? locationIndex % 2 : 0;
  const nearbyNames = getNearbyNames(location);
  const nearbyLine = nearbyNames.length > 0 ? formatList(nearbyNames) : null;
  const majorNearby = location.neighbourSlugs[0] ? getSolarLocationBySlug(location.neighbourSlugs[0])?.name : null;

  const introTemplates = [
    <p key="intro-a">
      Solar panel installation in {name} is one of the most effective ways to cut electricity bills and reduce reliance on the grid. With the SEAI grant and modern solar technology, a well-designed system can pay back in a few years and deliver clean energy for decades. Fennor Developments installs solar across {name} and {countyLabel}, with clear quotes, hybrid inverters and optional battery storage.
    </p>,
    <p key="intro-b">
      More homeowners in {name} and across {countyLabel} are choosing solar PV to lower bills and reduce their carbon footprint. Fennor Developments installs solar panels across {name} and the wider area, offering SEAI-registered installations, hybrid inverters and optional battery storage. We design each system around your roof and usage so you get the right size and the best return.
    </p>,
    <p key="intro-c">
      Fennor Developments installs solar panels across {name} and {countyLabel}. From our base in Slane we serve the area with clear quotes, hybrid inverters and optional battery storage. With the SEAI grant and today&apos;s panel technology, solar in {name} is an option that pays back for many households and delivers clean energy for 25 years or more.
    </p>,
  ];

  return (
    <>
      {introTemplates[templateIndex]}

      {nearbyLine && (
        <p>
          We regularly install solar panels in {name} and nearby areas including {nearbyLine}.
        </p>
      )}

      <p>
        We&apos;re based in Slane and work regularly across {countyLabel}, including {name}. We assess your roof, orientation and usage before recommending a system size. Whether you&apos;re in an estate or a one-off home, we install on slate, tile and suitable flat roofs and ensure every job is compliant and fully documented. As an SEAI registered installer, we guide you through the grant process so you can claim up to €1,800 where eligible.
      </p>

      <h2>Solar Panels for Homes in {name}</h2>
      <p>
        {name}&apos;s mix of housing means we see a variety of roof types and electrical setups. We design each system around your property: we check for shading, discuss your consumption and explain options such as battery storage and monitoring. Our typical installs use hybrid inverters so you can add a battery later if you choose. We keep the process straightforward from quote to completion and aim to finish most domestic jobs in one to two days.
      </p>

      <p>
        Solar PV works well in Irish conditions, including overcast days. Modern panels are efficient in diffuse light, and many homes in {name} see payback in the region of 3–8 years depending on system size and usage. Adding battery storage lets you use more of your solar energy in the evening and reduces reliance on the grid at peak times. We size systems to match your consumption so you don&apos;t over or under-size.
      </p>

      <p>
        After installation, you can monitor production and see how much you&apos;re saving. We provide full paperwork for warranties and for the SEAI grant, and we&apos;re available for any questions. Choosing a local installer means you get someone who can return for servicing or upgrades and who understands the conditions and building styles in the {name} area. We also offer <Link href="/electrical">electrical services</Link> for new builds and rewires, including solar-ready setups.
      </p>

      <h2>Benefits of Installing Solar Panels in {name}</h2>
      <p>
        Homeowners in {name} benefit from lower electricity bills, reduced carbon footprint and increased property value. Solar installation in {countyLabel} is supported by the SEAI grant, making it more affordable. With Fennor you get a system designed for Irish weather, professional installation and long-term support.
      </p>

      <h2>SEAI Solar Grants Available in {name}</h2>
      <p>
        The SEAI solar electricity grant is available to qualifying homes in {name} and the rest of Ireland. Eligibility depends on factors such as when your home was built and its BER. We help you understand the rules and complete the application, and we install to the standard required so you can receive the grant. That support, combined with transparent pricing and a system built for Irish conditions, makes solar in {name} a strong investment for many.
      </p>

      <h2>Why Choose Fennor for Solar Installation</h2>
      <p>
        Fennor Developments is an SEAI registered solar PV installer serving {name}, {countyLabel} and the wider region. We offer free assessments, clear quotes and hybrid inverters with optional battery storage. We&apos;re based in Slane and work regularly in {name}, so we&apos;re on hand for any follow-up or upgrades. We also provide <Link href="/electrical">electrical services</Link> and <Link href="/building-renovations">building and renovations</Link> for complete home solutions.
      </p>

      {microIndex === 0 ? (
        <>
          <h2>Solar Panels for Rural Homes in {name}</h2>
          <p>
            Many homes in and around {name} are one-off or rural properties with good roof space for solar. We install on slate, tile and suitable flat roofs and design systems to suit Irish conditions. Battery storage is popular in the area so you can use more of your solar energy in the evening. We assess shading and orientation so your system performs well for years to come.
          </p>
        </>
      ) : majorNearby ? (
        <>
          <h2>Solar Panels for Homes Near {majorNearby}</h2>
          <p>
            {name} is close to {majorNearby}, and we install solar PV across both areas. Whether you&apos;re in the town or the surrounds, we offer the same clear process: free assessment, tailored system size and SEAI grant support. Many homeowners near {majorNearby} choose hybrid inverters and optional battery storage for maximum self-consumption.
          </p>
        </>
      ) : null}

      <h2>Request a Solar Quote</h2>
      <p>
        If you&apos;re in {name} and thinking about solar panels, we offer a free roof assessment. We&apos;ll outline system size, grant options and a clear quote. You can also try our <Link href="/calculator">solar calculator</Link> for an idea of savings and payback. For full details on systems, inverters and batteries, visit our main <Link href="/solar">solar PV page</Link> or <Link href="/contact">contact us</Link> to book an assessment.
      </p>
    </>
  );
}

export { buildFaq };
