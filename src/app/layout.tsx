import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { site } from '@/config/site';
import { getLaunchSettings } from '@/config/launch';
import './globals.css';
import SiteDirectory from '@/components/SiteDirectory';

const dmSans = localFont({ src: '../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2', variable: '--font-dm-sans', display: 'swap', weight: '100 900' });
const manrope = localFont({ src: '../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', variable: '--font-manrope', display: 'swap', weight: '200 800' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.homeTitle,
  description: site.homeDescription,
  applicationName: site.shortName,
  robots: getLaunchSettings().metadataRobots,
  icons: { icon: '/icon.svg' },
};

const businessGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'HomeAndConstructionBusiness'],
      '@id': `${site.url}/#organization`,
      name: site.name,
      legalName: site.name,
      alternateName: site.shortName,
      identifier: { '@type': 'PropertyValue', name: 'Irish company number', value: '810147' },
      url: site.url,
      logo: `${site.url}/images/logo-orange.webp`,
      image: `${site.url}/opengraph-image`,
      telephone: site.telephone,
      email: site.email,
      address: { '@type': 'PostalAddress', streetAddress: 'Fennor', addressLocality: site.locality, addressRegion: `Co. ${site.county}`, postalCode: 'C15 R5W6', addressCountry: 'IE' },
      areaServed: [
        ...site.localities.map(name => ({ '@type': 'City', name })),
        ...site.primaryAreas.map(name => ({ '@type': 'AdministrativeArea', name })),
      ],
      contactPoint: { '@type': 'ContactPoint', telephone: site.telephone, email: site.email, contactType: 'customer enquiries', availableLanguage: 'English' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Fennor services', itemListElement: [
          ['Solar PV systems', '/solar'], ['Electrical services', '/electrical'], ['Residential building', '/building'],
          ['Home renovations', '/renovations'], ['Home energy upgrades', '/retrofitting'], ['Heat-pump planning', '/heat-pumps'],
        ].map(([name, path]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, url: `${site.url}${path}` } })),
      },
    },
    { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.shortName, publisher: { '@id': `${site.url}/#organization` }, inLanguage: 'en-IE' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IE" className={`${dmSans.variable} ${manrope.variable}`}><body id="site-top"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessGraph).replace(/</g, '\\u003c') }} />{children}<SiteDirectory /></body></html>;
}
