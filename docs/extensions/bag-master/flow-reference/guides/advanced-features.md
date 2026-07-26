---
title: Advanced Features
description: Retry policies, concurrency control, pre-execution checks, triggers, and error handling for flows.
---

> Retry policies, concurrency control, pre-execution checks, triggers, error handling, and more.

---

## Table of Contents

1. [Retry Configuration](#retry-configuration)
2. [Pre-Execution Checks](#pre-execution-checks)
3. [Error Handling](#error-handling)
4. [Finally Tasks](#finally-tasks)
5. [Triggers](#triggers)
6. [Timeout Configuration](#timeout-configuration)
7. [Flow Labels](#flow-labels)
8. [Marketplace Publishing](#marketplace-publishing)

---

## Retry Configuration

Retry policies control how failed tasks are retried. They can be set at the flow level (applies to all tasks) or on individual tasks.

### Retry Types

#### Constant Retry

Fixed delay between retries:

```yaml
retry:
  type: constant
  max_attempt: 3
  interval: "10s"
```

Retry pattern: `10s → 10s → 10s`

#### Exponential Backoff

Increasing delay between retries:

```yaml
retry:
  type: exponential
  max_attempt: 5
  interval: "5s"
  max_interval: "300s"
  delay_factor: 2.0
```

Retry pattern: `5s → 10s → 20s → 40s → 80s` (capped at 300s)

#### Random Retry

Randomized delay between retries:

```yaml
retry:
  type: random
  max_attempt: 3
  interval: "5s"
  max_interval: "30s"
```

Retry pattern: Random delay between `interval` and `max_interval`.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `string` | `"constant"` | Retry strategy: `constant`, `exponential`, `random` |
| `max_attempt` | `integer` | `1` | Maximum number of attempts (minimum 1) |
| `interval` | `string` | `null` | Base delay between retries (e.g., `"5s"`, `"1m"`) |
| `max_interval` | `string` | `null` | Maximum delay for exponential/random strategies |
| `delay_factor` | `float` | `null` | Multiplier for exponential backoff |

### Task-Level vs Flow-Level

```yaml
# Flow-level retry (applies to all tasks)
retry:
  type: constant
  max_attempt: 2
  interval: "10s"

tasks:
  - id: task-1
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Uses flow-level retry"

  - id: task-2
    type: dev.bringup.plugin.core.shell.Shell
    # Override with task-level retry
    retry:
      type: exponential
      max_attempt: 5
      interval: "5s"
      delay_factor: 2.0
    commands:
      - ./flaky-command.sh
```

---

## Pre-Execution Checks

Checks run before the flow executes, providing guardrails and validation:

```yaml
checks:
  - condition: "{{ inputs.environment != 'production' or inputs.confirmed }}"
    message: "Production deployments require explicit confirmation"
    style: ERROR
    behavior: BLOCK_EXECUTION

  - condition: "{{ inputs.batch_size <= 1000 }}"
    message: "Large batch sizes (>1000) may cause memory issues"
    style: WARNING
    behavior: CREATE_EXECUTION
```

### Check Properties

| Property | Type | Description |
|----------|------|-------------|
| `condition` | `string` | **Required.** Template expression that must be truthy |
| `message` | `string` | **Required.** Message displayed to the user |
| `style` | `string` | Visual style: `ERROR`, `WARNING`, `INFO`, `SUCCESS` |
| `behavior` | `string` | What happens on failure (see below) |

### Check Behaviors

| Behavior | Description |
|----------|-------------|
| `BLOCK_EXECUTION` | Prevent the flow from starting (default) |
| `FAIL_EXECUTION` | Start the flow but mark it as failed |
| `CREATE_EXECUTION` | Show the warning but allow execution to proceed |

---

## Error Handling

### allow_failure

Continue flow execution even if a task fails:

```yaml
tasks:
  - id: optional-cleanup
    type: dev.bringup.plugin.core.shell.Shell
    allow_failure: true
    commands:
      - rm -rf /tmp/cache || true
      - echo "Cleanup attempted"

  - id: main-task
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "This runs regardless of cleanup result"
```

### Error Tasks

Define tasks that run only when the flow encounters an error:

```yaml
tasks:
  - id: main-process
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - ./process.sh

errors:
  - id: notify-failure
    type: dev.bringup.plugin.core.http.Request
    url: https://hooks.slack.example.com/notify
    method: POST
    headers:
      Content-Type: application/json
    body: |
      {"text": "Flow failed! Check Jenkins for details."}

  - id: cleanup-on-error
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Cleaning up after failure..."
      - rm -rf /tmp/work/*
```

---

## Finally Tasks

Tasks that always run, regardless of success or failure (like `try/finally` in code):

```yaml
tasks:
  - id: setup
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - mkdir -p /tmp/workspace
      - echo "Setup complete"

  - id: process
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - ./long-running-process.sh

finally:
  - id: cleanup
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - rm -rf /tmp/workspace
      - echo "Workspace cleaned up"

  - id: send-metrics
    type: dev.bringup.plugin.core.http.Request
    url: https://metrics.example.com/api/record
    method: POST
    body: '{"flow": "my-flow", "status": "completed"}'
```

---

## Triggers

Triggers automate flow execution based on events or schedules:

```yaml
triggers:
  - id: daily-run
    type: schedule
    cron: "0 8 * * 1-5"
    disabled: false

  - id: on-webhook
    type: webhook
    conditions:
      - type: filter
        field: event_type
        value: new_data
```

### Trigger Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | - | **Required.** Unique trigger identifier |
| `type` | `string` | - | **Required.** Trigger type (e.g., `schedule`, `webhook`) |
| `disabled` | `boolean` | `false` | Disable the trigger |
| `conditions` | `List[object]` | `null` | Additional conditions for the trigger to fire |

---

## Timeout Configuration

Timeouts can be set at the flow level and/or task level:

```yaml
# Flow-level timeout (applies to entire execution)
timeout: "3600s"

tasks:
  - id: quick-task
    type: dev.bringup.plugin.core.shell.Shell
    timeout: "30s"
    commands:
      - echo "Must complete in 30 seconds"

  - id: long-task
    type: dev.bringup.plugin.docker.run
    timeout: "1800s"
    containerImage: compute-heavy:latest
    commands:
      - ./heavy-computation.sh
```

### Duration Format

| Format | Example | Description |
|--------|---------|-------------|
| Seconds | `"30s"` | 30 seconds |
| Minutes | `"5m"` | 5 minutes |
| Hours | `"2h"` | 2 hours |
| Combined | `"1h30m"` | 1 hour 30 minutes |

Default flow timeout: `"200s"`

---

## Flow Labels

Labels are key-value metadata for organizing and filtering flows:

```yaml
labels:
  category: ml-training
  team: data-science
  priority: high
  environment: production
```

Labels are searchable and can be used to filter flows in the UI.

---

### Subflow Revision Pinning

Pin subflows to specific revisions for stability:

```yaml
tasks:
  - id: stable-subflow
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: tested-pipeline
    namespace: production
    revision: 5    # Always use revision 5
    inputs:
      data: "{{ inputs.raw_data }}"
```

---

## Marketplace Publishing

Share your flows with the community:

### 1. Submit for Review

- Submit flow with metadata, description, and tags
- Include a brief description and usage instructions

### 2. Review Process

- Submissions go through an approval workflow
- Admins can approve or reject with notes
- Approved flows appear in the public marketplace

### 3. Using Marketplace Flows

```yaml
tasks:
  - id: use-community-flow
    type: dev.bringup.plugin.core.flow.Subflow
    marketplaceListingId: "uuid-of-listing"
    inputs:
      data: "{{ inputs.my_data }}"
```

---

## Complete Example: All Advanced Features

```yaml
id: production-pipeline
namespace: production
description: Full-featured production pipeline with all advanced features

labels:
  category: deployment
  tier: critical
  team: platform

timeout: "7200s"

retry:
  type: exponential
  max_attempt: 3
  interval: "10s"
  max_interval: "120s"
  delay_factor: 2.0

checks:
  - condition: "{{ inputs.environment != 'production' or inputs.approve_production }}"
    message: "Production deployments require explicit approval"
    style: ERROR
    behavior: BLOCK_EXECUTION
  - condition: "{{ inputs.version matches '^v[0-9]+\\.[0-9]+\\.[0-9]+$' }}"
    message: "Version must follow semver format (e.g., v1.2.3)"
    style: ERROR
    behavior: BLOCK_EXECUTION

inputs:
  - id: version
    type: STRING
    required: true
    pattern: "^v[0-9]+\\.[0-9]+\\.[0-9]+$"
  - id: environment
    type: ENUM
    values: [staging, production]
    defaults: staging
  - id: approve_production
    type: BOOLEAN
    defaults: false
    depends_on:
      inputs: [environment]
      condition: "{{ inputs.environment == 'production' }}"

tasks:
  - id: validate
    type: dev.bringup.plugin.core.shell.Shell
    timeout: "60s"
    commands:
      - echo "Validating version {{ inputs.version }}"

  - id: build
    type: dev.bringup.plugin.docker.run
    containerImage: builder:latest
    timeout: "1800s"
    commands:
      - make build VERSION={{ inputs.version }}

  - id: deploy
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: deploy-service
    namespace: devops
    inputs:
      version: "{{ inputs.version }}"
      environment: "{{ inputs.environment }}"

errors:
  - id: rollback
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Rolling back deployment..."
      - ./rollback.sh

  - id: alert
    type: dev.bringup.plugin.core.http.Request
    url: https://alerts.example.com/critical
    method: POST
    body: '{"message": "Deployment failed for {{ inputs.version }}"}'

finally:
  - id: cleanup
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Cleaning up temporary resources"
      - rm -rf /tmp/build-*

  - id: record-metrics
    type: dev.bringup.plugin.core.http.Request
    url: https://metrics.example.com/record
    method: POST
    body: '{"flow": "production-pipeline", "version": "{{ inputs.version }}"}'

triggers:
  - id: nightly
    type: schedule
    disabled: true
    conditions:
      - type: filter
        field: day
        value: weekday

outputs:
  - id: deployed_version
    type: STRING
    value: "{{ inputs.version }}"
```
