import type { Metadata } from 'next';
import Image from 'next/image';
import BrandLogo from '@/components/BrandLogo';
import { notFound } from 'next/navigation';
import { solarLinks, solarPages } from '@/config/solar-pages';
import PanelSizer from '@/components/PanelSizer';
import SolarRelated from '@/components/SolarRelated';
import DomesticSolar from '@/components/DomesticSolar';
import CommercialSolar from '@/components/CommercialSolar';
import FarmSolar from '@/components/FarmSolar';
import { farmQuestions } from '@/lib/farm-solar';
import EditorialPage, { editorialMetadata } from '@/components/EditorialPage';
import { editorialPages } from '@/config/editorial-pages';
import { enquiryEmailHref } from '@/config/contact';
import { SolarFooter } from '@/components/SolarPageParts';

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(solarPages).filter(service => service !== 'ground-mounted').map(service => ({ service })); }
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  if (editorialPages[`/solar/${service}`]) return editorialMetadata(`/solar/${service}`);
  const page = solarPages[service];
  if (!page) return {};
  if (service === 'farm') return {
    title: 'Farm Solar Panels Ireland | TAMS & Agricultural Solar | Fennor',
    description: 'Explore farm solar with Fennor: shed roofs, dairy and agricultural electricity use, an interactive value explorer, TAMS and SEAI grant routes. Based in Meath.',
    alternates: { canonical: 'https://fennor.ie/solar/farm' },
    openGraph: { title: 'Working roofs. Working harder. | Farm Solar | Fennor', description: 'Solar for the shed. Value for the whole farm. Explore roof space, farm demand and funding.', url: 'https://fennor.ie/solar/farm', type: 'website', locale: 'en_IE', images: [{ url: 'https://fennor.ie/images/farm-solar-hero.webp', width: 1672, height: 941, alt: 'Irish farm solar architectural concept' }] },
    twitter: { card: 'summary_large_image', title: 'Farm solar | Fennor', images: ['https://fennor.ie/images/farm-solar-hero.webp'] },
  };
  if (service === 'commercial') return {
    title: 'Commercial Solar PV Ireland | Business Solar & Grants | Fennor',
    description: 'Explore commercial solar with Fennor: business energy patterns, roof and electrical planning, the updated SEAI grant and a practical site enquiry. Based in Meath.',
    alternates: { canonical: 'https://fennor.ie/solar/commercial' },
    openGraph: { title: 'Your roof. Your business. New potential. | Fennor', description: 'Commercial solar planned around your premises and your working day.', url: 'https://fennor.ie/solar/commercial', type: 'website', locale: 'en_IE', siteName: 'Fennor Developments', images: [{ url: 'https://fennor.ie/images/commercial-concept-hero.webp', alt: 'Commercial rooftop solar architectural concept with a workshop and office entrance' }] },
    twitter: { card: 'summary_large_image', title: 'Commercial solar | Fennor', description: 'Commercial solar planned around your premises and working day.', images: ['https://fennor.ie/images/commercial-concept-hero.webp'] },
  };
  if (service === 'domestic') return {
    title: 'Solar Panels Meath & Louth | Domestic Solar PV | Fennor',
    description: 'Plan home solar panels in Meath or Louth with Fennor, based in Slane. Explore roof suitability, batteries, costs and grants. Dublin enquiries welcome.',
    alternates: { canonical: 'https://fennor.ie/solar/domestic' },
    openGraph: { title: 'Solar for your home | Fennor', description: 'A better fit for your roof, your energy use and your everyday life.', url: 'https://fennor.ie/solar/domestic', type: 'website', locale: 'en_IE', siteName: 'Fennor Developments', images: [{ url: 'https://fennor.ie/images/domestic-white-outbuilding.webp', alt: 'Supplied photograph of solar panels on a white, slate-roofed outbuilding' }] },
    twitter: { card: 'summary_large_image', title: 'Solar for your home | Fennor', description: 'Home solar planned around your roof and electricity use in Meath, Louth and Dublin.', images: ['https://fennor.ie/images/domestic-white-outbuilding.webp'] },
  };
  return { title: `${page.title} | Fennor`, description: page.description, alternates: { canonical: `https://fennor.ie/solar/${service}` } };
}
export default async function SolarLanding({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  if (editorialPages[`/solar/${service}`]) return <EditorialPage path={`/solar/${service}`} />;
  const page = solarPages[service];
  if (!page) notFound();
  if (service === 'farm') return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': 'https://fennor.ie/solar/farm#webpage', url: 'https://fennor.ie/solar/farm', name: 'Farm Solar Panels Ireland | TAMS & Agricultural Solar | Fennor', inLanguage: 'en-IE', isPartOf: { '@id': 'https://fennor.ie/#website' }, about: { '@id': 'https://fennor.ie/#organization' } },
    { '@type': 'BreadcrumbList', '@id': 'https://fennor.ie/solar/farm#breadcrumb', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fennor.ie/' }, { '@type': 'ListItem', position: 2, name: 'Solar', item: 'https://fennor.ie/solar' }, { '@type': 'ListItem', position: 3, name: 'Farm Solar', item: 'https://fennor.ie/solar/farm' }] },
    { '@type': 'FAQPage', '@id': 'https://fennor.ie/solar/farm#farm-questions', mainEntity: farmQuestions.map(({q,a}) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ] }).replace(/</g, '\\u003c') }} /><FarmSolar /></>;
  if (service === 'commercial') return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': 'https://fennor.ie/solar/commercial#webpage', url: 'https://fennor.ie/solar/commercial', name: 'Commercial Solar PV Ireland | Business Solar & Grants | Fennor', inLanguage: 'en-IE', isPartOf: { '@id': 'https://fennor.ie/#website' }, about: { '@id': 'https://fennor.ie/#organization' } },
    { '@type': 'BreadcrumbList', '@id': 'https://fennor.ie/solar/commercial#breadcrumb', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fennor.ie/' }, { '@type': 'ListItem', position: 2, name: 'Solar', item: 'https://fennor.ie/solar' }, { '@type': 'ListItem', position: 3, name: 'Commercial Solar', item: 'https://fennor.ie/solar/commercial' }] },
  ] }).replace(/</g, '\\u003c') }} /><CommercialSolar /></>;
  if (service === 'domestic') return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': 'https://fennor.ie/solar/domestic#webpage', url: 'https://fennor.ie/solar/domestic', name: 'Solar Panels Meath & Louth | Domestic Solar PV | Fennor', inLanguage: 'en-IE', isPartOf: { '@id': 'https://fennor.ie/#website' }, about: { '@id': 'https://fennor.ie/#organization' } },
    { '@type': 'BreadcrumbList', '@id': 'https://fennor.ie/solar/domestic#breadcrumb', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fennor.ie/' }, { '@type': 'ListItem', position: 2, name: 'Solar', item: 'https://fennor.ie/solar' }, { '@type': 'ListItem', position: 3, name: 'Domestic Solar', item: 'https://fennor.ie/solar/domestic' }] },
  ] }).replace(/</g, '\\u003c') }} /><DomesticSolar /></>;
  const label = solarLinks.find(item => item.slug === service)?.label ?? page.title;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><a href="/" className="brand" aria-label="Fennor homepage"><BrandLogo loading="eager"/></a><a href="/#services" className="header-cta">Explore all solar services ↗</a></header>
    <main id="main" className="accessories-page solar-landing section-shell">
      <nav className="solar-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/#services">Solar</a><span>/</span><span aria-current="page">{label}</span></nav>
      <div className={`solar-page-opening ${page.image ? 'with-image' : ''}`}><div><p className="eyebrow">FENNOR / {label.toUpperCase()}</p><h1>{page.headline}<br /><em>{page.accent}</em></h1><p className="accessories-intro">{page.intro}</p></div>{page.image && <div className="solar-opening-image"><Image src={`/images/${page.image}`} alt={page.imageAlt ?? ''} fill priority sizes="(max-width: 800px) 100vw, 40vw" /></div>}</div>
      {service === 'calculator' && <PanelSizer />}
      <section className="eddi-section" aria-label={`${label} guidance`}><div><p className="eyebrow">A MORE INFORMED DECISION</p><h2>A clearer<br /><em>starting point.</em></h2><a className="text-link" href="/contact#enquire">{page.cta} ↗</a><a className="text-link" href={enquiryEmailHref({ subject: page.cta })}>Email about this ↗</a></div><div className="eddi-copy">{page.sections.map((section, index) => <section key={section.heading} className="solar-guidance-section"><span className="eyebrow">0{index + 1}</span><h3>{section.heading}</h3><p>{section.text}</p></section>)}<div className="eddi-check"><span>{service === 'projects-case-studies' ? 'YOUR PROJECT STARTS HERE' : 'A FEW HELPFUL STARTING DETAILS'}</span><ul>{page.checklist.map(item => <li key={item}>{item}</li>)}</ul></div></div></section>
      {page.sources && <section className="battery-guidance" aria-label="Official guidance"><h2>The guidance behind your options.</h2><div>{page.sources.map(source => <a className="text-link" key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div><p>We can help explain how the official terms relate to your plans. The scheme administrator determines eligibility, and current terms apply to your application.</p></section>}
      <SolarRelated current={service} />
    </main>
    <SolarFooter />
  </>;
}
