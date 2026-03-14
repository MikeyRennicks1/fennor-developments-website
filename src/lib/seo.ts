/**
 * SEO helpers: enforce title ≤60 chars, description ≤155 chars for all pages.
 */

export function truncateMetaTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  return title.slice(0, max - 1).trim().replace(/\s+\S*$/, "") || title.slice(0, max);
}

export function truncateMetaDescription(desc: string, max = 155): string {
  if (desc.length <= max) return desc;
  return desc.slice(0, max - 1).trim().replace(/\s+\S*$/, "") || desc.slice(0, max);
}
