# Layout & Navigation Components

Components that define page structure and help users navigate the site.

[← Back to Component Catalog](README.md)

---

## FancyHeader

**Description:** A visually enhanced header component with a two-column layout featuring a prominently styled title with purple background and shadow effects on the left, and a main image on the right. Includes an optional decorative floating effect image. Mobile responsive with single-column layout.

**Use Cases:**
- Page headers with prominent styling
- Hero sections with decorative elements
- Feature announcements with visual impact
- Landing page headers

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Header title text displayed with purple background |
| image | ImageData | No | Main header image displayed on the right side (desktop) or top (mobile) |
| effect | ImageData | No | Decorative effect image shown floating on desktop (hidden on mobile) |

**Screenshot:**
![FancyHeader](../../screenshots/fancyheader.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-fancyheader)

**Example:**
```tsx
// Header with title, main image, and decorative effect
<FancyHeaderPart
  title="Welcome to Liberalistene"
  image={{url: '/images/header.jpg', alternativeText: 'Header'}}
  effect={{url: '/images/effect.png', alternativeText: 'Decoration'}}
/>

// Simple header with just title and image
<FancyHeaderPart
  title="Our Mission"
  image={{url: '/images/mission.jpg', alternativeText: 'Mission'}}
/>

// Title-only header
<FancyHeaderPart
  title="About Us"
/>
```

**Note:** The layout uses a 30/70 split on desktop (title/image) and switches to single-column on mobile with the image displayed first. The title features a purple background with shadow effects. The effect image is hidden on mobile devices.

---

## Submenu

**Description:** A flexible navigation submenu that displays a grid of menu items. Items can be selected manually or populated dynamically via content queries. Renders as a responsive flexbox grid with centered content.

**Use Cases:**
- Section navigation submenus
- Call-to-action button groups
- Dynamic navigation based on content queries
- Context-sensitive navigation options
- Sidebar menu displays

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | MenuItemType[] | No | Array of menu items to display. Each item has itemID, title, and url properties |

**Screenshot:**
![Submenu](../../screenshots/submenu.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-submenu)

**Example:**
```tsx
// Manual menu items
<SubmenuPart
  items={[
    {itemID: '1', title: 'Join Us', url: '/join'},
    {itemID: '2', title: 'Donate', url: '/donate'},
    {itemID: '3', title: 'Volunteer', url: '/volunteer'}
  ]}
/>

// Items populated by processor from content query
// The processor supports two modes:
// 1. Manual selection - Select specific pages in the admin
// 2. Query selection - Dynamically fetch pages from a content root
<SubmenuPart
  items={queryResults}
/>
```

**Note:** The component adapts to different screen sizes - displays as a flex-wrap grid on desktop and switches to single-column layout on mobile. Items are rendered using the MenuItem component with consistent styling.

---

[← Back to Component Catalog](README.md)
