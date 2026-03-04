/**
 * Content shape for reusable local service landing pages.
 * Target content length: 800–1000 words across intro, benefits, experience, process, local.
 * SEO: meta title ≤60 chars, meta description ≤155 chars.
 */

export type LocalServiceFaqItem = { question: string; answer: string };

export type LocalServicePageContent = {
  /** SEO meta title – keep to 60 characters or fewer */
  metaTitle: string;
  /** Meta description – keep to 155 characters or fewer */
  metaDescription: string;
  /** H1 / hero headline e.g. "Solar Panels Navan" */
  h1: string;
  /** Optional subline under the hero */
  subline?: string;
  /** Introduction paragraph about the service in the town */
  introParagraph: string;
  /** Section: benefits of the service – title + body (or list) */
  benefitsSection: {
    title: string;
    content: string;
  };
  /** Section: Fennor Developments experience and installs */
  experienceSection: {
    title: string;
    content: string;
  };
  /** Section: installation/build process */
  processSection: {
    title: string;
    content: string;
  };
  /** Local relevance paragraph (town and surrounding areas) */
  localRelevanceParagraph: string;
  /** Exactly 4 FAQ items (for schema and on-page) */
  faq: [LocalServiceFaqItem, LocalServiceFaqItem, LocalServiceFaqItem, LocalServiceFaqItem];
  /** Call-to-action */
  cta: {
    heading: string;
    body: string;
    buttonText: string;
  };
};

/** Truncate to max length for SEO. */
export function truncateMetaTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  return title.slice(0, max - 1).trim().replace(/\s+\S*$/, "") || title.slice(0, max);
}

export function truncateMetaDescription(desc: string, max = 155): string {
  if (desc.length <= max) return desc;
  return desc.slice(0, max - 1).trim().replace(/\s+\S*$/, "") || desc.slice(0, max);
}

/** Build Next.js metadata from LocalServicePageContent (title ≤60, description ≤155). */
export function buildLocalServiceMetadata(content: LocalServicePageContent): {
  title: string;
  description: string;
} {
  return {
    title: truncateMetaTitle(content.metaTitle),
    description: truncateMetaDescription(content.metaDescription),
  };
}
