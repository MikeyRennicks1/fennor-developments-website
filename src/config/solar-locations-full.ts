/**
 * Full list of towns for solar location landing pages.
 * Used by sitemap, solar page internal links, and static page generation.
 * URL format: /solar-panels-[slug]
 */

export type SolarLocation = {
  slug: string;
  name: string;
  county: "Meath" | "Louth" | "Dublin";
  /** Slugs of nearby towns for related links (same or adjacent area) */
  neighbourSlugs: string[];
};

const MEATH: string[] = [
  "navan", "trim", "kells", "ashbourne", "dunshaughlin", "ratoath", "enfield", "athboy", "oldcastle", "slane",
  "duleek", "stamullen", "donore", "bettystown", "laytown", "mornington", "julianstown", "ballivor", "summerhill", "longwood",
  "nobber", "carlanstown", "kilmainhamwood", "castletown", "crossakiel", "drumconrath", "kilskyre", "clonmellon", "moynalty", "bohermeen",
  "kilmessan", "bective", "dunsany", "kentstown", "ardcath", "skryne", "gormanston", "kilcock", "dunboyne", "clonee",
  "mulhussey", "bellewstown", "wilkinstown", "drumree", "robinstown", "fordstown", "carnaross", "lobinstown", "ballinlough", "delvin",
];

const LOUTH: string[] = [
  "drogheda", "dundalk", "ardee", "dunleer", "collon", "termonfeckin", "blackrock", "carlingford", "greenore", "annagassan",
  "castlebellingham", "clogherhead", "tallanstown", "knockbridge", "louth-village", "omeath", "riverstown", "lordship", "dromiskin", "stabannon",
  "monasterboice", "tinure", "grangebellew", "ballapousta", "gyles-quay", "jenkinstown", "faughart", "kilkerley", "maddoxland", "bellurgan",
  "whitestown", "reaghstown", "chanonrock", "tullyallen", "ravensdale",
];

const DUBLIN: string[] = [
  "balbriggan", "skerries", "rush", "lusk", "swords", "donabate", "portrane", "malahide", "portmarnock", "kinsealy",
  "baldoyle", "sutton", "howth", "clongriffin", "donaghmede", "raheny", "coolock", "artane", "santry", "beaumont",
  "whitehall", "finglas", "glasnevin", "drumcondra", "cabra", "phibsborough", "blanchardstown", "clonsilla", "castleknock", "ongar",
  "mulhuddart", "tyrrelstown", "hollystown",
];

/** Build neighbour list: same-county towns that are adjacent in the list (max 4). */
function neighbours(slugs: string[], index: number, count: number = 4): string[] {
  const out: string[] = [];
  const start = Math.max(0, index - 2);
  const end = Math.min(slugs.length, start + count);
  for (let i = start; i < end && out.length < count; i++) {
    if (i !== index) out.push(slugs[i]);
  }
  return out;
}

function toName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const SOLAR_LOCATIONS_FULL: SolarLocation[] = [
  ...MEATH.map((slug, i) => ({
    slug,
    name: toName(slug),
    county: "Meath" as const,
    neighbourSlugs: neighbours(MEATH, i),
  })),
  ...LOUTH.map((slug, i) => ({
    slug,
    name: toName(slug),
    county: "Louth" as const,
    neighbourSlugs: neighbours(LOUTH, i),
  })),
  ...DUBLIN.map((slug, i) => ({
    slug,
    name: toName(slug),
    county: "Dublin" as const,
    neighbourSlugs: neighbours(DUBLIN, i),
  })),
];

/** Slugs that have a dedicated static page (custom content). These are not generated from template. */
export const SOLAR_LOCATIONS_WITH_STATIC_PAGE = new Set([
  "meath", "navan", "trim", "kells", "ashbourne", "dunshaughlin", "ratoath", "oldcastle", "slane",
  "louth", "drogheda", "dundalk", "ardee", "virginia", "mullingar", "blanchardstown", "lucan", "leixlip",
]);

/** All solar location paths for sitemap and internal linking. */
export function getAllSolarLocationPaths(): string[] {
  return SOLAR_LOCATIONS_FULL.map((loc) => `/solar-panels-${loc.slug}`);
}

export function getSolarLocationBySlug(slug: string): SolarLocation | undefined {
  return SOLAR_LOCATIONS_FULL.find((l) => l.slug === slug);
}

/** Group all locations by county for hub pages and locations directory. */
export function getSolarLocationsByCounty(): { county: string; countyLabel: string; towns: SolarLocation[] }[] {
  const byCounty: Record<string, SolarLocation[]> = { Meath: [], Louth: [], Dublin: [] };
  for (const loc of SOLAR_LOCATIONS_FULL) {
    byCounty[loc.county].push(loc);
  }
  return [
    { county: "Meath", countyLabel: "Co. Meath", towns: byCounty.Meath },
    { county: "Louth", countyLabel: "Co. Louth", towns: byCounty.Louth },
    { county: "Dublin", countyLabel: "North County Dublin", towns: byCounty.Dublin },
  ];
}
