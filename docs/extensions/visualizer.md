---
title: Visualizer
description: Visualize MCAP and rosbag recordings, and live Zenoh sources.
---

Version 0.2.0.

This extension embeds [Lichtblick](https://github.com/lichtblick-suite/lichtblick), an open-source visualization tool, in a Bringup panel — most of what you see once it's open is Lichtblick's own interface, not something specific to Bringup.

## What it does

Visualizer opens recorded or live robotics data for inspection: MCAP files and ROS bag recordings play back with Lichtblick's plots, 3D views, and other panels, and a live WebSocket source — typically one a Zenoh Bridge device exposes — streams data as it happens.

## When you'd use it

Inspect a bag or MCAP file after a run, or watch a device's ROS 2 topics live as Zenoh Bridge forwards them.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). It contributes three commands — **Visualizer: Open**, **Visualizer: Open File**, and **Visualizer: Open Zenoh Source** — and a sidebar entry titled **Visualizer**. Opening a file, or a Zenoh Bridge device's **Open in visualizer** button, opens this panel automatically if it isn't already.

## Key screens

- **Visualizer panel** — a full embedded Lichtblick workspace, with its own layouts, panel plugins, and settings, persisted locally rather than to Lichtblick's usual per-OS location.
- **Opening a file** — a file streams into an already-open panel in chunks, up to 1.5 GB; anything larger needs Lichtblick's own in-panel file picker instead. `.mcap`, `.bag`, `.db3`, `.ulg`, and `.ulog` are the extensions this extension expects; anything else still opens, with a warning logged, and Lichtblick itself decides whether it can read it.
- **Live Zenoh sources** — opens the panel against a live `ws://` or `wss://` source (Zenoh Bridge's **Open in visualizer** button supplies this URL).
- **Plugins** — Lichtblick `.foxe` extension bundles can be installed from within the panel; they persist locally alongside their manifests.

## Common tasks

- **Open a recording** — **Visualizer: Open File**, or open one from inside the panel once it's up.
- **Watch a live device** — from a Zenoh Bridge device panel, enable and push topic forwarding, then **Open in visualizer**.
- **Install a Lichtblick plugin** — from within the panel; it's available again on restart.

## Permissions requested

`commands.register`, `notifications.show`, `webview.trustedContent`.

## Known limits

- Opening a file this way tops out at 1.5 GB; larger files need Lichtblick's own in-panel file picker.
- The extension's own docs list two items as not yet built: a native ROS 1 TCP live source, and org-aware credentials for remote bag access.

## Related

[Zenoh Bridge](./zenoh-bridge) — configures the per-device topic forwarding this extension can open live.
