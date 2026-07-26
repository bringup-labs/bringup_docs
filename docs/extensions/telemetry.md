---
title: Telemetry
description: Telemetry received from machines.
---

Version 0.1.8.

The extensions marketplace lists a separate **Resource Telemetry Collector** entry, badged AGENT PLUGIN — that's the device-side collector plugin this view installs and configures on a device, not this desktop extension.

## What it does

Telemetry charts the metrics a device reports — CPU, memory, disk, network, and whatever else its collector plugin gathers — live, either for one device or several overlaid together. It reads from whichever source is configured: the organization's default storage device over the mesh, a cloud telemetry API, or mesh-first-with-cloud-fallback (the default).

## When you'd use it

Check a device's health at a glance, compare resource use across several devices side by side, change which metrics a device collects, or pull a CSV of a device's recent metric history.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). It contributes the **Telemetry: Open** command and a sidebar entry titled **Telemetry**.

## Key screens

- **Toolbar** — device and online counts, a "Live · every 30s" badge once devices are selected, time-range buttons (1h / 6h / 24h / 7d), and Refresh.
- **Device rail** — one row per enrolled device, multi-selectable (at least one stays selected); a device reporting nothing shows a dimmed "no data" badge.
- **Single-device view** — the device's name and a health pill; a meta strip (host, uptime, last seen, updated); a collapsible **Metrics** selector and a **Flight recorder** export control under the header; then its metrics as cards grouped into Compute / Network / Storage / Other sections with filter chips, each expandable into a larger view.
- **Multi-device view** (2 or more selected) — the same family-grouped sections, but each card overlays one line per selected device, with a color-coded legend.
- **Metrics selector** — collapsed by default; one row per metric the device's collector plugin can gather (its emitted name, its underlying key, and roughly what it costs — about 0.5 MB/day per enabled metric), with **Apply**. If the collector plugin is missing, disabled, or crashed, this area explains which and — where a matching package is staged on your desktop — offers **Install** or **Reinstall**.
- **Flight recorder** — exports a window (1, 5, or 15 minutes) of the device's on-device metrics buffer as a CSV, via **Export CSV** and a folder picker, with progress and a note that the export contains collector-plugin metrics only, not the daemon's own host samples.

## Common tasks

- **Check one device** — select it in the rail; expand a card for a larger chart.
- **Compare devices** — select more than one; the same sections switch to overlaid, color-coded charts.
- **Change what's collected** — open **Metrics** under the device's header, tick or untick, **Apply**.
- **Install the collector plugin** — if a device reports it's missing, use the **Install** button (only available when a matching package is staged locally).
- **Export recent history** — open **Flight recorder**, pick a window, **Export CSV**, choose where to save.

## Permissions requested

`commands.register`, `notifications.show`, `devices.read`, `authentication.session`, `daemon.files`.

## Known limits

- Nothing in the stack can read a collector plugin's configuration back, so an applied metric selection is only ever the desktop's own record of what it last sent — it can drift from what the device is actually doing.
- Installing or reinstalling the collector plugin only works when a matching package happens to be staged on this desktop; otherwise the device is reported as unavailable, with no install option offered.
- Exports cover collector-plugin metrics only; the daemon's own host samples (CPU, memory, disk, plugin count) travel a separate path and never appear in one.

*Written from source; not verified against a live backend.*

## Related

[Fleet Manager](./fleet-manager) — installs, enables, and disables the collector plugin this view depends on.
