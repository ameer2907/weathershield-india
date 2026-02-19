import { RISK_COLORS } from '../data/constants.js';
import { predictDisasters, getMaxRiskLevel } from '../utils/disasterEngine.js';

export default function IndiaMap({ cities, selectedCity, onCityClick, weatherDataMap, dark }) {
  const seaBg   = dark ? "#0f172a" : "#dbeafe";
  const landFg  = dark ? "#1e3a5f" : "#bbf7d0";
  const landBd  = dark ? "#334155" : "#4ade80";
  const tc      = dark ? "#f1f5f9" : "#1e293b";
  const ts      = dark ? "#94a3b8" : "#64748b";

  // India geographic bounds
  const MIN_LAT = 8;
  const MAX_LAT = 37;
  const MIN_LON = 68;
  const MAX_LON = 97;

  // SVG size
  const WIDTH = 600;
  const HEIGHT = 700;

  // Convert lat/lon → SVG position
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
      background: dark ? "#1e293b" : "#ffffff"
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: tc }}>
        🗺️ India Risk Map
        <span style={{ fontSize: 10, color: ts, fontWeight: 400, marginLeft: 6 }}>
          — click any city
        </span>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Sea */}
        <rect width={WIDTH} height={HEIGHT} fill={seaBg} />

        {/* Realistic India Shape */}
        <path
          d="M150,40 
             L250,20 L350,40 L420,80 L460,140 
             L440,220 L410,280 L380,330 
             L360,380 L330,440 L300,500 
             L270,560 L240,620 
             L210,580 L190,520 L170,460 
             L150,420 L120,370 L90,320 
             L70,260 L60,200 L80,150 
             L110,100 Z"
          fill={landFg}
          stroke={landBd}
          strokeWidth="2"
        />

        {/* Northeast extension */}
        <path
          d="M420,140 L500,120 L540,150 L520,200 L460,180 Z"
          fill={landFg}
          stroke={landBd}
          strokeWidth="2"
        />

        {/* Sri Lanka */}
        <ellipse cx="300" cy="660" rx="18" ry="28" fill={landFg} stroke={landBd} />

        {/* City markers */}
        {cities.map(city => {
          const { x, y } = project(city.lat, city.lon);

          const wd = weatherDataMap[city.name];
          const risk = wd ? getMaxRiskLevel(predictDisasters(wd)) : "Low";
          const color = RISK_COLORS[risk]?.bg || "#10b981";
          const isSelected = selectedCity?.name === city.name;

          return (
            <g key={city.name} onClick={() => onCityClick(city)} style={{ cursor: "pointer" }}>
              {isSelected && (
                <circle cx={x} cy={y} r="10" fill={color} opacity="0.3">
                  <animate attributeName="r" from="10" to="24" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}

              <circle
                cx={x}
                cy={y}
                r={isSelected ? 8 : 5}
                fill={color}
                stroke="#fff"
                strokeWidth="2"
              />

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
