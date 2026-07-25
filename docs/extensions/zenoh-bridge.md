---
title: Zenoh Bridge
description: Per-device ROS 2 topic forwarding over Zenoh.
---

Version 0.1.1.

The extensions marketplace also lists a Zenoh Bridge entry badged AGENT PLUGIN — that's `plugin_zenoh_bridge`, the device-side plugin this extension pushes to devices via Fleet Manager, not this desktop extension itself.

## What it does

Zenoh Bridge configures which ROS 2 topics a device forwards over Zenoh, and at what rate, then can open those live topics in the Visualizer.

## When you'd use it

Watch a device's ROS 2 topics live from your desktop instead of opening a shell, or throttle which topics — and how fast — a bandwidth-constrained device forwards.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). It contributes the **Zenoh: Open** command and a sidebar entry titled **Zenoh**. A device needs `plugin_zenoh_bridge` installed on it first, deployed like any other device plugin from Fleet Manager — a device without it shows a "no plugin" badge here.

## Key screens

- **Devices** (left rail) — one row per mesh peer: status dot, name, IP, and a "no plugin" badge where `plugin_zenoh_bridge` isn't installed; a device/online count and Refresh sit above it.
- **Device panel** — the plugin's installed version and state (or a prompt to deploy it from Fleet first), a **Forward topics over zenoh** checkbox, a topics table (topic name, an optional max Hz, remove), an add-topic field, and a collapsible **Show advanced** section (zenoh port, ws port, backend: host or docker).
- **Actions** — **Push to device** sends the configuration to the device (disabled until something's changed, invalid, or already sending); **Open in visualizer** sends the device's live topics to the Visualizer panel (disabled with unpushed changes, or if forwarding isn't enabled).

## Common tasks

- **Forward a topic** — select the device, enable **Forward topics over zenoh**, add a topic path (must start with `/`), optionally cap its rate, **Push to device**.
- **Watch it live** — once pushed and enabled, **Open in visualizer**.
- **Adjust ports or backend** — **Show advanced**, then edit zenoh port / ws port / backend.

## Permissions requested

`commands.register`, `commands.execute`, `authentication.session`.

## Known limits

- Enabling forwarding requires at least one topic. A topic must be an absolute ROS name (start with `/`) using only letters, digits, and `_/~.-`; the zenoh and ws ports must be distinct, valid port numbers.
- There's no way to read a device's actual running configuration back — the panel shows only the last configuration this desktop itself pushed, which can drift from reality if the device was reconfigured another way.
- **Open in visualizer** needs the Visualizer extension installed and active; otherwise it reports that plainly rather than doing nothing silently.

## Related

[Visualizer](./visualizer) — opens the live topics this extension forwards.
