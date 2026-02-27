/**
 * Central image config – Irish-focused, 4K-ready imagery.
 * Heroes: w=2560&q=92. Section images: w=1200&q=90.
 *
 * IMPORTANT: Replace these with real Irish project photography (Boyne Valley,
 * Irish builds, slate solar, consumer units, on-site handshakes) for maximum
 * credibility. Current URLs are thematic placeholders.
 */

const base = "https://images.unsplash.com/photo-";
const hero = (id: string) => `${base}${id}?w=2560&q=92`;
const section = (id: string) => `${base}${id}?w=1200&q=90`;

/** About – Boyne-style river / green valley, 4K (Pexels) */
export const ABOUT_HERO =
  "https://images.pexels.com/photos/15305646/pexels-photo-15305646.jpeg?auto=compress&cs=tinysrgb&w=3840&q=92";

/** Builds – Modern Irish one-off under construction / building site with scaffolding (Pexels) */
export const BUILDS_HERO =
  "https://images.pexels.com/photos/14367421/pexels-photo-14367421.jpeg?auto=compress&cs=tinysrgb&w=2560&q=92";
/** Builds secondary – White Irish one-off home, modern, premium finish, natural lighting (Pexels) */
export const BUILDS_SECTION_BUILD =
  "https://images.pexels.com/photos/7031411/pexels-photo-7031411.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90";
export const BUILDS_SECTION_HOME_EXT = section("1600596542815-ffad4c1549e9");

/** Electrical – Professional electrician at domestic consumer unit, clean wiring, neutral tones (Pexels) */
export const ELECTRICAL_HERO =
  "https://images.pexels.com/photos/5090652/pexels-photo-5090652.jpeg?auto=compress&cs=tinysrgb&w=2560&q=92";
/** Electrical section 1 – Electrician at consumer unit, clean wiring, modern board, residential (Pexels) */
export const ELECTRICAL_SECTION_1 =
  "https://images.pexels.com/photos/9875418/pexels-photo-9875418.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90";
/** Electrical section 2 – Wide interior, completed home, modern living space, natural daylight, premium finish (Pexels) */
export const ELECTRICAL_SECTION_2 =
  "https://images.pexels.com/photos/6077368/pexels-photo-6077368.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90";

/** Solar – Rural solar farm, photorealistic 4K (Pexels 9893729: solar farm sunny day) */
export const SOLAR_HERO =
  "https://images.pexels.com/photos/9893729/pexels-photo-9893729.jpeg?auto=compress&cs=tinysrgb&w=3840&q=92";
export const SOLAR_INVERTER = section("1625726411847-8a5edd346208");

/** Calculator – Close-up calculator on desk, warm light, professional energy feel (Pexels) */
export const CALCULATOR_HERO =
  "https://images.pexels.com/photos/5915236/pexels-photo-5915236.jpeg?auto=compress&cs=tinysrgb&w=2560&q=92";

/** Referral – Handshake on-site, natural, Irish/construction backdrop */
export const REFERRAL_HERO = hero("1521791136064-7986c2920216");

/** Contact – Slane / Meath landscape, cohesive with About (Pexels) */
export const CONTACT_HERO =
  "https://images.pexels.com/photos/15305646/pexels-photo-15305646.jpeg?auto=compress&cs=tinysrgb&w=2560&q=92";

/** Homepage – Irish residential solar / premium energy */
export const HOME_HERO = hero("1560518883-ce09059eeffa");
