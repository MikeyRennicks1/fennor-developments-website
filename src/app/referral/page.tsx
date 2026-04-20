import type { Metadata } from "next";
import Link from "next/link";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { PageHero } from "@/components/ui/PageHero";
import { IconHandshake } from "@/components/ui/ServiceIcons";
import { REFERRAL_HERO } from "@/config/images";

export const metadata: Metadata = {
  title: "Referral programme | Fennor Developments | Builders, architects, agents",
  description:
    "Earn when you refer solar and construction projects. Builders, architects, estate agents. Reward discussed on enquiry. Meath, Dublin, Louth.",
};

export default function ReferralPage() {
  return (
    <>
      <PageHero
        imageSrc={REFERRAL_HERO}
        imageAlt="Partnership on site – Fennor Developments"
        headline="Referral programme"
        objectPosition="center center"
      />

      <FadeInSection>
        <section className="py-20 sm:py-28 bg-off-white bg-texture-fine-lines">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 text-accent mb-6">
              <IconHandshake />
              <span className="text-sm font-medium">For builders, architects & agents</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide">Simple referral system</h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Refer solar and construction projects. Get paid once completed. Simple, transparent, and built for long-term partnerships.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact?enquiry=referral"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-sm font-medium text-white hover:bg-accent-light transition-colors w-full sm:w-auto"
              >
                Enquire about the referral programme
              </Link>
              <a
                href="/api/referral-scheme-pdf"
                className="inline-flex items-center justify-center rounded-xl border-2 border-navy/15 bg-white px-8 py-3.5 text-sm font-medium text-slate hover:border-accent hover:text-accent transition-colors w-full sm:w-auto"
                download
              >
                Download programme overview (PDF)
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
