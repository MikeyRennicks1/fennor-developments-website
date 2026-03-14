import { MetadataRoute } from "next";
import { getCaseStudies } from "@/config/case-studies";
import { getAllSolarLocationPaths } from "@/config/solar-locations-full";

const baseUrl = "https://fennor.ie";

const PRIORITY_HOME = 1;
const PRIORITY_MAIN = 0.95;
const PRIORITY_HUBS = 0.9;
const PRIORITY_LOCATIONS = 0.85;

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudySlugs = getCaseStudies().map((s) => `/case-studies/${s.slug}`);
  const solarLocationPaths = getAllSolarLocationPaths();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: PRIORITY_HOME },
    { path: "/solar", priority: PRIORITY_MAIN },
    { path: "/solar-panels-meath", priority: PRIORITY_HUBS },
    { path: "/solar-panels-louth", priority: PRIORITY_HUBS },
    { path: "/solar-panels-dublin", priority: PRIORITY_HUBS },
    { path: "/locations", priority: PRIORITY_HUBS },
    ...solarLocationPaths.map((p) => ({ path: p, priority: PRIORITY_LOCATIONS })),
    { path: "/solar-panels-virginia", priority: PRIORITY_LOCATIONS },
    { path: "/solar-panels-mullingar", priority: PRIORITY_LOCATIONS },
    { path: "/electrician-navan", priority: 0.8 },
    { path: "/electrician-trim", priority: 0.8 },
    { path: "/electrician-kells", priority: 0.8 },
    { path: "/electrician-ashbourne", priority: 0.8 },
    { path: "/electrician-drogheda", priority: 0.8 },
    { path: "/electrician-dundalk", priority: 0.8 },
    { path: "/electrician-mullingar", priority: 0.8 },
    { path: "/electrical", priority: 0.9 },
    { path: "/builders-meath", priority: 0.8 },
    { path: "/house-builders-navan", priority: 0.8 },
    { path: "/one-off-houses-meath", priority: 0.8 },
    { path: "/renovations-meath", priority: 0.8 },
    { path: "/extensions-meath", priority: 0.8 },
    { path: "/building-renovations", priority: 0.8 },
    { path: "/gallery", priority: 0.8 },
    { path: "/solar-gallery", priority: 0.8 },
    { path: "/solar-case-studies", priority: 0.8 },
    { path: "/case-studies", priority: 0.8 },
    ...caseStudySlugs.map((p) => ({ path: p, priority: 0.7 })),
    { path: "/about", priority: 0.8 },
    { path: "/referral", priority: 0.7 },
    { path: "/calculator", priority: 0.85 },
    { path: "/contact", priority: 0.9 },
    { path: "/icf-builds", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: path ? `${baseUrl}${path}` : `${baseUrl.replace(/\/$/, "")}/`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority,
  }));
}
