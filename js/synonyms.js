const synonyms = {
  /* --- REGIONS & CULTURES --- */

  algeria: ["algeria", "algerian", "maghreb"],
  anatolia: ["anatolia", "turkey", "ottoman"],
  andalusia: [
    "andalusia",
    "andalusian",
    "al-andalus",
    "moors",
    "moorish",
    "islamic spain",
  ],
  arab: ["arab", "arabic", "abbasid", "caliphate", "middle east", "levant"],
  armenia: ["armenia", "armenian", "caucasus"],

  balkans: [
    "balkans",
    "balkan",
    "serbia",
    "serbian",
    "croatia",
    "croatian",
    "bulgaria",
    "bulgarian",
    "slavic",
    "byzantine",
  ],
  berber: [
    "berber",
    "amazigh",
    "tamazight",
    "maghreb",
    "maghrebi",
    "morocco",
    "algeria",
    "tunisia",
  ],
  britain: [
    "britain",
    "british",
    "england",
    "english",
    "uk",
    "anglo",
    "anglo-saxon",
  ],
  byzantine: [
    "byzantium",
    "byzantine",
    "constantinople",
    "eastern roman empire",
  ],

  celtic: [
    "celtic",
    "ireland",
    "irish",
    "scotland",
    "scottish",
    "welsh",
    "wales",
    "cornwall",
    "cornish",
  ],
  china: ["china", "chinese", "sino"],
  cyprus: ["cyprus", "cypriot", "cypriote", "kibris"],

  egypt: ["egypt", "egyptian", "mamluk", "coptic", "misr", "fustat", "cairo"],
  england: ["england", "english", "britain", "british", "uk", "anglo"],
  ethiopia: ["ethiopia", "ethiopian", "abyssinia"],

  france: ["france", "french", "frankish", "gaul", "gaulish"],

  greece: ["greece", "greek", "hellas", "hellenic"],

  iberia: ["iberia", "iberian", "spain", "spanish"],
  india: ["india", "indian", "hindustan", "mughal", "mughal empire"],
  iran: [
    "iran",
    "persia",
    "persian",
    "iranian",
    "farsi",
    "parthian",
    "sassanian",
    "sassanid",
  ],
  ireland: ["ireland", "irish", "hibernia"],
  israel: ["israel", "hebrew", "jewish", "judah", "judea", "yisrael"],

  italy: [
    "italy",
    "italian",
    "venice",
    "venetian",
    "roman",
    "romans",
    "romano",
  ],

  japan: ["japan", "japanese", "nippon"],

  levant: [
    "levant",
    "levantine",
    "middle east",
    "syria",
    "palestine",
    "lebanon",
  ],
  lusitania: [
    "lusitania",
    "lusitanian",
    "portugal",
    "portuguese",
    "iberia",
    "iberian",
  ],

  maghreb: [
    "maghreb",
    "maghrebi",
    "north africa",
    "morocco",
    "algeria",
    "tunisia",
    "berber",
    "amazigh",
  ],
  mesopotamia: ["mesopotamia", "assyrian", "babylonian"],
  morocco: [
    "morocco",
    "moroccan",
    "maghreb",
    "maghrebi",
    "berber",
    "amazigh",
    "tamazight",
  ],

  norman: ["norman", "normandy", "france"],
  norse: ["norse", "viking", "scandinavian"],
  northafrica: [
    "north africa",
    "maghreb",
    "morocco",
    "algeria",
    "tunisia",
    "berber",
    "amazigh",
  ],

  ottoman: ["ottoman", "turkish", "turkey", "anatolia", "osmanli"],

  poland: ["poland", "polish", "slavic", "slav"],
  portugal: [
    "portugal",
    "portuguese",
    "lusitania",
    "lusitanian",
    "portugall",
    "portingale",
    "iberia",
    "iberian",
  ],
  provence: ["provence", "provencal", "occitan", "occitania", "langue d'oc"],

  rome: ["rome", "roman", "romans", "italy"],
  rus: [
    "rus",
    "kiev",
    "kievan rus",
    "slavic",
    "slav",
    "russia",
    "russian",
    "ukraine",
    "ukrainian",
    "byzantine influence",
  ],

  scandinavia: [
    "scandinavia",
    "scandinavian",
    "viking",
    "norway",
    "sweden",
    "denmark",
    "norwegian",
    "danish",
    "swedish",
  ],
  scotland: ["scotland", "scottish", "alba"],
  sicily: [
    "sicily",
    "sicilian",
    "norman sicily",
    "saracen sicily",
    "islamic sicily",
    "sicilia",
    "trinacria",
  ],
  slavic: [
    "slavic",
    "slav",
    "rus",
    "russian",
    "ukrainian",
    "polish",
    "czech",
    "bohemian",
    "moravian",
    "serbian",
    "croatian",
    "slovene",
    "bulgarian",
  ],
  spain: [
    "spain",
    "spanish",
    "iberia",
    "iberian",
    "castile",
    "castilian",
    "hispanic",
  ],

  tunisia: ["tunisia", "tunisian", "maghreb", "ifriqiya"],
  turkey: ["turkey", "turkish", "anatolia", "ottoman", "osmanli"],

  ukraine: ["ukraine", "ukrainian", "rus", "kievan rus", "slavic"],

  wales: ["wales", "welsh", "cymru"],

  /* --- RELIGION / GROUPS --- */

  christian: ["christian", "church", "ecclesiastical", "catholic"],
  jewish: [
    "jewish",
    "hebrew",
    "israelite",
    "yisrael",
    "semitic",
    "judah",
    "judea",
  ],
  muslim: ["muslim", "islamic", "islam", "umayyad", "abbasid"],

  /* --- INGREDIENTS & FOOD TERMS --- */

  aubergine: ["aubergine", "eggplant", "brinjal"],
  barley: ["barley", "grain", "cereal"],
  bread: ["bread", "loaf", "breadmaking", "baker", "baking"],

  butter: ["butter", "ghee", "clarified butter"],

  cheese: ["cheese", "curd"],
  chickpea: ["chickpea", "garbanzo", "chick peas"],
  dairy: ["dairy", "milk", "cheese", "butter", "cream"],
  duck: ["duck", "waterfowl"],

  fava: ["fava", "broad bean"],
  fruit: ["fruit", "fruits"],

  grain: ["grain", "cereal", "barley", "wheat", "emmer", "einkorn"],

  goose: ["goose", "geese", "waterfowl"],

  herbs: ["herbs", "spices", "seasoning", "aromatics"],
  lamb: ["lamb", "mutton"],

  mint: ["mint", "mentha"],
  basil: ["basil", "ocimum"],

  pork: ["pork", "hog", "boar"],

  rice: ["rice", "oryza"],

  spice: ["spice", "spices", "seasoning"],

  stew: ["stew", "stewed", "stewing", "potage", "broth", "soup"],

  wheat: ["wheat", "grain", "flour"],

  /* --- TECHNIQUES & METHODS --- */

  roast: ["roast", "roasting", "rotisserie", "spit roast"],
  fry: ["fry", "fried", "frying", "saute", "sauteed"],
  brew: ["brew", "brewing", "ale", "mead", "beer", "fermentation"],

  /* --- MEDIEVAL / SCA --- */

  armor: ["armor", "armour", "mail", "chainmail", "hauberk"],
  sword: ["sword", "blade", "arming sword", "longsword", "rattan"],

  fencing: ["fencing", "rapier", "foil", "sidesword"],

  manuscript: ["manuscript", "illumination", "codex", "folio"],
  ink: ["ink", "pigment", "dye"],

  medieval: [
    "medieval",
    "middle ages",
    "feudal",
    "feudalism",
    "dark ages",
    "european",
  ],
};

// ============================================================
// FAST LOOKUP TABLE
// ============================================================

const synonymLookup = {};

for (const clusterKey in synonymClusters) {
  const cluster = synonymClusters[clusterKey];
  cluster.forEach((term) => {
    synonymLookup[term.toLowerCase()] = cluster;
  });
}

// ============================================================
// EXPORT TO GLOBAL SCOPE
// ============================================================

window.synonymLookup = synonymLookup;
window.synonymClusters = synonymClusters;
