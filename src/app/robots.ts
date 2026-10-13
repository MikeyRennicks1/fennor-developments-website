import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { getLaunchSettings } from '@/config/launch';
export default function robots(): MetadataRoute.Robots {
  return { rules: getLaunchSettings().robotsRule, sitemap: `${site.url}/sitemap.xml` };
}
