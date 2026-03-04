/**
 * Towns targeted for SEO (Meath, Louth, North Dublin).
 * Used for gallery image alt text – each of the ~105 gallery photos is assigned a town in round-robin
 * so search engines see keyword-rich alt text (e.g. "Solar panel installation Navan...") without
 * changing the visible gallery (photos stay plain; alt is for SEO only).
 */

import { SOLAR_LOCATIONS_FULL } from "@/config/solar-locations-full";

/** All target town names for gallery SEO alt text. Order: Meath, then Louth, then Dublin. */
export const seoTowns: string[] = SOLAR_LOCATIONS_FULL.map((loc) => loc.name);
