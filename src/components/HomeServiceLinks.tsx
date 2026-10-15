import {pageGroups} from '@/config/page-map';

const serviceSummaries: Record<string, string> = {
  '/renovations': 'See how Fennor turns the rooms you want to change into one clear renovation brief.',
  '/renovations/full-home': 'Coordinate layout, finishes, services and day-to-day living across the whole home.',
  '/renovations/kitchens': 'Plan a kitchen around how you cook, move, store and spend time together.',
  '/renovations/bathrooms': 'Bring layout, ventilation, lighting and durable finishes into one considered room.',
  '/renovations/older-homes': 'Improve comfort and function while respecting the character and construction of an older home.',
  '/renovations/projects-case-studies': 'Explore renovation ideas and the details that could shape your own project.',
  '/retrofitting': 'Start with the comfort problem, then connect fabric, ventilation and heating in the right order.',
  '/retrofitting/whole-home': 'Build a coordinated plan around your home, priorities, evidence and budget.',
  '/retrofitting/insulation': 'Understand the checks behind suitable attic, wall and floor improvements.',
  '/retrofitting/windows-doors': 'Improve comfort while considering ventilation, junctions and the existing building.',
  '/retrofitting/ventilation': 'Plan fresh air and moisture control alongside insulation and everyday use.',
  '/retrofitting/grants-funding': 'Explore individual grants relevant to the measures Fennor can assess and coordinate.',
  '/retrofitting/projects-case-studies': 'See retrofit possibilities and the property details that change the right solution.',
  '/heat-pumps': 'Understand home readiness, room heat loss, emitters and the full heating change.',
  '/building': 'Take an idea from the first brief towards the surveys, decisions and team it needs.',
  '/building/extensions': 'Shape useful new space around light, layout, structure and the existing home.',
  '/building/new-builds': 'Bring the site, design, energy plan and construction route into one conversation.',
  '/building/attic-conversions': 'Explore whether your roof space can become a safe, comfortable and compliant room.',
  '/electrical': 'Find the right starting route for electrical work at home, at work or on an industrial site.',
  '/electrical/domestic': 'Plan rewiring, lighting, sockets, consumer-unit work and future home loads.',
  '/electrical/commercial': 'Coordinate lighting, power, fit-outs and controls around the way your premises operates.',
  '/electrical/industrial-maintenance': 'Define equipment supplies, containment, fault work and planned maintenance around the site.',
};

export default function HomeServiceLinks({service}:{service:string}) {
  const root = service === 'retrofit' ? '/retrofitting' : `/${service}`;
  const group = pageGroups.find(item => item.path === root);
  if (!group) return null;

  return <div className="solar-service-list">
    {group.pages.map(([slug,label]) => {
      const href = root + (slug ? `/${slug}` : '');
      return <details name="home-family-service" key={slug}>
        <summary>{label}<span aria-hidden="true">+</span></summary>
        <div><p>{serviceSummaries[href]}</p><a className="text-link" href={href}>Explore {label.toLowerCase()} ↗</a></div>
      </details>;
    })}
    {service === 'retrofit' && <details name="home-family-service">
      <summary>Heat pumps<span aria-hidden="true">+</span></summary>
      <div><p>{serviceSummaries['/heat-pumps']}</p><a className="text-link" href="/heat-pumps">Explore heat pumps ↗</a></div>
    </details>}
  </div>;
}
