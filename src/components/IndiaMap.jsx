import { RISK_COLORS } from '../data/constants.js';
import { predictDisasters, getMaxRiskLevel } from '../utils/disasterEngine.js';

export default function IndiaMap({ cities, selectedCity, onCityClick, weatherDataMap, dark }) {
  const seaBg   = dark ? "#0f172a" : "#dbeafe";
  const landFg  = dark ? "#1e3a5f" : "#d1fae5";
  const landBd  = dark ? "#334155" : "#86efac";
  const labelC  = dark ? "#60a5fa" : "#2563eb";
  const tc      = dark ? "#f1f5f9" : "#1e293b";
  const ts      = dark ? "#94a3b8" : "#64748b";

  return (
    <div style={{
      borderRadius: 16, padding: 16,
      border: `1px solid ${dark ? "#334155" : "#f1f5f9"}`,
      background: dark ? "#1e293b" : "#ffffff",
      boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: tc, display: "flex", alignItems: "center", gap: 6 }}>
        🗺️ India Risk Map
        <span style={{ fontSize: 10, color: ts, fontWeight: 400 }}>— click any city</span>
      </div>

      <svg viewBox="0 0 400 460" style={{ width: "100%", height: "auto", display: "block" }}>
        {/* Background (sea) */}
        <rect width="400" height="460" fill={seaBg} />

        {/* India mainland */}
        <path
          d="M 155,22 L 195,18 L 245,28 L 288,45 L 310,72 L 318,103 L 313,132 L 296,152 L 308,175 L 318,205 L 312,235 L 296,265 L 275,295 L 254,325 L 238,355 L 226,380 L 215,405 L 205,425 L 198,435 L 192,424 L 181,403 L 172,382 L 167,360 L 153,335 L 136,308 L 115,276 L 96,247 L 80,217 L 76,187 L 82,158 L 88,130 L 100,103 L 113,78 L 128,52 Z"
          fill={landFg} stroke={landBd} strokeWidth="1.5"
        />
        {/* Northeast protrusion */}
        <path
          d="M 318,103 L 340,95 L 358,108 L 365,128 L 350,142 L 335,138 L 313,132 Z"
          fill={landFg} stroke={landBd} strokeWidth="1.5"
        />
        {/* Bay-of-Bengal coastal bulge */}
        <path
          d="M 280,290 L 298,312 L 308,335 L 302,352 L 288,360 L 268,352 L 254,325 Z"
          fill={landFg} stroke={landBd} strokeWidth="1"
        />
        {/* Himalayan ridge hint */}
        <path
          d="M 128,52 L 155,22 L 195,18 L 245,28 L 288,45"
          fill="none" stroke={dark ? "#60a5fa" : "#93c5fd"} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.55"
        />
        {/* Sri Lanka */}
        <ellipse cx="253" cy="428" rx="11" ry="16" fill={landFg} stroke={landBd} strokeWidth="1" opacity="0.75" />
        {/* Andaman */}
        <ellipse cx="348" cy="328" rx="7" ry="22" fill={landFg} stroke={landBd} strokeWidth="1" opacity="0.7" />

        {/* Water labels */}
        <text x="340" y="255" fontSize="7.5" fill={labelC} opacity="0.7" textAnchor="middle">Bay of</text>
        <text x="340" y="266" fontSize="7.5" fill={labelC} opacity="0.7" textAnchor="middle">Bengal</text>
        <text x="50"  y="285" fontSize="7.5" fill={labelC} opacity="0.7" textAnchor="middle">Arabian</text>
        <text x="50"  y="296" fontSize="7.5" fill={labelC} opacity="0.7" textAnchor="middle">Sea</text>
        <text x="198" y="456" fontSize="7.5" fill={labelC} opacity="0.6" textAnchor="middle">Indian Ocean</text>

        {/* City markers */}
        {cities.map(city => {
          // Map lat/lon → SVG coordinate space
          const svgX = ((city.lon - 68) / (97 - 68)) * 288 + 58;
          const svgY = ((37 - city.lat) / (37 - 8)) * 395 + 22;

          const wd  = weatherDataMap[city.name];
          const maxRisk = wd ? getMaxRiskLevel(predictDisasters(wd)) : "Low";
          const dotColor = RISK_COLORS[maxRisk]?.bg || "#10b981";
          const isSel = selectedCity?.name === city.name;

          return (
            <g key={city.name} onClick={() => onCityClick(city)} style={{ cursor: "pointer" }}>
              {isSel && (
                <circle cx={svgX} cy={svgY} r="6" fill={dotColor} opacity="0.3">
                  <animate attributeName="r"       from="6" to="16" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={svgX} cy={svgY}
                r={isSel ? 7 : 4.5}
                fill={dotColor}
                stroke={isSel ? "#ffffff" : "rgba(255,255,255,0.7)"}
                strokeWidth={isSel ? 2.5 : 1.5}
                style={{ filter: isSel ? `drop-shadow(0 0 5px ${dotColor})` : "none", transition: "r 0.2s" }}
              />
              {isSel && (
                <text
                  x={svgX + 10} y={svgY + 4}
                  fontSize="8.5" fontWeight="bold"
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
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: c.bg, flexShrink: 0 }} />
            <span style={{ color: ts }}>{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
