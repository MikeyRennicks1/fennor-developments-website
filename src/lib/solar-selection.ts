export type SolarSelection = { panels: number; watts: number; battery: boolean; eddi: boolean; ev: boolean };
export const defaultSelection: SolarSelection = { panels: 12, watts: 440, battery: false, eddi: false, ev: false };
export function readSelection(params: URLSearchParams): SolarSelection {
  const panels = Number(params.get('panels'));
  const watts = Number(params.get('watts'));
  return { panels: Number.isInteger(panels) && panels >= 8 && panels <= 20 ? panels : 12, watts: [400, 420, 440, 460, 480].includes(watts) ? watts : 440, battery: params.get('battery') === '1', eddi: params.get('eddi') === '1', ev: params.get('ev') === '1' };
}
export function selectionQuery(value: SolarSelection) {
  return new URLSearchParams({ panels: String(value.panels), watts: String(value.watts), battery: value.battery ? '1' : '0', eddi: value.eddi ? '1' : '0', ev: value.ev ? '1' : '0' }).toString();
}
export function selectionSummary(value: SolarSelection) {
  return `${value.panels} panels at an assumed ${value.watts} W (${(value.panels * value.watts / 1000).toFixed(2)} kWp nominal capacity). Battery: ${value.battery ? 'interested' : 'not selected'}. EDDI: ${value.eddi ? 'interested' : 'not selected'}. EV charger: ${value.ev ? 'interested' : 'not selected'}. Illustrative preferences, subject to assessment.`;
}
