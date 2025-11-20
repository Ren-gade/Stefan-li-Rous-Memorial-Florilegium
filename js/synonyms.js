// ============================================================
// SYNONYM CLUSTERS
// (Cleaned, deduped, normalized)
// ============================================================

const synonymClusters = {
  britain: [
    "anglo",
    "anglo-saxon",
    "britain",
    "british",
    "england",
    "english",
    "uk",
  ],

  celtic: [
    "celtic",
    "cornish",
    "cornwall",
    "ireland",
    "irish",
    "scotland",
    "scottish",
    "wales",
    "welsh",
  ],

  ireland: ["hibernia", "ireland", "irish"],
  scotland: ["alba", "scotland", "scottish"],
  wales: ["cymru", "wales", "welsh"],

  italy: [
    "italian",
    "italy",
    "roman",
    "romans",
    "romano",
    "venetian",
    "venice",
  ],

  roman: ["italy", "roman", "romans"],
  venice: ["italian", "italy", "venetian", "venice"],

  spain: [
    "castile",
    "castilian",
    "hispanic",
    "iberia",
    "iberian",
    "spain",
    "spanish",
  ],

  andalusia: [
    "al-andalus",
    "andalusia",
    "andalusian",
    "islamic spain",
    "moors",
    "moorish",
  ],

  france: ["france", "frankish", "gaul", "gaulish", "french"],
  french: ["france", "french", "frankish"],
  norman: ["france", "norman", "normandy"],

  germany: ["german", "germany", "hre", "holy roman empire", "teutonic"],
  german: ["german", "germany", "holy roman empire", "teutonic"],

  viking: [
    "danish",
    "denmark",
    "norse",
    "norway",
    "norwegian",
    "scandinavia",
    "scandinavian",
    "sweden",
    "swedish",
    "viking",
  ],

  greece: ["greece", "greek", "hellas", "hellenic"],
  greek: ["greece", "greek", "hellas"],

  byzantium: [
    "byzantine",
    "byzantium",
    "constantinople",
    "eastern roman empire",
  ],

  ottoman: ["anatolia", "osmanli", "ottoman", "turkey", "turkish"],
  turkish: ["turkish", "ottoman", "anatolia"],

  arab: ["arab", "arabic", "abbasid", "caliphate", "levant", "middle east"],

  levant: ["lebanon", "levant", "levantine", "palestine", "syria"],

  middleeast: [
    "abbasid",
    "arab",
    "assyrian",
    "babylonian",
    "islamic",
    "levant",
    "mesopotamia",
    "middle east",
    "ottoman",
  ],

  mesopotamia: ["assyrian", "babylonian", "mesopotamia"],

  persia: [
    "farsi",
    "iran",
    "iranian",
    "parthian",
    "persia",
    "persian",
    "sassanian",
    "sassanid",
  ],

  india: ["hindustan", "india", "indian", "mughal", "mughal empire"],

  china: ["china", "chinese", "sino"],
  japanese: ["japan", "japanese", "nippon"],
  japan: ["japan", "japanese", "nippon"],

  aztec: ["aztec", "mexica", "mesoamerica", "nahua"],
  mesoamerica: ["aztec", "maya", "mesoamerica", "mexica", "olmec"],

  aubergine: ["aubergine", "brinjal", "eggplant"],
  eggplant: ["aubergine", "eggplant"],
  chickpea: ["chick pea", "chickpea", "garbanzo"],
  garbanzo: ["chick pea", "chickpea", "garbanzo"],

  fava: ["broad bean", "fava"],
  broadbean: ["broad bean", "fava"],

  lamb: ["lamb", "mutton"],
  pottage: ["potherbs", "pottage", "porridge"],
  spice: ["seasoning", "spice", "spices"],

  portugal: [
    "iberia",
    "iberian",
    "lusitania",
    "lusitanian",
    "portugal",
    "portugall",
    "portugese",
    "portuguese",
    "portingale",
  ],

  morocco: [
    "amazigh",
    "barbary",
    "berber",
    "maghreb",
    "maghrebi",
    "morocco",
    "moroccan",
    "north africa",
    "tamazight",
  ],

  sicily: [
    "sicilia",
    "sicilian",
    "sicily",
    "trinacria",
    "norman sicily",
    "saracen sicily",
    "islamic sicily",
  ],

  outremer: [
    "acre",
    "antioch",
    "crusader states",
    "holy land",
    "jerusalem",
    "outremer",
    "palestine",
    "syria",
    "tripoli",
  ],

  rus: [
    "kiev",
    "kievan rus",
    "russian",
    "russia",
    "slav",
    "slavic",
    "ukraine",
    "ukrainian",
    "rus",
  ],

  slavic: [
    "bohemia",
    "bohemian",
    "bulgarian",
    "bulgaria",
    "czech",
    "croatia",
    "croatian",
    "moravia",
    "poland",
    "polish",
    "serbia",
    "serbian",
    "slav",
    "slavic",
    "slovene",
    "ukraine",
  ],

  occitan: [
    "langue d'oc",
    "occitan",
    "occitania",
    "provence",
    "provencal",
    "southern france",
  ],

  egypt: [
    "alexandria",
    "cairo",
    "coptic",
    "egypt",
    "egyptian",
    "fustat",
    "mamluk",
    "misr",
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
