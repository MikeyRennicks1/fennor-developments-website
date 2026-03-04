#!/usr/bin/env node
/**
 * Generates static Next.js page files for solar location landing pages.
 * URL format: /solar-panels-[slug] (e.g. /solar-panels-enfield)
 * Run: node scripts/generate-solar-location-pages.js
 * Skips slugs that already have a dedicated static page (SOLAR_LOCATIONS_WITH_STATIC_PAGE).
 */

const fs = require("fs");
const path = require("path");

const SOLAR_LOCATIONS_WITH_STATIC_PAGE = new Set([
  "meath", "navan", "trim", "kells", "ashbourne", "dunshaughlin", "ratoath", "oldcastle", "slane",
  "louth", "drogheda", "dundalk", "ardee", "virginia", "mullingar", "blanchardstown", "lucan", "leixlip",
]);

const MEATH = [
  "navan", "trim", "kells", "ashbourne", "dunshaughlin", "ratoath", "enfield", "athboy", "oldcastle", "slane",
  "duleek", "stamullen", "donore", "bettystown", "laytown", "mornington", "julianstown", "ballivor", "summerhill", "longwood",
  "nobber", "carlanstown", "kilmainhamwood", "castletown", "crossakiel", "drumconrath", "kilskyre", "clonmellon", "moynalty", "bohermeen",
  "kilmessan", "bective", "dunsany", "kentstown", "ardcath", "skryne", "gormanston", "kilcock", "dunboyne", "clonee",
  "mulhussey", "bellewstown", "wilkinstown", "drumree", "robinstown", "fordstown", "carnaross", "lobinstown", "ballinlough", "delvin",
];
const LOUTH = [
  "drogheda", "dundalk", "ardee", "dunleer", "collon", "termonfeckin", "blackrock", "carlingford", "greenore", "annagassan",
  "castlebellingham", "clogherhead", "tallanstown", "knockbridge", "louth-village", "omeath", "riverstown", "lordship", "dromiskin", "stabannon",
  "monasterboice", "tinure", "grangebellew", "ballapousta", "gyles-quay", "jenkinstown", "faughart", "kilkerley", "maddoxland", "bellurgan",
  "whitestown", "reaghstown", "chanonrock", "tullyallen", "ravensdale",
];
const DUBLIN = [
  "balbriggan", "skerries", "rush", "lusk", "swords", "donabate", "portrane", "malahide", "portmarnock", "kinsealy",
  "baldoyle", "sutton", "howth", "clongriffin", "donaghmede", "raheny", "coolock", "artane", "santry", "beaumont",
  "whitehall", "finglas", "glasnevin", "drumcondra", "cabra", "phibsborough", "blanchardstown", "clonsilla", "castleknock", "ongar",
  "mulhuddart", "tyrrelstown", "hollystown",
];

function toName(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const LOCATIONS = [
  ...MEATH.map((slug) => ({ slug, name: toName(slug), county: "Meath" })),
  ...LOUTH.map((slug) => ({ slug, name: toName(slug), county: "Louth" })),
  ...DUBLIN.map((slug) => ({ slug, name: toName(slug), county: "Dublin" })),
];

const root = path.join(__dirname, "..");
const appDir = path.join(root, "src", "app");

function generatePageContent(loc) {
  const title = `Solar Panels ${loc.name} | Solar PV Installation ${loc.county} | Fennor`;
  const description = `Professional solar panel installation in ${loc.name} and surrounding areas. SEAI grant supported solar PV systems installed by Fennor.`;
  const builders = loc.county === "Meath" ? 'buildersAnchorText="builders Meath" renovationsAnchorText="house renovations Meath"' : 'buildersAnchorText="building and renovations"';
  return `import type { Metadata } from "next";
import { getSolarLocationBySlug } from "@/config/solar-locations-full";
import { SolarLocationLayout } from "@/components/solar/SolarLocationLayout";
import { SolarLocationTemplateContent, buildFaq, getRelatedTownLinks } from "@/components/solar/SolarLocationTemplateContent";

export const metadata: Metadata = {
  title: "${title}",
  description: "${description}",
};

export default function SolarPanels${loc.name.replace(/\s|-/g, "")}Page() {
  const location = getSolarLocationBySlug("${loc.slug}");
  if (!location) return null;
  const faq = buildFaq(location);
  const relatedTownLinks = getRelatedTownLinks(location);
  return (
    <SolarLocationLayout
      headline={\`Solar Panel Installation in \${location.name}\`}
      subline={\`Solar PV installation in \${location.name}. SEAI registered. Free quote.\`}
      faq={faq}
      contactAnchorText={\`solar panels \${location.name}\`}
      electricalAnchorText={\`electrician \${location.name}\`}
      ${builders}
      relatedTownLinks={relatedTownLinks}
    >
      <SolarLocationTemplateContent location={location} />
    </SolarLocationLayout>
  );
}
`;
}

let created = 0;
for (const loc of LOCATIONS) {
  if (SOLAR_LOCATIONS_WITH_STATIC_PAGE.has(loc.slug)) continue;
  const dir = path.join(appDir, `solar-panels-${loc.slug}`);
  fs.mkdirSync(dir, { recursive: true });
  const pagePath = path.join(dir, "page.tsx");
  fs.writeFileSync(pagePath, generatePageContent(loc), "utf8");
  created++;
}
console.log(`Created ${created} location pages under src/app/solar-panels-[slug]/page.tsx`);
process.exit(0);
