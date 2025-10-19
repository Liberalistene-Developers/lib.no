# lib.no - Liberalistene Homepage

## Project Overview

This is the official homepage for Liberalistene (Norwegian political party), built on Enonic XP CMS with React components.

**Repository:** https://github.com/Liberalistene-Developers/lib.no
**License:** Apache-2.0
**Current Version:** 1.10.2

## Working with Claude Code

**IMPORTANT RULES:**

1. **Never rewrite components or files without asking first** - Always ask before making changes to existing files
2. **Never reset files from git** - Don't undo changes that have already been made to the codebase
3. **Never mention controller files for site folder items** - This is React4xp v6 architecture with processors and component registry, not v3 controllers
4. **Never commit without explicit approval** - ALWAYS show what will be staged/committed and wait for user confirmation. Never use `git add -A` or `git commit` without asking first. List the specific files to be committed and get approval.
5. **Work in small batches and STOP** - Never modify more than 3-4 files in a single batch. After completing a batch:
   - Show the results and changes made
   - Mark todos as completed
   - **STOP and wait for explicit approval**
   - **User must restart the conversation for the next batch**
   - This prevents autopilot mode and ensures proper review of each batch

## Tech Stack

- **CMS:** Enonic XP 7.7+
- **Framework:** React4xp (v6.0.2) - integrates React with Enonic XP
- **Frontend:** React 18, TypeScript, Tailwind CSS v4
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
- **Virtual host (vhost) configuration** - Required for localhost access and Guillotine API routing
- Disabling audit logging (snapshotter)
- Suppressing Elasticsearch warnings
- Optimizing logback configuration

**Important:** The vhost configuration is **required** for the site to work correctly on localhost. Without it, dynamic article and event lists will fail to load.

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

**Commit Message Guidelines:**
- Focus on **what** changed and **why** in the message body
- **Don't list modified files** unless they provide special context not obvious from the commit itself
- The file list is already visible in the commit diff - avoid redundancy
- Use the message body to explain the changes, their purpose, or relevant details

**Example:**
```
✅ Good:
docs: document batch 3 part 3 components (issue #53)

Documented 3 components in the component catalog:
- submenu - Flexible navigation with manual/query selection
- test - React4xp v6 diagnostic component
- textblock - Centered text block with optional title

Progress: 11/13 components complete (85%)

❌ Avoid:
docs: document batch 3 part 3 components (issue #53)

Updated files:
- docs/components/layout-navigation.md
- docs/components/content-display.md
- docs/components/special-purpose.md
```

Enforced by Commitlint via Husky pre-commit hooks.

### Code Style

- **TypeScript/React:** ESLint v9 with TypeScript ESLint parser
  - React plugin for JSX rules
  - React Hooks plugin for hooks rules
  - JSX a11y plugin for accessibility
  - Storybook plugin for story files
- **CSS:** Tailwind CSS v4 with PostCSS
- **Editor:** EditorConfig (`.editorconfig`)

### TypeScript Best Practices

- **Use proper TypeScript only** - All code must be written in proper TypeScript following recommended patterns
- **Prefer destructuring** - Use object and array destructuring wherever possible
- **Prefer template strings** - Use template literals (backticks) instead of string concatenation
- **React imports with inline type modifier** - Use single import statement with inline `type` for type-only imports

**React Import Convention:**

The project uses the modern JSX transform (`"jsx": "react-jsx"` in tsconfig), so React doesn't need to be imported for JSX. Always use inline `type` modifier for type imports and keep only ONE import statement from 'react' per file.

```tsx
// ✅ Type-only imports (FC, ReactNode, etc.)
import {type FC} from 'react';

// ✅ Runtime imports (hooks, Component, etc.)
import {useState, useEffect} from 'react';

// ✅ Combined (type + runtime in ONE import)
import {useState, useEffect, type FC, type ReactNode} from 'react';

// ❌ Don't use separate type import statement
import type {FC} from 'react';  // WRONG

// ❌ Don't import types as runtime
import {FC} from 'react';  // WRONG
```

### Import Paths and Barrel Exports

The project uses **absolute imports** with path aliases configured in `tsconfig.react4xp.json`:

```tsx
// ✅ Absolute imports (preferred)
import {Article} from '/react4xp/common/Article/Article';
import {imageUrl} from '/react4xp/utils/image';

// ✅ Path aliases (also valid)
import {imageUrl} from '@utils/image';
import {Article} from '@common/Article/Article';

// ❌ Relative imports (avoid for cross-directory imports)
import {Article} from '../Article/Article';  // WRONG
```

**Barrel Exports Available:**

The project provides barrel exports for convenience:

```tsx
// Option 1: Direct import (explicit)
import {Article} from '/react4xp/common/Article/Article';

// Option 2: Barrel export (convenient for multiple imports)
import {Article, Card, Button} from '/react4xp/common';

// Both work the same - use whichever is clearer for your use case
```

**Barrel export files:**
- `/react4xp/common/index.tsx` - All React components
- `/react4xp/utils/index.ts` - All utility functions

**Note:** Barrel exports are tree-shakeable - only imported items are bundled.

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

## GitHub Issue Tracking

The project uses a comprehensive GitHub issue tracking system for managing improvements, bugs, and technical debt.

### Roadmap Issue

**Issue #31** - 🗺️ Codebase Modernization Roadmap
https://github.com/Liberalistene-Developers/lib.no/issues/31

This is the master issue that tracks all modernization efforts, organized into 4 phases over 8-10 weeks.

### Issue Categories

#### 🏗️ Architecture Refactoring (Issues #16-20)
Epic for converting all Part files to proper React4xp v6 architecture:
- **#16** - Epic: Refactor Parts to Follow React4xp v6 Architecture
- **#17** - Phase 1: Fix Part Dependencies (CRITICAL)
- **#18** - Phase 2: Refactor High Priority Parts
- **#19** - Phase 3: Refactor Medium Priority Parts
- **#20** - Phase 4-5: Remaining Parts and Verification

#### 🔴 Critical Priority (Issues #21-22)
- **#21** - Add Test Infrastructure and Coverage
- **#22** - Security: Standardize SafeHtml Usage and Add CSP

#### 🟡 High Priority (Issues #23-25)
- **#23** - Improve Type Safety: Remove any/unknown
- **#24** - Add Error Boundaries and Error Handling
- **#25** - Remove Console Logs and Implement Proper Logging

#### 🟢 Medium Priority (Issues #26-28)
- **#26** - Improve Documentation
- **#27** - Clean Up Build Configuration
- **#28** - Clean Up Dependencies and Fix Security Issues

#### ⚪ Low Priority (Issues #29-30)
- **#29** - Code Style: Standardize Imports
- **#30** - Performance Optimizations: Code Splitting

### GitHub Labels

The project uses a structured labeling system:

#### Current Work Tracker
- **`🔧 current-work`** (Orange) - Currently being worked on
  - Only one issue should have this label at a time
  - Makes it easy to find what's in progress

#### Priority Labels
- **`priority: critical`** (Dark Red) - Must fix immediately
- **`priority: high`** (Orange-Red) - Should fix soon
- **`priority: medium`** (Yellow) - Should fix eventually
- **`priority: low`** (Green) - Nice to have

#### Type Labels
- **`type: architecture`** (Purple) - Architecture and design issues
- **`type: security`** (Red) - Security-related issues
- **`type: testing`** (Light Blue) - Testing and test coverage
- **`type: performance`** (Teal) - Performance optimization

### Using the Current Work Label

**When starting work on an issue:**
```bash
gh issue edit 17 --add-label "🔧 current-work"
```

**When finishing work:**
```bash
gh issue edit 17 --remove-label "🔧 current-work"
```

**Find what's currently being worked on:**
```bash
gh issue list --label "🔧 current-work"
```

Or browse: https://github.com/Liberalistene-Developers/lib.no/labels/🔧%20current-work

### Quick Commands

**View all issues:**
```bash
gh issue list
```

**View critical issues:**
```bash
gh issue list --label "priority: critical"
```

**View architecture issues:**
```bash
gh issue list --label "type: architecture"
```

**View a specific issue:**
```bash
gh issue view 17
```

### Working with Issues Across Sessions

At the start of each session:

1. **Check current work:**
   ```bash
   gh issue list --label "🔧 current-work"
   ```

2. **If nothing is marked, check the roadmap:**
   ```bash
   gh issue view 31
   ```

3. **Start working on an issue:**
   ```bash
   gh issue edit 17 --add-label "🔧 current-work"
   ```

4. **Read the issue details:**
   ```bash
   gh issue view 17
   ```

This system ensures continuity across sessions and makes it easy to pick up where you left off.

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
3. **Check Node version:** Should be 22.15.1 (run `nvm use`)
4. **Type check:** `npm run check:types` to verify TypeScript compilation
5. **Lint:** `npm run lint` to check for code issues

### React4xp v6 Architecture

This project follows React4xp v6 architecture with a clean three-layer separation of concerns.

#### Architecture Overview

The architecture separates data fetching, component registration, and rendering into three distinct layers:

```
┌─────────────────────────────────────────────────────────────┐
│  XP Site (src/main/resources/site/)                         │
│  - Content Types, Parts, Pages, Layouts (XML definitions)   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Processors (Data Fetching)                        │
│  - Located in: src/main/resources/react4xp/parts/*/         │
│  - Files: *Processor.ts                                     │
│  - Purpose: Fetch and transform data from Enonic XP         │
│  - Registered in: dataFetcher.ts                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: Parts (Component Shims)                           │
│  - Located in: src/main/resources/react4xp/parts/*/         │
│  - Files: *Part.tsx (exactly 4 lines each)                  │
│  - Purpose: Thin wrappers using createPartShim               │
│  - Registered in: componentRegistry.tsx                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: Components (React Implementation)                 │
│  - Located in: src/main/resources/react4xp/common/*/        │
│  - Files: ComponentName.tsx (full React implementation)     │
│  - Purpose: Reusable, testable React components             │
└─────────────────────────────────────────────────────────────┘
```

#### The createPartShim Pattern

All Part files use the `createPartShim` helper, which creates a standardized 4-line wrapper:

```tsx
// Example: src/main/resources/react4xp/parts/article/ArticlePart.tsx
import {Article} from '/react4xp/common/Article/Article';
import {createPartShim} from '/react4xp/common/PartShim/PartShim';

export const ArticlePart = createPartShim(Article);
```

**Benefits of this pattern:**
- **Consistency:** Every Part follows the exact same structure
- **Simplicity:** Only 4 lines per Part, easy to understand and maintain
- **Separation:** Business logic stays in /common/, Parts are just wrappers
- **Testability:** Components in /common/ can be tested independently
- **Reusability:** Components can be shared across multiple Parts

#### Directory Structure

```
src/main/resources/react4xp/
├── common/                      # Reusable React components
│   ├── Article/
│   │   └── Article.tsx         # Full React implementation
│   ├── Button/
│   │   └── Button.tsx
│   ├── PartShim/
│   │   └── PartShim.tsx        # createPartShim helper
│   └── ...
├── parts/                       # Part shims + processors
│   ├── article/
│   │   ├── ArticlePart.tsx     # 4-line shim
│   │   └── ArticleProcessor.ts # Data fetching
│   └── ...
├── layouts/                     # Layout components
├── pages/                       # Page components
├── entries/
│   └── App.tsx                 # React4xp app entry point
├── componentRegistry.tsx        # Registers all Parts/Layouts/Pages
└── dataFetcher.ts              # Registers all Processors
```

#### Creating a New Part

To add a new Part to the project, follow these steps:

**1. Create the Component** (in `/common/`)

```tsx
// src/main/resources/react4xp/common/MyFeature/MyFeature.tsx
import type {FC} from 'react';

interface MyFeatureProps {
  title: string;
  description: string;
}

export const MyFeature: FC<MyFeatureProps> = ({title, description}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
```

**2. Create the Processor** (in `/parts/myfeature/`)

```tsx
// src/main/resources/react4xp/parts/myfeature/MyFeatureProcessor.ts
import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';

interface MyFeatureConfig {
  title?: string;
  description?: string;
}

export const myFeatureProcessor: ComponentProcessor<'lib.no:myfeature'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as MyFeatureConfig;

  return {
    title: config.title || 'Default Title',
    description: config.description || ''
  };
};
```

**3. Create the Part Shim** (in `/parts/myfeature/`)

```tsx
// src/main/resources/react4xp/parts/myfeature/MyFeaturePart.tsx
import {MyFeature} from '/react4xp/common/MyFeature/MyFeature';
import {createPartShim} from '/react4xp/common/PartShim/PartShim';

export const MyFeaturePart = createPartShim(MyFeature);
```

**4. Register in componentRegistry.tsx**

```tsx
import { MyFeaturePart } from '/react4xp/parts/myfeature/MyFeaturePart';

componentRegistry.addPart('lib.no:myfeature', {View: MyFeaturePart});
```

**5. Register in dataFetcher.ts**

```tsx
import { myFeatureProcessor } from '/react4xp/parts/myfeature/MyFeatureProcessor';

dataFetcher.addPart('lib.no:myfeature', {processor: myFeatureProcessor});
```

**6. Create the XP Part Definition**

```xml
<!-- src/main/resources/site/parts/myfeature/myfeature.xml -->
<part xmlns="urn:enonic:xp:model:1.0">
  <display-name>My Feature</display-name>
  <form>
    <input name="title" type="TextLine">
      <label>Title</label>
    </input>
    <input name="description" type="TextArea">
      <label>Description</label>
    </input>
  </form>
</part>
```

#### Key Principles

1. **No Part-to-Part Dependencies:** Parts should never import from other Parts. Shared code goes in `/common/`.

2. **Every Part is 4 Lines:** All Part files use `createPartShim` and are exactly 4 lines (2 imports, 1 blank line, 1 export).

3. **Processors Handle Data:** All data fetching, transformation, and XP API calls happen in Processor files.

4. **Components are Pure:** Components in `/common/` are pure React components with no Enonic XP dependencies.

5. **Single Responsibility:**
   - Processors: Data fetching and transformation
   - Parts: Component registration and wiring
   - Components: UI rendering and user interaction

#### Current Status

- **Total Parts:** 38
- **Architecture Compliance:** 100% (all Parts use createPartShim)
- **Processor Pattern:** Consistently applied across all Parts
- **Component Registry:** Centralized in `componentRegistry.tsx`
- **Data Fetcher:** Centralized in `dataFetcher.ts`

## Additional Resources

- [Component Catalog](docs/COMPONENTS.md) - Complete reference for all 38 React components with screenshots and examples
- [Enonic XP Docs](https://developer.enonic.com/docs)
- [React4xp Documentation](https://developer.enonic.com/docs/react4xp)
- [Semantic Release Docs](https://semantic-release.gitbook.io/)
