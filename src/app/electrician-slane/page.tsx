import type { Metadata } from 'next';
import LocalSeoLanding from '@/components/LocalSeoLanding';
import { localSeoPages } from '@/config/local-seo-pages';

const page = localSeoPages['/electrician-slane'];
export const metadata: Metadata = {
  title: page.title, description: page.description, alternates: { canonical: `https://fennor.ie${page.path}` },
  openGraph: { title: page.title, description: page.description, url: `https://fennor.ie${page.path}`, type: 'website', locale: 'en_IE', siteName: 'Fennor Developments', images: [{ url: `https://fennor.ie/images/${page.image}`, alt: page.imageAlt }] },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [`https://fennor.ie/images/${page.image}`] },
};
export default function Page() { return <LocalSeoLanding page={page} />; }
