---
title: Image Deploy
description: Deploy local Docker images directly to devices, with no registry in between.
---

Version 0.1.0.

In the extensions marketplace, this extension is listed as **Direct Image Deploy** and badged **AGENT PLUGIN** with a **Download** button rather than **Install**. Its own manifest (`displayName`) — and the name this page uses — is **Image Deploy**.

## What it does

Image Deploy sends a Docker image straight from your desktop to a device and runs it as a container, without a registry step in between.

## When you'd use it

You have a Docker image built locally and want to run it on a device — for quick iteration, or at a site with no registry access.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). It contributes the **Deploy Image to Device…** command and a sidebar entry titled **Images**.

## Key screens

- **Overview** — stat tiles for Containers, Images, Last deploy, and the device's own status; a Recent deploys table; a banner if the device isn't connected to the mesh.
- **Images** — a filterable table of the device's Docker images (Repository:tag, Image ID, Size, Created, and a **▶** "Run container from image" action), plus an **↑ Deploy image…** button that opens a field for a local image reference (for example `myapp:latest`).
- **The deploy stepper** — Save → Negotiate → Push layers → Commit → Done, with a progress bar and a running layer count. It notes how many layers were actually missing, or falls back to a full transfer if negotiation isn't possible. A slim strip pins above whichever other tab you're on while a deploy is running.
- **Deploys** — deploy history: image reference, status, layer count, started/finished time, and session ID.
- **Containers** (only shown if the device supports it) — an All / Running / Stopped filter and a table (Name, State, Image, Ports, Uptime) with row actions to start, stop, restart, or remove. Opening a row shows a drawer with **Logs** (tailed, with a **Follow** toggle, copy, and save) and **Inspect** tabs.
- **Run container** dialog — Image (autocompleted from the device's images), Name, Ports (`host:container`), Restart policy (`no` / `on-failure` / `always` / `unless-stopped` / the daemon default), and Env (`KEY=value`, one per line).

## Common tasks

- **Deploy an image** — Images tab → **↑ Deploy image…** → type the reference → **Deploy**; watch the stepper reach Done.
- **Run it as a container** — click **▶** next to a deployed image, or **＋ Run container**, fill in the dialog, click **▶ Run**.
- **Manage a running container** — open its row to restart, stop, or remove it, or open the drawer to read its logs or inspect it.
- **Retry a failed deploy** — the deploy panel shows a **Retry** button once an attempt fails.

## Permissions requested

`commands.register`, `notifications.show`, `devices.read`.

## Known limits

- Needs the device connected to the mesh; a disconnected device shows a banner and disables deploy and container actions.
- The Containers tab only appears if the device reports container support — an older device agent won't show it, but image deploys still work without it.
- Deploys an image you already have locally; it doesn't build or pull one for you.

## Related tutorial

[Deploy a Container](/tutorials/deploy-a-container)
