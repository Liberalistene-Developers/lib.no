# lib.no - Liberalistene Homepage

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.15.1-brightgreen.svg)](https://nodejs.org/)
[![Build](https://github.com/Liberalistene-Developers/lib.no/workflows/Enonic%20CI/badge.svg)](https://github.com/Liberalistene-Developers/lib.no/actions)

The official homepage for **Liberalistene** (Norwegian political party), built on Enonic XP CMS with modern React components and React4xp v6 architecture.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development](#development)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project powers the Liberalistene party website, providing:

- Modern, responsive design with Tailwind CSS v4
- Server-side rendering with React4xp v6
- Content management with Enonic XP
- Component development environment with Storybook
- Comprehensive testing with Jest
- Automated releases with semantic versioning

**Version:** 1.10.2
**Repository:** https://github.com/Liberalistene-Developers/lib.no

## Tech Stack

### Core Technologies
- **CMS:** Enonic XP 7.7+
- **Framework:** React4xp v6.0.2
- **Frontend:** React 18, TypeScript 5+
- **Styling:** Tailwind CSS v4, PostCSS
- **Build System:** Gradle + tsup + esbuild

### Development Tools
- **Component Development:** Storybook 9.1
- **Testing:** Jest 30 + React Testing Library
- **Code Quality:** ESLint 9 + TypeScript ESLint 8
- **Version Control:** Git with Conventional Commits
- **CI/CD:** GitHub Actions + semantic-release

### Additional Libraries
- **Maps:** Leaflet + react-leaflet
- **Icons:** FontAwesome
- **Security:** DOMPurify for XSS protection

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** - Version 22.15.1 or higher
   ```bash
   # Using nvm (recommended)
   nvm install 22.15.1
   nvm use
   ```

2. **Java 17** - Required for Enonic XP

3. **Enonic CLI** - [Installation guide](https://developer.enonic.com/start)
   ```bash
   npm install -g @enonic/cli
   ```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
# Development build (default)
npm run build

# Production build (minified)
npm run build:prod
```

### 3. Deploy to Enonic

```bash
# Deploy to local Enonic sandbox
npm run deploy

# Or use Enonic CLI directly
enonic project deploy
```

### 4. Access the Site

- **Website:** http://localhost:8080
- **Admin Console:** http://localhost:8080/admin

## Development

### Available Commands

```bash
# Build
npm run build                 # Build with Gradle (development)
npm run build:prod            # Build with Gradle (production)
npm run build:assets          # Build assets only
npm run build:react4xp        # Build React4xp components
npm run clean                 # Clean build artifacts

# Deploy
npm run deploy                # Deploy to Enonic
npm run watch                 # Deploy and watch for changes
npm run rewatch               # Clean, deploy, then watch

# Type Checking
npm run check                 # Run all type checks and linting
npm run check:types           # Run all TypeScript type checks
npm run check:types:react4xp  # Check React components
npm run check:types:xp        # Check XP server-side code

# Testing
npm test                      # Run Jest tests
npm run test:coverage         # Run tests with coverage
npm run test:watch            # Run tests in watch mode

# Linting
npm run lint                  # Run ESLint
npm run lint:css              # Run Stylelint

# Component Development
npm run storybook             # Start Storybook on port 6006
npm run build-storybook       # Build static Storybook

# Browser Sync
npm run browserSync           # Start browser-sync with live reload
```

### Development Workflow

1. **Start watching for changes:**
   ```bash
   npm run watch
   ```

2. **Develop components in Storybook:**
   ```bash
   npm run storybook
   # Visit http://localhost:6006
   ```

3. **Run type checks:**
   ```bash
   npm run check:types
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

### Sandbox Setup

For optimal development with clean logs and proper routing, see the [Sandbox Setup Guide](docs/sandbox-setup.md) for:

- Creating and configuring the Enonic sandbox
- **Virtual host (vhost) configuration** - Required for localhost access
- Log optimization and debugging setup

**Important:** The vhost configuration is required for the site to work correctly on localhost.

## Documentation

Comprehensive documentation is available:

- **[CLAUDE.md](CLAUDE.md)** - Complete developer guide including:
  - Project structure and architecture
  - React4xp v6 architecture patterns
  - Code conventions and best practices
  - Build system details
  - Testing guidelines
  - Release process

- **[Sandbox Setup Guide](docs/sandbox-setup.md)** - Enonic sandbox configuration

- **[GitHub Issues](https://github.com/Liberalistene-Developers/lib.no/issues)** - Issue tracking and roadmap

- **[Roadmap Issue #31](https://github.com/Liberalistene-Developers/lib.no/issues/31)** - Codebase modernization roadmap

- **[Storybook](http://localhost:6006)** - Interactive component documentation (run `npm run storybook`)

## Contributing

We welcome contributions! Please follow these guidelines:

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Tests

Example: `feat: add dark mode toggle to settings page`

Commit messages are enforced by Commitlint via Husky pre-commit hooks.

### Code Style

- **TypeScript:** All code must be written in proper TypeScript
- **React Imports:** Use inline `type` modifier for type-only imports
- **Import Paths:** Prefer absolute imports with path aliases (`@common/`, `@utils/`)
- **Formatting:** ESLint and Stylelint are configured and enforced

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the code style guidelines
4. Run tests and type checks (`npm run check` and `npm test`)
5. Commit with conventional commit messages
6. Push to your fork and submit a pull request

### Architecture Guidelines

This project follows **React4xp v6 architecture** with strict separation of concerns:

- **Parts** - 4-line shims using `createPartShim`
- **Processors** - Data fetching and transformation
- **Components** - Pure React components in `/common/`

See [CLAUDE.md](CLAUDE.md) for detailed architecture documentation.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE.txt](LICENSE.txt) file for details.

Copyright 2025 Liberalistene

## Contact

- **Author:** Benny Thomas
- **Repository:** https://github.com/Liberalistene-Developers/lib.no
- **Issues:** https://github.com/Liberalistene-Developers/lib.no/issues

---

Built with [Enonic XP](https://enonic.com/) and [React4xp](https://developer.enonic.com/docs/react4xp)
