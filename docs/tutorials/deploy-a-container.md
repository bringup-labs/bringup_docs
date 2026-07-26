---
title: Deploy a Container
sidebar_position: 3
description: Send a local Docker image straight to a device and run it, with no registry in between.
---

By the end of this tutorial you'll have sent a Docker image from your machine straight to a device and run it as a container.

## Goal

Deploy a local Docker image directly to a device with Image Deploy, then run it as a container.

## Prerequisites

- A device onboarded per [Connect your first device](/get-started/connect-first-device), online and connected. In the Images panel, a device that isn't connected shows "(not connected)" next to its name.
- Docker installed on your desktop machine. Setup installs this for you if it's missing — see [First Launch](/get-started/first-launch).
- The image you want to deploy already exists locally — Image Deploy sends an image you already have; it doesn't build or pull one for you. Check with:

```bash
docker images
```

## Deploy the image

1. Click **Images** in the sidebar. If your device isn't already selected in the dropdown at the top, pick it there. (You can also get here from a device's own **Images** tab, or its **Deploy image…** action, on its detail page.)
2. On the Images tab, click **↑ Deploy image…**.
3. Type the local image reference (for example, `myapp:latest`) into the field and click **Deploy**, or press Enter.
4. Watch it move through **Save**, **Negotiate**, **Push layers**, and **Commit** to **Done**, with a progress bar and a running layer count. When it finishes, Bringup shows a "Deployed …" notification.

<!-- screenshot: deploy-progress -->

## Run it as a container

1. In the Images table, click the **▶** action next to the image you just deployed ("Run container from image"). Or switch to the **Containers** tab and click **＋ Run container**.
2. Fill in the dialog: **Image** (prefilled), **Name** (prefilled from the image, editable), **Ports** (`host:container`, for example `9090:8080`), **Restart policy** (`no`, `on-failure`, `always`, `unless-stopped`, or the daemon default), and **Env** (`KEY=value`, one per line).

<!-- screenshot: run-container-dialog -->

3. Click **▶ Run**.

## Why there's no registry step

A normal Docker workflow is `docker push` to a registry, then `docker pull` on every device — which means a registry account, credentials on each device, and network access to that registry from every device you deploy to.

Image Deploy skips all of that. Deploying moves through five steps — Save, Negotiate, Push layers, Commit, Done — and the Negotiate step is what makes it registry-free: Bringup compares the image's layers against what the device already has (by digest) and reports how many are actually missing, then pushes only those. If negotiation isn't possible, it falls back to sending the whole image. Either way, the image travels straight from your desktop to the device over the same connection Bringup already uses to reach it — no registry, no `docker login`, no `push`/`pull` on either end.

## Verification

- The Images tab lists the image you deployed, with its size and a "Created" time.
- The Deploys tab shows a new row for the session: image reference, status, layer count, and start/finish time.
- If you ran it as a container, the Containers tab shows it running, with its port mapping and uptime.

## Troubleshooting

- **Deploy button disabled, or a banner reading "This device is not connected to the mesh — deploy and container actions are unavailable."** — the device isn't currently reachable. Check its status in Fleet Manager and retry once it's back online.
- **"Deploy failed: …"** appears with a **Retry** button — read the reason shown (for example, the reference not matching an image you have locally), fix it, and click Retry.
- **The Containers tab isn't there at all** — your desktop app version doesn't support container management yet. Image deploys still work without it.

## Related

- [Image Deploy reference](/extensions/image-deploy)
