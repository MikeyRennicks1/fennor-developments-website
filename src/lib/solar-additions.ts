export const accessorySources = {
  eddi: 'https://support.myenergi.com/hc/en-gb/articles/22681298060305-What-Does-eddi-Do',
  eddiProduct: 'https://www.myenergi.com/ie/eddi-power-diverter',
  zappi: 'https://www.myenergi.com/ie/zappi-car-charger',
  harvi: 'https://www.myenergi.com/ie/harvi-energy-harvesting-sensor',
  coordination: 'https://support.myenergi.com/hc/en-gb/articles/4716922623633-Hybrid-PV-Battery-Set-up-Avoid-Draining',
  backup: 'https://www.seai.ie/blog/solar-panels-power-cut',
  switch: 'https://assets.sc.hager.com/ie/-/media/project/hagerdeep/republic-of-ireland/hager/republic-of-ireland/documents/residential-distibution-catalogue_ie.pdf',
  evGrant: 'https://www.seai.ie/grants/electric-vehicle-grants/electric-vehicle-charging/electric-vehicle-home-charger-grant',
};

export const accessoryQuestions = [
  {q:'What does an EDDI solar diverter do?',a:'EDDI detects surplus solar electricity and varies the power sent to a compatible heating load, such as a cylinder immersion. It stores energy as heat in your water, not as electricity for the rest of the home.'},
  {q:'Do I need a hot-water cylinder for EDDI?',a:'For the hot-water arrangement described here, you need a suitable cylinder and compatible immersion heater. An instantaneous electric shower is not a substitute. The installation assessment establishes whether your cylinder controls, heater ratings and safety devices are suitable before we recommend this setup.'},
  {q:'Should I choose a battery or a hot-water diverter?',a:'They solve different problems. A battery keeps electricity for later; a diverter heats water. Fennor compares your hot-water demand, evening electricity use, export payment and existing heating cost, then explains the useful options and their installed prices. Both can be appropriate, but the same surplus unit cannot benefit both at once.'},
  {q:'Can EDDI work with a heat pump or an existing battery?',a:'Potentially, but coordination matters. A heat pump may already provide hot water efficiently, while a poorly configured diverter or EV charger can draw from a battery unexpectedly. Fennor reviews your equipment and existing hot-water costs, then explains compatible options. The installation team configures the agreed control priorities and demonstrates them at handover.'},
  {q:'Will a changeover switch keep my house running in a power cut?',a:'Not on its own. It is part of a designed backup arrangement requiring a suitable inverter output, safe grid isolation, protection and supported circuits. Available battery charge and output limits determine what can run and for how long. A Registered Electrical Contractor must design and certify the work.'},
  {q:'Is automatic backup the same as uninterrupted power?',a:'No. A transfer can involve a short interruption, and performance depends on the specific system. Fennor explains the supported circuits and switching behaviour in the proposed system before you decide. Critical or medical equipment needs a separately agreed continuity plan.'},
  {q:'Can zappi charge my car without solar panels?',a:'Yes. It can use grid electricity as well as available solar. Solar-aware charging is most useful when the vehicle is plugged in during generation. Charging modes, schedules and the vehicle’s own limits determine how it behaves.'},
  {q:'Is there a grant for an EV home charger?',a:'SEAI currently offers up to €300 for an eligible home charger installation. Use an eligible model on the Smart Charger Register and a Safe Electric Registered Electrical Contractor. Wait for the offer before starting and meet the six-month completion and claim deadline. Other property and scheme conditions apply.'},
  {q:'Do I need harvi as well as an EDDI or zappi?',a:'Not always. harvi is an optional wireless link for compatible current-transformer sensors where a wired connection is impractical. The installer checks the measurement points, radio conditions and product-specific requirements. It is not a battery or a standalone energy-saving device.'},
  {q:'Can accessories be added to existing solar?',a:'Often they can, after a survey. We identify the inverter, battery, supply and monitoring setup, then explain compatible additions and their full installed cost. That includes any wiring, protection, controls and commissioning—not just the accessory price.'},
];

export const groundSources = {
  regulations: 'https://assets.gov.ie/static/documents/1b7d7a36/Planning_and_Development_Regulations_2001-2026_Consolidation_Sept2026.pdf',
  law: 'https://www.irishstatutebook.ie/eli/2022/si/493/made/en/print',
  tams: 'https://assets.gov.ie/static/documents/b9476535/Tams_3_Solar_Terms_and_Conditions_20_June_2026_1.pdf',
  pv: 'https://www.seai.ie/grants/home-energy-grants/individual-grants/solar-electricity-grant',
  business: 'https://www.seai.ie/grants/business-grants/commercial-solar-pv',
  grid: 'https://www.esbnetworks.ie/customer-support/customer-support-queries/generator-connections/connect-a-micro-generator',
  mounting: 'https://solarportsystems.com/solutions/commercial-residential/',
  foundations: 'https://solarportsystems.com/company/processes/on-site-support/',
};

export const groundQuestions = [
  {q:'Can solar panels be installed in my garden instead of on the roof?',a:'Yes, where the site, permissions and electrical design are suitable. A ground-mounted frame holds the panels independently of the building. Fennor assesses shading, foundations, access, the cable route and how you use the land, then explains a proposed layout and full installation cost.'},
  {q:'Do ground-mounted solar panels need planning permission in Ireland?',a:'They may. Different exemptions apply to a house and an agricultural holding, and area and height are only part of the test. Fennor identifies the relevant regulations, conservation and environmental questions for your proposal; your planning authority confirms the position. Do not assume a roof exemption also covers an array in a field.'},
  {q:'How much land do I need?',a:'More than the face area of the panels. The final layout needs room for row spacing, foundations, access and maintenance, and may need screening or fencing. Slope, shade and the selected mounting system all affect the footprint. A panel count alone cannot establish the land requirement.'},
  {q:'Are ground-mounted panels better than roof-mounted panels?',a:'Neither is automatically better. Ground mounting can offer freedom to choose the direction and tilt without using the roof, but introduces land use, foundations and cable-route costs. Where both suit your site, Fennor compares them using consistent generation and cost assumptions, so you can weigh the extra groundworks against the available output.'},
  {q:'How far can the panels be from the house or farm building?',a:'There is no single distance that suits every system. The site and electrical assessment considers route length, cable design, voltage drop, groundworks and inverter location together. A long route or a crossing of a yard can materially change the installed cost.'},
  {q:'Can a ground-mounted system qualify for a solar grant?',a:'Mounting on land does not create a separate grant entitlement. Fennor explains the relevant SEAI domestic, non-domestic or DAFM farm route and the application inputs, with eligibility decided by the scheme provider. TAMS terms expressly allow eligible ground arrays in a land parcel on the holding or in its farmyard, subject to the scheme’s other conditions and approvals.'},
  {q:'Can I still use the land around the panels?',a:'Possibly, with a suitable layout. Keep access and maintenance space clear and manage vegetation without damaging cables or equipment. We plan around grazing, machinery movements, fencing and animal protection where relevant, and identify the included measures in your site-specific proposal.'},
  {q:'Does ground-mounted solar work during a power cut?',a:'The mounting location does not change the normal grid-disconnection requirement. Backup needs compatible equipment, safe isolation and a designed set of supported loads. A battery or ground array alone does not guarantee power during an outage.'},
];
