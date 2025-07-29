// script.js

async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "840853b6f47c8e161ef9bd8d05e76b59";

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weatherInfo = document.getElementById("weatherInfo");

      // Optional: weather icon based on condition
      const emoji = getWeatherEmoji(data.weather[0].main);

      weatherInfo.innerHTML = `
        <div class="weather-icon">${emoji}</div>
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
    } else {
      document.getElementById("weatherInfo").innerHTML = `<p>City not found!</p>`;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("weatherInfo").innerHTML = `<p>Failed to fetch data.</p>`;
  }
}

// Optional: Map condition to emoji
function getWeatherEmoji(condition) {
  switch (condition) {
    case "Clear": return "☀️";
    case "Clouds": return "☁️";
    case "Rain": return "🌧️";
    case "Thunderstorm": return "⛈️";
    case "Snow": return "❄️";
    case "Mist":
    case "Fog": return "🌫️";
    default: return "🌈";
  }
}
