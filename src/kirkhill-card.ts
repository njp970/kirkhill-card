/**
 * kirkhill-card — Lovelace card for the Kirk Hill Wind Farm integration.
 *
 * Reads entity states/attributes only; it never calls the API directly.
 * Discovers turbines from `binary_sensor.<turbine_prefix>_t{1..8}_running`
 * and their sibling sensors, plus the site-level revenue sensors.
 */
import { LitElement, html, svg, css, nothing } from "lit";
import type { TemplateResult, PropertyValues } from "lit";

interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

interface HomeAssistant {
  states: Record<string, HassEntity>;
}

type PanelName = "map" | "table" | "revenue";
type MapStyle = "dark" | "light" | "voyager";

interface KirkhillCardConfig {
  type: string;
  title?: string;
  turbine_prefix?: string;
  site_prefix?: string;
  /** Which panels to show; defaults to all three. */
  panels?: PanelName[];
  /** Basemap style; defaults to "dark". */
  map_style?: MapStyle;
}

interface MonthlyItem {
  month: number;
  generation_kwh: number;
  revenue_gbp: number;
}

interface Turbine {
  id: string;
  running: string;
  lat: number | null;
  lon: number | null;
  rpm: number | null;
  latestInterval: string | null;
  generation: number | null;
  share: number | null;
  capacityFactor: number | null;
}

const MONTH_LABELS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// Map rendering: a real slippy-map basemap (CARTO dark — the same tiles Home
// Assistant's own map uses) projected with web-mercator, turbines overlaid.
const MAP_W = 360;
const MAP_H = 300;
const MAP_PAD = 52;
const TILE_SIZE = 256;
const TILE_BASEMAP: Record<MapStyle, string> = {
  dark: "dark_all",
  light: "light_all",
  voyager: "rastertiles/voyager",
};
const tileUrl = (style: MapStyle, z: number, x: number, y: number) =>
  `https://a.basemaps.cartocdn.com/${TILE_BASEMAP[style]}/${z}/${x}/${y}.png`;

/** Longitude → global pixel X at zoom z. */
function lon2px(lon: number, z: number): number {
  return ((lon + 180) / 360) * Math.pow(2, z) * TILE_SIZE;
}

/** Latitude → global pixel Y at zoom z (web-mercator). */
function lat2px(lat: number, z: number): number {
  const s = Math.sin((lat * Math.PI) / 180);
  return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * Math.pow(2, z) * TILE_SIZE;
}

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function num(value: number | null, digits = 1, suffix = ""): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `${value.toFixed(digits)}${suffix}`;
}

/** Spin duration (s/rev): faster for higher rpm; static when stopped/unknown. */
function spinDuration(rpm: number | null): number | null {
  if (rpm === null || rpm <= 0) return null;
  return Math.max(0.4, 20 / rpm);
}

function statusColor(state: string): string {
  if (state === "on") return "var(--kh-running, #2e7d32)";
  if (state === "off") return "var(--kh-stopped, #9e9e9e)";
  return "var(--kh-unknown, #f9a825)";
}

export class KirkhillCard extends LitElement {
  declare hass: HomeAssistant;
  declare private _config: KirkhillCardConfig;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  private _mapClipId = `khmap-${Math.random().toString(36).slice(2, 9)}`;

  static styles = css`
    ha-card {
      padding: 16px;
    }
    .title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .panels {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
      gap: 16px;
    }
    .panels.single {
      grid-template-columns: 1fr;
    }
    @media (max-width: 600px) {
      .panels {
        grid-template-columns: 1fr;
      }
    }
    .panel-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
    }
    svg.map {
      width: 100%;
      height: auto;
      background: var(--kh-map-bg, #0b0c0e);
      border-radius: 10px;
    }
    svg.map image {
      image-rendering: auto;
    }
    /* CARTO dark is very dark on a black dashboard — lift it for visibility. */
    svg.map.dark image {
      filter: brightness(1.7) contrast(1.05) saturate(0.95);
    }
    .turbine-label {
      font-size: 9px;
      font-weight: 600;
      fill: #fff;
      stroke: rgba(0, 0, 0, 0.85);
      stroke-width: 0.5px;
      paint-order: stroke;
      text-anchor: middle;
    }
    .map-attr {
      font-size: 7px;
      fill: rgba(255, 255, 255, 0.55);
      text-anchor: end;
    }
    /* Markers default to dark-map styling; flip for light basemaps. */
    .marker-disc {
      fill: rgba(18, 20, 24, 0.6);
    }
    .map.light .marker-disc,
    .map.voyager .marker-disc {
      fill: rgba(255, 255, 255, 0.82);
    }
    .map.light .turbine-label,
    .map.voyager .turbine-label {
      fill: #16181d;
      stroke: rgba(255, 255, 255, 0.92);
    }
    .map.light .map-attr,
    .map.voyager .map-attr {
      fill: rgba(0, 0, 0, 0.5);
    }
    .rotor {
      transform-box: fill-box;
      transform-origin: center;
      animation-name: kh-spin;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    .rotor.stopped {
      animation: none;
    }
    @keyframes kh-spin {
      to {
        transform: rotate(360deg);
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }
    th,
    td {
      text-align: right;
      padding: 4px 6px;
      border-bottom: 1px solid var(--divider-color);
    }
    th:first-child,
    td:first-child {
      text-align: left;
    }
    th {
      color: var(--secondary-text-color);
      font-weight: 500;
    }
    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 6px;
      vertical-align: middle;
    }
    .revenue {
      margin-top: 16px;
      border-top: 1px solid var(--divider-color);
      padding-top: 12px;
    }
    .revenue-headline {
      font-size: 1.6rem;
      font-weight: 600;
    }
    .revenue-sub {
      color: var(--secondary-text-color);
      font-size: 0.8rem;
      margin-bottom: 10px;
    }
    .bars {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      align-items: end;
      gap: 4px;
      height: 90px;
    }
    .bar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: flex-end;
    }
    .bar {
      width: 100%;
      background: var(--kh-bar, var(--primary-color));
      border-radius: 2px 2px 0 0;
      min-height: 1px;
    }
    .bar-label {
      font-size: 0.65rem;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }
  `;

  setConfig(config: KirkhillCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
  }

  getCardSize(): number {
    return 8;
  }

  static getStubConfig(): Omit<KirkhillCardConfig, "type"> {
    return { title: "Kirk Hill Wind Farm" };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    return changed.has("hass") || changed.has("_config");
  }

  private get _turbinePrefix(): string {
    return this._config?.turbine_prefix ?? "turbine";
  }

  private get _sitePrefix(): string {
    return this._config?.site_prefix ?? "kirk_hill_wind_farm";
  }

  private _entity(id: string): HassEntity | undefined {
    return this.hass?.states?.[id];
  }

  private _number(id: string): number | null {
    const entity = this._entity(id);
    if (!entity) return null;
    const value = parseFloat(entity.state);
    return Number.isNaN(value) ? null : value;
  }

  private _turbines(): Turbine[] {
    const prefix = this._turbinePrefix;
    const turbines: Turbine[] = [];
    for (let n = 1; n <= 8; n++) {
      const running = this._entity(`binary_sensor.${prefix}_t${n}_running`);
      if (!running) continue;
      const attrs = running.attributes ?? {};
      turbines.push({
        id: `T${n}`,
        running: running.state,
        lat: attrs.latitude ?? null,
        lon: attrs.longitude ?? null,
        rpm: attrs.rotor_speed_rpm ?? null,
        latestInterval: attrs.latest_generation_interval_end ?? null,
        generation: this._number(`sensor.${prefix}_t${n}_generation`),
        share: this._number(`sensor.${prefix}_t${n}_generation_share`),
        capacityFactor: this._number(`sensor.${prefix}_t${n}_capacity_factor`),
      });
    }
    return turbines;
  }

  /** Pick the highest zoom at which all turbines still fit the padded map. */
  private _chooseZoom(turbines: Turbine[]): number {
    for (let z = 17; z >= 8; z--) {
      const xs = turbines.map((t) => lon2px(t.lon as number, z));
      const ys = turbines.map((t) => lat2px(t.lat as number, z));
      const w = Math.max(...xs) - Math.min(...xs);
      const h = Math.max(...ys) - Math.min(...ys);
      if (w <= MAP_W - 2 * MAP_PAD && h <= MAP_H - 2 * MAP_PAD) return z;
    }
    return 8;
  }

  private _renderTurbineMarker(t: Turbine, x: number, y: number): TemplateResult {
    const color = statusColor(t.running);
    const duration = spinDuration(t.rpm);
    const stopped = duration === null;
    const blades = [0, 120, 240].map(
      (deg) =>
        svg`<ellipse cx="0" cy="-8" rx="2.1" ry="8" transform="rotate(${deg})" fill="${color}" />`,
    );
    return svg`
      <g transform="translate(${x}, ${y})">
        <title>${t.id} — ${t.running} — ${num(t.rpm, 1, " rpm")}</title>
        <circle class="marker-disc" r="11" stroke="${color}" stroke-width="2" />
        <g class="rotor ${stopped ? "stopped" : ""}" style="${stopped ? "" : `animation-duration:${duration}s`}">
          ${blades}
          <circle r="2.4" fill="${color}" />
        </g>
        <text class="turbine-label" y="23">${t.id}</text>
      </g>
    `;
  }

  private _renderMap(turbines: Turbine[]): TemplateResult {
    const withCoords = turbines.filter((t) => t.lat !== null && t.lon !== null);
    if (withCoords.length === 0) {
      return html`<div class="empty">No turbine coordinates available.</div>`;
    }

    const style: MapStyle = this._config.map_style ?? "dark";
    const z = this._chooseZoom(withCoords);
    const xs = withCoords.map((t) => lon2px(t.lon as number, z));
    const ys = withCoords.map((t) => lat2px(t.lat as number, z));
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const left = cx - MAP_W / 2;
    const top = cy - MAP_H / 2;
    const maxTile = Math.pow(2, z);

    const tiles: TemplateResult[] = [];
    for (let tx = Math.floor(left / TILE_SIZE); tx <= Math.floor((left + MAP_W) / TILE_SIZE); tx++) {
      for (let ty = Math.floor(top / TILE_SIZE); ty <= Math.floor((top + MAP_H) / TILE_SIZE); ty++) {
        if (ty < 0 || ty >= maxTile) continue;
        const wx = ((tx % maxTile) + maxTile) % maxTile;
        tiles.push(
          svg`<image href="${tileUrl(style, z, wx, ty)}" x="${tx * TILE_SIZE - left}" y="${ty * TILE_SIZE - top}" width="${TILE_SIZE}" height="${TILE_SIZE}" />`,
        );
      }
    }

    return html`
      <svg class="map ${style}" viewBox="0 0 ${MAP_W} ${MAP_H}" role="img" aria-label="Turbine map">
        <defs>
          <clipPath id="${this._mapClipId}">
            <rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" rx="10" />
          </clipPath>
        </defs>
        <g clip-path="url(#${this._mapClipId})">
          ${tiles}
          ${withCoords.map((t) =>
            this._renderTurbineMarker(t, lon2px(t.lon as number, z) - left, lat2px(t.lat as number, z) - top),
          )}
          <text class="map-attr" x="${MAP_W - 5}" y="${MAP_H - 6}">© OpenStreetMap © CARTO</text>
        </g>
        <rect x="0.5" y="0.5" width="${MAP_W - 1}" height="${MAP_H - 1}" rx="10" fill="none" stroke="var(--divider-color)" />
      </svg>
    `;
  }

  private _renderTable(turbines: Turbine[]): TemplateResult {
    return html`
      <table>
        <thead>
          <tr>
            <th>Turbine</th>
            <th>Gen (kWh)</th>
            <th>Share</th>
            <th>Cap. factor</th>
          </tr>
        </thead>
        <tbody>
          ${turbines.map(
            (t) => html`
              <tr>
                <td>
                  <span class="dot" style="background:${statusColor(t.running)}"></span>${t.id}
                </td>
                <td>${num(t.generation, 2)}</td>
                <td>${num(t.share, 1, "%")}</td>
                <td>${num(t.capacityFactor, 1, "%")}</td>
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }

  private _renderRevenue(): TemplateResult | typeof nothing {
    const mtd = this._entity(`sensor.${this._sitePrefix}_revenue_month_to_date`);
    const ytd = this._entity(`sensor.${this._sitePrefix}_revenue_year_to_date`);
    if (!mtd && !ytd) return nothing;

    const mtdValue = this._number(`sensor.${this._sitePrefix}_revenue_month_to_date`);
    const monthly = (ytd?.attributes?.monthly as MonthlyItem[] | undefined) ?? [];
    const headline = mtdValue === null ? "—" : gbp.format(mtdValue);
    const priced = mtdValue !== null || monthly.length > 0;

    if (!priced) {
      return html`
        <div class="revenue">
          <div class="panel-label">Revenue</div>
          <div class="empty">Set a £/MWh price in the integration options to see revenue.</div>
        </div>
      `;
    }

    const maxRevenue = monthly.reduce((m, item) => Math.max(m, item.revenue_gbp), 0) || 1;
    return html`
      <div class="revenue">
        <div class="panel-label">Revenue — month to date</div>
        <div class="revenue-headline">${headline}</div>
        <div class="revenue-sub">Year-to-date by month</div>
        <div class="bars">
          ${monthly.map(
            (item) => html`
              <div class="bar-col" title="${gbp.format(item.revenue_gbp)}">
                <div
                  class="bar"
                  style="height:${Math.round((item.revenue_gbp / maxRevenue) * 100)}%"
                ></div>
                <div class="bar-label">${MONTH_LABELS[item.month - 1] ?? ""}</div>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html`${nothing}`;
    const turbines = this._turbines();
    const title = this._config.title ?? "Kirk Hill Wind Farm";

    if (turbines.length === 0) {
      return html`
        <ha-card>
          <div class="title">${title}</div>
          <div class="empty">
            No turbine entities found. Expected
            <code>binary_sensor.${this._turbinePrefix}_t1_running</code> … Is the Kirk Hill
            integration set up?
          </div>
        </ha-card>
      `;
    }

    const panels = this._config.panels ?? ["map", "table", "revenue"];
    const showMap = panels.includes("map");
    const showTable = panels.includes("table");
    const showRevenue = panels.includes("revenue");

    const mapBlock = showMap
      ? html`<div>
          <div class="panel-label">Turbines</div>
          ${this._renderMap(turbines)}
        </div>`
      : nothing;
    const tableBlock = showTable
      ? html`<div>
          <div class="panel-label">Status</div>
          ${this._renderTable(turbines)}
        </div>`
      : nothing;

    // Two-up only when both map and table are shown; otherwise full width.
    const topClass = showMap && showTable ? "panels" : "panels single";

    return html`
      <ha-card>
        ${this._config.title === ""
          ? nothing
          : html`<div class="title">${title}</div>`}
        ${showMap || showTable
          ? html`<div class="${topClass}">${mapBlock}${tableBlock}</div>`
          : nothing}
        ${showRevenue ? this._renderRevenue() : nothing}
      </ha-card>
    `;
  }
}

customElements.define("kirkhill-card", KirkhillCard);

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "kirkhill-card",
  name: "Kirk Hill Wind Farm Card",
  description: "Turbine map, status table and revenue chart for the Kirk Hill integration.",
  preview: true,
  documentationURL: "https://github.com/njp970/kirkhill-card",
});

// eslint-disable-next-line no-console
console.info("%c kirkhill-card %c 0.2.2 ", "background:#2e7d32;color:#fff", "");
