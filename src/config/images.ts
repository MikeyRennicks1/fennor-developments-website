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
/** Builds secondary – site/build-focused image (non-snow, Irish-appropriate look) */
export const BUILDS_SECTION_BUILD = BUILDS_HERO;
// Building & renovations: use the latest local “house” photo
export const BUILDS_SECTION_HOME_EXT = "/images/build-renovations-house.png";

/** Electrical – Professional electrician at domestic consumer unit, clean wiring, neutral tones (Pexels) */
export const ELECTRICAL_HERO =
  "https://images.pexels.com/photos/5090652/pexels-photo-5090652.jpeg?auto=compress&cs=tinysrgb&w=2560&q=92";
/** Electrical section 1 – Real Fennor consumer unit installation photo */
export const ELECTRICAL_SECTION_1 = "/images/electrical-section-1.png";
/** Electrical section 2 – Real Fennor consumer unit panel photo */
export const ELECTRICAL_SECTION_2 = "/images/electrical-section-2.png";

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

/**
 * Homepage hero – "our building" / main hero image.
 * Put your image at public/images/hero-home.jpg (replace file to change it).
 * Recommended: 2560px wide or larger, high quality JPG.
 */
/** Homepage – house + keys style (Unsplash) */
export const HOME_HERO = hero("1560518883-ce09059eeffa");
