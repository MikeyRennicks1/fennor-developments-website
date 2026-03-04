import type { Metadata } from "next";
import Link from "next/link";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { PageHero } from "@/components/ui/PageHero";
import { IconSolar, IconBattery, IconChart, IconDocument } from "@/components/ui/ServiceIcons";

/** Rural solar farm, 4K photorealistic – matches reference (solar panels in landscape) */
const SOLAR_HERO_URL =
  "https://images.pexels.com/photos/9893729/pexels-photo-9893729.jpeg?auto=compress&cs=tinysrgb&w=3840&q=92";

export const metadata: Metadata = {
  title: "Solar PV Installation | Solar Meath, Dublin & Ireland | Fennor Developments",
  description:
    "Solar PV installation in Meath and Ireland. Hybrid inverters, battery storage, monitoring. SEAI registered. Clean installs, long-term support. Get a quote.",
};

export default function SolarPage() {
  return (
    <>
      <PageHero
        imageSrc={SOLAR_HERO_URL}
        imageAlt="Solar PV on slate roof – Fennor Developments, Meath"
        headline="Solar PV"
        objectPosition="center 35%"
      />

      <section className="py-5 bg-gradient-gold-band border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-3 text-center sm:text-left text-sm text-slate">
          <span className="font-medium uppercase tracking-wider text-gold">SEAI Registered</span>
          <span className="text-slate/90">Grant applications where eligible — up to €1,800.</span>
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
            <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide text-center mb-3">How solar works</h2>
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
                  Solar PV reduces grid reliance and lowers electricity bills. Use our calculator to estimate savings. 20+ years of generation.
                </p>
                <p className="mt-4 text-sm text-gray-500">Typical payback: 3–8 years depending on usage and system size.</p>
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
              <div>
                <Link
                  href="/gallery"
                  className="group block rounded-xl border border-gray-200 bg-white p-8 shadow-card hover:shadow-card-hover hover:border-solar-orange-light hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <h3 className="text-xl font-semibold text-slate group-hover:text-solar-orange-light transition-colors">
                    Our gallery
                  </h3>
                  <p className="mt-2 text-sm text-slate/70">
                    View all our photos — solar, inverters, batteries and builds.
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-solar-orange-light group-hover:text-solar-orange-dark">
                    View gallery →
                  </span>
                </Link>
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
                { icon: IconDocument, title: "SEAI grants", desc: "We handle grant applications where eligible." },
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
            <div className="mt-10 text-center">
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
        <section className="py-20 sm:py-28 bg-slate text-white bg-texture-diagonal relative overflow-hidden">
          <div className="absolute inset-0 bg-texture-grid-light pointer-events-none" aria-hidden />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-solar-orange/50 to-transparent" aria-hidden />
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Ready for solar?</h2>
            <p className="mt-3 text-white/75 text-sm">Get a quote or run your numbers with our calculator.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/25 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center rounded-xl border border-white/50 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Solar Calculator
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
