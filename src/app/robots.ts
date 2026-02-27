import { MetadataRoute } from "next";
import { company } from "@/config/company";

const baseUrl = company.website || "https://fennordevelopments.ie";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
