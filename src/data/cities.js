export const INDIA_CITIES = [
  { name: "Mumbai",           state: "Maharashtra",       lat: 19.076, lon: 72.877, zone: "coastal"   },
  { name: "Delhi",            state: "Delhi",             lat: 28.614, lon: 77.209, zone: "plains"    },
  { name: "Bangalore",        state: "Karnataka",         lat: 12.972, lon: 77.594, zone: "plateau"   },
  { name: "Chennai",          state: "Tamil Nadu",        lat: 13.083, lon: 80.270, zone: "coastal"   },
  { name: "Kolkata",          state: "West Bengal",       lat: 22.573, lon: 88.364, zone: "coastal"   },
  { name: "Hyderabad",        state: "Telangana",         lat: 17.385, lon: 78.487, zone: "plateau"   },
  { name: "Pune",             state: "Maharashtra",       lat: 18.520, lon: 73.857, zone: "plateau"   },
  { name: "Ahmedabad",        state: "Gujarat",           lat: 23.023, lon: 72.572, zone: "arid"      },
  { name: "Jaipur",           state: "Rajasthan",         lat: 26.913, lon: 75.787, zone: "arid"      },
  { name: "Lucknow",          state: "Uttar Pradesh",     lat: 26.847, lon: 80.947, zone: "plains"    },
  { name: "Bhopal",           state: "Madhya Pradesh",    lat: 23.260, lon: 77.413, zone: "plains"    },
  { name: "Bhubaneswar",      state: "Odisha",            lat: 20.296, lon: 85.825, zone: "coastal"   },
  { name: "Patna",            state: "Bihar",             lat: 25.612, lon: 85.166, zone: "plains"    },
  { name: "Kochi",            state: "Kerala",            lat:  9.932, lon: 76.267, zone: "coastal"   },
  { name: "Guwahati",         state: "Assam",             lat: 26.145, lon: 91.736, zone: "northeast" },
  { name: "Shimla",           state: "Himachal Pradesh",  lat: 31.104, lon: 77.170, zone: "himalayan" },
  { name: "Dehradun",         state: "Uttarakhand",       lat: 30.317, lon: 78.032, zone: "himalayan" },
  { name: "Surat",            state: "Gujarat",           lat: 21.170, lon: 72.832, zone: "coastal"   },
  { name: "Visakhapatnam",    state: "Andhra Pradesh",    lat: 17.686, lon: 83.218, zone: "coastal"   },
  { name: "Nagpur",           state: "Maharashtra",       lat: 21.145, lon: 79.088, zone: "plains"    },
  { name: "Coimbatore",       state: "Tamil Nadu",        lat: 11.017, lon: 76.955, zone: "plateau"   },
  { name: "Indore",           state: "Madhya Pradesh",    lat: 22.719, lon: 75.857, zone: "plains"    },
  { name: "Chandigarh",       state: "Punjab",            lat: 30.734, lon: 76.779, zone: "plains"    },
  { name: "Ranchi",           state: "Jharkhand",         lat: 23.344, lon: 85.309, zone: "plateau"   },
  { name: "Thiruvananthapuram", state: "Kerala",          lat:  8.524, lon: 76.936, zone: "coastal"   },
];

export const EMERGENCY_CONTACTS = [
  { name: "National Emergency", num: "112" },
  { name: "NDRF Control Room",  num: "011-24363260" },
  { name: "IMD Weather Helpline", num: "1800-180-1717" },
  { name: "Ambulance",          num: "108" },
  { name: "Police",             num: "100" },
  { name: "Fire Brigade",       num: "101" },
  { name: "Flood Relief (NDMA)", num: "1078" },
  { name: "Coast Guard",        num: "1554" },
];

export const SEISMIC_ZONES = [
  { emoji: "🔴", zone: "Zone V (Very High)",  areas: "J&K, Himachal Pradesh, Uttarakhand, Northeast India" },
  { emoji: "🟠", zone: "Zone IV (High)",       areas: "Delhi, Bihar, HP parts, Haryana, Jammu" },
  { emoji: "🟡", zone: "Zone III (Moderate)",  areas: "Kerala, Goa, Lakshadweep, Gujarat coast" },
  { emoji: "🟢", zone: "Zone II (Low)",         areas: "Remaining peninsular regions" },
];

export const DATA_SOURCES = [
  { icon: "🌤️", name: "OpenWeatherMap API",   desc: "Real-time weather data & forecasts"       },
  { icon: "🔴", name: "USGS Earthquake API",   desc: "Live global seismic event monitoring"      },
  { icon: "🌀", name: "IMD India",             desc: "Cyclone, storm & heavy rain alerts"        },
  { icon: "🌊", name: "CWC India",             desc: "River level & flood forecasting"           },
  { icon: "🤖", name: "Claude AI Engine",       desc: "Risk prediction & expert analysis"        },
  { icon: "📊", name: "Historical Patterns",    desc: "30-year climate baseline data"            },
];
