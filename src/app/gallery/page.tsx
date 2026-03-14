import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryWithLightbox } from "@/components/gallery/GalleryWithLightbox";
import { getGalleryImagesWithSeo } from "@/lib/gallery";
import { SOLAR_HERO } from "@/config/images";
import { company } from "@/config/company";

const baseUrl = company.website || "https://fennordevelopments.ie";
const canonicalBase = "https://fennor.ie";

export async function generateMetadata(): Promise<Metadata> {
  const images = getGalleryImagesWithSeo();
  return {
    title: "Our Gallery | Solar, Electrical & Builds | Fennor Developments",
    description:
      "Photos of our solar installations, inverters, batteries and construction work across Meath and Ireland.",
    openGraph: {
      title: "Our Gallery | Solar, Electrical & Builds | Fennor Developments",
      description:
        "Photos of our solar installations, inverters, batteries and construction work across Meath and Ireland.",
      url: `${baseUrl}/gallery`,
      siteName: "Fennor Developments",
      images: images.length > 0 ? [{ url: `${baseUrl}${images[0].src}`, width: 1200, height: 900, alt: images[0].alt }] : undefined,
    },
  };
}

export default function GalleryPage() {
  const images = getGalleryImagesWithSeo();

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Fennor Developments – Our work gallery",
    description: "Solar PV, electrical and construction project photos across Meath and Ireland.",
    url: `${canonicalBase}/gallery`,
    numberOfItems: images.length,
    image: images.map((item, index) => ({
      "@type": "ImageObject" as const,
      contentUrl: `${canonicalBase}${item.src}`,
      name: item.caption,
      description: `Solar panel installation in ${item.town}, Ireland – Fennor Developments`,
      creator: { "@type": "Organization" as const, name: "Fennor Developments" },
      contentLocation: { "@type": "Place" as const, name: `${item.town}, Ireland` },
      position: index + 1,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <PageHero
        imageSrc={SOLAR_HERO}
        imageAlt="Fennor Developments – our work"
        headline="Our gallery"
        subline="Solar, electrical and builds – view all our work."
      />
      <section className="py-16 sm:py-20 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-light text-slate tracking-wide mb-6">Gallery</h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            Photos of our solar installations, electrical work and builds across Meath and the North East.
          </p>
          <GalleryWithLightbox images={images} />
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-slate px-6 py-3.5 text-sm font-medium text-white hover:bg-slate/90 transition-colors"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
