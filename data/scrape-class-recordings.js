const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const prettier = require("prettier");

const URL =
  "https://memorial-florilegium.netlify.app/class-recordings-by-category";

async function scrapeClassRecordings() {
  console.log("Fetching page...");

  const response = await axios.get(URL);
  const dom = new JSDOM(response.data);
  const document = dom.window.document;

  const sections = document.querySelectorAll(".letter-section");

  let results = [];

  sections.forEach((section) => {
    const h2 = section.querySelector("h2");
    const title = h2 ? h2.textContent.trim() : "Untitled";

    const id = section.getAttribute("id");

    const items = section.querySelectorAll("li a:first-child");

    items.forEach((a) => {
      results.push({
        title: a.textContent.trim(),
        category: title,
        url: `class-recordings-by-category.html#${id}`,
        tags: [], // will fill later
      });
    });
  });

  // ⭐ FIXED: Prettier v3 requires await
  const output = await prettier.format(JSON.stringify(results), {
    parser: "json",
  });

  fs.writeFileSync("class-recordings.json", output);

  console.log("Done! File saved as class-recordings.json");
}

scrapeClassRecordings().catch(console.error);
