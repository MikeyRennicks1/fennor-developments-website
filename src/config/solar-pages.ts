export const solarLinks = [
  { slug: 'domestic', label: 'Domestic Solar', summary: 'Solar for your home, shaped around your roof and daily electricity use.' },
  { slug: 'commercial', label: 'Commercial', summary: 'On-site generation planned around your business’s operating hours and demand.' },
  { slug: 'farm', label: 'Farm', summary: 'Explore farm buildings, seasonal demand and the right funding route.' },
  { slug: 'battery-storage', label: 'Battery Storage', summary: 'Understand storage, sizing and the difference between a battery and backup.' },
  { slug: 'accessories', label: 'Accessories', summary: 'Explore EDDI hot-water diversion and useful additions to a solar system.' },
  { slug: 'ground-mounted', label: 'Ground Mounted', summary: 'An alternative when suitable land offers more potential than your roof.' },
  { slug: 'calculator', label: 'Solar Calculator', summary: 'Explore panel count and system capacity before a site-specific assessment.' },
  { slug: 'cost', label: 'Solar Panel Costs', summary: 'Understand what shapes an installed price and how to compare quotations.' },
  { slug: 'grants-funding', label: 'Grants & Funding', summary: 'Understand the support that may fit your home, business or farm, with Fennor guiding the next steps.' },
  { slug: 'projects-case-studies', label: 'Projects & Case Studies', summary: 'Understand the details that make a solar project relevant to your property.' },
  { slug: 'faq-advice', label: 'FAQ & Advice', summary: 'Clear answers on roof suitability, batteries, installation and your next steps.' },
] as const;

type Section = { heading: string; text: string };
export type SolarPage = { title: string; description: string; headline: string; accent: string; intro: string; image?: string; imageAlt?: string; sections: Section[]; checklist: string[]; cta: string; sources?: { label: string; href: string }[] };
export const solarPages: Record<string, SolarPage> = {
  domestic: {
    title: 'Domestic Solar Panels for Irish Homes', description: 'Explore domestic solar PV with Fennor: roof suitability, household electricity use, battery options and preparing for a solar assessment.',
    headline: 'Your roof.', accent: 'Your everyday energy.', intro: 'A useful home solar system begins with how you live. We help you understand your roof and electricity use, then explain the panels, storage and accessories that could suit your home.', image: 'solar-home.webp', imageAlt: 'Solar panels on an Irish home behind a stone garden wall',
    sections: [
      { heading: 'Start with your electricity use.', text: 'We start with when you use electricity and what you would like to change. Your bills help us understand the current pattern, while plans for an EV or new heating help us look ahead. You do not need to choose the equipment before speaking to us.' },
      { heading: 'Look at the roof, not just its size.', text: 'We explain the roof assessment your home needs, including condition, shading and safe access. If repairs are needed, we discuss the order of work before panels are fitted. Your final layout follows the relevant structural and clearance checks.' },
      { heading: 'Choose additions for a reason.', text: 'You do not have to add every accessory. We explain what a battery or hot-water diverter could do for your routine, what it adds to the cost and the alternatives. Your proposal makes the equipment and assumptions clear.' },
    ], checklist: ['Recent electricity bills', 'Property location and roof photographs', 'Planned renovation, EV or heating changes'], cta: 'Discuss solar for my home',
  },
  commercial: {
    title: 'Commercial Solar PV for Businesses', description: 'Plan commercial solar PV around business energy demand, roof suitability, operational access and the SEAI non-domestic funding route.',
    headline: 'Your working day.', accent: 'Put daylight to work.', intro: 'Commercial solar is an operational decision as well as an energy one. Begin with when your business needs electricity, how the building is used and what a practical installation would involve.',
    sections: [
      { heading: 'Match the operating pattern.', text: 'We review your operating hours and electricity pattern with you, including weekends and shutdowns. That helps us explain how a proposed system would serve your working day, rather than choosing its size from roof area alone.' },
      { heading: 'Plan around the building.', text: 'We explain the roof, electrical and grid checks needed for your premises, along with any ownership or lease permissions. Before agreeing the work, we plan access and installation stages with you around staff, customers and daily operations.' },
      { heading: 'Make the business case transparent.', text: 'We take you through the installed cost, expected on-site use, exports and maintenance assumptions. You can see how different scenarios affect the business case. We also explain funding eligibility and the approvals needed before you commit; a projection is not a guaranteed payback.' },
    ], checklist: ['Annual and interval electricity consumption', 'Operating hours and planned changes', 'Roof information, ownership and site access'], cta: 'Discuss a commercial solar project', sources: [{ label: 'SEAI non-domestic solar PV support', href: 'https://www.seai.ie/grants/business-grants/commercial-solar-pv' }],
  },
  farm: {
    title: 'Farm Solar PV & Agricultural Solar', description: 'Explore farm solar with Fennor: farm electricity patterns, shed roof suitability, operational needs and official agricultural funding guidance.',
    headline: 'Working land.', accent: 'Smarter energy planning.', intro: 'Every farm has its own rhythm. Milking, refrigeration, pumps and seasonal work create different patterns of electricity use. We build the starting conversation around yours, so the roof, equipment and electricity use are considered together.',
    sections: [
      { heading: 'Understand the daily and seasonal demand.', text: 'We look at the farming year with you, from everyday demand to busy seasons. Morning and evening loads may fall outside peak solar hours. We explain that timing and assess storage separately, so a battery is not presented as the answer to every mismatch.' },
      { heading: 'Assess the building and working environment.', text: 'We explain the checks needed for your shed and agree how an installation could fit around livestock, machinery and safe access. Roof condition, structure and any suspect materials need the appropriate specialist assessment before the work is planned.' },
      { heading: 'Choose the appropriate support route.', text: 'We explain the difference between the Department of Agriculture’s Solar Capital Investment Scheme and SEAI’s non-domestic route for your proposed investment. Their conditions determine eligibility, and the same costs cannot be funded twice.' },
    ], checklist: ['Farm electricity bills and meter details', 'Shed photographs and roof information', 'Seasonal loads and funding application status'], cta: 'Discuss solar for my farm', sources: [{ label: 'DAFM Solar Capital Investment Scheme', href: 'https://www.gov.ie/en/department-of-agriculture-food-and-the-marine/services/solar-capital-investment-scheme/' }],
  },
  'ground-mounted': {
    title: 'Ground-Mounted Solar PV Systems', description: 'Explore ground-mounted solar: space, shading, cable routes, ground conditions, maintenance access and site-specific planning checks.',
    headline: 'Beyond the roof.', accent: 'Explore the ground.', intro: 'Where a roof is unsuitable, a ground-mounted array may be worth considering. Available land is only the beginning: a practical design needs to account for the whole site.',
    sections: [
      { heading: 'Find the right location.', text: 'Show us the area you have in mind. We explain how the assessment looks at seasonal shading, slope, drainage and current land use, together with spacing and maintenance access. Future planting and nearby features are part of that review.' },
      { heading: 'Connect the site to the building.', text: 'We walk through the route between the proposed array and your building. Trenching, underground services, ground conditions and electrical distance can affect the work and price, so we explain which checks are needed before a layout is agreed.' },
      { heading: 'Check permissions before committing.', text: 'We explain the planning and site checks needed for your proposed array and identify the relevant specialist input. Ground-mounted systems have their own requirements; necessary approvals must be established before work begins.' },
    ], checklist: ['Site location and photographs', 'Available area and approximate cable distance', 'Current land use and known constraints'], cta: 'Discuss a ground-mounted system',
  },
  calculator: {
    title: 'Solar Panel Size Calculator', description: 'Explore 8–20 solar panels and their nominal system capacity. Adjust panel wattage and understand what still needs assessing before a quote.',
    headline: 'Explore the numbers.', accent: 'Understand the assumptions.', intro: 'Start with a simple panel-to-capacity calculation. This first tool shows system size—not a site-specific generation forecast, installation quote or savings promise.',
    sections: [
      { heading: 'Capacity is not annual generation.', text: 'Panel wattage describes nominal power under test conditions. Annual electricity generation depends on location, orientation, tilt, shading and system performance. A site-specific estimate needs those inputs.' },
      { heading: 'The next layer is your usage.', text: 'For a home-specific estimate, we work through your electricity use, tariffs, proposed equipment and installed cost. We explain the assumptions, including battery losses and how surplus is used, so the same electricity is not counted as a saving twice.' },
    ], checklist: ['Roof orientation and shading', 'Annual usage and daily demand profile', 'Electricity tariff and export rate'], cta: 'Discuss my system options',
  },
  'grants-funding': {
    title: 'Solar Grants & Funding in Ireland', description: 'Find official domestic, non-domestic and agricultural solar funding guidance. Understand why eligibility and approval timing matter.',
    headline: 'Find the right support.', accent: 'Check the details first.', intro: 'The funding route depends on your property, applicant type and proposed work. We explain the relevant route, how approval works and what the potential support could mean for your project budget. A headline amount is not an approved award.',
    sections: [
      { heading: 'For a home.', text: 'We ask about your home and planned work, then explain the SEAI support that may apply. You will understand the property and provider conditions, the next checks and when approval is needed before eligible work begins.' },
      { heading: 'For a business or non-domestic property.', text: 'We explain the separate Non-Domestic Microgen route and work through the relevant system size and project costs with you. The application conditions and dates are considered before funding forms part of your business budget.' },
      { heading: 'For a farm.', text: 'We help you understand how the Solar Capital Investment Scheme relates to your planned farm system, what information is needed and any points for your adviser to confirm. Eligible costs and other support are clarified before committing expenditure.' },
      { heading: 'Before you sign or start work.', text: 'Before you decide, we explain the approvals, payment timing and claim documents for the route being considered. We make clear who handles each part and what depends on the scheme administrator, so you know what happens next.' },
    ], checklist: ['Your property and planned improvements', 'Any previous grant or application already underway', 'The costs or application steps you would like us to explain'], cta: 'Discuss my project and funding questions', sources: [
      { label: 'SEAI home-energy grants', href: 'https://www.seai.ie/grants/home-energy-grants' },
      { label: 'SEAI non-domestic solar PV grant', href: 'https://www.seai.ie/grants/business-grants/commercial-solar-pv' },
      { label: 'DAFM Solar Capital Investment Scheme', href: 'https://www.gov.ie/en/department-of-agriculture-food-and-the-marine/services/solar-capital-investment-scheme/' },
    ],
  },
  'projects-case-studies': {
    title: 'Solar Projects & Case Studies', description: 'Explore solar project ideas and talk to Fennor about your roof, electricity use and the practical steps towards a system for your property.',
    headline: 'Solar possibilities.', accent: 'Details that matter.', intro: 'See a roof or layout that interests you? Bring it into your conversation with Fennor. The supplied photographs are starting points for your own project; full documented customer case studies are not presented here yet.',
    sections: [
      { heading: 'A property you can compare with yours.', text: 'Tell us which example caught your eye. We explain how your building, shading and electricity use could lead to a different layout, rather than assuming the same panel count suits every property.' },
      { heading: 'A clear system specification.', text: 'We explain how the panels, inverter, any storage and installation work come together in your proposal. You can see the reasons behind each choice and what depends on the assessment of your property.' },
      { heading: 'Results with evidence.', text: 'We distinguish estimates from measured results and explain the period, tariffs and usage behind any figures shared with you. A photograph alone does not establish a system’s performance or predict savings for your home.' },
    ], checklist: ['A photograph or feature you like', 'Your property and daily electricity use', 'The result you would like solar to help achieve'], cta: 'Ask about relevant project examples',
  },
  'faq-advice': {
    title: 'Solar FAQs & Practical Advice', description: 'Straightforward solar advice on roof suitability, battery options, generation, backup, quotes and planning your installation.',
    headline: 'Good questions.', accent: 'Clearer decisions.', intro: 'You do not need to know every technical term before exploring solar. These questions are a starting point for an informed conversation.',
    sections: [
      { heading: 'Does my roof need to face south?', text: 'No. We consider orientation, pitch, shading and when you use electricity together. The assessment gives us the information needed to explain your roof’s potential, rather than relying on a generic example.' },
      { heading: 'Do I have to add a battery?', text: 'No. We explain the options with and without storage, using your daytime routine, evening demand and export arrangements. You can weigh up what a battery would add against its extra cost.' },
      { heading: 'Does solar mean backup power?', text: 'Not by itself. A typical grid-connected system does not power the home during an outage. Backup requires suitable equipment and safe grid isolation designed by an appropriately qualified contractor.' },
      { heading: 'What should a quote explain?', text: 'We walk you through the equipment, installation work, price and assumptions, including any exclusions or electrical upgrades. Before you decide, we also explain grant or grid steps, warranty information and who you contact afterwards.' },
      { heading: 'Should roof repairs happen first?', text: 'Tell us about any roof concerns at the start. We explain the assessment needed and the order of work, so necessary repairs can be considered before panels are fitted.' },
    ], checklist: ['Your questions and recent bills', 'Plans for an EV or heating changes', 'Any concerns about the roof or installation'], cta: 'Ask Fennor a question', sources: [{ label: 'SEAI solar electricity guidance', href: 'https://www.seai.ie/renewable-energy/solar-energy/electricity-from-solar' }],
  },
};
