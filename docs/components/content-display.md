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
![Article](../../screenshots/article.webp)

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

**Description:** A centered text content block with optional title. Displays formatted HTML content in a clean, vertically centered column layout with flexible title styling.

**Use Cases:**
- Text-heavy content sections
- About sections with formatted paragraphs
- Information blocks with optional headers
- Policy and terms content
- Article subsections

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Block title displayed as large bold heading (50px) |
| titleColor | string | No | CSS color class for the title (e.g., 'text-primary-700') |
| text | string | No | Main text content (HTML) rendered with SafeHtml for security |

**Screenshot:**
![TextBlock](../../screenshots/textblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-textblock)

**Example:**
```tsx
// Text block with colored title
<TextBlockPart
  title="About Us"
  titleColor="text-primary-700"
  text="<p>We are a political party dedicated to individual liberty and free markets...</p>"
/>

// Text only (no title)
<TextBlockPart
  text="<p>This is a simple paragraph of content.</p>"
/>

// Title only
<TextBlockPart
  title="Coming Soon"
  titleColor="text-blue-600"
/>
```

**Note:** The component renders nothing if both title and text are empty. Text content is processed via SafeHtml for XSS protection. The layout uses flexbox with centered alignment and vertical spacing.

---

## TitleBlock

**Description:** Full-width hero-style title display with background image and overlaid content. Similar to ImageBlock but specifically optimized for title/heading display with support for both simple single-color and fancy multi-color title segments. Perfect for page headers and hero sections with customizable positioning and overlay effects.

**Use Cases:**
- Page hero headers with background images
- Landing page title sections with multi-colored titles
- Featured content headers with positioning control
- Title displays with subtitle/ingress text
- Hero sections with custom overlay effects

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| Tag | 'h1' \| 'h2' \| 'h3' | No | HTML heading tag for the title (default: 'h1') |
| image | ImageData | No | Background image data (optimized to 'full' size) |
| position | 'left' \| 'center' \| 'right' | No | Text content alignment/position (default: 'right') |
| title | TitlePiece[] | No | Array of title pieces for single or multi-colored titles |
| titleClassName | '' \| 'half' \| 'quart' \| 'treequart' \| 'full' | No | Title width class for mobile responsiveness (default: 'full') |
| overlay | string | No | Overlay effect class (e.g., 'overlay dark', 'overlay light') applied to image |
| ingress | string \| boolean | No | Introduction/subtitle text (HTML) displayed below title |
| ingressColor | string | No | CSS color class for ingress text (default: 'standard') |

**TitlePiece Structure:**
| Property | Type | Description |
|----------|------|-------------|
| title | string | Title text for this piece |
| titleColor | string | CSS color class for this title piece |
| titleNoSpace | boolean | If true, removes spacing after this title piece |

**Screenshot:**
![TitleBlock](../../screenshots/titleblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-titleblock)

**Example:**
```tsx
// Simple single-color title (simple mode)
<TitleBlockPart
  Tag="h1"
  image={{url: '/images/hero.jpg', alternativeText: 'Hero background'}}
  position="center"
  title={[{title: 'Welcome to Liberalistene', titleColor: 'text-white'}]}
  ingress="Building a freer, more prosperous society"
  ingressColor="text-gray-200"
  overlay="overlay dark"
  titleClassName="full"
/>

// Fancy multi-color title (fancy mode)
<TitleBlockPart
  Tag="h1"
  image={{url: '/images/banner.jpg'}}
  position="left"
  title={[
    {title: 'Individual', titleColor: 'text-blue-500'},
    {title: 'Freedom', titleColor: 'text-red-500'},
    {title: 'Matters', titleColor: 'text-green-500'}
  ]}
  overlay="overlay light"
  titleClassName="half"
/>

// Simple title with legacy config support
<TitleBlockPart
  Tag="h2"
  image={{url: '/images/page-header.jpg'}}
  position="right"
  title={[{title: 'Our Mission', titleColor: 'text-primary-700'}]}
  ingress="<p>Dedicated to liberty and free markets</p>"
/>
```

**Architecture:**
- **Processor:** `TitleBlockProcessor.ts` - Handles both simple and fancy title configurations, processes images, supports legacy title fields
- **Component:** `TitleBlock.tsx` - Renders full-width image block with positioned title overlay
- **Configuration Modes:**
  - **Simple:** Single title with one color (uses titleSet.simple or legacy title/headerColor fields)
  - **Fancy:** Multiple title segments with individual colors (uses titleSet.fancy.titles array)
- **Data Flow:** Config → determine mode → process titles → imageUrl() → render with overlay

**Note:** The processor automatically detects configuration mode (simple vs. fancy) and supports legacy title/headerColor fields as fallback. Background images are always processed with 'full' size. The overlay class is prefixed with 'overlay' when present. Title is always rendered in an array format, even for simple mode. Mobile size class defaults to 'full' if not specified.

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

**Description:** Political quote component with full author attribution, images, and supporting context. Displays quotes with linked author profiles and optional quote imagery.

**Use Cases:**
- Political statements and policy positions
- Party member testimonials with attribution
- Campaign quotes with author details
- Featured statements with multiple authors
- Policy endorsements with context

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Quote title/heading |
| image | ImageData | No | Quote-related image (background or context image) |
| authors | QuoteAuthor[] | No | Array of authors with name, URL, and profile image |
| quote | string | No | The quote text (HTML content) |
| qoute | string | No | Legacy field for quote text (backwards compatibility - typo in original) |
| description | string | No | Additional context or description (HTML content) |

**QuoteAuthor Interface:**
| Field | Type | Description |
|-------|------|-------------|
| authorID | string | Unique identifier for the author |
| person | string | Author's name |
| personUrl | string | URL to author's profile page |
| image | string | Author's profile image URL (96x128 block size) |

**Screenshot:**
![Quote](../../screenshots/quote.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-quote)

**Example:**
```tsx
// Political quote with author attribution
<QuotePart
  title="On Freedom of Choice"
  image={{url: "/images/quote-bg.jpg", alternativeText: "Quote background"}}
  quote="<p>Freedom is the foundation of prosperity and human dignity.</p>"
  description="<p>From the 2024 campaign trail</p>"
  authors={[
    {
      authorID: "person1",
      person: "Jane Smith",
      personUrl: "/people/jane-smith",
      image: "https://example.com/jane-96x128.jpg"
    },
    {
      authorID: "person2",
      person: "John Doe",
      personUrl: "/people/john-doe",
      image: "https://example.com/john-96x128.jpg"
    }
  ]}
/>
```

**Architecture:**
- **Processor:** `QuoteProcessor.ts` - Fetches author details from person content, processes HTML, generates author URLs
- **Component:** `Quote.tsx` - Renders quote with author list and SafeHtml for content
- **Data Flow:** Author IDs → getContent() → person data → generate URLs/images → render with links
- **Legacy Support:** Handles both 'quote' and 'qoute' (typo) field names for backwards compatibility

**Note:** The processor normalizes the author field (handles both single string and array), fetches full author details including profile images (96x128 block size), and filters out any non-existent authors. Both quote text and description are processed via processHtml for safe rendering.

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

## MissionsBlock

**Description:** Displays the party's core political missions in a responsive grid layout. Each mission consists of an icon/image, title, and description text. Perfect for showcasing key values, principles, or policy positions.

**Use Cases:**
- Displaying party missions and core values
- Showcasing key policy positions
- Highlighting organizational principles
- Feature grids with icons and descriptions

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Optional heading text for the missions section |
| headingClassName | string | No | CSS class for heading alignment (e.g., 'center') |
| items | MissionItem[] | No | Array of mission items to display |

**MissionItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| title | string | Mission title/heading |
| description | string | Mission description text (HTML) |
| image | string | URL to mission icon/image |

**Screenshot:**
![MissionsBlock](../../screenshots/missionsblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-missionsblock)

**Example:**
```tsx
// Missions grid with centered heading
<MissionsBlockPart
  title="Our Core Missions"
  headingClassName="center"
  items={[
    {
      title: "Economic Freedom",
      description: "<p>Reduce government spending and lower taxes to promote economic growth and individual prosperity.</p>",
      image: "/icons/economy.svg"
    },
    {
      title: "Individual Liberty",
      description: "<p>Protect individual rights and personal freedoms from government overreach.</p>",
      image: "/icons/liberty.svg"
    },
    {
      title: "Free Markets",
      description: "<p>Support free market competition and reduce unnecessary regulations.</p>",
      image: "/icons/markets.svg"
    }
  ]}
/>

// Simple missions grid without title
<MissionsBlockPart
  items={[
    {
      title: "Transparency",
      description: "<p>Open and accountable government.</p>",
      image: "/icons/transparency.svg"
    },
    {
      title: "Innovation",
      description: "<p>Encourage entrepreneurship and innovation.</p>",
      image: "/icons/innovation.svg"
    }
  ]}
/>
```

**Note:** The component displays missions in a 2-column grid on desktop and switches to a single column on mobile devices. Returns null if no items are provided. Each mission is rendered using the Mission component internally.

---

## Person

**Description:** Displays detailed information about an individual person including profile image, biography, and contact information. Supports both short and full descriptions with an optional email contact link.

**Use Cases:**
- Person profile pages
- Team member bios
- Author profiles
- Candidate information pages
- Leadership profiles

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Person's name (displayed as H1) |
| image | ImageData | No | Person's profile image (optimized as 192x256 block) |
| shortDescription | string | No | Brief introduction/summary (HTML, displayed with 'ingress' class) |
| description | string | No | Full biography/description (HTML, displayed as div with 'description' class) |
| email | string | No | Person's email address |
| emailPrefix | string | No | Text to prefix before the person's name in email link (e.g., "Contact", "Email") |

**Screenshot:**
![Person](../../screenshots/person.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-person)

**Example:**
```tsx
// Full person profile with email
<PersonPart
  title="John Doe"
  image={{url: '/images/john.jpg', alternativeText: 'John Doe photo'}}
  shortDescription="<p>Member of Parliament and economic policy expert.</p>"
  description="<p>John has been serving in Parliament since 2015, focusing on economic freedom and tax reform. He holds a degree in Economics from the University of Oslo and previously worked as a financial analyst.</p>"
  email="john.doe@liberalistene.org"
  emailPrefix="Contact"
/>

// Simple person profile without email
<PersonPart
  title="Jane Smith"
  image={{url: '/images/jane.jpg'}}
  shortDescription="<p>Local branch leader and community organizer.</p>"
  description="<p>Jane has been active in the party since 2018 and currently leads the Oslo branch.</p>"
/>

// Minimal person display
<PersonPart
  title="Erik Hansen"
  description="<p>Party member and volunteer coordinator.</p>"
/>
```

**Note:** The component uses processHtml() to sanitize all HTML content. The email link displays "[emailPrefix] [title]" when emailPrefix is provided, or just the title if not. Images are automatically optimized to 192x256 block format by the processor.

---

[← Back to Component Catalog](README.md)
