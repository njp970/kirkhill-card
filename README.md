# Kirk Hill Wind Farm — Lovelace card

[![hacs][hacs-badge]][hacs] [![CI][ci-badge]][ci]

A companion Lovelace card for the [Kirk Hill Wind Farm integration][integration].
It renders a turbine map with spinning rotors, a per-turbine status table, and an
optional revenue panel — reading entity state/attributes only (no API calls).

> Try it without Home Assistant: open `examples/demo.html` (see Development).

## Features

- **Turbine map** — each of the 8 turbines is positioned from its real
  coordinates and drawn as an SVG rotor that **spins at a rate proportional to
  `latest_rotor_speed_rpm`** and is coloured by running / stopped / unknown.
- **Status table** — generation (kWh), generation share (%) and capacity factor
  (%) per turbine, with a status dot.
- **Revenue panel** — a headline month-to-date figure plus a year-to-date
  monthly bar chart, taken from the `monthly` attribute of the YTD revenue
  sensor. Hidden / prompts you when no £/MWh price is configured.

## Requirements

The [Kirk Hill Wind Farm integration][integration] must be installed and
configured — the card reads its entities.

## Installation

### HACS (recommended)

1. HACS → **Frontend** → ⋮ → **Custom repositories**, add
   `https://github.com/njp970/kirkhill-card` with category **Lovelace**.
2. Install **Kirk Hill Wind Farm Card**.
3. HACS adds the resource automatically. (If not: **Settings → Dashboards → ⋮ →
   Resources → Add** `/hacsfiles/kirkhill-card/kirkhill-card.js` as a JavaScript
   module.)

### Manual

Copy `dist/kirkhill-card.js` to `config/www/kirkhill-card.js`, then add a
dashboard resource pointing at `/local/kirkhill-card.js` (JavaScript module).

## Usage

```yaml
type: custom:kirkhill-card
title: Kirk Hill Wind Farm
```

### Options

| Option | Default | Description |
| --- | --- | --- |
| `title` | `Kirk Hill Wind Farm` | Card heading. Set to `""` to hide it (e.g. when using a dashboard section heading). |
| `panels` | `[map, table, revenue]` | Which panels to render. Use a subset to split the card up, e.g. `panels: [map]` for a map-only panel. |
| `map_style` | `dark` | Basemap style: `dark`, `light`, or `voyager` (colour). |
| `turbine_prefix` | `turbine` | Object-id prefix for turbine entities, e.g. `binary_sensor.<prefix>_t1_running`. |
| `site_prefix` | `kirk_hill_wind_farm` | Object-id prefix for the site revenue sensors. |

The defaults match the integration's default entity names. Only change the
prefixes if you renamed the devices/entities.

#### Examples

A map-only panel on a Voyager basemap (handy for a two-column dashboard):

```yaml
type: custom:kirkhill-card
title: ""
panels: [map]
map_style: voyager
```

## Example dashboard

[`examples/dashboard.yaml`](examples/dashboard.yaml) is a complete, ready-to-paste
Home Assistant dashboard built around this card (map, gauges, per-turbine status
and a year-to-date revenue chart). It needs the [Kirk Hill integration][integration],
Mushroom and ApexCharts (all via HACS). The header explains how to use the whole
file or drop just the view in as a tab.

## Development

```bash
npm install
npm run typecheck
npm run build      # -> dist/kirkhill-card.js (committed for HACS)
```

`examples/demo.html` renders the card against mock data for quick local preview
(`npx serve` or any static server, then open the page).

[integration]: https://github.com/njp970/ha_kirkhill
[hacs]: https://github.com/hacs/integration
[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
[ci]: https://github.com/njp970/kirkhill-card/actions/workflows/ci.yml
[ci-badge]: https://github.com/njp970/kirkhill-card/actions/workflows/ci.yml/badge.svg
