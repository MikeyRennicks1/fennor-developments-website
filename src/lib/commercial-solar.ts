export const commercialSources = {
  grant: 'https://www.seai.ie/grants/business-grants/commercial-solar-pv',
  guide: 'https://www.seai.ie/sites/default/files/grants/business-grants/commercial-solar-pv/Non-Domestic-Microgen-Scheme-Application-Guide.pdf',
  terms: 'https://www.seai.ie/sites/default/files/grants/business-grants/commercial-solar-pv/Non-Domestic-Microgen-Scheme-Terms-and-Conditions.pdf',
  networks: 'https://www.esbnetworks.ie/services/get-connected/renewable-connection',
};

// Cumulative NDMG bands verified 9 October 2026 against SEAI's v1.5 guide (30 September 2026).
// This is a size-based ceiling, not an eligibility decision or a grant offer.
export function commercialGrantCeiling(kwp: number): number {
  if (!Number.isFinite(kwp) || kwp < 1) return 0;
  const size = Math.min(kwp, 1000);
  return Math.round((Math.min(size, 2) * 1800
    + Math.max(0, Math.min(size - 2, 2)) * 600
    + Math.max(0, Math.min(size - 6, 14)) * 600
    + Math.max(0, Math.min(size - 20, 180)) * 400
    + Math.max(0, size - 200) * 300) * 100) / 100;
}
export const euro = (value: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export const businessProfiles = [
  { id: 'daytime', name: 'Office & retail', hours: 'A daytime working pattern', values: [8,8,8,15,75,90,80,90,70,15,10,8,8], insight: 'Solar that follows your opening hours.', detail: 'Weekday demand can overlap with daylight. We account for quiet Sundays and holiday closures as well, so the model does not treat every day as a full working day.' },
  { id: 'extended', name: 'Workshop & production', hours: 'An extended working pattern', values: [35,35,40,60,85,92,90,85,80,65,45,35,35], insight: 'The everyday loads behind the peaks.', detail: 'Fennor uses machinery schedules, refrigeration and ventilation demand to assess the opportunity. We separate a short start-up peak from loads that run throughout your working day.' },
  { id: 'evening', name: 'Hospitality & evening', hours: 'A later working pattern', values: [15,12,12,15,20,25,30,50,85,95,85,55,20], insight: 'A busy evening is not a sunny midday.', detail: 'We assess preparation, cooling and daytime services alongside later demand. Storage may help shift electricity, but we compare its cost and losses before including it as an investment option.' },
] as const;
