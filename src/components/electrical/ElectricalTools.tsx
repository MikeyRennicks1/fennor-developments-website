'use client';

import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import EnquiryForm from '@/components/EnquiryForm';
import { enquiryEmailHref } from '@/config/contact';
import { electricalPages, electricalPath, electricalServices, type ElectricalPageKey, type ElectricalService } from '@/config/electrical';

const BriefContext = createContext({ choice: '', setChoice: (_choice: string) => {} });

export function ElectricalBriefProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState('');
  return <BriefContext.Provider value={{ choice, setChoice }}>{children}</BriefContext.Provider>;
}

function CircuitMark({ kind }: { kind: ElectricalService }) {
  return <svg viewBox="0 0 460 290" fill="none" aria-hidden="true" className={`fe-building-drawing fe-building-${kind}`}>
    <path className="fe-drawing-ground" d="M20 241H440M43 254H418" />
    {kind === 'domestic' ? <>
      <path d="M58 132 172 40 288 132M79 116V240H265V114M265 155H388V240H265M278 155 330 107 398 155" />
      <path d="M153 240V164H192V240M107 135H136V175H107ZM211 135H242V175H211ZM288 182H316V211H288ZM338 182H368V211H338Z" />
      <path className="fe-circuit-line" d="M42 218H96V194H151M195 194H234V218H299V224H423" /><circle className="fe-circuit-node" cx="96" cy="194" r="5" /><circle className="fe-circuit-node" cx="299" cy="224" r="5" />
    </> : kind === 'commercial' ? <>
      <path d="M71 88H346V240H71ZM51 88 92 48H376V240H346M346 88 376 48M103 115H160V166H103ZM184 115H241V166H184ZM265 115H322V166H265ZM100 191H207V240M227 191H322V240" />
      <path className="fe-circuit-line" d="M34 213H86V181H256V213H415" /><circle className="fe-circuit-node" cx="86" cy="181" r="5" /><circle className="fe-circuit-node" cx="256" cy="213" r="5" />
    </> : <>
      <path d="M51 112 132 68 214 112 295 68 378 112V240H51ZM77 140H156V160H77ZM186 140H264V160H186ZM293 140H353V160H293ZM90 191H162V240M190 191H263V240M293 191H349V240M329 87V39H349V96" />
      <path className="fe-circuit-line" d="M23 218H65V178H222V218H419" /><circle className="fe-circuit-node" cx="65" cy="178" r="5" /><circle className="fe-circuit-node" cx="222" cy="218" r="5" />
    </>}
  </svg>;
}

export function ElectricalRouteFinder() {
  const [active, setActive] = useState<ElectricalService>('domestic');
  const routes = {
    domestic: { title: 'Start with your home.', text: 'A room that needs better light, a renovation or a home with older wiring. Begin with how you live and what you want to change.', details: ['Rewiring & upgrades', 'Lighting & sockets', 'Renovation coordination'] },
    commercial: { title: 'Start with your premises.', text: 'An office, shop or working premises with a new layout or changing needs. Bring your opening hours, equipment and access into the conversation.', details: ['Fit-outs & alterations', 'Lighting & power', 'Inspection & remedial work'] },
    'industrial-maintenance': { title: 'Start with your site.', text: 'A workshop, production space or industrial installation. Define the equipment, operational requirements and maintenance priorities before the work.', details: ['Equipment supplies', 'Planned maintenance', 'Fault investigation'] },
  };
  const item = routes[active];
  return <section className="fe-route-finder fe-shell" id="explore" aria-labelledby="fe-finder-heading">
    <div className="fe-section-top"><p className="fe-kicker">01 / FIND YOUR STARTING POINT</p><span>Three settings. One considered approach.</span></div>
    <h2 id="fe-finder-heading">Where does your<br /><em>project begin?</em></h2>
    <div className="fe-route-buttons" role="group" aria-label="Choose your property type">{electricalServices.map((service, index) => <button key={service} type="button" aria-pressed={active === service} onClick={() => setActive(service)}><span>0{index + 1}</span>{electricalPages[service].label}<b aria-hidden="true">↗</b></button>)}</div>
    <div className="fe-route-result"><div className="fe-route-art"><CircuitMark kind={active} /><span className="fe-plan-label">FENNOR / {active === 'industrial-maintenance' ? 'INDUSTRIAL' : active.toUpperCase()} STUDY</span></div><div className="fe-route-copy" aria-live="polite" aria-atomic="true"><p className="fe-kicker">{electricalPages[active].marker}</p><h3>{item.title}</h3><p>{item.text}</p><ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul><a className="fe-link" href={electricalPath(active)}>Explore {active === 'industrial-maintenance' ? 'industrial & maintenance' : `${active} electrical`} <span aria-hidden="true">↗</span></a></div></div>
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
    <div className="fe-light-layout"><div className={`fe-room-scene fe-light-${active}`} aria-hidden="true"><div className="fe-room-ceiling" /><div className="fe-room-window"><i /><i /><i /></div><div className="fe-room-door" /><div className="fe-room-pendant pendant-one"><i /></div><div className="fe-room-pendant pendant-two"><i /></div><div className="fe-room-counter" /><div className="fe-room-island" /><div className="fe-room-floor" /><div className="fe-room-glow glow-task" /><div className="fe-room-glow glow-ambient" /><div className="fe-room-glow glow-arrival" /><span className="fe-room-annotation">{choice.detail}</span><span className="fe-plan-label">LIGHTING STUDY / NOT A TECHNICAL DESIGN</span></div>
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
  const { choice } = useContext(BriefContext);
  const id = useId();
  const [service, setService] = useState<ElectricalService>(pageKey === 'overview' ? 'domestic' : pageKey);
  const endings: Record<ElectricalPageKey, string> = {overview:'you have in mind.',domestic:'home work better?',commercial:'your premises.','industrial-maintenance':'your site.'};
  return <section className="fe-enquiry" id="enquiry" aria-labelledby="fe-enquiry-heading"><div className="fe-shell fe-enquiry-grid"><div><p className="fe-kicker">A CONVERSATION IS A GOOD START</p><h2 id="fe-enquiry-heading">{page.enquiryTitle}<br /><em>{endings[pageKey]}</em></h2><p>{page.enquiryText}</p><p className="fe-enquiry-location">Based in Slane, Co. Meath.<br />Meath, Louth & Dublin enquiries welcome.</p><div className="fe-contact-options"><a className="fe-link" href="tel:+353894032737">Talk to Fennor · 089 403 2737 <span aria-hidden="true">↗</span></a><a className="fe-link" href={enquiryEmailHref({ subject: pageKey === 'overview' ? electricalPages[service].topic : page.topic, body: choice || undefined })}>Email info@fennor.ie &amp; mikey@fennor.ie <span aria-hidden="true">↗</span></a></div><p className="fe-note">Enquiries are reviewed by the team. Any visit, its scope and any fee are agreed with you directly. This form is not an emergency service.</p></div><div>
    <EnquiryForm topic={pageKey === 'overview' ? electricalPages[service].topic : page.topic} context={choice || (pageKey === 'overview' ? `Electrical service: ${electricalPages[service].label}.` : '')} className="fe-enquiry-form" buttonClassName="fe-submit" buttonLabel="Send my electrical enquiry">
      {pageKey === 'overview' && <label htmlFor={`${id}-service`}>What kind of property?<select id={`${id}-service`} value={service} onChange={event => setService(event.target.value as ElectricalService)}>{electricalServices.map(key => <option key={key} value={key}>{electricalPages[key].label}</option>)}</select></label>}
      <label htmlFor={`${id}-area`}>Town / county<input id={`${id}-area`} name="area" autoComplete="address-level2" maxLength={120} required /></label>
      <label htmlFor={`${id}-details`}>What work do you have in mind?<textarea id={`${id}-details`} name="details" rows={4} minLength={10} maxLength={2000} required placeholder={pageKey === 'domestic' ? 'The rooms involved, what you would like to change and any renovation plans…' : 'The property or site, proposed work, timing and any access needs…'} /></label>
      {choice && <p className="fe-enquiry-selection"><span>Included with your enquiry</span>{choice}</p>}
    </EnquiryForm>
  </div></div></section>;
}
