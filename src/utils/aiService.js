// ─── Claude AI Analysis Service ────────────────────────────────────────────
export async function fetchAIWeatherAnalysis(weather, disasters) {
  const maxRisk = Object.entries(disasters).reduce((mx, [t, d]) => {
    const levels = ["Severe", "High", "Moderate", "Low"];
    return levels.indexOf(d.level) < levels.indexOf(mx.level) ? { type: t, ...d } : mx;
  }, { type: "none", level: "Low" });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are an expert Indian meteorologist and disaster risk analyst employed by the National Disaster Management Authority (NDMA). Provide a concise, actionable weather intelligence report for ${weather.city}, ${weather.state}.

Current Conditions:
- Temperature: ${weather.temperature}°C (feels like ${weather.feelsLike}°C)
- Humidity: ${weather.humidity}% | Wind: ${weather.windSpeed} km/h ${weather.windDirection}
- Atmospheric Pressure: ${weather.pressure} hPa | Rainfall: ${weather.rainfall} mm/hr
- AQI: ${weather.aqi} (${weather.aqiCategory.label}) | UV Index: ${weather.uvIndex}
- Sky Condition: ${weather.condition}
- Climate Zone: ${weather.zone}

Disaster Risk Assessment:
${Object.entries(disasters).map(([t, d]) => `- ${t.charAt(0).toUpperCase() + t.slice(1)}: ${d.level} risk (score: ${d.score}/100)`).join('\n')}

Please provide a structured 3-paragraph expert analysis:

Paragraph 1: Current weather situation — what these conditions mean practically for residents of ${weather.city} today. Mention any notable atmospheric patterns.

Paragraph 2: Primary disaster concern — focus on ${maxRisk.type} (${maxRisk.level} risk level). Give specific, actionable safety guidance tailored to ${weather.city}'s geography and infrastructure.

Paragraph 3: 48-hour outlook — expected weather evolution and key precautionary measures residents and authorities should take.

Keep the language clear, factual, and accessible. Reference India-specific bodies (IMD, NDRF, NDMA) where relevant.`
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "Analysis unavailable at this time.";
}
