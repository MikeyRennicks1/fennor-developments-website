/**
 * Reviewed URL migration from the original Fennor application, 13 October 2026.
 * Exact known routes only: an invented /solar-panels-anything URL must still 404.
 * Consolidation does not verify old project results, testimonials or credentials.
 */
export const legacySolarLocationPaths = [
  "/solar-panels-annagassan",
  "/solar-panels-ardcath",
  "/solar-panels-ardee",
  "/solar-panels-artane",
  "/solar-panels-ashbourne",
  "/solar-panels-athboy",
  "/solar-panels-balbriggan",
  "/solar-panels-baldoyle",
  "/solar-panels-ballapousta",
  "/solar-panels-ballinlough",
  "/solar-panels-ballivor",
  "/solar-panels-beaumont",
  "/solar-panels-bective",
  "/solar-panels-bellewstown",
  "/solar-panels-bellurgan",
  "/solar-panels-bettystown",
  "/solar-panels-blackrock",
  "/solar-panels-blanchardstown",
  "/solar-panels-bohermeen",
  "/solar-panels-cabra",
  "/solar-panels-carlanstown",
  "/solar-panels-carlingford",
  "/solar-panels-carnaross",
  "/solar-panels-castlebellingham",
  "/solar-panels-castleknock",
  "/solar-panels-castletown",
  "/solar-panels-chanonrock",
  "/solar-panels-clogherhead",
  "/solar-panels-clonee",
  "/solar-panels-clongriffin",
  "/solar-panels-clonmellon",
  "/solar-panels-clonsilla",
  "/solar-panels-collon",
  "/solar-panels-coolock",
  "/solar-panels-crossakiel",
  "/solar-panels-delvin",
  "/solar-panels-donabate",
  "/solar-panels-donaghmede",
  "/solar-panels-donore",
  "/solar-panels-drogheda",
  "/solar-panels-dromiskin",
  "/solar-panels-drumcondra",
  "/solar-panels-drumconrath",
  "/solar-panels-drumree",
  "/solar-panels-dublin",
  "/solar-panels-duleek",
  "/solar-panels-dunboyne",
  "/solar-panels-dundalk",
  "/solar-panels-dunleer",
  "/solar-panels-dunsany",
  "/solar-panels-dunshaughlin",
  "/solar-panels-enfield",
  "/solar-panels-faughart",
  "/solar-panels-finglas",
  "/solar-panels-fordstown",
  "/solar-panels-glasnevin",
  "/solar-panels-gormanston",
  "/solar-panels-grangebellew",
  "/solar-panels-greenore",
  "/solar-panels-gyles-quay",
  "/solar-panels-hollystown",
  "/solar-panels-howth",
  "/solar-panels-jenkinstown",
  "/solar-panels-julianstown",
  "/solar-panels-kells",
  "/solar-panels-kentstown",
  "/solar-panels-kilcock",
  "/solar-panels-kilkerley",
  "/solar-panels-kilmainhamwood",
  "/solar-panels-kilmessan",
  "/solar-panels-kilskyre",
  "/solar-panels-kinsealy",
  "/solar-panels-knockbridge",
  "/solar-panels-laytown",
  "/solar-panels-leixlip",
  "/solar-panels-lobinstown",
  "/solar-panels-longwood",
  "/solar-panels-lordship",
  "/solar-panels-louth",
  "/solar-panels-louth-village",
  "/solar-panels-lucan",
  "/solar-panels-lusk",
  "/solar-panels-maddoxland",
  "/solar-panels-malahide",
  "/solar-panels-meath",
  "/solar-panels-monasterboice",
  "/solar-panels-mornington",
  "/solar-panels-moynalty",
  "/solar-panels-mulhuddart",
  "/solar-panels-mulhussey",
  "/solar-panels-mullingar",
  "/solar-panels-navan",
  "/solar-panels-nobber",
  "/solar-panels-oldcastle",
  "/solar-panels-omeath",
  "/solar-panels-ongar",
  "/solar-panels-phibsborough",
  "/solar-panels-portmarnock",
  "/solar-panels-portrane",
  "/solar-panels-raheny",
  "/solar-panels-ratoath",
  "/solar-panels-ravensdale",
  "/solar-panels-reaghstown",
  "/solar-panels-riverstown",
  "/solar-panels-robinstown",
  "/solar-panels-rush",
  "/solar-panels-santry",
  "/solar-panels-skerries",
  "/solar-panels-skryne",
  "/solar-panels-slane",
  "/solar-panels-stabannon",
  "/solar-panels-stamullen",
  "/solar-panels-summerhill",
  "/solar-panels-sutton",
  "/solar-panels-swords",
  "/solar-panels-tallanstown",
  "/solar-panels-termonfeckin",
  "/solar-panels-tinure",
  "/solar-panels-trim",
  "/solar-panels-tullyallen",
  "/solar-panels-tyrrelstown",
  "/solar-panels-virginia",
  "/solar-panels-whitehall",
  "/solar-panels-whitestown",
  "/solar-panels-wilkinstown"
] as const;

const serviceMoves: readonly (readonly [string, string])[] = [
  [
    "/commercial-solar",
    "/solar/commercial"
  ],
  [
    "/agri-solar",
    "/solar/farm"
  ],
  [
    "/calculator",
    "/solar/calculator"
  ],
  [
    "/building-renovations",
    "/building"
  ],
  [
    "/builds-renovations",
    "/building"
  ],
  [
    "/builders-meath",
    "/building"
  ],
  [
    "/house-builders-navan",
    "/building/new-builds"
  ],
  [
    "/one-off-houses-meath",
    "/building/new-builds"
  ],
  [
    "/icf-builds",
    "/building/new-builds"
  ],
  [
    "/extensions-meath",
    "/building/extensions"
  ],
  [
    "/renovations-meath",
    "/renovations"
  ],
  [
    "/locations",
    "/about/areas"
  ],
  [
    "/solar-gallery",
    "/solar/projects-case-studies"
  ],
  [
    "/solar-case-studies",
    "/solar/projects-case-studies"
  ],
  [
    "/case-studies/solar-navan-estate",
    "/solar/projects-case-studies"
  ],
  [
    "/case-studies/one-off-build-meath",
    "/building/projects-case-studies"
  ]
];

export const legacyPageRedirects = [
  ...serviceMoves.map(([source, destination]) => ({ source, destination, permanent: true as const })),
  ...legacySolarLocationPaths.map(source => ({
    source, destination: '/solar/domestic', permanent: true as const,
  })),
];

// Keep image/document redirects type-compatible; never send gallery JPEGs to HTML.
export const legacyAssetRedirects = [
  { source: '/logo.png', destination: '/images/logo-orange.webp', permanent: true as const },
  { source: '/sitemap-images.xml', destination: '/sitemap.xml', permanent: true as const },
];

export const legacyRedirects = [...legacyPageRedirects, ...legacyAssetRedirects];
export const retainedLegacyPagePaths = ["/","/about","/contact","/solar"] as const;

// Explicit launch decisions remain. No blanket redirect hides removed services.
export const unresolvedLegacyPagePaths = [
  "/case-studies",
  "/electrical",
  "/electrician-ashbourne",
  "/electrician-drogheda",
  "/electrician-dundalk",
  "/electrician-kells",
  "/electrician-mullingar",
  "/electrician-navan",
  "/electrician-trim",
  "/gallery",
  "/referral",
  "/case-studies/rewire-trim-period-home"
] as const;

