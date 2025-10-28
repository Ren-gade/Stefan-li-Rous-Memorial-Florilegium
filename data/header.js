fetch("header.html")
  .then((response) => response.text())
  .then((html) => {
    // Inject header HTML
    document.getElementById("header-container").innerHTML = html;

    // --- GA4 snippet injection ---
    (function () {
      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src =
        "https://www.googletagmanager.com/gtag/js?id=G-3G5VT9X2VF";
      document.head.appendChild(gtagScript);

      const inlineScript = document.createElement("script");
      inlineScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-3G5VT9X2VF');
      `;
      document.head.appendChild(inlineScript);
    })();

    // --- Dark Mode Handling ---
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
