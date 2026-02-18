export const RISK_COLORS = {
  Low:      { bg: "#10b981", light: "#d1fae5", text: "#065f46" },
  Moderate: { bg: "#f59e0b", light: "#fef3c7", text: "#92400e" },
  High:     { bg: "#f97316", light: "#ffedd5", text: "#9a3412" },
  Severe:   { bg: "#ef4444", light: "#fee2e2", text: "#991b1b" },
};

export const DISASTER_ICONS = {
  cyclone:   "🌀",
  flood:     "🌊",
  heatwave:  "🌡️",
  earthquake:"🔴",
  storm:     "⛈️",
};

export const DISASTER_LABELS = {
  cyclone:   "Cyclone",
  flood:     "Flood",
  heatwave:  "Heatwave",
  earthquake:"Earthquake",
  storm:     "Storm",
};

export const TABS = [
  { id: "overview",  label: "📊 Overview"    },
  { id: "forecast",  label: "📅 Forecast"    },
  { id: "disasters", label: "⚠️ Disasters"   },
  { id: "map",       label: "🗺️ Live Map"    },
  { id: "ai",        label: "🤖 AI Analysis" },
];

export const RISK_LEVEL_ORDER = ["Severe", "High", "Moderate", "Low"];
