document.addEventListener("DOMContentLoaded", function () {
  // --- Dark mode toggle ---
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

  // --- Load Sidebar (updated-menu.html) ---
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

      // --- Sidebar search input (#sidebarTagSearch) ---
      function attachSidebarSearch() {
        const tagSearchInput = document.getElementById("sidebarTagSearch");

        if (
          tagSearchInput &&
          typeof tagSearchInput.addEventListener === "function"
        ) {
          console.log(
            "✅ Search input found, attaching Enter listener (final)."
          );

          tagSearchInput.onkeydown = null;

          tagSearchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              const q = tagSearchInput.value.trim();
              if (q) {
                console.log(
                  "Redirecting to:",
                  `${window.location.origin}/tag.html?tag=${encodeURIComponent(
                    q
                  )}`
                );
                window.location.href = `${
                  window.location.origin
                }/tag.html?tag=${encodeURIComponent(q)}`;
              } else {
                console.log("Empty query, no redirect.");
              }
            }
          });
        } else {
          console.log("⏳ Waiting for sidebarTagSearch to exist...");
          setTimeout(attachSidebarSearch, 300);
        }
      }

      setTimeout(attachSidebarSearch, 500);
    })
    .catch((error) => console.error("Error loading sidebar:", error));

  // --- Load and display articles ---
  fetch("data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const contentArea = document.getElementById("contentArea");
      if (!contentArea) return;

      const params = new URLSearchParams(window.location.search);
      const currentTag = params.get("tag");
      const currentCategory = window.currentCategory || null;

      let displayData = data;

      // --- Filter by category first ---
      if (currentCategory) {
        const catLower = currentCategory.toLowerCase();
        displayData = displayData.filter(
          (item) =>
            (item.category && item.category.toLowerCase() === catLower) ||
            (item.tags && item.tags.some((t) => t.toLowerCase() === catLower))
        );
      }

      // --- Then filter by tag if present ---
      if (currentTag) {
        const tagLower = currentTag.toLowerCase();
        displayData = displayData.filter(
          (item) =>
            item.title.toLowerCase().includes(tagLower) ||
            item.description.toLowerCase().includes(tagLower) ||
            (item.tags &&
              item.tags.some((t) => t.toLowerCase().includes(tagLower)))
        );
      }

      // --- Display articles ---
      function displayArticles(displayData, highlight = "") {
        contentArea.innerHTML = ""; // Clear content

        if (!displayData || displayData.length === 0) {
          contentArea.innerHTML = `<p>Oops… try a different search term.</p>`;
          return;
        }

        displayData.forEach((item) => {
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
          downloadBtn.className = "download-btn btn btn-sm btn-primary";
          downloadBtn.textContent = "Download";
          downloadBtn.addEventListener("click", function () {
            const fileUrl = item.download_url;
            window.open(fileUrl, "_blank");
            sendGAEvent(fileUrl, item.category);
          });

          const tagsDiv = document.createElement("div");
          tagsDiv.className = "tags";
          if (item.tags) {
            item.tags.forEach((tag) => {
              const span = document.createElement("span");
              span.className = "tag-badge";
              span.textContent = `#${tag}`;
              span.addEventListener("click", () => {
                window.location.href = `tag.html?tag=${encodeURIComponent(
                  tag
                )}`;
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

      displayArticles(
        displayData,
        currentTag || currentCategory || query || ""
      );
    })
    .catch((err) => console.error(err));

  // --- Back to Top Button ---
  const backBtn = document.getElementById("backToTopBtn");
  if (backBtn) {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        backBtn.style.display = "block";
      } else {
        backBtn.style.display = "none";
      }
    };

    backBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- GA4 helper ---
  function sendGAEvent(fileUrl, category = "Unknown") {
    if (typeof gtag === "function") {
      const fileName = fileUrl.split("/").pop();
      gtag("event", "file_download", {
        event_category: "Downloads",
        event_label: fileName,
        file_name: fileName,
        file_url: fileUrl,
        category: category,
      });
    }
  }
});
