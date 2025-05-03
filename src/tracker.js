// JavaScript source code
// src/tracker.js
export async function trackVisit() {
  const geoInfo = await fetch("https://ipapi.co/json/").then(res => res.json());

  const visitData = {
    timestamp: new Date().toISOString(),
    browser: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
    geo: {
      ip: geoInfo.ip,
      city: geoInfo.city,
      region: geoInfo.region,
      country: geoInfo.country_name,
    }
  };

  console.log("Visitor info:", visitData);

  // Save locally or send to server
  const visits = JSON.parse(localStorage.getItem("visits") || "[]");
  visits.push(visitData);
  localStorage.setItem("visits", JSON.stringify(visits));
}
