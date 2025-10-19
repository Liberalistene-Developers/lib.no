# Interactive Components

Components that facilitate user interaction.

[← Back to Component Catalog](README.md)

---

## Button

**Description:** Interactive button component with various styles

**Use Cases:**
- Call-to-action buttons
- Form submissions
- Navigation actions

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| TBD | TBD | TBD | To be documented in batch issues |

**Screenshot:**
![Button](../../screenshots/button.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-button)

**Example:**
```tsx
// To be documented in batch issues
```

---

## Join

**Part Name:** `lib.no:join`
**Component:** `JoinFlipCard`
**Processor:** `/react4xp/parts/join/JoinProcessor.ts`

**Description:** Interactive 3D flip card component for membership and call-to-action displays

**Use Cases:**
- Party membership signup with engaging flip animation
- Call-to-action cards with front/back messaging
- Interactive promotional content with hover effects
- Two-sided informational displays

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `string` (HTML) | No | Front side message text |
| `backMessage` | `string` (HTML) | No | Back side message text |
| `image` | `ImageData \| null` | No | Front side image (200x200 square) |
| `url` | `string` | No | CTA button URL on back side |
| `buttonText` | `string` | No | CTA button text on back side |
| `frontPlacement` | `string` | No | Front side layout - 'row' (side-by-side) or 'column' (stacked) |

**Key Features:**
- 3D flip animation on hover using CSS transforms (rotateX 180deg)
- Fixed dimensions: 300px height, 600px width (responsive on mobile)
- Two-sided card with independent front/back content
- Configurable front layout (row or column)
- Smooth 600ms transition animation
- Primary brand color background

**Screenshot:**
![Join](../../screenshots/join.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-join)

**Example:**
```tsx
import {JoinFlipCard} from '@common/JoinFlipCard/JoinFlipCard';

<JoinFlipCard
  message="<h2>Bli medlem</h2><p>Join our movement</p>"
  backMessage="<p>Be part of the change for freedom and liberty</p>"
  image={{url: '/_/image/123:456/square(200)/join.jpg', alternativeText: 'Join us'}}
  url="/membership"
  buttonText="Become a Member"
  frontPlacement="row"
/>
```

**Part Config (XML):**
- `message` (HtmlArea) - Front side message
- `backMessage` (HtmlArea) - Back side message
- `image` (Mixin) - Front side image
- `frontPlacement` (RadioButton) - 'row' or 'column' layout
- `buttonText` (TextLine) - CTA button text
- `url` (ContentSelector) - CTA button destination page

---

## Map

**Mixin Name:** `lib.no:map`
**Components:** `MapLoader` + `Map`
**Location:** `/react4xp/common/MapLoader/MapLoader.tsx`, `/react4xp/common/Map/Map.tsx`

**Description:** Interactive OpenStreetMap component with geocoding and lazy loading

**Use Cases:**
- Display event locations on event pages
- Show addresses with interactive maps
- Geocode addresses to coordinates automatically
- Embed location maps in any content type (via mixin)

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `address` | `string` | No | Address to display (geocoded if position not provided). Default: "Allegaten 6, 4400 Flekkefjord" |
| `position` | `number[]` or `[number, number]` | No | Map center as [latitude, longitude]. Default: [58.2953903, 6.6580986] |

**Key Features:**
- **Lazy Loading:** Dynamically loads Leaflet CSS/JS from CDN to avoid bundling
- **Code Splitting:** React component loaded only when needed (client-side)
- **Geocoding:** Automatic address-to-coordinates via Nominatim API
- **SSR Safe:** Client-side only rendering, returns null during SSR
- **OpenStreetMap:** Uses OSM tiles with Leaflet 1.9.4
- **Fixed Zoom:** Zoom level 17 with scroll wheel disabled
- **Error Handling:** Shows loading state and error messages
- **Performance:** Keeps Leaflet out of main bundle (vendors.js)

**Screenshot:**
![Map](../../screenshots/map.png)

**Storybook:** [View in Storybook](http://localhost:6006/?path=/story/parts-map)

**Example:**
```tsx
import {MapLoader} from '@common/MapLoader/MapLoader';

// With coordinates
<MapLoader
  address="Stortinget, Oslo"
  position={[59.9127, 10.7461]}
/>

// Address only (will geocode)
<MapLoader address="Karl Johans gate 22, Oslo" />
```

**Usage in Content Types:**
The Map is typically used as a mixin in content types like Event:

```xml
<!-- src/main/resources/site/content-types/event/event.xml -->
<content-type>
  <mixin name="map"/>
</content-type>
```

**Mixin Config (XML):**
- `map_geopoint` (GeoPoint) - Map location coordinates (e.g., "59.9139,10.7522")

**How It Works:**
1. **MapLoader** dynamically loads Leaflet CSS/JS from CDN
2. Once loaded, it imports the **Map** component via dynamic import
3. If only address provided, Map geocodes it using Nominatim API
4. Renders OpenStreetMap with marker at the location
5. Shows popup with address on marker click

**Technical Notes:**
- Uses `@ts-expect-error` for dynamic imports (ES2015 module setting limitation)
- Returns loading state while Leaflet/Map loads
- Fallback message: "Will show map in preview/production"
- Keeps Leaflet out of initial bundle for better performance

---

[← Back to Component Catalog](README.md)
