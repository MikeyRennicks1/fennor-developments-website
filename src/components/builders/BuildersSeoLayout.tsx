import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { BUILDS_HERO } from "@/config/images";

export type BuildersFaqItem = { question: string; answer: string };

export type BuildersServiceItem = { title: string; description: string };

const DEFAULT_SERVICES: BuildersServiceItem[] = [
  { title: "One-off house builds", description: "Turnkey from plot to handover. One point of contact, structured project management." },
  { title: "Renovations & refurbishment", description: "Major renovations, period refurbishment, internal remodelling. Clear scope and timeline." },
  { title: "Extensions", description: "Single and two-storey extensions. Design and build or work with your architect." },
  { title: "Electrical & solar integration", description: "In-house electrical and solar PV. Energy-efficient construction, solar-ready builds." },
  { title: "Project management", description: "Structured process, clear documentation. From planning to handover." },
];

type BuildersSeoLayoutProps = {
  headline: string;
  subline?: string;
  children: React.ReactNode;
  faq: BuildersFaqItem[];
  services?: BuildersServiceItem[];
  /** Anchor text for link to /electrical e.g. "electrician Meath", "electrician Navan" */
  electricalAnchorText?: string;
  /** Anchor text for link to /solar e.g. "solar panels Meath", "solar panels Navan" */
  solarAnchorText?: string;
};

export function BuildersSeoLayout({
  headline,
  subline,
  children,
  faq,
  services = DEFAULT_SERVICES,
  electricalAnchorText = "electrical services",
  solarAnchorText = "solar panel installation",
}: BuildersSeoLayoutProps) {
  return (
    <>
      <FaqJsonLd faq={faq} />
      <PageHero
        imageSrc={BUILDS_HERO}
        imageAlt={`Building and renovations – Fennor Developments, Meath`}
        headline={headline}
        objectPosition="center 40%"
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
        <section className="py-16 sm:py-20 bg-white border-t border-gray-200/80" aria-labelledby="builders-services-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="builders-services-heading" className="text-2xl font-light text-slate tracking-wide text-center mb-8">
              Services we offer
            </h2>
            <ul className="space-y-4">
              {services.map(({ title, description }) => (
                <li key={title} className="flex flex-col sm:flex-row sm:items-start gap-2 rounded-xl border border-gray-200/80 bg-off-white/50 p-4">
                  <span className="font-medium text-slate shrink-0 sm:w-44">{title}</span>
                  <span className="text-gray-600 text-sm">{description}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm text-gray-600">
              For full building and renovation services, see our main <Link href="/building-renovations">Building & Renovations</Link> page. We offer in-house <Link href="/electrical">{electricalAnchorText}</Link> and <Link href="/solar">{solarAnchorText}</Link>. View our <Link href="/gallery">case studies</Link> or <Link href="/contact">contact us</Link> to discuss your project.
            </p>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="py-20 sm:py-28 bg-off-white-alt bg-texture-fine-lines" aria-labelledby="builders-faq-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="builders-faq-heading" className="text-2xl sm:text-3xl font-light text-slate tracking-wide text-center mb-12">
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide">Discuss your build or renovation</h2>
            <p className="mt-3 text-white/75 text-sm">
              Serious about building or renovating? We work with homeowners ready to invest in quality. We offer in-house <Link href="/electrical" className="text-white/90 underline hover:text-white">{electricalAnchorText}</Link> and <Link href="/solar" className="text-white/90 underline hover:text-white">{solarAnchorText}</Link>. See our <Link href="/gallery" className="text-white/90 underline hover:text-white">case studies</Link> or <Link href="/contact" className="text-white/90 underline hover:text-white">contact us</Link> for a quote.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?enquiry=build"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/25 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                Enquire about your build
              </Link>
              <Link
                href="/solar"
                className="inline-flex items-center justify-center rounded-xl border border-white/50 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Solar PV
              </Link>
              <Link
                href="/building-renovations"
                className="inline-flex items-center justify-center rounded-xl border border-white/50 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Building & Renovations
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
