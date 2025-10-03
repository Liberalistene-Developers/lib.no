# Tailwind CSS Integration - lib.no

## ✅ Completed Setup

### 1. Tailwind Configuration (`tailwind.config.js`)

**Design tokens from old codebase have been integrated:**

#### Colors
```javascript
// Use in components: className="bg-primary-700 text-background-700"
primary: {
  100: '#696f88',  // Light purple-gray
  300: '#5d5664',  // Medium purple-gray
  500: '#755275',  // Purple
  700: '#4a104a',  // Dark purple (brand color)
}
secondary: {
  100: '#f0f2f5',  // Light gray
  500: '#657683',  // Medium gray
}
background: {
  100: '#e5e5e5',  // Light background
  300: '#efeaef',  // Off-white purple tint
  500: '#f8f6f8',  // Very light purple
  700: '#fff',     // White
}
```

#### Typography
```javascript
// Font family (Lato is auto-loaded)
font-sans: ['Lato', 'sans-serif']

// Font sizes - use like: className="text-h1 md:text-h2"
text-h1: '50px' / '60px' line-height
text-h2: '45px' / '54px'
text-h3: '38px' / '46px'
text-rich-text: '18px' / '22px'

// Mobile variants (auto-applied < 414px)
text-h1-mobile: '45px' / '54px'
text-h2-mobile: '38px' / '46px'
text-h3-mobile: '31px' / '38px'

// Font weights
font-heading: 700
font-heading-mobile: 800
```

#### Breakpoints
```javascript
// Mobile-first breakpoint (max-width: 414px)
mobile: {'max': '414px'}

// Usage: className="text-xl mobile:text-sm"
```

### 2. Base Styles (`tailwind.css`)

**Global styles using Tailwind's @layer:**

```css
@layer base {
  body {
    @apply bg-background-700 text-primary-100 font-sans;
  }
  
  h1 { @apply text-primary-700 text-h1 font-heading; }
  h2 { @apply text-primary-500 text-h2 font-heading; }
  h3 { @apply text-primary-500 text-h3 font-heading; }
  a  { @apply text-primary-700 no-underline; }
}

@layer components {
  .rich-text { @apply text-primary-300 text-rich-text; }
  .as-span   { @apply inline; }
}
```

### 3. Legacy SCSS (Temporary)

**Structure:**
```
src/main/resources/assets/styles/
├── tailwind.css        # Tailwind + base styles
├── main.scss          # Imports tailwind.css + legacy.scss
├── legacy.scss        # Old SCSS (to be migrated)
├── foundation/        # Foundation styles (colors, typography, etc.)
└── parts/            # Component styles (29 files)
```

**Current setup:** Both Tailwind and legacy SCSS work together. Site looks correct.

---

## 📋 Migration Strategy

### Phase 1: Simple Components (Start Here)

**Convert these first** (they have simple styling):

1. **Button** (`parts/_button.scss` → Tailwind utilities)
   - Colors: `bg-primary-700 text-button-100`
   - Hover: `hover:bg-primary-500`
   
2. **Card** (`parts/_card.scss`)
   - Borders, shadows, padding

3. **ListItem** (`parts/_listitem.scss`)
   - Flex layouts, spacing

### Phase 2: Medium Components

4. **Article** (`parts/_article.scss`)
5. **Event** (`parts/_event.scss`)
6. **Faq** (`parts/_faq.scss`)

### Phase 3: Complex Components

7. **ImageBlock** (`parts/_imageblock.scss`)
8. **Board** (`parts/_board.scss` + `_boardpresentation.scss`)
9. **CandidatePresentation** (`parts/_candidatepresentation.scss`)

### Phase 4: Foundation (Last)

10. **Grids** (`foundation/_grids.scss`)
11. **Content** (`foundation/_content.scss`)
12. **Menu** (`foundation/_menu.scss`)

---

## 🛠️ How to Migrate a Component

### Example: Migrating Button Component

**1. Find the old SCSS:**
```scss
// parts/_button.scss
.button {
  background-color: var(--lib-color-primary-700);
  color: var(--lib-color-button-color-100);
  padding: 12px 24px;
  border-radius: 4px;
  
  &:hover {
    background-color: var(--lib-color-primary-500);
  }
}
```

**2. Find the React component:**
```tsx
// components/parts/button/Button.tsx
export const Button: React.FC<ButtonProps> = ({ title, onClick }) => (
  <button className="button" onClick={onClick}>
    {title}
  </button>
);
```

**3. Replace with Tailwind:**
```tsx
export const Button: React.FC<ButtonProps> = ({ title, onClick }) => (
  <button 
    className="bg-primary-700 text-button-100 px-6 py-3 rounded hover:bg-primary-500 transition-colors"
    onClick={onClick}
  >
    {title}
  </button>
);
```

**4. Remove old SCSS:**
- Comment out `@import 'parts/button'` in `legacy.scss`
- Delete `parts/_button.scss` when confirmed working

**5. Test:**
```bash
./gradlew build
```

---

## 📚 Tailwind Class Reference

### Common Patterns

**Layout:**
```
flex flex-col    → display: flex; flex-direction: column;
grid grid-cols-3 → display: grid; grid-template-columns: repeat(3, 1fr);
gap-4           → gap: 1rem;
```

**Spacing:**
```
p-4   → padding: 1rem;
px-6  → padding-left/right: 1.5rem;
m-0   → margin: 0;
```

**Colors (from our theme):**
```
bg-primary-700      → background: #4a104a;
text-background-700 → color: #fff;
border-secondary-100 → border-color: #f0f2f5;
```

**Typography:**
```
text-h1        → 50px/60px (desktop)
font-heading   → font-weight: 700;
text-center    → text-align: center;
```

**Responsive:**
```
mobile:text-sm  → @media (max-width: 414px) { font-size: 0.875rem; }
md:grid-cols-2  → @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
```

---

## ✅ Next Steps

1. **Pick a simple component** (Button recommended)
2. **Convert className to Tailwind utilities**
3. **Test thoroughly**
4. **Remove old SCSS import**
5. **Repeat with next component**

Once all components are migrated:
- Delete `legacy.scss`
- Delete `foundation/` and `parts/` folders
- Keep only `tailwind.css` and `main.scss`

---

## 🔗 Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind Color Reference](https://tailwindcss.com/docs/customizing-colors)
- Project colors: See `tailwind.config.js` theme.extend.colors

