export const batterySources = {
  grant: 'https://www.seai.ie/grants/home-energy-grants/individual-grants/battery',
  pv: 'https://www.seai.ie/grants/home-energy-grants/individual-grants/solar-electricity-grant',
  backup: 'https://www.seai.ie/blog/solar-panels-power-cut',
  solar: 'https://www.seai.ie/renewable-energy/solar-energy/electricity-from-solar',
  independent: 'https://energysavingtrust.org.uk/advice/battery-storage/',
  buying: 'https://www.seai.ie/blog/five-questions-irish-homeowners-should-ask',
  huawei: 'https://solar.huawei.com/en/products/luna2000-5-10-15-s0/',
  datasheet: 'https://solar.huawei.com/download?p=%2F-%2Fmedia%2FSolar%2Fattachment%2Fpdf%2Feu%2Fdatasheet%2FLUNA2000-5_10_15-S0.pdf',
};

// A single illustrative charge/discharge event, not annual savings or payback.
// Input energy is measured before losses. All delivered energy must replace imports.
export function batteryShiftValue(input: number, efficiency: number, importCents: number, alternativeCents: number) {
  if (![input, efficiency, importCents, alternativeCents].every(Number.isFinite) || input < 0.1 || input > 50 || efficiency < 50 || efficiency > 100 || importCents < 0 || importCents > 200 || alternativeCents < 0 || alternativeCents > 200) return null;
  const delivered = input * efficiency / 100;
  const avoided = delivered * importCents / 100;
  const alternative = input * alternativeCents / 100;
  return { delivered, losses: input - delivered, avoided, alternative, difference: avoided - alternative };
}

export const batteryQuestions = [
  {q:'Can I add a battery to solar panels I already have?', a:'Often, but compatibility comes first. Fennor identifies your inverter and existing equipment, using system paperwork and usage data where available. We explain what can stay, any equipment changes and who supports the combined system before you choose.'},
  {q:'Does a 5 kW inverter mean I have a 5 kWh battery?', a:'No. kW is power: the rate of supplying electricity. kWh is energy: the amount stored. A larger battery may run suitable loads for longer without increasing the inverter’s output limit. We explain both figures in your proposal, including the limits that apply in backup mode.'},
  {q:'Is a bigger battery always better?', a:'No. Capacity that rarely fills or rarely discharges may add cost without useful value. Fennor compares your spare solar, evening demand and charging tariff across different seasons. Meter data helps us explain whether extra capacity would be useful or simply add to the price.'},
  {q:'Can a battery help without solar panels?', a:'A compatible system can charge from the grid during a lower-priced tariff period. The price difference must cover storage losses and other costs. We compare the whole tariff, charging window and equipment settings with you—not just the cheapest advertised unit rate.'},
  {q:'What happens when the battery is full or empty?', a:'At the configured upper limit, charging stops. Solar surplus may go to other loads or export, subject to settings and connection limits. At the minimum reserve, discharge stops; in normal grid-connected operation, the grid can supply the remaining demand. During an outage, supported loads stop if backup energy runs out.'},
  {q:'Can a home battery charge my EV or run a heat pump?', a:'It may contribute, but those loads can be substantial. We assess simultaneous power demand, energy required, inverter limits and control priorities before recommending how those loads fit into your system. Charging an EV directly from available solar or an appropriate grid tariff may make more sense than passing that electricity through a house battery.'},
  {q:'How much does battery storage cost?', a:'Fennor assesses your existing setup and what you want storage to do, then explains an installed quote covering any inverter changes, controls, electrical work, backup provision, VAT and support. You can review the extra cost alongside a solar-only option. The examples on this page are not equipment prices or a payback forecast.'},
  {q:'Is the battery grant the same as the solar grant?', a:'No. SEAI’s battery support has separate conditions. The current amounts and key requirements are set out in the grant section below. Fennor explains the application steps and required contractor inputs; SEAI determines eligibility and must issue the offer before work starts.'},
];
