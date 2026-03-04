/**
 * Renders FAQPage JSON-LD (schema.org) from a list of Q&A items.
 * Use on service/location pages that have on-page FAQ content so rich results match.
 */
export type FaqJsonLdItem = { question: string; answer: string };

type FaqJsonLdProps = {
  faq: FaqJsonLdItem[];
};

export function FaqJsonLd({ faq }: FaqJsonLdProps) {
  if (!faq?.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
