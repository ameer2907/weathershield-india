export default function WeatherCard({ icon, label, value, unit, sub, color = "#6366f1", dark }) {
  const bg     = dark ? "#1e293b" : "#ffffff";
  const border = dark ? "#334155" : "#f1f5f9";
  const tc     = dark ? "#f1f5f9" : "#1e293b";
  const ts     = dark ? "#94a3b8" : "#64748b";

  return (
    <div style={{
      background: bg, border: `1px solid ${border}`, borderRadius: 16,
      padding: 16, display: "flex", flexDirection: "column", gap: 6,
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 24px ${color}25`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)"; }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: color + "20", color, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: tc, marginTop: 2 }}>
        {value}
        <span style={{ fontSize: 13, fontWeight: 400, marginLeft: 4, opacity: 0.55 }}>{unit}</span>
      </div>
      {sub && <div style={{ fontSize: 11, color: ts }}>{sub}</div>}
    </div>
  );
}
