---
title: Rollouts
description: OTA rollouts, A/B experiments, artifact registry.
---

Version 0.1.0.

## What it does

Rollouts manages staged over-the-air firmware rollouts across a fleet, A/B experiments comparing two variants, a firmware artifact registry, and a separate OS image builder for custom ROS images.

## When you'd use it

Ship a firmware update gradually — canary, then wider cohorts, gated on health metrics — instead of pushing to every device at once; run an A/B comparison between two configurations; or look up which firmware versions and images are available.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). Rollouts did not appear in the extensions marketplace catalog when this was written, unlike several other extensions — check the Extensions view's own list (or **Install from local**) if you don't see it already installed. It contributes the **Rollouts: Open** command and a sidebar entry titled **Rollouts**.

## Key screens

Five tabs — **Active**, **OS Builder**, **Experiments**, **History**, **Artifacts**:

- **Active** — a filterable (All / Live / Paused / Done) list of rollouts next to the selected one's detail: a version-to-version header with strategy and target, a stats strip (deployed, failed, soak time remaining, health gates passing, ETA), a cohort funnel (for example canary → early → production, each with a deploy count and soak requirement), a health-gates grid (metric, pass/fail, value against target), a per-device table (phase, progress, firmware, a phase-dependent action), and an event timeline. Header actions depend on state — Pause / Promote now while soaking; Resume / Rollback / Retry canary while paused; Rollback / Clone once done.
- **OS Builder** — a separate image-building workflow inside the same panel: a list of OS images, and for the selected one, five configuration sections (target hardware, ROS distribution, meta-layers, packages, image features), a generated-config viewer (`local.conf`, `bblayers.conf`, and the image recipe — editable, and regeneratable from your selections), and a build console with a phase tracker and a live log.
- **Experiments** — a list of A/B experiments next to the selected one's detail: a traffic-split bar between two variants, a metric-by-metric comparison against the primary metric, and an experiment log.
- **History** — a table of past rollouts filterable by result: when, name, target, result, device count, duration, who ran it, and a reason where one was recorded.
- **Artifacts** — an expandable list of firmware artifacts; expanding one lists its versions (state, build time, size, SHA-256, signed, source).

## Common tasks

- **Watch a rollout** — **Active** tab, select it, read its cohort funnel, health gates, and event timeline.
- **Pause, resume, or roll back** — the header buttons on a rollout's detail view; which ones show depends on its current state.
- **Compare an experiment** — **Experiments** tab, select it, read the traffic split and metric comparison.
- **Look up a firmware version** — **Artifacts** tab, expand the artifact, check the version's SHA and build info.
- **Sketch a custom OS image** — **OS Builder** tab: pick target hardware and a ROS distribution, add layers/packages/features, **Build image**.

## Permissions requested

`commands.register`, `devices.read`.

## Known limits

- In this version, the rollouts, experiments, history, and artifacts shown come from a sample dataset built into the extension rather than a live service.
- Of the on-screen actions, only **Pause** and **Resume**, and a paused rollout's **Rollback**, are wired to this data. Nearly everything else across all five tabs — including the header's **Dry-run** and **New rollout**, and most other per-rollout, per-experiment, and per-artifact actions — has no effect yet.
- OS Builder's hardware/layer/package catalog and its build progress are illustrative sample data with a simulated progress bar — it does not run a real Yocto build. The separate Yocto Builder extension builds real Raspberry Pi images on a real remote worker.

*Written from source; not verified against a live backend.*

## Related

[Yocto Builder](./yocto-builder) — builds real Raspberry Pi Yocto images on a remote worker.
