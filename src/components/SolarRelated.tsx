import { solarLinks } from '@/config/solar-pages';
export default function SolarRelated({ current }: { current: string }) {
  return <nav className="solar-related" aria-label="Explore solar pages"><p className="eyebrow">KEEP EXPLORING</p><div>{solarLinks.filter(item => item.slug !== current).map(item => <a key={item.slug} href={`/solar/${item.slug}`}>{item.label}<span aria-hidden="true">↗</span></a>)}</div></nav>;
}
