---
title: Connect Your First Device
sidebar_position: 4
description: Install the Bringup agent on a Linux device and register it to your fleet.
---

This walks through bringing one device online: installing the `bringupd` edge agent on a Linux machine and registering it to your fleet through the Fleet Manager extension.

## What a device needs

- Linux.
- Outbound network access. The agent only makes outbound connections — it never listens for inbound traffic, so you don't need to open any ports on the device.

<!-- TODO(maintainers): confirm minimum supported Ubuntu/distro version for the edge agent -->

## Get a setup key

You need to be signed in (see [Sign In](/get-started/sign-in)) with an active workspace. Open the **Fleet Manager** extension, go to **Access**, and click **Onboard robot**. This opens a guided setup wizard.

The wizard first asks for a device type — **Edge**, **Gateway**, **Worker**, or **Storage** — and a setup key. Pick an existing key or create a new one; the key determines which groups the device joins automatically.

## Install the agent

On the device itself (SSH in if it's headless), run:

```bash
curl -fsSL https://bringup.dev/device.sh | sudo bash
```

Re-running this later is safe — it upgrades the agent in place and doesn't disturb an existing registration.

## Register the device

Then register it, using the setup key from Fleet Manager:

```bash
sudo bringup register --setup-key <key> --hostname <hostname> --device-type <type>
```

- `<key>` — the setup key from Fleet Manager.
- `<hostname>` — lowercase letters, digits, and hyphens only; no leading or trailing hyphen; 63 characters max.
- `<type>` — `edge`, `gateway`, `worker`, or `storage`.

For scripted or unattended installs, pipe the key in over stdin instead of putting it on the command line:

```bash
echo "$KEY" | sudo bringup register --setup-key-stdin
```

## Confirm it's online

Back in the Fleet Manager wizard, the next step waits for the device to check in — usually under a minute. Once it does, the wizard shows it as connected, along with its hostname, IP, OS, and version. You can also check anytime from Fleet Manager's device list, which shows the device's status as **Online** once it's connected.
