# Shell

> Execute shell commands and Bash scripts within a flow.

---

**Plugin:** `shell`
**Group:** Core

| Task Type | Alias |
|-----------|-------|
| `dev.bringup.plugin.core.shell.Shell` | Primary |
| `dev.bringup.plugin.core.shell.Bash` | Bash-specific |
| `dev.bringup.plugin.script.shell.Script` | Script mode |
| `dev.bringup.plugin.core.shell.Commands` | Commands mode |

---

## Usage

```yaml
type: dev.bringup.plugin.core.shell.Shell
```

---

## Examples

<details>
<summary>View Examples</summary>

### Basic command execution

```yaml
id: hello-world
namespace: examples
description: Run a simple shell command

tasks:
  - id: greet
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Hello from Bagmaster!"
      - date
      - whoami
```

### Using input variables

```yaml
id: parameterized-build
namespace: ci
description: Build a project with configurable options

inputs:
  - id: branch_name
    type: STRING
    defaults: main
  - id: build_type
    type: ENUM
    values:
      - debug
      - release
    defaults: release

tasks:
  - id: checkout-and-build
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - git checkout {{ inputs.branch_name }}
      - cmake -DCMAKE_BUILD_TYPE={{ inputs.build_type }} .
      - make -j$(nproc)
```

### Multi-line script with output files

```yaml
id: data-processing
namespace: analytics
description: Process dataset and archive results

tasks:
  - id: process
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - mkdir -p output/
      - |
        for file in data/*.csv; do
          echo "Processing $file..."
          sort -t',' -k1 "$file" > "output/sorted_$(basename $file)"
        done
      - echo "Processing complete"
    outputFiles:
      - "output/*.csv"
```

### Conditional execution

```yaml
tasks:
  - id: check-env
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Environment check passed"

  - id: deploy
    type: dev.bringup.plugin.core.shell.Shell
    run_if: "{{ inputs.deploy_enabled }}"
    commands:
      - ./deploy.sh --env production
    timeout: "300s"
    retry:
      type: constant
      max_attempt: 3
      interval: "10s"
```

### Bash-specific task type

```yaml
tasks:
  - id: bash-features
    type: dev.bringup.plugin.core.shell.Bash
    commands:
      - shopt -s globstar
      - |
        declare -A counts
        for f in **/*.log; do
          dir=$(dirname "$f")
          counts[$dir]=$(( ${counts[$dir]:-0} + 1 ))
        done
        for dir in "${!counts[@]}"; do
          echo "$dir: ${counts[$dir]} logs"
        done
```

</details>

---

## Properties

<details>
<summary>View Properties</summary>

### `commands` *(Required)*

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | Yes (or `script`) |
| **Description** | List of shell commands to execute sequentially. Each command runs in the same shell session. |

### `script`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes (or `commands`) |
| **Description** | Shell script content to execute. Use this for multi-line scripts as an alternative to `commands`. |

### `outputFiles`

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | No |
| **Default** | `[]` |
| **Description** | Glob patterns for files to archive after execution. Matched files are captured as build artifacts in Jenkins. |

</details>

---

## Common Task Properties

These properties are available on all task types:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | - | **Required.** Unique task identifier within the flow. Pattern: `^[a-zA-Z0-9][a-zA-Z0-9_-]*$` |
| `type` | `string` | - | **Required.** The task type identifier. |
| `description` | `string` | `null` | Human-readable description of what this task does. |
| `disabled` | `boolean` | `false` | Skip this task during execution. |
| `timeout` | `string` | `null` | Task-specific timeout (e.g., `"60s"`, `"5m"`, `"1h"`). Overrides flow-level timeout. |
| `retry` | `RetryConfig` | `null` | Retry configuration. See [Advanced Features](../guides/advanced-features.md#retry). |
| `allow_failure` | `boolean` | `false` | Continue flow execution even if this task fails. |
| `run_if` | `string` | `null` | Template expression that must evaluate to truthy for the task to run. |
| `worker_group` | `WorkerGroup` | `null` | Assign this task to a specific worker pool. |

---

## Outputs

Shell tasks do not produce structured outputs by default. To pass data between tasks:

1. Write to a file and reference it in downstream tasks via `outputFiles`
2. Use environment variables that persist within the same Jenkins stage

---


## Notes

- Template variables (`{{ inputs.* }}`, `{{ variables.* }}`) are automatically converted to shell environment variables during transpilation.
- Commands are joined with newlines and executed as a single `sh` step in Jenkins.
- For Bash-specific features (arrays, `shopt`, etc.), use the `Bash` task type variant.
- Output files are archived using Jenkins' `archiveArtifacts` step.
