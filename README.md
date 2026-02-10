# Bagmaster Documentation

The official documentation site for [Bagmaster](https://github.com/rahulkatiyar19955/bagmaster), built with [Docusaurus 3](https://docusaurus.io/).

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) (enabled via Corepack)

```bash
corepack enable
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm start
```

The site will be available at `http://localhost:3000` with hot reload.

## Build

Generate a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm serve
```

## Docker

Build and run the docs site in a container:

```bash
docker build -t bagmaster-docs .
docker run -p 8080:80 bagmaster-docs
```

The site will be available at `http://localhost:8080`.

## Project Structure

```
bagmaster_docs/
├── docs/                      # Main documentation
│   ├── getting-started.md
│   ├── installation.md
│   ├── guides/
│   ├── api/
│   └── advanced/
├── website/
│   ├── architecture/          # Architecture docs
│   ├── contributing/          # Contributing guides
│   ├── community/             # Community resources
│   ├── blog/                  # Blog posts
│   ├── src/                   # Custom components and styles
│   ├── static/                # Static assets
│   ├── docusaurus.config.ts
│   └── nginx.conf
├── Dockerfile
├── pnpm-workspace.yaml
└── package.json
```

## Writing Documentation

1. Create a Markdown file in the appropriate directory
2. Add frontmatter:
   ```markdown
   ---
   id: page-id
   title: Page Title
   sidebar_label: Sidebar Label
   ---
   ```
3. Update the corresponding `sidebars*.ts` file

### Supported Features

- Code blocks with syntax highlighting
- Admonitions (notes, warnings, tips, caution)
- Mermaid diagrams
- Tabs for multi-language examples

See the [Docusaurus docs](https://docusaurus.io/docs/markdown-features) for the full feature set.

## Versioning

To create a new documentation version:

```bash
pnpm docusaurus docs:version <version>
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm build` to verify
5. Submit a pull request

## License

MIT
