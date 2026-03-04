"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryItem } from "@/config/gallery";

type Props = { images: (GalleryItem & { town?: string })[] };

export function GalleryWithLightbox({ images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const goPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, goPrev, goNext]);

  if (!images?.length) return null;

  const openImage = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {images.map((item, index) => (
          <figure
            key={item.src}
            className="relative rounded-xl overflow-hidden shadow-md aspect-[4/3] bg-gray-200 focus-within:ring-2 focus-within:ring-solar-orange-light focus-within:ring-offset-2"
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpenIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenIndex(index);
                }
              }}
              className="absolute inset-0 cursor-pointer focus:outline-none"
            >
              <img
                src={item.thumbSrc ?? item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <span className="absolute inset-0 hidden flex items-center justify-center bg-gray-300 text-center text-xs text-gray-500" aria-hidden>
                Image unavailable
              </span>
            </div>
            <figcaption className="sr-only">
              Solar panel installation{item.town ? ` in ${item.town}` : ""}, installed by Fennor Developments. Serving Meath, Dublin and Louth with solar PV systems, batteries and hybrid inverters.
            </figcaption>
          </figure>
        ))}
      </div>

      {openImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="View image"
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 p-2 sm:p-3 text-white hover:bg-white/30 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 p-2 sm:p-3 text-white hover:bg-white/30 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full min-h-[60vh] flex items-center justify-center px-12 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={openImage.src}
              alt={openImage.alt}
              fill
              sizes="90vw"
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
