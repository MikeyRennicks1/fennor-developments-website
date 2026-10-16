import Image from 'next/image';
import EnquiryForm from './EnquiryForm';
import SiteHeader from './SiteHeader';
import type { LocalSeoPage } from '@/config/local-seo-pages';
import './local-seo.css';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function LocalSeoLanding({ page }: { page: LocalSeoPage }) {
  const url = `https://fennor.ie${page.path}`;
  const officialSources = page.path.startsWith('/solar-panels-') ? [
    ['SEAI home solar PV grant', 'https://www.seai.ie/grants/home-energy-grants/individual-grants/solar-electricity-grant'],
    ['SEAI battery grant', 'https://www.seai.ie/grants/home-energy-grants/individual-grants/battery'],
    ['CRU microgeneration guidance', 'https://www.cru.ie/consumer-information/microgeneration/'],
  ] : page.path === '/electrician-slane' ? [
    ['Safe Electric guidance', 'https://safeelectric.ie/help-advice/controlled-restricted-electrical-works'],
  ] : [
    ['Citizens Information planning guidance', 'https://www.citizensinformation.ie/en/housing/planning-permission/planning-permission-for-altering-a-house/'],
    ['Government loft-conversion guidance', 'https://assets.gov.ie/static/documents/loft-conversion-guidelines-2022.pdf'],
  ];
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title,
        description: page.description, inLanguage: 'en-IE',
        isPartOf: { '@id': 'https://fennor.ie/#website' },
        about: { '@id': `${url}#service` },
        primaryImageOfPage: { '@type': 'ImageObject', contentUrl: `https://fennor.ie/images/${page.image}`, caption: page.imageAlt },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'Service', '@id': `${url}#service`, name: page.label,
        serviceType: page.serviceType, areaServed: { '@type': 'AdministrativeArea', name: page.area },
        provider: { '@id': 'https://fennor.ie/#organization' }, url,
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fennor.ie/' },
          { '@type': 'ListItem', position: 2, name: page.label, item: url },
        ],
      },
      {
        '@type': 'FAQPage', '@id': `${url}#questions`, isPartOf: { '@id': `${url}#webpage` },
        mainEntity: page.questions.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
      },
    ],
  };

  return <div className="lp-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader editorial />
    <main id="main">
      <div className="lp-shell lp-crumbs"><a href="/">Home</a><span>/</span><span aria-current="page">{page.label}</span></div>

      <section className="lp-hero lp-shell" aria-labelledby="lp-title">
        <div className="lp-hero-copy">
          <p className="lp-kicker">{page.eyebrow}</p>
          <h1 id="lp-title">{page.headline}<br /><em>{page.accent}</em></h1>
          <p className="lp-lead">{page.intro}</p>
          <div className="lp-actions"><a href="#enquire">Discuss your property <Arrow /></a><a href="tel:+353894032737">089 403 2737</a></div>
        </div>
        <figure className="lp-hero-image"><Image src={`/images/${page.image}`} alt={page.imageAlt} fill priority sizes="(max-width: 850px) 92vw, 50vw" /><figcaption>{page.area.toUpperCase()} / FENNOR SERVICE AREA</figcaption></figure>
      </section>

      <nav className="lp-jump lp-shell" aria-label="On this page"><a href="#local">01 Local service</a><a href="#options">02 Your options</a><a href="#process">03 What happens</a><a href="#questions">04 Useful answers</a><a href="#enquire">05 Enquire</a></nav>

      <section className="lp-local lp-shell" id="local">
        <p className="lp-kicker">A GENUINE LOCAL STARTING POINT</p>
        <div><h2>Your property first.<br /><em>Your town or Eircode is only the starting point.</em></h2><p>{page.proof}</p><p className="lp-reviewed">Information reviewed <time dateTime="2026-10-15">15 October 2026</time>.</p></div>
      </section>

      <section className="lp-options" id="options"><div className="lp-shell">
        <div className="lp-heading"><p className="lp-kicker">THE DETAIL THAT EARNS ITS PLACE</p><h2>Clear choices.<br /><em>Connected to your project.</em></h2></div>
        <div className="lp-option-grid">{page.sections.map((section, index) => <article key={section.title}><span>0{index + 1}</span><h3>{section.title}</h3><p>{section.text}</p><a href={section.href}>{section.link} <Arrow /></a></article>)}</div>
      </div></section>

      <section className="lp-process lp-shell" id="process">
        <div className="lp-heading"><p className="lp-kicker">FROM ENQUIRY TO A CLEAR DECISION</p><h2>Three useful steps.<br /><em>No standard package assumed.</em></h2></div>
        <ol>{page.steps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
      </section>

      <section className="lp-related"><div className="lp-shell"><div className="lp-heading"><p className="lp-kicker">KEEP EXPLORING</p><h2>Useful detail.<br /><em>Before you decide.</em></h2></div><div className="lp-related-grid">{page.related.map(item => <a href={item.href} key={item.href}><span>{item.label}</span><p>{item.text}</p><b aria-hidden="true">↗</b></a>)}</div></div></section>

      <section className="lp-questions lp-shell" id="questions">
        <div><p className="lp-kicker">DIRECT ANSWERS</p><h2>Questions people ask.<br /><em>Plain-language answers.</em></h2><p>Official scheme and regulatory requirements always take precedence over a website summary.</p></div>
        <div>{page.questions.map((item, index) => <details key={item.q}><summary><span>0{index + 1}</span><h3>{item.q}</h3><b aria-hidden="true">+</b></summary><p>{item.a}</p></details>)}</div>
      </section>

      <aside className="lp-sources lp-shell"><p className="lp-kicker">OFFICIAL GUIDANCE</p>{officialSources.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label} <Arrow /></a>)}</aside>

      <section className="lp-enquiry" id="enquire"><div className="lp-shell lp-enquiry-grid"><div><p className="lp-kicker">YOUR PROPERTY / YOUR NEXT STEP</p><h2>Talk to Fennor.<br /><em>We will start with what you know.</em></h2><p>Based in Slane, Co. Meath. Tell us the property location, what you would like to improve and the best way to contact you. We confirm the appropriate assessment, availability and any visit cost before an appointment is booked.</p><a className="lp-phone" href="tel:+353894032737">089 403 2737 <Arrow /></a></div><EnquiryForm topic={`${page.label} website enquiry`} context={`Landing page: ${page.path}`} buttonClassName="lp-submit"><label htmlFor="local-area">Town or property area</label><input id="local-area" name="area" defaultValue={page.area} autoComplete="address-level2" maxLength={120} /><label htmlFor="local-details">What would you like help with?</label><textarea id="local-details" name="details" required rows={5} maxLength={2000} placeholder="Tell us about the property, the work and any questions…" /></EnquiryForm></div></section>
    </main>
  </div>;
}
