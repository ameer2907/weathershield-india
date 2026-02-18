import ForecastCard from '../ForecastCard.jsx';
import MiniChart    from '../MiniChart.jsx';

export default function ForecastTab({ weather, dark }) {
  const tc = dark ? "#f1f5f9" : "#1e293b";
  const ts = dark ? "#94a3b8" : "#64748b";
  const bd = dark ? "#334155" : "#f1f5f9";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Scrollable forecast strip */}
      <div style={{ borderRadius: 16, padding: 16, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#fff", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: tc, marginBottom: 14 }}>📅 7-Day Weather Forecast</div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
          {weather.forecast.map((d, i) => <ForecastCard key={i} day={d} dark={dark} />)}
        </div>
      </div>

      {/* Detailed table */}
      <div style={{ borderRadius: 16, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#fff", overflow: "hidden", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${bd}` }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: tc }}>Detailed Forecast Table</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: dark ? "#334155" : "#f8fafc" }}>
                {["Date","Condition","High","Low","Humidity","Wind","Rainfall"].map(h => (
                  <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: ts, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weather.forecast.map((d, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${bd}`, transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? "#334155" : "#f8fafc"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "10px 14px", color: tc, fontSize: 11, whiteSpace: "nowrap" }}>{d.date}</td>
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    <span style={{ marginRight: 5 }}>{d.icon}</span>
                    <span style={{ color: ts, fontSize: 11 }}>{d.condition}</span>
                  </td>
                  <td style={{ padding: "10px 14px", fontWeight: 800, color: "#ef4444", fontSize: 13 }}>{d.high}°C</td>
                  <td style={{ padding: "10px 14px", fontWeight: 800, color: "#3b82f6", fontSize: 13 }}>{d.low}°C</td>
                  <td style={{ padding: "10px 14px", color: ts, fontSize: 11 }}>{d.humidity}%</td>
                  <td style={{ padding: "10px 14px", color: ts, fontSize: 11, whiteSpace: "nowrap" }}>{d.windSpeed} km/h</td>
                  <td style={{ padding: "10px 14px", color: "#3b82f6", fontSize: 11 }}>
                    {d.rainfall > 0 ? `🌧 ${d.rainfall}mm` : <span style={{ color: ts }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trend charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <MiniChart data={weather.forecast} dataKey="high"    color="#ef4444" label="7-Day High Temperature" unit="°C" dark={dark} />
        <MiniChart data={weather.forecast} dataKey="rainfall" color="#3b82f6" label="7-Day Rainfall Forecast" unit="mm" dark={dark} />
      </div>
    </div>
  );
}
