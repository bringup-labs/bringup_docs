---
id: bag-writer
title: Bag Writer API
sidebar_label: Bag Writer
---

# Bag Writer API

APIs for creating recordings and writing messages.

## Start Recording

**Endpoint**: `POST /api/recordings`

**Request Body**:
```json
{
  "name": "my_recording",
  "topics": ["/camera/image_raw", "/imu/data"],
  "compression": "lz4",
  "split_size_mb": 1024
}
```

## Stop Recording

**Endpoint**: `POST /api/recordings/{id}/stop`

For complete API documentation, visit the [interactive API docs](http://localhost:8000/api/docs).
