document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const mysteryId = params.get("id");

    const container = document.getElementById("mystery-content");

    if (!mysteryId) {
        container.innerHTML = "<h2>No mystery ID provided.</h2>";
        return;
    }

    fetch("mysteries.json")
        .then(response => response.json())
        .then(data => {
            const mystery = data.find(m => m.id === mysteryId);

            if (!mystery) {
                container.innerHTML = "<h2>Mystery not found.</h2>";
                return;
            }

            container.innerHTML = `
                <div class="detail-container">
                    <div class="detail-header">
                        <div class="detail-icon">${mystery.icon}</div>
                        <h1 class="detail-title">${mystery.title}</h1>
                        <div class="detail-meta">
                            <span><strong>Location:</strong> ${mystery.location}</span>
                            <span><strong>Date:</strong> ${mystery.date}</span>
                        </div>
                    </div>

                    <div class="detail-content">
                        <p>${mystery.full_desc}</p>
                    </div>

                    <a class="back-button" href="index.html">← Back to Mysteries</a>
                </div>
            `;
        })
        .catch(error => {
            console.error("Error loading mystery:", error);
            container.innerHTML = "<h2>Error loading mystery data.</h2>";
        });
});
