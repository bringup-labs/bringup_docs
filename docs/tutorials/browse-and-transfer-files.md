---
title: Browse and Transfer Files
sidebar_position: 2
description: Browse a device's filesystem, and upload or download files with File Browser.
---

By the end of this tutorial you'll have browsed a device's filesystem and moved a file to and from it.

## Goal

Browse a device's filesystem, upload a local file to it, and download a file back.

## Prerequisites

- A device onboarded per [Connect your first device](/get-started/connect-first-device), online in Fleet Manager.
- What you can do in the file browser depends on your workspace role — some roles are read-only or can't browse certain paths at all. See [Troubleshooting](#troubleshooting) below.

## Open the file browser

1. Click **Files** in the sidebar. Pick your device from the **FLEET** list on the left — this opens a tab for it, starting at the filesystem root (`/`).

   You can also open a device's file browser directly from its own detail page, via its **Files** tab — that opens straight into `/home/bringup` instead of the root.

2. Double-click a folder to open it. Use the back/forward/up/home buttons or the breadcrumb path at the top to navigate. The column headed **Name**, **Size**, or **Modified** can be clicked to sort by it. The left column also lists shortcuts to a few common paths (`/`, `/opt`, `/var`, `/var/log`, `/tmp`, `/etc`).

3. If your role has less than full write access to the folder you're viewing, a badge next to the device address shows it (for example, "read-only · org-member"). Items you can't read at all show a lock icon and appear greyed out.

<!-- screenshot: file-browser-explorer -->

## Upload a file

1. Click **Upload**.
2. Your system's file picker opens. Choose one or more local files.
3. The upload starts immediately into the folder you're currently viewing. Progress shows at the bottom of the window.

## Download a file

1. Optionally select one or more files first (click one, or Cmd/Ctrl-click to select several).
2. Click **Download** (it shows a count, like "Download (2)", once you've selected files).
3. In the dialog, check the files you want — your selection is pre-checked, and **select all** / **clear** are shortcuts. Click **Download** again to confirm.

<!-- screenshot: file-browser-download-dialog -->

4. Your system's folder picker opens. Choose where to save the files locally.

## Other file operations

- **New folder** — click the folder icon in the toolbar. An inline field appears prefilled with `new-folder`; type a name and press Enter (Escape cancels).
- **Rename** — select exactly one item and click **Rename** (or press F2). Edit the name inline and press Enter (Escape cancels).
- **Delete** — select one or more items and click the trash icon. Confirm in the dialog that appears; this can't be undone from the desktop app.

All three require write access to the folder.

## Verification

- The uploaded file appears in the listing once the transfer finishes — the view refreshes on its own. If it doesn't show up, click the refresh icon.
- The downloaded file lands in the local folder you picked, and its transfer entry at the bottom of the window reaches 100%.

## Troubleshooting

- **Upload, New folder, Rename, or Delete are greyed out** — you have read-only or metadata-only access to this folder. Check the role badge next to the device address, and ask your workspace admin for write access if you need it.
- **A row is greyed out with a lock icon** — your role only has metadata-level access to that item: you can see it exists, but not read its contents, so downloading it is disabled. Some paths may not appear in a listing at all under a more restrictive role — they're simply omitted, not shown as an error.
- **"Filesystem unreachable"** — the device is offline or in a fault state. The listing shown is cached from the last successful sync.
- **Upload, download, or rename fails with "requires a connected device"** — the device isn't currently reachable over the network Bringup uses to reach it. Check its status in Fleet Manager and retry once it reconnects.
- **"device daemon needs an upgrade to browse files"** — the device's `bringupd` agent is too old for this feature. Re-run the [agent install command](/get-started/connect-first-device#install-the-agent) on the device to upgrade it.

## Related

- [File Browser reference](/extensions/file-browser)
