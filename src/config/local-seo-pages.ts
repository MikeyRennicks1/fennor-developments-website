export type LocalSeoPage = {
  path: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  headline: string;
  accent: string;
  intro: string;
  image: string;
  imageAlt: string;
  area: string;
  serviceType: string;
  proof: string;
  sections: { title: string; text: string; href: string; link: string }[];
  steps: { title: string; text: string }[];
  questions: { q: string; a: string }[];
  related: { href: string; label: string; text: string }[];
};

const solarQuestions = (place: string): LocalSeoPage['questions'] => [
  {
    q: `How much do solar panels cost in ${place}?`,
    a: `The installed cost depends on the measured roof layout, panel and inverter specification, electrical work, access and whether you add a battery. Fennor provides a property-specific proposal with the full price, eligible support and estimate assumptions shown separately.`,
  },
  {
    q: `Will solar panels work on an east- or west-facing roof in ${place}?`,
    a: `They can. Direction changes the amount and timing of generation, while pitch, shade and usable roof area also matter. We assess the actual roof and explain the proposed layout rather than ruling it in or out from direction alone.`,
  },
  {
    q: 'Which solar grants are available in 2026?',
    a: 'Eligible domestic solar PV can receive up to €1,800, and an eligible battery of at least 5 kWh can receive separate support of up to €600. The current scheme rules, previous funding and approval timing decide what applies; the grant is not assumed until eligibility is confirmed.',
  },
  {
    q: 'Do I need a battery with my solar panels?',
    a: 'No. We first model solar on its own, then show what storage could add for evening use, time-of-use tariffs or backup priorities. A battery should have a useful role in your home and justify its additional cost.',
  },
];

const solarRelated: LocalSeoPage['related'] = [
  { href: '/solar/domestic', label: 'Domestic solar', text: 'Roof suitability, system design, batteries and the installation journey.' },
  { href: '/solar/calculator', label: 'Solar calculator', text: 'Explore panel capacity and the value of using or exporting electricity.' },
  { href: '/solar/grants-funding', label: '2026 grants', text: 'See the current home, battery, business and farm funding routes.' },
];

export const localSeoPages: Record<string, LocalSeoPage> = {
  '/solar-panels-slane': {
    path: '/solar-panels-slane', label: 'Solar panels Slane', eyebrow: 'SOLAR / SLANE, CO. MEATH',
    title: 'Solar Panels Slane | Home Solar PV & Batteries | Fennor',
    description: 'Solar panels in Slane from a family-run local business. Plan home solar PV, battery storage, grants and a roof-specific quotation with Fennor.',
    headline: 'Solar panels in Slane.', accent: 'Local knowledge. A system for your home.',
    intro: 'Fennor is based in Slane. We help local homeowners make sense of the roof, electricity use, battery choices and current grants before choosing a solar system.',
    image: 'domestic-white-outbuilding.webp', imageAlt: 'Solar panels installed on a slate-roofed white outbuilding in the Irish countryside',
    area: 'Slane, County Meath', serviceType: 'Domestic solar PV assessment, design and installation',
    proof: 'Our local base is in Slane, so this is not a generic town page. Tell us where the property is, what the roof is like and what you want solar to achieve. We will confirm the practical next step and availability directly.',
    sections: [
      { title: 'Start with your own roof', text: 'A site assessment establishes usable area, condition, orientation, shading and safe access. The proposed panel count follows those findings—not a standard package.', href: '/solar/domestic#suitability', link: 'See the roof checks' },
      { title: 'Match generation to daily life', text: 'Bills show annual use; your routine shows when solar can replace imported electricity. We include future plans such as an EV, heat pump or extension.', href: '/solar/calculator', link: 'Explore the numbers' },
      { title: 'Compare panels alone with storage', text: 'A battery, EDDI or solar-aware charger uses the same surplus in different ways. We explain which extras suit your priorities and which may not earn their place.', href: '/solar/battery-storage', link: 'Understand battery storage' },
    ],
    steps: [
      { title: 'Share the starting details', text: 'Your Slane location, a recent bill and safely taken roof photographs are enough to begin.' },
      { title: 'Assess the property', text: 'We agree the roof, electrical and access checks required before fixing the design.' },
      { title: 'Review one clear proposal', text: 'You see the named equipment, estimated output, installed price, grant route, exclusions and handover.' },
    ], questions: solarQuestions('Slane'), related: solarRelated,
  },
  '/solar-panels-navan': {
    path: '/solar-panels-navan', label: 'Solar panels Navan', eyebrow: 'SOLAR / NAVAN, CO. MEATH',
    title: 'Solar Panels Navan | Home Solar PV & Batteries | Fennor',
    description: 'Planning solar panels in Navan? Fennor explains roof suitability, battery options, 2026 grants and a home-specific solar PV quotation.',
    headline: 'Solar panels in Navan.', accent: 'Designed around the way you use electricity.',
    intro: 'For a home in Navan, the useful starting point is not a generic panel count. Fennor brings your roof, bill, daytime use and future plans into one explained solar proposal.',
    image: 'domestic-white-house-18-panels.webp', imageAlt: 'White Irish home with a large, neatly arranged rooftop solar panel array',
    area: 'Navan, County Meath', serviceType: 'Domestic solar PV assessment, design and installation',
    proof: 'Navan is within Fennor’s core County Meath service area. We confirm availability for your property, arrange the appropriate assessment and explain who delivers each part of the installation before work is booked.',
    sections: [
      { title: 'Use the roof well', text: 'We assess the roof faces, shade, obstructions and condition before proposing a layout. A clean design must also be practical to install, maintain and connect.', href: '/solar/domestic#design', link: 'Explore domestic design' },
      { title: 'Make the estimate transparent', text: 'The proposal separates expected generation, direct use, export and tariff assumptions. That lets you see what changes the result instead of relying on one headline saving.', href: '/solar/calculator', link: 'Try the solar calculator' },
      { title: 'Plan for evenings and future loads', text: 'We compare storage, EV charging and hot-water diversion with the surplus your system may create and the equipment already in your home.', href: '/solar/accessories', link: 'Explore solar accessories' },
    ],
    steps: [
      { title: 'Tell us about the Navan property', text: 'A bill, your Eircode or townland, and roof photographs help us understand the starting point.' },
      { title: 'Agree the assessment', text: 'We explain the site and electrical checks, including any roof or access issue that needs a closer look.' },
      { title: 'Decide with the full picture', text: 'The design, equipment, output estimate, grant steps and installed price are explained before you commit.' },
    ], questions: [
      { q: 'Can panels be split across more than one roof face?', a: 'Yes, where the surveyed roof and electrical design support it. Splitting an array can make better use of an east-west roof or work around obstructions. We show the proposed strings, inverter approach and generation estimate for the actual layout.' },
      { q: 'What if our Navan home is empty during the day?', a: 'That changes how much generation you use directly. We compare exporting with shifting suitable loads, adding storage or charging an EV when it is home. The useful option depends on your routine and tariff rather than the town alone.' },
      { q: 'What solar support is available in 2026?', a: 'Eligible domestic solar PV can receive up to €1,800. An eligible battery of at least 5 kWh can receive separate support of up to €600. The property, prior funding, application timing and current scheme terms determine what applies.' },
      { q: 'What should I send with a first enquiry?', a: 'Your Navan area or Eircode, a recent electricity bill and safely taken ground-level roof photographs are useful. Tell us about a planned EV, heat pump or extension too. We will explain what needs checking next.' },
    ], related: solarRelated,
  },
  '/solar-panels-meath': {
    path: '/solar-panels-meath', label: 'Solar panels Meath', eyebrow: 'SOLAR / COUNTY MEATH',
    title: 'Solar Panels Meath | Home Solar PV & Batteries | Fennor',
    description: 'Solar panels across County Meath with Slane-based Fennor. Explore home solar PV, battery storage, current grants and a clear assessment process.',
    headline: 'Solar panels across Meath.', accent: 'A local starting point. A property-specific plan.',
    intro: 'From our base in Slane, Fennor welcomes solar enquiries across County Meath. We plan the system around the roof or land, the electricity used there and what you want the investment to achieve.',
    image: 'domestic-clean-array.webp', imageAlt: 'Clean black solar panel array fitted neatly to an Irish slate roof',
    area: 'County Meath', serviceType: 'Home, farm and commercial solar PV assessment, design and installation',
    proof: 'Our first service area includes Slane, Navan and communities across Meath. Home availability is confirmed property by property; farm and commercial projects begin with the site, operating pattern and electricity data.',
    sections: [
      { title: 'Home solar', text: 'Plan panels, an optional battery and useful controls around the household’s roof, electrical installation and everyday routine.', href: '/solar/domestic', link: 'Explore home solar' },
      { title: 'Farm solar', text: 'Put suitable shed roof space or land beside the farm’s daytime electricity demand, meter arrangement and investment priorities.', href: '/solar/farm', link: 'Explore farm solar' },
      { title: 'Commercial solar', text: 'Start with interval data, operating hours, roof information and the outcome the business needs from the project.', href: '/solar/commercial', link: 'Explore commercial solar' },
    ],
    steps: [
      { title: 'Choose the right route', text: 'Home, farm and business projects use different demand profiles, grid processes and funding schemes.' },
      { title: 'Understand the site', text: 'Roof, land, electrical capacity and access are assessed for the actual Meath property.' },
      { title: 'Compare a documented proposal', text: 'Equipment, design assumptions, projected output, price and current support are shown separately.' },
    ], questions: [
      { q: 'Does a home, farm and business use the same solar process?', a: 'No. A home assessment focuses on the household roof and routine. A farm or business needs its operating load, meter arrangement, site access and relevant funding or grid process considered. We direct the enquiry into the right route.' },
      { q: 'Can ground-mounted solar be considered in Meath?', a: 'Potentially. Usable land, shading, ground conditions, cable distance, maintenance access and current planning requirements all matter. We compare the site with suitable roof space before proposing a direction.' },
      { q: 'Which 2026 solar grant applies?', a: 'Eligible homes use the domestic PV and battery schemes. Businesses and farms may use different SEAI or agricultural routes with their own limits and approval requirements. We explain the relevant route, while the scheme administrator decides eligibility and award.' },
      { q: 'Which parts of Meath does Fennor cover?', a: 'Fennor is based in Slane and welcomes enquiries from Navan and communities across County Meath. Availability depends on the project type, location and specialist requirements, so we confirm coverage directly before arranging an assessment.' },
    ], related: solarRelated,
  },
  '/solar-panels-louth': {
    path: '/solar-panels-louth', label: 'Solar panels Louth', eyebrow: 'SOLAR / COUNTY LOUTH',
    title: 'Solar Panels Louth | Home, Farm & Business Solar | Fennor',
    description: 'Solar panels in County Louth for homes, farms and businesses. Explore roof suitability, batteries, grants and a clear quotation process with Fennor.',
    headline: 'Solar panels across Louth.', accent: 'Useful generation. Clearly explained.',
    intro: 'Fennor welcomes home, farm and business solar enquiries from County Louth. We start with the property and electricity demand, then confirm the assessment and project fit.',
    image: 'domestic-estate-hero.webp', imageAlt: 'Irish detached home with a dark rooftop solar panel installation',
    area: 'County Louth', serviceType: 'Home, farm and commercial solar PV assessment, design and installation',
    proof: 'Louth is one of Fennor’s core service areas. From Drogheda and Ardee to Dundalk and surrounding rural properties, tell us the location and project type first; we confirm coverage and availability rather than assuming every project is the same.',
    sections: [
      { title: 'Solar for your home', text: 'We relate roof suitability and estimated output to daytime use, export, battery options and future electricity needs.', href: '/solar/domestic', link: 'Plan home solar' },
      { title: 'Solar for a working farm', text: 'Existing shed space can be valuable when the generation pattern and farm demand overlap. Structure, meter and grant route still need assessment.', href: '/solar/farm', link: 'Plan farm solar' },
      { title: 'Solar for a business', text: 'A commercial appraisal starts with load data, roof information and operating hours, with grant and cash-flow assumptions kept transparent.', href: '/solar/commercial', link: 'Plan commercial solar' },
    ],
    steps: [
      { title: 'Send the location and project type', text: 'Tell us whether this is a home, farm or business and what you want the system to achieve.' },
      { title: 'Build the evidence', text: 'Bills, interval data and safe site photographs help define the survey and design work.' },
      { title: 'Review the proposal', text: 'We explain the equipment, generation assumptions, funding route, installed cost and next steps.' },
    ], questions: [
      { q: 'Does Fennor cover Drogheda, Ardee and Dundalk?', a: 'Fennor welcomes solar enquiries from those areas and elsewhere in County Louth. Send the location and whether it is a home, farm or business; we confirm coverage, project fit and availability directly.' },
      { q: 'Can the same proposal cover a farm shed or business premises?', a: 'Yes, but it follows a different appraisal from a home. Electricity data, operating hours, meter and connection details, roof structure and the relevant funding route need to be brought together for that site.' },
      { q: 'Would a battery make sense for my Louth home?', a: 'It depends on the surplus solar, evening use, tariff and any backup priority. We compare the solar-only case with storage, including capacity, usable energy, losses, compatibility and the eligible €600 support where the current conditions are met.' },
      { q: 'How will I know the complete installed cost?', a: 'After the appropriate assessment, the proposal identifies the panels, inverter, mounting, electrical work, access assumptions, optional equipment and current grant route. Costs and savings assumptions are kept separate so the comparison is clear.' },
    ], related: solarRelated,
  },
  '/electrician-slane': {
    path: '/electrician-slane', label: 'Electrical services Slane', eyebrow: 'ELECTRICAL / SLANE, CO. MEATH',
    title: 'Electrical Services Slane | Home & Business | Fennor',
    description: 'Electrical services in Slane for homes, commercial premises and industrial sites. Tell local, family-run Fennor about the work you need assessed.',
    headline: 'Electrical services in Slane.', accent: 'A local conversation. A properly defined job.',
    intro: 'Fennor is a family-run business based in Slane. You can enquire about home wiring and lighting, business alterations or planned industrial electrical work without needing a finished specification.',
    image: 'electrical-domestic-img-3032-v2.jpg', imageAlt: 'Close detail of organised conductors and protective devices in a domestic electrical board',
    area: 'Slane, County Meath', serviceType: 'Domestic, commercial and industrial electrical services',
    proof: 'We begin with the actual property, the work you need and the outcome you want. Your proposal defines the delivery team, access, testing and records. For restricted domestic work, it also identifies the responsible Safe Electric Registered Electrical Contractor and certifier before you proceed.',
    sections: [
      { title: 'Domestic electrical', text: 'Rewiring enquiries, lighting, sockets, consumer-unit assessment and electrical planning for renovations, extensions and future energy equipment.', href: '/electrical/domestic', link: 'Explore domestic electrical' },
      { title: 'Commercial electrical', text: 'Fit-outs, lighting, power and remedial work planned around the premises, its operating hours and the people using it.', href: '/electrical/commercial', link: 'Explore commercial electrical' },
      { title: 'Industrial maintenance', text: 'Equipment supplies, planned maintenance, fault investigation and site upgrades begin with a defined site brief and appropriate competent personnel.', href: '/electrical/industrial-maintenance', link: 'Explore industrial maintenance' },
    ],
    steps: [
      { title: 'Describe the work', text: 'Tell us the Slane property or site, what needs attention and whether other work is planned.' },
      { title: 'Agree the assessment', text: 'We explain what can be established remotely and what needs an inspection before pricing.' },
      { title: 'Receive a defined scope', text: 'The proposal covers work, access, disruption, testing, records, exclusions and the agreed next step.' },
    ],
    questions: [
      { q: 'What electrical work can I enquire about in Slane?', a: 'Domestic rewiring and alterations, lighting and power, electrical work for renovations and extensions, commercial fit-outs and planned industrial or maintenance work. We review the location and scope before confirming availability.' },
      { q: 'Does every home need a full rewire?', a: 'No. The condition and suitability of the existing installation need an appropriate assessment. The findings determine whether the recommendation is local remedial work, a partial upgrade or more extensive rewiring.' },
      { q: 'Will I receive electrical certification?', a: 'Before you agree the work, the proposal explains the testing, certification and records relevant to the scope and who is responsible for them. Restricted domestic electrical work must be completed and certified by a Safe Electric Registered Electrical Contractor.' },
      { q: 'Is this a 24-hour emergency electrician service?', a: 'No. This website is an enquiry route for assessed and agreed work and is not a monitored emergency channel. No immediate attendance time is promised.' },
    ],
    related: [
      { href: '/electrical', label: 'Electrical overview', text: 'See the complete home, business and industrial service.' },
      { href: '/renovations', label: 'Renovations', text: 'Coordinate wiring, lighting and equipment before new finishes go in.' },
      { href: '/building/extensions', label: 'Extensions', text: 'Bring the electrical plan into the layout and build sequence early.' },
    ],
  },
  '/builders-slane': {
    path: '/builders-slane', label: 'Builders Slane', eyebrow: 'BUILDING / SLANE, CO. MEATH',
    title: 'Builders Slane | Extensions, New Builds & Attics | Fennor',
    description: 'Planning building work in Slane? Talk to local, family-run Fennor about extensions, new homes, attic conversions and connected electrical work.',
    headline: 'Building in Slane.', accent: 'Local roots. A clear route from idea to site.',
    intro: 'Fennor is based in Slane. Whether you need more room, want to use the attic or are starting with a site and a new-home idea, we help turn the brief into a practical sequence.',
    image: 'building-04.webp', imageAlt: 'Garden-facing extension with wide glazed doors and a finished family living space',
    area: 'Slane, County Meath', serviceType: 'Residential building, extensions and attic conversions',
    proof: 'A useful building conversation starts before a price is guessed. We establish the surveys, design information, permissions and specialist roles needed, then explain Fennor’s scope, the programme assumptions and how changes are handled.',
    sections: [
      { title: 'House extensions', text: 'Plan useful extra space around the existing house, garden, light and family routine—with structure, services and making good considered together.', href: '/building/extensions', link: 'Explore house extensions' },
      { title: 'New-build enquiries', text: 'Bring the site, available drawings and how you want the home to work. We explain the information and decisions needed before construction pricing.', href: '/building/new-builds', link: 'Explore new builds' },
      { title: 'Attic conversions', text: 'The available height, structure, stairs, fire strategy, insulation and ventilation determine whether the roof space can become a compliant room.', href: '/building/attic-conversions', link: 'Explore attic conversions' },
    ],
    steps: [
      { title: 'Start with the reason for the project', text: 'Tell us what the current home cannot do and what the additional space should change.' },
      { title: 'Establish the project information', text: 'We identify the surveys, drawings, planning or building-control steps and specialist design needed.' },
      { title: 'Agree the build', text: 'The written scope sets out price, allowances, programme, disruption, responsibilities, changes and handover.' },
    ],
    questions: [
      { q: 'Do I need planning permission for an extension in Slane?', a: 'Some house extensions may be exempt development when all current conditions are met, while others need permission. Planning and building-regulation requirements are separate. The property, previous extensions, proposed size and design need to be checked with the relevant professionals and Meath County Council guidance.' },
      { q: 'Can Fennor coordinate electrical work with the build?', a: 'Yes. Electrical positions, loads, routes and future energy equipment can be brought into the building plan. Your proposal explains the appropriate electrical delivery, testing and records alongside the wider work.' },
      { q: 'Can you price a project from photographs?', a: 'Photographs are a useful introduction, but a reliable construction price needs a defined scope and the appropriate site, design and structural information. We explain the next assessment before a visit or quotation is agreed.' },
      { q: 'Does every attic suit a conversion?', a: 'No. Height, roof structure, floor loading, stair position, fire safety, insulation and ventilation all matter. An assessment determines whether a compliant conversion is practical and what design input is needed.' },
    ],
    related: [
      { href: '/building', label: 'Building overview', text: 'Explore extensions, new homes and attic conversions across Meath and Louth.' },
      { href: '/renovations', label: 'Home renovations', text: 'Rethink the rooms and layout within the home you already have.' },
      { href: '/electrical', label: 'Electrical services', text: 'Coordinate the power, lighting and future equipment with the wider project.' },
    ],
  },
};

export const localSeoPaths = Object.keys(localSeoPages);
