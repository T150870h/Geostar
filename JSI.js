let allCountries = [];

document.addEventListener("DOMContentLoaded", async () => {
    const username = localStorage.getItem("username") || "undefined";
    document.getElementById("usernameDisplay").textContent = `User: ${username}`;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>Loading countries...</p>`;

    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        allCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        applyFiltersAndSort();
    } catch (error) {
        console.error("Error fetching countries:", error.message);
        resultDiv.innerHTML = `<p style="color: red;">Failed to load countries. Loading fallback data...</p>`;
        // Fallback data
        const fallbackData = [
            { name: { common: "Country A" }, flags: { png: "" }, region: "Region A", population: 1000, area: 500 },
            { name: { common: "Country B" }, flags: { png: "" }, region: "Region B", population: 2000, area: 1000 },
        ];
        allCountries = fallbackData;
        applyFiltersAndSort();
    }
});

function displayCountries(countries) {
    const resultDiv = document.getElementById("result");
    if (!countries || countries.length === 0) {
        resultDiv.innerHTML = `<p>No countries found.</p>`;
        return;
    }

    resultDiv.innerHTML = `<div class="country-list">` +
        countries.map((country) => `
            <div class="country">
                <h3>${country.name?.common || "Unknown"}</h3>
                <img src="${country.flags?.png || ''}" alt="Flag of ${country.name?.common || 'N/A'}" width="100">
                <button onclick="viewDetails('${country.name.common}')">
                    <img src="../Images/Details.png" alt="" class="imgp">View Details
                </button>
            </div>
        `).join('') + `</div>`;
}

function viewDetails(countryName) {
    window.location.href = `details.html?country=${encodeURIComponent(countryName)}`;
    document.getElementById("countryInput").value = "";
}

function applyFiltersAndSort() {
    const query = document.getElementById("countryInput").value.toLowerCase();
    const region = document.getElementById("regionSelect").value;
    const sort = document.getElementById("sortSelect").value;

    let filtered = allCountries;

    if (region) {
        filtered = filtered.filter(c => c.region === region);
    }

    if (query) {
        filtered = filtered.filter(c => c.name.common.toLowerCase().includes(query));
    }

    switch (sort) {
        case "popAsc":
            filtered.sort((a, b) => a.population - b.population);
            break;
        case "popDesc":
            filtered.sort((a, b) => b.population - a.population);
            break;
        case "areaAsc":
            filtered.sort((a, b) => a.area - b.area);
            break;
        case "areaDesc":
            filtered.sort((a, b) => b.area - a.area);
            break;
        default:
            filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }

    displayCountries(filtered);
}

// Event listeners for real-time syncing
document.getElementById("countryInput").addEventListener("input", applyFiltersAndSort);
document.getElementById("regionSelect").addEventListener("change", applyFiltersAndSort);
document.getElementById("sortSelect").addEventListener("change", applyFiltersAndSort);

// Reset filters on page unload
window.addEventListener("beforeunload", () => {
    document.getElementById("sortSelect").value = "";
    document.getElementById("regionSelect").value = "";
});
