const axios = require("axios");
const { JSDOM } = require("jsdom");
const prettier = require("prettier");

// 🔥 Define auto-tag rules
const TAG_RULES = [
  { tag: "archery", match: ["arrow", "archery", "crossbow", "fletching"] },
  { tag: "armored", match: ["armored", "combat"] },
  { tag: "fencing", match: ["fencing", "rapier"] },
  { tag: "youth", match: ["youth", "kids"] },
  { tag: "marshal", match: ["marshal", "marshaling"] },
  { tag: "research", match: ["history", "study", "research"] },
  { tag: "art", match: ["painting", "drawing", "print", "design"] },
  { tag: "crafts", match: ["leather", "wood", "metal", "craft"] },
];

// Auto-tag function
function getTags(text) {
  const lower = text.toLowerCase();
  let found = [];

  TAG_RULES.forEach((rule) => {
    if (rule.match.some((w) => lower.includes(w))) {
      found.push(rule.tag);
    }
  });

  return found;
}

async function generate() {
  console.log("Fetching HTML…");

  const url =
    "https://memorial-florilegium.netlify.app/class-recordings-by-category";

  const response = await axios.get(url);
  const dom = new JSDOM(response.data);
  const document = dom.window.document;

  const sections = document.querySelectorAll(".letter-section");

  sections.forEach((section) => {
    section.querySelectorAll("li").forEach((li) => {
      const text = li.innerText.trim();
      const tags = getTags(text);

      if (tags.length > 0) {
        const span = document.createElement("span");
        span.className = "class-tags";
        span.textContent = "  |  " + tags.map((t) => "#" + t).join(" ");
        li.appendChild(span);
      }
    });
  });

  let formatted = await prettier.format(dom.serialize(), { parser: "html" });

  console.log("\n✨ DONE! The updated file is below:\n\n");
  console.log(formatted);
}

generate().catch(console.error);
