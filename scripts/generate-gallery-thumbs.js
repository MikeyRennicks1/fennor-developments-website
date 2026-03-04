/**
 * Generates small JPEG thumbnails (480px wide) for gallery images.
 * Run before build so the grid loads fast. HEIC is skipped (no thumb).
 * Output: public/gallery/thumbs/*.jpg
 */

const fs = require("fs");
const path = require("path");

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const THUMBS_DIR = path.join(GALLERY_DIR, "thumbs");
const THUMB_WIDTH = 480;
const JPEG_QUALITY = 78;
const EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.warn("sharp not installed; run: npm install sharp --save-dev");
    process.exit(0);
  }

  if (!fs.existsSync(GALLERY_DIR)) {
    console.warn("No public/gallery folder.");
    process.exit(0);
  }

  fs.mkdirSync(THUMBS_DIR, { recursive: true });
  const files = fs.readdirSync(GALLERY_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return EXT.includes(ext) && !f.startsWith(".");
  });

  let done = 0;
  for (const file of files) {
    const base = path.basename(file, path.extname(file));
    const outPath = path.join(THUMBS_DIR, `${base}.jpg`);
    const inPath = path.join(GALLERY_DIR, file);
    try {
      await sharp(inPath)
        .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(outPath);
      done++;
    } catch (err) {
      console.warn(`Skip ${file}:`, err.message);
    }
  }
  console.log(`Gallery thumbs: ${done}/${files.length} written to public/gallery/thumbs/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
