import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { getLocationsByCountyFull } from "@/config/locations";
import { ABOUT_HERO } from "@/config/images";

export const metadata: Metadata = {
  title: "Locations We Serve | Meath, Louth, Dublin & North Leinster | Fennor",
  description:
    "Fennor Developments serves homeowners across North Leinster: solar, electrical and building services in Meath, Louth, Westmeath, Cavan and the Dublin commuter belt.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        imageSrc={ABOUT_HERO}
        imageAlt="Fennor Developments – service areas across North Leinster"
        headline="Locations we serve"
        objectPosition="center 40%"
        subline="Solar, electrical and building services across Meath, Louth, Westmeath, Cavan and the Dublin commuter belt."
      />

      <section className="py-16 sm:py-20 bg-off-white bg-texture-fine-lines">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <p className="text-lg text-slate/95 leading-relaxed">
              Fennor Developments serves homeowners and businesses across <strong>North Leinster</strong> and the surrounding counties. From our base in Slane, Co. Meath, we deliver <Link href="/solar" className="text-accent hover:text-accent-light font-medium">solar panel installation</Link>, <Link href="/electrical" className="text-accent hover:text-accent-light font-medium">electrical services</Link> and <Link href="/building-renovations" className="text-accent hover:text-accent-light font-medium">building and renovation</Link> projects across Meath, Louth, Westmeath, Cavan and the Dublin commuter belt. Whether you are in Navan, Drogheda, Mullingar or Blanchardstown, we offer local expertise, clear quotes and a single point of contact for solar, electrical and construction work.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Use the list below to find our service pages for your town. Each location links to our dedicated <strong>solar panels</strong>, <strong>electrician</strong> and <strong>builders</strong> pages where we cover that area. For a free quote or to discuss your project, <Link href="/contact" className="text-accent hover:text-accent-light font-medium">contact us</Link>.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white border-t border-gray-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {getLocationsByCountyFull().map(({ county, description, towns }, countyIndex) => (
            <FadeInSection key={county} delay={countyIndex * 50}>
              <div className="mb-12 last:mb-0">
                <h2 className="text-2xl font-light text-slate tracking-wide border-b border-gray-200/80 pb-2 mb-6">
                  {county}
                </h2>
                {description && (
                  <p className="text-gray-600 text-sm mb-4">{description}</p>
                )}
                <ul className="space-y-6">
                  {towns.map((town) => (
                    <li
                      key={town.name}
                      className="rounded-xl border border-gray-200/80 bg-off-white/50 p-5 shadow-sm"
                    >
                      <h3 className="font-medium text-slate text-lg mb-3">{town.name}</h3>
                      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        <li>
                          <Link href={town.solarHref} className="text-accent hover:text-accent-light font-medium">
                            {town.solarLabel}
                          </Link>
                        </li>
                        <li>
                          <Link href={town.electricianHref} className="text-accent hover:text-accent-light font-medium">
                            {town.electricianLabel}
                          </Link>
                        </li>
                        <li>
                          <Link href={town.buildersHref} className="text-accent hover:text-accent-light font-medium">
                            {town.buildersLabel}
                          </Link>
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-off-white-alt bg-texture-fine-lines border-t border-gray-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Not listed? We cover a wide area across North Leinster and the North East. Get in touch to confirm we serve your location and to request a free quote for <Link href="/solar" className="text-accent hover:text-accent-light font-medium">solar</Link>, <Link href="/electrical" className="text-accent hover:text-accent-light font-medium">electrical</Link> or <Link href="/building-renovations" className="text-accent hover:text-accent-light font-medium">building and renovation</Link> work.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
          >
            Contact us for a quote
          </Link>
        </div>
      </section>
    </>
  );
}
