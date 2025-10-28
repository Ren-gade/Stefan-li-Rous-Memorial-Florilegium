// Wait until GA and DOM are ready
document.addEventListener("DOMContentLoaded", function () {
  // Listen for clicks on any download button
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("download-btn")) {
      const fileUrl =
        e.target.getAttribute("data-download-url") ||
        e.target.href ||
        "unknown";
      const fileName = fileUrl.split("/").pop();

      // Send custom GA4 event
      gtag("event", "file_download", {
        event_category: "Downloads",
        event_label: fileName,
        file_name: fileName,
        file_url: fileUrl,
      });
    }
  });
});
