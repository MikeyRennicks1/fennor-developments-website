import Link from "next/link";
import Image from "next/image";
import { company } from "@/config/company";
import { HOME_HERO } from "@/config/images";
import { FadeInSection } from "@/components/ui/FadeInSection";

const TEL_HREF = `tel:${company.phone.replace(/\s/g, "")}`;

export default function Home() {
  return (
    <>
      {/* Hero – image + dark overlay so text stays readable; navy + gold gradient. */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-graphite">
        <div className="absolute inset-0 z-0">
          <Image
            src={HOME_HERO}
            alt="Irish home with solar panels on roof – Fennor Developments, Meath"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-hero-overlay" aria-hidden />
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-64 h-px bg-gradient-to-l from-gold/30 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-48 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 flex flex-col items-center justify-center text-center">
          <h1 className="hero-headline text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] leading-none whitespace-nowrap">
            Purpose-Built Energy
          </h1>
          <div
            className="mt-8 w-24 border-t border-[#f2f2f0] opacity-30"
            aria-hidden
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-gold to-gold-light px-8 py-4 text-base font-semibold text-navy-dark shadow-lg hover:shadow-gold-glow hover:-translate-y-1 transition-all duration-300"
            >
              Get a Quote
            </Link>
            <a
              href={TEL_HREF}
              className="inline-flex items-center justify-center rounded-xl border-2 border-gold/60 bg-transparent px-8 py-4 text-base font-medium text-[#f2f2f0]/95 hover:bg-gold/10 hover:border-gold transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Services row – light section with gold tint; staggered scroll-in */}
      <FadeInSection>
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gold/5 border-b border-gold/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {[
                { href: "/solar", label: "Solar PV" },
                { href: "/electrical", label: "Electrical" },
                { href: "/builds-renovations", label: "Builds & Renovations" },
              ].map((item, i) => (
                <FadeInSection key={item.href} delay={i * 80}>
                  <Link
                    href={item.href}
                    className="block rounded-xl border border-transparent bg-white/80 px-6 py-4 text-slate font-semibold text-lg hover:border-gold/50 hover:bg-gold/5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Stats – trust bar with gold tint */}
      <section className="section-gold-accent" aria-hidden />
      <FadeInSection delay={80}>
        <section className="py-12 sm:py-14 bg-gradient-to-r from-gold/5 via-white to-gold/5 border-y border-gold/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-2 text-center text-sm text-slate">
              <span><strong className="text-gold">20+</strong> years</span>
              <span><strong className="text-gold">100+</strong> solar installs</span>
              <span><strong className="text-gold">SEAI</strong> registered</span>
              <span>Fully insured</span>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Single CTA – gold accent */}
      <section className="section-gold-accent" aria-hidden />
      <FadeInSection delay={160}>
        <section className="py-16 sm:py-20 bg-white border-t border-gold/10">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-slate font-medium">Mainly North & East Leinster — we cover all of Ireland.</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-gold to-gold-light px-8 py-3.5 text-base font-semibold text-navy-dark shadow-lg hover:shadow-gold-glow hover:-translate-y-1 transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
