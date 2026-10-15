import Image from 'next/image';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import GrantDirectory from '@/components/GrantDirectory';
import { electricalPages, electricalPath, electricalServices, type ElectricalPageKey } from '@/config/electrical';
import { CommercialPremisesStudy, DomesticLightingStudy, ElectricalBriefProvider, ElectricalEnquiry, ElectricalRouteFinder, MaintenanceStudy } from './ElectricalTools';
import './electrical.css';

const safeElectric = 'https://safeelectric.ie/help-advice/controlled-restricted-electrical-works';
const workplaceGuidance = 'https://www.hsa.ie/eng/publications_and_forms/publications/information_sheets/guidance-note_on_periodic_inspection_and_testing_of_electrical_installations';

export function electricalMetadata(key: ElectricalPageKey): Metadata {
  const page = electricalPages[key];
  const url = `https://fennor.ie${electricalPath(key)}`;
  return {
    title: page.title, description: page.description, alternates: { canonical: url },
    openGraph: { title: page.title, description: page.description, url, type: 'website', locale: 'en_IE', siteName: 'Fennor Developments', images: [{ url: `https://fennor.ie/images/${page.image}`, alt: page.imageAlt }] },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [`https://fennor.ie/images/${page.image}`] },
  };
}

function StructuredData({ pageKey }: { pageKey: ElectricalPageKey }) {
  const page = electricalPages[pageKey];
  const path = electricalPath(pageKey);
  const url = `https://fennor.ie${path}`;
  const crumbs = [{ '@type':'ListItem',position:1,name:'Home',item:'https://fennor.ie/' },{'@type':'ListItem',position:2,name:'Electrical',item:'https://fennor.ie/electrical'}];
  if (pageKey !== 'overview') crumbs.push({'@type':'ListItem',position:3,name:page.label,item:url});
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context':'https://schema.org','@graph':[
    { '@type':'WebPage','@id':`${url}#webpage`,url,name:page.title,description:page.description,inLanguage:'en-IE',isPartOf:{'@id':'https://fennor.ie/#website'},about:{'@id':'https://fennor.ie/#organization'} },
    { '@type':'BreadcrumbList','@id':`${url}#breadcrumb`,itemListElement:crumbs },
  ] }).replace(/</g,'\\u003c') }} />;
}

function ElectricalHero({ pageKey }: { pageKey: ElectricalPageKey }) {
  const page = electricalPages[pageKey];
  return <section className={`fe-hero fe-hero-${pageKey}`}>
    <div className="fe-shell"><nav className="fe-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>{pageKey === 'overview' ? <span aria-current="page">Electrical</span> : <><a href="/electrical">Electrical</a><span aria-hidden="true">/</span><span aria-current="page">{page.label}</span></>}</nav>
      <div className="fe-hero-opening"><div><p className="fe-kicker"><span className="fe-dot" />{page.marker}</p><h1>{page.headline}<br /><em>{page.accent}</em></h1></div><div className="fe-hero-intro"><p>{page.intro}</p><a className="fe-link" href="#explore">{pageKey === 'overview' ? 'Find your electrical service' : pageKey === 'domestic' ? 'Explore a lighting idea' : pageKey === 'commercial' ? 'Explore your premises' : 'Plan your enquiry'} <span aria-hidden="true">↘</span></a></div></div>
    </div>
    <div className="fe-hero-visual">
      <div className="fe-hero-image"><Image src={`/images/${page.image}`} alt={page.imageAlt} fill loading="eager" fetchPriority="high" sizes={pageKey === 'overview' ? '(max-width: 700px) 100vw, 67vw' : '100vw'} />{pageKey === 'industrial-maintenance' && <div className="fe-site-photo-caption"><span>03 / ON SITE</span><p>From the equipment.<br /><em>To the control behind it.</em></p></div>}</div>
      {pageKey === 'overview' ? <div className="fe-hero-side"><div className="fe-circuit-symbol" aria-hidden="true"><svg viewBox="0 0 200 280" fill="none"><path d="M100 0V61M40 112H160M40 112V199H100V280M160 112V199H100"/><circle cx="100" cy="88" r="27"/><circle cx="40" cy="112" r="6"/><circle cx="160" cy="112" r="6"/><circle cx="100" cy="199" r="6"/></svg></div><p>LIGHT. <br />POWER. <br /><em>Possibility.</em></p><span>FENNOR / ELECTRICAL</span></div>
        : pageKey === 'industrial-maintenance' ? null
        : <div className="fe-hero-index"><span>{pageKey === 'domestic' ? '01 / AT HOME' : '02 / AT WORK'}</span><p>{pageKey === 'domestic' ? 'Made for your everyday.' : 'Keep the whole premises in view.'}</p>{pageKey === 'domestic' && <small>{page.imageCaption}</small>}</div>}
    </div>
    <div className="fe-hero-foot fe-shell"><span>BASED IN SLANE, CO. MEATH</span><span>{pageKey === 'overview' ? 'LIGHT, POWER & EVERYDAY LIFE' : pageKey === 'domestic' ? 'CONSIDERED LIGHT. USEFUL CONNECTIONS.' : pageKey === 'commercial' ? 'YOUR WORKING ENVIRONMENT' : 'YOUR SITE. YOUR OPERATING NEEDS.'}</span><a href="#enquiry">Discuss your project <span aria-hidden="true">↗</span></a></div>
  </section>;
}

function ServiceLedger({ pageKey }: { pageKey: Exclude<ElectricalPageKey, 'overview'> }) {
  const page = electricalPages[pageKey];
  return <section className="fe-services fe-shell" id="services" aria-labelledby="fe-services-heading"><div className="fe-section-top"><p className="fe-kicker">02 / ELECTRICAL WORK, CONSIDERED</p><span>Enquiry. Assessment. An agreed scope.</span></div><div className="fe-services-heading"><h2 id="fe-services-heading">The work behind<br /><em>{pageKey === 'domestic' ? 'a better home.' : pageKey === 'commercial' ? 'a useful premises.' : 'a working site.'}</em></h2><p>{pageKey === 'domestic' ? 'One room or a whole property. Start with what you need and we will explain what the existing installation means for the next step.' : pageKey === 'commercial' ? 'A clear electrical brief connects the installation with the activity it supports. These are useful places to begin the conversation.' : 'Each site has its own equipment, responsibilities and operating constraints. We review the requirements before confirming the work and specialist input.'}</p></div><div className="fe-service-ledger">{page.services.map((service,index) => <article key={service.title}><span>0{index+1}</span><div><h3>{service.title}</h3><p>{service.text}</p></div></article>)}</div></section>;
}

function OverviewConnections() {
  return <section className="fe-connections fe-shell" id="services"><div className="fe-section-top"><p className="fe-kicker">02 / THINK BEYOND THE FINISHED SURFACE</p><span>The details connect.</span></div><div className="fe-connection-layout"><div className="fe-connection-photo"><Image src="/images/electrical-visible-difference-4k.jpg" alt="Electrician inspecting electrical controls beside an air-handling unit, with cable tray, isolators and galvanised supports" fill sizes="(max-width: 800px) 88vw, 44vw" /><span>PLANTROOM / CONTROLS / MAINTENANCE ACCESS</span></div><div className="fe-connection-copy"><h2>The visible difference.<br /><em>The work behind it.</em></h2><p>The light you switch on. The equipment your business relies on. Behind both is an electrical installation that needs the right design, careful work and access for maintenance.</p><dl><div><dt>Plan it early.</dt><dd>Walk us through the rooms, equipment and changes you have in mind. We help agree useful positions, supply requirements and cable routes before work begins.</dd></div><div><dt>Know what to expect.</dt><dd>Your proposal sets out the work, planned interruptions and making good. For a working premises, we agree access and any shutdowns with your site contact.</dd></div><div><dt>Keep the detail.</dt><dd>At handover, you receive the relevant testing and completion records, equipment information and a clear point of contact for the agreed work.</dd></div></dl><a className="fe-link" href="/about/your-project">See how a Fennor project works <span aria-hidden="true">↗</span></a></div></div></section>;
}

function DomesticFinishedSpace() {
  return <section className="fe-domestic-finish fe-shell" aria-labelledby="fe-domestic-finish-title">
    <div className="fe-section-top"><p className="fe-kicker">FROM THE ELECTRICAL PLAN TO THE FINISHED ROOM</p><span>Lighting, sockets and appliance supplies working together.</span></div>
    <figure>
      <div className="fe-domestic-finish-image"><Image src="/images/electrical-domestic-finished-kitchen.jpg" alt="Freshly renovated kitchen with recessed ceiling lights, pendant lights and under-cabinet task lighting" fill sizes="(max-width: 800px) 100vw, 88vw" /></div>
      <figcaption><span>DOMESTIC ELECTRICAL / RENOVATED KITCHEN</span><div><h2 id="fe-domestic-finish-title">Clean at the finish.<br /><em>Considered behind it.</em></h2><p>The fittings are the visible part. Positions, switching, appliance supplies and cable routes are planned earlier, so the finished room works naturally when you move through it.</p></div></figcaption>
    </figure>
  </section>;
}

function CoordinatedWork({ pageKey }: { pageKey: ElectricalPageKey }) {
  const home = pageKey === 'domestic';
  const industrial = pageKey === 'industrial-maintenance';
  const links = home ? [['Kitchens & renovations','/renovations/kitchens'],['Solar for your home','/solar/domestic'],['EV charging','/solar/accessories#ev-charging']] : industrial ? [['Commercial solar','/solar/commercial'],['Farm solar','/solar/farm'],['Your project journey','/about/your-project']] : [['Commercial solar','/solar/commercial'],['Building & extensions','/building'],['Your project journey','/about/your-project']];
  return <section className="fe-connected-band"><div className="fe-shell"><p className="fe-kicker">PART OF THE BIGGER PICTURE</p><div><h2>{home ? 'Changing the room?' : industrial ? 'Changing the equipment?' : 'Changing the building?'}<br /><em>Bring the electrical plan with it.</em></h2><p>{home ? 'A kitchen, extension or energy upgrade changes what your home asks of its electrical installation. Fennor brings these decisions together so the proposed work and the interfaces between trades are clear.' : industrial ? 'New equipment, new energy systems and a different production layout can affect the same supply. We identify those interfaces and the people responsible for each part before the scope is agreed.' : 'Electrical work often sits alongside a fit-out, a building change or a new energy system. Fennor helps join those decisions into a practical scope, with the appropriate specialist input identified.'}</p></div><nav aria-label="Related project services">{links.map(([label,href]) => <a href={href} key={href}>{label}<span aria-hidden="true">↗</span></a>)}</nav></div></section>;
}

function ElectricalJourney({ pageKey }: { pageKey: ElectricalPageKey }) {
  const business = pageKey === 'commercial' || pageKey === 'industrial-maintenance';
  const stages = [
    ['Tell us about the place.', business ? 'Share the site, intended work, equipment and the hours or areas that matter to the operation. Available plans and records help us frame the assessment.' : 'Tell us what you want to change, where the property is and whether the electrical work is part of a wider project. We explain the assessment needed.'],
    ['Understand the proposal.', 'Review the scope, price, exclusions and any decisions still needed. We confirm the appropriate contractor, testing and certification responsibilities before work starts.'],
    ['Agree how the work happens.', business ? 'Confirm access, permissions, planned shutdowns and the site responsibilities. Any change affecting the scope, timing or cost is brought back for agreement.' : 'Agree access, furniture and finish protection, planned power interruptions and making good. You know the sequence and the arrangements needed for your household.'],
    ['Finish with the information.', 'The agreed handover brings together relevant test and completion records, equipment guidance and follow-up contacts, with outstanding items explained.'],
  ];
  return <section className="fe-journey fe-shell" id="journey" aria-labelledby="fe-journey-heading"><div><p className="fe-kicker">{pageKey === 'overview' ? '03' : '04'} / A CLEAR WAY FORWARD</p><h2 id="fe-journey-heading">From a first question.<br /><em>To an agreed plan.</em></h2><p>You do not need every technical answer before you get in touch. The next step is to understand the work and what it involves for your property.</p><span className="fe-journey-signature" aria-hidden="true">F / ELECTRICAL</span></div><ol>{stages.map(([title,text],index) => <li key={title}><span>0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>;
}

function ElectricalQuestions({ pageKey }: { pageKey: ElectricalPageKey }) {
  const page = electricalPages[pageKey];
  return <section className="fe-questions fe-shell" id="questions" aria-labelledby="fe-questions-heading"><div><p className="fe-kicker">{pageKey === 'overview' ? '04' : '05'} / USEFUL ANSWERS</p><h2 id="fe-questions-heading">A little clarity.<br /><em>Before you begin.</em></h2><p>Practical questions about the work, the people and the process.</p></div><div className="fe-faq-list">{page.questions.map((question,index) => <details key={question.title}><summary><span>0{index+1}</span><h3>{question.title}</h3><b aria-hidden="true">+</b></summary><div><p>{question.text}</p>{question.title === 'What about testing and certification?' && <a href={safeElectric} target="_blank" rel="noopener noreferrer">Safe Electric guidance <span aria-hidden="true">↗</span></a>}{question.title === 'How often should electrical inspection take place?' && <a href={workplaceGuidance} target="_blank" rel="noopener noreferrer">HSA inspection and testing guidance <span aria-hidden="true">↗</span></a>}</div></details>)}</div></section>;
}

function ElectricalGuidance({ pageKey }: { pageKey: ElectricalPageKey }) {
  return <aside className="fe-guidance fe-shell" aria-label="Electrical safety and contractor guidance"><span className="fe-guidance-mark" aria-hidden="true">↗</span><div><h2>The right people. The right records.</h2><p>We explain the testing and certification your work requires, and confirm the appropriately qualified or registered contractor before work starts. {pageKey === 'domestic' || pageKey === 'overview' ? 'Restricted electrical works in a home must be carried out and certified by a Registered Electrical Contractor.' : 'Workplace inspection and maintenance should reflect the installation, its use and operating environment.'}</p></div><div className="fe-guidance-links"><a href={safeElectric} target="_blank" rel="noopener noreferrer">Safe Electric guidance <span aria-hidden="true">↗</span></a>{pageKey !== 'domestic' && <a href={workplaceGuidance} target="_blank" rel="noopener noreferrer">HSA workplace guidance <span aria-hidden="true">↗</span></a>}<span>Official guidance checked 13 October 2026</span></div></aside>;
}

function ElectricalRelated({ pageKey }: { pageKey: ElectricalPageKey }) {
  return <nav className="fe-related fe-shell" aria-label="Explore electrical services"><p className="fe-kicker">FENNOR / ELECTRICAL</p><div>{(['overview',...electricalServices] as ElectricalPageKey[]).filter(key => key !== pageKey).map(key => <a key={key} href={electricalPath(key)}>{key === 'overview' ? 'All electrical services' : electricalPages[key].label}<span aria-hidden="true">↗</span></a>)}</div></nav>;
}

export default function ElectricalPage({ pageKey }: { pageKey: ElectricalPageKey }) {
  const page = electricalPages[pageKey];
  return <ElectricalBriefProvider><div className={`electrical-page fe-page-${pageKey}`} data-electrical-page={pageKey}><StructuredData pageKey={pageKey}/><a className="skip-link" href="#main">Skip to content</a><SiteHeader/><main id="main"><ElectricalHero pageKey={pageKey}/><nav className="fe-jump fe-shell" aria-label="On this page"><a href="#explore">01 {pageKey === 'overview' ? 'Find your service' : pageKey === 'domestic' ? 'Lighting ideas' : pageKey === 'commercial' ? 'Your premises' : 'Your site brief'}</a><a href="#services">02 The work</a>{pageKey !== 'overview' && <a href="#grant-options">03 Grants &amp; support</a>}<a href="#journey">{pageKey === 'overview' ? '03' : '04'} The process</a><a href="#questions">{pageKey === 'overview' ? '04' : '05'} Questions</a><a href="#enquiry">Start an enquiry <span aria-hidden="true">↗</span></a></nav>
    <section className="fe-introduction fe-shell"><p className="fe-kicker">GOOD WORK BEGINS WITH UNDERSTANDING</p><div><h2>{page.storyTitle}<br /><em>{page.storyAccent}</em></h2><p>{page.story}</p></div></section>
    {pageKey === 'overview' ? <><ElectricalRouteFinder/><OverviewConnections/></> : <>{pageKey === 'domestic' ? <><DomesticLightingStudy/><DomesticFinishedSpace/></> : pageKey === 'commercial' ? <CommercialPremisesStudy/> : <MaintenanceStudy/>}<ServiceLedger pageKey={pageKey}/><CoordinatedWork pageKey={pageKey}/><GrantDirectory path={electricalPath(pageKey)}/></>}
    <ElectricalJourney pageKey={pageKey}/><ElectricalGuidance pageKey={pageKey}/><ElectricalQuestions pageKey={pageKey}/><ElectricalEnquiry pageKey={pageKey}/><ElectricalRelated pageKey={pageKey}/>
  </main></div></ElectricalBriefProvider>;
}
