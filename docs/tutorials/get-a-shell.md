---
title: Get a Shell on a Device
sidebar_position: 1
description: Open an SSH session on a device and replay recorded sessions with Shell Access.
---

By the end of this tutorial you'll have opened a live shell session on one of your devices and replayed the recording of that session.

## Goal

Open an SSH session on a fleet-onboarded device, and replay the recording it leaves behind.

## Prerequisites

- A device onboarded per [Connect your first device](/get-started/connect-first-device), online in Fleet Manager.
- [Signed in](/get-started/sign-in) with an active workspace — recordings are scoped to your workspace, and Shell Access shows a sign-in prompt if you aren't.
- Your workspace role needs shell access. If the action described below isn't there, ask your workspace admin to grant it.

## Open a shell

1. In Fleet Manager, find your device in the device list and click its **Open Shell** action (shown as a terminal icon).
2. Bringup opens a new tab in the desktop app's Terminal panel with an SSH session already connected to the device.

<!-- screenshot: shell-session -->

3. Use the terminal as you normally would. When you're done, close the tab to end the session.

Every session opened this way is recorded automatically — there's no separate step to turn recording on. Authentication uses short-lived SSH certificates that Bringup issues for you, not a password or a long-lived key you have to manage yourself. And like the rest of the connection to your device, the session rides the same outbound-only channel you set up in [Connect your first device](/get-started/connect-first-device): the device never opens an inbound port for this.

## Replay the recording

1. Open **Shell** from the sidebar — its panel is titled **Shell · Recordings** — or run **Shell: Open Recordings** from the command palette.
2. Find your session in the table (it also shows the size transferred so far). While the terminal tab is still open, its row shows a pulsing **Live** badge in place of a duration; once you close the session, the badge is replaced by the final duration. Use the search box or the Device/User/date filters above the table if you have a lot of sessions.
3. Click **Play** on the row to replay it in the built-in terminal player.

<!-- screenshot: shell-replay-player -->

In the player, you can pause/play, drag the scrubber, and cycle playback speed (1×, 2×, 4×, 8×). **Skip idle** compresses gaps longer than 2.5s so you don't sit through dead air. Keyboard shortcuts work too: Space to play/pause, the arrow keys to seek ±5s, and Shift with an arrow key to seek ±30s. You can also export the session as an asciinema `.cast` file or a plain-text transcript from the player header — both are saved to your Downloads folder.

## Verification

- The new terminal tab shows a connected shell prompt for the device.
- Back in the Shell panel, your session appears in the recordings table with the right device and user, and replaying it shows what happened in the terminal.

## Troubleshooting

- **"Sign in to view session recordings."** — you're not signed in to Bringup. Click **Sign in** in the panel, or see [Sign In](/get-started/sign-in).
- **The recordings list shows an error mentioning you're "not signed in to this organization, or your session lacks access to its recordings."** — switch to the workspace that owns the device using the workspace switcher (see [Sign In](/get-started/sign-in)), then retry.
- **No Open Shell action on the device** — your workspace role likely doesn't include shell access. Check with your workspace admin.
- **The recordings table stays empty** — you haven't opened a shell on a device yet. Open one following the steps above, then come back and refresh.

## Related

- [Shell Access reference](/extensions/shell-access)
