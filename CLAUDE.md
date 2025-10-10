# lib.no - Liberalistene Homepage

## Project Overview

This is the official homepage for Liberalistene (Norwegian political party), built on Enonic XP CMS with React components.

**Repository:** https://github.com/Liberalistene-Developers/lib.no
**License:** Apache-2.0
**Current Version:** 1.10.2

## Tech Stack

- **CMS:** Enonic XP 7.7+
- **Framework:** React4xp (v6.0.2) - integrates React with Enonic XP
- **Frontend:** React 19, TypeScript, Tailwind CSS v4
- **Build System:** Gradle + tsup + esbuild
- **Node Version:** 22.15.1 (see .nvmrc) - Required for React4xp v6.0.2 compatibility
- **Java Version:** 17
- **Component Development:** Storybook 9.1
- **Mapping:** Leaflet/react-leaflet
- **Icons:** FontAwesome

## Project Structure

```
lib.no/
├── src/
│   ├── main/
│   │   ├── java/                    # Java source files
│   │   └── resources/
│   │       ├── admin/               # Admin customizations
│   │       ├── assets/              # Static assets (images, fonts, etc)
│   │       ├── error/               # Error pages
│   │       ├── headless/            # Headless CMS configs
│   │       ├── i18n/                # Internationalization files
│   │       ├── lib/                 # Server-side libraries
│   │       ├── react4xp/            # React components
│   │       ├── services/            # XP services
│   │       ├── site/
│   │       │   ├── content-types/  # Content type definitions
│   │       │   ├── layouts/        # Page layouts
│   │       │   ├── mixins/         # Content mixins
│   │       │   ├── pages/          # Page controllers
│   │       │   ├── parts/          # Page parts/components
│   │       │   ├── processors/     # Response processors
│   │       │   ├── x-data/         # Extra data schemas
│   │       │   └── site.xml        # Site configuration
│   │       └── webapp/             # Web application resources
│   └── stories/                     # Storybook stories
│       ├── layouts/
│       ├── pages/
│       └── parts/
├── build/                           # Build output
├── .github/workflows/              # GitHub Actions
├── .husky/                         # Git hooks
├── public/                         # Public static files
└── util/                           # Utility scripts
```

## Development Setup

### Prerequisites

1. Install Node.js 22.15.1 (use nvm: `nvm use`)
2. Install Java 17
3. Install [Enonic CLI](https://developer.enonic.com/start)

### Sandbox Setup

For optimal development experience with clean logs, see [Sandbox Setup Guide](docs/sandbox-setup.md) for:
- Creating and configuring the Enonic sandbox
- Disabling audit logging (snapshotter)
- Suppressing Elasticsearch warnings
- Optimizing logback configuration

### Installation

```bash
npm install
```

### Development Commands

```bash
# Build
npm run build                 # Build with Gradle (development mode)
npm run build:prod            # Build with Gradle (production mode - minified)
npm run build:assets          # Build assets with tsup
npm run build:react4xp        # Build React4xp components
npm run build:xp:resources    # Build XP resources with tsup
npm run clean                 # Clean build artifacts

# Deploy
npm run deploy                # Deploy to Enonic
npm run watch                 # Watch and deploy on changes
npm run rewatch               # Clean, deploy, then watch

# Type Checking
npm run check                 # Run all type checks and linting
npm run check:types           # Run all TypeScript type checks
npm run check:types:node      # Check Node types
npm run check:types:react4xp  # Check React4xp types
npm run check:types:xp        # Check XP Nashorn types

# Linting
npm run lint                  # Run ESLint

# Testing
npm run test                  # Run Jest tests

# Storybook
npm run storybook             # Start Storybook on port 6006
npm run build-storybook       # Build static Storybook

# Browser Sync
npm run browserSync           # Start browser-sync with live reload
```

### Enonic Deployment

```bash
enonic project deploy
```

## Build System

### Gradle

- Uses Enonic XP Gradle plugins
- Builds JAR file at `build/libs/Liberalistene.jar`
- Handles Java compilation and resource processing
- Node environment: development (default) or production (`-Penv=prod`)

### tsup + esbuild

- **Assets:** `tsup -d build/resources/main/assets` - builds static assets
- **XP Resources:** `tsup -d build/resources/main` - builds server-side resources
- **React4xp:** Component bundling via `@enonic/react4xp` package
- Fast TypeScript compilation and bundling with esbuild

### Build Modes

- **Development mode** (default): Unminified, easier debugging, used by default for local development
- **Production mode** (`-Penv=prod`): Minified, optimized bundles, used for releases and CI/CD

### TypeScript

- Three separate TypeScript configs:
  - `tsconfig.node.json` - Node.js tooling
  - `tsconfig.react4xp.json` - React components
  - `tsconfig.xp.nashorn.json` - Enonic XP server-side code (Nashorn)

## Code Conventions

### Commit Messages

Uses [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Tests

Enforced by Commitlint via Husky pre-commit hooks.

### Code Style

- **TypeScript/React:** ESLint v9 with TypeScript ESLint parser
  - React plugin for JSX rules
  - React Hooks plugin for hooks rules
  - JSX a11y plugin for accessibility
  - Storybook plugin for story files
- **CSS:** Tailwind CSS v4 with PostCSS
- **Editor:** EditorConfig (`.editorconfig`)

## Release Process

### Semantic Release (Automated)

The project uses `semantic-release` for automated versioning and releases.

**Trigger:** Push to `master` branch

**What happens:**
1. Analyzes commits since last release
2. Determines version bump (major/minor/patch)
3. Generates/updates CHANGELOG.md
4. Updates package.json and package-lock.json
5. Creates Git tag and GitHub release
6. Builds and deploys JAR file

**Required commit format:** Conventional Commits

**GitHub Actions Workflow:** `.github/workflows/release.yml`

### Configuration

**package.json:**
```json
{
  "release": {
    "branches": ["master"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      "@semantic-release/git",
      "@semantic-release/npm",
      "@semantic-release/github"
    ]
  }
}
```

## CI/CD

### GitHub Actions Workflows

1. **Release** (`.github/workflows/release.yml`)
   - Triggers: Push to `master`
   - Runs: Lint, build, semantic-release

2. **Enonic CI** (`.github/workflows/enonic.yml`)
   - Triggers: Push to any branch
   - Runs: Lint, build JAR, deploy to Enonic

3. **Dependabot** (`.github/workflows/dependabot.yml`)
   - Automated dependency updates

## Dependencies

### Key Libraries

**Runtime:**
- `react` & `react-dom` - v18.2.0
- `react-leaflet` - v4.2.1 (maps)
- `@fortawesome/react-fontawesome` - Icons
- `classnames` - CSS class management

**Enonic:**
- `@enonic/react4xp` - v6.0.2
- `@enonic-types/*` - TypeScript types for Enonic XP libs
- Various Enonic XP libs (portal, content, auth, etc.)

**Build Tools:**
- `webpack` v5+ (for Webpack-based builds)
- `tsup` v8+ (primary build tool)
- `esbuild` v0.25+ (fast bundling)
- `typescript` v5+
- `eslint` v9.33+ with typescript-eslint v8.40+
- `tailwindcss` v4.1+
- `postcss` v8.5+

## Environment Variables

This project uses environment variables for configuration. Check with the team for required secrets when deploying to production.

## Troubleshooting

### Build Issues

1. **Clean build:** `npm run clean && npm install`
2. **Clear Gradle cache:** `./gradlew clean --refresh-dependencies`
3. **Check Node version:** Should be 18.20.5 (run `nvm use`)
4. **Type check:** `npm run check:types` to verify TypeScript compilation
5. **Lint:** `npm run lint` to check for code issues

**Important:** React4xp v6.0.2 requires Node 18.x due to dependency
compatibility issues with `filemanager-webpack-plugin` and `del`.
Modern Node versions (20+, 22+) will fail during the build process.
This will be resolved in future React4xp versions.

### React4xp v6 Architecture

- All components are written in TypeScript (`.tsx`)
- Components live in `src/main/resources/react4xp/components/`
- Organized by type: `layouts/`, `pages/`, `parts/`, `common/`
- Component registry in `componentRegistry.tsx`
- App entry point in `entries/App.tsx`
- Controllers in `src/main/resources/site/` call components via React4xp v6 API

## Additional Resources

- [Enonic XP Docs](https://developer.enonic.com/docs)
- [React4xp Documentation](https://developer.enonic.com/docs/react4xp)
- [Semantic Release Docs](https://semantic-release.gitbook.io/)
