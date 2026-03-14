import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SOLAR_HERO } from "@/config/images";
import { company } from "@/config/company";
import { SOLAR_TESTIMONIALS } from "@/config/solar-testimonials";

const baseUrl = company.website || "https://fennordevelopments.ie";

export const metadata: Metadata = {
  title: "Solar Installation Case Studies | Fennor Developments Meath",
  description:
    "Read real customer experiences with solar PV installations from Fennor Developments across Meath and surrounding counties.",
  openGraph: {
    title: "Solar Installation Case Studies | Fennor Developments Meath",
    description:
      "Read real customer experiences with solar PV installations from Fennor Developments across Meath and surrounding counties.",
    url: `${baseUrl}/solar-case-studies`,
    siteName: "Fennor Developments",
  },
};

export default function SolarCaseStudiesPage() {
  return (
    <>
      <PageHero
        imageSrc={SOLAR_HERO}
        imageAlt="Solar installations – Fennor Developments"
        headline="Solar Installation Case Studies"
        subline="What our customers say about their solar PV installations."
      />
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-600 mb-10 max-w-2xl">
            A few of our recent solar customers – project details and testimonials from across Meath and the North East.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {SOLAR_TESTIMONIALS.map((t) => (
              <article key={t.name} className="rounded-xl overflow-hidden border border-slate-200 bg-[#fafafa]">
                <div className="relative aspect-[4/3] bg-slate-200">
                  <Image
                    src={t.imageSrc}
                    alt={t.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="font-medium text-graphite">{t.name}</p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {t.location} · {t.description}
                  </p>
                  <blockquote className="mt-4 text-slate-600 text-sm leading-relaxed border-l-2 border-accent pl-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
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
