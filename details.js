document.addEventListener("DOMContentLoaded", () => {
  const countryDetailsElement = document.getElementById("country-details");

  async function fetchCountryDetails(countryName) {
    try {
      const response = await fetch("./data.json");
      const country = (await response.json())[0];
      displayCountryDetails(country);
    } catch (error) {
      console.error("Error fetching country details:", error);
    }
  }

  function displayCountryDetails(country) {
    countryDetailsElement.innerHTML = `
            <img src="${country.flags.png}" alt="Flag of ${
      country.name
    }">
            <h2>${country.name}</h2>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Borders:</strong> ${
              country.borders?.join(", ") || "None"
            }</p>
        `;
  }

  function getCountryNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("name");
  }

  const countryName = getCountryNameFromURL();
  if (countryName) {
    fetchCountryDetails(countryName);
  }
});
