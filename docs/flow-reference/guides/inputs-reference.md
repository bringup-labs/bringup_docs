# Inputs Reference

> Complete reference for all 13 input types available in Bagmaster Flows.

---

## Overview

Inputs define the parameters users provide when executing a flow. Each input has a type, validation rules, and optional constraints.

```yaml
inputs:
  - id: my_input          # Unique identifier (required)
    type: STRING           # One of 13 types (required)
    description: "..."     # Human-readable description
    display_name: "..."    # UI-friendly label
    required: true         # Whether input must be provided (default: true)
    defaults: "..."        # Default value if not provided
    prefill: "..."         # Suggested value shown in UI
    depends_on:            # Conditional visibility
      inputs:
        - other_input
      condition: "{{ inputs.other_input == 'advanced' }}"
```

---

## Input Types

### STRING

Plain text input with optional length and pattern constraints.

```yaml
- id: project_name
  type: STRING
  required: true
  description: Name of the project
  min_length: 3
  max_length: 64
  pattern: "^[a-zA-Z][a-zA-Z0-9_-]*$"
```

| Constraint | Type | Description |
|-----------|------|-------------|
| `min_length` | `integer` | Minimum string length |
| `max_length` | `integer` | Maximum string length |
| `pattern` | `string` | Regex pattern the value must match |

---

### INT

Integer number input with optional range constraints.

```yaml
- id: batch_size
  type: INT
  defaults: 32
  min: 1
  max: 1024
  description: Number of items per batch
```

| Constraint | Type | Description |
|-----------|------|-------------|
| `min` | `integer` | Minimum allowed value |
| `max` | `integer` | Maximum allowed value |

---

### FLOAT

Floating-point number input with optional range constraints.

```yaml
- id: learning_rate
  type: FLOAT
  defaults: 0.001
  min: 0.0001
  max: 1.0
  description: Model learning rate
```

| Constraint | Type | Description |
|-----------|------|-------------|
| `min` | `float` | Minimum allowed value |
| `max` | `float` | Maximum allowed value |

---

### BOOLEAN

True/false toggle.

```yaml
- id: dry_run
  type: BOOLEAN
  defaults: false
  description: Run without making changes
```

Accepted values: `true`, `false`

---

### DATE

ISO 8601 date (YYYY-MM-DD).

```yaml
- id: start_date
  type: DATE
  defaults: "2024-01-01"
  description: Start date for data range
```

Format: `YYYY-MM-DD` (e.g., `2024-03-15`)

---

### DATETIME

ISO 8601 datetime.

```yaml
- id: scheduled_at
  type: DATETIME
  description: When to schedule the execution
```

Format: `YYYY-MM-DDTHH:MM:SS` (e.g., `2024-03-15T14:30:00`)

---

### DURATION

Time duration string.

```yaml
- id: timeout
  type: DURATION
  defaults: "300s"
  description: Maximum execution time
```

Format: `<number><unit>` where unit is `s` (seconds), `m` (minutes), `h` (hours)

---

### FILE

File upload input with size and extension constraints.

```yaml
- id: config_file
  type: FILE
  required: true
  description: Configuration file to upload
  max_size: "10MB"
  allowed_extensions:
    - yaml
    - yml
    - json
```

| Constraint | Type | Description |
|-----------|------|-------------|
| `max_size` | `string` | Maximum file size (e.g., `"10MB"`, `"1GB"`) |
| `allowed_extensions` | `List[string]` | Permitted file extensions |

---

### JSON

Structured JSON data input with optional schema validation.

```yaml
- id: config
  type: JSON
  defaults: '{"mode": "standard", "workers": 4}'
  description: JSON configuration object
  schema:
    type: object
    properties:
      mode:
        type: string
        enum: [standard, fast, precise]
      workers:
        type: integer
        minimum: 1
    required:
      - mode
```

| Constraint | Type | Description |
|-----------|------|-------------|
| `schema` | `object` | JSON Schema for validation |

---

### SECRET

Sensitive value that is masked in logs and UI.

```yaml
- id: api_key
  type: SECRET
  required: true
  description: API authentication key
```

Secrets are:
- Masked in execution logs (displayed as `****`)
- Not displayed in the UI after entry
- Stored securely and passed as environment variables

---

### URI

URL/URI input with format validation.

```yaml
- id: webhook_url
  type: URI
  required: true
  description: Webhook endpoint URL
```

Validates that the value is a properly formatted URI.

---

### ENUM

Single-select from a list of allowed values.

```yaml
- id: environment
  type: ENUM
  values:
    - development
    - staging
    - production
  defaults: development
  description: Target deployment environment
```

| Constraint | Type | Description |
|-----------|------|-------------|
| `values` | `List[string]` | **Required.** Allowed values to choose from |

---

### MULTISELECT

Multiple selections from a list of allowed values.

```yaml
- id: features
  type: MULTISELECT
  values:
    - logging
    - metrics
    - tracing
    - alerting
  defaults:
    - logging
    - metrics
  description: Features to enable
```

| Constraint | Type | Description |
|-----------|------|-------------|
| `values` | `List[string]` | **Required.** Available values to choose from |

---

## Common Properties

These properties are available on all input types:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | - | **Required.** Unique identifier. Pattern: `^[a-zA-Z0-9][.a-zA-Z0-9_-]*$` |
| `type` | `InputType` | - | **Required.** One of the 13 types above. |
| `description` | `string` | `null` | Human-readable description shown in the UI. |
| `display_name` | `string` | `null` | UI-friendly label. If omitted, `id` is used. |
| `required` | `boolean` | `true` | Whether the input must be provided. |
| `defaults` | `Any` | `null` | Default value used when input is not provided. |
| `prefill` | `Any` | `null` | Suggested value shown in the UI form. |
| `depends_on` | `DependsOn` | `null` | Conditional visibility rules. |

---

## Conditional Inputs (depends_on)

Inputs can be shown or hidden based on other input values:

```yaml
inputs:
  - id: deploy_target
    type: ENUM
    values: [local, cloud, hybrid]
    defaults: local

  - id: cloud_region
    type: ENUM
    values: [us-east-1, eu-west-1, ap-south-1]
    depends_on:
      inputs:
        - deploy_target
      condition: "{{ inputs.deploy_target == 'cloud' or inputs.deploy_target == 'hybrid' }}"

  - id: local_path
    type: STRING
    depends_on:
      inputs:
        - deploy_target
      condition: "{{ inputs.deploy_target == 'local' }}"
```

---

## Template Expression Usage

Inputs are referenced in tasks using template expressions:

```yaml
inputs:
  - id: user_name
    type: STRING

tasks:
  - id: greet
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Hello {{ inputs.user_name }}"
      # Transpiled to: echo "Hello ${USER_NAME}"
```

The transpiler converts `{{ inputs.<id> }}` to `${<UPPER_SNAKE_CASE_ID>}`.

---

## Validation API

### Get Input Schema

Returns a JSON Schema for the flow's inputs:

```bash
GET /flows/{namespace}/{flow_id}/schema
```

**Response:**
```json
{
  "type": "object",
  "properties": {
    "dataset_name": {
      "type": "string",
      "minLength": 3,
      "maxLength": 64,
      "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$"
    },
    "batch_size": {
      "type": "integer",
      "default": 32,
      "minimum": 1,
      "maximum": 1024
    }
  },
  "required": ["dataset_name"]
}
```

### Validate Inputs

```bash
POST /flows/{namespace}/{flow_id}/validate-inputs
Content-Type: application/json

{
  "inputs": {
    "dataset_name": "sensor-data",
    "batch_size": 64
  }
}
```

**Success Response:**
```json
{
  "valid": true,
  "errors": []
}
```

**Error Response:**
```json
{
  "valid": false,
  "errors": [
    {
      "input_id": "dataset_name",
      "message": "Value does not match pattern: ^[a-zA-Z][a-zA-Z0-9_-]*$",
      "provided_value": "123-invalid"
    }
  ]
}
```

---

## Complete Example: All Input Types

```yaml
id: all-input-types
namespace: examples
description: Demonstrates all 13 input types

inputs:
  - id: name
    type: STRING
    defaults: "test-user"
    min_length: 1
    max_length: 100

  - id: count
    type: INT
    defaults: 10
    min: 1
    max: 1000

  - id: threshold
    type: FLOAT
    defaults: 0.95
    min: 0.0
    max: 1.0

  - id: enabled
    type: BOOLEAN
    defaults: true

  - id: start_date
    type: DATE
    defaults: "2024-01-01"

  - id: scheduled
    type: DATETIME

  - id: max_duration
    type: DURATION
    defaults: "60s"

  - id: upload
    type: FILE
    required: false
    max_size: "5MB"
    allowed_extensions: [csv, json]

  - id: extra_config
    type: JSON
    defaults: '{}'

  - id: api_key
    type: SECRET
    required: false

  - id: callback_url
    type: URI
    required: false

  - id: priority
    type: ENUM
    values: [low, medium, high, critical]
    defaults: medium

  - id: tags
    type: MULTISELECT
    values: [urgent, reviewed, tested, approved]

tasks:
  - id: show-inputs
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - echo "Name: {{ inputs.name }}"
      - echo "Count: {{ inputs.count }}"
      - echo "Threshold: {{ inputs.threshold }}"
      - echo "Enabled: {{ inputs.enabled }}"
      - echo "Priority: {{ inputs.priority }}"
```
