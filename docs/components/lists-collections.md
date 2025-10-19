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

**Description:** Displays a list of events with dates and details

**Use Cases:**
- Events calendar
- Upcoming events
- Event archive

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![EventList](../../screenshots/eventlist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-eventlist)

**Example:**
```tsx
// To be documented in batch issues
```

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

**Description:** Displays a list of people with details

**Use Cases:**
- Team members
- Contributors
- Staff directory

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![PersonList](../../screenshots/personlist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-personlist)

**Example:**
```tsx
// To be documented in batch issues
```

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

**Description:** Displays a list of frequently asked questions

**Use Cases:**
- FAQ page
- Help documentation
- Support content

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![FaqList](../../screenshots/faqlist.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-faqlist)

**Example:**
```tsx
// To be documented in batch issues
```

---

## LocalBranches

**Description:** Displays a list of local party branches

**Use Cases:**
- Branch directory
- Location finder
- Organization structure

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![LocalBranches](../../screenshots/localbranches.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-localbranches)

**Example:**
```tsx
// To be documented in batch issues
```

---

[← Back to Component Catalog](README.md)
