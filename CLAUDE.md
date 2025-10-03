# lib.no - Liberalistene Homepage

## Project Overview

This is the official homepage for Liberalistene (Norwegian political party), built on Enonic XP CMS with React components.

**Repository:** https://github.com/Liberalistene-Developers/lib.no
**License:** Apache-2.0
**Current Version:** 1.10.2

## Tech Stack

- **CMS:** Enonic XP 7.7+
- **Framework:** React4xp (v3.1.2) - integrates React with Enonic XP
- **Frontend:** React 18, SCSS
- **Build System:** Gradle + Webpack + Babel
- **Node Version:** 16.x (see .nvmrc)
- **Java Version:** 11
- **Component Development:** Storybook 7.0.27
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

1. Install Node.js 16.x (use nvm: `nvm use`)
2. Install Java 11
3. Install [Enonic CLI](https://developer.enonic.com/start)

### Installation

```bash
npm install
```

### Development Commands

```bash
# Start development with watch mode
npm run dev

# Watch for changes (without rebuild)
npm run watch:all

# Individual watch tasks
npm run watch:gradle    # Watch Gradle builds
npm run watch:xp        # Watch XP resources
npm run watch:styles    # Watch SCSS files
npm run watch:react4xp  # Watch React components

# Build
npm run build           # Build with dev flag
npm run clean           # Clean build artifacts
npm run rebuild         # Clean and build

# Deploy
npm run deploy          # Deploy to Enonic
npm run redeploy        # Rebuild and deploy

# Linting
npm run lint            # Run ESLint and Stylelint
npm run stylelint       # Run Stylelint only

# Storybook
npm run storybook       # Start Storybook on port 6006
npm run build-storybook # Build static Storybook
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
- Node environment: production (default) or development (`-Pdev`)

### Webpack

- **Client bundle:** `webpack.client.config.js` - builds UI assets
- **React4xp:** Handles React component bundling via react4xp-build-components

### Babel

- Transpiles ES6+ code in `src/main/resources` to `build/resources/main`
- Ignores `.jsx` files (handled by React4xp)

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

- **JavaScript/React:** ESLint with Standard config
- **CSS/SCSS:** Stylelint with SCSS recommended config
- **Formatting:** Prettier (`.prettierrc.json`)
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
- `@enonic/react4xp` - v3.1.2
- Various Enonic XP libs (portal, content, auth, etc.)

**Build Tools:**
- `webpack` v5.88.1
- `babel` v7.21+
- `node-sass` v8.0.0
- `eslint` v8.46.0
- `stylelint` v15.10.2

## Environment Variables

This project uses environment variables for configuration. Check with the team for required secrets when deploying to production.

## Troubleshooting

### Build Issues

1. **Clean build:** `npm run clean && npm install`
2. **Clear Gradle cache:** `./gradlew clean --refresh-dependencies`
3. **Check Node version:** Should be 16.x

### React4xp Issues

- Ensure `react4xp.properties` exists (or use `react4xp.production` for production builds)
- Check `build/react4xp_constants.json` is generated

## Additional Resources

- [Enonic XP Docs](https://developer.enonic.com/docs)
- [React4xp Documentation](https://developer.enonic.com/docs/react4xp)
- [Semantic Release Docs](https://semantic-release.gitbook.io/)
