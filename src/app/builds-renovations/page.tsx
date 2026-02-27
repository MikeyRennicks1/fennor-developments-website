import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { PageHero } from "@/components/ui/PageHero";
import { IconHome } from "@/components/ui/ServiceIcons";
import {
  BUILDS_HERO,
  BUILDS_SECTION_BUILD,
  BUILDS_SECTION_HOME_EXT,
} from "@/config/images";

export const metadata: Metadata = {
  title: "Full one-off builds and renovations | Fennor Developments | Meath",
  description:
    "Serious about building or renovating? Full one-off builds and renovations in Meath and Ireland. Plot to handover, energy-efficient. Enquire for serious homeowners.",
};

export default function BuildsRenovationsPage() {
  return (
    <>
      <PageHero
        imageSrc={BUILDS_HERO}
        imageAlt="Build & renovation – Fennor Developments, Meath"
        headline="Builds & Renovations"
        objectPosition="center 40%"
      />

      <FadeInSection>
        <section className="py-20 sm:py-28 bg-off-white bg-texture-fine-lines">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100">
                <Image
                  src={BUILDS_SECTION_BUILD}
                  alt="Construction – Fennor Developments, Meath"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide">Why Fennor for your build or renovation</h2>
                <ul className="mt-6 space-y-4">
                  {[
                    "Turnkey from plot to handover – one point of contact",
                    "Energy-efficient construction and integration with solar & electrical",
                    "Structured project management and clear documentation",
                    "20+ years in construction across Meath and Ireland",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="text-accent mt-0.5 shrink-0">0{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-10 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 order-2 lg:order-1">
                <Image
                  src={BUILDS_SECTION_HOME_EXT}
                  alt="Modern home – Fennor Developments"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 text-accent mb-4">
                  <IconHome />
                  <span className="text-sm font-medium">Plot to handover</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide">Serious about building</h2>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  We work with homeowners ready to invest in a quality build or major renovation. Enquiries are taken seriously and followed up with a clear, no-nonsense process.
                </p>
                <Link
                  href="/contact?enquiry=build"
                  className="mt-8 inline-flex items-center justify-center rounded-xl bg-graphite px-6 py-3.5 text-sm font-medium text-white hover:bg-slate transition-colors"
                >
                  Enquire about your build
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
