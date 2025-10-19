# Lists & Collections Components

Components for displaying collections of items.

[← Back to Component Catalog](README.md)

---

## ArticleList

**Description:** Displays a list of articles with optional pagination and "Load More" functionality. Supports both server-side and client-side rendering with dynamic loading via Guillotine API.

**Use Cases:**
- Blog listing page with pagination
- News feed with infinite scroll
- Article archive with filtering
- Category or tag-based article lists
- Author article listings

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | List title/heading |
| items | ArticleItem[] | No | Initial article items (server-side rendered) |
| displaytype | string | No | Display layout type: 'gridlist' or 'list' (default: 'gridlist') |
| description | string | No | List description/introduction text |
| shortDescription | string | No | Short summary for the list |
| featured | FeaturedConfig | No | Configuration for featured articles with custom styling |
| showImage | boolean | No | If true, shows article images (default: false) |
| imageSize | string | No | Image display size: 'small', 'medium', or 'large' |
| imageType | string | No | Image shape: 'round' for circular images |
| titleCenter | boolean | No | If true, centers article titles (default: false) |
| readMore | string | No | Text for "read more" link on articles |
| readMoreEnabled | boolean | No | If true, shows "read more" links (default: false) |
| loadMoreEnabled | boolean | No | If true, enables "Load More" button for pagination (default: false) |
| loadMore | string | No | Text for "Load More" button (default: "Load more") |
| apiUrl | string | No | Guillotine API URL for loading more articles |
| count | number | No | Number of articles to load per request (default: 10) |
| sortExpression | string | No | Sort expression for Guillotine query (e.g., "data.date DESC") |
| parentPathQuery | string | No | Parent path query filter for Guillotine request |
| noIngress | boolean | No | If true, hides article ingress/summary (default: false) |

**Screenshot:**
![ArticleList](../../screenshots/articlelist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-articlelist)

**Example:**
```tsx
// Basic article list
<ArticleListPart
  title="Latest Articles"
  items={articles}
  showImage={true}
  imageSize="medium"
  readMoreEnabled={true}
  readMore="Read full article"
/>

// List with "Load More" pagination
<ArticleListPart
  title="All Articles"
  items={initialArticles}
  displaytype="gridlist"
  loadMoreEnabled={true}
  loadMore="Load more articles"
  apiUrl="/api/master"
  count={12}
  sortExpression="data.date DESC"
  parentPathQuery="/content/articles"
/>

// Featured articles with custom styling
<ArticleListPart
  title="Featured News"
  items={articles}
  featured={{
    'article-123': { style: 'highlight', showDate: true },
    'article-456': { style: 'featured', showDate: false }
  }}
  titleCenter={true}
/>
```

---

## EventList

**Description:** Displays a list of events with dates and location details. Supports both server-side rendering and client-side dynamic loading via Guillotine API with "Load More" functionality. Can display events in grid or list layout with configurable image options.

**Use Cases:**
- Event calendar with pagination
- Upcoming events showcase with dynamic loading
- Event archive with filtering by location
- Conference or meetup listings

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | List title/heading |
| description | string | No | Full HTML description of the event list |
| shortDescription | string | No | Short description/ingress for the list |
| items | EventItem[] | No | Initial event items (server-side rendered) |
| displaytype | string | No | Display layout: 'grid' for card layout or 'list' for list layout (default: 'list') |
| showImage | boolean | No | If true, shows event images in list view (default: false) |
| imageSize | string | No | Image display size: 'small', 'medium', or 'large' |
| imageType | string | No | Image shape: 'round' for circular images |
| readMore | string | No | Text for "read more" link on events |
| readMoreEnabled | boolean | No | If true, shows "read more" links (default: false) |
| loadMoreEnabled | boolean | No | If true, enables "Load More" button for pagination (default: false) |
| loadMore | string | No | Text for "Load More" button (default: "Load more") |
| apiUrl | string | No | Guillotine API URL for loading more events dynamically |
| count | number | No | Number of events to load per request (default: 10) |
| sortExpression | string | No | Sort expression for Guillotine query (e.g., "data.from DESC") |
| parentPathQuery | string | No | Parent path query filter for Guillotine request |
| noIngress | boolean | No | If true, hides event ingress/summary (default: false) |
| useLoader | boolean | No | If true, uses dynamic loading; if false, static rendering (default: false) |

**Screenshot:**
![EventList](../../screenshots/eventlist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-eventlist)

**Example:**
```tsx
// Basic event list in grid layout
<EventListPart
  title="Upcoming Events"
  displaytype="grid"
  items={events}
  showImage={true}
  imageSize="medium"
/>

// Event list with dynamic loading and "Load More"
<EventListPart
  title="All Events"
  displaytype="list"
  items={initialEvents}
  loadMoreEnabled={true}
  loadMore="Load more events"
  apiUrl="/api/master"
  count={12}
  sortExpression="data.from DESC"
  parentPathQuery="/content/events"
  useLoader={true}
/>

// Simple event list without images
<EventListPart
  title="Event Archive"
  items={events}
  displaytype="list"
  noIngress={true}
/>
```

**Note:** The component supports both manual selection and query-based fetching via the processor. When using dynamic loading (useLoader=true), the DynamicLoader component handles pagination via the Guillotine API.

---

## CandidateList

**Description:** Displays a list of political candidates with configurable images, roles, and descriptions. Uses PersonListItem internally for consistent person-related listings.

**Use Cases:**
- Candidate directories with profiles
- Election candidate showcases with roles
- Political team listings with descriptions
- Campaign candidate presentations

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | CandidateItem[] | No | Array of candidate items to display |
| showRole | boolean | No | Whether to display candidate roles (default: true) |
| imagesize | string | No | Size of candidate images: 'small', 'medium', or 'large' |
| imagetype | boolean | No | If true, uses round/circular images (default: true) |
| className | string | No | Additional CSS class names |

**CandidateItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| itemId | string | Unique identifier for the candidate |
| name | string | Candidate's name |
| role | string | Candidate's role/position (e.g., "Mayor Candidate") |
| shortDescription | string | Brief description or platform (HTML content) |
| url | string | Link to candidate's full profile page |
| image | object | Candidate's profile image with `url` property |

**Screenshot:**
![CandidateList](../../screenshots/candidatelist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-candidatelist)

**Example:**
```tsx
// Candidate list with roles
<CandidateListPart
  items={[
    {
      itemId: "1",
      name: "John Doe",
      role: "Mayor Candidate",
      shortDescription: "<p>Platform: Lower taxes, better schools</p>",
      url: "/candidates/john-doe",
      image: {url: "/images/john.jpg"}
    },
    {
      itemId: "2",
      name: "Jane Smith",
      role: "Council Member",
      shortDescription: "<p>Platform: Improved infrastructure</p>",
      url: "/candidates/jane-smith",
      image: {url: "/images/jane.jpg"}
    }
  ]}
  showRole={true}
  imagesize="medium"
  imagetype={true}
/>

// Simple candidate list without roles
<CandidateListPart
  items={candidates}
  showRole={false}
  imagesize="small"
/>
```

**Note:** The component uses PersonListItem internally for rendering, ensuring consistent styling across person-related lists. HTML descriptions are automatically sanitized.

---

## PersonList

**Description:** Displays a collection of people in either list or grid layout with configurable image options. Fetches person data from content repository by content IDs and supports optional title, header image, and descriptions.

**Use Cases:**
- Team member directories with photos
- Staff listings with roles
- Contributor showcases
- Board member listings
- Author directories
- Speaker rosters with bios

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | List title/heading (displayed as H2) |
| description | string | No | Full description text (HTML) |
| shortDescription | string | No | Brief introduction/summary (HTML) |
| displaytype | string | No | Display layout: 'list' or 'grid' (default: 'grid') |
| imagesize | 'small' \| 'medium' \| 'large' | No | Size of person images |
| imagetype | boolean | No | If true, uses round/circular images (default: false) |
| image | ImageData | No | Optional header image for the list |
| items | PersonItem[] | No | Array of person items to display |

**PersonItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| itemID | string | Unique identifier for the person |
| image | ImageData | Person's profile image (optimized as 256x256 square) |
| name | string | Person's name |
| shortDescription | string | Brief description or role |
| url | string | Link to person's full profile page |

**Screenshot:**
![PersonList](../../screenshots/personlist.webp)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-personlist)

**Example:**
```tsx
// Grid layout with round images
<PersonListPart
  title="Our Team"
  displaytype="grid"
  imagesize="medium"
  imagetype={true}
  shortDescription="<p>Meet the people who make it happen.</p>"
  items={[
    {
      itemID: "1",
      name: "John Doe",
      shortDescription: "CEO and Founder",
      url: "/people/john-doe",
      image: {url: "/images/john.jpg", alternativeText: "John Doe"}
    },
    {
      itemID: "2",
      name: "Jane Smith",
      shortDescription: "Chief Technology Officer",
      url: "/people/jane-smith",
      image: {url: "/images/jane.jpg", alternativeText: "Jane Smith"}
    },
    {
      itemID: "3",
      name: "Bob Johnson",
      shortDescription: "Marketing Director",
      url: "/people/bob-johnson",
      image: {url: "/images/bob.jpg", alternativeText: "Bob Johnson"}
    }
  ]}
/>

// List layout with square images
<PersonListPart
  title="Contributors"
  displaytype="list"
  imagesize="small"
  imagetype={false}
  description="<p>Thank you to our contributors for their valuable work.</p>"
  items={contributors}
/>

// Grid with header image
<PersonListPart
  title="Board Members 2025"
  displaytype="grid"
  image={{url: "/images/board-header.jpg", alternativeText: "Board meeting"}}
  shortDescription="<p>Our elected leadership team.</p>"
  description="<p>The board is elected annually and guides the party's strategic direction.</p>"
  imagesize="large"
  imagetype={true}
  items={boardMembers}
/>
```

**Note:** The processor fetches person data from the content repository using the Enonic Content API. Each person content item is queried by ID, and images are automatically optimized to 256x256 square format. The component uses either ListItem or GridItem internally based on displaytype. Items with null/missing content are filtered out automatically. HTML content in descriptions is automatically rendered with SafeHtml.

---

## PageList

**Description:** Displays a list of pages with navigation

**Use Cases:**
- Site map
- Navigation menus
- Related pages

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![PageList](../../screenshots/pagelist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-pagelist)

**Example:**
```tsx
// To be documented in batch issues
```

---

## BookList

**Description:** Displays a collection of books as a grid of book cards with covers, authors, descriptions, and purchase links. Supports both manual selection and query-based book fetching.

**Use Cases:**
- Reading lists with book recommendations
- Library catalog with multiple books
- Political literature collections
- Book recommendation sections

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Optional title displayed above the book list |
| buyFromText | string | No | Localized text prefix for "Buy from" (e.g., "Kjøp fra") |
| className | string | No | Additional CSS class name for the book list container |
| items | BookItem[] | No | Array of books to display with cover, author, description, and purchase info |

**BookItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| itemID | string | Unique identifier for the book item |
| url | string | URL to the book's detail page |
| image | ImageData | Book cover image data |
| author | object | Author with `name` and `url` properties |
| title | string | Book title |
| text | string | Book description or summary (HTML) |
| buy | object | Purchase link with `url`, `store`, and `topic` properties |

**Screenshot:**
![BookList](../../screenshots/booklist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-booklist)

**Example:**
```tsx
// Book list with multiple books
<BookListPart
  title="Recommended Reading"
  buyFromText="Buy from"
  items={[
    {
      itemID: "1",
      title: "Liberal Economics 101",
      author: { name: "John Doe", url: "/authors/john-doe" },
      image: { url: "/books/economics.jpg", alt: "Book cover" },
      text: "<p>An introduction to free market principles.</p>",
      url: "/books/economics-101",
      buy: { url: "https://bookstore.com", store: "Example Books" }
    },
    {
      itemID: "2",
      title: "Freedom and Society",
      author: { name: "Jane Smith", url: "/authors/jane-smith" },
      image: { url: "/books/freedom.jpg", alt: "Book cover" },
      text: "<p>Exploring individual liberty.</p>",
      url: "/books/freedom-society"
    }
  ]}
/>
```

**Note:** The component supports both manual book selection and query-based fetching via the processor. Purchase links are optional. Only the first author is displayed per book.

---

## BudgetCutList

**Description:** Displays a list of budget cuts with detailed financial breakdowns including budgets, cuts, percentages, and expandable sub-cuts. Used for political party budget proposals and government spending transparency.

**Use Cases:**
- Budget cut proposals with detailed breakdowns
- Government spending transparency
- Policy documentation with financial data
- Election campaign budget platforms

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | No | Main title for the budget cut list |
| ingress | string | No | Introductory text displayed before the list (HTML) |
| items | BudgetCutListItem[] | No | Array of budget cut items to display |
| labelSumCut | string | No | Localized label for "Total cut" |
| labelBudget | string | No | Localized label for "Budget" |
| labelTitle | string | No | Localized label for "Title" column header |
| labelPercent | string | No | Localized label for "Percent" column header |
| labelCut | string | No | Localized label for "Cut" column header |
| labelNumberText | string | No | Localized explanatory text for numbers |

**BudgetCutListItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| itemID | string | Unique identifier for the list item |
| title | string | Title of the budget category |
| budget | number | Total budget amount |
| cut | number | Total amount to be cut |
| percent | number | Percentage of budget to be cut |
| description | string | Description of the budget cut (HTML) |
| cuts | CutItem[] | List of sub-cuts within this category |
| sumary | string | Summary text (HTML) |

**CutItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| name | string | Name or category of the budget cut |
| budget | number | Original budget amount |
| cut | number | Amount to be cut |
| percent | number | Percentage to be cut |
| description | string | Detailed description (HTML) |

**Screenshot:**
![BudgetCutList](../../screenshots/budgetcutlist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-budgetcutlist)

**Example:**
```tsx
// Budget cut list with nested sub-cuts
<BudgetCutListPart
  title="Proposed Budget Cuts 2025"
  ingress="<p>Our plan to reduce government spending.</p>"
  labelBudget="Current Budget (million NOK)"
  labelCut="Proposed Cut (million NOK)"
  labelPercent="Percentage"
  labelTitle="Category"
  items={[
    {
      itemID: "1",
      title: "Department of Example",
      budget: 1000,
      cut: 250,
      percent: 25,
      description: "<p>Reduce administrative overhead</p>",
      cuts: [
        {
          name: "Office supplies",
          budget: 100,
          cut: 50,
          percent: 50,
          description: "<p>Streamline procurement</p>"
        },
        {
          name: "Travel expenses",
          budget: 200,
          cut: 100,
          percent: 50,
          description: "<p>Reduce business travel</p>"
        }
      ]
    }
  ]}
/>
```

**Note:** Each budget cut item can contain nested sub-cuts for detailed breakdowns. HTML content is automatically sanitized. The component supports both manual selection and query-based fetching via the processor.

---

## FaqList

**Description:** Displays a collection of FAQ items with expandable/collapsible functionality. Supports both manual selection and query-based fetching of FAQ content items. Each FAQ item includes a question and answer pair.

**Use Cases:**
- FAQ pages with multiple question-answer pairs
- Help documentation with collapsible sections
- Support content with categorized questions
- Knowledge base with deep-linkable Q&A items

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | FaqListItem[] | No | Array of FAQ items to display |
| expanded | boolean | No | If true, all FAQs are expanded by default (default: true) |
| anchorText | string | No | Accessible text for anchor link icons on each FAQ |

**FaqListItem Structure:**
| Property | Type | Description |
|----------|------|-------------|
| itemID | string | Unique identifier for the FAQ item |
| question | string | The question text (used as heading) |
| answer | string | The answer content (HTML, automatically sanitized) |
| url | string | Link to the full FAQ page |

**Screenshot:**
![FaqList](../../screenshots/faqlist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-faqlist)

**Example:**
```tsx
// FAQ list with expanded items
<FaqListPart
  expanded={true}
  anchorText="Link to this question"
  items={[
    {
      itemID: "1",
      question: "What is Liberalistene?",
      answer: "<p>Liberalistene is a Norwegian political party...</p>",
      url: "/faq/what-is-liberalistene"
    },
    {
      itemID: "2",
      question: "How can I join?",
      answer: "<p>You can join by visiting our membership page...</p>",
      url: "/faq/how-to-join"
    }
  ]}
/>

// FAQ list collapsed by default
<FaqListPart
  expanded={false}
  items={faqItems}
/>
```

**Note:** The processor supports both manual FAQ selection and query-based fetching from the content repository. Each FAQ item uses the Faq component internally with Tag="h3" for proper heading hierarchy. Questions are rendered as H3 headings within the list.

---

## LocalBranches

**Part Name:** `lib.no:localbranches`
**Component:** `LocalBranches`
**Processor:** `/react4xp/parts/localbranches/LocalBranchesProcessor.ts`

**Description:** Displays a responsive grid of links to local party branches

**Use Cases:**
- Branch directory/finder page
- "Find Your Local Chapter" sections
- Organization structure display
- Regional navigation hub

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | No | Section heading text |
| `headingClassName` | `string` | No | CSS class for heading container (e.g., 'center' for centered) |
| `items` | `BranchItem[]` | No | Array of branch items to display |

**BranchItem Interface:**
```tsx
interface BranchItem {
  name?: string;   // Display name of the branch
  path?: string;   // URL path to the branch page
  title?: string;  // Alternative title (optional)
}
```

**Key Features:**
- **Responsive Grid Layout:** 4 columns on desktop, 2 columns on mobile
- **Auto-Query:** Automatically fetches all child content items of type `lib.no:localbranch`
- **Empty State Handling:** Returns null if no branches found
- **Underlined Links:** Branch names displayed as underlined links
- **Configurable Heading:** Optional centered heading
- **High Capacity:** Queries up to 999 branches

**Layout:**
- Desktop: 4 columns with 10px horizontal gap, 5px vertical gap
- Mobile: 2 columns with 10px vertical gap
- Responsive breakpoint handled via Tailwind `mobile:` prefix

**Screenshot:**
![LocalBranches](../../screenshots/localbranches.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-localbranches)

**Example:**
```tsx
import {LocalBranches} from '@common/LocalBranches/LocalBranches';

<LocalBranches
  title="Find Your Local Chapter"
  headingClassName="center"
  items={[
    {name: 'Oslo', path: '/localbranches/oslo', id: 'abc123'},
    {name: 'Bergen', path: '/localbranches/bergen', id: 'def456'},
    {name: 'Trondheim', path: '/localbranches/trondheim', id: 'ghi789'},
    {name: 'Stavanger', path: '/localbranches/stavanger', id: 'jkl012'}
  ]}
/>
```

**Part Config (XML):**
- `title` (TextLine) - Heading text (default: "Our local branches")
- `centerheading` (Mixin) - Boolean to center the heading

**Note:** The processor uses `findChildren()` to automatically query all child content items of type `lib.no:localbranch` under the current content path. Branch names and URLs are automatically generated from content metadata. The component returns early (null) if no items are provided.

---

[← Back to Component Catalog](README.md)
