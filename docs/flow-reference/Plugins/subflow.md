# Subflow

> Compose workflows by calling other flows as tasks, enabling modular and reusable flow design.

---

**Plugin:** `subflow`
**Group:** Core / Orchestration

| Task Type |
|-----------|
| `dev.bringup.plugin.core.flow.Subflow` |

---

## Usage

```yaml
type: dev.bringup.plugin.core.flow.Subflow
```

---

## Overview

The Subflow task allows you to invoke another flow as a step within your current flow. This enables:

- **Modularity** - Break complex workflows into reusable components
- **Composition** - Build parent flows that orchestrate multiple child flows
- **Marketplace reuse** - Reference published flows from the Bagmaster Marketplace
- **Input/output passing** - Pass data between parent and child flows

Subflows can reference flows in two ways:
1. **Own flows** - By `flowId` + `namespace` (+ optional `revision`)
2. **Marketplace flows** - By `marketplaceListingId`

---

## Examples

<details>
<summary>View Examples</summary>

### Reference an own flow

```yaml
id: parent-flow
namespace: workflows
description: Orchestrate multiple child flows

inputs:
  - id: project_name
    type: STRING
    defaults: my-project

tasks:
  - id: run-build
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: build-pipeline
    namespace: ci
    inputs:
      project: "{{ inputs.project_name }}"
      branch: main
    outputSchema:
      build_artifact:
        type: STRING
      build_version:
        type: STRING

  - id: run-tests
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: test-suite
    namespace: ci
    inputs:
      artifact_path: "{{ task_outputs.run-build.build_artifact }}"
    outputSchema:
      test_passed:
        type: BOOLEAN
      coverage:
        type: FLOAT
```

### Reference a specific revision

```yaml
tasks:
  - id: stable-process
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: data-processor
    namespace: analytics
    revision: 5
    inputs:
      dataset: "{{ inputs.dataset_id }}"
```

### Reference a marketplace flow

```yaml
tasks:
  - id: community-task
    type: dev.bringup.plugin.core.flow.Subflow
    marketplaceListingId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    inputs:
      input_data: "{{ inputs.raw_data }}"
    outputSchema:
      processed:
        type: JSON
```

### Multi-stage pipeline with subflows

```yaml
id: ml-pipeline
namespace: ml
description: End-to-end ML pipeline using modular subflows

inputs:
  - id: dataset_id
    type: STRING
    required: true
  - id: model_type
    type: ENUM
    values: [random_forest, xgboost, neural_net]
    defaults: random_forest
  - id: deploy
    type: BOOLEAN
    defaults: false

tasks:
  - id: prepare-data
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: data-preparation
    namespace: ml
    inputs:
      dataset_id: "{{ inputs.dataset_id }}"
    outputSchema:
      train_path:
        type: STRING
      test_path:
        type: STRING

  - id: train-model
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: model-training
    namespace: ml
    inputs:
      train_data: "{{ task_outputs.prepare-data.train_path }}"
      model_type: "{{ inputs.model_type }}"
    outputSchema:
      model_path:
        type: STRING
      accuracy:
        type: FLOAT

  - id: evaluate
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: model-evaluation
    namespace: ml
    inputs:
      model_path: "{{ task_outputs.train-model.model_path }}"
      test_data: "{{ task_outputs.prepare-data.test_path }}"
    outputSchema:
      metrics:
        type: JSON

  - id: deploy-model
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: model-deployment
    namespace: ml
    run_if: "{{ inputs.deploy }}"
    inputs:
      model_path: "{{ task_outputs.train-model.model_path }}"

outputs:
  - id: model_accuracy
    type: FLOAT
    value: "{{ task_outputs.train-model.accuracy }}"
  - id: evaluation_metrics
    type: JSON
    value: "{{ task_outputs.evaluate.metrics }}"
```

### Using outputs from subflows

```yaml
tasks:
  - id: compute
    type: dev.bringup.plugin.core.flow.Subflow
    flowId: calculator
    namespace: tools
    inputs:
      values: "[1, 2, 3, 4, 5]"
    outputSchema:
      sum:
        type: INT
      average:
        type: FLOAT

  - id: report
    type: dev.bringup.plugin.core.log.Log
    message: "Sum: {{ task_outputs.compute.sum }}, Average: {{ task_outputs.compute.average }}"
```

</details>

---

## Properties

<details>
<summary>View Properties</summary>

### `flowId`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes (if not using `marketplaceListingId`) |
| **Pattern** | `^[a-zA-Z0-9][a-zA-Z0-9._-]*$` |
| **Description** | The ID of the flow to invoke. Must be combined with `namespace`. Mutually exclusive with `marketplaceListingId`. |

### `namespace`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes (if using `flowId`) |
| **Pattern** | `^[a-z0-9][a-z0-9._-]*$` |
| **Description** | The namespace of the flow to invoke. |

### `revision`

| | |
|---|---|
| **Type** | `integer` |
| **Required** | No |
| **Default** | Latest revision |
| **Description** | Specific revision of the flow to invoke. If omitted, the latest revision is used. |

### `marketplaceListingId`

| | |
|---|---|
| **Type** | `string` (UUID) |
| **Required** | Yes (if not using `flowId` + `namespace`) |
| **Description** | UUID of a marketplace listing to invoke. Mutually exclusive with `flowId` + `namespace`. |

### `inputs`

| | |
|---|---|
| **Type** | `Dict[string, Any]` |
| **Required** | No |
| **Default** | `{}` |
| **Description** | Input values to pass to the subflow. Keys must match the subflow's input IDs. Template variables are supported in values. |

### `outputSchema`

| | |
|---|---|
| **Type** | `Dict[string, OutputFieldDef]` |
| **Required** | No |
| **Default** | `{}` |
| **Description** | Schema definition for outputs expected from the subflow. Required to access subflow outputs in downstream tasks via `{{ task_outputs.<task_id>.<key> }}`. |

**OutputFieldDef:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `InputType` | Yes | The data type of the output field |

</details>

---

## Common Task Properties

See [Shell > Common Task Properties](./shell.md#common-task-properties) for `id`, `type`, `description`, `disabled`, `timeout`, `retry`, `allow_failure`, `run_if`, and `worker_group`.

---

## Reference Resolution

When a Subflow task is encountered, the system resolves the reference:

1. **Own flows**: Looked up by `(flowId, namespace, revision)` in the user's flow store
2. **Marketplace flows**: Looked up by `marketplaceListingId` in the marketplace

The resolved flow's metadata is returned in API responses as `subflow_meta`:

```json
{
  "subflow_meta": {
    "resolved": true,
    "flow_id": "data-preparation",
    "namespace": "ml",
    "revision": 3,
    "description": "Prepare dataset for ML training",
    "link": "/flows/ml/data-preparation",
    "expandable": true
  }
}
```

---


## Validation

The Flow Service validates subflow references:

- **Existence check** - The referenced flow must exist and be accessible
- **Circular dependency detection** - Prevents infinite recursion (A -> B -> A)
- **Input compatibility** - Warns if required inputs are missing

Validate all subflow references:
```bash
POST /flows/{namespace}/{flow_id}/validate-subflows
```

---

## Notes

- Either `flowId` + `namespace` **or** `marketplaceListingId` must be provided, not both.
- Subflow inputs are passed as environment variables to the inlined tasks.
- `outputSchema` is required to access subflow outputs in downstream `{{ task_outputs }}` expressions.
- The transpiler resolves subflows asynchronously and caches results to prevent duplicate lookups.
- Circular references are detected during both validation and transpilation.
- Subflow resolution respects multi-tenant isolation - you can only reference your own flows or public marketplace flows.
