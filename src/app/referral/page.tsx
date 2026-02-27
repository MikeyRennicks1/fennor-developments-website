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
              Refer solar and construction projects. Paid upon project completion. Transparent tracking and professional handover. Full details discussed on enquiry.
            </p>
            <Link
              href="/contact?enquiry=referral"
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
            >
              Enquire about the referral programme
            </Link>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
