import Link from "next/link";
import Image from "next/image";
import { company } from "@/config/company";
import { HOME_HERO } from "@/config/images";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { IconSolar, IconLightning, IconHome } from "@/components/ui/ServiceIcons";

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
          <h1 className="hero-headline text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] leading-none">
            Solar Panels Meath, Louth & Dublin
          </h1>
          <p className="mt-4 text-lg text-[#f2f2f0]/85 max-w-xl mx-auto">
            Solar PV installers Ireland — purpose-built energy for your home.
          </p>
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

      {/* Our Services – cards + trust strip */}
      <FadeInSection>
        <section className="py-16 sm:py-20 bg-[#f7f7f7]" aria-labelledby="our-services-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <header className="text-center mb-12 sm:mb-14">
              <h2 id="our-services-heading" className="text-3xl sm:text-4xl font-semibold text-slate">
                Solar Installation Meath, Louth & Dublin
              </h2>
              <p className="mt-3 text-slate/80 text-lg max-w-2xl mx-auto">
                Solar PV installers Ireland: integrated solar, electrical and construction across Meath, Louth and North Dublin.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  href: "/solar",
                  title: "Solar PV",
                  description:
                    "Design and installation of high-efficiency solar systems for Irish homes and businesses. Reduce energy costs and gain energy independence.",
                  Icon: IconSolar,
                },
                {
                  href: "/electrical",
                  title: "Electrical",
                  description:
                    "Professional electrical services including installations, upgrades, testing and fault diagnostics for residential and commercial properties.",
                  Icon: IconLightning,
                },
                {
                  href: "/building-renovations",
                  title: "Building & Renovations",
                  description:
                    "Energy-efficient construction and renovations including extensions and full property upgrades.",
                  Icon: IconHome,
                },
              ].map((item, i) => (
                <FadeInSection key={item.href} delay={i * 80}>
                  <Link
                    href={item.href}
                    className="group block h-full rounded-xl border border-gray-200 bg-white p-6 sm:p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-solar-orange-light transition-all duration-300"
                  >
                    <span className="inline-flex [&>svg]:text-solar-orange-light" aria-hidden>
                      <item.Icon />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-slate">{item.title}</h3>
                    <p className="mt-2 text-slate/80 text-sm leading-relaxed">{item.description}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-solar-orange-light group-hover:text-solar-orange-dark transition-colors">
                      Learn More →
                    </span>
                  </Link>
                </FadeInSection>
              ))}
            </div>

            {/* Trust strip */}
            <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-200/80">
              <div className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-14 gap-y-3 text-center text-sm text-slate/90">
                <span>20+ Years Experience</span>
                <span>100+ Solar Installs</span>
                <span>SEAI Registered</span>
                <span>Fully Insured</span>
              </div>
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
