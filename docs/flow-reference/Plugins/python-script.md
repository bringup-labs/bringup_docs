# Python Script

> Execute Python code in an isolated virtual environment with automatic dependency management.

---

import CollapsibleSection from '@site/src/components/CollapsibleSection';

**Plugin:** `python-executor`
**Group:** Scripts

| Task Type | Alias |
|-----------|-------|
| `dev.bringup.plugin.scripts.python.Script` | Script mode |
| `dev.bringup.plugin.scripts.python.Commands` | Commands mode |

---

## Examples

### Basic Python script

```yaml
id: python-hello
namespace: examples
description: Run a simple Python script

tasks:
  - id: hello
    type: dev.bringup.plugin.scripts.python.Script
    script: |
      import platform
      print(f"Hello from Python {platform.python_version()}!")
      print(f"Running on {platform.system()}")
```

<CollapsibleSection title="View More Examples">

### With dependencies

```yaml
id: data-analysis
namespace: analytics
description: Analyze dataset with pandas

inputs:
  - id: csv_path
    type: STRING
    defaults: data/measurements.csv

tasks:
  - id: analyze
    type: dev.bringup.plugin.scripts.python.Script
    dependencies:
      - pandas>=2.0
      - numpy
      - matplotlib
    script: |
      import pandas as pd
      import numpy as np
      import os

      csv_path = os.getenv("CSV_PATH", "data/measurements.csv")
      df = pd.read_csv(csv_path)

      print(f"Rows: {len(df)}")
      print(f"Columns: {list(df.columns)}")
      print(f"Mean values:\n{df.describe()}")
    outputFiles:
      - "*.png"
      - "*.csv"
```

### With input files and environment variables

```yaml
id: config-processor
namespace: tools
description: Process configuration with injected files

tasks:
  - id: process-config
    type: dev.bringup.plugin.scripts.python.Script
    dependencies:
      - pyyaml
      - jsonschema
    envVars:
      CONFIG_MODE: production
      LOG_LEVEL: INFO
    inputFiles:
      config.yaml: |
        database:
          host: db.example.com
          port: 5432
        logging:
          level: INFO
    script: |
      import yaml
      import os
      import json

      mode = os.getenv("CONFIG_MODE")
      print(f"Running in {mode} mode")

      with open("config.yaml") as f:
          config = yaml.safe_load(f)

      print(json.dumps(config, indent=2))
```

### Commands mode (one-liners)

```yaml
tasks:
  - id: quick-check
    type: dev.bringup.plugin.scripts.python.Commands
    commands:
      - "import sys; print(f'Python {sys.version}')"
      - "import json; print(json.dumps({'status': 'ok'}))"
```

### With before commands and custom working directory

```yaml
tasks:
  - id: ml-training
    type: dev.bringup.plugin.scripts.python.Script
    pythonVersion: python3.11
    dependencies:
      - scikit-learn
      - joblib
    beforeCommands:
      - mkdir -p models/
      - mkdir -p logs/
    workingDir: /workspace/ml
    failOnStderr: false
    script: |
      from sklearn.ensemble import RandomForestClassifier
      from sklearn.datasets import make_classification
      import joblib

      X, y = make_classification(n_samples=1000, n_features=20)
      clf = RandomForestClassifier(n_estimators=100)
      clf.fit(X, y)

      score = clf.score(X, y)
      print(f"Training accuracy: {score:.4f}")

      joblib.dump(clf, "models/classifier.pkl")
      print("Model saved to models/classifier.pkl")
    outputFiles:
      - "models/*.pkl"
```

### With structured output

```yaml
id: metric-calculator
namespace: analytics
description: Calculate metrics and expose as outputs

tasks:
  - id: calculate
    type: dev.bringup.plugin.scripts.python.Script
    dependencies:
      - numpy
    script: |
      import numpy as np
      import json

      data = [23.5, 45.2, 67.8, 12.1, 89.3, 34.6]
      result = {
          "mean": float(np.mean(data)),
          "std": float(np.std(data)),
          "count": len(data)
      }
      print(json.dumps(result))
    outputSchema:
      mean:
        type: FLOAT
      std:
        type: FLOAT
      count:
        type: INT

outputs:
  - id: average
    type: FLOAT
    value: "{{ task_outputs.calculate.mean }}"
    description: The calculated mean value
```

</CollapsibleSection>

---

## Properties

<CollapsibleSection title="View Properties">

### `script` *(Required)*

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes (or `commands`) |
| **Description** | Python code to execute. Written to a temporary `.py` file and run inside an isolated virtual environment. |

### `commands`

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | Yes (or `script`) |
| **Description** | List of Python one-liner commands. Each is executed via `python -c`. |

### `dependencies`

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | No |
| **Default** | `[]` |
| **Description** | Python packages to install via `pip` before execution. Supports version specifiers (e.g., `pandas>=2.0`, `numpy==1.24.0`). |

### `pythonVersion`

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Default** | `"python3"` |
| **Description** | Python interpreter to use for creating the virtual environment. Must be available on the worker. |

### `beforeCommands`

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | No |
| **Default** | `[]` |
| **Description** | Shell commands to run before the Python script executes. Useful for creating directories, downloading files, or setting up the environment. |

### `inputFiles`

| | |
|---|---|
| **Type** | `Dict[string, string]` |
| **Required** | No |
| **Default** | `{}` |
| **Description** | Files to create in the working directory before execution. Key is the filename, value is the file content. |

### `outputFiles`

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | No |
| **Default** | `[]` |
| **Description** | Glob patterns for files to archive after execution. |

### `envVars`

| | |
|---|---|
| **Type** | `Dict[string, string]` |
| **Required** | No |
| **Default** | `{}` |
| **Description** | Additional environment variables to set during script execution. |

### `workingDir`

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Default** | Current workspace directory |
| **Description** | Working directory for script execution. |

### `failOnStderr`

| | |
|---|---|
| **Type** | `boolean` |
| **Required** | No |
| **Default** | `false` |
| **Description** | If `true`, the task fails when anything is written to stderr. Useful for strict error checking, but note that many Python libraries write warnings to stderr. |

</CollapsibleSection>

---

## Common Task Properties

See [Shell > Common Task Properties](./shell.md#common-task-properties) for `id`, `type`, `description`, `disabled`, `timeout`, `retry`, `allow_failure`, `run_if`, and `worker_group`.

---


## Notes

- Each Python task creates its own isolated virtual environment, ensuring dependency isolation between tasks.
- The virtual environment is cleaned up after execution to avoid disk space issues.
- Template variables in the `script` field are resolved before execution.
- For large dependencies, consider using a Docker task with a pre-built image instead.
