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

**Description:** Image display component with responsive sizing

**Use Cases:**
- Featured images
- Content illustrations
- Photo galleries

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![ImageBlock](../../screenshots/imageblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-imageblock)

**Example:**
```tsx
// To be documented in batch issues
```

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

**Description:** Introduction or summary block component

**Use Cases:**
- Article introductions
- Page summaries
- Featured content preview

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![IntroBlock](../../screenshots/introblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-introblock)

**Example:**
```tsx
// To be documented in batch issues
```

---

[← Back to Component Catalog](README.md)
