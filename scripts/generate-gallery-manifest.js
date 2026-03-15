/**
 * Generates gallery-manifest.json at build time so the gallery page does not
 * import fs/path (which would bundle public/gallery into the Vercel function and exceed 300MB).
 * Output: src/data/gallery-manifest.json
 */

const fs = require("fs");
const path = require("path");

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const THUMBS_DIR = path.join(GALLERY_DIR, "thumbs");
const OUT_PATH = path.join(process.cwd(), "src", "data", "gallery-manifest.json");
const EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function captionFromFilename(filename) {
  const base = path.basename(filename, path.extname(filename)).replace(/[-_]+/g, " ").trim();
  if (!base) return "Our work";
  return base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
}

function main() {
  const dataDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  if (!fs.existsSync(GALLERY_DIR)) {
    fs.writeFileSync(OUT_PATH, JSON.stringify([], null, 2));
    console.log("No public/gallery; wrote empty gallery-manifest.json");
    return;
  }

  const files = fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((e) => e.isFile() && EXT.includes(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort();

  const manifest = files.map((filename) => {
    const base = path.basename(filename, path.extname(filename));
    const thumbName = `${base}.jpg`;
    const thumbPath = path.join(THUMBS_DIR, thumbName);
    const thumbSrc = fs.existsSync(thumbPath) ? `/gallery/thumbs/${thumbName}` : null;
    return {
      src: `/gallery/${filename}`,
      thumbSrc,
      caption: captionFromFilename(filename),
    };
  });

  fs.writeFileSync(OUT_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Wrote gallery-manifest.json with ${manifest.length} images.`);
}

main();
