---
title: bringup CLI
sidebar_position: 1
description: Reference for the bringup command-line tool that runs on devices.
---

`bringup` is the command-line tool that talks to a local `bringupd` daemon. It's installed alongside `bringupd` — on a device running the edge agent, and on your own desktop machine (see [What gets installed](/get-started/install#what-gets-installed)).

## Global flags

Every subcommand accepts these:

| Flag | Default | Description |
|---|---|---|
| `--socket` | `/tmp/bringupd.sock` (macOS) or `/var/run/bringupd.sock` (Linux) | Unix socket path for the daemon connection |
| `--json` | `false` | Output raw JSON instead of formatted text |

## register

Enroll this device with a setup key. Must be run as root.

```bash
sudo bringup register --setup-key <key> --hostname <hostname> --device-type <type>
```

For scripted or unattended installs, pipe the key in over stdin instead of putting it on the command line:

```bash
echo "$KEY" | sudo bringup register --setup-key-stdin
```

`--setup-key-stdin` refuses to read from an interactive terminal — it's meant for piping. You can't pass both `--setup-key` and `--setup-key-stdin` together.

| Flag | Default | Description |
|---|---|---|
| `--setup-key` | — | Setup key issued by the management server |
| `--setup-key-stdin` | `false` | Read the setup key from stdin instead (no echo) |
| `--hostname` | — | Set this device's hostname (applied to the OS and used for enrollment) |
| `--device-type` | `edge` | Device type: `edge`, `gateway`, `worker`, or `storage` |
| `--force` | `false` | Overwrite an existing registration on this device |
| `--config` | `/etc/bringup/config.json` (Linux) or `/usr/local/etc/bringup/config.json` (macOS) | Path to the config file to write |
| `--skip-wait` | `false` | Don't poll for registration completion after the daemon restarts |
| `--mgmt-url` | `https://mgmt.bringup.dev:443` | Management server URL |
| `--auth-url` | — (derived from `--mgmt-url`) | Auth / CA server URL |

`register` refuses to run if the device already has a config file at `--config`, unless you pass `--force`. On success it writes the config, restarts `bringupd`, and — unless `--skip-wait` is set — polls the daemon for up to 4 minutes waiting for the mesh connection to come up.

See [Connect your first device](/get-started/connect-first-device) for the full walkthrough, including how to get a setup key.

## cert

Show the mTLS certificate `bringupd` has enrolled.

```bash
bringup cert
```

By default this prints a validity summary: subject, issuer, validity window, status, and SHA-256 fingerprint. Pass `--all` for full details — serial, version, signature and public-key algorithms, SANs, key usage, and chain length.

```bash
bringup cert --all
```

| Flag | Default | Description |
|---|---|---|
| `--all` | `false` | Print full certificate details instead of the validity summary |

If no certificate is enrolled yet, `cert` says so and points you at `register`.

## uninstall

Remove `bringupd` from this device. Linux only — devices are Linux-only (see [Install Bringup](/get-started/install#supported-platforms)), and this command exits with an error on any other OS.

```bash
sudo bringup uninstall
```

Without `--purge`, this stops and disables the systemd service and removes the daemon binary, the service file, and the runtime socket — but leaves the device's identity and config in place, so reinstalling later doesn't require re-enrolling. Add `--purge` to also wipe identity, config, and state:

```bash
sudo bringup uninstall --purge --yes
```

| Flag | Default | Description |
|---|---|---|
| `--purge` | `false` | Also remove device identity, config, and state (cannot be undone) |
| `--yes` | `false` | Skip the confirmation prompt |

Unless `--yes` is set, `uninstall` asks for confirmation first — the prompt text differs depending on whether `--purge` is set, since purging can't be undone.

This command is for devices. For uninstalling the daemon on your own desktop machine, see [The bringupd daemon](/reference/daemon#uninstalling-the-system-service).

## Other commands

`bringup` has more commands than the three above. These aren't documented in depth here — run `bringup <command> --help` for details.

| Command | What it does |
|---|---|
| `health` | Check if the daemon is running |
| `version` | Show daemon version |
| `logs` | Show logs from the daemon |
| `update` | Trigger daemon self-update |
| `shutdown` | Gracefully stop the daemon |
| `docker` | Manage containers |
| `deploy` | Push a local Docker image directly to a device (no registry) |
| `plugin` | Manage agent plugins |
| `collector` | Manage telemetry collectors |
| `gateway` | Inspect gateway state |
| `storage` | Inspect org storage state |
| `telemetry` | On-device telemetry diagnostics |
| `connect` | Manage the mesh tunnel and profiles |
