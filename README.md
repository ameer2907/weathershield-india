# 🌩️ WeatherShield India
## Disaster Intelligence & Weather Prediction Platform

A full-stack React weather application focused on India — featuring real-time weather data, AI-powered disaster prediction, interactive maps, and emergency alerts.

---

## 🚀 Quick Start

```bash
# 1. Extract the ZIP and navigate into the folder
cd weathershield-india

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

---

## 📁 Project Structure

```
weathershield-india/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── tabs/
│   │   │   ├── OverviewTab.jsx     # Weather metrics + charts
│   │   │   ├── ForecastTab.jsx     # 7-day forecast
│   │   │   ├── DisastersTab.jsx    # Risk analysis cards
│   │   │   ├── MapTab.jsx          # Interactive India map
│   │   │   └── AITab.jsx           # Claude AI analysis
│   │   ├── AlertBanner.jsx         # Active disaster alerts
│   │   ├── AQIGauge.jsx            # Air quality gauge
│   │   ├── ForecastCard.jsx        # Single day forecast card
│   │   ├── IndiaMap.jsx            # SVG India map
│   │   ├── MiniChart.jsx           # Sparkline chart
│   │   ├── RiskCard.jsx            # Expandable risk card
│   │   └── WeatherCard.jsx         # Metric card
│   ├── data/
│   │   ├── cities.js               # 25 Indian cities + emergency contacts
│   │   └── constants.js            # Risk colors, icons, tab config
│   ├── utils/
│   │   ├── aiService.js            # Claude AI API integration
│   │   ├── disasterEngine.js       # Disaster prediction algorithms
│   │   └── weatherEngine.js        # Weather data generator
│   ├── App.jsx                     # Main application shell
│   ├── index.css                   # Global styles + animations
│   └── main.jsx                    # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🌟 Features

### Weather Dashboard
- ✅ Real-time conditions: temperature, humidity, wind, pressure, rainfall, AQI, UV
- ✅ 24-hour sparkline charts (temperature, humidity, wind, rainfall)
- ✅ 7-day forecast with detailed table view
- ✅ Air Quality Index (AQI) semicircular gauge
- ✅ Dark / Light mode toggle
- ✅ City search with state-level filtering
- ✅ Save favourite locations (⭐)

### Disaster Prediction Engine
- 🌀 **Cyclone** — wind speed + pressure + coastal zone scoring
- 🌊 **Flood** — rainfall intensity + humidity + regional vulnerability
- 🌡️ **Heatwave** — temperature thresholds + arid zone factors
- ⛈️ **Storm** — wind + pressure + rainfall combination
- 🔴 **Earthquake** — BIS-1893 seismic zone classification

Each disaster shows: Risk Level (Low / Moderate / High / Severe), score bar, factors, and safety recommendations.

### Interactive India Map
- SVG India map with 25 city markers
- Color-coded by max risk level
- Animated selection indicator
- Multi-city risk comparison panel

### AI Weather Analysis (Claude AI)
- Expert 3-paragraph meteorological report
- City-specific disaster risk breakdown
- 48-hour safety outlook
- Powered by Claude Sonnet

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React 18 + Vite         |
| Styling   | Inline styles + CSS     |
| Charts    | Custom SVG              |
| Map       | Custom SVG              |
| AI        | Claude AI (Anthropic)   |
| Build     | Vite 5                  |

---

## 📡 API Integration Points

The app is pre-wired for these real APIs (currently using smart simulated data):

| API | Purpose | Free Tier |
|-----|---------|-----------|
| [OpenWeatherMap](https://openweathermap.org/api) | Real weather data | 1000 calls/day |
| [WeatherAPI.com](https://www.weatherapi.com/) | Forecast data | 1M calls/month |
| [USGS Earthquake](https://earthquake.usgs.gov/fdsnws/event/1/) | Seismic events | Free |
| [Claude AI](https://anthropic.com) | Expert analysis | Via claude.ai |

To integrate real OpenWeatherMap data, update `src/utils/weatherEngine.js` to call:
```
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={VITE_OPENWEATHER_API_KEY}
```

---

## 🎨 Customization

**Add a city:**
```js
// src/data/cities.js
{ name: "Varanasi", state: "Uttar Pradesh", lat: 25.317, lon: 82.973, zone: "plains" }
```

**Adjust risk thresholds:**
```js
// src/utils/disasterEngine.js
// Edit the scoring conditions in predictDisasters()
```

**Change theme colors:**
```js
// In any component, the `dark` prop controls all colors
// Primary accent: #6366f1 (Indigo)
```

---

## 📦 Build for Production

```bash
npm run build      # Outputs to /dist
npm run preview    # Preview production build locally
```

---

## 🤝 Credits

- Data: [IMD India](https://mausam.imd.gov.in) • [USGS](https://earthquake.usgs.gov) • [OpenWeatherMap](https://openweathermap.org)
- AI: [Claude by Anthropic](https://anthropic.com)
- Emergency: **National Emergency: 112** • **NDRF: 011-24363260**

---

*Built for portfolio showcase in Data Science, AI & Full-Stack Development*
