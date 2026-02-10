---
id: data-flow
title: Data Flow
sidebar_label: Data Flow
---

# Data Flow

This page traces the key data flows through the Bagmaster platform — from user authentication through bag file ingestion to pipeline execution.

---

## Authentication Flow

Every interaction with Bagmaster begins with authentication. The platform uses **OIDC with PKCE** for secure, token-based single sign-on.

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant KC as Keycloak
    participant GW as API Gateway
    participant SVC as Backend Service

    U->>FE: Access application
    FE->>KC: Redirect to login (PKCE)
    KC-->>U: Login page
    U->>KC: Credentials
    KC-->>FE: Authorization code
    FE->>KC: Exchange code for tokens
    KC-->>FE: Access + Refresh tokens

    Note over FE: Tokens stored in HttpOnly cookies

    FE->>GW: API request + Bearer token
    GW->>GW: Validate JWT (OIDC plugin)
    GW->>GW: Inject x-oidc-sub, x-oidc-email headers
    GW->>SVC: Forward request + identity headers
    SVC-->>GW: Response
    GW-->>FE: Response
```

:::tip Token Security
Access tokens are short-lived and stored in HttpOnly cookies — never accessible to client-side JavaScript. The frontend automatically refreshes tokens before expiry with a 30-second buffer for clock skew.
:::

---

## Multi-Tenant Identity Propagation

Once authenticated, tenant context flows through every layer of the system via HTTP headers.

```mermaid
graph LR
    subgraph Headers["Identity Headers"]
        H1["x-oidc-sub<br/><small>User ID</small>"]
        H2["x-oidc-email<br/><small>User Email</small>"]
        H3["x-oidc-org-id<br/><small>Organization</small>"]
        H4["x-oidc-team-id<br/><small>Team</small>"]
        H5["x-oidc-role<br/><small>System Role</small>"]
    end

    GW["API Gateway"] --> Headers
    Headers --> SVC["Service Layer"]
    SVC --> DB["Database Query<br/><small>WHERE tenant_id = ...</small>"]

    classDef header fill:#7c3aed,stroke:#6d28d9,color:#fff
    classDef infra fill:#0891b2,stroke:#0e7490,color:#fff
    classDef data fill:#dc2626,stroke:#b91c1c,color:#fff

    class H1,H2,H3,H4,H5 header
    class GW,SVC infra
    class DB data
```

Every database query is scoped by the user's tenant context. This ensures **complete data isolation** between organizations — one tenant can never access another tenant's data, even through direct API calls.

---

## Rosbag Ingestion Flow

When a user uploads a ROS bag file, the data flows through multiple services for storage, metadata extraction, and indexing.

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant STORE as Storage Service
    participant S3 as MinIO / S3
    participant ROSBAG as Rosbag Service
    participant DB as PostgreSQL

    U->>FE: Select bag file
    FE->>STORE: Upload file (multipart)
    STORE->>S3: Store object with ULID key
    S3-->>STORE: Upload confirmation
    STORE->>DB: Record upload metadata
    STORE-->>FE: ULID file key

    FE->>ROSBAG: Create rosbag record
    ROSBAG->>DB: Store metadata (topics, duration, etc.)
    ROSBAG-->>FE: Rosbag ID

    Note over FE: Rosbag status: uploading → processing → ready
```

**Key design decisions:**
- **ULID-based keys** ensure files are chronologically sortable and globally unique
- **Tenant-prefixed paths** in S3 (`org_id/team_id/user_id/`) enforce isolation at the storage layer
- **Metadata and files are decoupled** — the Rosbag Service manages metadata while the Storage Service manages binary data

---

## Pipeline Execution Flow

The most complex data flow in Bagmaster is pipeline execution, which spans four services.

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant FLOW as Flow Service
    participant TRANS as Transpiler
    participant ACT as Action Service
    participant JK as Jenkins

    U->>FE: Define flow (YAML editor)
    FE->>FLOW: POST /flows (create)
    FLOW-->>FE: Flow with revision

    U->>FE: Execute flow
    FE->>FLOW: GET /flows/{ns}/{id}
    FLOW-->>FE: Flow definition

    FE->>TRANS: POST /transpiler/convert/jenkins
    TRANS-->>FE: Jenkinsfile + validation

    FE->>ACT: POST /actions/executions/{ns}/{id}
    ACT->>JK: Create/update pipeline job
    ACT->>JK: Trigger build with parameters
    JK-->>ACT: Queue ID
    ACT-->>FE: Execution ID (QUEUED)

    loop Status Polling
        FE->>ACT: GET /actions/executions/{id}
        ACT->>JK: Check build status
        JK-->>ACT: Build state + progress
        ACT-->>FE: Execution state
    end

    JK->>ACT: Webhook (build complete)
    ACT->>ACT: Update execution state

    U->>FE: View logs
    FE->>ACT: GET /actions/executions/{id}/logs
    ACT->>JK: Fetch console output
    JK-->>ACT: Build logs
    ACT-->>FE: Parsed logs with timestamps
```

**Execution states:** `CREATED` → `QUEUED` → `RUNNING` → `SUCCESS` | `WARNING` | `FAILED` | `KILLED`

:::note Tenant Isolation in Jenkins
Each organization gets its own Jenkins folder (`tenant-{org_id}`). Pipeline jobs are scoped to the tenant folder, ensuring complete execution isolation between organizations.
:::

---

## Interactive Notebook Flow

Users can launch isolated Jupyter environments for interactive data exploration.

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant ACT as Action Service
    participant DOCK as Docker Runtime
    participant JUP as Jupyter Server
    participant S3 as MinIO

    U->>FE: Create notebook session
    FE->>ACT: POST /actions/notebooks
    ACT->>DOCK: Spawn container (CPU/memory limits)
    DOCK->>JUP: Start Jupyter server
    JUP-->>ACT: Server ready + URL
    ACT-->>FE: Notebook URL + session ID

    U->>FE: Open notebook
    FE->>JUP: WebSocket connection (proxied)
    U->>JUP: Interactive coding

    loop Activity Monitoring
        ACT->>JUP: Check kernel activity
        JUP-->>ACT: Last activity timestamp
    end

    Note over ACT: TTL expired & idle
    ACT->>DOCK: Stop and remove container
```

**Resource governance:**
- Default limits: 500 MHz CPU, 512 MB memory
- TTL-based cleanup: Sessions expire after configurable idle timeout (default: 1 hour)
- Users can upload notebooks to persistent MinIO storage before session cleanup

---

## File Download Flow

The Storage Service optimizes downloads by redirecting clients directly to S3 via presigned URLs.

```mermaid
graph LR
    FE["Frontend"] -->|1. Request download| STORE["Storage Service"]
    STORE -->|2. Generate presigned URL| S3["MinIO / S3"]
    STORE -->|3. Return presigned URL| FE
    FE -->|4. Direct download| S3

    classDef svc fill:#059669,stroke:#047857,color:#fff
    classDef data fill:#dc2626,stroke:#b91c1c,color:#fff
    classDef fe fill:#4f46e5,stroke:#3730a3,color:#fff

    class FE fe
    class STORE svc
    class S3 data
```

This pattern offloads bandwidth from the API layer, enabling efficient download of large bag files (often several GB) without proxying through application servers.
