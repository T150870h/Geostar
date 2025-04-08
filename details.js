document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    let countryName = params.get("country");

    if (!countryName) {
        console.error("No country parameter provided.");
        document.getElementById("name").textContent = "Country not specified";
        return;
    }

    // Sanitize the countryName input
    countryName = countryName.replace(/[^a-zA-Z ]/g, "");

    const apiURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,flags,capital,region,subregion,population,languages,currencies,timezones,area,idd,tld`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("Country data is invalid or not found.");
            }

            const country = data[0];
            const flagElement = document.getElementById("flag");
            const nameElement = document.getElementById("name");
            const capitalElement = document.getElementById("capital");
            const regionElement = document.getElementById("region");
            const subregionElement = document.getElementById("subregion");
            const populationElement = document.getElementById("population");
            const languagesElement = document.getElementById("languages");
            const currencyElement = document.getElementById("currency");
            const timezonesElement = document.getElementById("timezones");
            const areaElement = document.getElementById("area");
            const callingCodeElement = document.getElementById("callingCode");
            const tldElement = document.getElementById("tld");

            flagElement.src = country.flags.png;
            nameElement.textContent = country.name.common;
            capitalElement.textContent = country.capital ? country.capital[0] : "N/A";
            regionElement.textContent = country.region;
            subregionElement.textContent = country.subregion;
            populationElement.textContent = country.population.toLocaleString();
            languagesElement.textContent = country.languages ? Object.values(country.languages).join(", ") : "N/A";
            currencyElement.textContent = country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A";
            timezonesElement.textContent = country.timezones.join(", ");
            areaElement.textContent = country.area.toLocaleString();
            callingCodeElement.textContent = country.idd ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : "") : "N/A";
            tldElement.textContent = country.tld ? country.tld.join(", ") : "N/A";
        })
        .catch(error => {
            console.error("Error fetching country details:", error);
            document.getElementById("name").textContent = "Error fetching details. Please try again later.";
        });
});

function goBack() {
    window.history.back();
}
