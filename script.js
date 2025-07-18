async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "YOUR_API_KEY"; // Replace with your real key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const resultBox = document.getElementById("weatherResult");
  resultBox.innerHTML = `<p>Loading...</p>`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      resultBox.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>🌅 Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>🌇 Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
      `;
    } else {
      resultBox.innerHTML = `<p>❌ City not found!</p>`;
    }
  } catch (err) {
    resultBox.innerHTML = `<p>Error fetching weather data.</p>`;
  }
}
