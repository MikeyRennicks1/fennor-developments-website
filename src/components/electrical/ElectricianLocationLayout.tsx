import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { ELECTRICAL_HERO } from "@/config/images";

export type ElectricianFaqItem = { question: string; answer: string };

export type ElectricianServiceItem = { title: string; description: string };

const DEFAULT_SERVICES: ElectricianServiceItem[] = [
  { title: "Domestic electrical", description: "New builds, extensions, upgrades. Full house wiring, consumer units, certification." },
  { title: "Rewires", description: "Complete rewires for older properties. Safe, compliant, future-proof." },
  { title: "Smart home & lighting", description: "Lighting control, heating controls, integrated systems." },
  { title: "Commercial electrical", description: "Fit-outs, maintenance, compliance for commercial premises." },
  { title: "Solar-ready & EV", description: "Wiring for solar PV and EV chargers. Future-proof your home." },
];

type ElectricianLocationLayoutProps = {
  /** H1 / hero headline e.g. "Electrician Navan" */
  headline: string;
  subline?: string;
  /** Main content: ~700 words, unique per town */
  children: React.ReactNode;
  faq: ElectricianFaqItem[];
  /** Optional override for services list; defaults to standard list */
  services?: ElectricianServiceItem[];
  /** Anchor text for link to /solar e.g. "solar panels Meath", "solar panels Navan" */
  solarAnchorText?: string;
  /** Anchor text for link to /building-renovations e.g. "builders Meath", "builders Navan" */
  buildersAnchorText?: string;
};

export function ElectricianLocationLayout({
  headline,
  subline,
  children,
  faq,
  services = DEFAULT_SERVICES,
  solarAnchorText = "solar panel installation",
  buildersAnchorText = "building and renovations",
}: ElectricianLocationLayoutProps) {
  const townName = headline.replace(/^Electrician /i, "");

  return (
    <>
      <FaqJsonLd faq={faq} />
      <PageHero
        imageSrc={ELECTRICAL_HERO}
        imageAlt={`Electrician ${townName} – Fennor Developments`}
        headline={headline}
        objectPosition="center center"
        subline={subline}
      />

      <FadeInSection>
        <article className="py-20 sm:py-28 bg-off-white bg-texture-fine-lines">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-slate text-base leading-relaxed [&_p]:mt-4 [&_p]:text-gray-600 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-slate [&_a]:text-accent [&_a]:hover:text-accent-light">
            {children}
          </div>
        </article>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="py-16 sm:py-20 bg-white border-t border-gray-200/80" aria-labelledby="services-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="services-heading" className="text-2xl font-light text-slate tracking-wide text-center mb-8">
              Electrical services we offer
            </h2>
            <ul className="space-y-4">
              {services.map(({ title, description }) => (
                <li key={title} className="flex flex-col sm:flex-row sm:items-start gap-2 rounded-xl border border-gray-200/80 bg-off-white/50 p-4">
                  <span className="font-medium text-slate shrink-0 sm:w-40">{title}</span>
                  <span className="text-gray-600 text-sm">{description}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm text-gray-600">
              For full electrical services across North Leinster, see our main <Link href="/electrical">electrical page</Link>. We also offer <Link href="/solar">{solarAnchorText}</Link> and work with <Link href="/building-renovations">{buildersAnchorText}</Link> for new builds. View our <Link href="/gallery">solar installation case studies</Link> or <Link href="/contact">contact us</Link> for a quote.
            </p>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="py-20 sm:py-28 bg-off-white-alt bg-texture-fine-lines" aria-labelledby="electrician-faq-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="electrician-faq-heading" className="text-2xl sm:text-3xl font-light text-slate tracking-wide text-center mb-12">
              Frequently asked questions
            </h2>
            <ul className="space-y-6">
              {faq.map(({ question, answer }) => (
                <li key={question}>
                  <details className="group rounded-xl border border-gray-200/80 bg-white shadow-sm overflow-hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 text-left font-medium text-slate hover:bg-gray-50/80 transition-colors [&::-webkit-details-marker]:hidden">
                      <span>{question}</span>
                      <span className="text-accent transition-transform group-open:rotate-180" aria-hidden>▼</span>
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
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Get an electrical quote</h2>
            <p className="mt-3 text-white/75 text-sm">
              Free assessment. We'll outline the work, provide a clear quote and full documentation. We also do <Link href="/solar" className="text-white/90 underline hover:text-white">{solarAnchorText}</Link> and work with <Link href="/building-renovations" className="text-white/90 underline hover:text-white">{buildersAnchorText}</Link>. See our <Link href="/gallery" className="text-white/90 underline hover:text-white">case studies</Link> or <Link href="/contact" className="text-white/90 underline hover:text-white">contact us</Link>.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/25 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/solar"
                className="inline-flex items-center justify-center rounded-xl border border-white/50 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Solar PV
              </Link>
              <Link
                href="/electrical"
                className="inline-flex items-center justify-center rounded-xl border border-white/50 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Electrical services
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
