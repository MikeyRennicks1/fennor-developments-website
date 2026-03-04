import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SOLAR_GALLERY_IMAGES } from "@/config/gallery";
import { SOLAR_HERO } from "@/config/images";

export const metadata: Metadata = {
  title: "Our Gallery | Solar, Electrical & Builds | Fennor Developments",
  description:
    "Photos of our solar installations, inverters, batteries and construction work across Meath and Ireland.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        imageSrc={SOLAR_HERO}
        imageAlt="Fennor Developments – our work"
        headline="Our gallery"
        subline="Solar, electrical and builds – view all our work."
      />
      <section className="py-16 sm:py-20 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {SOLAR_GALLERY_IMAGES.map((item) => (
              <div
                key={item.src}
                className="relative rounded-xl overflow-hidden shadow-md aspect-[4/3] bg-gray-200"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
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
