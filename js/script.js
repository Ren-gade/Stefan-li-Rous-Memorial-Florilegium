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

  // Load JSON and display cards
  const dataUrl = "data/data.json";
  fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => {
      const contentArea = document.getElementById("contentArea");
      if (!contentArea) return;

      contentArea.innerHTML = ""; // Clear existing content

      let displayData = data;

      if (query) {
        const q = query.toLowerCase();
        displayData = data.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            (item.tags &&
              item.tags.some((tag) => tag.toLowerCase().includes(q)))
        );
      }

      displayData.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";

        let tagsHtml = "";
        if (item.tags) {
          item.tags.forEach((tag) => {
            tagsHtml += `<span class="tag-badge" onclick="window.location.href='search.html?q=${tag}'">#${tag}</span>`;
          });
        }

        // Highlight query in title and description
        let titleHtml = item.title;
        let descHtml = item.description;
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

        card.innerHTML = `<h5>${titleHtml}</h5>
                                  <p>${descHtml}</p>
                                  <a href="${item.download_url}" class="btn btn-sm btn-primary" target="_blank">Download</a>
                                  <div class="tags">${tagsHtml}</div>`;

        contentArea.appendChild(card);
      });
    });
});
