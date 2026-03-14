import { NextResponse } from "next/server";
import { company } from "@/config/company";
import { getGalleryImages } from "@/lib/gallery";

const baseUrl = company.website || "https://fennordevelopments.ie";

/** Image sitemap for gallery – helps search engines discover and index gallery images. */
export async function GET() {
  const images = getGalleryImages();
  const galleryUrl = `${baseUrl}/gallery`;

  const imageEntries = images.map(
    (item) => `
    <image:image>
      <image:loc>${escapeXml(baseUrl + item.src)}</image:loc>
      <image:caption>${escapeXml(item.description ?? item.alt)}</image:caption>
      <image:title>${escapeXml(item.caption)}</image:title>
    </image:image>`
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(galleryUrl)}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageEntries}
  </url>
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
