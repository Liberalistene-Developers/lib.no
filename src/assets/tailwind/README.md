# Tailwind CSS Module Structure

This directory contains modular Tailwind CSS files for better organization and maintainability.

## Current Structure

```
tailwind/
├── README.md           # This file
├── theme.css          # Theme variables, design tokens
├── base.css           # Base resets, body styles
├── typography.css     # Heading and text styles
├── layouts.css        # Layout and grid system (WIP)
├── _full-legacy.css   # Original monolithic file (backup)
└── components/        # Component-specific styles (TBD)
```

## Migration Status

### ✅ Completed
- `theme.css` - Theme variables and custom variants
- `base.css` - Global resets and foundational styles
- `typography.css` - Typography system

### 🚧 In Progress
- Breaking down the 2500-line monolithic file into logical modules
- Extracting component-specific styles to `components/` folder

### 📋 To Do
- Extract layout system and grid styles
- Create individual component CSS files
- Remove `_full-legacy.css` once migration is complete

## Usage

The main `tailwind.css` imports these modules in the correct order.

## Adding New Modules

1. Create a new `.css` file in this directory or `components/`
2. Add the `@import` to the main `tailwind.css` file
3. Document it in this README

## Guidelines

- Keep files focused on a single concern
- Use clear, descriptive names
- Add comments explaining complex sections
- Keep files under 200 lines when possible
