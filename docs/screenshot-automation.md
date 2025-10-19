# Screenshot Automation for Component Catalog

This document explains how to use the automated screenshot capture tool to generate screenshots for the component catalog.

## Overview

The screenshot automation tool (`util/capture-screenshots.ts`) uses Playwright to automatically navigate through Storybook stories and capture screenshots of all components. This eliminates the need for manual screenshot capture and ensures consistency across all component images.

## Prerequisites

1. **Playwright browsers installed**
   ```bash
   npx playwright install chromium
   ```

2. **Storybook running**
   ```bash
   npm run storybook
   ```
   Storybook must be running on `http://localhost:6006` before running the screenshot tool.

## Usage

### Quick Start

1. Start Storybook:
   ```bash
   npm run storybook
   ```

2. In a new terminal, run the screenshot tool:
   ```bash
   npm run screenshots
   ```

The tool will:
- Launch a headless Chromium browser
- Navigate to each component's Storybook story
- Capture a screenshot
- Save it to `docs/screenshots/` with kebab-case naming

### Output

Screenshots are saved to:
```
docs/screenshots/
├── article.png
├── button.png
├── candidatepage.png
└── ... (38 total)
```

### Naming Convention

Screenshots are named using kebab-case matching the component names in the documentation:
- `article` → `article.png`
- `candidateblock` → `candidateblock.png`
- `programme-main` → `programme-main.png`

## Configuration

The screenshot tool can be configured by editing `util/capture-screenshots.ts`:

```typescript
const STORYBOOK_URL = 'http://localhost:6006';          // Storybook URL
const SCREENSHOTS_DIR = join(process.cwd(), 'docs', 'screenshots');
const VIEWPORT = {width: 1200, height: 800};           // Screenshot dimensions
const WAIT_FOR_RENDER = 3000;                          // ms to wait for rendering
const PAGE_TIMEOUT = 60000;                            // ms page load timeout
```

### Component Mapping

Components are mapped to their Storybook story paths in the `COMPONENT_MAP` object:

```typescript
const COMPONENT_MAP: Record<string, string> = {
  'article': 'parts-article--normal',
  'button': 'parts-button--normal',
  // ... more mappings
};
```

To add a new component:
1. Add an entry to `COMPONENT_MAP`
2. Use the story ID from Storybook URL (e.g., `?id=parts-article--normal`)

## Troubleshooting

### Storybook Not Running

```
❌ Error: Storybook is not running!
   Please start Storybook first: npm run storybook
```

**Solution:** Start Storybook before running the screenshot tool.

### Module Resolution Errors

If Storybook fails to build with module resolution errors:

1. Check `.storybook/main.ts` includes the `/react4xp` alias:
   ```typescript
   '/react4xp': path.resolve(__dirname, '../src/main/resources/react4xp')
   ```

2. Restart Storybook after configuration changes

### Timeout Errors

If screenshots timeout:

1. Increase `PAGE_TIMEOUT` in the script
2. Increase `WAIT_FOR_RENDER` for slower components
3. Check that the story ID in `COMPONENT_MAP` is correct

### Missing Screenshots

If some screenshots are missing:

1. Check the component exists in `COMPONENT_MAP`
2. Verify the story ID matches the Storybook URL
3. Check the console output for error messages

## Technical Details

### How It Works

1. **Browser Launch**: Playwright launches a headless Chromium browser
2. **Story Navigation**: For each component in `COMPONENT_MAP`:
   - Navigate to `http://localhost:6006/iframe.html?id={storyId}&viewMode=story`
   - Wait for DOM content to load (`domcontentloaded`)
   - Wait additional time for React rendering
3. **Screenshot Capture**: Take a screenshot of the viewport
4. **Save**: Save as PNG to `docs/screenshots/{component-name}.png`

### Dependencies

- **Playwright** (`@playwright/test`, `playwright`) - Browser automation
- **tsx** - TypeScript execution
- **Node.js** - Runtime environment

### Viewport Size

Screenshots are captured at **1200x800px** which provides:
- Good detail for component documentation
- Reasonable file size
- Standard desktop viewport simulation

### File Format

- **Format**: PNG
- **Compression**: Standard PNG compression
- **Alpha Channel**: Preserved for transparency

## Integration with Component Catalog

After running the screenshot tool, update the component catalog documentation to reference the screenshots:

```markdown
**Screenshot:**
![Article](../screenshots/article.png)
```

## Future Improvements

Potential enhancements:

1. **Automatic catalog updates** - Script could update markdown files with screenshot paths
2. **Multiple viewports** - Capture mobile, tablet, and desktop views
3. **Visual regression testing** - Compare screenshots over time
4. **Image optimization** - Automatically compress images
5. **Parallel capture** - Capture multiple screenshots simultaneously

## Related Files

- **Screenshot Tool**: `util/capture-screenshots.ts`
- **Package Script**: `package.json` → `scripts.screenshots`
- **Storybook Config**: `.storybook/main.ts`
- **Component Catalog**: `docs/components/*.md`
- **Screenshots Directory**: `docs/screenshots/`

## Contributing

When adding new components:

1. Create the Storybook story
2. Add mapping to `COMPONENT_MAP` in `util/capture-screenshots.ts`
3. Run `npm run screenshots`
4. Update component catalog documentation with screenshot reference

---

**Created:** 2025-10-19
**Issue:** [#54 - Component Catalog - Screenshots & Polish](https://github.com/Liberalistene-Developers/lib.no/issues/54)
