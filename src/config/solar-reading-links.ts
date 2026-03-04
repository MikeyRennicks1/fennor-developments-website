/**
 * External reading links shown under "What we install" on the solar page.
 * Use authoritative, helpful sources (SEAI, Citizens Information, etc.) to support
 * users and signal topical relevance for SEO. Add or edit links here.
 */

export type SolarReadingLink = {
  title: string;
  url: string;
  description: string;
  /** Optional: e.g. "SEAI" or "Citizens Information" for display */
  siteName?: string;
};

export const SOLAR_READING_LINKS: SolarReadingLink[] = [
  {
    title: "Solar PV – how it works and grants",
    url: "https://www.seai.ie/grants/home-energy-grants/solar-electricity-grant/",
    description: "Official SEAI guide to solar electricity and grant eligibility.",
    siteName: "SEAI",
  },
  {
    title: "Solar panels and home energy",
    url: "https://www.citizensinformation.ie/en/housing/energy-efficiency/solar-panels/",
    description: "Citizens Information overview of solar panels and supports.",
    siteName: "Citizens Information",
  },
  {
    title: "Benefits of solar electricity",
    url: "https://www.seai.ie/home-energy/solar-electricity/",
    description: "Why solar PV helps cut bills and carbon – from SEAI.",
    siteName: "SEAI",
  },
  {
    title: "How a full solar setup works – panels, inverter and your home",
    url: "https://energysavingtrust.org.uk/advice/solar-panels/",
    description: "Independent guide to the whole system: from panels on the roof to the inverter and your meter.",
    siteName: "Energy Saving Trust",
  },
];
