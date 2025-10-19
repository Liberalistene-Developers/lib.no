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

**Description:** Navigation submenu for secondary navigation options

**Use Cases:**
- Section navigation
- Nested menu items
- Contextual navigation

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![Submenu](../../screenshots/submenu.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-submenu)

**Example:**
```tsx
// To be documented in batch issues
```

---

[← Back to Component Catalog](README.md)
