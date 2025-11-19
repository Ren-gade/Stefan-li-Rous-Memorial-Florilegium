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
      sidebar.querySelectorAll("[data-page]").forEach((link) => {
        if (link.getAttribute("data-page") === currentPage) {
          link.href = "#";
        }
      });

      // Sidebar search initialization
      function attachSidebarSearch() {
        const tagSearchInput = document.getElementById("sidebarTagSearch");

        if (tagSearchInput) {
          tagSearchInput.onkeydown = null;

          tagSearchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              e.preventDefault();
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
  // MOBILE SIDEBAR DRAWER
  // ----------------------------------------------------------
  const sidebarToggle = document.getElementById("sidebarToggle");
  const overlay = document.getElementById("mobileSidebarOverlay");

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");
    });
  }

  // ----------------------------------------------------------
  // LOAD DATA.JSON
  // ----------------------------------------------------------
  const data = await fetch("data/data.json")
    .then((response) => response.json())
    .catch(() => []);

  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  const params = new URLSearchParams(window.location.search);
  const currentTag = params.get("tag");
  const currentCategory = window.currentCategory || null;

  let displayData = data;

  // Category filter first
  if (currentCategory) {
    const catLower = currentCategory.toLowerCase();
    displayData = displayData.filter(
      (item) =>
        (item.category && item.category.toLowerCase() === catLower) ||
        (item.tags && item.tags.some((t) => t.toLowerCase() === catLower))
    );
  }

  // Tag filter second
  if (currentTag) {
    const tagLower = currentTag.toLowerCase();
    displayData = displayData.filter(
      (item) =>
        item.title.toLowerCase().includes(tagLower) ||
        (item.description &&
          item.description.toLowerCase().includes(tagLower)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(tagLower)))
    );
  }

  // Search query filter
  if (query) {
    const qLower = query.toLowerCase();
    displayData = displayData.filter(
      (item) =>
        item.title.toLowerCase().includes(qLower) ||
        (item.description && item.description.toLowerCase().includes(qLower))
    );
  }

  // ----------------------------------------------------------
  // DISPLAY RESULTS
  // ----------------------------------------------------------
  function displayArticles(list, highlight = "") {
    contentArea.innerHTML = "";

    if (!list || list.length === 0) {
      contentArea.innerHTML = `<p>Oops… try a different search term.</p>`;
      return;
    }

    list.forEach((item) => {
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
      desc.innerHTML = highlight
        ? item.description.replace(
            new RegExp(`(${highlight})`, "gi"),
            '<span class="highlight">$1</span>'
          )
        : item.description;

      const downloadBtn = document.createElement("button");
      downloadBtn.className = "download-btn";
      downloadBtn.textContent = "Open";
      downloadBtn.addEventListener("click", () => {
        const fileUrl = item.download_url || item.url;
        if (fileUrl) {
          window.open(fileUrl, "_blank");
        }
      });

      const tagsDiv = document.createElement("div");
      tagsDiv.className = "tags";

      if (item.tags) {
        item.tags.forEach((tag) => {
          const tagSpan = document.createElement("span");
          tagSpan.className = "tag-badge";
          tagSpan.textContent = `#${tag}`;
          tagSpan.addEventListener("click", () => {
            window.location.href = `tag.html?tag=${encodeURIComponent(tag)}`;
          });
          tagsDiv.appendChild(tagSpan);
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
    window.addEventListener("scroll", () => {
      backBtn.style.display =
        document.documentElement.scrollTop > 200 ? "block" : "none";
    });

    backBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }
});
