// Headless render smoke test: mounts the built card in happy-dom with mock
// hass data and asserts the shadow DOM contains the expected pieces.
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();
await import("../dist/kirkhill-card.js");

const rpm = [16.14, 15.32, 16.07, 16.68, 15.83, 11.93, 0, null];
const gen = [1.34, 1.098, 1.033, 1.086, 0.825, 0.627, 0.0, 0.585];
const states = {};
for (let i = 0; i < 8; i++) {
  const n = i + 1;
  const r = rpm[i];
  states[`binary_sensor.turbine_t${n}_running`] = {
    entity_id: `binary_sensor.turbine_t${n}_running`,
    state: r === null ? "unknown" : r > 0 ? "on" : "off",
    attributes: {
      latitude: 55.3048 + i * 0.001,
      longitude: -4.7458 + i * 0.001,
      rotor_speed_rpm: r,
      latest_generation_interval_end: "2026-06-30T10:03:00Z",
    },
  };
  states[`sensor.turbine_t${n}_generation`] = {
    entity_id: `sensor.turbine_t${n}_generation`, state: String(gen[i]), attributes: {},
  };
  states[`sensor.turbine_t${n}_generation_share`] = {
    entity_id: `sensor.turbine_t${n}_generation_share`, state: "12.5", attributes: {},
  };
  states[`sensor.turbine_t${n}_capacity_factor`] = {
    entity_id: `sensor.turbine_t${n}_capacity_factor`, state: "30.0", attributes: {},
  };
}
const monthly = [220, 260, 310, 280, 240, 150, 0, 0, 0, 0, 0, 0].map((v, idx) => ({
  month: idx + 1, generation_kwh: v * 20, revenue_gbp: v,
}));
states["sensor.kirk_hill_wind_farm_revenue_month_to_date"] = {
  entity_id: "sensor.kirk_hill_wind_farm_revenue_month_to_date", state: "150.0", attributes: {},
};
states["sensor.kirk_hill_wind_farm_revenue_year_to_date"] = {
  entity_id: "sensor.kirk_hill_wind_farm_revenue_year_to_date",
  state: "1460.0", attributes: { monthly },
};

const el = document.createElement("kirkhill-card");
el.setConfig({ type: "custom:kirkhill-card", title: "Kirk Hill Wind Farm" });
el.hass = { states };
document.body.appendChild(el);
await el.updateComplete;

const html = el.shadowRoot.innerHTML;
const rotorCount = (html.match(/class="rotor/g) || []).length;
const stoppedCount = (html.match(/rotor stopped/g) || []).length;
const barCount = (html.match(/class="bar"/g) || []).length;

// panels:[map] should render the map only (no table, no revenue).
const mapOnly = document.createElement("kirkhill-card");
mapOnly.setConfig({ type: "custom:kirkhill-card", panels: ["map"], title: "" });
mapOnly.hass = { states };
document.body.appendChild(mapOnly);
await mapOnly.updateComplete;
const mapHtml = mapOnly.shadowRoot.innerHTML;

const checks = [
  ["card defined", !!customElements.get("kirkhill-card")],
  ["title rendered", html.includes("Kirk Hill Wind Farm")],
  ["map svg", html.includes("<svg")],
  ["map basemap tiles", html.includes("basemaps.cartocdn.com")],
  ["8 turbine markers (T8)", html.includes(">T8<")],
  ["8 rotors", rotorCount === 8],
  ["stopped/unknown not spinning", stoppedCount === 2], // T7 (0 rpm) + T8 (null)
  ["status table", html.includes("Cap. factor")],
  ["revenue headline £150", html.includes("£150.00")],
  ["12 monthly bars", barCount === 12],
  ["panels:[map] shows map", mapHtml.includes("basemaps.cartocdn.com")],
  ["panels:[map] hides table", !mapHtml.includes("Cap. factor")],
  ["panels:[map] hides revenue", !mapHtml.includes("£")],
];

let ok = true;
for (const [name, pass] of checks) {
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}`);
  if (!pass) ok = false;
}
console.log(ok ? "\nALL RENDER CHECKS PASSED" : "\nRENDER CHECKS FAILED");
process.exit(ok ? 0 : 1);
