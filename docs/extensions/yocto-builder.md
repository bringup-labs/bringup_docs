---
title: Yocto Builder
description: Build, monitor, and flash Raspberry Pi Yocto images.
---

Version 0.1.0.

## What it does

Yocto Builder turns a few choices — board, starting template, packages, users, your own app code — into a Yocto/kas build, runs it on a remote bringup worker device, and walks you through flashing the result onto an SD card. Build failures are diagnosed in plain language rather than left as raw bitbake output.

## When you'd use it

You want a custom Raspberry Pi image — a minimal headless console image, or one with a Python runtime and your own app baked in — without hand-writing bitbake recipes.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). Yocto Builder did not appear in the extensions marketplace catalog when this was written, unlike several other extensions — check the Extensions view's own list (or **Install from local**) if you don't see it already installed. It contributes the **Yocto: Open Builder** command and a sidebar entry titled **Yocto Builder**. Building needs a Linux (x86_64 or aarch64) machine enrolled as a bringup **worker** device (Fleet → Enroll device) with Docker installed and reachable over the mesh, and your SSH user, key, and port set under **Settings → Yocto Builder**.

## Key screens

- **Projects rail** — one card per project: status (Never built / Building / Ready / Failed), board, template, package/app counts, and a progress bar while a build is running; **+ New** opens the project wizard.
- **New project wizard** — a name, a board (Raspberry Pi 4 64-bit, or Raspberry Pi 5), and a starting template (Minimal console, or Python app image).
- **Project header** — board, template, Yocto release (`scarthgap`), a worker picker, and stat tiles for target, template, packages, apps, users, and last build.
- **Build** — **Start build** (blocked while you have unsaved changes); while running, a phase tracker (Preflight checks → Upload config → bitbake build), a task-count progress bar, and a following log. A failed preflight check lists what's wrong and how to fix it. A finished build shows either the produced image and its size, or a plain-language explanation of the failure — the failing recipe/task, an excerpt, a suggested fix, and, for a full worker disk, a **Clean old build artifacts on the worker** button — plus a history of past builds.
- **Customize** — five sections: **Packages** (a curated picker plus freeform additions), **System** (hostname, timezone, an SSH toggle, optional WiFi), **Users** (unix accounts, an optional password, SSH public keys), **Apps** (your code — from git or a local folder, Python or a prebuilt aarch64 binary, optionally run as a systemd service), and **Raw overrides** (a kas YAML file merged in last, for anything the other tabs don't cover).
- **Flash** — appears once a build has succeeded: download the image (with progress and a checksum check), flash it with Raspberry Pi Imager or balenaEtcher, then a first-boot checklist personalized from your actual settings (the SSH command to use, WiFi vs. Ethernet).

## Common tasks

- **Create a project** — **+ New**, name it, pick a board and template.
- **Add your app** — **Customize → Apps**, point it at a git repository or a local folder.
- **Build it** — **Build → Start build**; first builds take hours, later ones reuse a shared cache and are faster.
- **Flash it** — once a build succeeds, open **Flash** and follow its three steps.
- **Recover from a failed build** — read the explanation and suggested fix on the **Build** tab; for a full disk, use **Clean old build artifacts on the worker**.

## Permissions requested

`commands.register`, `commands.execute`, `statusBar.write`, `notifications.show`, `authentication.session`, `terminal.execute`, `devices.read`, `network.http`, `workspace.read`, `workspace.write`.

## Known limits

- Only Raspberry Pi 4 (64-bit) and Raspberry Pi 5 are supported boards.
- Needs a bringup worker device — a Linux machine with Docker, reachable over the mesh; there's no build capability without one, and the project view says as much when none is enrolled.
- Yocto needs roughly 100 GB of free disk on the worker, and a first build can take hours; later builds reuse the shared cache.
- A dropped connection to the worker doesn't stop the build — it continues there while the panel reconnects.

## Related

[Fleet Manager](./fleet-manager) — enrolls the Linux worker device this extension builds on.
