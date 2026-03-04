/**
 * Service areas by county for the Locations page.
 * Each town links to solar panels page, electrician page, and builders page where they exist.
 */

import { getSolarLocationsByCounty } from "@/config/solar-locations-full";

export type TownLinks = {
  name: string;
  solarHref: string;
  solarLabel: string;
  electricianHref: string;
  electricianLabel: string;
  buildersHref: string;
  buildersLabel: string;
};

export type CountyLocations = {
  county: string;
  description?: string;
  towns: TownLinks[];
};

const ELECTRICIAN_SLUGS = new Set(["navan", "trim", "kells", "ashbourne", "drogheda", "dundalk", "mullingar"]);

/** Full list of all solar towns by county – used on Locations page so every location page gets an internal link. */
export function getLocationsByCountyFull(): CountyLocations[] {
  const byCounty = getSolarLocationsByCounty();
  const result: CountyLocations[] = byCounty.map(({ county, countyLabel, towns }) => ({
    county: countyLabel,
    description: county === "Dublin" ? "Swords, Blanchardstown, Malahide, Skerries and across North County Dublin." : undefined,
    towns: towns.map((loc) => ({
      name: loc.name,
      solarHref: `/solar-panels-${loc.slug}`,
      solarLabel: `Solar Panels ${loc.name}`,
      electricianHref: ELECTRICIAN_SLUGS.has(loc.slug) ? `/electrician-${loc.slug}` : "/electrical",
      electricianLabel: ELECTRICIAN_SLUGS.has(loc.slug) ? `Electrician ${loc.name}` : "Electrical services",
      buildersHref: county === "Meath" ? (loc.slug === "navan" ? "/house-builders-navan" : "/builders-meath") : "/building-renovations",
      buildersLabel: county === "Meath" ? (loc.slug === "navan" ? "Builders Navan" : "Builders Meath") : "Building & Renovations",
    })),
  }));
  result.push(
    { county: "Westmeath", description: "Mullingar and across Co. Westmeath.", towns: [{ name: "Mullingar", solarHref: "/solar-panels-mullingar", solarLabel: "Solar Panels Mullingar", electricianHref: "/electrician-mullingar", electricianLabel: "Electrician Mullingar", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" }] },
    { county: "Cavan", description: "Virginia and across the region.", towns: [{ name: "Virginia", solarHref: "/solar-panels-virginia", solarLabel: "Solar Panels Virginia", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" }] },
  );
  return result;
}

export const LOCATIONS_BY_COUNTY: CountyLocations[] = [
  {
    county: "Meath",
    description: "Navan, Trim, Kells, Slane and across Co. Meath.",
    towns: [
      { name: "Navan", solarHref: "/solar-panels-navan", solarLabel: "Solar Panels Navan", electricianHref: "/electrician-navan", electricianLabel: "Electrician Navan", buildersHref: "/house-builders-navan", buildersLabel: "Builders Navan" },
      { name: "Trim", solarHref: "/solar-panels-trim", solarLabel: "Solar Panels Trim", electricianHref: "/electrician-trim", electricianLabel: "Electrician Trim", buildersHref: "/builders-meath", buildersLabel: "Builders Meath" },
      { name: "Kells", solarHref: "/solar-panels-kells", solarLabel: "Solar Panels Kells", electricianHref: "/electrician-kells", electricianLabel: "Electrician Kells", buildersHref: "/builders-meath", buildersLabel: "Builders Meath" },
      { name: "Slane", solarHref: "/solar-panels-slane", solarLabel: "Solar Panels Slane", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/builders-meath", buildersLabel: "Builders Meath" },
      { name: "Ashbourne", solarHref: "/solar-panels-ashbourne", solarLabel: "Solar Panels Ashbourne", electricianHref: "/electrician-ashbourne", electricianLabel: "Electrician Ashbourne", buildersHref: "/builders-meath", buildersLabel: "Builders Meath" },
      { name: "Dunshaughlin", solarHref: "/solar-panels-dunshaughlin", solarLabel: "Solar Panels Dunshaughlin", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/builders-meath", buildersLabel: "Builders Meath" },
      { name: "Ratoath", solarHref: "/solar-panels-ratoath", solarLabel: "Solar Panels Ratoath", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/builders-meath", buildersLabel: "Builders Meath" },
      { name: "Oldcastle", solarHref: "/solar-panels-oldcastle", solarLabel: "Solar Panels Oldcastle", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/builders-meath", buildersLabel: "Builders Meath" },
      { name: "Meath (county)", solarHref: "/solar-panels-meath", solarLabel: "Solar Panels Meath", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/builders-meath", buildersLabel: "Builders Meath" },
    ],
  },
  {
    county: "Louth",
    description: "Drogheda, Dundalk, Ardee and across Co. Louth.",
    towns: [
      { name: "Drogheda", solarHref: "/solar-panels-drogheda", solarLabel: "Solar Panels Drogheda", electricianHref: "/electrician-drogheda", electricianLabel: "Electrician Drogheda", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" },
      { name: "Dundalk", solarHref: "/solar-panels-dundalk", solarLabel: "Solar Panels Dundalk", electricianHref: "/electrician-dundalk", electricianLabel: "Electrician Dundalk", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" },
      { name: "Ardee", solarHref: "/solar-panels-ardee", solarLabel: "Solar Panels Ardee", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" },
      { name: "Louth (county)", solarHref: "/solar-panels-louth", solarLabel: "Solar Panels Louth", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" },
    ],
  },
  {
    county: "Westmeath",
    description: "Mullingar and across Co. Westmeath.",
    towns: [
      { name: "Mullingar", solarHref: "/solar-panels-mullingar", solarLabel: "Solar Panels Mullingar", electricianHref: "/electrician-mullingar", electricianLabel: "Electrician Mullingar", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" },
    ],
  },
  {
    county: "Cavan",
    description: "Virginia and across the region.",
    towns: [
      { name: "Virginia", solarHref: "/solar-panels-virginia", solarLabel: "Solar Panels Virginia", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" },
    ],
  },
  {
    county: "Dublin commuter belt",
    description: "Blanchardstown, Lucan, Leixlip and the greater Dublin commuter area.",
    towns: [
      { name: "Blanchardstown", solarHref: "/solar-panels-blanchardstown", solarLabel: "Solar Panels Blanchardstown", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" },
      { name: "Lucan", solarHref: "/solar-panels-lucan", solarLabel: "Solar Panels Lucan", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" },
      { name: "Leixlip", solarHref: "/solar-panels-leixlip", solarLabel: "Solar Panels Leixlip", electricianHref: "/electrical", electricianLabel: "Electrical services", buildersHref: "/building-renovations", buildersLabel: "Building & Renovations" },
    ],
  },
];
