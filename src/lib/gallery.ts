/**
 * Reads all gallery images from public/gallery/ (including subdirectories).
 * No limit, slice, or pagination – every image file is returned.
 * Descriptions in gallery-descriptions.ts are used when key matches.
 * getGalleryImagesWithSeo() assigns each image to a town for location SEO.
 */

import fs from "fs";
import path from "path";
import type { GalleryItem, GalleryItemWithTown } from "@/config/gallery";
import { GALLERY_DESCRIPTIONS } from "@/config/gallery-descriptions";
import { seoTowns } from "@/config/seo-towns";

/** Web-displayable formats only (HEIC excluded – not supported in browsers). */
const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function captionFromFilename(filename: string): string {
  const base = path.basename(filename, path.extname(filename));
  const withSpaces = base.replace(/[-_]+/g, " ").trim();
  if (!withSpaces) return "Our work";
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

/** Collect image file paths in dir only (no subdirs), so we show each photo once. Thumbs are used for grid load, not as separate items. */
function collectImagePathsRootOnly(dir: string): string[] {
  const results: string[] = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXT.includes(ext)) results.push(entry.name);
    }
  } catch {
    // ignore
  }
  return results;
}

/** Returns every image file in public/gallery/ (root only; thumbs subdir is for grid thumbnails, not separate items). No limit. */
export function getGalleryImages(): GalleryItem[] {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");
    if (typeof fs.readdirSync !== "function") return [];
    const allPaths = collectImagePathsRootOnly(galleryDir).sort();
    const thumbsDir = path.join(galleryDir, "thumbs");

    return allPaths.map((relativePath: string) => {
      const filename = path.basename(relativePath);
      const caption = captionFromFilename(filename);
      const custom = GALLERY_DESCRIPTIONS[filename];
      const defaultAlt = `${caption} – Fennor Developments`;
      const defaultDescription =
        "Solar PV, electrical or construction installation – Fennor Developments, Meath and Ireland.";
      const alt = custom?.description ?? defaultAlt;
      const description = custom?.description ?? defaultDescription;
      const base = path.basename(relativePath, path.extname(relativePath));
      const thumbName = `${base}.jpg`;
      const thumbFullPath = path.join(thumbsDir, thumbName);
      const isInThumbs = path.dirname(relativePath) === "thumbs";
      const thumbSrc =
        !isInThumbs && fs.existsSync(thumbFullPath) ? `/gallery/thumbs/${thumbName}` : undefined;
      return {
        src: `/gallery/${relativePath}`,
        thumbSrc,
        alt,
        caption,
        description,
      };
    });
  } catch {
    return [];
  }
}

/** SEO alt text for a gallery image assigned to a town. */
export function getGalleryImageAltForTown(town: string): string {
  return `Solar panel installation ${town}, solar PV installers ${town} – Fennor Developments`;
}

/**
 * Returns every gallery image with a town assigned for location SEO.
 * Images are distributed across seoTowns so each town gets at least 2 images (when gallery has enough images).
 */
export function getGalleryImagesWithSeo(): GalleryItemWithTown[] {
  const images = getGalleryImages();
  return images.map((item, index) => {
    const town = seoTowns[index % seoTowns.length];
    return {
      ...item,
      town,
      alt: getGalleryImageAltForTown(town),
    };
  });
}
