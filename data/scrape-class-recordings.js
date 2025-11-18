const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const prettier = require("prettier");

const URL =
  "https://memorial-florilegium.netlify.app/class-recordings-by-category.html";

async function scrapeClassRecordings() {
  try {
    console.log("Fetching page...");

    const response = await axios.get(URL);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const sections = document.querySelectorAll(".letter-section");

    let results = [];

    sections.forEach((section) => {
      const h2 = section.querySelector("h2");
      const sectionTitle = h2 ? h2.textContent.trim() : "Untitled";

      const id = section.getAttribute("id");

      // FIXED: get only the FIRST <a> inside the <li>, even if multiple exist
      const items = section.querySelectorAll("li");

      items.forEach((li) => {
        const firstLink = li.querySelector("a");

        if (!firstLink) return;

        results.push({
          title: firstLink.textContent.trim(),
          category: sectionTitle,
          url: `class-recordings-by-category.html#${id}`,
          tags: [], // placeholder, filled later
        });
      });
    });

    // Pretty-print JSON
    const output = prettier.format(JSON.stringify(results), {
      parser: "json",
    });

    fs.writeFileSync("class-recordings.json", output);

    console.log("✅ Done! Saved as class-recordings.json");
  } catch (err) {
    console.error("❌ Scrape failed:", err);
  }
}

scrapeClassRecordings();
