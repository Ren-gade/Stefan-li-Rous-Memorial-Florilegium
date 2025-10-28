// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Function to send GA4 download event
  function sendDownloadEvent(fileUrl) {
    if (typeof gtag === "function") {
      const fileName = fileUrl.split("/").pop();
      gtag("event", "file_download", {
        event_category: "Downloads",
        event_label: fileName,
        file_name: fileName,
        file_url: fileUrl,
      });
    } else {
      // gtag not ready yet, try again shortly
      setTimeout(() => sendDownloadEvent(fileUrl), 100);
    }
  }

  // Listen for clicks on download buttons AND alphabet list links
  document.addEventListener("click", function (e) {
    let target = e.target;

    // Check if it is a download button or a link inside the alphabet list
    if (
      target.classList.contains("download-btn") ||
      (target.tagName === "A" && target.closest(".alphabet-list"))
    ) {
      const fileUrl =
        target.getAttribute("data-download-url") || target.href || "unknown";

      // Open in new tab
      window.open(fileUrl, "_blank");

      // Send GA4 event
      sendDownloadEvent(fileUrl);

      e.preventDefault(); // Prevent default navigation since we handled it
    }
  });
});
