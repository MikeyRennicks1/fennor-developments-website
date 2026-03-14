import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { getCaseStudies } from "@/config/case-studies";
import { SOLAR_HERO } from "@/config/images";

export const metadata: Metadata = {
  title: "Case Studies | Solar, Electrical & Building | Fennor",
  description:
    "Project case studies: solar PV installations, electrical rewires and new builds across Meath, Louth and Ireland.",
};

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <>
      <PageHero
        imageSrc={SOLAR_HERO}
        imageAlt="Fennor Developments – project case studies"
        headline="Case studies"
        subline="Solar, electrical and building projects – real results."
      />
      <section className="py-16 sm:py-20 bg-off-white bg-texture-fine-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} caseStudy={study} basePath="/case-studies" />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="text-sm text-gray-600 hover:text-accent transition-colors"
            >
              View full gallery →
            </Link>
            <span className="mx-3 text-gray-300">|</span>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-slate px-6 py-3.5 text-sm font-medium text-white hover:bg-slate/90 transition-colors"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
