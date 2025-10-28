fetch("header.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("header-container").innerHTML = html;

    const modeToggle = document.getElementById("modeToggle");
    if (!modeToggle) return;

    // Initialize mode from localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
      document.documentElement.classList.add("dark-mode");
      modeToggle.textContent = "☀️";
    } else {
      modeToggle.textContent = "🌙";
    }

    // Toggle on click
    modeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark-mode");
      const isDark = document.documentElement.classList.contains("dark-mode");
      modeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    });
  })
  .catch((error) => console.error("Error loading header:", error));
