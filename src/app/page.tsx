import type { Metadata } from 'next';
import Home from '@/components/Home';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: site.homeTitle,
  description: site.homeDescription,
  alternates: { canonical: site.url },
  openGraph: { type: 'website', locale: 'en_IE', url: site.url, siteName: site.name, title: site.homeTitle, description: site.homeDescription, images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Fennor — Solar, renovations and retrofits. Meath, Louth and Dublin.' }] },
  twitter: { card: 'summary_large_image', title: site.homeTitle, description: site.homeDescription, images: ['/opengraph-image'] },
};

const graph = {
  '@context': 'https://schema.org',
  '@type': 'WebPage', '@id': `${site.url}/#webpage`, url: site.url, name: site.homeTitle,
  description: site.homeDescription, isPartOf: { '@id': `${site.url}/#website` },
  about: { '@id': `${site.url}/#organization` }, inLanguage: 'en-IE',
};
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} /><Home /></>; }
