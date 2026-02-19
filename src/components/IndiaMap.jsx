import { RISK_COLORS } from '../data/constants.js';
import { predictDisasters, getMaxRiskLevel } from '../utils/disasterEngine.js';

export default function IndiaMap({ cities, selectedCity, onCityClick, weatherDataMap, dark }) {

  const seaBg   = dark ? "#0f172a" : "#dbeafe";
  const landFg  = dark ? "#1e3a5f" : "#bbf7d0";
  const landBd  = dark ? "#334155" : "#4ade80";
  const tc      = dark ? "#f1f5f9" : "#1e293b";
  const ts      = dark ? "#94a3b8" : "#64748b";

  // Geographic bounds of India
  const MIN_LAT = 8;
  const MAX_LAT = 37;
  const MIN_LON = 68;
  const MAX_LON = 97;

  // SVG size
  const WIDTH = 600;
  const HEIGHT = 700;

  // Convert latitude/longitude to SVG position
  const project = (lat, lon) => {
    const x = ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * WIDTH;
    const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * HEIGHT;
    return { x, y };
  };

  return (
    <div style={{
      borderRadius: 16,
      padding: 16,
      border: `1px solid ${dark ? "#334155" : "#f1f5f9"}`,
      background: dark ? "#1e293b" : "#ffffff",
    }}>

      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: tc }}>
        🗺️ India Risk Map
        <span style={{ fontSize: 10, color: ts, marginLeft: 6 }}>
          — click any city
        </span>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Sea background */}
        <rect width={WIDTH} height={HEIGHT} fill={seaBg} />

        {/* India mainland (proper proportions) */}
        <path
          d="
          M220,40
          L320,30 L420,70 L480,140
          L500,220 L470,300 L430,360
          L400,420 L360,480 L320,560
          L280,640
          L240,600 L210,520 L180,460
          L150,420 L110,350 L80,280
          L70,210 L90,140 L140,80
          Z"
          fill={landFg}
          stroke={landBd}
          strokeWidth="2"
        />

        {/* Northeast */}
        <path
          d="
          M480,140
          L560,120 L590,180 L540,220
          L500,200 Z"
          fill={landFg}
          stroke={landBd}
          strokeWidth="2"
        />

        {/* Sri Lanka */}
        <ellipse cx="300" cy="680" rx="20" ry="30" fill={landFg} stroke={landBd} />

        {/* Andaman */}
        <ellipse cx="560" cy="450" rx="8" ry="25" fill={landFg} stroke={landBd} opacity="0.7" />

        {/* City markers */}
        {cities.map(city => {
          const { x, y } = project(city.lat, city.lon);

          const wd = weatherDataMap[city.name];
          const risk = wd ? getMaxRiskLevel(predictDisasters(wd)) : "Low";
          const color = RISK_COLORS[risk]?.bg || "#10b981";
          const isSelected = selectedCity?.name === city.name;

          return (
            <g key={city.name} onClick={() => onCityClick(city)} style={{ cursor: "pointer" }}>

              {/* Pulse for selected city */}
              {isSelected && (
                <circle cx={x} cy={y} r="10" fill={color} opacity="0.3">
                  <animate attributeName="r" from="10" to="26" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}

              {/* City dot */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 8 : 5}
                fill={color}
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* City name */}
              {isSelected && (
                <text
                  x={x + 10}
                  y={y + 4}
                  fontSize="12"
                  fontWeight="bold"
                  fill={dark ? "#f1f5f9" : "#1e293b"}
                >
                  {city.name}
                </text>
              )}

            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
        {Object.entries(RISK_COLORS).map(([level, c]) => (
          <div key={level} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.bg }} />
            <span style={{ color: ts }}>{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
