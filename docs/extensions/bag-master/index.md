---
title: Bag Master
description: Rosbag post-processing, datasets, and pipelines.
---

Version 0.1.0.

In the sidebar, this opens as the **Data** panel (command: **Data: Open**) — its own webview header reads "BringUp Data". This page uses the extension's `displayName`, **Bag Master**, throughout.

## What it does

Bag Master catalogs your rosbag datasets, lets you organize and tag them, and runs repeatable processing pipelines over them — extracting, analyzing, rendering, or shipping an output — instead of wiring that up by hand each time.

## When you'd use it

You've recorded ROS bags on your robots and need to find and organize them, or you need to run the same processing (extraction, analysis, a render, a conversion) across many bags on a schedule or a trigger rather than one at a time.

## Enable or install

Like other extensions, it can be enabled, disabled, or uninstalled from the [Extensions view](/extensions/). Bag Master did not appear in the extensions marketplace catalog when this was written, unlike several other extensions — check the Extensions view's own list (or **Install from local**) if you don't see it already installed.

## Key screens

Four tabs, each showing a live count: **Datasets**, **Pipelines**, **Executions**, **Actions**.

- **Datasets** — a filterable, sortable table of bag datasets (name and tags, format, size, duration, robot, status, collection, and optional topic/message/site/uploader/recorded-at columns you can toggle on). Stat tiles across the top total, size, indexed, in-progress, and failed counts — click one to filter by it. A search box, per-column facet filters, a date-range filter, and an advanced filter-rule builder narrow the list further; column visibility, row density, and CSV export are also here. Selecting a row opens a detail panel (Topics, Timeline, Pipelines, and Actions tabs, tag editing, and quick actions like download, re-index, trim, run annotation, share link, move collection, or delete). Selecting multiple rows opens a bulk-action bar (tag, move, run a pipeline, archive, export, or delete).
- **Upload** — a drop zone (or file browser) accepting `.bag`, `.mcap`, and `.db3` files, with per-file progress, a target collection, a compression choice (zstd, lz4, or none), and an auto-index toggle.
- **Pipelines** — where flows live; see [Flows](#flows) below.
- **Executions** — every pipeline run, filterable by status (running, success, failed, warning, queued, killed, skipped), as a table of status, ID, pipeline, bag, trigger, worker, start time, and duration or live progress. Opening one shows a drawer with a per-task Gantt timeline and a live, level-filterable log stream (All / Info / Warn / Error / Debug).
- **Actions** — the library of reusable task types a pipeline task can reference, filterable by kind (validate, extract, analyze, render, output, branch), shown as cards with the task's container image, average duration, run count, and a docs panel per action.

## Flows

Bag Master is the extension; a **flow** is the YAML-based pipeline definition it runs — the unit of automation for processing your datasets. You work with flows from the **Pipelines** tab: a rail lists them by namespace, with search and a way to draft a new one by name and namespace. Opening one shows its enabled state, a **Run pipeline** button, an **Enable**/**Disable** toggle, a metrics strip (runs, success rate, average duration, last run, task count, triggers), and a split view — the task graph on one side (click a task for its dependencies, fan-out, and a run/view-logs shortcut) and the flow's `flow.yml`, syntax-highlighted, on the other, with Format and Download actions. A recent-executions strip sits below.

The **[Flow Reference](./flow-reference/)** is the language reference for that YAML: the task plugins (Shell, Python Script, Docker Run, ROS Bag Loader, HTTP Request, Log, Subflow), the full set of input types, template expressions, and versioning behavior. Read this page for what Bag Master's screens do; read the Flow Reference for how to write the flow definitions those screens run.

## Common tasks

- **Upload a dataset** — Datasets tab → Upload → drop or browse `.bag` / `.mcap` / `.db3` files → pick a collection, compression, and whether to auto-index → Upload.
- **Find a dataset** — search, click a stat tile to filter by status, or use the facet filters, date range, or filter-rule builder.
- **Tag, move, or export datasets in bulk** — select rows, then use the bulk-action bar.
- **Create and run a pipeline** — Pipelines tab → draft one by name and namespace → **Run pipeline** to trigger it manually, or enable it and let its triggers (a schedule, a tag being added, a bag being uploaded) fire it.
- **Watch a run** — Executions tab (or a flow's own recent-runs strip) → open a run → read its Gantt timeline and log stream.
- **Look up what an action does** — Actions tab → filter by kind → open its docs.

## Permissions requested

`commands.register`, `devices.read`.

## Known limits

- Did not appear in the extensions marketplace catalog when this was observed, unlike several other extensions.
- The Pipelines tab's YAML view is read-only — Format and Download actions only. Authoring happens on a flow's own **Edit** tab, alongside **Save**, **Publish**, and **Execute**; see the [Flow Reference](./flow-reference/).
- Datasets carry a `robot` field for display, but this extension declares no per-device capabilities of its own — unlike Fleet Manager, Shell Access, File Browser, or Image Deploy, it works from uploaded datasets rather than browsing a live device.

## Related

[Flow Reference](./flow-reference/) — the YAML syntax, task plugins, and guides for writing flows.
