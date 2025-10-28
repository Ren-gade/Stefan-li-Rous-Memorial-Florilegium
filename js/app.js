document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const closeSidebar = document.getElementById("closeSidebar");
  const modeToggle = document.getElementById("modeToggle");
  const fileGrid = document.getElementById("fileGrid");

  sidebarToggle.addEventListener("click", () =>
    sidebar.classList.toggle("show")
  );
  closeSidebar.addEventListener("click", () =>
    sidebar.classList.remove("show")
  );

  let darkModeType = "antique"; // 'antique' or 'modern'

  modeToggle.addEventListener("click", () => {
    const body = document.body;
    if (darkModeType === "antique") {
      if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("modern-dark-mode");
      } else if (body.classList.contains("modern-dark-mode")) {
        body.classList.remove("modern-dark-mode");
        body.classList.remove("light-mode");
      } else {
        body.classList.add("dark-mode");
      }
    }
  });

  fetch("data/files.json")
    .then((response) => response.json())
    .then((data) => renderCategories(data));

  function renderCategories(data) {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = "";
    Object.keys(data).forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline-secondary w-100 mb-2";
      btn.textContent = cat;
      btn.addEventListener("click", () => renderFiles(data[cat]));
      categoryList.appendChild(btn);
    });
  }

  function renderFiles(categoryData) {
    fileGrid.innerHTML = "";
    Object.keys(categoryData).forEach((subcat) => {
      const header = document.createElement("h4");
      header.textContent = subcat;
      fileGrid.appendChild(header);

      categoryData[subcat].forEach((file) => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        const card = document.createElement("div");
        card.className = "card p-2";

        // Download button opens in new tab
        card.innerHTML = `<div class='card-body text-center'>
            <h6>${file.name}</h6>
            <a href='${file.url}' target='_blank' rel='noopener noreferrer' class='download-btn mt-2'>Download</a>
          </div>`;

        col.appendChild(card);
        fileGrid.appendChild(col);
      });
    });
  }
});
