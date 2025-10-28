document.addEventListener("DOMContentLoaded", function () {
  // Dark mode toggle
  const modeToggle = document.getElementById("modeToggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // Sidebar search redirect
  const searchInput = document.getElementById("sidebarSearch");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // Sidebar toggle (optional)
  const sidebarToggle = document.getElementById("sidebarToggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) sidebar.classList.toggle("collapsed");
    });
  }

  // Function to get URL param
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const query = getQueryParam("q");
  const currentCategory = window.currentCategory || null;

  // --- Load Categories dynamically ---
  fetch("data/categories.json")
    .then((res) => res.json())
    .then((categories) => {
      const categoryList = document.getElementById("categoryList");
      if (!categoryList) return;
      categoryList.innerHTML = "";

      categories.forEach((cat) => {
        const link = document.createElement("p");
        const url = `category-${cat
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[&]/g, "and")}.html`;
        link.innerHTML = `<a href="${url}">${cat}</a>`;
        categoryList.appendChild(link);
      });
    });

  // --- Load and display articles ---
  fetch("data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const contentArea = document.getElementById("contentArea");
      if (!contentArea) return;

      contentArea.innerHTML = ""; // Clear existing content

      let displayData = data;

      // Filter by search query if present
      if (query) {
        const q = query.toLowerCase();
        displayData = displayData.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            (item.tags &&
              item.tags.some((tag) => tag.toLowerCase().includes(q)))
        );
      }

      // Filter by current page category if set
      if (currentCategory) {
        const cat = currentCategory.toLowerCase();
        displayData = displayData.filter(
          (item) => item.category && item.category.toLowerCase() === cat
        );
      }

      // Generate cards
      displayData.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";

        let tagsHtml = "";
        if (item.tags) {
          item.tags.forEach((tag) => {
            tagsHtml += `<span class="tag-badge" onclick="window.location.href='category-${tag
              .toLowerCase()
              .replace(/ /g, "-")
              .replace(/[&]/g, "and")}.html'">#${tag}</span>`;
          });
        }

        let titleHtml = item.title;
        let descHtml = item.description;

        // Highlight query matches
        if (query) {
          const regex = new RegExp(`(${query})`, "gi");
          titleHtml = titleHtml.replace(
            regex,
            '<span class="highlight">$1</span>'
          );
          descHtml = descHtml.replace(
            regex,
            '<span class="highlight">$1</span>'
          );
        }

        // Create the download button as a proper <a> with target="_blank"
        card.innerHTML = `<h5>${titleHtml}</h5>
                          <p>${descHtml}</p>
                          <a href="${item.download_url}" class="download-btn" target="_blank" rel="noopener noreferrer">Download</a>
                          <div class="tags">${tagsHtml}</div>`;

        contentArea.appendChild(card);
      });
    });
});
