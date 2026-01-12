# Bagmaster Documentation

This repository contains the documentation website for [Bagmaster](https://github.com/rahulkatiyar19955/bagmaster), powered by [Docusaurus 3](https://docusaurus.io/).

## 🚀 Getting Started

### Prerequisites

- Node.js 22 or higher
- Yarn 4.12.0

### Installation

```bash
# Enable Corepack (for Yarn 4)
corepack enable

# Install dependencies
yarn install
```

### Development

```bash
# Start the development server
yarn start
```

The site will be available at `http://localhost:3000`.

### Building

```bash
# Build the production bundle
yarn build

# Serve the build locally
yarn serve
```

## 📁 Project Structure

```
bagmaster_docs/
├── docs/                      # Main versioned documentation
│   ├── getting-started.md
│   ├── installation.md
│   ├── guides/               # User guides
│   ├── api/                  # API reference
│   └── advanced/             # Advanced topics
├── website/
│   ├── architecture/         # Architecture docs (unversioned)
│   ├── contributing/         # Contributing guides
│   ├── community/            # Community resources
│   ├──blog/                 # Blog posts
│   ├── src/
│   │   ├── css/             # Custom styles
│   │   ├── pages/           # React pages
│   │   └── theme/           # Theme customizations
│   ├── static/              # Static assets
│   ├── docusaurus.config.ts # Main configuration
│   └── sidebars.ts          # Sidebar configuration
├── plugins/                  # Custom plugins
└── packages/                 # Shared packages
```

## 📝 Writing Documentation

### Adding a New Page

1. Create a new Markdown file in the appropriate directory
2. Add frontmatter:
   ```markdown
   ---
   id: page-id
   title: Page Title
   sidebar_label: Sidebar Label
   ---
   ```
3. Update the corresponding `sidebars.ts` file

### Markdown Features

- **Code blocks** with syntax highlighting
- **Admonitions** for notes, warnings, etc.
- **Mermaid diagrams** for visualizations
- **Tabs** for multi-language examples

See the [Docusaurus documentation](https://docusaurus.io/docs/markdown-features) for more features.

## 🔄 Versioning

To create a new documentation version:

```bash
cd website
yarn version:cut <version>
```

Example: `yarn version:cut 1.0.0`

## 🎨Theming

Custom styles are in `website/src/css/`. The site supports both light and dark modes.

## 🤝 Contributing

Contributions to the documentation are welcome! Please see our [Contributing Guide](./website/contributing/overview.md).

### Quick Contribution

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `yarn build` to verify
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Bagmaster GitHub](https://github.com/rahulkatiyar19955/bagmaster)
- [Documentation Website](https://bagmaster.dev)
- [Report Issues](https://github.com/rahulkatiyar19955/bagmaster/issues)
