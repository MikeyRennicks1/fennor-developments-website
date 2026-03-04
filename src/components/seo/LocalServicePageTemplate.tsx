"use client";

/**
 * Reusable SEO page template for local service landing pages.
 * Ensures each page has: meta title (≤60 chars), meta description (≤155 chars),
 * H1, intro, benefits, experience, process, local relevance, 4 FAQs, and CTA.
 * Includes internal links (solar, electrical, building, contact) and outputs
 * FAQ + LocalBusiness structured data. Target content length: 800–1000 words.
 */
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import type { LocalServicePageContent } from "@/types/local-service-page";

const DEFAULT_LINK_ANCHORS = {
  solar: "solar panel installation",
  electrical: "electrical services",
  building: "building and renovation services",
  contact: "contact us",
} as const;

type LocalServicePageTemplateProps = {
  content: LocalServicePageContent;
  /** Hero image URL */
  heroImageSrc: string;
  /** Hero image alt text */
  heroImageAlt: string;
  /** Optional object-position for hero image e.g. "center 35%" */
  heroObjectPosition?: string;
  /** Optional: focus area for LocalBusiness schema e.g. "Navan" */
  focusArea?: string;
  /** Optional custom anchor text for internal links */
  linkAnchors?: Partial<Record<keyof typeof DEFAULT_LINK_ANCHORS, string>>;
};

export function LocalServicePageTemplate({
  content,
  heroImageSrc,
  heroImageAlt,
  heroObjectPosition = "center center",
  focusArea,
  linkAnchors = {},
}: LocalServicePageTemplateProps) {
  const anchors = { ...DEFAULT_LINK_ANCHORS, ...linkAnchors };

  return (
    <>
      <FaqJsonLd faq={content.faq} />
      <LocalBusinessJsonLd focusArea={focusArea} />

      <PageHero
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
        headline={content.h1}
        objectPosition={heroObjectPosition}
        subline={content.subline}
      />

      <article className="py-16 sm:py-20 bg-off-white bg-texture-fine-lines">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-slate text-base leading-relaxed [&_p]:mt-4 [&_p]:text-gray-600 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-slate [&_a]:text-accent [&_a]:hover:text-accent-light">

          {/* 4. Introduction paragraph */}
          <FadeInSection>
            <p className="text-lg text-slate/95">{content.introParagraph}</p>
          </FadeInSection>

          {/* 5. Benefits section */}
          <FadeInSection delay={50}>
            <h2 id="benefits" className="scroll-mt-6">{content.benefitsSection.title}</h2>
            <div className="prose prose-slate max-w-none">
              <p>{content.benefitsSection.content}</p>
            </div>
          </FadeInSection>

          {/* 6. Experience section */}
          <FadeInSection delay={100}>
            <h2 id="experience" className="scroll-mt-6">{content.experienceSection.title}</h2>
            <div className="prose prose-slate max-w-none">
              <p>{content.experienceSection.content}</p>
            </div>
          </FadeInSection>

          {/* 7. Process section */}
          <FadeInSection delay={100}>
            <h2 id="process" className="scroll-mt-6">{content.processSection.title}</h2>
            <div className="prose prose-slate max-w-none">
              <p>{content.processSection.content}</p>
            </div>
          </FadeInSection>

          {/* 8. Local relevance paragraph */}
          <FadeInSection delay={150}>
            <p>{content.localRelevanceParagraph}</p>
          </FadeInSection>

          {/* Internal links */}
          <FadeInSection delay={150}>
            <p className="mt-8 text-center text-gray-600 text-sm">
              We offer <Link href="/solar">{anchors.solar}</Link>, <Link href="/electrical">{anchors.electrical}</Link> and <Link href="/building-renovations">{anchors.building}</Link>. <Link href="/contact">{anchors.contact}</Link> for a free quote or to discuss your project.
            </p>
          </FadeInSection>
        </div>
      </article>

      {/* 9. FAQ section */}
      <FadeInSection delay={100}>
        <section className="py-16 sm:py-20 bg-white border-t border-gray-200/80" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-light text-slate tracking-wide text-center mb-12">
              Frequently asked questions
            </h2>
            <ul className="space-y-6">
              {content.faq.map(({ question, answer }) => (
                <li key={question}>
                  <details className="group rounded-xl border border-gray-200/80 bg-off-white/50 shadow-sm overflow-hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 text-left font-medium text-slate hover:bg-gray-50/80 transition-colors [&::-webkit-details-marker]:hidden">
                      <span>{question}</span>
                      <span className="text-accent transition-transform group-open:rotate-180" aria-hidden>▼</span>
                    </summary>
                    <div className="border-t border-gray-100 px-5 py-4 text-gray-600 text-sm leading-relaxed">
                      {answer}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeInSection>

      {/* 10. Call-to-action */}
      <FadeInSection>
        <section className="py-20 sm:py-28 bg-slate text-white bg-texture-diagonal relative overflow-hidden">
          <div className="absolute inset-0 bg-texture-grid-light pointer-events-none" aria-hidden />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide">{content.cta.heading}</h2>
            <p className="mt-3 text-white/85 text-sm leading-relaxed">{content.cta.body}</p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/25 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                {content.cta.buttonText}
              </Link>
            </div>
            <p className="mt-6 text-white/70 text-xs">
              Or view our <Link href="/solar" className="text-white/90 underline hover:text-white">solar</Link>, <Link href="/electrical" className="text-white/90 underline hover:text-white">electrical</Link> and <Link href="/building-renovations" className="text-white/90 underline hover:text-white">building</Link> pages.
            </p>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
