---
title: File Locations
sidebar_position: 2
description: Where the Bringup desktop app stores logs and configuration on each platform.
---

## Logs

The desktop app writes logs to:

| Platform | Path |
|----------|------|
| macOS    | `~/Library/Logs/Bringup/main.log` |
| Windows  | `%USERPROFILE%\AppData\Roaming\Bringup\logs\main.log` |
| Linux    | `~/.config/Bringup/logs/main.log` |

Log files rotate automatically at 5 MB.

## Configuration

The app's configuration is stored in a JSON file in the user's application data directory:

| Platform | Path |
|----------|------|
| macOS    | `~/Library/Application\ Support/Bringup/bringup-onboarding.json` |
| Windows  | `%APPDATA%\Bringup\bringup-onboarding.json` (usually `C:\Users\<Your Username>\AppData\Roaming\Bringup\bringup-onboarding.json`) |
| Linux    | `~/.config/Bringup/bringup-onboarding.json` |

## See also

- [The bringupd daemon](/reference/daemon) — the daemon's own install locations and how to remove them.
- [bringup CLI](/reference/cli) — the `--config` path a device's `bringupd` uses.
