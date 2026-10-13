export const farmSources = {
  scis: 'https://www.gov.ie/en/department-of-agriculture-food-and-the-marine/services/solar-capital-investment-scheme/',
  terms: 'https://assets.gov.ie/static/documents/b9476535/Tams_3_Solar_Terms_and_Conditions_20_June_2026_1.pdf',
  tamsPlanning: 'https://teagasc.ie/news--events/daily/tams-3-plan-the-investment-not-just-the-grant/',
  updates: 'https://www.gov.ie/en/department-of-agriculture-food-and-the-marine/press-releases/minister-heydon-confirms-application-of-ranking-and-selection-to-tams-3-tranche-10/',
  dairyResearch: 'https://teagasc.ie/animals/dairy/dairy-levy-research/energy-and-milking-efficiency/',
  solarGuide: 'https://teagasc.ie/publications/a-solar-energy-guide-for-dairy-farms/',
  seasonalStudy: 'https://teagasc.ie/about/research--innovation/research-publications/tresearch-articles/milking-solar-power/',
  seai: 'https://www.seai.ie/grants/business-grants/commercial-solar-pv',
  networks: 'https://www.esbnetworks.ie/services/get-connected/renewable-connection',
};

export const farmProfiles = [
  { id: 'dairy', name: 'Dairy', title: 'Put the milking day in the picture.', loads: ['Milk cooling', 'Hot water', 'Milking & pumps'], insight: 'Early milking starts before strong solar output. Cooling and other daytime loads can offer a better overlap; evening demand needs its own assessment.', season: 'Spring-calving demand can align with brighter months. Winter-calving needs a different seasonal model.', question: 'We use your milking times, bulk-tank details and a full year of electricity use to assess the fit.', levels: [18, 90, 45, 34, 44, 95, 28, 18] },
  { id: 'housing', name: 'Pigs & poultry', title: 'Look for the loads that keep running.', loads: ['Ventilation', 'Feeding systems', 'Electric heating & lighting'], insight: 'Continuous electrical loads may use solar as it is generated. Batch cycles, ventilation controls and heating fuel all change the opportunity.', season: 'Summer ventilation and winter heating do not follow the same pattern. We assess each building and production cycle separately.', question: 'We use controller schedules, batch information and separate electrical and fuel bills to explain where solar could contribute.', levels: [58, 60, 65, 78, 85, 74, 65, 60] },
  { id: 'tillage', name: 'Tillage & grain', title: 'A busy harvest is not a full-year load.', loads: ['Grain handling', 'Drying fans', 'Workshop & storage'], insight: 'Large roofs can be useful, but the right array depends on demand outside harvest as well. Solar electricity does not directly replace oil or gas used for drying.', season: 'We account for when electric fans and handling equipment run, including evening work and quieter months.', question: 'We assess harvest-period bills alongside the rest of the year—not just the peak month.', levels: [12, 15, 35, 75, 85, 78, 55, 18] },
  { id: 'livestock', name: 'Beef & sheep', title: 'Make the system fit the actual demand.', loads: ['Water pumps', 'Lighting', 'Handling & workshop'], insight: 'A large shed does not necessarily mean a large electricity bill. A modest system may be a better starting point if daytime demand is low.', season: 'Winter housing and summer grazing can shift electricity use away from the brightest months.', question: 'We identify farm and home consumption separately, with your adviser confirming the demand basis for the funding application.', levels: [12, 48, 28, 20, 25, 58, 36, 12] },
] as const;

// Gross annual energy value only: no battery model, grant, tax or payback inference.
export function farmEnergyValue(generation: number, selfUsePercent: number, importCents: number, exportCents: number) {
  if (![generation, selfUsePercent, importCents, exportCents].every(Number.isFinite)
    || generation < 1 || generation > 1000000 || selfUsePercent < 0 || selfUsePercent > 100
    || importCents < 0 || importCents > 200 || exportCents < 0 || exportCents > 200) return null;
  const used = generation * selfUsePercent / 100;
  const exported = generation - used;
  const avoidedImport = used * importCents / 100;
  const exportValue = exported * exportCents / 100;
  return { used, exported, avoidedImport, exportValue, total: avoidedImport + exportValue };
}

export const farmQuestions = [
  { q: 'Can I put solar panels on an existing farm shed?', a: 'Potentially. Fennor arranges assessment of the roof covering, structure, fixings, shading and safe maintenance access before a layout is agreed. Rooflights and ventilation must remain functional. Suspected asbestos needs specialist assessment; do not disturb it or climb onto a fragile roof. Ground-level photographs are enough for an initial conversation.', href: '#farm-roof', link: 'What we check on the farm' },
  { q: 'Is the TAMS solar grant 60% of my quotation?', a: 'Not automatically. SCIS supports approved eligible expenditure at 60%, within its investment ceiling. The grant calculation is subject to DAFM reference costs, eligible paid costs excluding VAT and the submitted application cost. Ranking and selection means an application is not an approval. Fennor explains the full installation price, while your adviser establishes the eligible grant calculation. You can see the funding gap before committing.', href: farmSources.tamsPlanning, link: 'Teagasc’s October 2026 funding guidance' },
  { q: 'Can I use TAMS and SEAI grants for the same solar installation?', a: 'Do not assume that you can combine them. They are separate funding routes with restrictions on other public funding. Fennor explains the technical proposal and available routes; your farm adviser and the administering body establish the appropriate application before you commit to the investment.', href: '#farm-grants', link: 'Compare the two routes' },
  { q: 'Can the farmhouse be included in a new TAMS solar application?', a: 'DAFM’s 2026 announcement restricts new solar support to on-farm energy consumption. We do not include dwelling demand when sizing a new farm application. If the house and farm share a meter, your adviser establishes the separate usage for the application, supported by the technical proposal. Home solar has a separate SEAI route.', href: farmSources.updates, link: 'Read DAFM’s on-farm demand update' },
  { q: 'Will solar run the milking parlour during a power cut?', a: 'Ordinary grid-connected solar is not backup power. A battery alone is not a guarantee either. Essential loads need a separately designed backup arrangement with compatible equipment, safe isolation and sufficient power and capacity. Keep your existing contingency plan until a qualified contractor has confirmed the design.', href: '/solar/battery-storage', link: 'Understand storage and backup' },
  { q: 'Should I add a battery or heat water with surplus solar?', a: 'Fennor compares the options against your actual surplus and load timing. Batteries add cost and losses. Hot-water control must preserve the temperatures and timing needed for dairy hygiene; do not alter wash routines just to use solar. We explain direct daytime use, suitable storage and export without counting the same electricity twice.', href: '/solar/accessories#eddi', link: 'Explore hot-water diversion' },
  { q: 'Can I get paid for electricity exported from the farm?', a: 'Potentially, subject to the connection, metering and supplier’s export arrangements. Fennor explains the proposed connection and export limits; your electricity supplier confirms its export tariff. We do not base your investment case on an assumed guaranteed rate. The value explorer lets you enter your own rate, including zero.', href: farmSources.networks, link: 'Check the network connection route' },
  { q: 'Does farm solar need planning permission?', a: 'Some rooftop installations may qualify for an exemption, but conditions and site restrictions still apply. Protected structures, safeguarding zones, ground-mounted arrays and associated works can require additional checks. Fennor identifies the planning questions for your site, with the planning authority confirming the position before you commit.', href: farmSources.solarGuide, link: 'Read Teagasc’s solar guide' },
] as const;
