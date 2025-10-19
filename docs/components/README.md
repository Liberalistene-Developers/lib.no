# Component Catalog

This document provides a comprehensive reference for all React components used in the lib.no project. Each component is documented with its purpose, use cases, props, and examples.

## Purpose

The Component Catalog serves as:

- **Documentation Reference** - Complete documentation for all available components
- **Onboarding Guide** - Helps new developers understand component capabilities
- **Design System** - Establishes consistent patterns across the application
- **Development Aid** - Quick reference during development

## How to Use This Catalog

1. **Browse by Category** - Components are organized into logical categories (see links below)
2. **View in Storybook** - Interactive examples at http://localhost:6006 (run `npm run storybook`)
3. **Check Props** - Each component documents its required and optional props
4. **See Examples** - Code examples show typical usage patterns

## Component Categories

Components are organized into the following category files:

- **[Layout & Navigation](layout-navigation.md)** - Site structure and navigation components (2 components)
- **[Content Display](content-display.md)** - Components for displaying text and media (9 components)
- **[Lists & Collections](lists-collections.md)** - Components for displaying multiple items (10 components)
- **[Interactive Components](interactive.md)** - User interaction components (3 components)
- **[Forms & User Input](#forms--user-input)** - Form fields and input components (none yet)
- **[Special Purpose](special-purpose.md)** - Domain-specific components (18 components)

## Documentation Style Guide

When documenting components, follow these guidelines:

### Component Entry Structure

Each component entry should include:

1. **Component Name** - Use the component's display name (PascalCase)
2. **Description** - Brief one-line description of purpose
3. **Use Cases** - 2-4 bullet points of common usage scenarios
4. **Props Table** - All props with type, requirement status, and description
5. **Screenshot** - Visual reference (placeholder initially)
6. **Storybook Link** - Link to interactive example
7. **Example Code** - Typical usage example in TSX

### Props Documentation

Props should be documented with:

- **Prop Name** - Exact prop name as used in code
- **Type** - TypeScript type (string, number, boolean, or interface name)
- **Required** - Yes/No indicator
- **Description** - Clear explanation of purpose and usage

### Code Examples

- Use TypeScript (TSX) syntax
- Show realistic, practical examples
- Include common prop combinations
- Keep examples concise but complete

### Writing Style

- Use clear, concise language
- Be specific about component purpose
- Focus on practical usage
- Maintain consistent formatting

## Contributing to the Catalog

When adding or updating components:

1. Follow the template structure exactly
2. Test component in Storybook before documenting
3. Capture screenshots at standard viewport size
4. Verify all props are documented
5. Include practical code examples
6. Link to related components where applicable

## Related Documentation

- **[CLAUDE.md](../../CLAUDE.md)** - Complete developer guide and architecture
- **[React4xp v6 Architecture](../../CLAUDE.md#react4xp-v6-architecture)** - Component architecture patterns
- **[Storybook](http://localhost:6006)** - Interactive component examples
- **[GitHub Issues #50-54](https://github.com/Liberalistene-Developers/lib.no/issues)** - Component catalog tracking issues

---

**Last Updated:** 2025-10-19
**Version:** 2.0.0
**Status:** Split into category files for better maintainability
