# Contributing to lib.no

Thank you for your interest in contributing to the Liberalistene homepage project! This guide will help you get started and ensure your contributions align with our project standards.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing Guide](#testing-guide)
- [Debugging Guide](#debugging-guide)
- [Pull Request Process](#pull-request-process)
- [Common Pitfalls](#common-pitfalls)
- [Code of Conduct](#code-of-conduct)

## Getting Started

### Prerequisites

Before you begin, ensure you have:

1. **Node.js 22.15.1+** - Use nvm for version management
2. **Java 17** - Required for Enonic XP
3. **Enonic CLI** - Install globally: `npm install -g @enonic/cli`
4. **Git** - For version control

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/lib.no.git
   cd lib.no
   ```
3. **Add upstream remote** to keep your fork in sync:
   ```bash
   git remote add upstream https://github.com/Liberalistene-Developers/lib.no.git
   ```

### Setup Development Environment

1. **Install Node.js version** (using nvm):
   ```bash
   nvm use
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Enonic sandbox** (see [Sandbox Setup Guide](sandbox-setup.md)):
   ```bash
   enonic sandbox create libno -t essentials -v 7.15.4
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

5. **Deploy to Enonic**:
   ```bash
   npm run deploy
   ```

6. **Verify setup** - Visit http://localhost:8080

### Keep Your Fork in Sync

```bash
git fetch upstream
git checkout develop
git merge upstream/develop
```

## Development Workflow

### Branch Naming Conventions

Create descriptive branch names using one of these prefixes:

- `feature/` - New features (e.g., `feature/add-dark-mode`)
- `fix/` - Bug fixes (e.g., `fix/article-list-loading`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-processor`)
- `docs/` - Documentation updates (e.g., `docs/update-contributing`)
- `test/` - Test additions or improvements (e.g., `test/add-processor-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

**Example workflow:**
```bash
git checkout develop
git pull upstream develop
git checkout -b feature/my-awesome-feature
# Make your changes
git add .
git commit -m "feat: add awesome feature"
git push origin feature/my-awesome-feature
```

### Commit Message Format

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) via Commitlint and Husky pre-commit hooks.

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic changes)
- `refactor:` - Code refactoring (no functional changes)
- `perf:` - Performance improvements
- `test:` - Adding or updating tests

**Examples:**
```bash
feat: add dark mode toggle to settings page
fix: resolve infinite loop in article list processor
docs: update React4xp architecture guide
test: add comprehensive tests for QuoteProcessor
refactor: simplify image URL generation logic
```

**Scope (optional):**
```bash
feat(article): add reading time estimation
fix(build): resolve TypeScript compilation error
```

### How to Create a New Part/Component

Follow the React4xp v6 architecture pattern with three distinct layers:

#### 1. Create the Component (in `/common/`)

```tsx
// src/main/resources/react4xp/common/MyFeature/MyFeature.tsx
import {type FC} from 'react';

interface MyFeatureProps {
  title: string;
  description: string;
}

export const MyFeature: FC<MyFeatureProps> = ({title, description}) => {
  return (
    <div className="my-feature">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
```

#### 2. Create the Processor (in `/parts/myfeature/`)

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

#### 3. Create the Part Shim (in `/parts/myfeature/`)

```tsx
// src/main/resources/react4xp/parts/myfeature/MyFeaturePart.tsx
import {MyFeature} from '/react4xp/common/MyFeature/MyFeature';
import {createPartShim} from '/react4xp/common/PartShim/PartShim';

export const MyFeaturePart = createPartShim(MyFeature);
```

#### 4. Register in componentRegistry.tsx

```tsx
import {MyFeaturePart} from '/react4xp/parts/myfeature/MyFeaturePart';

componentRegistry.addPart('lib.no:myfeature', {View: MyFeaturePart});
```

#### 5. Register in dataFetcher.ts

```tsx
import {myFeatureProcessor} from '/react4xp/parts/myfeature/MyFeatureProcessor';

dataFetcher.addPart('lib.no:myfeature', {processor: myFeatureProcessor});
```

#### 6. Create XP Part Definition

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

#### 7. Build and Test

```bash
npm run check:types:react4xp
npm run build
npm run deploy
```

### How to Add Tests

#### Component Tests

```tsx
// src/jest/client/common/MyFeature.test.tsx
import {render, screen} from '@testing-library/react';
import {MyFeature} from '/react4xp/common/MyFeature/MyFeature';

describe('MyFeature', () => {
  it('renders title and description', () => {
    render(
      <MyFeature
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
```

#### Processor Tests

```tsx
// src/jest/server/MyFeatureProcessor.test.ts
import {myFeatureProcessor} from '/react4xp/parts/myfeature/MyFeatureProcessor';

describe('myFeatureProcessor', () => {
  it('processes config correctly', () => {
    const result = myFeatureProcessor({
      component: {
        config: {
          title: 'Test',
          description: 'Test Desc'
        }
      } as any
    });

    expect(result).toEqual({
      title: 'Test',
      description: 'Test Desc'
    });
  });

  it('handles missing config with defaults', () => {
    const result = myFeatureProcessor({
      component: {
        config: {}
      } as any
    });

    expect(result.title).toBe('Default Title');
    expect(result.description).toBe('');
  });
});
```

#### Utility Tests

```tsx
// src/jest/server/utils/myUtil.test.ts
import {myUtil} from '/react4xp/utils/myUtil';

describe('myUtil', () => {
  it('transforms input correctly', () => {
    expect(myUtil('input')).toBe('expectedOutput');
  });
});
```

## Testing Guide

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- MyFeature.test.tsx
```

### Test Coverage Expectations

- **Utilities:** 80%+ coverage
- **Processors:** 70%+ coverage
- **Components:** 60%+ coverage (focus on logic, not JSX)

### Testing Best Practices

1. **Test behavior, not implementation**
   - Focus on what the component/function does, not how it does it
   - Avoid testing internal state or private methods

2. **Use descriptive test names**
   ```tsx
   // Good
   it('displays error message when API call fails', () => {})

   // Bad
   it('works', () => {})
   ```

3. **Follow the Arrange-Act-Assert pattern**
   ```tsx
   it('formats date correctly', () => {
     // Arrange
     const date = new Date('2025-01-15');

     // Act
     const result = formatDate(date);

     // Assert
     expect(result).toBe('15.01.2025');
   });
   ```

4. **Test edge cases**
   - Empty strings, null, undefined
   - Empty arrays, single items, many items
   - Boundary values (0, -1, max values)

5. **Mock external dependencies**
   ```tsx
   jest.mock('/lib/xp/content', () => ({
     get: jest.fn(() => mockContent)
   }));
   ```

6. **Keep tests focused and isolated**
   - One assertion per test (when possible)
   - Tests should not depend on each other
   - Clean up after each test

## Debugging Guide

### Common Issues and Solutions

#### Build Fails

**Issue:** `npm run build` fails with TypeScript errors

**Solution:**
```bash
# Check type errors
npm run check:types:react4xp
npm run check:types:xp

# Clean and rebuild
npm run clean
npm install
npm run build
```

#### Deploy Fails

**Issue:** `npm run deploy` fails or site doesn't appear

**Solution:**
1. Check Enonic sandbox is running
2. Verify vhost configuration (see [Sandbox Setup Guide](sandbox-setup.md))
3. Check Enonic logs:
   ```bash
   tail -f ~/.enonic/sandboxes/YOUR_SANDBOX/home/logs/server.log
   ```

#### Components Not Rendering

**Issue:** Part shows blank or error in Enonic admin

**Solution:**
1. Check browser console for JavaScript errors
2. Verify component is registered in `componentRegistry.tsx`
3. Verify processor is registered in `dataFetcher.ts`
4. Check Part file uses `createPartShim` correctly
5. Rebuild and redeploy:
   ```bash
   npm run build && npm run deploy
   ```

### How to Debug React4xp Components

#### Client-Side (Browser)

1. **Use React DevTools** browser extension
2. **Console logging** (remove before committing):
   ```tsx
   console.log('Component props:', props);
   ```
3. **Check network tab** for API calls
4. **Inspect source maps** (enabled in development mode)

#### Server-Side (Enonic XP)

1. **Use log library** (not console.log):
   ```ts
   import {logger} from '/lib/xp/log';

   logger.info('Processing component: %s', component.type);
   logger.debug('Config: %s', JSON.stringify(config));
   ```

2. **Check server logs**:
   ```bash
   tail -f ~/.enonic/sandboxes/YOUR_SANDBOX/home/logs/server.log
   ```

3. **Enable debug mode** in Enonic admin
4. **Use try-catch blocks** with detailed error messages:
   ```ts
   try {
     // risky code
   } catch (error) {
     logger.error('Error in processor: %s', error.message);
     throw error;
   }
   ```

### Troubleshooting Build Issues

#### Type Errors

```bash
# Check which tsconfig has errors
npm run check:types:react4xp  # React components
npm run check:types:xp        # Server-side code
npm run check:types:node      # Build scripts
```

#### Module Resolution Issues

- Verify import paths use absolute imports or path aliases
- Check `tsconfig.react4xp.json` for correct path mappings
- Restart TypeScript server in your editor

#### Gradle Build Issues

```bash
# Refresh dependencies
./gradlew --refresh-dependencies

# Clean and build
./gradlew clean build

# Build with stack trace for errors
./gradlew build --stacktrace
```

## Pull Request Process

### Before Submitting

Complete this checklist before creating a pull request:

- [ ] **Code compiles** - `npm run build` succeeds
- [ ] **Type checks pass** - `npm run check:types` succeeds
- [ ] **Linting passes** - `npm run lint` succeeds
- [ ] **Tests pass** - `npm test` succeeds
- [ ] **Tests added** - New features have test coverage
- [ ] **Documentation updated** - If adding new features or changing behavior
- [ ] **Commit messages follow convention** - Conventional Commits format
- [ ] **No console.log statements** - Use proper logging or remove
- [ ] **Changes work in Enonic** - Tested in local sandbox

### Creating a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/my-feature
   ```

2. **Create PR** against `develop` branch (not `master`)

3. **Fill out PR template** with:
   - Clear description of changes
   - Why the change is needed
   - How to test the changes
   - Screenshots (if UI changes)
   - Link to related issues

4. **Request review** from maintainers

### Code Review Expectations

**As a contributor:**
- Respond to feedback promptly and professionally
- Ask questions if feedback is unclear
- Make requested changes or explain why you disagree
- Update PR when review is complete

**What reviewers look for:**
- Code follows project conventions and style
- Changes are well-tested
- No unnecessary complexity
- TypeScript types are correct
- Documentation is updated
- Commit messages are meaningful

### Merge Requirements

Pull requests must meet these criteria:

- [ ] At least one approval from maintainer
- [ ] All CI checks passing
- [ ] No merge conflicts with target branch
- [ ] Follows React4xp v6 architecture
- [ ] Test coverage maintained or improved

### After Merge

1. **Delete your feature branch**:
   ```bash
   git branch -d feature/my-feature
   git push origin --delete feature/my-feature
   ```

2. **Update your fork**:
   ```bash
   git checkout develop
   git pull upstream develop
   git push origin develop
   ```

## Common Pitfalls

### React4xp v6 Architecture Gotchas

#### ❌ Don't: Import Parts from other Parts
```tsx
// WRONG - Parts should never import from other Parts
import {ArticlePart} from '/react4xp/parts/article/ArticlePart';
```

#### ✅ Do: Share components via `/common/`
```tsx
// CORRECT - Import shared components from /common/
import {Article} from '/react4xp/common/Article/Article';
```

#### ❌ Don't: Put business logic in Part files
```tsx
// WRONG - Part should only be a 4-line shim
export const ArticlePart = ({data}) => {
  const [state, setState] = useState(data);
  // ... 50 lines of logic
};
```

#### ✅ Do: Use createPartShim for all Parts
```tsx
// CORRECT - Part is just a thin wrapper
import {Article} from '/react4xp/common/Article/Article';
import {createPartShim} from '/react4xp/common/PartShim/PartShim';

export const ArticlePart = createPartShim(Article);
```

### TypeScript Common Issues

#### ❌ Don't: Use `any` type
```tsx
// WRONG - Loses type safety
const processData = (data: any) => {};
```

#### ✅ Do: Define proper interfaces
```tsx
// CORRECT - Type-safe
interface ArticleData {
  title: string;
  content: string;
}

const processData = (data: ArticleData) => {};
```

#### ❌ Don't: Suppress errors without reason
```tsx
// WRONG - Hides real issues
// @ts-ignore
const broken = data.property.that.doesnt.exist;
```

#### ✅ Do: Fix the root cause
```tsx
// CORRECT - Proper null checking
const value = data?.property?.that?.exists;
```

### Enonic XP Quirks

1. **Content paths vs URL paths** - Content paths start with `/content/`, URL paths don't
2. **Component registry must match** - Component descriptor name must exactly match registry key
3. **Server-side code runs in Nashorn** - ES5 only, no modern JavaScript features
4. **Build output matters** - Changes to `/src/` don't apply until you build and deploy

### Build System Pitfalls

1. **Development vs Production builds**
   - Development: Unminified, source maps enabled
   - Production: Minified, optimized
   - Use `npm run build:prod` for production

2. **Gradle vs npm builds**
   - `npm run build` - Uses Gradle, includes everything
   - `npm run build:assets` - Only builds assets
   - Always use full build for deployment

3. **Source maps in production**
   - Automatically disabled in production builds
   - Controlled by `NODE_ENV` environment variable

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background or experience level.

### Expected Behavior

- **Be respectful** - Treat everyone with respect and kindness
- **Be constructive** - Provide helpful, actionable feedback
- **Be inclusive** - Welcome newcomers and help them succeed
- **Be patient** - Remember everyone is learning
- **Be professional** - Keep discussions focused and productive

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or insults
- Trolling or deliberate disruption
- Publishing others' private information
- Any conduct that creates an intimidating or hostile environment

### Reporting Issues

If you experience or witness unacceptable behavior, please contact the project maintainers at the repository's issue tracker.

## Getting Help

### Documentation Resources

- **[CLAUDE.md](../CLAUDE.md)** - Complete developer guide
- **[README.md](../README.md)** - Quick start and overview
- **[Sandbox Setup Guide](sandbox-setup.md)** - Enonic configuration
- **[Roadmap Issue #31](https://github.com/Liberalistene-Developers/lib.no/issues/31)** - Project roadmap

### Ask Questions

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Pull Request Comments** - For review feedback and clarifications

### External Resources

- [Enonic XP Documentation](https://developer.enonic.com/docs)
- [React4xp Documentation](https://developer.enonic.com/docs/react4xp)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## License

By contributing to lib.no, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for contributing to lib.no! Your efforts help make the Liberalistene homepage better for everyone.
