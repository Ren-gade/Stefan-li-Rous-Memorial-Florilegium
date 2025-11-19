fetch("header.html")
  .then((response) => response.text())
  .then((html) => {
    // Inject header HTML
    document.getElementById("header-container").innerHTML = html;

    // ============================================================
    // GA4 SNIPPET
    // ============================================================
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

    // ============================================================
    // DARK MODE
    // ============================================================
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

    // ============================================================
    // MOBILE SIDEBAR TOGGLE  (THIS WAS MISSING!)
    // ============================================================
    setTimeout(() => {
      const sidebarToggle = document.getElementById("sidebarToggle");
      const overlay = document.getElementById("mobileSidebarOverlay");

      if (!sidebarToggle) {
        console.warn("⚠️ sidebarToggle not found yet");
        return;
      }

      console.log("✅ Sidebar toggle FOUND & ACTIVATED");

      sidebarToggle.addEventListener("click", () => {
        document.body.classList.toggle("sidebar-open");
      });

      if (overlay) {
        overlay.addEventListener("click", () => {
          document.body.classList.remove("sidebar-open");
        });
      }
    }, 50); // small delay ensures header is fully injected
  })
  .catch((error) => console.error("Error loading header:", error));
