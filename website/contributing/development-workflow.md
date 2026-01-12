---
id: development-workflow
title: Development Workflow
sidebar_label: Development Workflow
---

# Development Workflow

This guide describes the development workflow for contributing to Bagmaster.

## Setup

Follow the [contributing overview](./overview) to set up your development environment.

## Development Process

### 1. Pick an Issue

Browse [open issues](https://github.com/rahulkatiyar19955/bagmaster/issues) or create a new one to discuss your changes.

### 2. Create a Branch

```bash
# Feature
git checkout -b feature/description

# Bug fix
git checkout -b fix/description

# Documentation
git checkout -b docs/description
```

### 3. Make Changes

- Write clean, maintainable code
- Follow coding standards
- Add tests for new features
- Update documentation

### 4. Test Your Changes

```bash
# Run tests
make test

# Run linters
make lint

# Type checking
make typecheck
```

### 5. Commit Changes

Use conventional commits:

```bash
git commit -m "feat: add new recording feature"
git commit -m "fix: resolve playback issue"
git commit -m "docs: update API documentation"
```

### 6. Push and Create PR

```bash
git push origin feature/description
```

Then create a pull request on GitHub.

## Pull Request Process

1. **Description**: Clearly describe your changes
2. **Tests**: Ensure all tests pass
3. **Documentation**: Update relevant docs
4. **Review**: Address reviewer feedback
5. **Merge**: Maintainers will merge when approved

## Continuous Integration

All PRs must pass:
- ✅ Unit tests
- ✅ Integration tests
- ✅ Linting
- ✅ Type checking
- ✅ Build verification

## Getting Help

- Ask questions in the PR
- Join community discussions
- Contact maintainers
