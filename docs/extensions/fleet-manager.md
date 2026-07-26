---
title: Fleet Manager
description: Robot fleet management — groups, access control, and robot onboarding.
---

Version 0.2.14.

## What it does

Fleet Manager onboards devices into your fleet, manages the setup keys and groups that control who and what can join, and shows the state of every device — its version, whether it's up to date, and what's installed on it.

## When you'd use it

Bringing a new device online, managing setup keys and which groups they auto-assign, checking a device's status or version, or pushing a plugin or upgrade to a device remotely.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). It contributes four commands — **Fleet: Open**, **Fleet: Onboard robot**, **Fleet: Delete peer**, and **Fleet: Set as default storage** — and a sidebar entry titled **Fleet**. **Delete Peer** and **Set as default storage** surface as per-device actions elsewhere in the app's device views, not inside Fleet Manager's own tabs described below.

## Key screens

Two tabs, **Access** and **Devices**:

- **Access** — a table of setup keys (Key, Type — reusable or one-off, Device type — Edge/Gateway/Worker/Storage, Auto-groups, Uses, State, Expires, and a **Revoke** button), plus an **Onboard robot** button. A collapsed **Inactive** section lists revoked or expired keys with a **Delete** button.
- **Devices** — a table (Name, Type, OS, Version, Status) comparing each device's version against the latest published release, with an **Upgrade to \<version\>** button when it's behind. A **Plugins** toggle per row expands an inline panel listing that device's installed plugins — each with **Enable** / **Disable** / **Reload** / **Uninstall** — plus a picker and **Deploy** button to push a new plugin to it.
- **The onboarding wizard** ("Onboard a robot") — five steps: **Key** (pick or create a setup key, filtered by device type), **Identity** (set a hostname), **Install** (copy the install and register commands to run on the device), **Join** (wait for the device to check in, with a timeout), and **Done** (the device's hostname, IP, OS, version, groups, and connection status).

## Common tasks

- **Onboard a device** — Access tab → **Onboard robot** → pick or create a setup key → set a hostname → run the two copied commands on the device → wait for it to check in.
- **Create a setup key** — from the wizard's key step: name, reusable or one-off, max uses, expiry (1 day / 7 days / 30 days / never), and which groups it auto-assigns.
- **Revoke or delete a key** — Access tab, per-row **Revoke** (active keys) or **Delete** (already revoked/expired ones).
- **Upgrade a device** — Devices tab, click **Upgrade to \<version\>** on a row behind the latest release.
- **Manage a device's plugins remotely** — Devices tab, expand **Plugins** on its row to enable, disable, reload, or uninstall what's there, or deploy something new from the picker.

## Permissions requested

`commands.register`, `authentication.session`, `devices.read`, `devices.write`, `devices.registerCapability`.

## Known limits

- Setup keys and the device list are scoped to your active workspace; switching workspaces reloads both.
- A remote upgrade is confirmed by polling the device until it reports the target version, for up to 3 minutes — if it never does, the row is marked as an error rather than waiting indefinitely.
- Delete Peer and Set as default storage are declared by this extension but appear as device-card actions elsewhere in the app, not inside Fleet Manager's own Access/Devices tabs.

## Related

[Connect Your First Device](/get-started/connect-first-device) walks through onboarding a device with Fleet Manager end to end.
