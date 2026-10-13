export type ElectricalService = 'domestic' | 'commercial' | 'industrial-maintenance';
export type ElectricalPageKey = 'overview' | ElectricalService;
export type ElectricalItem = { title: string; text: string };
export type ElectricalPage = {
  label: string; title: string; description: string; headline: string; accent: string; intro: string;
  image: string; imageAlt: string; imageCaption: string; marker: string;
  storyTitle: string; storyAccent: string; story: string; services: ElectricalItem[];
  enquiryTitle: string; enquiryText: string; topic: string; questions: ElectricalItem[];
};

export const electricalServices: ElectricalService[] = ['domestic', 'commercial', 'industrial-maintenance'];
export const electricalPath = (key: ElectricalPageKey) => key === 'overview' ? '/electrical' : `/electrical/${key}`;

export const electricalPages: Record<ElectricalPageKey, ElectricalPage> = {
  overview: {
    label: 'Electrical', title: 'Electrical Services Meath & Louth | Homes & Business | Fennor',
    description: 'Electrical work for homes, commercial premises and industrial sites with Fennor. Rewiring, lighting, installations and maintenance enquiries. Based in Slane, Meath.',
    headline: 'Powering the places', accent: 'life happens.',
    intro: 'From the first light in your kitchen to the last machine on the floor. Electrical work for homes and businesses, planned around the people who use them.',
    image: 'kitchen-detail-editorial.webp', imageAlt: 'Architectural concept of a bright oak kitchen with pendant and ceiling lighting', imageCaption: 'Light, power and everyday life', marker: 'HOME / BUSINESS / INDUSTRY',
    storyTitle: 'A better connection.', storyAccent: 'From the very beginning.',
    story: 'A new socket, a full rewire or a changing production space starts with the same question: what does this place need to do? Fennor brings the electrical work into a clear plan, with assessment, responsibilities and the next step explained.',
    services: [], enquiryTitle: 'Tell us what', enquiryText: 'A few details about your home or premises are enough to begin. We will review the work and agree the next step with you.', topic: 'Electrical services enquiry',
    questions: [
      {title:'What electrical work can I enquire about?',text:'Domestic installations and rewiring, lighting and power changes for business premises, and industrial electrical work and maintenance. Tell us the property type, location and work you have in mind. We review each enquiry to establish the assessment and appropriate delivery team.'},
      {title:'Can electrical work form part of a larger project?',text:'Yes. Fennor can bring the electrical scope into a renovation, extension, new build or energy upgrade. Planning the equipment, positions, cable routes and access with the other trades helps resolve decisions before finishes go in.'},
      {title:'Who carries out the electrical work?',text:'Fennor coordinates the work and the appropriate electrical contractors or specialist subcontractors for the agreed scope. Your proposal explains who carries out the work, who is responsible for testing and certification, and the records included at handover.'},
      {title:'Where do you work?',text:'Fennor is based in Slane, Co. Meath. We welcome enquiries from Meath, Louth and Dublin; the location, scale and specialist requirements of the work determine the next step. Include your town or site location in the enquiry.'},
      {title:'Can you give me a price from this page?',text:'A useful price needs a defined scope. We start with your brief, explain the assessment needed and set out the proposed work and exclusions in writing. Any visit, its scope and any fee are agreed before it proceeds.'},
    ],
  },
  domestic: {
    label:'Domestic electrical', title:'Domestic Electrical Services Meath & Louth | Fennor',
    description:'Discuss home rewiring, lighting, sockets, consumer-unit work and electrical planning with Fennor. Based in Slane, serving enquiries in Meath, Louth and Dublin.',
    headline:'A home that works.', accent:'Down to the last switch.',
    intro:'The light over the worktop. The socket where you need it. The wiring behind your next renovation. Thoughtful electrical work begins with the way you live.',
    image:'kitchen-detail-editorial.webp', imageAlt:'Architectural concept of a daylight-filled kitchen with pendant lights over an oak island', imageCaption:'Considered lighting and useful connections', marker:'ELECTRICAL / AT HOME',
    storyTitle:'Behind a beautiful room,', storyAccent:'a considered plan.',
    story:'Tell us what feels awkward in your home today and what you want to change. We bring the existing installation, your room layout and future equipment into the assessment, so the electrical proposal works with the house as a whole.',
    services:[
      {title:'Rewiring & home upgrades',text:'Whole-home and partial rewiring enquiries, including renovation and older-home projects. The existing installation, cable routes, access and making good shape the proposal.'},
      {title:'Lighting & controls',text:'Everyday light, worktop light and softer evening settings. We discuss positions, switching and suitable controls alongside the room layout and finishes.'},
      {title:'Sockets & appliance supplies',text:'Useful power points and assessed supplies for planned appliances. Share your appliance list and furniture layout before the positions are agreed.'},
      {title:'Consumer units & existing wiring',text:'Assessment of an existing board and installation where changes, concerns or additional loads are involved. Any recommended work follows the findings.'},
      {title:'Extensions & new spaces',text:'Electrical planning for new builds, extensions, kitchens, bathrooms and attic projects, coordinated with the wider build and the relevant specialist input.'},
      {title:'Outdoor & future energy',text:'External lighting, garden-building supplies and preparation for EV charging, solar or heating changes. Suitability and supply requirements are assessed for your property.'},
    ], enquiryTitle:'What would make', enquiryText:'Tell us the rooms involved, what you would like to change and whether the work is part of a renovation. You do not need an electrical specification to start.', topic:'Domestic electrical enquiry',
    questions:[
      {title:'Does my home need a full rewire?',text:'That cannot be established from the age or appearance of the house alone. An appropriate assessment of the existing installation informs the recommendation. We explain the findings, the work proposed and whether the scope is local or more extensive.'},
      {title:'Can I stay at home while work happens?',text:'It depends on the work, access and interruptions involved. We discuss occupied rooms, household needs, dust, furniture and planned loss of power before agreeing how the work will be phased. A full rewire needs a different plan from a small addition.'},
      {title:'When should electrical planning happen in a renovation?',text:'Bring it into the early layout conversation. Kitchen appliances, lighting, heating, furniture and future energy plans affect positions and routes. Agreeing these before plastering and decorating helps avoid late changes.'},
      {title:'Can you help plan an EV charger or heat pump supply?',text:'Yes. Tell us about the equipment you are considering. The proposed load, existing installation and available supply need assessment; any required network work or specialist installation is identified separately. A spare space in the board alone does not establish suitability.'},
      {title:'What about testing and certification?',text:'Before you agree the work, we explain who will carry it out, the testing and certification needed, and the records you will receive. Restricted electrical works in the home must be carried out and certified by a Registered Electrical Contractor. Safe Electric explains the requirements.'},
      {title:'Is decorating included after a rewire?',text:'We explain the access needed and what making good includes in your proposal. Chasing, lifting floors, plaster repairs and final decorating can involve different trades. We work through those boundaries before the scope is agreed.'},
    ],
  },
  commercial: {
    label:'Commercial electrical', title:'Commercial Electrical Services Meath & Louth | Fennor',
    description:'Electrical installations, lighting and power upgrades for commercial premises with Fennor. Planned around access, business activity and the agreed scope.',
    headline:'Built around', accent:'your working day.',
    intro:'For the places people work, shop and meet. Lighting, power and electrical upgrades planned with your premises, staff and business activity in mind.',
    image:'commercial-business-as-usual.webp', imageAlt:'Architectural concept of a commercial premises with office frontage, loading access and landscaped surroundings', imageCaption:'Your working environment', marker:'ELECTRICAL / FOR BUSINESS',
    storyTitle:'The right work.', storyAccent:'With the business in view.',
    story:'A premises is more than its floor plan. Opening hours, staff routes, customers and the equipment that must remain available all shape the work. We bring these details into the assessment and agree how access and interruptions will be managed.',
    services:[
      {title:'Fit-outs & alterations',text:'Electrical work for new layouts, refurbished spaces and changing uses. We work through the fit-out brief with the people responsible for the premises and the wider project.'},
      {title:'Lighting improvements',text:'Lighting and controls for offices, retail areas, stores and working spaces. The activities, existing fittings, daylight and maintenance access inform the proposal.'},
      {title:'Power & distribution',text:'Additional power points, equipment connections and distribution changes, following assessment of demand, existing capacity and the installation.'},
      {title:'Inspection & remedial work',text:'Review of concerns or existing inspection findings, with the appropriate inspection, testing and remedial scope agreed for the premises.'},
      {title:'Emergency lighting enquiries',text:'Assessment, installation or remedial enquiries for emergency lighting, with design, testing, records and any specialist responsibilities defined for the building.'},
      {title:'Energy & future equipment',text:'Electrical coordination for solar, charging, heating or new business equipment. We identify the interfaces and supply checks before work is proposed.'},
    ], enquiryTitle:'Tell us about', enquiryText:'Share your premises type, proposed work and the hours or areas that matter most. We will help turn that into an assessment brief.', topic:'Commercial electrical enquiry',
    questions:[
      {title:'Can work be planned around opening hours?',text:'We discuss the areas affected, access windows and any required shutdowns as part of the proposal. Timing and phasing are agreed for the particular site; uninterrupted operation is not assumed.'},
      {title:'What information helps with a fit-out enquiry?',text:'The premises location, intended use, available layout, opening hours and planned equipment are useful starting points. Existing drawings or inspection records can help, but you do not need a complete pack to make an enquiry.'},
      {title:'Can you work with our landlord or fit-out team?',text:'Yes. Tell us who controls the premises, who approves work and who is managing the wider fit-out. The scope identifies permissions, access arrangements and the interfaces between electrical work and the other trades.'},
      {title:'Will LED lighting automatically reduce costs by a fixed amount?',text:'No fixed saving is assumed. Existing wattage, operating hours, controls, required light levels and the proposed fittings all matter. We can discuss a comparison once the current installation and intended use are understood.'},
      {title:'Can you review an existing inspection report?',text:'Yes. Start by telling us what the report covers, its date and the work you want to address. The assessment establishes what needs verification and how the remedial proposal relates to the report.'},
      {title:'What will we receive at handover?',text:'We set out the relevant test and completion records, equipment information, updated identification and operating guidance in the agreed scope. Before work begins, we explain the specialist documents and who is responsible for each part.'},
    ],
  },
  'industrial-maintenance': {
    label:'Industrial & maintenance', title:'Industrial Electrical & Maintenance Services | Fennor',
    description:'Discuss industrial electrical installations, equipment supplies, fault investigation and planned maintenance with Fennor. Site-specific assessment and agreed scope.',
    headline:'Understand the system.', accent:'Plan the next move.',
    intro:'Electrical work for workshops, production spaces and industrial premises. From equipment changes to maintenance priorities, start with the site and how it operates.',
    image:'commercial-film-poster.webp', imageAlt:'Industrial concept showing a bright workshop with machinery, overhead cable routes and working areas', imageCaption:'Your site. Your operating needs.', marker:'ELECTRICAL / INDUSTRY & MAINTENANCE',
    storyTitle:'A working site.', storyAccent:'A complete picture.',
    story:'Equipment, process demands and the existing installation are connected. Fennor works with your site contact to understand the brief, identify the appropriate technical input and define the work before an intervention is agreed.',
    services:[
      {title:'Equipment supplies & changes',text:'Electrical supply and connection enquiries for new or relocated equipment. Manufacturer information, load requirements and the existing distribution inform the assessment.'},
      {title:'Distribution & site upgrades',text:'Proposed changes to electrical distribution, containment and working-area supplies, with capacity, access and interfaces reviewed for the site.'},
      {title:'Planned maintenance',text:'A maintenance scope based on the installation, environment, available records and operating needs. Tasks, access, responsibilities and reporting are agreed for the actual site.'},
      {title:'Fault investigation',text:'Assessment of recurring or reported electrical issues by the appropriate competent personnel. Describe the symptoms and operating conditions; findings determine any repair proposal.'},
      {title:'Lighting & working areas',text:'Lighting upgrades and controls for workshops, stores and production spaces, considering the work performed, access for maintenance and the site environment.'},
      {title:'Inspection findings & records',text:'Review of available inspection findings and proposed remedial work, with relevant testing, identification and completion documentation included in the agreed scope.'},
    ], enquiryTitle:'Start with', enquiryText:'Tell us the site type, equipment or area involved and the outcome you need. Include any access constraints and whether you have existing drawings or inspection records.', topic:'Industrial electrical and maintenance enquiry',
    questions:[
      {title:'Do you offer a maintenance contract?',text:'Maintenance is discussed by enquiry and site assessment. Any proposed arrangement needs a defined installation, task list, frequency, access plan, responsibilities and commercial terms. Any call-out arrangements are discussed separately, so you know what is and is not included.'},
      {title:'Can you investigate a recurring fault?',text:'You can enquire about a recurring electrical issue. Share when it occurs, the equipment affected and any existing report, without opening equipment or attempting live checks. The appropriate competent personnel establish the investigation and any subsequent repair scope.'},
      {title:'Can work happen during a planned shutdown?',text:'Tell us the proposed window and the systems affected. We review the preparation, access, isolation responsibilities, specialist support and testing required before agreeing whether the work can fit that window.'},
      {title:'Can you connect new machinery?',text:'We review the machine information, manufacturer requirements, demand and existing installation before proposing the electrical supply work. Machine commissioning, controls, programming or manufacturer attendance are separate responsibilities unless explicitly included.'},
      {title:'How often should electrical inspection take place?',text:'The appropriate inspection and maintenance arrangements depend on the installation, its environment, use and applicable requirements. We agree the appropriate programme for your site with the relevant competent personnel, rather than assuming every premises needs the same interval.'},
      {title:'Is this an emergency or 24-hour service?',text:'This is an enquiry route for assessed and agreed work. It is not a monitored emergency channel and no attendance time is promised. For an immediate danger, use the appropriate emergency route and your site emergency arrangements.'},
    ],
  },
};
