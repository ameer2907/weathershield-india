export default function ForecastCard({ day, dark }) {
  const bd = dark ? "#334155" : "#f1f5f9";
  const tc = dark ? "#f1f5f9" : "#1e293b";
  const ts = dark ? "#64748b" : "#94a3b8";

  return (
    <div style={{
      borderRadius: 14, padding: "12px 10px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      border: `1px solid ${bd}`,
      background: dark ? "#1e293b" : "#ffffff",
      minWidth: 94, flexShrink: 0,
      boxShadow: dark ? "none" : "0 1px 8px rgba(0,0,0,0.05)",
      transition: "transform 0.2s",
      cursor: "default",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "none"}
    >
      <div style={{ fontSize: 10, fontWeight: 700, color: ts, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {day.date.split(",")[0]}
      </div>
      <div style={{ fontSize: 26, margin: "2px 0" }}>{day.icon}</div>
      <div style={{ fontSize: 10, textAlign: "center", color: ts, lineHeight: 1.3 }}>{day.condition}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: tc }}>{day.high}°</div>
      <div style={{ fontSize: 11, color: ts }}>{day.low}°</div>
      {day.rainfall > 0 && (
        <div style={{ fontSize: 10, color: "#3b82f6", fontWeight: 600 }}>🌧 {day.rainfall}mm</div>
      )}
    </div>
  );
}
