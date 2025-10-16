# Legacy SCSS Reference

This folder contains the old SCSS files from the React4xp v3 migration. These files are **NOT imported** or used in the build.

## Purpose

These files are kept as **reference only** to:
- Look up old CSS implementations when implementing missing styles
- Understand how components were styled in v3
- Port styling logic to Tailwind CSS utilities

## Structure

- `foundation/` - Base styles (colors, typography, grids, etc.)
- `parts/` - Component-specific styles
- `legacy.scss` - Main legacy import file

## Migration Strategy

When implementing missing CSS:
1. Check the relevant file in this folder for the old implementation
2. Convert the styling to Tailwind CSS utilities in the component's TSX file
3. Add custom CSS to `src/assets/tailwind.css` only if Tailwind utilities are insufficient

## DO NOT

- Import these files into the build
- Edit these files (they're for reference only)
- Use these SCSS selectors in new code (use Tailwind utilities instead)
