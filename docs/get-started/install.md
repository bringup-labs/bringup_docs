---
title: Install Bringup
sidebar_position: 1
description: Download and install the Bringup desktop app on macOS or Linux.
---

Bringup ships as a desktop app for macOS and Linux. On install, it also sets up `bringupd`, a privileged local daemon the app talks to — that's why the installer needs administrator access.

## Supported platforms

- **Desktop app** — macOS 11 or later, and Linux (`.deb`; x64, arm64, or armv7l).
- **Edge agent** — Linux only. This is the `bringupd` agent you install on each device you bring into your fleet, not the desktop app itself. See [Connect your first device](/get-started/connect-first-device).

<!-- TODO(maintainers): confirm minimum supported Ubuntu/distro version for both the desktop app and the edge agent -->

## Download

Go to [bringup.dev/download](https://bringup.dev/download) and choose your platform.

## Install the package

- **macOS** — open the downloaded `.pkg` and follow the installer. The build isn't notarized by Apple, so Gatekeeper may warn that it's from an unidentified developer the first time you open it; if that happens, allow it via System Settings → Privacy & Security.
- **Linux** — install the downloaded `.deb` with your package manager, for example:

```bash
sudo apt install ./bringup_<version>_<arch>.deb
```

Both installers need administrator (root) access, since they also install and start `bringupd` as a system service.

## What gets installed

Alongside the desktop app itself, the installer sets up:

- **`bringupd`** — the privileged daemon. On macOS it's placed at `/Library/PrivilegedHelperTools/com.bringup.daemon` and registered as a LaunchDaemon (`/Library/LaunchDaemons/com.bringup.daemon.plist`). On Linux it's placed at `/usr/local/bin/bringupd` and registered as a systemd service (`bringupd.service`).
- **The `bringup` CLI** — symlinked to `/usr/local/bin/bringup` on both platforms.

Both start automatically once installation finishes. Next: [first launch](/get-started/first-launch) covers what happens when you open the app and why it asks for your password.
