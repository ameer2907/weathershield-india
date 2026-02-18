import { DATA_SOURCES } from '../../data/cities.js';
import { fetchAIWeatherAnalysis } from '../../utils/aiService.js';
import { useState } from 'react';

export default function AITab({ weather, disasters, dark }) {
  const [aiInsight, setAiInsight] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError]         = useState('');

  const tc = dark ? "#f1f5f9" : "#1e293b";
  const ts = dark ? "#94a3b8" : "#64748b";
  const bd = dark ? "#334155" : "#f1f5f9";

  const handleGenerate = async () => {
    setAiLoading(true);
    setAiInsight('');
    setError('');
    try {
      const result = await fetchAIWeatherAnalysis(weather, disasters);
      setAiInsight(result);
    } catch (err) {
      setError('AI analysis temporarily unavailable. Please check your connection and try again.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Main analysis card */}
      <div style={{ borderRadius: 16, padding: 20, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#fff", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: tc, marginBottom: 3 }}>🤖 AI Weather Intelligence</div>
            <div style={{ fontSize: 12, color: ts }}>Expert meteorological analysis powered by Claude AI for <strong style={{ color: tc }}>{weather.city}</strong></div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={aiLoading}
            style={{
              padding: "10px 20px", borderRadius: 12, border: "none",
              background: aiLoading ? "#6366f180" : "#6366f1",
              color: "#fff", fontSize: 13, fontWeight: 700,
              cursor: aiLoading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", gap: 6,
              whiteSpace: "nowrap", flexShrink: 0,
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => !aiLoading && (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            {aiLoading ? (
              <><span className="animate-spin" style={{ display: "inline-block" }}>⟳</span> Analyzing...</>
            ) : (
              <>✨ Generate Analysis</>
            )}
          </button>
        </div>

        {/* Empty state */}
        {!aiInsight && !aiLoading && !error && (
          <div style={{ borderRadius: 14, padding: 32, textAlign: "center", border: `2px dashed ${bd}` }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🌩️</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: tc, marginBottom: 6 }}>Get Expert Weather Analysis</div>
            <div style={{ fontSize: 12, color: ts, maxWidth: 380, margin: "0 auto 20px", lineHeight: 1.6 }}>
              Click "Generate Analysis" to get an AI-powered meteorological report for {weather.city} — including current conditions, disaster risk breakdown, and 48-hour safety recommendations.
            </div>
            <button
              onClick={handleGenerate}
              style={{ padding: "10px 22px", borderRadius: 12, border: "none", background: "#6366f1", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              ✨ Generate for {weather.city}
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {aiLoading && (
          <div style={{ borderRadius: 12, padding: 20, background: dark ? "#334155" : "#f8fafc" }}>
            <div style={{ fontSize: 11, color: ts, marginBottom: 12 }}>🌀 Analyzing atmospheric conditions for {weather.city}...</div>
            {[92, 78, 85, 65, 80, 70, 88].map((w, i) => (
              <div key={i} className="animate-pulse" style={{
                height: 11, borderRadius: 6, background: dark ? "#475569" : "#e2e8f0",
                marginBottom: 9, width: w + "%",
                animationDelay: `${i * 0.12}s`,
              }} />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !aiLoading && (
          <div style={{ borderRadius: 12, padding: 16, background: "#fff5f5", border: "1px solid #fecaca" }}>
            <div style={{ fontSize: 13, color: "#dc2626" }}>⚠️ {error}</div>
          </div>
        )}

        {/* AI response */}
        {aiInsight && !aiLoading && (
          <div style={{ borderRadius: 14, padding: 18, background: dark ? "#334155" : "#f8fafc", animation: "fadeIn 0.4s ease" }}>
            {aiInsight.split("\n\n").filter(Boolean).map((para, i) => (
              <p key={i} style={{ fontSize: 13, lineHeight: 1.8, color: dark ? "#cbd5e1" : "#475569", marginBottom: i < aiInsight.split("\n\n").length - 1 ? 14 : 0 }}>
                {para}
              </p>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 12, borderTop: `1px solid ${bd}`, marginTop: 12 }}>
              <span style={{ color: "#6366f1", fontSize: 14 }}>🤖</span>
              <span style={{ fontSize: 10, color: ts }}>
                Generated by Claude AI • Always verify with official IMD advisories at{" "}
                <a href="https://mausam.imd.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#6366f1" }}>mausam.imd.gov.in</a>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Data sources */}
      <div style={{ borderRadius: 16, padding: 16, border: `1px solid ${bd}`, background: dark ? "#1e293b" : "#fff", boxShadow: dark ? "none" : "0 1px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: tc, marginBottom: 12 }}>📡 Data Sources & Methodology</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))", gap: 10 }}>
          {DATA_SOURCES.map(({ icon, name, desc }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, borderRadius: 12, background: dark ? "#334155" : "#f8fafc" }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: tc }}>{name}</div>
                <div style={{ fontSize: 10, color: ts, marginTop: 1 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
