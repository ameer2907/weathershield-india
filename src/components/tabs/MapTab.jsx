import IndiaMap from '../IndiaMap.jsx';
import { RISK_COLORS } from '../../data/constants.js';
import { predictDisasters, getMaxRiskLevel } from '../../utils/disasterEngine.js';
import { INDIA_CITIES, SEISMIC_ZONES } from '../../data/cities.js';

export default function MapTab({ selectedCity, onCityClick, weatherDataMap, dark }) {
  const tc = dark ? "#f1f5f9" : "#1e293b";
  const ts = dark ? "#94a3b8" : "#64748b";
  const bd = dark ? "#334155" : "#f1f5f9";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <IndiaMap
        cities={INDIA_CITIES}
        selectedCity={selectedCity}
        onCityClick={onCityClick}
        weatherDataMap={weatherDataMap}
        dark={dark}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Multi-city risk */}
        <div style={{ borderRadius: 16, padding: 16, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#fff", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: tc, marginBottom: 12 }}>📊 Multi-City Risk Comparison</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 300, overflowY: "auto" }}>
            {Object.entries(weatherDataMap).map(([cityName, wd]) => {
              const risks   = predictDisasters(wd);
              const maxRisk = getMaxRiskLevel(risks);
              const rc      = RISK_COLORS[maxRisk];
              const city    = INDIA_CITIES.find(c => c.name === cityName);
              return (
                <button
                  key={cityName}
                  onClick={() => city && onCityClick(city)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "8px 12px", borderRadius: 12, border: `1px solid ${selectedCity?.name === cityName ? "#6366f1" : bd}`,
                    background: selectedCity?.name === cityName ? (dark ? "#1e3a5f" : "#eef2ff") : "transparent",
                    cursor: "pointer", transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: rc.bg, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: tc }}>{cityName}</span>
                    <span style={{ fontSize: 11, color: ts }}>{wd.temperature}°C</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 9px", borderRadius: 10, background: rc.light, color: rc.text }}>{maxRisk}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Seismic zones */}
        <div style={{ borderRadius: 16, padding: 16, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#fff", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: tc, marginBottom: 12 }}>🌍 Seismic Zones (BIS-1893)</div>
          {SEISMIC_ZONES.map(({ emoji, zone, areas }) => (
            <div key={zone} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{emoji}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: tc }}>{zone}</div>
                <div style={{ fontSize: 11, color: ts, marginTop: 1 }}>{areas}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
