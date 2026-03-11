---
id: getting-started
title: Getting Started with Bagmaster
sidebar_label: Getting Started
slug: /
---

# Getting Started with Bagmaster

Welcome to Bagmaster! This guide will help you get up and running quickly with the ROS bag management and visualization platform.

## What is Bagmaster?

Bagmaster is a comprehensive platform for managing, analyzing, and visualizing ROS (Robot Operating System) bag files. It provides:

- **Efficient Bag Management**: Record, organize, and manage your ROS bag files
- **Powerful Visualization**: Visualize sensor data, trajectories, and more
- **Data Extraction**: Extract and analyze data from bag files
- **Web-Based Interface**: Modern, responsive web interface for easy access
- **API Support**: Programmatic access to all features

## Quick Start

### Prerequisites

Before you begin, ensure you have:

- ROS 2 (Humble or later) or ROS 1 (Noetic)
- Python 3.8 or later
- Docker (for containerized deployment)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

The quickest way to get started is using Docker:

```bash
# Clone the repository
git clone https://github.com/rahulkatiyar19955/bagmaster.git
cd bagmaster

# Start the services
docker-compose up -d
```

Visit `http://localhost:3000` to access the Bagmaster dashboard.

For other installation methods, see the [Installation Guide](./installation).

## Next Steps

- 📚 Read the [Installation Guide](./installation) for detailed setup instructions
- 🎓 Follow the [Recording Bags Guide](./guides/recording-bags) to start recording
- 🎨 Learn about [Visualization](./guides/visualization) features
- 🔍 Explore the [API Reference](./api/index) for programmatic access

## Getting Help

- 💬 Join our [community discussions](https://github.com/rahulkatiyar19955/bagmaster/discussions)
- 🐛 Report issues on [GitHub](https://github.com/rahulkatiyar19955/bagmaster/issues)
- 📖 Check the [FAQ](./faq) for common questions

## Contributing

Bagmaster is open source and welcomes contributions! See our [Contributing Guide](../contributing/overview) to get started.
