
// Weatherstack API key
const API_KEY = "4c467d99f4a3fffd639f1f4c5a062708";

// Get the HTML elements we need
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const message = document.getElementById("message");
const weatherDisplay = document.getElementById("weather-display");

// Function to get weather information
async function getWeather(city) {

    // Show a loading message
    message.textContent = "Getting the latest weather...";
    message.className = "message";

    // Hide the previous weather information
    weatherDisplay.hidden = true;

    try {
        // Create the Weatherstack API URL
        const url = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}&units=f`;

        // Fetch weather information from the API
        const response = await fetch(url);

        // Convert the response into JSON
        const data = await response.json();

        // Check whether the API returned an error
        if (data.error) {
            throw new Error(data.error.info);
        }

        // Check whether the response contains weather information
        if (!data.current || !data.location) {
            throw new Error("Weather information was unavailable.");
        }

        // Display the city and country
        document.getElementById("city-name").textContent =
            `${data.location.name}, ${data.location.country}`;

        // Display the local time
        document.getElementById("local-time").textContent =
            `Local time: ${data.location.localtime}`;

        // Display the temperature
        document.getElementById("temperature").textContent =
            `${data.current.temperature}°F`;

        // Display the weather description
        document.getElementById("description").textContent =
            data.current.weather_descriptions[0];

        // Display the weather icon
        const weatherIcon = document.getElementById("weather-icon");

        weatherIcon.src = data.current.weather_icons[0];
        weatherIcon.alt = data.current.weather_descriptions[0];

        // Display the feels-like temperature
        document.getElementById("feels-like").textContent =
            `${data.current.feelslike}°F`;

        // Display humidity
        document.getElementById("humidity").textContent =
            `${data.current.humidity}%`;

        // Display wind speed
        document.getElementById("wind-speed").textContent =
            `${data.current.wind_speed} mph`;

        // Show the weather information
        weatherDisplay.hidden = false;

        // Clear the loading message
        message.textContent = "";

    } catch (error) {

        // Display an error if something goes wrong
        message.textContent =
            `Unable to get weather information: ${error.message}`;

        message.className = "message error";
    }
}

// Listen for someone submitting the search form
searchForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the city entered by the user
    const city = cityInput.value.trim();

    // Search for the city's weather
    if (city !== "") {
        getWeather(city);
    }
});

// Automatically load East Lansing when the page opens
getWeather("East Lansing, Michigan");
