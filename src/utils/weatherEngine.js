// ─── Weather Data Generator (simulates real API response) ──────────────────
export function generateWeatherData(city) {
  const now   = new Date();
  const month = now.getMonth();
  const isMonsoon = month >= 5 && month <= 9;
  const isWinter  = month >= 11 || month <= 1;
  const isSummer  = month >= 3  && month <= 5;

  const baseTemp =
    city.zone === "himalayan" ? 8 :
    city.zone === "arid"      ? 32 :
    city.zone === "coastal"   ? 28 : 27;

  const seasonMod = isSummer ? 6 : isWinter ? -8 : isMonsoon ? -3 : 0;
  const temp      = baseTemp + seasonMod + (Math.random() * 6 - 3);

  const humidity =
    isMonsoon            ? 75 + Math.random() * 20 :
    city.zone === "coastal" ? 65 + Math.random() * 15 :
    city.zone === "arid"    ? 20 + Math.random() * 20 :
                              45 + Math.random() * 25;

  const windSpeed = 10 + Math.random() * 25;
  const pressure  = 1000 + Math.random() * 30 - 10;
  const rainfall  = isMonsoon ? Math.random() * 80 : Math.random() * 15;
  const visibility = 8 + Math.random() * 7;

  const conditionPool =
    isMonsoon ? ["Heavy Rain", "Thunderstorm", "Cloudy", "Drizzle"] :
    isSummer  ? ["Sunny", "Hot & Hazy", "Clear"] :
    isWinter  ? ["Foggy", "Clear", "Partly Cloudy"] :
                ["Partly Cloudy", "Clear", "Sunny"];
  const condition = conditionPool[Math.floor(Math.random() * conditionPool.length)];

  const aqi = Math.round(50 + Math.random() * 200);

  const forecast = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() + i + 1);
    const dayTemp  = temp + (Math.random() * 8 - 4);
    const pool     = isMonsoon
      ? ["Rain", "Thunderstorm", "Cloudy", "Drizzle"]
      : ["Sunny", "Partly Cloudy", "Clear"];
    const dayCond  = pool[Math.floor(Math.random() * pool.length)];
    return {
      date:      d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
      high:      Math.round(dayTemp + 3),
      low:       Math.round(dayTemp - 5),
      condition: dayCond,
      rainfall:  isMonsoon ? Math.round(Math.random() * 60) : Math.round(Math.random() * 5),
      humidity:  Math.round(humidity + Math.random() * 10 - 5),
      windSpeed: Math.round(windSpeed + Math.random() * 10 - 5),
      icon:      isMonsoon ? "🌧️" : ["☀️", "⛅", "🌤️"][Math.floor(Math.random() * 3)],
    };
  });

  const hourly = Array.from({ length: 24 }, (_, i) => ({
    hour:      `${String(i).padStart(2, "0")}:00`,
    temp:      Math.round(temp + Math.sin((i - 6) * Math.PI / 12) * 5),
    humidity:  Math.round(humidity + Math.random() * 10),
    windSpeed: Math.round(windSpeed + Math.random() * 10),
    rainfall:  isMonsoon ? Math.round(Math.random() * 20) : Math.round(Math.random() * 3),
  }));

  return {
    city:        city.name,
    state:       city.state,
    zone:        city.zone,
    lat:         city.lat,
    lon:         city.lon,
    temperature: Math.round(temp * 10) / 10,
    feelsLike:   Math.round((temp + (humidity > 60 ? 2 : -2)) * 10) / 10,
    humidity:    Math.round(humidity),
    windSpeed:   Math.round(windSpeed),
    windDirection: ["N","NE","E","SE","S","SW","W","NW"][Math.floor(Math.random() * 8)],
    pressure:    Math.round(pressure),
    rainfall:    Math.round(rainfall * 10) / 10,
    visibility:  Math.round(visibility * 10) / 10,
    uvIndex:     isWinter ? 3 : isMonsoon ? 4 : 8,
    dewPoint:    Math.round(temp - (100 - humidity) / 5),
    condition,
    icon:        getWeatherIcon(condition),
    aqi,
    aqiCategory: getAQICategory(aqi),
    sunrise:     "06:15 AM",
    sunset:      "06:45 PM",
    forecast,
    hourly,
    lastUpdated: now.toLocaleTimeString("en-IN"),
  };
}

function getWeatherIcon(condition) {
  const c = condition.toLowerCase();
  if (c.includes("thunder"))                return "⛈️";
  if (c.includes("rain") || c.includes("drizzle")) return "🌧️";
  if (c.includes("fog")  || c.includes("mist"))    return "🌁";
  if (c.includes("haze"))                   return "🌫️";
  if (c.includes("cloud"))                  return "⛅";
  if (c.includes("hot"))                    return "🌡️";
  return "☀️";
}

function getAQICategory(aqi) {
  if (aqi <= 50)  return { label: "Good",          color: "#10b981" };
  if (aqi <= 100) return { label: "Satisfactory",  color: "#84cc16" };
  if (aqi <= 200) return { label: "Moderate",      color: "#f59e0b" };
  if (aqi <= 300) return { label: "Poor",          color: "#f97316" };
  if (aqi <= 400) return { label: "Very Poor",     color: "#ef4444" };
  return              { label: "Severe",           color: "#7c3aed" };
}
