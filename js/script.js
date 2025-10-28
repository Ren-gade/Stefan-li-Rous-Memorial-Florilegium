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

        // Title
        const title = document.createElement("h5");
        title.innerHTML = query
          ? item.title.replace(
              new RegExp(`(${query})`, "gi"),
              '<span class="highlight">$1</span>'
            )
          : item.title;

        // Description
        const desc = document.createElement("p");
        desc.innerHTML = query
          ? item.description.replace(
              new RegExp(`(${query})`, "gi"),
              '<span class="highlight">$1</span>'
            )
          : item.description;

        // Download button
        const downloadBtn = document.createElement("button");
        downloadBtn.className = "download-btn btn btn-sm btn-primary";
        downloadBtn.textContent = "Download";
        downloadBtn.addEventListener("click", function () {
          window.open(item.download_url, "_blank");

          // ✅ GA4 event tracking
          if (typeof gtag === "function") {
            const fileName = item.download_url.split("/").pop();
            gtag("event", "file_download", {
              event_category: "Downloads",
              event_label: fileName,
              file_name: fileName,
              file_url: item.download_url,
              category: item.category || "Unknown",
            });
          }
        });

        // Tags
        const tagsDiv = document.createElement("div");
        tagsDiv.className = "tags";
        if (item.tags) {
          item.tags.forEach((tag) => {
            const span = document.createElement("span");
            span.className = "tag-badge";
            span.textContent = `#${tag}`;
            span.addEventListener("click", () => {
              window.location.href = `category-${tag
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[&]/g, "and")}.html`;
            });
            tagsDiv.appendChild(span);
          });
        }

        // Assemble card
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(downloadBtn);
        card.appendChild(tagsDiv);

        contentArea.appendChild(card);
      });
    });
});
