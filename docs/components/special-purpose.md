# Special Purpose Components

Domain-specific components designed for particular use cases.

[← Back to Component Catalog](README.md)

---

## Board

**Description:** Board member display with special layout where the first member is prominently displayed at the top and remaining members are shown in a grid below

**Use Cases:**
- Organization board with featured chair/president
- Committee members with highlighted leader
- Leadership team with emphasized top position
- Executive board displays

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| board | BoardMember[] | No | Array of board members to display |
| imagesize | string | No | Size of member images: 'small', 'medium', or 'large' (default: 'medium') |
| imagetype | boolean | No | If true, uses round/circular images (default: false) |
| showemail | string | No | Email display mode: 'no' (none), 'first' (only first member), or 'all' (all members) (default: 'no') |
| showDescriptions | boolean | No | If true, shows member descriptions (default: false) |

**Screenshot:**
![Board](../../screenshots/board.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-board)

**Example:**
```tsx
// Board with featured first member
<BoardPart
  board={[
    {
      itemId: "1",
      name: "Jane Doe",
      role: "Chair",
      email: "jane@example.com",
      image: {url: "/images/jane.jpg"}
    },
    {
      itemId: "2",
      name: "John Smith",
      role: "Vice Chair",
      email: "john@example.com",
      image: {url: "/images/john.jpg"}
    },
    // Additional members...
  ]}
  imagesize="medium"
  imagetype={true}
  showemail="first"
  showDescriptions={true}
/>
```

**Note:** The first member in the array is displayed prominently at the top with larger styling, while remaining members appear in a grid below.

---

## BoardPresentation

**Description:** Two-column board presentation with optional highlighted member on one side and complete member list on the other. Supports flexible layout with reversal and highlighting options.

**Use Cases:**
- Board presentations with featured member
- Committee displays with highlighted chair
- Organizational leadership overview
- Local branch presentations
- Group member showcases

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Main title for the board presentation |
| boardTitle | string | No | Title for the members list section |
| board | BoardMember[] | No | Array of board members to display |
| description | string | No | HTML description text displayed near highlighted member |
| memberHighlighted | string | No | Highlighting mode: 'yes' (with image), 'noimage' (without image), or 'no' (none) (default: 'yes') |
| noHighlighting | boolean | No | If true, disables member highlighting entirely (default: false) |
| imagesize | string | No | Size of member images: 'small', 'medium', or 'large' (default: 'medium') |
| imagetype | boolean | No | If true, uses round/circular images (default: false) |
| showEmail | string | No | Email visibility: 'no' (none), 'first' (only highlighted member), or 'all' (all members) (default: 'no') |
| reverseOrder | boolean | No | If true, reverses the two-column layout order (default: false) |

**Screenshot:**
![BoardPresentation](../../screenshots/boardpresentation.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-boardpresentation)

**Example:**
```tsx
// Board presentation with highlighted member
<BoardPresentationPart
  title="Our Leadership"
  boardTitle="Board Members 2025"
  board={boardMembers}
  memberHighlighted="yes"
  description="<p>Meet our chair who leads the organization...</p>"
  imagesize="medium"
  imagetype={true}
  showEmail="first"
/>

// Simple list without highlighting
<BoardPresentationPart
  title="Committee Members"
  boardTitle="Full Roster"
  board={members}
  noHighlighting={true}
  showEmail="all"
/>

// Reversed layout with highlighted member
<BoardPresentationPart
  title="Regional Board"
  boardTitle="Members"
  board={regionalBoard}
  memberHighlighted="yes"
  reverseOrder={true}
  imagesize="large"
/>
```

**Note:** The first member in the board array is used for highlighting when `memberHighlighted` is enabled. Use `reverseOrder` to swap the positions of the highlighted member column and the members list column.

---

## Book

**Description:** Individual book display with cover image, author information, and rich content including ingress and full text

**Use Cases:**
- Book detail pages with full content
- Book reviews with author attribution
- Reading recommendations with descriptions
- Library catalog item pages

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Book title |
| image | ImageData | No | Book cover image data |
| authors | Author[] | No | Array of authors with name, URL, and profile image |
| ingress | string | No | Short introductory text about the book (HTML content) |
| text | string | No | Full text content or description of the book (HTML) |
| description | string | No | Alternative description field (fallback for text) |
| tags | string[] | No | Topic tags associated with the book |

**Screenshot:**
![Book](../../screenshots/book.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-book)

**Example:**
```tsx
// Book with full details
<BookPart
  title="Liberal Manifesto"
  image={{url: '/books/manifesto.jpg', displayName: 'Cover'}}
  authors={[
    {
      authorID: '1',
      person: 'John Doe',
      personUrl: '/authors/john',
      image: '/authors/john.jpg'
    }
  ]}
  ingress="<p>An introduction to liberal thought and principles.</p>"
  text="<p>Full book content here...</p>"
/>

// Simple book with description only
<BookPart
  title="Economic Freedom"
  image={{url: '/books/economic.jpg'}}
  description="<p>A guide to free market economics.</p>"
/>
```

**Note:** The `text` prop takes precedence over `description` if both are provided. Author images and links are optional. HTML content is automatically sanitized.

---

## CandidateBlock

**Description:** Displays a list of local branch candidates in a grid layout with their contact information and positions. Returns null if no candidates are provided.

**Use Cases:**
- Local branch candidate listings
- Election candidate displays
- Regional candidate showcases
- Committee member listings with positions

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Block title displayed above the candidates |
| headingClassName | string | No | CSS class name for the heading container (e.g., 'center') |
| items | CandidateItem[] | No | Array of candidate items to display |

**CandidateItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| title | string | Alternative title for the candidate |
| name | string | Candidate's name |
| position | string | Candidate's position/role (e.g., "1", "2" for list position) |
| image | object | Candidate's profile image with `url` property |
| phone | string | Candidate's phone number |
| email | string | Candidate's email address |

**Screenshot:**
![CandidateBlock](../../screenshots/candidateblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-candidateblock)

**Example:**
```tsx
// Candidate block with multiple candidates
<CandidateBlockPart
  title="Our Candidates 2025"
  headingClassName="center"
  items={[
    {
      name: 'John Doe',
      position: '1',
      email: 'john@example.com',
      phone: '+47 123 45 678',
      image: { url: '/images/john.jpg' }
    },
    {
      name: 'Jane Smith',
      position: '2',
      email: 'jane@example.com',
      image: { url: '/images/jane.jpg' }
    }
  ]}
/>

// Simple candidate block without heading class
<CandidateBlockPart
  title="Regional Candidates"
  items={[
    { name: 'Alice Johnson', position: '1' },
    { name: 'Bob Anderson', position: '2' }
  ]}
/>
```

**Note:** The component returns null if no items are provided. Each candidate is rendered using the `LBCandidate` component. Contact information (email, phone) is optional.

---

## CandidatePage

**Description:** Full candidate detail page with two layout options: a fancy stylized header with layered images and trapezoid design, or a simpler header with image and text side-by-side. Includes introduction and full biography.

**Use Cases:**
- Individual candidate profile pages
- Campaign landing pages with full bios
- Political candidate biography pages
- Election candidate detail views

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| fancyImage | boolean | No | If true, uses fancy layout with layered images (default: true) |
| artImage | ImageData | No | Decorative art/background image for fancy layout |
| image | ImageData | No | Candidate's profile image |
| title | string | No | Candidate's name |
| position | string | No | Candidate's position/role and location (e.g., "Party Leader, Oslo") |
| ingress | string | No | Introduction text about the candidate (HTML content) |
| description | string | No | Full biography or description (HTML content) |

**Screenshot:**
![CandidatePage](../../screenshots/candidatepage.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-candidatepage)

**Example:**
```tsx
// Fancy layout with decorative background
<CandidatePagePart
  fancyImage={true}
  artImage={{url: '/images/art-bg.jpg', alternativeText: 'Background'}}
  image={{url: '/images/john-doe.jpg', alternativeText: 'John Doe'}}
  title="John Doe"
  position="Party Leader, Oslo"
  ingress="<p>Leading the change for a better tomorrow...</p>"
  description="<p>Full biography with extensive political experience...</p>"
/>

// Simple layout without fancy image
<CandidatePagePart
  fancyImage={false}
  image={{url: '/images/jane-smith.jpg', alternativeText: 'Jane Smith'}}
  title="Jane Smith"
  position="Council Candidate, Bergen"
  ingress="<p>Experienced politician...</p>"
  description="<p>Detailed background and platform...</p>"
/>
```

**Note:** The processor automatically merges candidate page data with referenced person data from the content repository. Page data takes precedence over person data for fields like image, ingress, and description. HTML content is automatically sanitized.

---

## CandidatePresentation

**Description:** Displays candidates in a presentation grid with optional highlighting of the first candidate in a larger layout. Supports both manual selection and query-based candidate fetching from the content repository.

**Use Cases:**
- Election candidate showcases with featured candidate
- Campaign materials with highlighted leader
- Candidate portfolio presentations
- Political team displays with emphasis on key member

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | CandidateItem[] | No | Array of candidate items to display |
| highlighted | boolean | No | If true, displays first candidate larger/highlighted (default: true) |
| preText | string | No | Text prefix to display before the highlighted candidate's name |

**CandidateItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| itemID | string | Unique identifier for the candidate |
| name | string | Candidate's name |
| image | string | URL to candidate's profile image |
| place | string | Candidate's location (e.g., "Oslo", "Bergen") |
| position | string | Candidate's position/role |
| ingress | string | Short description or bio |
| url | string | Link to candidate's full profile page |

**Screenshot:**
![CandidatePresentation](../../screenshots/candidatepresentation.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-candidatepresentation)

**Example:**
```tsx
// Candidate presentation with highlighted first member
<CandidatePresentationPart
  items={[
    {
      itemID: "1",
      name: "Jane Smith",
      image: "https://example.com/jane.jpg",
      place: "Oslo",
      position: "Party Leader",
      ingress: "Experienced politician and advocate...",
      url: "/candidates/jane-smith"
    },
    {
      itemID: "2",
      name: "John Doe",
      image: "https://example.com/john.jpg",
      place: "Bergen",
      position: "Vice Chair",
      ingress: "Policy expert with years of experience...",
      url: "/candidates/john-doe"
    }
  ]}
  highlighted={true}
  preText="Featured candidate:"
/>

// Simple grid without highlighting
<CandidatePresentationPart
  items={candidates}
  highlighted={false}
/>
```

**Note:** The processor supports both manual candidate selection and query-based fetching via the content repository. When candidates reference person content, the component merges candidate and person data (candidate data takes precedence). The first candidate is displayed larger when `highlighted` is true.

---

## Event

**Description:** Comprehensive event page component displaying full event information including header image with title/ingress positioning options, detailed description, agenda with schedule, speakers and organizers, location details with interactive Leaflet map, and contact information. Uses a two-column layout with main content (2/3 width) and location sidebar (1/3 width).

**Use Cases:**
- Full event detail pages with maps and schedules
- Conference pages with multi-day agendas
- Meeting announcements with speaker information
- Political gathering pages with location and contact details

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Event title/name |
| titleInImage | boolean | No | If true, displays title overlaid on header image |
| headerColor | string | No | Title color when displayed in image (CSS color value) |
| headerPosition | string | No | Title position in image: 'left', 'center', or 'right' |
| image | ImageData | No | Header image for the event |
| ingress | string | No | Short introductory text/summary (HTML) |
| ingressInImage | boolean | No | If true, displays ingress overlaid on header image |
| description | string | No | Full event description (HTML) |
| date | string | No | Event date (formatted string) |
| time | string | No | Event time (formatted string) |
| from | string | No | Event start date/time (ISO format) |
| to | string | No | Event end date/time (ISO format) |
| location | object | No | Location object with `address` property |
| map | number[] | No | Map coordinates [latitude, longitude] for interactive map |
| email | string | No | Contact email for the event |
| speakers | Person[] | No | Array of speaker objects with name, URL, and image |
| organizers | Person[] | No | Array of organizer objects with name, URL, and image |
| schedules | Schedule[] | No | Array of schedule objects with agenda items |
| informationLabel | string | No | Custom label for information section |
| moreInformationLabel | string | No | Custom label for contact section |
| locationLabel | string | No | Custom label for location section |
| contactLabel | string | No | Custom label text before contact email |
| placeLabel | string | No | Custom label for place/venue display |
| agendaLabel | string | No | Custom label for agenda/schedule section |
| dateLabel | string | No | Custom label text before date |
| timeLabel | string | No | Custom label text before time |

**Schedule Structure:**
| Property | Type | Description |
|----------|------|-------------|
| name | string | Schedule section name (e.g., "Day 1") |
| date | string | Schedule date |
| descriptions | string | Schedule section description (HTML) |
| topics | Topic[] | Array of topics/sessions |

**Topic Structure:**
| Property | Type | Description |
|----------|------|-------------|
| title | string | Topic/session title |
| start | string | Start time (e.g., "10:00") |
| duration | string | Duration in Norwegian format (e.g., "2 timer 30 min") |
| description | string | Topic description (HTML) |
| report | string | Post-event report/summary (HTML) |
| speakers | Person[] | Speakers for this topic |

**Screenshot:**
![Event](../../screenshots/event.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-event)

**Example:**
```tsx
// Full event with map and schedule
<EventPart
  title="Annual Conference 2025"
  titleInImage={true}
  headerColor="#ffffff"
  headerPosition="center"
  image={{url: '/events/conference.jpg', alternativeText: 'Conference hall'}}
  ingress="<p>Join us for our annual conference</p>"
  ingressInImage={true}
  description="<p>Full event description with details...</p>"
  from="2025-06-15T09:00:00Z"
  to="2025-06-15T17:00:00Z"
  location={{address: "Oslo Congress Centre, Oslo, Norway"}}
  map={[59.9139, 10.7522]}
  email="contact@example.com"
  informationLabel="About the Event"
  locationLabel="Location"
  agendaLabel="Schedule"
  contactLabel="Contact us at"
  schedules={[
    {
      name: "Day 1",
      date: "2025-06-15",
      descriptions: "<p>Opening day with keynote speakers</p>",
      topics: [
        {
          title: "Registration",
          start: "09:00",
          duration: "30 min",
          description: "<p>Check-in and welcome coffee</p>",
          speakers: []
        },
        {
          title: "Opening Keynote",
          start: "09:30",
          duration: "1 time 30 min",
          description: "<p>Main keynote address</p>",
          speakers: [
            {person: "John Doe", personUrl: "/speakers/john", image: "/speakers/john.jpg"}
          ]
        }
      ]
    }
  ]}
  speakers={[
    {person: "John Doe", personUrl: "/speakers/john", image: "/speakers/john.jpg"}
  ]}
  organizers={[
    {person: "Jane Smith", personUrl: "/organizers/jane", image: "/organizers/jane.jpg"}
  ]}
/>

// Simple event without map
<EventPart
  title="Community Meeting"
  description="<p>Monthly community gathering</p>"
  date="2025-07-01"
  time="18:00"
  email="community@example.com"
/>
```

**Note:** The component includes an interactive Leaflet map when coordinates are provided. Schedule durations are automatically formatted in Norwegian (e.g., "2 timer 30 min" for 2 hours 30 minutes). HTML content is automatically sanitized. The processor fetches speaker and organizer data from person content items in the repository.

---

## Faq

**Description:** Interactive FAQ component for displaying expandable question and answer pairs with deep-linking support, Schema.org markup for SEO, and accessible keyboard navigation. Features auto-expansion when accessed via URL hash.

**Use Cases:**
- Help documentation with searchable FAQs
- Question-answer pairs with direct links
- Support content with collapsible sections
- Policy explanations with deep-linkable sections

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| itemID | string | No | Unique identifier for the FAQ item |
| question | string | No | The question text (used as display text and slugified for anchor ID) |
| answer | string | No | The answer content (HTML, automatically sanitized) |
| expanded | boolean | No | If true, FAQ is expanded by default (default: true) |
| Tag | 'h2' \| 'h3' | No | HTML heading tag to use for the question (default: 'h2') |
| anchorText | string | No | Accessible text for the anchor link icon |

**Screenshot:**
![Faq](../../screenshots/faq.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-faq)

**Example:**
```tsx
// Basic FAQ with default expansion
<FaqPart
  itemID="1"
  question="What is liberalism?"
  answer="<p>Liberalism is a political philosophy that emphasizes individual liberty...</p>"
  expanded={true}
/>

// FAQ with custom heading tag and collapsed by default
<FaqPart
  itemID="2"
  question="How can I join?"
  answer="<p>You can join by visiting our membership page...</p>"
  expanded={false}
  Tag="h3"
  anchorText="Link to this question"
/>

// FAQ auto-expands when URL is #how-can-i-join
<FaqPart
  itemID="3"
  question="How can I join?"
  answer="<p>Membership details...</p>"
/>
```

**Note:** The question text is automatically slugified to create a URL-safe anchor ID (e.g., "What is liberalism?" becomes "#what-is-liberalism"). If the URL hash matches the FAQ ID, the item auto-expands. Uses Schema.org Question/Answer markup for rich search results. The expand/collapse animation is CSS-based with a max-height transition.

---

## Group

**Description:** Displays group or organization information with optional header image, title, descriptions, and board member list. Features flexible title/ingress positioning (in image or below) and a special layout where the first board member is displayed prominently in the center, with remaining members in a two-column grid below.

**Use Cases:**
- Local chapter/branch pages with leadership
- Organization profile pages with board members
- Group information pages with team displays
- Regional party pages with contact information

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Group title/name |
| image | ImageData | No | Header background image |
| titleInImage | boolean | No | If true, displays title overlaid on header image (default: true) |
| ingressInImage | boolean | No | If true, displays short description overlaid on header image (default: true) |
| headerColor | string | No | CSS color class for header text when displayed in image |
| headerPosition | string | No | Header text alignment: 'left', 'center', or 'right' |
| shortDescription | string | No | Short description/ingress (HTML) |
| description | string | No | Full detailed description (HTML) |
| informationLabel | string | No | Custom label for the information section |
| board | BoardMember[] | No | Array of board members to display |
| imagesize | string | No | Size of member images: 'small', 'medium', or 'large' (default: 'medium') |
| imagetype | boolean | No | If true, uses round/circular member images (default: true) |

**BoardMember Structure:**
| Property | Type | Description |
|----------|------|-------------|
| itemId | string | Unique member identifier |
| name | string | Member's name |
| role | string | Member's role/title in the group |
| shortDescription | string | Brief description about the member |
| url | string | Link to member's profile page |
| image | ImageData | Member's profile image |

**Screenshot:**
![Group](../../screenshots/group.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-group)

**Example:**
```tsx
// Group with header image and board members
<GroupPart
  title="Oslo Liberalistene"
  image={{url: '/images/oslo-chapter.jpg', alternativeText: 'Oslo'}}
  titleInImage={true}
  ingressInImage={false}
  headerPosition="center"
  headerColor="text-white"
  shortDescription="<p>The Oslo chapter of Liberalistene</p>"
  description="<p>Oslo Liberalistene represents the party in the capital region with over 200 active members...</p>"
  informationLabel="About Our Chapter"
  board={[
    {
      itemId: "1",
      name: "Jane Doe",
      role: "Chairperson",
      shortDescription: "Political activist and entrepreneur",
      url: "/people/jane-doe",
      image: {url: "/images/jane.jpg"}
    },
    {
      itemId: "2",
      name: "John Smith",
      role: "Vice Chair",
      shortDescription: "Policy expert",
      url: "/people/john-smith",
      image: {url: "/images/john.jpg"}
    }
  ]}
  imagesize="medium"
  imagetype={true}
/>

// Simple group without header image
<GroupPart
  title="Bergen Chapter"
  shortDescription="<p>Local branch in Bergen</p>"
  description="<p>Meet our team and learn about our activities...</p>"
  board={members}
/>
```

**Note:** The processor fetches member data from person content items in the repository and merges role information. The first board member is displayed in a centered, prominent position, while remaining members appear in a two-column grid. The component uses ImageBlock internally for the header. HTML content is automatically sanitized.

---

## LocalBlock

**Part Name:** `lib.no:localblock`
**Component:** `PageHeader` (via `LocalBlock`)
**Processor:** `/react4xp/parts/localblock/LocalBlockProcessor.ts`

**Description:** Hero-style content block with customizable multi-color title and background image

**Use Cases:**
- Local chapter landing page headers
- Regional branch hero sections
- Branded page headers with multi-line colored titles
- Custom hero banners with overlay effects

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `Tag` | `'h1' \| 'h2' \| 'h3'` | No | HTML heading tag (default: 'h1') |
| `image` | `ImageData` | No | Background image |
| `title` | `TitleItem[]` | No | Array of title objects with text and color |
| `position` | `string` | No | Content position - 'left', 'center', or 'right' |
| `ingress` | `string` | No | Introductory text (HTML) |
| `ingressColor` | `string` | No | Ingress color - 'normal', 'light', 'yellow', or 'purple' |
| `overlay` | `string` | No | Image overlay CSS class (e.g., 'overlay dark') |
| `titleClassName` | `string` | No | Responsive size - 'full' (5vw/9vw) or 'half' (3vw/6vw) |

**TitleItem Interface:**
```tsx
interface TitleItem {
  title: string;        // Text for this title line
  titleColor: string;   // Color: 'light', 'yellow', 'purple', or custom
}
```

**Key Features:**
- Multi-line titles with individual color styling per line
- Configurable content positioning (left/center/right)
- Background image with optional overlay effects
- Responsive font sizing (viewport-based)
- Support for both simple and fancy multi-color titles
- Sanitized HTML ingress text
- Flexible heading level (h1/h2/h3)

**Screenshot:**
![LocalBlock](../../screenshots/localblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-localblock)

**Example:**
```tsx
import {LocalBlock} from '@common/LocalBlock/LocalBlock';

<LocalBlock
  Tag="h1"
  image={{url: '/_/image/123:456/full/oslo.jpg', alternativeText: 'Oslo skyline'}}
  position="center"
  overlay="overlay dark"
  titleClassName="full"
  title={[
    {title: 'Liberalistene', titleColor: 'light'},
    {title: 'Oslo', titleColor: 'yellow'}
  ]}
  ingress="<p>Join us in Oslo for freedom and liberty.</p>"
  ingressColor="light"
/>
```

**Part Config (XML):**
- `titleSet` (Mixin) - Simple or fancy multi-color title configuration
- `headerPosition` (Mixin) - Content alignment (left/center/right)
- `image` (Mixin) - Background image
- `imageOverlay` (Mixin) - Overlay effect
- `ingress` (HtmlArea) - Introductory text
- `ingressColor` (ComboBox) - Ingress text color
- `mobileSize` (Mixin) - Responsive font size ('full' or 'half')

**Note:** Supports legacy single-title configuration for backward compatibility. The processor automatically converts old title/headerColor config to the new titleSet format.

---

## LocalBranch

**Part Name:** `lib.no:localbranch`
**Component:** `PageHeader` (via `LocalBlock` alias)
**Processor:** `/react4xp/parts/localbranch/LocalBranchProcessor.ts`

**Description:** Specialized page header for individual local branch pages with automatic two-part title

**Use Cases:**
- Individual local chapter/branch landing pages
- Automatic display of "Party Name + Branch Name" titles
- Branch profile pages with hero headers
- Regional chapter pages with standardized branding

**Props:**
*Same as LocalBlock* - This component is an alias for `LocalBlock` and accepts identical props:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `Tag` | `'h1' \| 'h2' \| 'h3'` | No | HTML heading tag (default: 'h1') |
| `image` | `ImageData` | No | Background image from content data |
| `title` | `TitleItem[]` | No | Two-part array: [party name, branch name] |
| `position` | `string` | No | Content position (default: 'left') |
| `ingress` | `string` | No | Introductory text from content data |
| `ingressColor` | `string` | No | Ingress color (default: 'light') |
| `overlay` | `string` | No | Image overlay CSS class |
| `titleClassName` | `string` | No | Responsive size (default: 'full') |

**Key Features:**
- **Automatic Two-Part Title:** Combines party name (from config) with branch display name (from content)
- **Content-Driven:** Image and ingress text fetched from content item's data
- **Consistent Branding:** Party name defaults to "Liberalistene" with configurable colors
- **Branch Name Highlighting:** Branch name displayed in separate color (default: yellow)
- Inherits all LocalBlock styling and layout features

**Processor Behavior:**
The processor automatically creates a two-part title:
1. **Part 1:** Party name (from `title` config, defaults to "Liberalistene") in configured color (default: white)
2. **Part 2:** Branch name (from `content.displayName`) in configured color (default: yellow)

**Screenshot:**
![LocalBranch](../../screenshots/localbranch.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-localbranch)

**Example:**
```tsx
// The component automatically generates a two-part title
// Content displayName: "Oslo"
// Result: ["Liberalistene", "Oslo"] with different colors

import {LocalBranch} from '@common/LocalBranch/LocalBranch';

<LocalBranch
  Tag="h1"
  image={{url: '/_/image/123:456/full/oslo.jpg', alternativeText: 'Oslo'}}
  position="left"
  overlay="overlay dark"
  title={[
    {title: 'Liberalistene', titleColor: 'light'},
    {title: 'Oslo', titleColor: 'yellow'}
  ]}
  ingress="<p>Our local chapter in the capital</p>"
  ingressColor="light"
  titleClassName="full"
/>
```

**Part Config (XML):**
- `title` (TextLine) - Party name (default: "Liberalistene")
- Branch name is automatically pulled from `content.displayName`
- Image and ingress come from content data, not config

**Note:** This component is functionally identical to LocalBlock but uses a specialized processor that automatically structures the title as a two-part display combining party and branch names. The actual React component is the same (LocalBlock).

---

## MissionsBlock

**Description:** Party missions and goals display

**Use Cases:**
- Mission statements
- Party goals
- Vision statements

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![MissionsBlock](../../screenshots/missionsblock.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-missionsblock)

**Example:**
```tsx
// To be documented in batch issues
```

---

## OrganizationalPosition

**Description:** Display of organizational positions and roles

**Use Cases:**
- Leadership positions
- Committee roles
- Organizational structure

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![OrganizationalPosition](../../screenshots/organizational-position.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-organizational-position)

**Example:**
```tsx
// To be documented in batch issues
```

---

## Person

**Description:** Individual person profile display

**Use Cases:**
- Staff profiles
- Member profiles
- Contact information

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![Person](../../screenshots/person.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-person)

**Example:**
```tsx
// To be documented in batch issues
```

---

## ProgrammeMain

**Description:** Main programme or platform component

**Use Cases:**
- Political platform
- Party programme
- Policy overview

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![ProgrammeMain](../../screenshots/programme-main.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-programme-main)

**Example:**
```tsx
// To be documented in batch issues
```

---

## ProgrammePart

**Description:** Section of a programme or platform

**Use Cases:**
- Policy sections
- Programme chapters
- Platform segments

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![ProgrammePart](../../screenshots/programme-part.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-programme-part)

**Example:**
```tsx
// To be documented in batch issues
```

---

## ProgrammeSection

**Description:** Subsection of a programme

**Use Cases:**
- Detailed policy points
- Programme subsections
- Specific topics

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![ProgrammeSection](../../screenshots/programme-section.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-programme-section)

**Example:**
```tsx
// To be documented in batch issues
```

---

## Test

**Description:** Test component for development purposes

**Use Cases:**
- Component testing
- Development experimentation
- Feature prototyping

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![Test](../../screenshots/test.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-test)

**Example:**
```tsx
// To be documented in batch issues
```

---

[← Back to Component Catalog](README.md)
