# Python Script

> Execute Python code in an isolated virtual environment with automatic dependency management.

---

**Plugin:** `python-executor`
**Group:** Scripts

| Task Type | Alias |
|-----------|-------|
| `dev.bringup.plugin.scripts.python.Script` | Script mode |
| `dev.bringup.plugin.scripts.python.Commands` | Commands mode |

---

## Usage

```yaml
type: dev.bringup.plugin.scripts.python.Script
```

---

## Examples


<details>
<summary>Basic Python script</summary>
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
</details>


<details>
<summary>With dependencies</summary>
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
</details>


<details>
<summary>With input files and environment variables</summary>
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
</details>


<details>
<summary>Commands mode (one-liners)</summary>
```yaml
tasks:
  - id: quick-check
    type: dev.bringup.plugin.scripts.python.Commands
    commands:
      - "import sys; print(f'Python {sys.version}')"
      - "import json; print(json.dumps({'status': 'ok'}))"
```
</details>


<details>
<summary>With before commands and custom working directory</summary>
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
</details>


<details>
<summary>With structured output</summary>
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

---
</details>

## Properties


<details>
<summary>`script` *(Required)*</summary>

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes (or `commands`) |
| **Description** | Python code to execute. Written to a temporary `.py` file and run inside an isolated virtual environment. |

</details>


<details>
<summary>`commands`</summary>

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | Yes (or `script`) |
| **Description** | List of Python one-liner commands. Each is executed via `python -c`. |

</details>


<details>
<summary>`dependencies`</summary>

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | No |
| **Default** | `[]` |
| **Description** | Python packages to install via `pip` before execution. Supports version specifiers (e.g., `pandas>=2.0`, `numpy==1.24.0`). |

</details>


<details>
<summary>`pythonVersion`</summary>

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Default** | `"python3"` |
| **Description** | Python interpreter to use for creating the virtual environment. Must be available on the worker. |

</details>


<details>
<summary>`beforeCommands`</summary>

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | No |
| **Default** | `[]` |
| **Description** | Shell commands to run before the Python script executes. Useful for creating directories, downloading files, or setting up the environment. |

</details>


<details>
<summary>`inputFiles`</summary>

| | |
|---|---|
| **Type** | `Dict[string, string]` |
| **Required** | No |
| **Default** | `{}` |
| **Description** | Files to create in the working directory before execution. Key is the filename, value is the file content. |

</details>


<details>
<summary>`outputFiles`</summary>

| | |
|---|---|
| **Type** | `List[string]` |
| **Required** | No |
| **Default** | `[]` |
| **Description** | Glob patterns for files to archive after execution. |

</details>


<details>
<summary>`envVars`</summary>

| | |
|---|---|
| **Type** | `Dict[string, string]` |
| **Required** | No |
| **Default** | `{}` |
| **Description** | Additional environment variables to set during script execution. |

</details>


<details>
<summary>`workingDir`</summary>

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Default** | Current workspace directory |
| **Description** | Working directory for script execution. |

</details>


<details>
<summary>`failOnStderr`</summary>

| | |
|---|---|
| **Type** | `boolean` |
| **Required** | No |
| **Default** | `false` |
| **Description** | If `true`, the task fails when anything is written to stderr. Useful for strict error checking, but note that many Python libraries write warnings to stderr. |

---

</details>

## Common Task Properties

See [Shell > Common Task Properties](./shell.md#common-task-properties) for `id`, `type`, `description`, `disabled`, `timeout`, `retry`, `allow_failure`, `run_if`, and `worker_group`.

---


## Notes

- Each Python task creates its own isolated virtual environment, ensuring dependency isolation between tasks.
- The virtual environment is cleaned up after execution to avoid disk space issues.
- Template variables in the `script` field are resolved before execution.
- For large dependencies, consider using a Docker task with a pre-built image instead.
