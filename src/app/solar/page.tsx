import type { Metadata } from "next";
import Link from "next/link";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { PageHero } from "@/components/ui/PageHero";
import { SolarFaqJsonLd } from "@/components/seo/SolarFaqJsonLd";
import { IconSolar, IconBattery, IconChart, IconDocument } from "@/components/ui/ServiceIcons";
import { SOLAR_READING_LINKS } from "@/config/solar-reading-links";
import { getSolarLocationsByCounty } from "@/config/solar-locations-full";

/** Rural solar farm, 4K photorealistic – matches reference (solar panels in landscape) */
const SOLAR_HERO_URL =
  "https://images.pexels.com/photos/9893729/pexels-photo-9893729.jpeg?auto=compress&cs=tinysrgb&w=3840&q=92";

export const metadata: Metadata = {
  title: "Solar Panels Meath | Solar PV Installers Ireland | Solar Installation Meath, Louth & Dublin | Fennor",
  description:
    "Solar panel installation Ireland: Meath, Louth & North Dublin. SEAI registered solar PV installers. Hybrid inverters, battery storage. Free assessment & quote.",
};

export default function SolarPage() {
  return (
    <>
      <SolarFaqJsonLd />
      <PageHero
        imageSrc={SOLAR_HERO_URL}
        imageAlt="Solar PV installation Meath – Fennor Developments, solar panels Ireland"
        headline="Solar PV Installers Ireland"
        objectPosition="center 35%"
      />

      <section className="py-5 bg-gradient-gold-band border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-3 text-center sm:text-left text-sm text-slate">
          <span className="font-medium uppercase tracking-wider text-gold">SEAI Registered</span>
          <span className="text-slate/90">We assist you through the SEAI application process — up to €1,800 where eligible.</span>
        </div>
      </section>

      <FadeInSection>
        <section className="py-20 sm:py-28 bg-off-white bg-texture-energy-wave relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-solar-orange/20 to-transparent" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-solar-orange/15 to-transparent" />
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-solar-orange/20 to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide text-center mb-3">Solar installation Meath, Louth & Dublin</h2>
            <p className="text-center text-gray-600 max-w-lg mx-auto mb-14 text-sm">
              From assessment to generation: a simple, transparent process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Assessment & quote", desc: "We review your roof, usage and goals. Clear quote with system size, add-ons and grant estimate." },
                { step: "02", title: "Installation", desc: "Panels, inverter and optional battery. Clean, compliant work with minimal disruption." },
                { step: "03", title: "Monitor & save", desc: "Track production and savings. Long-term support and warranty." },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-gray-200/80 bg-white p-8 shadow-card hover:shadow-card-hover hover:border-gold/50 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-solar-orange/5 via-transparent to-transparent pointer-events-none" aria-hidden />
                  <div className="relative z-10">
                    <span className="text-2xl font-light text-solar-orange/40 tracking-tight">{item.step}</span>
                    <h3 className="mt-3 text-lg font-medium text-slate">{item.title}</h3>
                    <p className="mt-2 text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide">Cut bills. Reduce carbon.</h2>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  Solar PV reduces reliance on the grid and lowers electricity bills while producing clean energy for decades. Use our <Link href="/calculator" className="text-accent hover:text-accent-light font-medium">calculator</Link> to estimate potential savings based on your home and usage.
                </p>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  Most systems generate electricity for <strong>20+ years</strong>, helping households across <strong>Meath, Dublin and the North East</strong> reduce long-term energy costs.
                </p>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  As experienced electrical and building contractors, we can also support projects that require <strong>solar-ready rewiring, EV charger installation, or integration with wider home renovations</strong>, ensuring your system works seamlessly with the rest of your property.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    { label: "Typical payback", value: "3–8 years" },
                    { label: "System life", value: "25+ years" },
                    { label: "SEAI grant", value: "Up to €1,800" },
                    { label: "Warranty", value: "Long-term" },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl border border-gray-200/80 bg-off-white/50 p-4 shadow-sm">
                      <p className="text-accent font-medium text-sm">{value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/calculator"
                  className="mt-8 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
                >
                  Calculate your savings
                </Link>
              </div>
              <div className="rounded-xl bg-graphite p-8 text-center">
                <h3 className="text-xl font-semibold text-white tracking-wide">See Our Solar Work</h3>
                <p className="mt-2 text-sm text-white/70">
                  View real installations and read customer stories from across Meath and the North East.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/solar-gallery"
                    className="inline-flex items-center justify-center rounded-xl bg-solar-orange px-6 py-3.5 text-sm font-medium text-white hover:bg-solar-orange-light transition-colors duration-200"
                  >
                    View Solar Installations
                  </Link>
                  <Link
                    href="/solar-case-studies"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-solar-orange px-6 py-3.5 text-sm font-medium text-white hover:bg-solar-orange/20 transition-colors duration-200"
                  >
                    Read Solar Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="py-20 sm:py-28 bg-off-white-alt bg-texture-fine-lines">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide text-center mb-3">What we install</h2>
            <p className="text-center text-gray-600 max-w-xl mx-auto mb-14 text-sm">
              System sizes from 8 to 18 panels; larger and commercial enquiries welcome.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: IconSolar, title: "Hybrid inverters", desc: "Maximise self-consumption and battery compatibility." },
                { icon: IconBattery, title: "Battery options", desc: "Store surplus solar for use at night." },
                { icon: IconChart, title: "Monitoring", desc: "Clear reporting on production and savings." },
                { icon: IconDocument, title: "SEAI grants", desc: "We assist you through the SEAI application process where eligible." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-card hover:shadow-card-hover hover:border-gold/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon />
                  <h3 className="mt-3 font-medium text-slate">{title}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>

            {SOLAR_READING_LINKS.length > 0 && (
              <div className="mt-14 pt-12 border-t border-gray-200/80">
                <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-500 mb-6">
                  Learn more about solar
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SOLAR_READING_LINKS.map((item) => (
                    <a
                      key={item.url + item.title}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm hover:shadow-md hover:border-gold/40 transition-all duration-200 text-left"
                    >
                      <span className="font-medium text-slate text-sm group-hover:text-solar-orange-light transition-colors">
                        {item.title}
                      </span>
                      <span className="mt-1 text-xs text-gray-500 line-clamp-2">{item.description}</span>
                      {item.siteName && (
                        <span className="mt-2 text-xs text-gray-400">
                          {item.siteName}
                          <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                            →
                          </span>
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <h2 id="installation-areas" className="mt-16 text-2xl sm:text-3xl font-light text-slate tracking-wide text-center">
              Solar Panel Installation Areas
            </h2>
            <p className="mt-4 text-center text-sm text-gray-600 max-w-xl mx-auto">
              We install solar panels across Meath, Louth and North Dublin. Select your area for local information, grants and quotes.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {getSolarLocationsByCounty().map(({ countyLabel, towns }) => (
                <div key={countyLabel}>
                  <h3 className="text-lg font-medium text-slate mb-3">{countyLabel}</h3>
                  <ul className="flex flex-wrap gap-x-2 gap-y-1.5 text-sm">
                    {towns.map((loc) => (
                      <li key={loc.slug}>
                        <Link href={`/solar-panels-${loc.slug}`} className="text-gray-600 hover:text-accent font-medium">
                          Solar Panels {loc.name}
                        </Link>
                        {towns.indexOf(loc) < towns.length - 1 && <span className="text-gray-300" aria-hidden>·</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200/80 text-center">
              <p className="text-sm text-gray-600 mb-2">We also serve</p>
              <p className="flex flex-wrap justify-center gap-x-2 gap-y-1">
                <Link href="/solar-panels-virginia" className="text-sm font-medium text-slate hover:text-accent">Solar Panels Virginia</Link>
                <span className="text-gray-300">·</span>
                <Link href="/solar-panels-mullingar" className="text-sm font-medium text-slate hover:text-accent">Solar Panels Mullingar</Link>
                <span className="text-gray-300">·</span>
                <Link href="/locations" className="text-sm font-medium text-slate hover:text-accent">All locations</Link>
              </p>
            </div>
            <div className="mt-6 text-center">
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

      <FadeInSection>
        <section className="solar-cta">
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Ready for solar?</h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Thinking about installing solar panels for your home? Our team provides professional solar PV installation across <strong className="text-white">Meath, Dublin and the North East</strong>, helping homeowners reduce electricity bills and generate clean energy for decades.
            </p>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              You can start by estimating your potential savings using our <Link href="/calculator" className="text-white/90 underline hover:text-white">solar calculator</Link>, or contact us directly to arrange a <Link href="/contact" className="text-white/90 underline hover:text-white">free roof assessment and quotation</Link>. In addition to solar PV systems, we also provide <strong className="text-white">EV charger installation, electrical services, and building renovations</strong>, allowing us to support wider home energy upgrades when required.
            </p>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Explore our recent <Link href="/solar-gallery" className="text-white/90 underline hover:text-white">solar installations</Link> and <Link href="/solar-case-studies" className="text-white/90 underline hover:text-white">customer case studies</Link>, or get in touch today to discuss the right solar system for your home.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-primary">
                Get a Quote
              </Link>
              <Link href="/calculator" className="cta-secondary">
                Solar Calculator
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
