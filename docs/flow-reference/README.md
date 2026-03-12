# Flow Reference

> Complete reference documentation for Bagmaster Flow definitions, task plugins, and workflow orchestration.

---

## Overview

Bagmaster Flows are YAML-based workflow definitions that describe automated pipelines for ROS bag processing, data analysis, CI/CD orchestration, and more. Flows are managed by the **Flow Service** and transpiled into executable Jenkins pipelines by the **Transpiler Service**.

### Architecture

```
+-------------------+       +---------------------+       +-------------------+
|   Flow Editor     | ----> |   Flow Service      | ----> |   Transpiler      |
|   (Frontend UI)   |       |   (CRUD + Validate) |       |   (YAML -> Jenkins)|
+-------------------+       +---------------------+       +-------------------+
                                     |                              |
                                     v                              v
                            +------------------+          +-------------------+
                            |   PostgreSQL     |          |   Jenkinsfile     |
                            |   (Flow Store)   |          |   (Executable)    |
                            +------------------+          +-------------------+
```

---

## Flow Structure at a Glance

```yaml
id: my-flow                           # Unique identifier
namespace: my-team                    # Organizational scope
description: What this flow does      # Human-readable description

inputs:                               # Parameters users provide at runtime
  - id: dataset_name
    type: STRING
    required: true

variables:                            # Environment variables available to all tasks
  OUTPUT_DIR: /data/results

tasks:                                # Sequential list of work to perform
  - id: step-1
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Processing {{ inputs.dataset_name }}"

outputs:                              # Values exposed after flow completion
  - id: result_path
    type: STRING
    value: "{{ task_outputs.step-1.path }}"
```

---

## Documentation Index

### Task Plugins

Each plugin defines a task type you can use in your flow's `tasks` list.

| Plugin | Task Type | Description |
|--------|-----------|-------------|
| [Shell](./plugins/shell.md) | `dev.bringup.plugin.core.shell.Shell` | Execute shell commands and scripts |
| [Python Script](./plugins/python-script.md) | `dev.bringup.plugin.scripts.python.Script` | Run Python code with dependency management |
| [Docker Run](./plugins/docker-run.md) | `dev.bringup.plugin.docker.run` | Run containers with full Docker configuration |
| [ROS Bag Loader](./plugins/rosbag-loader.md) | `dev.bringup.plugin.core.rosbag.LoadById` | Download ROS bag files via JIT manifest |
| [HTTP Request](./plugins/http-request.md) | `dev.bringup.plugin.core.http.Request` | Make HTTP/REST API calls |
| [Log](./plugins/log.md) | `dev.bringup.plugin.core.log.Log` | Echo messages with template variable support |
| [Subflow](./plugins/subflow.md) | `dev.bringup.plugin.core.flow.Subflow` | Compose flows by calling other flows as tasks |

### Guides

| Guide | Description |
|-------|-------------|
| [Flow Creation Guide](./guides/flow-creation-guide.md) | Step-by-step guide to creating your first flow |
| [Inputs Reference](./guides/inputs-reference.md) | All 13 input types with validation rules |
| [Advanced Features](./guides/advanced-features.md) | Retry, concurrency, checks, triggers, and more |

---

## Quick Start

### 1. Create a minimal flow

```yaml
id: hello-world
namespace: quickstart
description: My first Bagmaster flow

inputs:
  - id: name
    type: STRING
    defaults: World

tasks:
  - id: greet
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Hello, {{ inputs.name }}!"
```

### 2. Validate it

```bash
curl -X POST https://api.dev.bringup.dev/flows/validate \
  -H "Content-Type: application/x-yaml" \
  -d @my-flow.yaml
```

### 3. Create the flow

```bash
curl -X POST https://api.dev.bringup.dev/flows \
  -H "Content-Type: application/x-yaml" \
  -H "x-oidc-sub: your-user-id" \
  -d @my-flow.yaml
```

### 4. Transpile to Jenkinsfile

```bash
curl -X POST https://api.dev.bringup.dev/transpiler/convert/jenkins \
  -H "Content-Type: application/json" \
  -d '{"id": "hello-world", "namespace": "quickstart", ...}'
```

---

## Template Expressions

Bagmaster uses Pebble-style template expressions throughout flow definitions:

| Expression | Resolves To | Example |
|------------|-------------|---------|
| `{{ inputs.<id> }}` | Input parameter value | `{{ inputs.user_name }}` |
| `{{ variables.<key> }}` | Flow variable | `{{ variables.OUTPUT_DIR }}` |
| `{{ task_outputs.<task_id>.<key> }}` | Output from a previous task | `{{ task_outputs.calculate.result }}` |

During transpilation, these are converted to shell environment variables:
- `{{ inputs.user_name }}` becomes `${USER_NAME}`
- `{{ variables.dataset_path }}` becomes `${DATASET_PATH}`

---

## API Endpoints

### Flow Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/flows` | Create a new flow |
| `GET` | `/flows/{namespace}/{flow_id}` | Get a flow by ID |
| `PUT` | `/flows/{namespace}/{flow_id}` | Update a flow (new revision) |
| `DELETE` | `/flows/{namespace}/{flow_id}` | Soft-delete a flow |
| `GET` | `/flows/{namespace}` | List flows in a namespace |
| `GET` | `/flows/search` | Search flows with filters |
| `POST` | `/flows/validate` | Validate YAML without saving |
| `GET` | `/flows/{ns}/{id}/schema` | Get JSON Schema for inputs |
| `POST` | `/flows/{ns}/{id}/validate-inputs` | Validate runtime inputs |

### Transpiler Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/transpiler/convert/jenkins` | Convert flow to Jenkinsfile |
| `POST` | `/transpiler/convert/jenkins/validate` | Check convertibility |
| `GET` | `/transpiler/plugins` | List available converter plugins |
| `GET` | `/transpiler/plugins/{name}` | Get plugin details and schema |

---

## Versioning

Every time a flow is updated via `PUT`, a new **revision** is created. Previous revisions are preserved and can be retrieved:

```bash
GET /flows/{namespace}/{flow_id}?revision=3
```

The latest revision is returned by default when no `revision` parameter is specified.
