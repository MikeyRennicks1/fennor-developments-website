'use client';

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import EnquiryForm from '@/components/EnquiryForm';
import { enquiryEmailHref } from '@/config/contact';
import { electricalPages, electricalPath, electricalServices, type ElectricalPageKey, type ElectricalService } from '@/config/electrical';
import './electrical-study.css';

const BriefContext = createContext({ choice: '', setChoice: (_choice: string) => {}, service: 'domestic' as ElectricalService, setService: (_service: ElectricalService) => {} });

export function ElectricalBriefProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState('');
  const [service, setService] = useState<ElectricalService>('domestic');
  return <BriefContext.Provider value={{ choice, setChoice, service, setService }}>{children}</BriefContext.Provider>;
}

type IsoPoint = [number, number, number];
const iso = (x: number, y: number, z = 0): [number, number] => [370 + (x - y) * .9, 238 + (x + y) * .42 - z];
const polygon = (...points: IsoPoint[]) => points.map(point => iso(...point).join(',')).join(' ');
const circuit = (...points: IsoPoint[]) => points.map((point, index) => `${index ? 'L' : 'M'}${iso(...point).join(' ')}`).join(' ');

function IsoBlock({ x, y, width, depth, height, z = 0, top = '#dfd3bc', front = '#b5a58d', side = '#d0bfa4', className = '' }: { x: number; y: number; width: number; depth: number; height: number; z?: number; top?: string; front?: string; side?: string; className?: string }) {
  return <g className={className}>
    <polygon points={polygon([x, y + depth, z], [x + width, y + depth, z], [x + width, y + depth, z + height], [x, y + depth, z + height])} fill={front} />
    <polygon points={polygon([x + width, y, z], [x + width, y + depth, z], [x + width, y + depth, z + height], [x + width, y, z + height])} fill={side} />
    <polygon points={polygon([x, y, z + height], [x + width, y, z + height], [x + width, y + depth, z + height], [x, y + depth, z + height])} fill={top} />
  </g>;
}

function ArchitecturalStudy({ kind, focus, lighting = false, caption }: { kind: ElectricalService; focus: number; lighting?: boolean; caption: string }) {
  const id = useId().replace(/:/g, '');
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const stage = useRef<HTMLElement>(null);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    const observer = new IntersectionObserver(entries => setVisible(entries[0]?.isIntersecting ?? false), { rootMargin: '80px' });
    if (stage.current) observer.observe(stage.current);
    return () => { preference.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  const home = kind === 'domestic';
  const liveLights = lighting || focus === 1;
  const liveCircuits = !lighting && focus !== 1;
  const roomMode = lighting ? focus : 0;
  const lightLocations: [number, number][] = home ? [[69, 104], [118, 104], [231, 164]] : [[80, 85], [220, 85], [80, 204], [220, 204]];
  return <figure ref={stage} className={`fes-architecture fes-kind-${kind} fes-focus-${focus}${lighting ? ' fes-lighting' : ''}`} data-motion={!paused && !reduced && visible ? 'running' : 'paused'}>
    <div className="fes-stage-top"><span><i aria-hidden="true" />{home ? 'DOMESTIC' : kind === 'commercial' ? 'COMMERCIAL' : 'INDUSTRIAL'} STUDY</span><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} disabled={reduced} aria-label={reduced ? 'Animation disabled by reduced motion preference' : paused ? 'Play study animation' : 'Pause study animation'}><span aria-hidden="true">{paused || reduced ? '▷' : 'Ⅱ'}</span>{reduced ? 'Still view' : paused ? 'Play' : 'Pause'}</button></div>
    <svg className="fes-house" viewBox="45 10 670 545" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={home ? '#e7ded0' : '#e2e8e6'} /><stop offset="1" stopColor={home ? '#b5a995' : '#aababc'} /></linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#96b1b4" /><stop offset=".5" stopColor="#dce8e1" /><stop offset="1" stopColor="#afc2bd" /></linearGradient>
        <radialGradient id={`${id}-warm`}><stop stopColor="#fff1be" stopOpacity=".92" /><stop offset="1" stopColor="#f5ba64" stopOpacity="0" /></radialGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-40%" width="140%" height="200%"><feGaussianBlur stdDeviation="13" /></filter>
      </defs>
      <ellipse cx="389" cy="392" rx="258" ry="94" fill="#50646b" opacity=".14" filter={`url(#${id}-shadow)`} />
      <path d={circuit([-33, -27, -20], [333, -27, -20], [333, 297, -20], [-33, 297, -20], [-33, -27, -20])} stroke="#afc0bf" strokeWidth=".8" />
      <IsoBlock x={-10} y={-10} width={320} depth={280} height={18} z={-18} top="#e9ebe2" front="#96a7aa" side="#b4c0bd" />
      <polygon points={polygon([0, 0, 0], [300, 0, 0], [300, 260, 0], [0, 260, 0])} fill={`url(#${id}-floor)`} />
      {Array.from({ length: 15 }, (_, index) => <path key={index} d={circuit([index * 20, 0, .5], [index * 20, 260, .5])} stroke={home ? '#a99d88' : '#859fa2'} strokeWidth=".7" opacity=".4" />)}
      <IsoBlock x={-7} y={-7} width={314} depth={7} height={143} top="#fffdf2" front="#eceade" side="#d1d7cd" />
      <IsoBlock x={-7} y={0} width={7} depth={267} height={143} top="#fffdf2" front="#c3cbc4" side="#d6dfd7" />
      <polygon points={polygon([17, -.1, 62], [124, -.1, 62], [124, -.1, 122], [17, -.1, 122])} fill="#455f66" />
      <polygon points={polygon([21, .1, 66], [120, .1, 66], [120, .1, 118], [21, .1, 118])} fill={`url(#${id}-glass)`} />
      <path d={circuit([71, 1, 64], [71, 1, 120])} stroke="#f0eee1" strokeWidth="3" />
      <polygon points={polygon([.1, 70, 34], [.1, 223, 34], [.1, 223, 118], [.1, 70, 118])} fill="#50676b" />
      <polygon points={polygon([.2, 74, 38], [.2, 219, 38], [.2, 219, 114], [.2, 74, 114])} fill={`url(#${id}-glass)`} />
      <path d={circuit([1, 122, 35], [1, 122, 118])} stroke="#f5f1e5" strokeWidth="3" /><path d={circuit([1, 171, 35], [1, 171, 118])} stroke="#f5f1e5" strokeWidth="3" />
      <polygon points={polygon([0, 82, 0], [0, 195, 0], [124, 236, 0], [124, 126, 0])} fill="#fffbee" opacity=".2" />
      {home ? <>
        <IsoBlock x={19} y={5} width={130} depth={32} height={51} top="#eeece2" front="#a39780" side="#c2b294" />
        {[47, 77, 107, 136].map(x => <path key={x} d={circuit([x, 37.2, 3], [x, 37.2, 46])} stroke="#857d6e" strokeWidth=".7" />)}
        <IsoBlock x={153} y={3} width={33} depth={32} height={117} top="#c4b69b" front="#a59678" side="#bcaf91" />
        <path d={circuit([176, 35.2, 53], [176, 35.2, 87])} stroke="#514c40" strokeWidth="1.5" />
        <IsoBlock x={43} y={87} width={101} depth={41} height={42} top="#d0c2a9" front="#a49173" side="#bcaa8e" />
        <IsoBlock x={39} y={83} width={109} depth={49} height={5} z={42} top="#f4f0e4" front="#d7d0be" side="#e9e2d3" />
        <polygon points={polygon([170, 115, 1], [282, 115, 1], [282, 233, 1], [170, 233, 1])} fill="#eae1d0" stroke="#d5c7b3" />
        <IsoBlock x={252} y={137} width={36} depth={86} height={23} top="#aaa997" front="#848e84" side="#929b8e" />
        <IsoBlock x={274} y={131} width={17} depth={98} height={45} top="#b3b3a1" front="#8e978a" side="#a2a896" />
        <IsoBlock x={247} y={132} width={30} depth={11} height={32} top="#b9b5a2" front="#8b9588" side="#a2a894" />
        <IsoBlock x={247} y={215} width={30} depth={11} height={32} top="#b9b5a2" front="#8b9588" side="#a2a894" />
        <IsoBlock x={194} y={161} width={40} depth={41} height={18} top="#c2ac89" front="#9c825d" side="#b29a76" />
        <IsoBlock x={201} y={167} width={15} depth={10} height={2} z={18} top="#f7efe0" front="#d7d0be" side="#b4bcae" />
        <IsoBlock x={220} y={5} width={54} depth={13} height={51} top="#687a76" front="#80928a" side="#5d726d" />
        <path d={circuit([239, 19, 3], [239, 19, 47])} stroke="#546d65" />
      </> : kind === 'commercial' ? <>
        {[28, 165].map(x => <g key={x}><IsoBlock x={x} y={43} width={95} depth={43} height={47} top="#e7d9bd" front="#b4a78f" side="#c7bda7" /><IsoBlock x={x + 35} y={52} width={30} depth={7} height={25} z={47} top="#51646a" front="#28444f" side="#45606b" /><IsoBlock x={x + 40} y={97} width={30} depth={30} height={26} top="#617675" front="#4b6563" side="#748782" /></g>)}
        <IsoBlock x={28} y={180} width={153} depth={31} height={60} top="#f2eadc" front="#b7a286" side="#cdbda6" />
        {[196, 245].map(x => <IsoBlock key={x} x={x} y={10} width={34} depth={25} height={96} top="#d5ddd4" front="#a8b9ae" side="#869d94" />)}
      </> : <>
        {[30, 159].map(x => <g key={x}><IsoBlock x={x} y={50} width={91} depth={60} height={31} top="#718d96" front="#516d78" side="#617d88" /><IsoBlock x={x + 15} y={62} width={45} depth={32} height={39} z={31} top="#e7e5d9" front="#bec8c2" side="#98ada8" /><IsoBlock x={x + 63} y={59} width={17} depth={19} height={44} z={31} top="#5a7378" front="#263d48" side="#405e68" /></g>)}
        {[35, 160].map(x => <g key={x}><IsoBlock x={x} y={181} width={89} depth={33} height={44} top="#adb9b5" front="#879e9a" side="#637e7d" /><path d={circuit([x - 8, 169, 1], [x + 95, 169, 1], [x + 95, 228, 1])} stroke="#ccb66a" strokeWidth="3" strokeDasharray="12 7" /></g>)}
      </>}
      <IsoBlock x={191} y={0} width={24} depth={8} height={42} z={67} top="#f7f5ed" front="#d8e2dc" side="#b4c4be" />
      {[0, 1, 2, 3].map(row => <path key={row} d={circuit([194, 8.2, 75 + row * 7], [211, 8.2, 75 + row * 7])} stroke="#7d918d" strokeWidth="3" strokeDasharray="2 3" />)}
      <g className={`fes-circuits${liveCircuits ? ' is-active' : ''}`}>
        <path d={circuit([202, 9, 68], [202, 9, 13], [20, 9, 13], [20, 238, 13], [288, 238, 13], [288, 28, 13])} className="fes-circuit-base" />
        <path d={circuit([202, 9, 68], [202, 9, 13], [20, 9, 13], [20, 238, 13], [288, 238, 13], [288, 28, 13])} className="fes-circuit-travel" />
        {[[20, 64], [20, 182], [155, 238], [288, 154]].map(([x, y]) => <g key={`${x}-${y}`}><circle cx={iso(x, y, 13)[0]} cy={iso(x, y, 13)[1]} r="7" fill="#fff7df" stroke="#bd713c" strokeWidth="1.5" /><circle cx={iso(x, y, 13)[0]} cy={iso(x, y, 13)[1]} r="2" fill="#b36734" /></g>)}
      </g>
      {lightLocations.map(([x, y], index) => {
        const glowing = liveLights && (!lighting || (roomMode === 0 ? index < 2 : roomMode === 1 ? index === 2 : false));
        const [cx, cy] = iso(x, y, home ? 112 : 141);
        const [gx, gy] = iso(x, y, 2);
        return <g key={index} className={`fes-luminaire${glowing ? ' is-active' : ''}`}><ellipse cx={gx} cy={gy} rx={home ? 73 : 70} ry="38" fill={`url(#${id}-warm)`} className="fes-light-pool" /><path d={`M${cx} ${cy - 36}V${cy - 8}`} stroke="#5f7373" strokeWidth="1" /><path d={`M${cx - 16} ${cy} Q${cx - 13} ${cy - 19} ${cx} ${cy - 18} Q${cx + 13} ${cy - 19} ${cx + 16} ${cy}Z`} fill="#455c60" /><ellipse cx={cx} cy={cy} rx="16" ry="5" className="fes-bulb" /></g>;
      })}
      <IsoBlock x={-6} y={256} width={154} depth={8} height={17} top="#eeeee3" front="#b2c0b9" side="#a0b0a9" />
      <IsoBlock x={218} y={256} width={88} depth={8} height={17} top="#eeeee3" front="#b2c0b9" side="#a0b0a9" />
      <g className={`fes-arrival${lighting && focus === 2 ? ' is-active' : ''}`}><polygon points={polygon([148, 243, 1], [216, 243, 1], [235, 315, -17], [126, 315, -17])} fill={`url(#${id}-warm)`} />{[157, 205].map(x => <g key={x}><path d={circuit([x, 282, -16], [x, 282, 20])} stroke="#597273" strokeWidth="3" /><circle cx={iso(x, 282, 21)[0]} cy={iso(x, 282, 21)[1]} r="4" className="fes-bulb" /></g>)}</g>
      <g className="fes-dimension"><path d={circuit([-36, 0, -28], [-36, 260, -28])} /><path d={circuit([0, 295, -28], [300, 295, -28])} /><path d={circuit([-41, 0, -28], [-31, 0, -28])} /><path d={circuit([-41, 260, -28], [-31, 260, -28])} /></g>
      <g className="fes-callout"><path d="M556 187H649V166" /><circle cx="556" cy="187" r="3" /><text x="649" y="153" textAnchor="end">{liveCircuits ? 'POWER & DISTRIBUTION' : 'LIGHT WHERE IT MATTERS'}</text><path d="M204 422H107V443" /><circle cx="204" cy="422" r="3" /><text x="107" y="460">{home ? 'PLANNED AROUND YOUR HOME' : 'PLANNED AROUND YOUR WORK'}</text></g>
    </svg>
    <figcaption className="fes-stage-caption"><p>{caption}</p><div className="fes-legend"><span><i className="fes-legend-line" />{liveCircuits ? 'Electrical connections' : 'Lighting zones'}</span><span><i className="fes-legend-point" />{home ? 'Everyday living' : 'Working areas'}</span></div><small>Concept study · not a wiring diagram</small></figcaption>
  </figure>;
}

const routeDetails = {
  domestic: { title: 'Start with your home.', text: 'A room that needs better light, an older installation or a full renovation. Choose what you want to improve and see how we help you plan it.', details: [
    { title: 'Rewiring & upgrades', text: 'Tell us what you have noticed and what is changing in your home. We arrange an assessment of the existing wiring and consumer unit, then explain whether the work is a local addition, a partial rewire or a wider upgrade.', next: 'Your proposal sets out the affected rooms, access to walls and floors, planned power interruptions, making good and the relevant testing and certification.' },
    { title: 'Lighting & sockets', text: 'Start with how you use each room: cooking, working, reading or relaxing. We help you consider task lighting, softer evening light, switching and socket positions alongside your furniture and appliances.', next: 'You can agree fitting choices and useful positions before work begins. The existing circuits and proposed appliance supplies are assessed before the final scope is confirmed.' },
    { title: 'Renovation coordination', text: 'A kitchen, extension or new room is the right time to bring your electrical choices into the building plan. Share any drawings and appliance ideas, even if they are still developing.', next: 'We coordinate the agreed first-fix and finishing stages with the wider project, including access, responsibility for making good and any future solar, heating or EV-charging plans.' },
  ] },
  commercial: { title: 'Start with your premises.', text: 'An office, shop or working premises with changing needs. Choose the work you have in mind and we will help shape it around your business.', details: [
    { title: 'Fit-outs & alterations', text: 'Share your proposed layout, opening date and the way staff and customers use the space. We review lighting, useful power points, equipment requirements and the existing installation together.', next: 'Your proposal explains the work areas, access, landlord or fit-out-team interfaces and planned interruptions, so you can prepare the business before work starts.' },
    { title: 'Lighting & power', text: 'Whether you need brighter work areas, refreshed shop lighting or new equipment connections, the starting point is what the premises needs to do. Existing fittings, operating hours and available supply are considered.', next: 'We explain the proposed fittings, controls and supply work. Any energy-saving comparison uses the actual installation and operating pattern, not a blanket percentage.' },
    { title: 'Inspection & remedial work', text: 'Have an existing report or an electrical concern? Tell us what it relates to and which areas are affected. We arrange the appropriate assessment and explain the findings in clear terms.', next: 'You receive an agreed remedial scope with priorities, access needs and relevant testing and records. Any separate emergency-lighting or specialist responsibilities are made clear.' },
  ] },
  'industrial-maintenance': { title: 'Start with your site.', text: 'Equipment changes, maintenance priorities or a recurring issue. Choose your starting point and we will work with your site contact to agree the next step.', details: [
    { title: 'Equipment supplies', text: 'For new or relocated equipment, send the specification you already have and its proposed location. We review the electrical supply requirements and existing distribution before confirming the work.', next: 'The proposal distinguishes electrical connection work from machine commissioning, controls or manufacturer attendance, and sets out access and any planned shutdown.' },
    { title: 'Planned maintenance', text: 'Tell us which areas and equipment matter most to your operation, together with available drawings, inspection records and operating hours. We help turn that information into a site-specific maintenance scope.', next: 'Tasks, agreed intervals, reporting and access arrangements are set out for your site. Any call-out provision is agreed separately; no response time is assumed.' },
    { title: 'Fault investigation', text: 'Describe the symptoms you have already noticed, when they occur and the effect on your operation. You do not need to open an enclosure or carry out checks to make an enquiry.', next: 'The appropriate competent personnel investigate the installation. Findings guide the repair proposal, with operational constraints, testing and return-to-service responsibilities agreed.' },
  ] },
};

export function ElectricalRouteFinder() {
  const [active, setActive] = useState<ElectricalService>('domestic');
  const [detail, setDetail] = useState<number | null>(0);
  const { setChoice, setService } = useContext(BriefContext);
  const item = routeDetails[active];
  function chooseService(service: ElectricalService) { setActive(service); setDetail(0); setService(service); setChoice(`${electricalPages[service].label}: ${routeDetails[service].details[0].title}.`); }
  function chooseDetail(index: number) { setDetail(detail === index ? null : index); setService(active); setChoice(`${electricalPages[active].label}: ${item.details[index].title}.`); }
  return <section className="fe-route-finder fe-shell" id="explore" aria-labelledby="fe-finder-heading">
    <div className="fe-section-top"><p className="fe-kicker">01 / FIND YOUR STARTING POINT</p><span>Three settings. One considered approach.</span></div>
    <h2 id="fe-finder-heading">Where does your<br /><em>project begin?</em></h2>
    <div className="fe-route-buttons" role="group" aria-label="Choose your electrical service">{electricalServices.map((service, index) => <button key={service} type="button" aria-pressed={active === service} onClick={() => chooseService(service)}><span>0{index + 1}</span>{electricalPages[service].label}<b aria-hidden="true">↗</b></button>)}</div>
    <div className="fe-route-result fes-route-result"><ArchitecturalStudy kind={active} focus={detail ?? 0} caption={detail === 1 ? 'Useful light. Thoughtful positions.' : detail === 2 ? 'Bring the whole project into view.' : 'The connections behind everyday life.'} /><div className="fe-route-copy fes-route-copy"><p className="fe-kicker">{electricalPages[active].marker}</p><h3>{item.title}</h3><p>{item.text}</p><div className="fes-service-details" key={active}>{item.details.map((entry, index) => <details key={entry.title} open={detail === index}><summary onClick={event => { event.preventDefault(); chooseDetail(index); }}><span>0{index + 1}</span>{entry.title}<b aria-hidden="true">+</b></summary><div><p>{entry.text}</p><p>{entry.next}</p><a href="#enquiry" onClick={() => { setService(active); setChoice(`${electricalPages[active].label}: ${entry.title}.`); }}>Enquire about this service <span aria-hidden="true">↘</span></a></div></details>)}</div><a className="fe-link" href={electricalPath(active)}>Explore {active === 'industrial-maintenance' ? 'industrial & maintenance' : `${active} electrical`} <span aria-hidden="true">↗</span></a></div></div>
    <noscript><p className="fe-note">Explore all electrical services using the links below.</p></noscript>
  </section>;
}

const lightingChoices = [
  { label:'Prepare', name:'Task & preparation lighting', heading:'See the task clearly.', copy:'Think about where you prepare food, read or work. Light needs to reach the surface without your body casting a shadow over the task.', brief:'Task and preparation lighting', detail:'Worktops · desks · reading positions' },
  { label:'Unwind', name:'Evening & ambient lighting', heading:'Give the room a softer setting.', copy:'Layers of light can make the same room feel different in the evening. We discuss which fittings should work together and the controls that suit them.', brief:'Evening and ambient lighting', detail:'Living areas · feature light · controls' },
  { label:'Arrive', name:'Entrance & circulation lighting', heading:'Make the route feel natural.', copy:'An entrance, stair or path needs light where people move and controls they can find. Bring those everyday routes into the room and outdoor lighting plan.', brief:'Entrance and circulation lighting', detail:'Doors · halls · stairs · paths' },
];

export function DomesticLightingStudy() {
  const [active, setActive] = useState(0);
  const { setChoice } = useContext(BriefContext);
  const choice = lightingChoices[active];
  return <section className="fe-study fe-light-study fe-shell" id="explore" aria-labelledby="fe-light-heading">
    <div className="fe-section-top"><p className="fe-kicker">01 / A LITTLE LIGHT PLANNING</p><span>Explore three everyday moments</span></div>
    <div className="fe-study-heading"><h2 id="fe-light-heading">Same room.<br /><em>A different moment.</em></h2><p>A useful lighting brief starts with what you do. Choose a moment to see the conversation it opens.</p></div>
    <div className="fe-light-layout fes-light-layout"><ArchitecturalStudy kind="domestic" focus={active} lighting caption={choice.detail} />
      <div className="fe-study-controls"><div className="fe-choice-row" role="group" aria-label="Explore lighting moments">{lightingChoices.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-label={item.name} onClick={() => { setActive(index); setChoice(`Lighting priority: ${item.brief}.`); }}><span>0{index + 1}</span>{item.label}</button>)}</div><div aria-live="polite" aria-atomic="true" className="fe-study-result"><p className="fe-kicker">LIGHT / {choice.label.toUpperCase()}</p><h3>{choice.heading}</h3><p>{choice.copy}</p><span className="fe-study-detail">{choice.detail}</span></div><a className="fe-link" href="#enquiry" onClick={() => setChoice(`Lighting priority: ${choice.brief}.`)}>Discuss this lighting idea <span aria-hidden="true">↘</span></a><p className="fe-note">An illustration of lighting priorities. Fitting selection, wiring, light levels and suitability need a room-specific design.</p></div>
    </div>
  </section>;
}

const businessZones = [
  { label:'Customer spaces', heading:'Make a good everyday impression.', copy:'Lighting, counters and useful power should support the way people arrive and use the space. Tell us about customer routes, display changes and the time the premises must be ready.', points:['Public access and opening hours', 'Displays, counters and room layout', 'Proposed lighting and control zones'] },
  { label:'Staff & work areas', heading:'Give the working day room to work.', copy:'Desks, task areas and shared equipment need the right connections in useful positions. The plan starts with the layout and equipment you actually use.', points:['Workstations and equipment list', 'Current and planned power demands', 'Access for installation and maintenance'] },
  { label:'Stores & support', heading:'Remember the spaces behind the scenes.', copy:'Stores, service areas and external routes support everything out front. We bring access, lighting and specialist equipment requirements into the same premises brief.', points:['Storage and service routes', 'Equipment and supply information', 'Working windows and site responsibilities'] },
];

export function CommercialPremisesStudy() {
  const [active, setActive] = useState(0);
  const { setChoice } = useContext(BriefContext);
  const zone = businessZones[active];
  return <section className="fe-study fe-business-study fe-shell" id="explore" aria-labelledby="fe-premises-heading">
    <div className="fe-section-top"><p className="fe-kicker">01 / LOOK AT THE WHOLE PREMISES</p><span>People. Places. Practical connections.</span></div>
    <div className="fe-study-heading"><h2 id="fe-premises-heading">Every area.<br /><em>Its own working brief.</em></h2><p>Select an area to explore the information that makes an electrical proposal more useful.</p></div>
    <div className="fe-premises-layout"><div className="fe-premises-plan"><div className="fe-plan-compass" aria-hidden="true">↑<span>SCHEMATIC</span></div><div className="fe-plan-zones" role="group" aria-label="Explore premises areas">{businessZones.map((item, index) => <button className={`fe-plan-zone fe-plan-zone-${index}`} key={item.label} type="button" aria-pressed={active === index} onClick={() => {setActive(index);setChoice(`Premises priority: ${item.label}.`);}}><span className="fe-plan-zone-number">0{index + 1}</span><i className="fe-plan-furniture" aria-hidden="true"/><strong>{item.label}</strong><span className="fe-zone-action">Explore area <b aria-hidden="true">↗</b></span></button>)}</div><div className="fe-plan-access" aria-hidden="true"><span>ARRIVAL</span><i /><span>DELIVERIES</span></div><p className="fe-note">A conversation map, not an electrical layout or escape plan.</p></div><div className="fe-premises-copy" aria-live="polite" aria-atomic="true"><p className="fe-kicker">0{active + 1} / {zone.label.toUpperCase()}</p><h3>{zone.heading}</h3><p>{zone.copy}</p><ul>{zone.points.map(point => <li key={point}>{point}</li>)}</ul><a className="fe-link" href="#enquiry" onClick={() => setChoice(`Premises priority: ${zone.label}.`)}>Add this to your enquiry <span aria-hidden="true">↘</span></a></div></div>
  </section>;
}

const maintenanceChoices = [
  {label:'Plan maintenance', title:'Turn site knowledge into a useful scope.', text:'Start with the installation you have, available records and the equipment that matters most to the operation. The assessment establishes appropriate tasks and responsibilities.', points:['Existing drawings and inspection records', 'Operating hours and access restrictions', 'Equipment list and known maintenance needs'], brief:'Planned electrical maintenance'},
  {label:'Investigate an issue', title:'Describe the pattern. Let the findings lead.', text:'Record what you have already observed: when an issue occurs, the equipment affected and the effect on operations. Investigation and electrical checks belong with appropriate competent personnel.', points:['Symptoms and when they occur', 'Affected equipment or working area', 'Previous reports or related changes'], brief:'Electrical fault investigation'},
  {label:'Change equipment', title:'Make the new equipment part of the site plan.', text:'A new machine brings requirements beyond its physical footprint. Manufacturer information and site assessment help define the supply work and the separate commissioning responsibilities.', points:['Equipment specification and load information', 'Proposed location and existing supplies', 'Installation window and commissioning contacts'], brief:'Equipment supply or relocation'},
];

export function MaintenanceStudy() {
  const [active, setActive] = useState(0);
  const { setChoice } = useContext(BriefContext);
  const item = maintenanceChoices[active];
  return <section className="fe-study fe-maintenance-study fe-shell" id="explore" aria-labelledby="fe-maintenance-heading">
    <div className="fe-section-top"><p className="fe-kicker">01 / THE RIGHT INFORMATION FIRST</p><span>From a site question to an agreed scope</span></div>
    <div className="fe-study-heading"><h2 id="fe-maintenance-heading">What needs attention<br /><em>on your site?</em></h2><p>Choose the reason for your enquiry. We will show the useful starting details to bring into the assessment.</p></div>
    <div className="fe-maintenance-options" role="group" aria-label="Choose a maintenance enquiry">{maintenanceChoices.map((choice, index) => <button type="button" key={choice.label} aria-pressed={active === index} onClick={() => {setActive(index);setChoice(`Site enquiry: ${choice.brief}.`);}}><span>0{index+1}</span>{choice.label}<b aria-hidden="true">↘</b></button>)}</div>
    <div className="fe-maintenance-result" aria-live="polite" aria-atomic="true"><div><p className="fe-kicker">YOUR STARTING POINT</p><h3>{item.title}</h3><p>{item.text}</p><a className="fe-link" href="#enquiry" onClick={() => setChoice(`Site enquiry: ${item.brief}.`)}>Discuss this site work <span aria-hidden="true">↘</span></a></div><div className="fe-site-record"><p className="fe-kicker">USEFUL SITE INFORMATION</p>{item.points.map((point, index) => <div key={point}><span>0{index+1}</span><p>{point}</p></div>)}<p className="fe-note">Only share information you already hold. Do not open enclosures or carry out electrical checks to complete an enquiry.</p></div></div>
    <div className="fe-maintenance-track" aria-label="How site work is agreed">{['Understand the site','Define the scope','Agree access & responsibilities','Test & record the work'].map((step,index) => <div key={step}><span>0{index+1}</span><p>{step}</p></div>)}</div>
  </section>;
}

export function ElectricalEnquiry({ pageKey }: { pageKey: ElectricalPageKey }) {
  const page = electricalPages[pageKey];
  const { choice, setChoice, service, setService } = useContext(BriefContext);
  const id = useId();
  const endings: Record<ElectricalPageKey, string> = {overview:'you have in mind.',domestic:'home work better?',commercial:'your premises.','industrial-maintenance':'your site.'};
  return <section className="fe-enquiry" id="enquiry" aria-labelledby="fe-enquiry-heading"><div className="fe-shell fe-enquiry-grid"><div><p className="fe-kicker">A CONVERSATION IS A GOOD START</p><h2 id="fe-enquiry-heading">{page.enquiryTitle}<br /><em>{endings[pageKey]}</em></h2><p>{page.enquiryText}</p><p className="fe-enquiry-location">Based in Slane, Co. Meath.<br />Meath, Louth & Dublin enquiries welcome.</p><div className="fe-contact-options"><a className="fe-link" href="tel:+353894032737">Talk to Fennor · 089 403 2737 <span aria-hidden="true">↗</span></a><a className="fe-link" href={enquiryEmailHref({ subject: pageKey === 'overview' ? electricalPages[service].topic : page.topic, body: choice || undefined })}>Email info@fennor.ie &amp; mikey@fennor.ie <span aria-hidden="true">↗</span></a></div><p className="fe-note">Enquiries are reviewed by the team. Any visit, its scope and any fee are agreed with you directly. This form is not an emergency service.</p></div><div>
    <EnquiryForm topic={pageKey === 'overview' ? electricalPages[service].topic : page.topic} context={choice || (pageKey === 'overview' ? `Electrical service: ${electricalPages[service].label}.` : '')} className="fe-enquiry-form" buttonClassName="fe-submit" buttonLabel="Send my electrical enquiry">
      {pageKey === 'overview' && <label htmlFor={`${id}-service`}>What services are you enquiring about?<select id={`${id}-service`} value={service} onChange={event => { setService(event.target.value as ElectricalService); setChoice(''); }}>{electricalServices.map(key => <option key={key} value={key}>{electricalPages[key].label}</option>)}</select></label>}
      <label htmlFor={`${id}-area`}>Town / county<input id={`${id}-area`} name="area" autoComplete="address-level2" maxLength={120} required /></label>
      <label htmlFor={`${id}-details`}>What work do you have in mind?<textarea id={`${id}-details`} name="details" rows={4} minLength={10} maxLength={2000} required placeholder={pageKey === 'domestic' ? 'The rooms involved, what you would like to change and any renovation plans…' : 'The property or site, proposed work, timing and any access needs…'} /></label>
      {choice && <p className="fe-enquiry-selection"><span>Included with your enquiry</span>{choice}</p>}
    </EnquiryForm>
  </div></div></section>;
}
