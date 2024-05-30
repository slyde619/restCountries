/*
=============================================
Fetches country data from the REST Countries API.
Filters and displays the countries based on user input and selection.
Toggles between light and dark mode.
Displays an alert with country details when a country is clicked (this can be expanded to show a detailed page).
=============================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // variable assignments for getting the respective data from HTML elements
  const DISPLAY_COUNTRIES = document.querySelector("#displayCountries")
  const REGION_FILTER = document.querySelector("#region-filter");
  const SEARCH_INPUT = document.querySelector("#search");
  const loadingMessage = document.querySelector(".loading-message")
  let countries = [];
  const toggleTheme = document.querySelector("#toggle-theme");
  let darkMode = false;

   async function fetchCountries() {
    try {
      const response = await fetch("./data.json");
      const data = await response.json();
      countries = data
      setTimeout(() => {
        displayCountries(data);
        loadingMessage.style.display = "none"; //Hide the loading message
        DISPLAY_COUNTRIES.style.display = "grid"
      }, 2000)
    } catch (error) {
      console.error("Error fetching countries: ", error);
    }
  }


// Display Countries Data
function displayCountries(countries) {
  DISPLAY_COUNTRIES.innerHTML = "";
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.className = "country-card";
    countryCard.innerHTML = `
      <img src="${country.flags.png}" alt="Flag of ${country.name}"/>
      <div class="extra-info">
      <h2 class="country-name">${country.name}</h2>
          <p>Population: ${country.population.toLocaleString()}</p>
          <p>Region: ${country.region}</p>
          <p>Capital: ${country.capital}</p>
      </div>
    `;
    DISPLAY_COUNTRIES.appendChild(countryCard);
  });
}

toggleTheme.addEventListener("click", () => {
  darkMode = !darkMode;
  toggleTheme.innerHTML = `<button id="toggle-theme"><i class='bx bx-sun'></i> Light mode</button>`;
  document.body.classList.toggle("dark-mode", darkMode);
});

function filterCountries() {
  const searchValue = SEARCH_INPUT.value.toLowerCase();
  const regionValue = REGION_FILTER.value;
  const filteredCountries = countries.filter((country) => {
    const searchMatches = country.name.toLowerCase().includes(searchValue);
    const regionMatches = !regionValue || country.region === regionValue;
    return searchMatches && regionMatches;
  });
  displayCountries(filteredCountries);
}

SEARCH_INPUT.addEventListener("input", filterCountries);
REGION_FILTER.addEventListener("change", filterCountries);

fetchCountries()

})