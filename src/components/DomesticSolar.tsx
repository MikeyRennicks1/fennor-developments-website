import Image from 'next/image';
import SiteHeader from './SiteHeader';
import SolarRelated from '@/components/SolarRelated';
import { DomesticEnquiry, DomesticExplorer, SolarSelectionProvider } from '@/components/DomesticConfigurator';
import '@/app/solar/domestic.css';

const sources = {
  pv: 'https://www.seai.ie/grants/home-energy-grants/individual-grants/solar-electricity-grant',
  battery: 'https://www.seai.ie/grants/home-energy-grants/individual-grants/battery',
  enhanced: 'https://www.seai.ie/grants/home-energy-grants/homeowners-in-receipt-of-certain-Department-of-Social-Protection-payments',
  guide: 'https://www.seai.ie/publications/Homeowners-Guide-To-Solar-PV.pdf',
  networks: 'https://www.esbnetworks.ie/customer-support/customer-support-queries/generator-connections/connect-a-micro-generator',
  calculator: 'https://www.seai.ie/about/tools/solar-electricity-calculator',
};
const faq = [
  ['Does solar work on cloudy days?', 'Solar PV uses daylight, not heat. Output changes with cloud cover, shade and the season; a winter day will not perform like a long summer day. Fennor explains the expected seasonal pattern for your roof so the estimate reflects winter as well as summer.'],
  ['Does my roof need to face south?', 'A south-facing roof is not the only possibility. East- and west-facing roof areas can also be considered. Our roof assessment brings direction, pitch, shade and your electricity routine together before we recommend which roof faces to use.'],
  ['Do I need a battery or an EDDI?', 'Neither is mandatory. A battery stores electricity; an EDDI can send surplus to a compatible immersion heater. Fennor explains the solar-only option and the added cost and purpose of each extra, so you can choose what is worthwhile for your home.'],
  ['Will I still have electricity in a power cut?', 'A normal grid-connected system shuts down during a network outage. Backup needs compatible equipment and properly designed isolation and changeover arrangements. A battery alone does not guarantee that the whole house will stay powered.'],
  ['How much can I save?', 'Fennor builds the estimate around your roof, electricity use and tariffs. We explain the separate value of electricity used at home and exported, allow for any storage losses and show the assumptions behind the result. Panel count alone cannot promise a fixed bill reduction.'],
  ['What if I am planning an EV or a heat pump?', 'Tell us about those plans and we will include them in the assessment. Night-time EV charging and winter heating are different from sunny midday generation, so we consider when the extra electricity will be needed—not just how many more panels fit.'],
  ['What should I ask about warranties and aftercare?', 'Before you agree the work, Fennor explains the support included, who handles faults, and the difference between product and installation warranties. At handover, we take you through the equipment details, relevant certificates and the contact route for help.'],
  ['How many solar panels does my home need?', 'There is no single right panel count for every home. Start with annual electricity use, usable roof space, shading and when you use power. For example, 10 panels rated at 480 W have a nominal capacity of 4.8 kWp—not a promise of 4.8 kW at all times. Try different sizes in the interactive system above, then request a roof-specific assessment.'],
  ['How much does domestic solar cost in Ireland?', 'A useful price needs a defined system and a property assessment. Panel and inverter models, access, roof condition, electrical work and optional battery storage affect the quote. Talk to Fennor about a quote for your home. We will explain the full installed price separately from any grant you may qualify for, rather than give you a package price that assumes every roof is the same.'],
  ['Is the €9,000 solar grant available to everyone?', 'No. SEAI’s enhanced support is eligibility-based: up to €8,400 for PV plus €600 for an eligible battery. It covers qualifying welfare recipients and a separate Dublin Rental Accommodation Scheme pilot with local-authority confirmation. The standard PV maximum is €1,800, plus separate eligible battery support of €600. Fennor explains the relevant application route; SEAI determines entitlement and the offer must be received before installation.'],
];
const faqReferences = [
  ['cloudy-days', sources.guide, 'SEAI solar PV homeowner guide'],
  ['roof-direction', sources.guide, 'SEAI roof and system guidance'],
  ['battery-or-eddi', '/solar/battery-storage', 'Explore battery storage', '/solar/accessories#eddi', 'Explore EDDI hot-water diversion'],
  ['power-cuts', sources.networks, 'ESB Networks microgeneration guidance'],
  ['solar-savings', sources.calculator, 'SEAI solar electricity calculator'],
  ['future-energy-use', '#assessment', 'Discuss your future energy use'],
  ['warranties-aftercare', sources.guide, 'SEAI homeowner checklist'],
  ['panel-count', '#design', 'Try your panel layout'],
  ['solar-cost', '#assessment', 'Discuss a quote for your home'],
  ['solar-grant-eligibility', sources.pv, 'Check the current SEAI grant terms'],
];

export default function DomesticSolar() {
  return <SolarSelectionProvider><div className="domestic-page">
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader/>
    <main id="main">
      <section className="ds-hero">
        <nav className="ds-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/solar">Solar</a><span>/</span><span aria-current="page">Domestic</span></nav>
        <div className="ds-hero-opening"><div><p className="eyebrow"><span className="orange-dot" /> DOMESTIC SOLAR / FENNOR</p><h1>Your roof.<br /><em>A brighter everyday.</em></h1></div><div className="ds-hero-intro"><p>Solar panels for your home in Meath, Louth and Dublin. Thoughtfully planned around your roof, your energy use and the way you live.</p><a className="ds-inline-link" href="#design">Explore your system <span>↘</span></a></div></div>
        <div className="ds-hero-image"><Image src="/images/domestic-estate-hero.webp" alt="Architectural visualisation of rooftop solar on a modern Irish family home" fill loading="eager" fetchPriority="high" sizes="100vw" quality={88} /><div className="ds-photo-shade" /><p className="ds-photo-line">A familiar home.<br /><em>A new possibility.</em></p><a className="ds-grant-teaser" href="#funding"><span>OCTOBER 2026 GRANT UPDATE</span><strong>Know what<br />you can apply for.</strong><span>Standard & enhanced routes <b>↗</b></span></a><span className="ds-photo-index" aria-hidden="true">01 — SOLAR, CONSIDERED</span></div>
        <div className="ds-hero-foot"><span>BASED IN SLANE, CO. MEATH</span><span>YOUR HOME COMES FIRST</span><a href="tel:+353894032737">089 403 2737 ↗</a></div>
      </section>
      <nav className="ds-jump" aria-label="On this page"><a href="#design">01 Your system</a><a href="#suitability">02 Your roof</a><a href="#funding">03 Grants</a><a href="#journey">04 The process</a><a href="#questions">05 Questions</a></nav>

      <section className="ds-introduction ds-shell"><p className="eyebrow">LESS GUESSWORK. MORE UNDERSTANDING.</p><div><h2>Not just more panels.<br /><em>A better fit for your life.</em></h2><p>A busy family home, a home office and an empty house during the day use energy differently. Fennor matches the roof design to your routine, then explains which equipment earns its place in the quote—and which extras you may not need.</p><p>Based in Slane, Co. Meath, our first focus is home solar in Meath and Louth, with Dublin enquiries also welcome. Tell us your town and a little about your roof so we can confirm the assessment and next step for your home.</p><a className="ds-inline-link" href="/about/areas">Check our service areas <span>↗</span></a></div></section>
      <DomesticExplorer />

      <section className="ds-suitability ds-shell" id="suitability"><div className="ds-section-top"><p className="eyebrow">02 / THE RIGHT FOUNDATIONS</p><span>Before a panel is chosen</span></div><div className="ds-suitability-grid"><div className="ds-sticky-heading"><h2>First, get to<br /><em>know your roof.</em></h2><p>You do not need to survey the roof yourself. Fennor arranges the assessment that shapes your panel layout, equipment choices and installation plan.</p></div><div className="ds-considerations">{[
        ['01', 'A sound starting point.', 'Condition & access', 'A ground-level photograph and any known repair issues help us get started. The assessment covers the roof covering, structure and safe access; we explain any work needed before panels can be fitted.'],
        ['02', 'Follow the daylight.', 'Direction & shade', 'We assess the roof’s direction and pitch alongside shade from trees, chimneys and neighbouring buildings. Because shade and daylight change through the year, the proposal explains how suitable roof faces could work together.'],
        ['03', 'Make room for real life.', 'Use & future plans', 'Your bill and, where available, smart-meter data help us match generation to daily use. We include plans for an EV, heating or renovation without assuming the biggest array is automatically the right one.'],
      ].map(([number, title, label, text]) => <article key={number}><span className="ds-number">{number}</span><div><p className="eyebrow">{label}</p><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="ds-energy-story"><div className="ds-shell"><p className="eyebrow">ONE SYSTEM. DIFFERENT JOBS.</p><h2>Where your<br /><em>daylight goes.</em></h2><div className="ds-flow">{[
        ['01', 'Generate', 'Panels turn daylight into DC electricity. The inverter converts it into electricity your home can use.'],
        ['02', 'Use at home', 'Appliances running while the system generates can use that power. Moving suitable tasks into daylight hours may help.'],
        ['03', 'Manage surplus', 'Depending on the system, surplus can charge a battery, heat water through a diverter or go to the grid. It cannot do all three with the same unit of energy.'],
        ['04', 'Stay connected', 'The grid still supplies electricity when generation and any usable storage do not meet demand. Export arrangements are separate from grant approval.'],
      ].map(([number, heading, text]) => <article key={number}><span>{number}<i aria-hidden="true">↗</i></span><h3>{heading}</h3><p>{text}</p></article>)}</div><div className="ds-story-links"><a href="/solar/battery-storage">Battery storage ↗</a><a href="/solar/accessories#eddi">EDDI & hot water ↗</a><a href={sources.networks} target="_blank" rel="noopener noreferrer">ESB Networks connection guidance ↗</a><a href={sources.guide} target="_blank" rel="noopener noreferrer">Read SEAI’s homeowner guide ↗</a></div></div></section>


      <section className="ds-grants ds-shell" id="funding"><div className="ds-grants-heading"><div><p className="eyebrow">03 / SUPPORT, EXPLAINED</p><h2>The right grant.<br /><em>For your circumstances.</em></h2></div><p>Official guidance checked<br /><time dateTime="2026-10-12">12 October 2026</time><br /><a href={sources.pv} target="_blank" rel="noopener noreferrer">Verify current SEAI terms ↗</a></p></div><div className="ds-grant-routes"><article><span className="eyebrow">STANDARD SOLAR PV ROUTE</span><p className="ds-grant-amount"><small>up to</small>€1,800</p><h3>Support for eligible homes.</h3><p>SEAI lists €700 per kWp for the first 2 kWp, then €200 per kWp up to 4 kWp. Solar PV support is capped at €1,800.</p><a href={sources.pv} target="_blank" rel="noopener noreferrer">Standard solar grant ↗</a></article><article className="ds-enhanced-grant"><span className="eyebrow">ENHANCED / QUALIFYING WELFARE RECIPIENTS</span><p className="ds-grant-amount"><small>up to</small>€9,000</p><h3>A separate, eligibility-based route.</h3><p>Up to €8,400 for solar PV plus €600 for an eligible battery. This is not a universal grant and is not added on top of the standard €1,800.</p><a href={sources.enhanced} target="_blank" rel="noopener noreferrer">Check qualifying welfare payments ↗</a></article></div><div className="ds-battery-grant"><span>+ €600</span><div><h3>Battery support has its own conditions.</h3><p>SEAI’s battery grant is for systems of 5 kWh or larger. Combined with the maximum standard solar grant, this can mean up to €2,400—not €9,000 for every household.</p></div><a href={sources.battery} target="_blank" rel="noopener noreferrer">Battery grant details ↗</a></div><p className="ds-grant-conditions">Check the full scheme terms: the home must be built and occupied before 2025, have an MPRN and meet previous-funding rules. Obtain the relevant grant offer before installation starts. Final entitlement is determined by SEAI, not this page.</p><p className="ds-grant-conditions">For the welfare route, additional duration, child-age or living-arrangement conditions can apply. A separate Dublin Rental Accommodation Scheme pilot requires local-authority confirmation. Check SEAI’s full guidance; do not share welfare documents here.</p><a className="text-link" href="/advice/grant-updates#grant-directory" style={{gridColumn:"1/-1",display:"inline-flex",width:"fit-content",marginTop:"18px"}}>Explore all grants &amp; funding ↗</a></section>

      <section className="ds-details ds-shell"><div className="ds-details-heading"><p className="eyebrow">CLOSER TO THE WORK</p><h2>The details<br /><em>deserve attention.</em></h2><p>Roof layout. Equipment location. A clear handover.<br />We will help you understand the details behind your proposal.</p></div><div className="ds-photo-grid">{[
        ['domestic-white-outbuilding.webp', 'Solar panels on the slate roof of a white outbuilding with a stone gable, garden and countryside beyond', '01', 'Solar, at home.'],
        ['domestic-inverter.webp', 'Wall-mounted inverter and electrical isolators from the supplied solar photo collection', '02', 'The system beyond the panels.'],
        ['domestic-panels.webp', 'Dark solar panels installed on a slate roof beneath a blue sky', '03', 'Look closely. Ask good questions.'],
      ].map(([image, alt, number, caption]) => <figure key={image}><div><Image src={`/images/${image}`} alt={alt} fill sizes="(max-width: 700px) 90vw, 30vw" /></div><figcaption><span>{number}</span>{caption}</figcaption></figure>)}</div><div className="ds-gallery-foot"><p>Installation photographs from Fennor’s supplied collection. No generation or savings results are inferred from these images.</p><a className="ds-inline-link" href="/solar/projects-case-studies">Explore solar project photographs ↗</a></div></section>

      <section className="ds-journey ds-shell" id="journey"><div><p className="eyebrow">04 / A CLEARER PATH</p><h2>From a first question.<br /><em>To a considered system.</em></h2><p>You do not need to arrive with a finished solar plan. We will help you move from your first questions to an agreed proposal, with the next step explained at each stage.</p></div><ol>{[
        ['Understand your home', 'Tell us where you live and what you want solar to do. Fennor reviews your electricity use and arranges the roof and electrical assessment needed for a proposal specific to your home.'],
        ['Review a written proposal', 'Fennor walks you through the panel layout, named equipment, estimated output and full installed price. We explain any exclusions and who carries out specialist work before you decide whether to proceed.'],
        ['Get the approvals in place', 'We guide you through the grant and network sequence, identifying what you need to approve or submit and what the installation team provides. Any required approval must be in place before work; an enquiry or quotation is not a grant offer.'],
        ['Install, test and hand over', 'Before installation, we agree access and explain any planned interruption to your electricity. The installation team completes testing and commissioning; Fennor takes you through monitoring, safety records and the post-works BER required for the grant.'],
        ['Know who to call afterwards', 'We explain the support and follow-up included in your proposal. At handover, you receive the monitoring guidance, records and contact details you need to use the system and raise a question.'],
      ].map(([heading, text], index) => <li key={heading}><span>0{index + 1}</span><div><h3>{heading}</h3><p>{text}</p></div></li>)}</ol></section>

      <section className="ds-faq ds-shell" id="questions" aria-labelledby="domestic-questions-heading"><div><p className="eyebrow">05 / GOOD QUESTIONS</p><h2 id="domestic-questions-heading">Domestic solar.<br /><em>Your questions, answered.</em></h2><p>Clear answers for homeowners considering solar in Meath, Louth and Dublin. Start with what matters to your home, then follow the guidance behind the answer.</p><a className="ds-inline-link" href="/solar/faq-advice">More solar advice ↗</a></div><div className="ds-faq-list">{faq.map(([question, answer], index) => {
        const [id, href, label, secondHref, secondLabel] = faqReferences[index];
        return <details key={id} id={`question-${id}`}><summary><span>{String(index + 1).padStart(2, '0')}</span><h3>{question}</h3><b aria-hidden="true">+</b></summary><div className="ds-faq-answer"><p>{answer}</p><div className="ds-answer-links"><a href={href}>{label} ↗</a>{secondHref && <a href={secondHref}>{secondLabel} ↗</a>}</div></div></details>;
      })}<p className="ds-source-note">Guidance reviewed <time dateTime="2026-10-09">9 October 2026</time>. Scheme terms can change; check the linked official sources before applying. An assessment is needed for advice specific to your property.</p></div></section>
      <DomesticEnquiry />
      <div className="ds-shell ds-related"><SolarRelated current="domestic" /></div>
    </main>
  </div></SolarSelectionProvider>;
}
