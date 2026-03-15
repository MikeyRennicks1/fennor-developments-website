/**
 * Generates static sitemap-images.xml at build time so we don't need a serverless
 * route (which would bundle the gallery and exceed Vercel's 300MB function limit).
 * Output: public/sitemap-images.xml
 */

const fs = require("fs");
const path = require("path");

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const OUT_PATH = path.join(process.cwd(), "public", "sitemap-images.xml");
const EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function captionFromFilename(filename) {
  const base = path.basename(filename, path.extname(filename)).replace(/[-_]+/g, " ").trim();
  if (!base) return "Our work";
  return base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
}

function main() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.SITE_URL || "https://fennordevelopments.ie";
  const galleryUrl = `${baseUrl}/gallery`;

  if (!fs.existsSync(GALLERY_DIR)) {
    fs.writeFileSync(OUT_PATH, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(galleryUrl)}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
    console.log("No gallery dir; wrote minimal sitemap-images.xml");
    return;
  }

  const files = fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((e) => e.isFile() && EXT.includes(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort();

  const imageEntries = files
    .map((filename) => {
      const caption = captionFromFilename(filename);
      const alt = `${caption} – Fennor Developments`;
      const src = `${baseUrl}/gallery/${filename}`;
      return `    <image:image>
      <image:loc>${escapeXml(src)}</image:loc>
      <image:caption>${escapeXml(alt)}</image:caption>
      <image:title>${escapeXml(caption)}</image:title>
    </image:image>`;
    })
    .join("\n");

  const lastmod = new Date().toISOString().split("T")[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(galleryUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${imageEntries}
  </url>
</urlset>
`;

  fs.writeFileSync(OUT_PATH, xml);
  console.log(`Wrote sitemap-images.xml with ${files.length} images.`);
}

main();
