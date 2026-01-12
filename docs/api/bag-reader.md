---
id: bag-reader
title: Bag Reader API
sidebar_label: Bag Reader
---

# Bag Reader API

APIs for reading bag files and retrieving messages.

## List Recordings

Get a list of all recordings.

**Endpoint**: `GET /api/recordings`

**Response**:
```json
{
  "recordings": [
    {
      "id": "rec_123",
      "name": "test_recording",
      "created_at": "2026-01-12T08:00:00Z",
      "duration": 125.5,
      "size_bytes": 1073741824,
      "topics": 45,
      "messages": 12500
    }
  ]
}
```

## Get Recording Details

**Endpoint**: `GET /api/recordings/{id}`

## Get Messages

Retrieve messages from a recording.

**Endpoint**: `GET /api/recordings/{id}/messages`

**Query Parameters**:
- `topic`: Filter by topic (optional)
- `start_time`: Start time in seconds (optional)
- `end_time`: End time in seconds (optional)
- `limit`: Maximum messages to return (default: 100)

For complete API documentation, visit the [interactive API docs](http://localhost:8000/api/docs).
