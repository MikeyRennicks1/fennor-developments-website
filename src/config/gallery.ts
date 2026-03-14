/**
 * Solar work gallery. Put images in public/gallery/ and add the filename below.
 * Caption is derived from the filename (e.g. "inverter-install.jpg" → "Inverter install").
 */

export type GalleryItem = {
  src: string;
  /** Optional small thumbnail URL for grid (faster load). Full-size src used in lightbox. */
  thumbSrc?: string;
  alt: string;
  caption: string;
  /** Full SEO description (roof type, inverter, battery, EV charger, EDDI, etc.) – used in JSON-LD and sitemap. */
  description?: string;
};

/** Gallery item with town assigned for location SEO (alt text, figcaption, JSON-LD). */
export type GalleryItemWithTown = GalleryItem & { town: string };

function captionFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  if (!base) return "Our work";
  return base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
}

/** Add your image filenames here (files live in public/gallery/). Order = display order. */
const GALLERY_FILENAMES = [
  "701cb181-471b-460a-a597-47d5747746be.JPG",
  "9b052b60-22c8-4542-94ee-99e54eff97f6.JPG",
  "b69fab46-e6ad-43a1-af45-86d856f768c4.JPG",
];

export const SOLAR_GALLERY_IMAGES: GalleryItem[] = GALLERY_FILENAMES.map((filename) => {
  const caption = captionFromFilename(filename);
  return {
    src: `/gallery/${filename}`,
    alt: `${caption} – Fennor Developments`,
    caption,
  };
});
