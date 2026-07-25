---
title: Updates
sidebar_position: 3
description: How Bringup checks for updates, installs them, and the stable vs. staging channels.
---

## Automatic and manual checks

In production builds, the desktop app checks for updates automatically 5 seconds after launch. You can also trigger a check manually from the tray menu, under **Check for Updates**.

## Installing an update

When an update is downloaded, a toast appears in the bottom-right corner with a **Restart & Install** button. If you dismiss it instead, the update installs automatically the next time you quit the app.

## Channels

- **Stable** — published releases. This is the default channel.
- **Staging** — pre-releases. This is opt-in: it requires a build made with `BRINGUP_ALLOW_PRERELEASE=true`, which isn't something you can toggle at runtime.
