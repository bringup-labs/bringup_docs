---
title: Shell Access
description: SSH into onboarded devices and replay session recordings.
---

Version 0.1.7.

## What it does

Shell Access opens an SSH session on a fleet-onboarded device and records it. Every session it opens is captured automatically, and you can replay the recording afterward in a built-in terminal player.

## When you'd use it

You need an interactive terminal on a device — to poke around, run a one-off command, or debug something live — or you need to go back and see exactly what happened during a past session (an audit trail, or retracing a problem after the fact).

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). It contributes two commands reachable from the command palette — **Shell: Open Recordings** and **Shell: Connect to Device** — and a sidebar entry titled **Shell**.

## Key screens

- **Shell** (the recordings table) — one row per past session, showing the device, the user who ran it, when it started, its duration (or a pulsing **Live** badge while the session is still open), and the bytes transferred so far. A search box and Device / User / date-range filters sit above the table; click **Play** on a row to open it in the player.
- **The session player** — replays a recording into a terminal, with play/pause, a draggable scrubber, elapsed and total time, and a speed control that cycles 1×, 2×, 4×, 8×. A **Skip idle** toggle compresses gaps longer than 2.5 seconds so you don't sit through dead air. The header shows the shell path, terminal size, duration, exit code, and bytes transferred. Two buttons — **⬇ .cast** and **⬇ .txt** — export the session as an asciinema recording or a plain-text transcript.
- Signed out, the panel shows "Sign in to view session recordings." with a **Sign in** button in place of the table.

## Common tasks

- **Open a live shell** — from a device's card elsewhere in the app (its **Open Shell** action), not from Shell Access's own panel. Bringup opens a new Terminal tab already connected.
- **Replay a session** — open **Shell** from the sidebar (or run **Shell: Open Recordings**), find the row, click **Play**.
- **Narrow the list** — use the search box or the Device / User / date-range filters above the table.
- **Export a session** — from the player header, download it as an asciinema `.cast` file or a plain-text transcript.

## Permissions requested

`commands.register`, `commands.execute`, `statusBar.write`, `authentication.session`, `terminal.execute`, `devices.read`, `devices.registerCapability`, `devices.shell`.

## Known limits

- Recordings are scoped to your active workspace — switching workspaces clears the list until the new workspace's recordings load.
- The player is playback-only; there's no way to type into a replay.
- No in-app way to delete a recording was found in source. <!-- TODO(maintainers): confirm whether/where recordings can be deleted or expire -->

## Related tutorial

[Get a Shell on a Device](/tutorials/get-a-shell)
