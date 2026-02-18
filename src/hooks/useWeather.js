import { useState, useCallback } from "react";
import { generateWeatherData, predictDisasters } from "../utils/weatherEngine";
import { INDIA_CITIES } from "../data/constants";

/**
 * Custom hook that manages weather state, city selection, and data fetching.
 */
export function useWeather() {
  const [selectedCity,  setSelectedCity]  = useState(null);
  const [weather,       setWeather]       = useState(null);
  const [disasters,     setDisasters]     = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [weatherMap,    setWeatherMap]    = useState({});

  /**
   * Load weather for a city object { name, state, lat, lon, zone }.
   * Replace setTimeout + generateWeatherData with a real API call here.
   */
  const loadCity = useCallback((city) => {
    setLoading(true);
    setSelectedCity(city);

    // Simulate network latency (remove in production with real API)
    setTimeout(() => {
      const wd = generateWeatherData(city);
      const dp = predictDisasters(wd);
      setWeather(wd);
      setDisasters(dp);
      setWeatherMap(prev => ({ ...prev, [city.name]: wd }));
      setLoading(false);
    }, 650);
  }, []);

  /**
   * Pre-load a set of cities for the map view without selecting them.
   */
  const preloadCities = useCallback((cities) => {
    const map = {};
    cities.forEach(city => {
      map[city.name] = generateWeatherData(city);
    });
    setWeatherMap(map);
  }, []);

  return {
    selectedCity,
    weather,
    disasters,
    loading,
    weatherMap,
    loadCity,
    preloadCities,
  };
}

/**
 * Calls Claude AI API to generate expert weather analysis.
 * Returns the insight text string.
 */
export async function fetchAIInsight(weather, disasters) {
  if (!weather || !disasters) return "";

  const maxRisk = Object.entries(disasters).reduce((mx, [t, d]) => {
    const lvls = ["Severe", "High", "Moderate", "Low"];
    return lvls.indexOf(d.level) < lvls.indexOf(mx.level) ? { type: t, ...d } : mx;
  }, { type: "none", level: "Low" });

  const prompt = `You are an expert Indian meteorologist and disaster risk analyst from the India Meteorological Department (IMD).

Current conditions for ${weather.city}, ${weather.state}:
- Temperature: ${weather.temperature}°C (feels like ${weather.feelsLike}°C)
- Humidity: ${weather.humidity}%, Wind: ${weather.windSpeed} km/h ${weather.windDirection}
- Atmospheric Pressure: ${weather.pressure} hPa
- Rainfall: ${weather.rainfall} mm/hr
- AQI: ${weather.aqi} — ${weather.aqiCategory.label}
- Condition: ${weather.condition}
- Climate Zone: ${weather.zone}

Disaster Risk Assessment:
${Object.entries(disasters).map(([t, d]) => `• ${t}: ${d.level} (score ${d.score}/100)`).join("\n")}

Please provide a professional 3-paragraph weather intelligence report:
1. Current meteorological situation and what it means for residents of ${weather.city} today
2. Primary disaster concern (${maxRisk.type} at ${maxRisk.level} level) — detailed safety guidance specific to this city
3. 48-hour outlook and key precautionary actions residents should take now

Keep it factual, India-specific, actionable, and written for the general public. Reference local geography and IMD guidelines where relevant.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text ?? "Analysis unavailable. Please try again.";
}
