import { RISK_COLORS } from '../data/constants.js';
import { predictDisasters, getMaxRiskLevel } from '../utils/disasterEngine.js';

export default function IndiaMap({ cities, selectedCity, onCityClick, weatherDataMap, dark }) {

  const seaBg   = dark ? "#0f172a" : "#dbeafe";
  const landFg  = dark ? "#1e3a5f" : "#bbf7d0";
  const landBd  = dark ? "#334155" : "#4ade80";
  const ts      = dark ? "#94a3b8" : "#64748b";
  const tc      = dark ? "#f1f5f9" : "#1e293b";

  // India geographic bounds
  const MIN_LAT = 8;
  const MAX_LAT = 37;
  const MIN_LON = 68;
  const MAX_LON = 97;

  const WIDTH = 500;
  const HEIGHT = 650;

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
        <span style={{ fontSize: 10, color: ts, marginLeft: 6 }}>
          — click any city
        </span>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ width: "100%", height: "auto" }}>
        <rect width={WIDTH} height={HEIGHT} fill={seaBg} />

        {/* Proper India outline (correct proportions) */}
        <path
          d="
          M220,20
          L300,20 L380,50 L420,100
          L440,180 L420,250 L380,320
          L340,380 L300,450 L260,520
          L230,600
          L200,560 L170,480 L140,420
          L100,350 L70,280 L60,200
          L80,120 L130,60 Z
          "
          fill={landFg}
          stroke={landBd}
          strokeWidth="2"
        />

        {/* Northeast */}
        <path
          d="
          M440,180
          L500,160 L530,220 L480,250 L420,230 Z
          "
          fill={landFg}
          stroke={landBd}
          strokeWidth="2"
        />

        {/* Sri Lanka */}
        <ellipse cx="260" cy="630" rx="16" ry="24" fill={landFg} stroke={landBd} />

        {/* Andaman */}
        <ellipse cx="500" cy="420" rx="6" ry="22" fill={landFg} stroke={landBd} opacity="0.7" />

        {/* Cities */}
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
                r={isSelected ? 7 : 5}
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
