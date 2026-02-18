export default function AQIGauge({ aqi, category, dark }) {
  const r  = 42, cx = 65, cy = 58;
  const toRad = a => (a * Math.PI) / 180;
  const pct   = Math.min(aqi / 500, 1);
  const angle = pct * 180 - 90;
  const nx    = cx + r * Math.cos(toRad(angle));
  const ny    = cy + r * Math.sin(toRad(angle));

  const segments = [
    { from: -90, to: -54, c: "#10b981" },
    { from: -54, to: -18, c: "#84cc16" },
    { from: -18, to:  18, c: "#f59e0b" },
    { from:  18, to:  54, c: "#f97316" },
    { from:  54, to:  90, c: "#ef4444" },
  ];

  return (
    <div style={{
      borderRadius: 16, padding: 16,
      border: `1px solid ${dark ? "#334155" : "#f1f5f9"}`,
      background: dark ? "#1e293b" : "#ffffff",
      textAlign: "center",
      boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)",
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: dark ? "#94a3b8" : "#475569" }}>
        Air Quality Index
      </div>
      <svg viewBox="0 0 130 75" style={{ width: "100%", maxWidth: 160, display: "block", margin: "0 auto" }}>
        {segments.map((s, i) => {
          const x1 = cx + r * Math.cos(toRad(s.from)), y1 = cy + r * Math.sin(toRad(s.from));
          const x2 = cx + r * Math.cos(toRad(s.to)),   y2 = cy + r * Math.sin(toRad(s.to));
          return <path key={i} d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`} fill={s.c} opacity="0.88" />;
        })}
        <circle cx={cx} cy={cy} r={r - 14} fill={dark ? "#1e293b" : "#ffffff"} />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={category.color} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="4.5" fill={category.color} />
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize="12" fontWeight="800" fill={category.color}>{aqi}</text>
      </svg>
      <div style={{ fontSize: 12, fontWeight: 800, marginTop: 4, color: category.color }}>{category.label}</div>
      <div style={{ fontSize: 10, color: dark ? "#64748b" : "#94a3b8", marginTop: 2 }}>AQI Scale: 0–500</div>
    </div>
  );
}
