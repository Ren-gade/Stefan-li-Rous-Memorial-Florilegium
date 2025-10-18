
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Sidebar toggle (if implemented)
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.toggle('collapsed');
        });
    }

    // Load JSON and display articles (placeholder for index and articles pages)
    const dataUrl = 'data/data.json';
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            const contentArea = document.getElementById('contentArea');
            if(contentArea) {
                data.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    let tagsHtml = '';
                    if(item.tags) {
                        item.tags.forEach(tag => {
                            tagsHtml += `<span class="tag-badge" onclick="window.location.href='search.html?q=${tag}'">#${tag}</span>`;
                        });
                    }
                    card.innerHTML = `<h5>${item.title}</h5>
                                      <p>${item.description}</p>
                                      <a href="${item.download_url}" class="btn btn-sm btn-primary" target="_blank">Download</a>
                                      <div class="tags">${tagsHtml}</div>`;
                    contentArea.appendChild(card);
                });
            }
        });
});
