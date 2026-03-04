"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeInSection } from "@/components/ui/FadeInSection";
import type { CaseStudy } from "@/types/case-study";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
  /** Optional base path for links e.g. "/case-studies" -> /case-studies/solar-navan-estate */
  basePath?: string;
};

const SERVICE_CATEGORY_STYLES: Record<CaseStudy["serviceCategory"], string> = {
  solar: "bg-solar-orange/10 text-solar-orange-dark border-solar-orange/30",
  electrical: "bg-accent/10 text-accent border-accent/30",
  building: "bg-graphite/10 text-graphite border-graphite/30",
};

/** Truncate description to a rough word count. */
function excerpt(text: string, maxWords = 25): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

export function CaseStudyCard({ caseStudy, basePath = "" }: CaseStudyCardProps) {
  const { slug, projectTitle, location, serviceProvided, serviceCategory, projectDescription, images, cta } = caseStudy;
  const href = basePath ? `${basePath}/${slug}` : `#${slug}`;
  const firstImage = images[0];

  return (
    <FadeInSection>
      <Link
        href={href}
        className="group block rounded-xl border border-gray-200/80 bg-white shadow-sm overflow-hidden hover:shadow-md hover:border-accent/30 transition-all duration-300"
      >
        <div className="aspect-[4/3] relative bg-gray-100">
          {firstImage ? (
            <Image
              src={firstImage.src}
              alt={firstImage.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}
          <span
            className={`absolute top-3 left-3 inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium ${SERVICE_CATEGORY_STYLES[serviceCategory]}`}
          >
            {serviceProvided}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-medium text-slate group-hover:text-accent transition-colors">
            {projectTitle}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{location}</p>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-3">
            {excerpt(projectDescription)}
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-medium text-accent group-hover:text-accent-light transition-colors">
            {cta.label}
            <span className="ml-1" aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </FadeInSection>
  );
}
