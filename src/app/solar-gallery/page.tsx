import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryWithLightbox } from "@/components/gallery/GalleryWithLightbox";
import { getGalleryImagesWithSeo } from "@/lib/gallery";
import { SOLAR_HERO } from "@/config/images";
import { company } from "@/config/company";

const baseUrl = company.website || "https://fennordevelopments.ie";
const canonicalBase = "https://fennor.ie";

export const metadata: Metadata = {
  title: "Solar Panel Installations | Fennor Developments Meath",
  description:
    "View real solar PV installations completed by Fennor Developments across Meath, Navan, Trim, Slane and the North East.",
  openGraph: {
    title: "Solar Panel Installations | Fennor Developments Meath",
    description:
      "View real solar PV installations completed by Fennor Developments across Meath, Navan, Trim, Slane and the North East.",
    url: `${baseUrl}/solar-gallery`,
    siteName: "Fennor Developments",
  },
};

export default function SolarGalleryPage() {
  const images = getGalleryImagesWithSeo();

  const imageObjectJsonLd = images.map((item, index) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `${canonicalBase}${item.src}`,
    description: `Solar panel installation ${item.town} Meath by Fennor Developments`,
    creator: { "@type": "Organization", name: "Fennor Developments" },
    contentLocation: { "@type": "Place", name: `${item.town}, Ireland` },
    position: index + 1,
  }));

  return (
    <>
      {imageObjectJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectJsonLd.length === 1 ? imageObjectJsonLd[0] : imageObjectJsonLd) }}
        />
      )}
      <PageHero
        imageSrc={SOLAR_HERO}
        imageAlt="Solar PV installations – Fennor Developments, Meath"
        headline="Solar PV Installations Across Meath & The North East"
        subline="Real installations from our solar projects."
      />
      <section className="py-16 sm:py-20 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
