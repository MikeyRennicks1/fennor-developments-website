import type { Metadata } from "next";
import Link from "next/link";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { PageHero } from "@/components/ui/PageHero";
import { ABOUT_HERO } from "@/config/images";

export const metadata: Metadata = {
  title: "About Fennor Developments | 20+ years | Slane, Co. Meath",
  description:
    "Fennor Developments: over 20 years in construction and renewable energy. Based in Slane, Co. Meath. Meath, Dublin, Louth.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        imageSrc={ABOUT_HERO}
        imageAlt="Boyne Valley – Slane, Co. Meath"
        headline="About Fennor Developments"
        objectPosition="center center"
        hairlineCeltic
      />

      <FadeInSection>
        <section className="py-20 sm:py-28 bg-white bg-texture-fine-lines">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-heading-celtic text-2xl sm:text-3xl font-light text-slate tracking-wide">Our story</h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              We are Fennor Developments—a construction and renewable energy company rooted in Slane, Co. Meath. Slane sits in the heart of the Boyne Valley, where landscape and community have shaped how we work.
            </p>
            <p className="mt-5 text-gray-600 text-sm leading-relaxed">
              For over 20 years we have delivered electrical and construction work, solar installations, and full one-off builds across Meath, Dublin, Louth and the surrounding counties. Clear communication, strong project control, and long-term support. SEAI registered and fully insured.
            </p>
            <p className="mt-5 text-gray-600 text-sm leading-relaxed">
              That is who we are—grounded in Slane, building and powering the future for our customers and our place.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-celtic-green px-6 py-3.5 text-sm font-medium text-white hover:bg-celtic-green-light transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </FadeInSection>

      {/* Our Location – map section */}
      <section className="py-16 sm:py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading-celtic text-2xl sm:text-3xl font-light text-slate tracking-wide mb-8">
            Our Location
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Fennor, Slane, Co. Meath, Ireland · Eircode C15 R5W6
          </p>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100 aspect-[16/10] min-h-[320px] sm:min-h-[400px]">
            <iframe
              title="Fennor Developments – Slane, Co. Meath"
              src="https://www.google.com/maps?q=Fennor,+Slane,+Co.+Meath,+Ireland+C15+R5W6&output=embed"
              className="w-full h-full min-h-[320px] sm:min-h-[400px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Fennor+Slane+Co+Meath+Ireland+C15+R5W6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-dark font-medium"
            >
              View larger map
            </a>
            {" · "}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Fennor+Slane+Co+Meath+Ireland+C15+R5W6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-dark font-medium"
            >
              Directions
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
