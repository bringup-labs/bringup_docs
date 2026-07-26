---
title: HTTP Request
description: Make HTTP and REST API calls from a flow, with headers, authentication, and response handling.
---

Make HTTP/REST API calls using curl within a flow.

---

import CollapsibleSection from '@site/src/components/CollapsibleSection';

**Plugin:** `http`
**Group:** Core

| Task Type | Alias |
|-----------|-------|
| `dev.bringup.plugin.core.http.Request` | HTTP Request |
| `dev.bringup.plugin.core.http.Download` | File Download |

---

## Examples

### Simple GET request

```yaml
id: health-check
namespace: monitoring
description: Check if an API endpoint is healthy

tasks:
  - id: check-api
    type: dev.bringup.plugin.core.http.Request
    url: https://api.example.com/health
    method: GET
```

<CollapsibleSection title="View More Examples">

### POST request with JSON body

```yaml
id: trigger-webhook
namespace: integrations
description: Send a webhook notification

inputs:
  - id: webhook_url
    type: URI
    required: true
  - id: message
    type: STRING
    defaults: "Build completed successfully"

tasks:
  - id: notify
    type: dev.bringup.plugin.core.http.Request
    url: "{{ inputs.webhook_url }}"
    method: POST
    headers:
      Content-Type: application/json
    body: |
      {
        "text": "{{ inputs.message }}",
        "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
      }
```

### With authentication headers

```yaml
tasks:
  - id: fetch-data
    type: dev.bringup.plugin.core.http.Request
    url: https://api.example.com/v1/datasets
    method: GET
    headers:
      Authorization: "Bearer {{ inputs.api_token }}"
      Accept: application/json
```

### Download a file

```yaml
tasks:
  - id: download-model
    type: dev.bringup.plugin.core.http.Download
    url: https://storage.example.com/models/latest.tar.gz
    outputPath: ./models/latest.tar.gz

  - id: extract
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - tar -xzf ./models/latest.tar.gz -C ./models/
```

### Chaining API calls

```yaml
id: api-workflow
namespace: integrations
description: Fetch data, process it, then post results

tasks:
  - id: fetch
    type: dev.bringup.plugin.core.http.Request
    url: https://api.example.com/v1/jobs
    method: POST
    headers:
      Content-Type: application/json
    body: '{"type": "analysis", "dataset": "{{ inputs.dataset_id }}"}'

  - id: wait-for-result
    type: dev.bringup.plugin.core.shell.Shell
    commands:
      - sleep 10
      - echo "Waiting for processing to complete..."

  - id: get-result
    type: dev.bringup.plugin.core.http.Request
    url: https://api.example.com/v1/jobs/{{ inputs.job_id }}/result
    method: GET
    headers:
      Accept: application/json
```

</CollapsibleSection>

---

## Properties

<CollapsibleSection title="View Properties">

### `url` *(Required)*

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |
| **Description** | The URL to send the request to. Template variables are supported. |

### `method`

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Default** | `"GET"` |
| **Possible Values** | `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS` |
| **Description** | HTTP method for the request. |

### `headers`

| | |
|---|---|
| **Type** | `Dict[string, string]` |
| **Required** | No |
| **Default** | `{}` |
| **Description** | HTTP headers to include in the request. Template variables are supported in values. |

### `body`

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Default** | `null` |
| **Description** | Request body content. Template variables are supported. Typically used with POST/PUT/PATCH methods. |

### `outputPath`

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Default** | `null` |
| **Description** | File path to save the response body. Used primarily with the `Download` task type. |

</CollapsibleSection>

---

## Common Task Properties

See [Shell > Common Task Properties](./shell.md#common-task-properties) for `id`, `type`, `description`, `disabled`, `timeout`, `retry`, `allow_failure`, `run_if`, and `worker_group`.

---


## Notes

- HTTP requests are executed using `curl` on the Jenkins worker.
- Response bodies are printed to stdout by default. Use `outputPath` to save to a file.
- For authentication tokens, consider using the `SECRET` input type to avoid exposing credentials in logs.
- The HTTP plugin does not currently support cookie handling or session management.
- Template variables in URLs, headers, and body are resolved before the curl command is generated.
