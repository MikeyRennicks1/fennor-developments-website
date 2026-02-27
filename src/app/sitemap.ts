import { MetadataRoute } from "next";
import { company } from "@/config/company";

const baseUrl = company.website || "https://fennordevelopments.ie";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/solar",
    "/electrical",
    "/builds-renovations",
    "/about",
    "/referral",
    "/calculator",
    "/contact",
  ];

  return routes.map((path) => ({
    url: path ? `${baseUrl}${path}` : `${baseUrl.replace(/\/$/, "")}/`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));
}
