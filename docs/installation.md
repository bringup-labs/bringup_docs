---
id: installation
title: Installation
sidebar_label: Installation
---

# Installation

This guide covers different methods to install and set up Bagmaster.

## Docker Installation (Recommended)

The easiest way to get started with Bagmaster is using Docker and Docker Compose.

### Prerequisites

- Docker Engine 20.10 or later
- Docker Compose 2.0 or later

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/rahulkatiyar19955/bagmaster.git
cd bagmaster
```

2. **Start the services:**

```bash
docker-compose up -d
```

3. **Verify the installation:**

Visit `http://localhost:3000` in your web browser. You should see the Bagmaster dashboard.

## Manual Installation

For development or custom deployments, you can install Bagmaster manually.

### Prerequisites

- ROS 2 (Humble, Iron, or Rolling) or ROS 1 (Noetic)  
- Python 3.8 or later
- Node.js 18 or later
- PostgreSQL 14 or later (for metadata storage)
- MinIO or S3-compatible storage (for bag file storage)

### Backend Setup

1. **Install Python dependencies:**

```bash
cd backend
pip install -r requirements.txt
```

2. **Configure environment variables:**

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Run database migrations:**

```bash
alembic upgrade head
```

4. **Start the backend server:**

```bash
uvicorn app.main:app --reload
```

### Frontend Setup

1. **Install Node.js dependencies:**

```bash
cd frontend
npm install
```

2. **Configure environment variables:**

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. **Start the development server:**

```bash
npm run dev
```

## Verifying Installation

Once installed, verify that Bagmaster is working correctly:

1. Access the web interface at `http://localhost:3000`
2. Check that all services are running:

```bash
docker-compose ps
```

3. Test recording a bag file (see [Recording Bags Guide](./guides/recording-bags))

## Next Steps

- Configure your [storage backend](./guides/configuration)
- Set up [authentication](./guides/authentication) (for production)
- Learn about [recording bags](./guides/recording-bags)

## Troubleshooting

If you encounter issues during installation, see the [Troubleshooting Guide](./troubleshooting) or [open an issue](https://github.com/rahulkatiyar19955/bagmaster/issues) on GitHub.
