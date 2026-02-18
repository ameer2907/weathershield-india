import { RISK_COLORS, DISASTER_ICONS } from '../data/constants.js';

export default function AlertBanner({ disasters }) {
  const alerts = Object.entries(disasters || {}).filter(([, d]) => d.level === "Severe" || d.level === "High");
  if (!alerts.length) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
      {alerts.map(([type, data]) => {
        const rc = RISK_COLORS[data.level];
        return (
          <div
            key={type}
            style={{
              borderRadius: 14, padding: "10px 16px",
              display: "flex", alignItems: "center", gap: 12,
              background: rc.light, border: `1px solid ${rc.bg}55`,
              animation: "slideDown 0.3s ease",
            }}
          >
            <span style={{ fontSize: 22 }}>{DISASTER_ICONS[type]}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: rc.text, textTransform: "capitalize" }}>
                {data.level} {type} Alert Active
              </div>
              <div style={{ fontSize: 11, color: rc.text + "cc", marginTop: 1 }}>
                {data.recommendations[0]}
              </div>
            </div>
            <div style={{ display: "flex", flex: "column", alignItems: "center", gap: 4 }}>
              <span style={{
                fontSize: 9, fontWeight: 900, padding: "4px 10px", borderRadius: 8,
                background: rc.bg + "25", color: rc.text, border: `1px solid ${rc.bg}55`,
                letterSpacing: "0.08em",
              }}>
                ⚠ ACTIVE
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
