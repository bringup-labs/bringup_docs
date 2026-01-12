---
id: playing-bags
title: Playing ROS Bags
sidebar_label: Playing Bags
---

# Playing ROS Bags

Learn how to play back recorded bag files with Bagmaster.

## Overview

Bagmaster provides flexible playback controls for your recorded bag files.

## Basic Playback

### From Web Interface

1. Navigate to **"Recordings"** page
2. Find your bag file
3. Click **"Play"** button
4. Use playback controls:
   - ⏯️ Play/Pause
   - ⏩ Speed control (0.1x - 10x)
   - ⏮️ Skip backward/forward
   - 🔁 Loop playback

### Via API

```python
import requests

# Start playback
response = requests.post(
    f'http://localhost:8000/api/recordings/{recording_id}/play',
    json={
        'rate': 1.0,  # Playback speed
        'loop': False,
        'topics': ['/camera/image_raw']  # Optional topic filter
    }
)
```

## Playback Options

### Speed Control

Adjust playback rate to:
- **Slow motion** (0.1x - 0.9x): Detailed analysis
- **Real-time** (1.0x): Original recording speed
- **Fast forward** (1.1x - 10x): Quick review

### Topic Filtering

Play only specific topics for focused analysis.

### Time Range Selection

Select specific time ranges to play:

```python
requests.post(
    f'http://localhost:8000/api/recordings/{recording_id}/play',
    json={
        'start_time': 10.5,  # seconds from start
        'end_time': 30.0
    }
)
```

## Next Steps

- Explore [visualization](./visualization) during playback
- Learn about [data extraction](./data-extraction)
