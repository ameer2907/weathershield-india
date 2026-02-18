import { RISK_COLORS, DISASTER_ICONS } from '../data/constants.js';

export default function RiskCard({ type, data, dark, expanded, onToggle }) {
  const rc = RISK_COLORS[data.level];
  const tc = dark ? "#f1f5f9" : "#1e293b";
  const ts = dark ? "#94a3b8" : "#64748b";
  const bd = dark ? "#334155" : "#f1f5f9";

  return (
    <div style={{
      borderRadius: 16,
      border: `1px solid ${bd}`,
      overflow: "hidden",
      background: dark ? "#1e293b" : "#ffffff",
      boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.2s",
    }}>
      {/* Header row */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", padding: 16, display: "flex", alignItems: "center",
          justifyContent: "space-between", background: "transparent",
          border: "none", cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: rc.light, fontSize: 20, flexShrink: 0,
          }}>
            {DISASTER_ICONS[type]}
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 700, textTransform: "capitalize", color: tc, fontSize: 14 }}>
              {type} Risk
            </div>
            <div style={{ fontSize: 11, color: ts, marginTop: 1 }}>{data.factors[0]}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 20,
            background: rc.light, color: rc.text, border: `1px solid ${rc.bg}40`,
          }}>
            {data.level}
          </span>
          <span style={{ color: ts, fontSize: 12, transition: "transform 0.25s", transform: expanded ? "rotate(180deg)" : "none" }}>
            ▼
          </span>
        </div>
      </button>

      {/* Risk progress bar */}
      <div style={{ margin: "0 16px 12px", height: 6, borderRadius: 99, background: dark ? "#334155" : "#f1f5f9", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          width: `${data.score}%`,
          background: `linear-gradient(90deg, ${rc.bg}99, ${rc.bg})`,
          transition: "width 0.8s ease",
        }} />
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: "12px 16px 16px", borderTop: `1px solid ${bd}`, animation: "fadeIn 0.25s ease" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: ts, marginBottom: 6 }}>
              Risk Factors
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.factors.map((f, i) => (
                <span key={i} style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 8,
                  background: dark ? "#334155" : "#f8fafc", color: ts,
                }}>{f}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: ts, marginBottom: 6 }}>
              Safety Recommendations
            </div>
            {data.recommendations.map((r, i) => (
              <div key={i} style={{ fontSize: 12, display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 6, color: dark ? "#94a3b8" : "#64748b" }}>
                <span style={{ color: rc.bg, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                {r}
              </div>
            ))}
          </div>
          {data.seismicZone && (
            <div style={{ marginTop: 8, padding: 8, borderRadius: 10, background: dark ? "#334155" : "#f8fafc", fontSize: 11, color: ts }}>
              📍 BIS-1893 Seismic Zone: <strong style={{ color: tc }}>{data.seismicZone}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
