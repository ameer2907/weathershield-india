export default function MiniChart({ data, dataKey, color, label, unit, dark }) {
  if (!data?.length) return null;

  const values  = data.map(d => d[dataKey]);
  const min     = Math.min(...values);
  const max     = Math.max(...values);
  const range   = max - min || 1;
  const W = 300, H = 60, PAD = 10;

  const points = data.map((d, i) => {
    const x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((d[dataKey] - min) / range) * (H - PAD * 2);
    return `${x},${y}`;
  });

  const polylinePoints = points.join(" ");
  const areaPoints = `${PAD},${H} ${polylinePoints} ${W - PAD},${H}`;
  const lastVal = values[values.length - 1];
  const [lx, ly] = points[points.length - 1].split(",");

  const tc = dark ? "#f1f5f9" : "#475569";
  const ts = dark ? "#64748b" : "#94a3b8";

  return (
    <div style={{
      borderRadius: 16, padding: 16,
      border: `1px solid ${dark ? "#334155" : "#f1f5f9"}`,
      background: dark ? "#1e293b" : "#ffffff",
      boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: tc }}>{label}</span>
        <span style={{ fontSize: 12, fontFamily: "monospace", color, fontWeight: 700 }}>{lastVal}{unit}</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 60, display: "block" }}>
        <defs>
          <linearGradient id={`grad-${dataKey}-${label.replace(/\s/g,"")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0"    />
          </linearGradient>
        </defs>
        <polygon
          points={areaPoints}
          fill={`url(#grad-${dataKey}-${label.replace(/\s/g,"")})`}
        />
        <polyline
          points={polylinePoints}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx={lx} cy={ly} r="4" fill={color} stroke={dark ? "#1e293b" : "#fff"} strokeWidth="2" />
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: ts, marginTop: 4, opacity: 0.7 }}>
        <span>{data[0]?.hour?.replace(":00","h") || data[0]?.date?.split(",")[0]}</span>
        <span>{data[data.length - 1]?.hour?.replace(":00","h") || data[data.length - 1]?.date?.split(",")[0]}</span>
      </div>
    </div>
  );
}
