const axios = require("axios");
const { JSDOM } = require("jsdom");
const prettier = require("prettier");
const fs = require("fs");
const path = require("path");

// Auto-tag rules
const TAG_RULES = [
  { tag: "archery", match: ["arrow", "archery", "crossbow", "fletch"] },
  { tag: "armored", match: ["armored", "combat"] },
  { tag: "fencing", match: ["fencing", "rapier", "sword"] },
  { tag: "youth", match: ["youth", "kid"] },
  { tag: "marshal", match: ["marshal", "marshaling"] },
  { tag: "research", match: ["history", "study", "research"] },
  { tag: "art", match: ["paint", "draw", "print", "design"] },
  { tag: "crafts", match: ["leather", "wood", "metal", "craft"] },
];

// Tag extractor
function getTags(text) {
  const lower = text.toLowerCase();
  return TAG_RULES.filter((rule) =>
    rule.match.some((word) => lower.includes(word))
  ).map((r) => r.tag);
}

async function generateTags() {
  const url =
    "https://memorial-florilegium.netlify.app/class-recordings-by-category";

  console.log("🔍 Fetching page…");
  const response = await axios.get(url);

  const dom = new JSDOM(response.data);
  const document = dom.window.document;

  const sections = document.querySelectorAll(".letter-section");

  let count = 0;

  sections.forEach((section) => {
    section.querySelectorAll("li").forEach((li) => {
      const content = li.innerText?.trim();
      if (!content) return;

      const tags = getTags(content);
      if (tags.length === 0) return;

      const span = document.createElement("span");
      span.className = "class-tags";
      span.textContent = " | " + tags.map((t) => "#" + t).join(" ");
      li.appendChild(span);

      count++;
    });
  });

  // Pretty print HTML
  const finalHTML = await prettier.format(dom.serialize(), { parser: "html" });

  const outputPath = path.join(
    __dirname,
    "../class-recordings-by-category.html"
  );
  const backupPath = path.join(
    __dirname,
    "../class-recordings-by-category.BAK.html"
  );

  // Backup existing file
  if (fs.existsSync(outputPath)) {
    fs.copyFileSync(outputPath, backupPath);
    console.log("📦 Backup created:", backupPath);
  }

  // Write updated file
  fs.writeFileSync(outputPath, finalHTML, "utf-8");

  console.log(`🏷 Auto-tagged ${count} classes`);
  console.log(`💾 Updated file saved to: ${outputPath}`);
  console.log("🎉 Done!");
}

generateTags().catch((err) => console.error("❌ ERROR:", err));
