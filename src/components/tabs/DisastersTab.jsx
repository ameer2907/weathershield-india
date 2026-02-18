import { useState } from 'react';
import RiskCard from '../RiskCard.jsx';
import { RISK_COLORS, DISASTER_ICONS } from '../../data/constants.js';
import { EMERGENCY_CONTACTS } from '../../data/cities.js';

export default function DisastersTab({ weather, disasters, dark }) {
  const [expandedRisk, setExpandedRisk] = useState(null);
  const tc = dark ? "#f1f5f9" : "#1e293b";
  const ts = dark ? "#94a3b8" : "#64748b";
  const bd = dark ? "#334155" : "#f1f5f9";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Header */}
      <div style={{ borderRadius: 16, padding: 16, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#fff", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: tc, marginBottom: 4 }}>⚠️ Disaster Risk Analysis</div>
        <div style={{ fontSize: 12, color: ts, lineHeight: 1.5 }}>
          Multi-factor risk assessment for <strong style={{ color: tc }}>{weather.city}, {weather.state}</strong> — based on real-time atmospheric conditions, historical patterns, and regional vulnerability data.
        </div>
      </div>

      {/* Score overview */}
      <div style={{ borderRadius: 16, padding: 16, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#fff", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: ts, marginBottom: 14 }}>
          Risk Score Overview
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(disasters).map(([type, d]) => {
            const rc = RISK_COLORS[d.level];
            return (
              <div key={type}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{DISASTER_ICONS[type]}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, textTransform: "capitalize", color: tc }}>{type}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 800, color: rc.bg }}>{d.score}/100</span>
                    <span style={{ fontSize: 10, fontWeight: 800, padding: "3px 12px", borderRadius: 20, background: rc.light, color: rc.text, border: `1px solid ${rc.bg}40` }}>{d.level}</span>
                  </div>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: dark ? "#334155" : "#f1f5f9", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, width: `${d.score}%`, background: `linear-gradient(90deg, ${rc.bg}88, ${rc.bg})`, transition: "width 0.85s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed risk cards */}
      {Object.entries(disasters).map(([type, d]) => (
        <RiskCard
          key={type} type={type} data={d} dark={dark}
          expanded={expandedRisk === type}
          onToggle={() => setExpandedRisk(expandedRisk === type ? null : type)}
        />
      ))}

      {/* Emergency contacts */}
      <div style={{ borderRadius: 16, padding: 16, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#fff", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: tc, marginBottom: 12 }}>🆘 Emergency Contacts — India</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
          {EMERGENCY_CONTACTS.map(({ name, num }) => (
            <div key={name} style={{ padding: 10, borderRadius: 12, background: dark ? "#334155" : "#fff5f5", border: `1px solid ${dark ? "#475569" : "#fecaca"}` }}>
              <div style={{ fontSize: 10, color: dark ? "#94a3b8" : "#dc2626", marginBottom: 2 }}>{name}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: dark ? "#fca5a5" : "#dc2626" }}>{num}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
