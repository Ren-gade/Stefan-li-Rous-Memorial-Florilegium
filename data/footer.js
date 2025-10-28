fetch("footer.html")
  .then((response) => response.text())
  .then((html) => {
    // Inject footer HTML into the container
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = html;

    // Now the #year span exists — set it
    const yearSpan = footerContainer.querySelector("#year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  })
  .catch((error) => console.error("Error loading footer:", error));
