# Log

> Echo messages to the console with full template variable support.

---

import CollapsibleSection from '@site/src/components/CollapsibleSection';

**Plugin:** `log`
**Group:** Core

| Task Type | Alias |
|-----------|-------|
| `dev.bringup.plugin.core.log.Log` | Primary |
| `dev.bringup.plugin.core.log.Echo` | Echo alias |

---

## Usage

```yaml
type: dev.bringup.plugin.core.log.Log
```

---

## Examples

<CollapsibleSection title="View Examples">

### Simple message

```yaml
id: log-example
namespace: examples
description: Log messages at different stages

tasks:
  - id: start-message
    type: dev.bringup.plugin.core.log.Log
    message: "Flow execution started"

  - id: process
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Doing work..."

  - id: end-message
    type: dev.bringup.plugin.core.log.Log
    message: "Flow execution completed successfully"
```

### With template variables

```yaml
id: parameterized-log
namespace: examples
description: Log with dynamic content

inputs:
  - id: user_name
    type: STRING
    defaults: Developer
  - id: environment
    type: ENUM
    values: [dev, staging, production]
    defaults: dev

tasks:
  - id: log-config
    type: dev.bringup.plugin.core.log.Log
    message: "Deploying as {{ inputs.user_name }} to {{ inputs.environment }}"

  - id: deploy
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - ./deploy.sh --env {{ inputs.environment }}

  - id: log-complete
    type: dev.bringup.plugin.core.log.Log
    message: "Deployment to {{ inputs.environment }} complete"
```

### Debug logging with conditional execution

```yaml
tasks:
  - id: debug-info
    type: dev.bringup.plugin.core.log.Log
    message: "Debug: Input values - name={{ inputs.name }}, count={{ inputs.count }}"
    run_if: "{{ inputs.debug_mode }}"
```

</CollapsibleSection>

---

## Properties

<CollapsibleSection title="View Properties">

### `message` *(Required)*

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |
| **Description** | The message to log. Supports template variables (`{{ inputs.* }}`, `{{ variables.* }}`, `{{ task_outputs.*.* }}`). |

</CollapsibleSection>

---

## Common Task Properties

See [Shell > Common Task Properties](./shell.md#common-task-properties) for `id`, `type`, `description`, `disabled`, `timeout`, `retry`, `allow_failure`, `run_if`, and `worker_group`.

---


## Notes

- Log tasks are lightweight and ideal for adding visibility into flow execution.
- Template variables are converted to shell environment variable references during transpilation.
- Use Log tasks for debugging, progress indicators, and audit trails.
- The Echo alias (`dev.bringup.plugin.core.log.Echo`) behaves identically to Log.
