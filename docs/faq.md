---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
---

# Frequently Asked Questions

## General

### What is Bagmaster?

Bagmaster is a comprehensive platform for managing, analyzing, and visualizing ROS (Robot Operating System) bag files. It provides a modern web interface for recording, playback, and visualization.

### Which ROS versions are supported?

Bagmaster supports:
- ROS 2: Humble, Iron, Rolling
- ROS 1: Noetic

### Is Bagmaster open source?

Yes! Bagmaster is open source under the MIT license.

## Installation & Setup

### Can I run Bagmaster without Docker?

Yes, see the [manual installation guide](./installation#manual-installation).

### What are the system requirements?

Minimum:
- 4GB RAM
- 2 CPU cores
- 10GB disk space

Recommended:
- 8GB+ RAM
- 4+ CPU cores
- 100GB+ SSD storage

## Features

### Can I visualize bag data in 3D?

Yes, Bagmaster integrates Lichtblick for 3D visualization of point clouds, trajectories, and more.

### Does it support remote storage?

Yes, Bagmaster uses MinIO (S3-compatible) storage and supports remote deployments.

### Can I access recordings programmatically?

Yes, Bagmaster provides a comprehensive REST API. See the [API Reference](./api/index).

## Troubleshooting

### Why can't I see my ROS topics?

Ensure:
1. ROS nodes are running and publishing
2. Topics are being published (check with `ros2 topic list`)
3. Bagmaster can connect to the ROS network

### Recording failed with "disk space" error

Check available disk space with `df -h` and free up space or configure a different storage location.

## Contributing

### How can I contribute?

See our [Contributing Guide](../contributing/overview) for ways to contribute.

### I found a bug, where do I report it?

Create an issue on [GitHub Issues](https://github.com/rahulkatiyar19955/bagmaster/issues).

## More Questions?

- 📖 Check the [documentation](./getting-started)
- 💬 Ask in [GitHub Discussions](https://github.com/rahulkatiyar19955/bagmaster/discussions)
- 📧 Contact the maintainers
