---
id: index
title: API Reference
sidebar_label: Overview
---

# Bagmaster API Reference

Complete API documentation for integrating Bagmaster into your applications.

## REST API

Bagmaster provides a comprehensive REST API for all operations.

**Base URL**: `http://localhost:8000/api`

## API Sections

### [Bag Reader API](./bag-reader)
Read and query bag file contents, retrieve messages, and access metadata.

### [Bag Writer API](./bag-writer)
Create and manage recording sessions, write messages to bags.

### [Message Types](./message-types)
Information about ROS message types and serialization.

### [Utilities](./utilities)
Helper functions and utility endpoints.

## Authentication

API requests require authentication in production environments:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/recordings
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- **100 requests/minute** for authenticated users
- **20 requests/minute** for unauthenticated requests

## Error Handling

The API uses standard HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

Error responses include detailed messages:

```json
{
  "error": "RecordingNotFound",
  "message": "Recording with id 'abc123' not found",
  "status": 404
}
```

## Client Libraries

### Python

```bash
pip install bagmaster-client
```

```python
from bagmaster import Client

client = Client('http://localhost:8000')
recordings = client.recordings.list()
```

### JavaScript/TypeScript

```bash
npm install @bagmaster/client
```

```typescript
import { BagmasterClient } from '@bagmaster/client';

const client = new BagmasterClient('http://localhost:8000');
const recordings = await client.recordings.list();
```

## Next Steps

- Explore specific [API endpoints](./bag-reader)
- Check the [guides](../guides/index) for usage examples
- View the [OpenAPI specification](http://localhost:8000/api/docs)
