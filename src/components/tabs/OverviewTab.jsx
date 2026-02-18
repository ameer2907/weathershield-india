import WeatherCard from '../WeatherCard.jsx';
import MiniChart   from '../MiniChart.jsx';
import AQIGauge    from '../AQIGauge.jsx';
import { RISK_COLORS, DISASTER_ICONS } from '../../data/constants.js';

export default function OverviewTab({ weather, disasters, dark }) {
  const tc = dark ? "#f1f5f9" : "#1e293b";
  const bd = dark ? "#334155" : "#f1f5f9";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 12 }}>
        <WeatherCard icon="🌡️" label="Temperature" value={weather.temperature} unit="°C"   sub={`H:${weather.forecast[0]?.high}° L:${weather.forecast[0]?.low}°`}  color="#ef4444" dark={dark} />
        <WeatherCard icon="💧" label="Humidity"    value={weather.humidity}    unit="%"    sub={`Dew point ${weather.dewPoint}°C`}                                   color="#3b82f6" dark={dark} />
        <WeatherCard icon="💨" label="Wind"        value={weather.windSpeed}   unit="km/h" sub={`Direction: ${weather.windDirection}`}                               color="#8b5cf6" dark={dark} />
        <WeatherCard icon="🔵" label="Pressure"    value={weather.pressure}    unit="hPa"  sub={weather.pressure < 1000 ? "Below normal" : "Normal range"}           color="#06b6d4" dark={dark} />
        <WeatherCard icon="🌧️" label="Rainfall"    value={weather.rainfall}    unit="mm"   sub="Last hour accumulation"                                              color="#0ea5e9" dark={dark} />
        <WeatherCard icon="👁️" label="Visibility"  value={weather.visibility}  unit="km"   sub={weather.visibility < 5 ? "⚠ Poor" : "Good conditions"}              color="#10b981" dark={dark} />
        <WeatherCard icon="☀️" label="UV Index"    value={weather.uvIndex}     unit=""     sub={weather.uvIndex > 7 ? "Very High — use SPF" : "Moderate"}            color="#f59e0b" dark={dark} />
        <WeatherCard icon="🌡️" label="Feels Like"  value={weather.feelsLike}   unit="°C"   sub="Heat index adjusted"                                                 color="#f97316" dark={dark} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 12 }}>
        <MiniChart data={weather.hourly} dataKey="temp"      color="#ef4444" label="Temperature Today (24h)"  unit="°C"    dark={dark} />
        <MiniChart data={weather.hourly} dataKey="humidity"  color="#3b82f6" label="Humidity Today (24h)"     unit="%"     dark={dark} />
        <MiniChart data={weather.hourly} dataKey="windSpeed" color="#8b5cf6" label="Wind Speed Today (24h)"   unit=" km/h" dark={dark} />
        <MiniChart data={weather.hourly} dataKey="rainfall"  color="#0ea5e9" label="Rainfall Today (24h)"     unit="mm"    dark={dark} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12 }}>
        <AQIGauge aqi={weather.aqi} category={weather.aqiCategory} dark={dark} />
        <div style={{ borderRadius: 16, padding: 16, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#ffffff", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: tc, marginBottom: 12 }}>Quick Risk Overview</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(125px, 1fr))", gap: 8 }}>
            {Object.entries(disasters).map(([type, d]) => {
              const rc = RISK_COLORS[d.level];
              return (
                <div key={type} style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, borderRadius: 12, background: rc.light }}>
                  <span style={{ fontSize: 20 }}>{DISASTER_ICONS[type]}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "capitalize", color: rc.text }}>{type}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: rc.bg }}>{d.level}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
