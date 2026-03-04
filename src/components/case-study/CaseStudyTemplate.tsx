"use client";

/**
 * Reusable project case study template for solar installations, electrical projects
 * and residential builds. Sections: project title, location, service provided,
 * project description, system installed or work completed, estimated savings or outcome,
 * customer testimonial, images, call to action.
 */
import Link from "next/link";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { GalleryWithLightbox } from "@/components/gallery/GalleryWithLightbox";
import type { CaseStudy } from "@/types/case-study";
import type { GalleryItem } from "@/config/gallery";

type CaseStudyTemplateProps = {
  caseStudy: CaseStudy;
  /** If true, render as full page (h1, more spacing). If false, suitable for embedding. */
  variant?: "page" | "embedded";
};

function caseStudyImagesToGalleryItems(images: CaseStudy["images"]): GalleryItem[] {
  return images.map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption ?? img.alt,
  }));
}

const SERVICE_CATEGORY_STYLES: Record<CaseStudy["serviceCategory"], string> = {
  solar: "bg-solar-orange/10 text-solar-orange-dark border-solar-orange/30",
  electrical: "bg-accent/10 text-accent border-accent/30",
  building: "bg-graphite/10 text-graphite border-graphite/30",
};

export function CaseStudyTemplate({ caseStudy, variant = "page" }: CaseStudyTemplateProps) {
  const {
    projectTitle,
    location,
    serviceProvided,
    serviceCategory,
    projectDescription,
    systemInstalled,
    systemSectionTitle,
    estimatedSavings,
    outcomeSectionTitle,
    testimonial,
    images,
    cta,
    date,
  } = caseStudy;

  const systemLabel = systemSectionTitle ?? "System installed or work completed";
  const outcomeLabel = outcomeSectionTitle ?? "Estimated savings or outcome";

  const galleryItems = caseStudyImagesToGalleryItems(images);
  const TitleTag = variant === "page" ? "h1" : "h2";

  return (
    <article className="py-12 sm:py-16" aria-labelledby="case-study-title">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project title */}
        <FadeInSection>
          <header className="mb-8">
            {date && (
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">{date}</p>
            )}
            <TitleTag
              id="case-study-title"
              className="text-2xl sm:text-3xl font-light text-slate tracking-wide"
            >
              {projectTitle}
            </TitleTag>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-gray-600 text-sm">{location}</span>
              <span className="text-gray-300" aria-hidden>·</span>
              <span
                className={`inline-flex items-center rounded-lg border px-3 py-1 text-xs font-medium ${SERVICE_CATEGORY_STYLES[serviceCategory]}`}
              >
                {serviceProvided}
              </span>
            </div>
          </header>
        </FadeInSection>

        {/* Project description */}
        <FadeInSection delay={50}>
          <div className="prose prose-slate max-w-none">
            <p className="text-gray-600 leading-relaxed">{projectDescription}</p>
          </div>
        </FadeInSection>

        {/* System installed or work completed (optional) */}
        {systemInstalled && (
          <FadeInSection delay={100}>
            <div className="mt-8 rounded-xl border border-gray-200/80 bg-off-white/50 p-5">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
                {systemLabel}
              </h3>
              <p className="text-slate text-sm leading-relaxed">{systemInstalled}</p>
            </div>
          </FadeInSection>
        )}

        {/* Estimated savings or outcome (optional) */}
        {estimatedSavings && (
          <FadeInSection delay={100}>
            <div className="mt-4 rounded-xl border border-gray-200/80 bg-off-white/50 p-5">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
                {outcomeLabel}
              </h3>
              <p className="text-slate text-sm leading-relaxed">{estimatedSavings}</p>
            </div>
          </FadeInSection>
        )}

        {/* Customer testimonial (optional) */}
        {testimonial && (
          <FadeInSection delay={150}>
            <blockquote className="mt-8 border-l-4 border-accent pl-6 py-2">
              <p className="text-gray-600 italic leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              {(testimonial.author || testimonial.roleOrLocation) && (
                <footer className="mt-3 text-sm text-gray-500 not-italic">
                  — {[testimonial.author, testimonial.roleOrLocation].filter(Boolean).join(", ")}
                </footer>
              )}
            </blockquote>
          </FadeInSection>
        )}

        {/* Images */}
        {images.length > 0 && (
          <FadeInSection delay={150}>
            <div className="mt-10">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4">
                Project photos
              </h3>
              <GalleryWithLightbox images={galleryItems} />
            </div>
          </FadeInSection>
        )}

        {/* Call to action */}
        <FadeInSection delay={200}>
          <div className="mt-10 pt-8 border-t border-gray-200/80">
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
            >
              {cta.label}
            </Link>
          </div>
        </FadeInSection>
      </div>
    </article>
  );
}
