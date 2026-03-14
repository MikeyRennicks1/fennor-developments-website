import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { getCaseStudyBySlug, getCaseStudies } from "@/config/case-studies";
import { SOLAR_HERO } from "@/config/images";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const studies = getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return { title: "Case study not found" };
  const { truncateMetaTitle, truncateMetaDescription } = await import("@/lib/seo");
  return {
    title: truncateMetaTitle(`${caseStudy.projectTitle} | Case Study | Fennor`),
    description: truncateMetaDescription(caseStudy.projectDescription),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  return (
    <>
      <PageHero
        imageSrc={caseStudy.images[0]?.src ?? SOLAR_HERO}
        imageAlt={caseStudy.images[0]?.alt ?? "Project – Fennor Developments"}
        headline={caseStudy.projectTitle}
        subline={`${caseStudy.location} · ${caseStudy.serviceProvided}`}
      />
      <CaseStudyTemplate caseStudy={caseStudy} variant="page" />
      <section className="py-8 border-t border-gray-200/80 bg-off-white/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/case-studies"
            className="text-sm text-gray-600 hover:text-accent transition-colors"
          >
            ← All case studies
          </Link>
        </div>
      </section>
    </>
  );
}
