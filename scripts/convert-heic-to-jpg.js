/**
 * Converts all HEIC images in public/gallery/ to JPG so they display in the gallery.
 * All JPGs are written to public/gallery/ (root) so they show up on the site.
 * Run: npm run gallery:convert-heic
 * To reconvert and overwrite existing JPGs: npm run gallery:convert-heic -- --force
 *
 * Requires: npm install heic-convert --save-dev
 */

const fs = require("fs");
const path = require("path");

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const HEIC_EXT = [".heic", ".HEIC"];

const force = process.argv.includes("--force");

function getAllHeicFiles(dir, relativeDir = "") {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const rel = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllHeicFiles(full, rel));
    } else if (entry.isFile() && HEIC_EXT.includes(path.extname(entry.name))) {
      results.push({ full, rel });
    }
  }
  return results;
}

async function main() {
  console.log("HEIC → JPG converter");
  console.log("Working directory:", process.cwd());
  console.log("Gallery folder:", GALLERY_DIR);
  if (force) console.log("Mode: --force (overwrite existing JPGs)\n");

  if (!fs.existsSync(GALLERY_DIR)) {
    console.error("ERROR: Gallery folder does not exist:", GALLERY_DIR);
    console.error("Run this from the project root (where package.json is).");
    process.exit(1);
  }

  let heicConvert;
  try {
    heicConvert = require("heic-convert");
  } catch (e) {
    console.error("Missing heic-convert. Install with: npm install heic-convert --save-dev");
    process.exit(1);
  }

  const heicFiles = getAllHeicFiles(GALLERY_DIR);
  if (heicFiles.length === 0) {
    console.log("No HEIC files found in public/gallery/ (or its subfolders).");
    console.log("Add .heic/.HEIC photos into public/gallery/ then run this again.");
    return;
  }

  console.log(`Found ${heicFiles.length} HEIC file(s). Writing JPGs to gallery root...\n`);

  let converted = 0;
  let skipped = 0;

  for (const { full: heicPath, rel } of heicFiles) {
    const base = path.basename(heicPath, path.extname(heicPath));
    const jpgPath = path.join(GALLERY_DIR, `${base}.jpg`);

    if (!force && fs.existsSync(jpgPath)) {
      skipped++;
      continue;
    }

    try {
      const inputBuffer = fs.readFileSync(heicPath);
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: "JPEG",
        quality: 0.9,
      });
      const buf = Buffer.isBuffer(outputBuffer) ? outputBuffer : Buffer.from(outputBuffer);
      fs.writeFileSync(jpgPath, buf);
      converted++;
      console.log(`  ${rel} → ${base}.jpg`);
    } catch (err) {
      console.warn(`  Skip ${rel}:`, err.message);
    }
  }

  console.log(`\nDone. Converted ${converted} to JPG, skipped ${skipped} (already had JPG).`);
  if (converted > 0) {
    console.log("Refresh the gallery page or run npm run build to see all images.");
  }
  if (skipped > 0 && converted === 0 && !force) {
    console.log("\nTo reconvert all HEIC and overwrite existing JPGs, run:");
    console.log("  npm run gallery:convert-heic -- --force");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
