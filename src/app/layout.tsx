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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IE" className={`${dmSans.variable} ${manrope.variable}`}><body id="site-top">{children}<SiteDirectory /></body></html>;
}
