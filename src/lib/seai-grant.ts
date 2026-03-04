/**
 * SEAI domestic solar PV grant calculation (Ireland).
 * Source: https://www.seai.ie/grants/home-energy-grants/solar-electricity-grant/
 * - €700 per kWp for the first 2 kWp
 * - €200 per kWp for each additional kWp from 2 kWp up to 4 kWp
 * - Maximum grant €1,800 (for 4 kWp or larger)
 */

const RATE_FIRST_2_KWP = 700;
const RATE_2_TO_4_KWP = 200;
const MAX_GRANT = 1800;

/** Returns SEAI grant amount in euros for a given system size in kWp. */
export function getSeaiGrantAmount(kWp: number): number {
  if (kWp <= 0) return 0;
  if (kWp <= 2) return Math.round(kWp * RATE_FIRST_2_KWP);
  if (kWp <= 4) return Math.round(2 * RATE_FIRST_2_KWP + (kWp - 2) * RATE_2_TO_4_KWP);
  return MAX_GRANT;
}

export const SEAI_GRANT_MAX = MAX_GRANT;
