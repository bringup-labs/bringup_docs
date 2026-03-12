# ROS Bag Loader

> Download ROS bag files using JIT (Just-In-Time) manifest with presigned URLs.

---

**Plugin:** `rosbag-loader`
**Group:** Core / ROS

| Task Type |
|-----------|
| `dev.bringup.plugin.core.rosbag.LoadById` |

---

## Usage

```yaml
type: dev.bringup.plugin.core.rosbag.LoadById
```

---

## Overview

The ROS Bag Loader is a specialized task for downloading ROS bag files from cloud storage. It uses a JIT manifest system with presigned URLs to securely download bag files without requiring permanent credentials.

When a flow has inputs matching rosbag naming conventions (e.g., `rosbag_id`), the Flow Service can automatically insert a `LoadById` task at the beginning of the flow.

---

## Examples

### Basic rosbag loading

```yaml
id: load-rosbag
namespace: robotics
description: Download and inspect a ROS bag file

inputs:
  - id: rosbag_id
    type: STRING
    required: true
    description: The ID of the rosbag to download

variables:
  BM_ROSBAGS_DIR: .bagmaster/rosbags
  BM_ROSBAGS_MANIFEST_PATH: .bagmaster/rosbags/manifest.json

tasks:
  - id: bm_rosbag_loader
    type: dev.bringup.plugin.core.rosbag.LoadById

  - id: inspect
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - ls -la ${BM_ROSBAGS_DIR}
      - cat ${BM_ROSBAGS_MANIFEST_PATH}
      - echo "Rosbag files downloaded successfully"
```

### Rosbag with Python analysis

```yaml
id: rosbag-analysis
namespace: analytics
description: Download a rosbag and analyze its contents

inputs:
  - id: rosbag_id
    type: STRING
    required: true

variables:
  BM_ROSBAGS_DIR: .bagmaster/rosbags
  BM_ROSBAGS_MANIFEST_PATH: .bagmaster/rosbags/manifest.json

tasks:
  - id: bm_rosbag_loader
    type: dev.bringup.plugin.core.rosbag.LoadById

  - id: analyze
    type: dev.bringup.plugin.scripts.python.Script
    dependencies:
      - rosbags
    script: |
      import json
      import os

      manifest_path = os.getenv("BM_ROSBAGS_MANIFEST_PATH")
      with open(manifest_path) as f:
          manifest = json.load(f)

      entries = manifest.get("entries", [])
      print(f"Downloaded {len(entries)} rosbag files:")
      for entry in entries:
          print(f"  - {entry.get('filename', 'unknown')}")
          print(f"    Size: {entry.get('size', 'unknown')} bytes")
```

### Custom target directory

```yaml
tasks:
  - id: bm_rosbag_loader
    type: dev.bringup.plugin.core.rosbag.LoadById
    targetDir: /workspace/custom-bags
    overwrite: true
```

### With overwrite control

```yaml
tasks:
  - id: bm_rosbag_loader
    type: dev.bringup.plugin.core.rosbag.LoadById
    targetDir: "${BM_ROSBAGS_DIR}"
    manifestPath: "${BM_ROSBAGS_MANIFEST_PATH}"
    overwrite: false
```

---

## Properties

### `targetDir`

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Default** | `"${BM_ROSBAGS_DIR}"` |
| **Description** | Directory where rosbag files will be downloaded. Defaults to the `BM_ROSBAGS_DIR` environment variable, typically `.bagmaster/rosbags`. |

### `manifestPath`

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Default** | `"${BM_ROSBAGS_MANIFEST_PATH}"` |
| **Description** | Path where the JIT manifest JSON file will be written. The manifest contains metadata about downloaded files including their paths and sizes. |

### `overwrite`

| | |
|---|---|
| **Type** | `boolean` |
| **Required** | No |
| **Default** | `true` |
| **Description** | Whether to overwrite existing rosbag files in the target directory. Set to `false` to skip downloading files that already exist. |

---

## Common Task Properties

See [Shell > Common Task Properties](./shell.md#common-task-properties) for `id`, `type`, `description`, `disabled`, `timeout`, `retry`, `allow_failure`, `run_if`, and `worker_group`.

---

## Auto-Insertion

The Flow Service automatically inserts a `LoadById` task when it detects rosbag-related inputs in a flow. The detection is convention-based:

- Input IDs matching rosbag patterns (e.g., `rosbag_id`) trigger automatic insertion
- The loader task is placed at the beginning of the task list
- Required variables (`BM_ROSBAGS_DIR`, `BM_ROSBAGS_MANIFEST_PATH`) are added to the flow

This means you can sometimes omit the loader task entirely if your flow follows naming conventions:

```yaml
# The loader task will be auto-inserted before 'process'
id: auto-load-example
namespace: robotics
inputs:
  - id: rosbag_id
    type: STRING
tasks:
  - id: process
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Rosbag is already available at ${BM_ROSBAGS_DIR}"
```

---

## Generated Jenkinsfile

The ROS Bag Loader generates a shell script that downloads bags via presigned URLs:

```groovy
stage('bm_rosbag_loader') {
    steps {
        sh(label: 'Task: bm_rosbag_loader', script: '''
mkdir -p ${BM_ROSBAGS_DIR}
# JIT manifest download and rosbag retrieval
# Uses presigned URLs from the Bagmaster API
''')
    }
}
```

---

## Notes

- The rosbag loader requires network access to the Bagmaster cloud storage endpoint.
- Presigned URLs have a limited validity window; flows should be executed promptly after creation.
- The manifest file (`manifest.json`) contains metadata about all downloaded files, useful for downstream tasks.
- Large rosbag files may require extended timeouts on the task.
