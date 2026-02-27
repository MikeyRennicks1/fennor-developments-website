import type { Metadata } from "next";
import Link from "next/link";
import { SolarCalculatorClient } from "./SolarCalculatorClient";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { PageHero } from "@/components/ui/PageHero";
import { CALCULATOR_HERO } from "@/config/images";

export const metadata: Metadata = {
  title: "Solar Savings Calculator | Estimate Payback & Savings | Fennor Developments",
  description:
    "Solar savings calculator for Meath, Dublin and Louth. Estimate payback, 20-year savings and SEAI grant. Slane, Co. Meath.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        imageSrc={CALCULATOR_HERO}
        imageAlt="Solar savings calculator – Fennor Developments"
        headline="Solar Savings Calculator"
        objectPosition="center center"
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/25 px-6 py-3.5 text-sm font-medium text-[#f2f2f0] hover:bg-white/20 transition-colors"
        >
          Get a Quote
        </Link>
        <a
          href="#calculator-results"
          className="inline-flex items-center justify-center rounded-xl border border-white/50 px-6 py-3.5 text-sm font-medium text-[#f2f2f0] hover:bg-white/10 transition-colors"
        >
          Calculate below
        </a>
      </PageHero>

      <FadeInSection>
        <section className="py-20 sm:py-28 bg-off-white bg-texture-fine-lines">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="calculator-results" className="rounded-2xl border border-gray-200/80 bg-white bg-gold/5 p-8 sm:p-10 shadow-card hover:shadow-card-hover hover:border-gold/50 transition-all duration-300">
              <SolarCalculatorClient />
            </div>
            <p className="mt-8 text-center text-sm text-gray-600">
              Need a larger system or commercial quote?{" "}
              <Link href="/contact?enquiry=large" className="text-accent hover:text-accent-dark font-medium">
                Get a custom quote
              </Link>
            </p>
            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-graphite px-8 py-3.5 text-sm font-medium text-white hover:bg-slate transition-colors"
              >
                Book free roof assessment
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
