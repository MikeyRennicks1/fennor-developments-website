import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { PageHero } from "@/components/ui/PageHero";
import { IconLightning, IconHome, IconBuilding, IconDocument } from "@/components/ui/ServiceIcons";
import { ELECTRICAL_HERO, ELECTRICAL_SECTION_1, ELECTRICAL_SECTION_2 } from "@/config/images";

export const metadata: Metadata = {
  title: "Electrical Services | Domestic & Commercial | Meath & Ireland | Fennor Developments",
  description:
    "Domestic and commercial electrical services in Meath and Ireland. Rewires, smart home, compliant installations. Clean, organised, professional.",
};

export default function ElectricalPage() {
  return (
    <>
      <PageHero
        imageSrc={ELECTRICAL_HERO}
        imageAlt="Electrical installation – Fennor Developments, Meath"
        headline="Electrical Services"
        objectPosition="center center"
      />

      <FadeInSection>
        <section className="py-20 sm:py-28 bg-off-white bg-texture-fine-lines">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide text-center mb-3">What we offer</h2>
            <p className="text-center text-gray-600 max-w-lg mx-auto mb-14 text-sm">Full electrical services for home and business.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: IconHome, title: "Domestic installs", desc: "New builds, extensions, upgrades. Full house wiring, consumer units, certification." },
                { icon: IconLightning, title: "Rewires", desc: "Complete rewires for older properties. Safe, compliant, future-proof." },
                { icon: IconHome, title: "Smart home", desc: "Lighting control, heating controls, integrated systems." },
                { icon: IconBuilding, title: "Commercial electrical", desc: "Fit-outs, maintenance, compliance for commercial premises." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-200/80 bg-white p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon />
                  <h3 className="mt-4 font-medium text-slate text-lg">{title}</h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">{desc}</p>
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
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video bg-gray-100 order-2 lg:order-1">
                <Image
                  src={ELECTRICAL_SECTION_1}
                  alt="Professional electrician working on modern consumer unit – Fennor Developments"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide">Compliant & professional</h2>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  We work to current standards and provide clear documentation. Fully insured.
                </p>
                <div className="mt-6 flex items-center gap-3 text-accent">
                  <IconDocument />
                  <span className="text-sm font-medium">Clear documentation</span>
                </div>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="py-20 sm:py-28 bg-off-white-alt bg-texture-fine-lines">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100">
                <Image
                  src={ELECTRICAL_SECTION_2}
                  alt="Newly completed Irish home interior – Fennor Developments"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-light text-slate tracking-wide">Built for the long term</h2>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  From new builds to period rewires, we deliver electrical work that meets current regulations and supports your plans — including solar and EV readiness.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center rounded-xl bg-graphite px-6 py-3.5 text-sm font-medium text-white hover:bg-slate transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
