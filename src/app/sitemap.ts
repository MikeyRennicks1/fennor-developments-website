import type { MetadataRoute } from 'next';
import { allPages } from '@/config/page-map';
import { site } from '@/config/site';
import { legalPagePaths } from '@/config/launch';
// Canonical production URLs only. Preview indexing remains blocked by the launch gate.
export default function sitemap(): MetadataRoute.Sitemap {
  return [...allPages.map(page => page.path), ...legalPagePaths]
    .map(path => ({ url: `${site.url}${path === '/' ? '' : path}` }));
}
