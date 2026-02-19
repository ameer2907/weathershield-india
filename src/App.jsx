import { useState, useEffect, useCallback } from 'react';
import { INDIA_CITIES } from './data/cities.js';
import { TABS, RISK_COLORS, DISASTER_ICONS } from './data/constants.js';
import { generateWeatherData } from './utils/weatherEngine.js';
import { predictDisasters } from './utils/disasterEngine.js';
import AlertBanner  from './components/AlertBanner.jsx';
import OverviewTab  from './components/tabs/OverviewTab.jsx';
import ForecastTab  from './components/tabs/ForecastTab.jsx';
import DisastersTab from './components/tabs/DisastersTab.jsx';
import MapTab       from './components/tabs/MapTab.jsx';
import AITab        from './components/tabs/AITab.jsx';

export default function App() {
  const [dark,         setDark]         = useState(true);
  const [query,        setQuery]        = useState('');
  const [suggestions,  setSuggestions]  = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather,      setWeather]      = useState(null);
  const [disasters,    setDisasters]    = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [tab,          setTab]          = useState('overview');
  const [weatherMap,   setWeatherMap]   = useState({});
  const [saved,        setSaved]        = useState(['Mumbai', 'Delhi', 'Chennai']);

  // Preload cities for map on mount
// Preload cities for map on mount (No default city)
useEffect(() => {
  const map = {};
  INDIA_CITIES.slice(0, 14).forEach(c => {
    map[c.name] = generateWeatherData(c);
  });
  setWeatherMap(map);

  // IMPORTANT:
  // Do NOT call loadCity() here
  // This keeps the app in welcome state
}, []);


  const loadCity = useCallback((city) => {
    setLoading(true);
    setSelectedCity(city);
    setQuery(city.name);
    setSuggestions([]);
    setTimeout(() => {
      const wd = generateWeatherData(city);
      const dp = predictDisasters(wd);
      setWeather(wd);
      setDisasters(dp);
      setWeatherMap(prev => ({ ...prev, [city.name]: wd }));
      setLoading(false);
    }, 650);
  }, []);

  const handleSearch = (val) => {
    setQuery(val);
    setSuggestions(
      val.length > 1
        ? INDIA_CITIES.filter(c =>
            c.name.toLowerCase().includes(val.toLowerCase()) ||
            c.state.toLowerCase().includes(val.toLowerCase())
          ).slice(0, 7)
        : []
    );
  };

  const toggleSaved = (cityName) => {
    setSaved(prev => prev.includes(cityName) ? prev.filter(c => c !== cityName) : [...prev, cityName]);
  };

  // Theme tokens
  const bg  = dark ? '#0f172a' : '#f8fafc';
  const tc  = dark ? '#f1f5f9' : '#1e293b';
  const ts  = dark ? '#94a3b8' : '#64748b';
  const bd  = dark ? '#334155' : '#f1f5f9';
  const hbg = dark ? 'rgba(15,23,42,0.92)' : 'rgba(248,250,252,0.92)';

  return (
    <div style={{ minHeight: '100vh', background: bg, transition: 'background 0.3s' }}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: hbg, backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${bd}`,
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 15, color: tc, lineHeight: 1.15 }}>WeatherShield India</div>
            <div style={{ fontSize: 9, color: ts, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Disaster Intelligence Platform</div>
          </div>
        </div>
        {/* Home Button */}
<button
  onClick={() => {
    setSelectedCity(null);
    setWeather(null);
    setDisasters(null);
    setQuery('');
    setTab('overview');
  }}
  style={{
    padding: '6px 14px',
    borderRadius: 10,
    border: `1px solid ${bd}`,
    background: dark ? '#1e293b' : '#f1f5f9',
    color: tc,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer'
  }}
>
  Home
</button>

        {/* Search */}
        <div style={{ flex: 1, position: 'relative', maxWidth: 440 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            borderRadius: 12, border: `1px solid ${bd}`,
            background: dark ? '#1e293b' : '#f1f5f9',
            padding: '8px 12px',
          }}>
            <span style={{ color: ts, fontSize: 14, flexShrink: 0 }}>🔍</span>
            <input
              value={query}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search any city or state in India..."
              onKeyDown={e => {
                if (e.key === 'Enter' && suggestions.length) loadCity(suggestions[0]);
                if (e.key === 'Escape') setSuggestions([]);
              }}
              style={{
                flex: 1, background: 'transparent', border: 'none',
                outline: 'none', fontSize: 13, color: tc,
              }}
            />
            {query && (
              <button onClick={() => { setQuery(''); setSuggestions([]); }}
                style={{ background: 'none', border: 'none', color: ts, cursor: 'pointer', fontSize: 15, padding: 0 }}>
                ✕
              </button>
            )}
          </div>
          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 5px)', left: 0, right: 0,
              background: dark ? '#1e293b' : '#fff',
              border: `1px solid ${bd}`,
              borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
              zIndex: 999, overflow: 'hidden',
              animation: 'slideDown 0.2s ease',
            }}>
              {suggestions.map((c, i) => (
                <button key={c.name} onClick={() => loadCity(c)}
                  style={{
                    width: '100%', padding: '10px 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    borderTop: i > 0 ? `1px solid ${bd}` : 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? '#334155' : '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: tc }}>📍 {c.name}</span>
                    <span style={{ fontSize: 11, marginLeft: 6, color: ts }}>{c.state}</span>
                  </div>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, background: dark ? '#334155' : '#f1f5f9', color: ts }}>{c.zone}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button onClick={() => setDark(!dark)}
          style={{
            padding: '8px 14px', borderRadius: 12,
            border: `1px solid ${bd}`,
            background: dark ? '#1e293b' : '#f1f5f9',
            fontSize: 18, cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </header>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1300, margin: '0 auto', padding: '20px 20px 48px' }}>

        {/* Quick city pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ts, whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick:</span>
          {INDIA_CITIES.slice(0, 12).map(city => (
            <button key={city.name} onClick={() => loadCity(city)}
              style={{
                fontSize: 11, padding: '6px 14px', borderRadius: 20,
                border: `1px solid ${selectedCity?.name === city.name ? '#6366f1' : bd}`,
                background: selectedCity?.name === city.name ? '#6366f1' : (dark ? '#1e293b' : '#fff'),
                color: selectedCity?.name === city.name ? '#fff' : ts,
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                fontWeight: selectedCity?.name === city.name ? 700 : 400,
                transition: 'all 0.2s',
              }}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Loading spinner */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, gap: 14 }}>
            <div className="animate-spin" style={{ fontSize: 52 }}>🌀</div>
            <div style={{ fontSize: 13, color: ts }}>Fetching weather intelligence for {selectedCity?.name}...</div>
          </div>
        )}

        {/* Dashboard */}
        {!loading && weather && disasters && (
          <>
            {/* Active alerts */}
            <AlertBanner disasters={disasters} />

            {/* Hero weather card */}
            <div style={{
              borderRadius: 24, padding: '24px 28px', marginBottom: 20,
              position: 'relative', overflow: 'hidden',
              background: dark
                ? 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)'
                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            }}>
              {/* Glare overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 82% 18%, rgba(255,255,255,0.13) 0%, transparent 58%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20, position: 'relative' }}>
                {/* Left: location + main temp */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>📍 {weather.state}, India</span>
                    <button onClick={() => toggleSaved(weather.city)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 17, color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                      title={saved.includes(weather.city) ? 'Remove from saved' : 'Save location'}
                      onMouseEnter={e => e.currentTarget.style.color = '#fbbf24'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {saved.includes(weather.city) ? '⭐' : '☆'}
                    </button>
                  </div>
                  <h1 style={{ color: '#fff', fontSize: 30, fontWeight: 900, margin: '0 0 10px' }}>{weather.city}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 58 }}>{weather.icon}</span>
                    <div>
                      <div style={{ color: '#fff', fontSize: 50, fontWeight: 900, lineHeight: 1 }}>{weather.temperature}°C</div>
                      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 2 }}>Feels like {weather.feelsLike}°C</div>
                    </div>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 6 }}>{weather.condition}</div>
                </div>
                {/* Right: detail grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignSelf: 'flex-start' }}>
                  {[
                    { icon: '💧', l: 'Humidity',    v: `${weather.humidity}%`                          },
                    { icon: '💨', l: 'Wind',         v: `${weather.windSpeed} km/h ${weather.windDirection}` },
                    { icon: '🔵', l: 'Pressure',     v: `${weather.pressure} hPa`                       },
                    { icon: '🌧️', l: 'Rainfall',    v: `${weather.rainfall} mm`                         },
                    { icon: '👁️', l: 'Visibility',  v: `${weather.visibility} km`                       },
                    { icon: '☀️', l: 'UV Index',     v: weather.uvIndex                                  },
                  ].map(x => (
                    <div key={x.l} style={{ background: 'rgba(255,255,255,0.13)', borderRadius: 12, padding: '8px 14px', backdropFilter: 'blur(4px)' }}>
                      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>{x.icon} {x.l}</div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginTop: 2 }}>{x.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Footer row */}
              <div style={{ display: 'flex', gap: 14, marginTop: 14, color: 'rgba(255,255,255,0.4)', fontSize: 11, position: 'relative', flexWrap: 'wrap' }}>
                <span>Updated: {weather.lastUpdated}</span>
                <span>•</span>
                <span>🌅 {weather.sunrise}</span>
                <span>🌇 {weather.sunset}</span>
                <span>•</span>
                <span>Dew point: {weather.dewPoint}°C</span>
                <span>•</span>
                <span>AQI: {weather.aqi} ({weather.aqiCategory.label})</span>
              </div>
            </div>

            {/* Tab bar */}
            <div style={{
              display: 'flex', gap: 4, padding: 4,
              background: dark ? '#1e293b' : '#f1f5f9',
              borderRadius: 14, border: `1px solid ${bd}`,
              marginBottom: 20, overflowX: 'auto',
            }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{
                    flex: 1, minWidth: 'fit-content', padding: '9px 18px',
                    borderRadius: 10, border: 'none',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    whiteSpace: 'nowrap', transition: 'all 0.2s',
                    background: tab === t.id ? '#6366f1' : 'transparent',
                    color: tab === t.id ? '#fff' : ts,
                    boxShadow: tab === t.id ? '0 2px 10px #6366f155' : 'none',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="animate-fadeIn" key={tab}>
              {tab === 'overview'  && <OverviewTab  weather={weather} disasters={disasters} dark={dark} />}
              {tab === 'forecast'  && <ForecastTab  weather={weather} dark={dark} />}
              {tab === 'disasters' && <DisastersTab weather={weather} disasters={disasters} dark={dark} />}
              {tab === 'map'       && <MapTab selectedCity={selectedCity} onCityClick={loadCity} weatherDataMap={weatherMap} dark={dark} />}
              {tab === 'ai'        && <AITab weather={weather} disasters={disasters} dark={dark} />}
            </div>
          </>
        )}

        {/* Welcome / empty state */}
        {!loading && !weather && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, textAlign: 'center' }}>
            <div style={{ fontSize: 72, marginBottom: 18 }}>🌏</div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: tc, marginBottom: 8 }}>
  Select a City to Get Started
</h2>

           <p style={{ fontSize: 14, color: ts, maxWidth: 420, marginBottom: 28, lineHeight: 1.7 }}>
  Choose any city in India to view real-time weather conditions, AI analysis, and disaster risk insights.
</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {INDIA_CITIES.slice(0, 8).map(city => (
                <button key={city.name} onClick={() => loadCity(city)}
                  style={{ padding: '10px 20px', borderRadius: 20, border: 'none', background: '#6366f1', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'transform 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  📍 {city.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${bd}`, padding: '16px 24px', textAlign: 'center', fontSize: 11, color: ts, lineHeight: 2 }}>
        WeatherShield India • Disaster Intelligence Platform • Powered by Claude AI<br />
        Data: IMD India • USGS Earthquake Hazards • OpenWeatherMap • CWC India<br />
        <span style={{ color: '#6366f1' }}>For official alerts: mausam.imd.gov.in</span> • National Emergency: <strong>112</strong>
      </footer>
    </div>
  );
}
