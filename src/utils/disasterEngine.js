import { RISK_LEVEL_ORDER } from '../data/constants.js';

// ─── Disaster Prediction Engine ────────────────────────────────────────────
export function predictDisasters(weather) {
  const { temperature, humidity, windSpeed, pressure, rainfall, zone, city, feelsLike } = weather;
  const getLevel = (score) =>
    score > 75 ? "Severe" : score > 50 ? "High" : score > 25 ? "Moderate" : "Low";

  // 1. Cyclone Risk
  const cycloneScore = Math.min(
    (windSpeed > 60 ? 40 : windSpeed > 40 ? 25 : windSpeed > 25 ? 10 : 2) +
    (pressure  < 980 ? 35 : pressure < 990 ? 20 : pressure < 1000 ? 10 : 2) +
    (rainfall  > 60  ? 20 : rainfall > 30  ? 12 : 5) +
    (zone === "coastal" ? 15 : 5),
    100
  );

  // 2. Flood Risk
  const floodScore = Math.min(
    (rainfall  > 80  ? 45 : rainfall > 50  ? 30 : rainfall > 20  ? 15 : 3) +
    (humidity  > 85  ? 20 : humidity > 70  ? 12 : 5) +
    (zone === "coastal" ? 15 : zone === "northeast" ? 12 : 5) +
    (["Patna","Kolkata","Guwahati","Bhubaneswar","Patna"].includes(city) ? 15 : 3),
    100
  );

  // 3. Heatwave Risk
  const heatScore = Math.min(
    (temperature > 45 ? 50 : temperature > 42 ? 35 : temperature > 38 ? 20 : temperature > 35 ? 10 : 2) +
    (humidity < 20 ? 25 : humidity < 30 ? 15 : 5) +
    (zone === "arid" ? 20 : zone === "plains" ? 10 : 3),
    100
  );

  // 4. Storm / Thunderstorm Risk
  const stormScore = Math.min(
    (windSpeed > 50 ? 40 : windSpeed > 30 ? 25 : windSpeed > 20 ? 12 : 3) +
    (rainfall  > 40  ? 30 : rainfall > 20  ? 18 : 8) +
    (pressure  < 990 ? 25 : pressure < 1005 ? 12 : 4),
    100
  );

  // 5. Earthquake Risk (based on BIS-1893 seismic zone map)
  const seismicZone =
    ["Delhi","Dehradun","Shimla","Guwahati","Patna","Srinagar"].includes(city) ? "V" :
    ["Chandigarh","Lucknow","Bhopal","Ranchi"].includes(city) ? "IV" : "III";
  const eqScore = Math.round(
    seismicZone === "V"  ? 35 + Math.random() * 30 :
    seismicZone === "IV" ? 15 + Math.random() * 25 :
                           Math.random() * 20
  );

  return {
    cyclone: {
      level: getLevel(cycloneScore), score: cycloneScore,
      factors: [`Wind: ${windSpeed} km/h`, `Pressure: ${pressure} hPa`, `Rainfall: ${rainfall} mm`, `Zone: ${zone}`],
      recommendations:
        cycloneScore > 50
          ? ["Seek shelter in strong buildings immediately","Avoid coastal areas & beaches","Secure doors, windows & outdoor items","Keep emergency kit & torches ready","Follow all IMD & NDRF alerts closely"]
          : ["Monitor IMD weather bulletins","Secure outdoor furniture & vehicles","Identify nearest cyclone shelter","Keep emergency contacts saved"],
    },
    flood: {
      level: getLevel(floodScore), score: floodScore,
      factors: [`Rainfall: ${rainfall} mm`, `Humidity: ${humidity}%`, `Zone: ${zone}`],
      recommendations:
        floodScore > 50
          ? ["Evacuate low-lying areas immediately","Avoid riverbanks & flooded roads","Do not cross water of unknown depth","Contact NDRF helpline: 011-24363260","Move valuables to higher floors"]
          : ["Monitor river level updates","Prepare emergency evacuation bag","Know your nearest evacuation route","Keep important documents waterproofed"],
    },
    heatwave: {
      level: getLevel(heatScore), score: heatScore,
      factors: [`Temp: ${temperature}°C`, `Feels like: ${feelsLike}°C`, `Humidity: ${humidity}%`],
      recommendations:
        heatScore > 50
          ? ["Stay indoors between 12 PM – 4 PM","Drink water every 20–30 minutes","Wear loose, light-coloured clothing","Call 104 immediately for heat stroke","Never leave children/pets in parked cars"]
          : ["Apply sunscreen SPF 30+","Stay well hydrated throughout the day","Wear a hat/cap & sunglasses outdoors","Avoid strenuous outdoor activity at noon"],
    },
    storm: {
      level: getLevel(stormScore), score: stormScore,
      factors: [`Wind: ${windSpeed} km/h`, `Pressure: ${pressure} hPa`, `Rainfall: ${rainfall} mm`],
      recommendations:
        stormScore > 50
          ? ["Take shelter in strong buildings","Unplug all electronics & appliances","Stay away from trees, poles & hoardings","Emergency services: 112","Avoid driving in storm conditions"]
          : ["Secure vehicles in covered parking","Trim overhanging tree branches","Keep a torch and power bank charged","Avoid open grounds during lightning"],
    },
    earthquake: {
      level: eqScore > 60 ? "High" : eqScore > 35 ? "Moderate" : "Low",
      score: eqScore,
      seismicZone,
      factors: [`Seismic Zone: ${seismicZone}`, "Historical fault activity", "Geological proximity to fault lines"],
      recommendations:
        eqScore > 35
          ? ["Keep a Go-bag ready at all times","Identify safe Drop-Cover-Hold spots","Avoid overpasses & bridges post-quake","NDMA Helpline: 1078","Secure heavy furniture to walls"]
          : ["Conduct regular earthquake drills","Secure bookshelves & heavy objects","Know BIS-1893 safety guidelines","Keep emergency contacts accessible"],
    },
  };
}

export function getMaxRiskLevel(disasters) {
  return Object.values(disasters).reduce((max, r) => {
    return RISK_LEVEL_ORDER.indexOf(r.level) < RISK_LEVEL_ORDER.indexOf(max) ? r.level : max;
  }, "Low");
}
