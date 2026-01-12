---
id: recording-bags
title: Recording ROS Bags
sidebar_label: Recording Bags
---

# Recording ROS Bags

This guide covers how to record ROS bag files using Bagmaster.

## Overview

Bagmaster provides multiple ways to record bag files:

- **Web Interface**: Start and stop recording from the dashboard
- **API**: Programmatically control recording via REST API
- **CLI**: Command-line tools for automation

## Recording from Web Interface

### Starting a Recording

1. Navigate to the Bagmaster dashboard
2. Click **"New Recording"** button
3. Configure recording settings:
   - **Name**: Give your recording a meaningful name
   - **Topics**: Select topics to record (or record all)
   - **Compression**: Choose compression format (LZ4, ZSTD, or none)
   - **Split Size**: Set maximum bag file size before splitting

4. Click **"Start Recording"**

### Stopping a Recording

- Click the **"Stop"** button on the active recording card
- Recordings automatically stop when disk space is low

## Recording via API

```python
import requests

# Start recording
response = requests.post(
    'http://localhost:8000/api/recordings',
    json={
        'name': 'test_recording',
        'topics': ['/camera/image_raw', '/imu/data'],
        'compression': 'lz4',
        'split_size_mb': 1024
    }
)

recording_id = response.json()['id']

# Stop recording
requests.post(f'http://localhost:8000/api/recordings/{recording_id}/stop')
```

## Advanced Options

### Topic Filtering

Record only specific topics using regex patterns:

```bash
# Record all camera topics
--topics "^/camera/.*"

# Exclude diagnostics
--exclude "^/diagnostics.*"
```

### Compression Settings

Choose the right compression for your use case:

- **None**: Fastest write speed, larger file size
- **LZ4**: Good balance of speed and compression
- **ZSTD**: Better compression, slower write speed

## Best Practices

✅ **Use meaningful names** with timestamps and descriptions

✅ **Set appropriate split sizes** (500MB - 2GB recommended)

✅ **Monitor disk space** before starting long recordings

✅ **Choose compression** based on network bandwidth needs

❌ **Avoid recording all topics** unless necessary

❌ **Don't use too small split sizes** (creates many files)

## Troubleshooting

### Recording Won't Start

- Check that ROS topics are being published
- Verify sufficient disk space
- Ensure proper permissions on storage directory

### Poor Performance

- Reduce topic selection
- Increase split size
- Use LZ4 compression instead of ZSTD
- Check disk I/O performance

## Next Steps

- Learn about [playback](./playing-bags)
- Explore [visualization](./visualization) features
- Check the [API Reference](../api/bag-writer)
