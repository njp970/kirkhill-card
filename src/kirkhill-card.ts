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

interface KirkhillCardConfig {
  type: string;
  title?: string;
  turbine_prefix?: string;
  site_prefix?: string;
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
const VIEW_W = 320;
const VIEW_H = 240;
const PAD = 40;

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
      background: var(--kh-map-bg, var(--secondary-background-color));
      border-radius: 8px;
    }
    .turbine-label {
      font-size: 9px;
      fill: var(--primary-text-color);
      text-anchor: middle;
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

  /** Project turbine lat/lon into the SVG viewport. */
  private _positions(turbines: Turbine[]): Record<string, { x: number; y: number }> {
    const withCoords = turbines.filter((t) => t.lat !== null && t.lon !== null);
    const positions: Record<string, { x: number; y: number }> = {};
    if (withCoords.length === 0) return positions;

    const lats = withCoords.map((t) => t.lat as number);
    const lons = withCoords.map((t) => t.lon as number);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const latSpan = maxLat - minLat || 1e-4;
    const lonSpan = maxLon - minLon || 1e-4;

    for (const t of withCoords) {
      const x = PAD + ((t.lon as number) - minLon) / lonSpan * (VIEW_W - 2 * PAD);
      // Latitude grows north → invert the y axis.
      const y = PAD + (maxLat - (t.lat as number)) / latSpan * (VIEW_H - 2 * PAD);
      positions[t.id] = { x, y };
    }
    return positions;
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
        <circle r="12" fill="var(--card-background-color, #fff)" stroke="${color}" stroke-width="2" />
        <g class="rotor ${stopped ? "stopped" : ""}" style="${stopped ? "" : `animation-duration:${duration}s`}">
          ${blades}
          <circle r="2.4" fill="${color}" />
        </g>
        <text class="turbine-label" y="24">${t.id}</text>
      </g>
    `;
  }

  private _renderMap(turbines: Turbine[]): TemplateResult {
    const positions = this._positions(turbines);
    if (Object.keys(positions).length === 0) {
      return html`<div class="empty">No turbine coordinates available.</div>`;
    }
    return html`
      <svg class="map" viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-label="Turbine map">
        ${turbines.map((t) => {
          const pos = positions[t.id];
          return pos ? this._renderTurbineMarker(t, pos.x, pos.y) : nothing;
        })}
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

    return html`
      <ha-card>
        <div class="title">${title}</div>
        <div class="panels">
          <div>
            <div class="panel-label">Turbines</div>
            ${this._renderMap(turbines)}
          </div>
          <div>
            <div class="panel-label">Status</div>
            ${this._renderTable(turbines)}
          </div>
        </div>
        ${this._renderRevenue()}
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
console.info("%c kirkhill-card %c 0.1.0 ", "background:#2e7d32;color:#fff", "");
