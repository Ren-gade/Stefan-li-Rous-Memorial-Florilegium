// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Wait until gtag is available
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

  // Listen for clicks on download buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("download-btn")) {
      const fileUrl =
        e.target.getAttribute("data-download-url") ||
        e.target.href ||
        "unknown";

      // Open in new tab
      window.open(fileUrl, "_blank");

      // Send GA4 event
      sendDownloadEvent(fileUrl);
    }
  });
});
