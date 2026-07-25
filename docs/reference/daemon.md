---
title: The bringupd daemon
sidebar_position: 4
description: What bringupd is, and how to uninstall the system service.
---

`bringupd` is the privileged local daemon the Bringup desktop app talks to. The installer sets it up automatically as part of [first launch](/get-started/first-launch), which is why your OS prompts for an administrator password. The same daemon software runs standalone on devices, as the edge agent — see [Connect your first device](/get-started/connect-first-device).

On a device, `bringupd` is managed through the [`bringup` CLI](/reference/cli). This page covers the system service itself.

## Uninstalling the System Service

The app installs a privileged system service (`bringupd`) that is **not** automatically removed when the app is deleted. To fully uninstall, follow the steps for your platform.

### macOS

Stop and unregister the service:

```bash
sudo launchctl bootout system/com.bringup.daemon
```

Remove the binary and plist:

```bash
sudo rm /Library/PrivilegedHelperTools/bringupd
```

```bash
sudo rm /Library/LaunchDaemons/com.bringup.daemon.plist
```

Remove runtime files (the launchd trigger marker now lives under a root-owned dir; older installs used `/tmp/bringupd.run`):

```bash
rm -f /tmp/bringupd.sock /tmp/bringupd.run
```

```bash
sudo rm -rf "/Library/Application Support/com.bringup.daemon"
```

Remove logs:

```bash
sudo rm -f /var/log/bringupd.log /var/log/bringupd.err.log
```

### Linux

Stop and disable the service:

```bash
sudo systemctl stop bringupd
```

```bash
sudo systemctl disable bringupd
```

Remove the binary and service file:

```bash
sudo rm /usr/local/bin/bringupd
```

```bash
sudo rm /etc/systemd/system/bringupd.service
```

```bash
sudo systemctl daemon-reload
```

Remove runtime files:

```bash
sudo rm -f /var/run/bringupd.sock
```

On Linux, the [`bringup` CLI](/reference/cli#uninstall) also provides an automated equivalent of these steps: `sudo bringup uninstall`.

### Windows

<!-- TODO(maintainers): document Windows daemon uninstall steps -->

There's no documented way to uninstall the Windows system service. The steps above cover macOS and Linux only.
