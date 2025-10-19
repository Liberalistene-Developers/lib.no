# Content Display Components

Components for displaying text, images, and other content.

[← Back to Component Catalog](README.md)

---

## Article

**Description:** Main article display component with rich content support including hero image, author byline, and flexible title/ingress positioning

**Use Cases:**
- Blog posts and news articles
- Long-form content with rich formatting
- Articles with author attribution and publication dates
- Featured content with hero images

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Article title/heading |
| image | ImageData | No | Hero image displayed at the top |
| titleInImage | boolean | No | If true, displays title overlaid on image. If false, displays below image (default: true) |
| ingress | string | No | Article lead paragraph/summary (HTML content) |
| ingressInImage | boolean | No | If true, displays ingress overlaid on image. If false, displays in content area (default: true) |
| text | string | No | Main article content (HTML) |
| authors | Author[] | No | Array of article authors with name, URL, and image |
| datePublished | string | No | Publication date (formatted string) |
| headerColor | string | No | Header/title color (CSS color value) |
| headerPosition | string | No | Header text alignment: 'left', 'center', or 'right' |
| tags | string or string[] | No | Article tags/categories |
| description | string | No | Article meta description |

**Screenshot:**
![Article](../../screenshots/article.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-article)

**Example:**
```tsx
// Article with title and ingress overlaid on image
<ArticlePart
  title="Understanding React4xp Architecture"
  titleInImage={true}
  headerPosition="center"
  headerColor="#ffffff"
  image={{url: "/images/hero.jpg"}}
  ingress="<p>A deep dive into the React4xp v6 architecture...</p>"
  ingressInImage={true}
  text="<p>Main article content here...</p>"
  authors={[{
    authorID: "author1",
    person: "Jane Doe",
    personUrl: "/authors/jane-doe",
    image: {url: "/images/jane.jpg"}
  }]}
  datePublished="January 15, 2025"
/>

// Article with title and ingress below image
<ArticlePart
  title="News Update"
  titleInImage={false}
  image={{url: "/images/news.jpg"}}
  ingress="<p>Latest developments...</p>"
  ingressInImage={false}
  text="<p>Full article text...</p>"
  datePublished="January 18, 2025"
/>
```

---

## TextBlock

**Description:** Simple text content block with formatting options

**Use Cases:**
- Paragraph content
- Text sections
- Simple formatted text

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![TextBlock](../../screenshots/textblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-textblock)

**Example:**
```tsx
// To be documented in batch issues
```

---

## TitleBlock

**Description:** Heading component with styling options

**Use Cases:**
- Section headings
- Page titles
- Content dividers

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![TitleBlock](../../screenshots/titleblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-titleblock)

**Example:**
```tsx
// To be documented in batch issues
```

---

## ImageBlock

**Description:** Full-width hero-style image block with overlaid text content. Supports multi-colored title pieces, flexible positioning, and configurable overlay effects. Perfect for creating visually striking content sections with background imagery.

**Use Cases:**
- Hero sections with background images and overlay text
- Page headers with multi-colored titles
- Featured content blocks with background imagery
- Landing page banners with call-to-action text

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| Tag | 'h1' \| 'h2' \| 'h3' | No | HTML heading tag for the title (default: 'h1') |
| image | ImageData | No | Background image data |
| position | 'left' \| 'center' \| 'right' | No | Text content alignment/position (default: 'right') |
| title | TitleItem[] | No | Array of title pieces for multi-colored titles |
| titleClassName | string | No | Title width class: 'full', 'half', 'quart', or 'treequart' for mobile responsiveness |
| overlay | string | No | Overlay effect class (e.g., 'dark', 'light') applied to image |
| ingress | string | No | Introduction text (HTML) displayed below title |
| ingressColor | string | No | CSS color class for ingress text (default: 'standard') |

**TitleItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| title | string | Title text for this piece |
| titleColor | string | CSS color class for this title piece |
| titleNoSpace | boolean | If true, removes spacing after this title piece |

**Screenshot:**
![ImageBlock](../../screenshots/imageblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-imageblock)

**Example:**
```tsx
// Simple single-color title
<ImageBlockPart
  Tag="h1"
  image={{url: '/images/hero.jpg', alternativeText: 'Hero'}}
  position="center"
  title={[{title: 'Welcome to Liberalistene', titleColor: 'text-white'}]}
  ingress="<p>Join us today</p>"
  overlay="dark"
/>

// Multi-colored title with custom positioning
<ImageBlockPart
  Tag="h2"
  image={{url: '/images/banner.jpg'}}
  position="left"
  title={[
    {title: 'Freedom', titleColor: 'text-primary-700'},
    {title: 'and', titleColor: 'text-white'},
    {title: 'Prosperity', titleColor: 'text-primary-700'}
  ]}
  titleClassName="half"
  overlay="light"
/>

// Hero with ingress and right-aligned text
<ImageBlockPart
  Tag="h1"
  image={{url: '/images/event.jpg'}}
  position="right"
  title={[{title: 'Annual Conference 2025', titleColor: 'text-white'}]}
  ingress="<p>Register now for our biggest event of the year</p>"
  ingressColor="text-gray-200"
  overlay="dark"
/>
```

**Note:** The processor supports both simple (single title) and fancy (multiple title pieces) configurations. Legacy `title` and `headerColor` config fields are automatically converted to the new title array format. The overlay class creates a semi-transparent layer over the image to improve text readability.

---

## Quote

**Description:** Blockquote component for displaying quotations

**Use Cases:**
- Testimonials
- Cited quotes
- Pull quotes

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![Quote](../../screenshots/quote.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-quote)

**Example:**
```tsx
// To be documented in batch issues
```

---

## IntroBlock

**Description:** Two-column introduction section with image and text content. Creates a balanced layout with an image (and optional caption) on the left and title/description on the right. On mobile devices, switches to a reverse column layout for optimal readability.

**Use Cases:**
- Page introduction sections with imagery
- Feature highlights with accompanying photos
- About sections with team photos
- Product/service introductions with visual support

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| image | ImageData | No | Image displayed on the left side |
| caption | string | No | Caption text displayed below the image |
| title | string | No | Block title displayed above the description |
| description | string | No | Description/body text (HTML content) |

**Screenshot:**
![IntroBlock](../../screenshots/introblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-introblock)

**Example:**
```tsx
// Intro block with all elements
<IntroBlockPart
  image={{url: '/images/team.jpg', alternativeText: 'Our team'}}
  caption="Photo from our 2024 annual meeting"
  title="About Us"
  description="<p>Liberalistene is a political party dedicated to individual freedom and free markets. We believe in limited government and personal responsibility.</p>"
/>

// Simple intro block without caption
<IntroBlockPart
  image={{url: '/images/event.jpg'}}
  title="Join Our Movement"
  description="<p>Learn more about our mission and how you can get involved...</p>"
/>

// Intro block with description only
<IntroBlockPart
  image={{url: '/images/intro.jpg'}}
  description="<p>Welcome to Liberalistene. Discover our vision for a freer, more prosperous society.</p>"
/>
```

**Note:** The component uses a flex layout with equal-width columns (50%-10px gap each) on desktop. On mobile, it switches to a vertical column layout with reversed order (text first, image second). The title is rendered as an H2 heading. HTML description content is automatically sanitized.

---

[← Back to Component Catalog](README.md)
