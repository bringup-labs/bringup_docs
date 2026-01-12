---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

Common issues and their solutions.

## Installation Issues

### Docker Container Won't Start

**Problem**: Docker containers fail to start

**Solution**:
1. Check Docker is running: `docker ps`
2. Verify ports are available: `lsof -i :3000`
3. Check logs: `docker-compose logs`

### Dependencies Installation Fails

**Problem**: `yarn install` or `pip install` fails

**Solution**:
1. Ensure correct Node.js/Python version
2. Clear cache: `yarn cache clean` or `pip cache purge`
3. Try with `--force` flag

## Runtime Issues

### Recording Won't Start

**Problem**: Unable to start recording

**Possible causes**:
- No ROS topics being published
- Insufficient disk space
- Permission issues

**Solutions**:
1. Check ROS topics: `ros2 topic list`
2. Verify disk space: `df -h`
3. Check permissions on storage directory

### Playback Issues

**Problem**: Bag file won't play

**Solution**:
1. Verify bag file integrity
2. Check ROS version compatibility
3. Review error logs in browser console

## Performance Issues

### Slow Website

**Solutions**:
- Clear browser cache
- Check network connection
- Verify server resources

### Large Bag Files Load Slowly

**Solutions**:
- Use compression (LZ4 or ZSTD)
- Split large bags into smaller files
- Increase server memory allocation

## Getting More Help

If your issue isn't listed here:

1. Search [GitHub Issues](https://github.com/rahulkatiyar19955/bagmaster/issues)
2. Ask in [Discussions](https://github.com/rahulkatiyar19955/bagmaster/discussions)
3. Create a new issue with details

Include:
- Operating system and version
- ROS version
- Bagmaster version
- Error messages
- Steps to reproduce
