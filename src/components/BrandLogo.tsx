'use client';

import Image from 'next/image';
import {usePathname} from 'next/navigation';

/** Keep the original energy identity distinct from the construction services. */
export default function BrandLogo({loading='lazy'}:{loading?:'eager'|'lazy'}) {
  const path=usePathname();
  const construction=/^\/(renovations|retrofitting|building)(\/|$)/.test(path);
  return <Image
    src={construction?'/images/logo.webp':'/images/logo-orange.webp'}
    data-brand-tone={construction?'charcoal':'navy'}
    alt="Fennor Developments Ltd"
    width={191}
    height={88}
    loading={loading}
  />;
}
