/*
=============================================
Fetches country data from the REST Countries API.
Filters and displays the countries based on user input and selection.
Toggles between light and dark mode.
Displays an alert with country details when a country is clicked (this can be expanded to show a detailed page).
=============================================
*/

// Event Listeners to DOM content loading
document.addEventListener('DOMContentLoaded', () => {
    // variable assignments for getting the respective data from HTML elements
    const DISPLAY_COUNTRIES = document.querySelector("#displayCountries")
    const REGION_FILTER = document.querySelector("#region-filter")
    const SEARCH_INPUT = document.querySelector("#search")
    let countries = []
    const toggleTheme = document.querySelector("#toggle-theme")
    let darkMode = false

    // Fetch Country data from data.json
    async function fetchCountries(){
        try{
            const response = await fetch("./data.json")
            const data = await response.json()
            displayCountries(data)
        }catch (error){
            console.error("Error fetching countries: ", error);
        }
    }

    // displayCountryData
    function displayCountries(countries){
        DISPLAY_COUNTRIES.innerHTML = ''
        countries.forEach(country => {
            const countryCard = document.createElement("div")
            countryCard.className = "country-card"
            countryCard.innerHTML = `
                <img src="${country.flags.png}" alt="Flag of ${country.name}"/>
                <div class="extra-info">
                <h2 class="country-name">${country.name}</h2>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${country.capital}</p>
                </div>
            `;

            DISPLAY_COUNTRIES.appendChild(countryCard)
        })
    }

    toggleTheme.addEventListener("click", () => {
      darkMode = !darkMode;
      toggleTheme.innerHTML = `<button id="toggle-theme"><i class='bx bx-sun'></i> Light mode</button>`;
      document.body.classList.toggle("dark-mode", darkMode);
    });

    // Filter countries based on user input
    function filterCountries(){
        const myValue = SEARCH_INPUT.value
        const searchValue = SEARCH_INPUT.value.toLowerCase();
        const regionValue = REGION_FILTER.value
        const filteredCountries = countries.filter(country => {
            const searchMatches = country.name.toLowerCase().includes(searchValue)
            const regionMatches = !regionValue || country.value === regionValue
            console.log(searchMatches, searchValue, myValue);
            return searchMatches && regionMatches
        })

        displayCountries(filteredCountries)
    }

    filterCountries()
    // Event Listener added to both search and select option
    SEARCH_INPUT.addEventListener("input", filterCountries)
    REGION_FILTER.addEventListener("change", filterCountries)


    fetchCountries()
 });



