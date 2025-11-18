// ============================================================
// SCRAPERS
// ============================================================

// A: Scrape Class Recordings
async function loadClassRecordings() {
  try {
    const response = await fetch("class-recordings-by-category.html");
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const sections = doc.querySelectorAll(".letter-section");

    let results = [];

    sections.forEach((section) => {
      const sectionTitle = section.querySelector("h2")?.innerText.trim();
      if (!sectionTitle) return;

      const categoryLower = sectionTitle.toLowerCase();
      const id = section.getAttribute("id");

      section.querySelectorAll("li").forEach((li) => {
        const link = li.querySelector("a[href]");
        if (!link) return;

        const text = link.innerText.trim();

        // Tags inside <span class="tags">
        let tags = [];
        const tagSpan = li.querySelector("span.tags");
        if (tagSpan) {
          tags = tagSpan.innerText
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .filter((t) => t.length > 0);
        }

        results.push({
          title: text,
          description: "(Class Recording)",
          category: categoryLower,
          tags: tags,
          download_url: link.href,
          url: `class-recordings-by-category.html#${id}`,
        });
      });
    });

    return results;
  } catch (err) {
    console.error("Error loading Class Recordings:", err);
    return [];
  }
}

// B: Scrape Food-by-Region Page
async function loadFoodByRegion() {
  try {
    const response = await fetch("category-food-by-region.html");
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    let results = [];

    doc.querySelectorAll("h2").forEach((h2) => {
      const region = h2.innerText.trim();
      const regionLower = region.toLowerCase();
      const sectionId = h2.getAttribute("id");

      const list = h2.nextElementSibling;
      if (!list || !list.querySelectorAll) return;

      list.querySelectorAll("li").forEach((li) => {
        const text = li.innerText.trim();
        if (!text) return;

        results.push({
          title: text,
          description: `(Food by Region – ${region})`,
          category: regionLower,
          tags: ["food", "region"],
          download_url: "",
          url: `category-food-by-region.html#${sectionId}`,
        });
      });
    });

    return results;
  } catch (err) {
    console.error("Error scraping Food By Region:", err);
    return [];
  }
}

// ============================================================
// MAIN SCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", async function () {
  // ----------------------------------------------------------
  // DARK MODE
  // ----------------------------------------------------------
  const modeToggle = document.getElementById("modeToggle");
  if (modeToggle) {
    if (localStorage.getItem("darkMode") === "enabled") {
      document.documentElement.classList.add("dark-mode");
      modeToggle.textContent = "☀️";
    } else {
      modeToggle.textContent = "🌙";
    }

    modeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark-mode");
      const isDark = document.documentElement.classList.contains("dark-mode");
      modeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    });
  }

  const query = new URLSearchParams(window.location.search).get("q");

  // ----------------------------------------------------------
  // LOAD SIDEBAR (updated-menu.html)
  // ----------------------------------------------------------
  fetch("updated-menu.html")
    .then((res) => res.text())
    .then((data) => {
      const sidebar = document.getElementById("sidebar");
      if (!sidebar) return;
      sidebar.innerHTML = data;

      // Highlight current page
      const currentPage = window.location.pathname.split("/").pop();
      const links = sidebar.querySelectorAll(".category");
      links.forEach((link) => {
        if (link.getAttribute("data-page") === currentPage) {
          link.href = "#";
        }
      });

      // Attach sidebar tag search
      function attachSidebarSearch() {
        const tagSearchInput = document.getElementById("sidebarTagSearch");

        if (
          tagSearchInput &&
          typeof tagSearchInput.addEventListener === "function"
        ) {
          tagSearchInput.onkeydown = null;

          tagSearchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              const q = tagSearchInput.value.trim();
              if (q) {
                window.location.href = `tag.html?tag=${encodeURIComponent(q)}`;
              }
            }
          });
        } else {
          setTimeout(attachSidebarSearch, 300);
        }
      }

      setTimeout(attachSidebarSearch, 500);
    })
    .catch((error) => console.error("Error loading sidebar:", error));

  // ----------------------------------------------------------
  // LOAD DATA.JSON + SCRAPED DATA
  // ----------------------------------------------------------

  const baseData = await fetch("data/data.json")
    .then((r) => r.json())
    .catch(() => []);

  const classRecordings = await loadClassRecordings();
  const foodByRegion = await loadFoodByRegion();

  const combinedData = [...baseData, ...classRecordings, ...foodByRegion];

  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  const params = new URLSearchParams(window.location.search);
  const currentTag = params.get("tag");
  const currentCategory = window.currentCategory || null;

  let displayData = combinedData;

  // CATEGORY FILTER
  if (currentCategory) {
    const catLower = currentCategory.toLowerCase();
    displayData = displayData.filter(
      (item) =>
        (item.category && item.category.toLowerCase() === catLower) ||
        (item.tags && item.tags.includes(catLower))
    );
  }

  // TAG FILTER
  if (currentTag) {
    const tagLower = currentTag.toLowerCase();
    displayData = displayData.filter(
      (item) =>
        item.title.toLowerCase().includes(tagLower) ||
        (item.description &&
          item.description.toLowerCase().includes(tagLower)) ||
        (item.tags && item.tags.some((t) => t.includes(tagLower)))
    );
  }

  // SEARCH TERM FILTER
  if (query) {
    const qLower = query.toLowerCase();
    displayData = displayData.filter(
      (item) =>
        item.title.toLowerCase().includes(qLower) ||
        (item.description && item.description.toLowerCase().includes(qLower))
    );
  }

  // ----------------------------------------------------------
  // DISPLAY RESULTS USING YOUR EXISTING CARD STYLE
  // ----------------------------------------------------------
  function displayArticles(dataList, highlight = "") {
    contentArea.innerHTML = "";

    if (!dataList || dataList.length === 0) {
      contentArea.innerHTML = `<p>Oops… try a different search term.</p>`;
      return;
    }

    dataList.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("h5");
      title.innerHTML = highlight
        ? item.title.replace(
            new RegExp(`(${highlight})`, "gi"),
            '<span class="highlight">$1</span>'
          )
        : item.title;

      const desc = document.createElement("p");
      desc.textContent = item.description || "";

      const downloadBtn = document.createElement("button");
      downloadBtn.className = "download-btn";
      downloadBtn.textContent = "Open";
      downloadBtn.addEventListener("click", function () {
        window.open(item.download_url || item.url, "_blank");
      });

      const tagsDiv = document.createElement("div");
      tagsDiv.className = "tags";

      if (item.tags) {
        item.tags.forEach((tag) => {
          const span = document.createElement("span");
          span.className = "tag-badge";
          span.textContent = `#${tag}`;
          span.addEventListener("click", () => {
            window.location.href = `tag.html?tag=${encodeURIComponent(tag)}`;
          });
          tagsDiv.appendChild(span);
        });
      }

      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(downloadBtn);
      card.appendChild(tagsDiv);

      contentArea.appendChild(card);
    });
  }

  displayArticles(displayData, currentTag || currentCategory || query || "");

  // ----------------------------------------------------------
  // BACK TO TOP BUTTON
  // ----------------------------------------------------------
  const backBtn = document.getElementById("backToTopBtn");
  if (backBtn) {
    window.onscroll = function () {
      backBtn.style.display =
        document.documentElement.scrollTop > 200 ? "block" : "none";
    };

    backBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
