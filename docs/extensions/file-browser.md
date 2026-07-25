---
title: File Browser
description: Per-device file explorer with upload, download, and filesystem management.
---

Version 0.1.3.

## What it does

File Browser is a per-device file explorer: browse a device's filesystem, upload and download files, and do basic filesystem management (new folder, rename, delete) — all scoped to your access on that device.

## When you'd use it

You need to inspect, move, or transfer files on a specific device — grab a log file, drop in a config, clear out disk space — without opening a shell.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). It contributes the **Files: Open** command and a sidebar entry titled **Files**. It can also open directly from a device's own detail page, via that device's **Files** tab.

## Key screens

- **Files** (standalone) — a left rail listing your fleet's devices, each with a status dot, name, site/IP, and online/offline state. Click one to open a tab for it; **Open selected** opens the currently-selected device, and **Close all** closes every open tab.
- **The explorer pane** — a toolbar with Back / Forward / Up / Home navigation, **Upload**, **Download** (labelled with a count once files are selected), a new-folder button, **Rename**, **Refresh**, and delete; an address bar of clickable breadcrumbs; a left-hand list of shortcuts (`/`, `/opt`, `/var`, `/var/log`, `/tmp`, `/etc`); and a sortable file list (Name, Size, Modified, plus Owner and Perms columns). A role badge — for example "read-only" — appears next to the device address when your access is less than full write.
- Upload, download, and delete each open their own confirmation dialog. A transfer strip at the bottom of the pane shows the most recent uploads/downloads with a progress bar each.

## Common tasks

- **Browse a device's filesystem** — click it in the fleet rail (starts at `/`), or open its own **Files** tab from its device page (starts at `/home/bringup` instead).
- **Upload a file** — click **Upload**, pick local files (or drag them onto the pane); the transfer starts into the folder you're viewing.
- **Download a file** — select one or more files, click **Download**, confirm in the dialog, choose a local folder.
- **New folder, rename, or delete** — toolbar buttons; each needs write access to the folder you're in.

## Permissions requested

`commands.register`, `authentication.session`, `devices.read`, `devices.registerCapability`, `daemon.files`.

## Known limits

- Access is per-role: items you can't read at all show a lock icon and appear greyed out, and some paths may not appear in a listing at all under a more restrictive role.
- If a device goes offline or faults, the pane falls back to a cached listing from the last successful sync, labelled "Filesystem unreachable."
- A device that disappears from the fleet roster has its open tab closed automatically.

## Related tutorial

[Browse and Transfer Files](/tutorials/browse-and-transfer-files)
