import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { SOLAR_HERO } from "@/config/images";

/** Extract town name from headline for CTA, map and schema. */
function getTownFromHeadline(headline: string): string | null {
  const m = headline.replace(/^Solar Panel Installation in /i, "").replace(/^Solar Panels /i, "").trim();
  return m || null;
}

const DEFAULT_RECENT_DESCRIPTION = "We recently completed a solar PV installation for a home in the area: panels, hybrid inverter and optional battery. The customer received SEAI grant support and now monitors production via the app. Typical payback is around 5–7 years.";

export type FaqItem = { question: string; answer: string };

export type RecentProject = {
  title: string;
  description: string;
};

type SolarLocationLayoutProps = {
  /** H1 / hero headline e.g. "Solar Panels Meath" */
  headline: string;
  /** Optional subline under the hero */
  subline?: string;
  /** Main content: local intro, solar benefits, etc. */
  children: React.ReactNode;
  /** FAQ items for this location */
  faq: FaqItem[];
  /** Keyword-rich anchor text for the contact link e.g. "solar installers in Meath", "solar panels Navan" */
  contactAnchorText?: string;
  /** Anchor text for link to /electrical e.g. "electrician Meath", "electrician Navan" */
  electricalAnchorText?: string;
  /** Anchor text for link to /building-renovations e.g. "builders Meath", "builders Navan" */
  buildersAnchorText?: string;
  /** Optional: anchor + link to /renovations-meath e.g. "house renovations Meath" */
  renovationsAnchorText?: string;
  /** Optional: related solar town pages for internal linking e.g. [{ label: "Solar Panels Trim", href: "/solar-panels-trim" }] */
  relatedTownLinks?: Array<{ label: string; href: string }>;
  /** Optional recent project example for this area */
  recentProject?: RecentProject;
};

export function SolarLocationLayout({ headline, subline, children, faq, contactAnchorText = "solar companies near me", electricalAnchorText = "electrical services", buildersAnchorText = "building and renovations", renovationsAnchorText, relatedTownLinks, recentProject }: SolarLocationLayoutProps) {
  const town = getTownFromHeadline(headline);
  const effectiveRecent = recentProject ?? (town ? { title: `Recent solar installation near ${town}`, description: DEFAULT_RECENT_DESCRIPTION } : undefined);

  return (
    <>
      <FaqJsonLd faq={faq} />
      {town && <LocalBusinessJsonLd focusArea={town} />}
      <PageHero
        imageSrc={SOLAR_HERO}
        imageAlt={`Solar panels ${headline.replace(/^Solar Panels /i, "")} – Fennor Developments`}
        headline={headline}
        objectPosition="center 35%"
        subline={subline}
      />

      <FadeInSection>
        <article className="py-20 sm:py-28 bg-off-white bg-texture-energy-wave">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-slate text-base leading-relaxed [&_p]:mt-4 [&_p]:text-gray-600 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-slate [&_a]:text-accent [&_a]:hover:text-accent-light">
            {children}
          </div>
        </article>
      </FadeInSection>

      {effectiveRecent && (
        <FadeInSection delay={100}>
          <section className="py-16 sm:py-20 bg-white border-t border-gray-200/80">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-medium text-slate tracking-wide mb-3">Recent Solar Installation Near {town ?? "This Area"}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{effectiveRecent.description}</p>
              <p className="mt-2 text-sm font-medium text-slate">{effectiveRecent.title}</p>
            </div>
          </section>
        </FadeInSection>
      )}

      <FadeInSection delay={100}>
        <section className="py-16 sm:py-20 bg-white border-t border-gray-200/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600 text-sm mb-6">
              For system sizes, grants, inverters and battery options, see our main solar page. We also offer <Link href="/electrical" className="text-accent hover:text-accent-light font-medium">{electricalAnchorText}</Link> and <Link href="/gallery" className="text-accent hover:text-accent-light font-medium">solar installation case studies</Link>, and we do <Link href="/building-renovations" className="text-accent hover:text-accent-light font-medium">{buildersAnchorText}</Link> for new builds{renovationsAnchorText ? <> and <Link href="/renovations-meath" className="text-accent hover:text-accent-light font-medium">{renovationsAnchorText}</Link></> : " and renovations"} in the area. {town ? <>Get a free roof assessment and quote for solar panels in {town}. <Link href="/contact" className="text-accent hover:text-accent-light font-medium">Contact us today</Link>.</> : <>We&apos;re <Link href="/contact" className="text-accent hover:text-accent-light font-medium">{contactAnchorText}</Link> — contact us for a quote.</>}
            </p>
            {relatedTownLinks && relatedTownLinks.length > 0 && (
              <p className="text-center text-gray-600 text-sm mb-4">
                Nearby areas we install solar panels: {relatedTownLinks.map((t, i) => (
                  <span key={t.href}>
                    {i > 0 && " · "}
                    <Link href={t.href} className="text-accent hover:text-accent-light font-medium">{t.label}</Link>
                  </span>
                ))}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/solar"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
              >
                Solar PV – systems & grants
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-medium text-slate hover:bg-gray-50 transition-colors"
              >
                Solar Calculator
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-medium text-slate hover:bg-gray-50 transition-colors"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {town && (
        <FadeInSection delay={100}>
          <section className="py-16 sm:py-20 bg-off-white border-t border-gray-200/80" aria-labelledby="map-heading">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="map-heading" className="text-xl font-medium text-slate tracking-wide text-center mb-4">
                Serving {town} and surrounds
              </h2>
              <div className="rounded-xl overflow-hidden border border-gray-200/80 shadow-sm aspect-video w-full">
                <iframe
                  title={`Map of ${town}, Ireland`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(`${town}, Ireland`)}&output=embed`}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      <FadeInSection delay={100}>
        <section className="py-20 sm:py-28 bg-off-white-alt bg-texture-fine-lines" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-light text-slate tracking-wide text-center mb-12">
              Frequently asked questions
            </h2>
            <ul className="space-y-6">
              {faq.map(({ question, answer }) => (
                <li key={question}>
                  <details className="group rounded-xl border border-gray-200/80 bg-white shadow-sm overflow-hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 text-left font-medium text-slate hover:bg-gray-50/80 transition-colors [&::-webkit-details-marker]:hidden">
                      <span>{question}</span>
                      <span className="text-solar-orange-light transition-transform group-open:rotate-180" aria-hidden>
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-gray-100 px-5 py-4 text-gray-600 text-sm leading-relaxed">
                      {answer}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="py-20 sm:py-28 bg-slate text-white bg-texture-diagonal relative overflow-hidden">
          <div className="absolute inset-0 bg-texture-grid-light pointer-events-none" aria-hidden />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-solar-orange/50 to-transparent" aria-hidden />
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Get a solar quote</h2>
            <p className="mt-3 text-white/75 text-sm">
              Free roof assessment. We’ll outline system size, grant options and a clear quote. See our <Link href="/electrical" className="text-white/90 underline hover:text-white">{electricalAnchorText}</Link>, <Link href="/building-renovations" className="text-white/90 underline hover:text-white">{buildersAnchorText}</Link>, <Link href="/gallery" className="text-white/90 underline hover:text-white">case studies</Link> and <Link href="/contact" className="text-white/90 underline hover:text-white">contact page</Link>.
            </p>
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
                Estimate savings
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
