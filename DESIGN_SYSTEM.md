# Design System Documentation

## Overview

This document outlines the minimal, modern design system that governs the visual appearance and behavior of the website. The system emphasizes clarity, alignment, whitespace, and subtle interactions.

---

## Color Palette

### Primary Colors

All colors are defined as CSS custom properties in `src/index.css` for easy maintenance and consistency.

#### Background Colors

- **Primary Background**: `#F4F4F4` (HSL: 0 0% 96.1%)
  - Used as the main background across the site
  - Light grey, soft on the eyes
  - Creates a clean, neutral foundation

- **Secondary Background**: `#FAFAFA` (HSL: 0 0% 97.6%)
  - Used for subtle contrast between sections
  - Introduces minimal visual distinction without color noise

- **Light Background**: `#FFFFFF` (HSL: 0 0% 100%)
  - Used for cards, elevated surfaces, and components
  - Maximum contrast for interactive elements

#### Text Colors

- **Primary Text**: `#1A1A1A` (HSL: 0 0% 10.2%)
  - Main body and heading text
  - Strong readability with excellent contrast

- **Secondary Text**: `#666666` (HSL: 0 0% 40%)
  - Descriptive text, subtitles, labels
  - Lower visual weight than primary text

- **Muted Text**: (HSL: 0 0% 60%)
  - Captions, metadata, disabled states
  - Minimal visual prominence

#### Borders & Dividers

- **Default Border**: `#E5E5E5` (HSL: 0 0% 90%)
  - Clean separation between blocks
  - Subtle without harsh contrast

- **Light Border**: (HSL: 0 0% 93%)
  - Even softer dividers
  - Used for delicate visual separation

### Accent Color

- **Accent Blue**: `#3A7BFF` (HSL: 217 100% 62%)
  - Primary interactive color
  - Used sparingly and consistently
  - Primary buttons, text links, hover states

#### Accent Color Usage Rules

✓ **Use the accent color for:**
- Primary action buttons (solid state)
- Text links and interactive elements
- Hover/active states for interactive UI
- Small tags, indicators, section highlights
- Focus rings and active states

✗ **Never:**
- Let the accent color dominate the layout
- Use it as a background for large sections
- Apply it to non-interactive elements
- Combine with other vibrant colors

---

## Typography

### Font Family

- **Primary**: `Inter` — Best for UI-heavy layouts, perfect clarity
- **Secondary**: `Plus Jakarta Sans` — Friendly, modern alternative
- **Fallback**: System fonts (`ui-sans-serif`, `system-ui`, `-apple-system`, `Segoe UI`)

**Rule**: Use 1-2 fonts maximum to maintain a consistent system.

### Heading Scale

All headings use bold weight with precise sizing and spacing to create a strong visual hierarchy.

| Level | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| H1 | 48–64px (clamp) | 1.2 | -0.02em | Hero titles, main page headings |
| H2 | 32–40px (clamp) | 1.25 | -0.01em | Section headings |
| H3 | 24–28px (clamp) | 1.35 | 0 | Subsection headings |
| H4 | 18px | 1.4 | 0 | Minor headings |
| H5 | 16px | 1.5 | 0 | Subheadings, labels |

**CSS Classes Available**: `.h1`, `.h2`, `.h3`, `.h4`, `.h5`

### Body Text

- **Default**: 16px
- **Large**: 18px
- **Small**: 14px
- **Line Height**: 1.6 (150%) — Comfortable and readable
- **Paragraph Spacing**: 1rem margin-bottom

**CSS Classes Available**: `.body-text`, `.body-large`, `.body-small`

### Text Utilities

- `.text-secondary` — Lighter, secondary text color
- `.text-muted` — Even lighter, for metadata
- `.label` — Small, uppercase, tracked labels (12px, 0.05em letter-spacing)
- `.caption` — Captions and fine print (13px)

### General Typography Rules

1. **Avoid excessive letter-spacing** — Maintain consistent, tight spacing
2. **Headings should be bold and minimal** — No decorative or stylized fonts
3. **Maintain strong visual hierarchy** — Clear progression from headings → subtitles → body → captions
4. **Use line-height for readability** — Never below 1.2, prefer 1.5+ for body text
5. **Keep fonts modern and clean** — No serif or handwriting-style fonts

---

## Layout & Spacing

### Spacing System

The design uses a consistent 0.25rem (4px) spacing scale with custom section utilities:

- **Standard Spacing**: 0.25rem (4px) increments via Tailwind
- **Section Padding**: `clamp(2rem, 5vw, 4rem)` — Responsive and generous
- **Custom Section Spacing**:
  - `section-xs`: 3rem
  - `section-sm`: 4rem
  - `section-md`: 6rem
  - `section-lg`: 8rem
  - `section-xl`: 10rem

### Layout Principles

1. **Generous Whitespace**
   - Sections have substantial padding and margin
   - Content never feels cramped or crowded
   - Space between elements is intentional and measured

2. **Airy Design**
   - Maximum recommended container width: 1100px–1400px
   - Use padding consistently across sections
   - Allow breathing room around text and images

3. **Alignment**
   - Center-align major section containers
   - Use consistent left/right padding on all pages
   - Maintain alignment grid throughout

4. **Visual Clarity**
   - Every element has clear purpose
   - No decorative clutter
   - Whitespace is an active design tool

---

## Animations

All animations are **subtle, smooth, and purposeful**. Heavy effects are avoided in favor of elegant, minimal transitions.

### Animation Types

#### 1. Fade In
- **Purpose**: Gentle appearance of elements
- **Duration**: 0.4–0.5s
- **Easing**: `ease-out`
- **CSS**: `.animate-fade-in`, `.animate-fade-in-up`, `.animate-fade-in-down`

#### 2. Slide In
- **Purpose**: Subtle directional entrance
- **Duration**: 0.6s
- **Distance**: 16px translation
- **CSS**: `.animate-slide-in-left`, `.animate-slide-in-right`

#### 3. Scale In
- **Purpose**: Gentle expand/grow effect
- **Duration**: 0.5s
- **Range**: 0.95 → 1.0 (minimal scale)
- **CSS**: `.animate-scale-in`

#### 4. Float
- **Purpose**: Soft, endless vertical motion
- **Duration**: 6s
- **Distance**: ±6px
- **CSS**: `.animate-float`

#### 5. Glow Pulse
- **Purpose**: Subtle box-shadow pulsing
- **Duration**: 3s infinite
- **Color**: Accent blue with variable opacity
- **CSS**: `.animate-glow`

### Hover States

- **Smooth Transitions**: 200–300ms duration
- **Opacity Fades**: Primary interaction pattern
- **Slight Lift**: ±2px vertical motion for interactive elements
- **No Dramatic Changes**: Avoid jarring color shifts

### Animation Utilities

- `.transition-smooth` — Smooth 200ms transition on all properties
- `.hover-lift` — Lifts element 2px on hover
- `.stagger-1` through `.stagger-5` — Cascade delays (0.1s–0.5s)

### Animation Best Practices

✓ **Do:**
- Use opacity fades for smooth appearances
- Combine fade with small translate (8–16px) for elegance
- Keep animations under 0.6s for interactive feedback
- Stagger animations for cascading effects
- Use cubic-bezier easing for natural motion

✗ **Don't:**
- Use heavy scale transforms (avoid > 1.1x or < 0.9x)
- Animate positions over long distances
- Apply multiple simultaneous animations to one element
- Use overly long animations (> 1s) for interactions
- Combine animations with heavy effects

---

## Components

### Button Styling

**Primary Button (Accent)**
```tsx
<button className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md transition-smooth hover:opacity-90">
  Action
</button>
```

**Secondary Button**
```tsx
<button className="px-6 py-3 bg-secondary text-foreground border border-border font-semibold rounded-md transition-smooth hover:bg-secondary/80">
  Secondary
</button>
```

### Card Components

```tsx
<div className="bg-card text-card-foreground rounded-md border border-border p-6 space-y-4">
  <h3 className="h3">Card Title</h3>
  <p className="text-secondary">Description or content goes here.</p>
</div>
```

### Text Links

```tsx
<a href="#" className="text-accent transition-smooth hover:opacity-80">
  Link text
</a>
```

### Section Spacing

```tsx
<section className="py-section-md px-section bg-background">
  <div className="max-w-4xl mx-auto">
    {/* content */}
  </div>
</section>
```

---

## CSS Custom Properties Reference

### Accessible in Templates

```css
/* Backgrounds */
--bg-primary: 0 0% 96.1%; /* #F4F4F4 */
--bg-secondary: 0 0% 97.6%; /* #FAFAFA */
--bg-light: 0 0% 100%; /* #FFFFFF */

/* Text */
--text-primary: 0 0% 10.2%; /* #1A1A1A */
--text-secondary: 0 0% 40%; /* #666666 */
--text-muted: 0 0% 60%;

/* Borders */
--border-default: 0 0% 90%; /* #E5E5E5 */
--border-light: 0 0% 93%;

/* Accent */
--accent: 217 100% 62%; /* #3A7BFF */
--accent-hover: 217 100% 55%;
--accent-light: 217 100% 92%;
```

Use in CSS: `color: hsl(var(--text-primary));`

---

## Implementation Checklist

- [ ] All primary colors are applied to backgrounds and text
- [ ] Accent color is used sparingly and only for interactive elements
- [ ] Typography scales are consistent across all pages
- [ ] Heading hierarchy is visually clear (H1 > H2 > H3, etc.)
- [ ] Body text is 16–18px with 1.5–1.6 line height
- [ ] Generous whitespace is present between sections
- [ ] Section padding uses responsive values
- [ ] All animations are subtle and under 0.6s for interactions
- [ ] Hover states include smooth opacity or subtle lift
- [ ] Links are blue (#3A7BFF) and change opacity on hover
- [ ] Buttons follow the accent color usage rules
- [ ] Border color (#E5E5E5) is used for subtle dividers
- [ ] Dark mode is implemented consistently
- [ ] All text has sufficient contrast (WCAG AA minimum)
- [ ] Font weights are minimal (avoid > bold unless heading)

---

## Examples

### Hero Section
```tsx
<section className="py-section-lg px-section bg-background overflow-hidden">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="h1 mb-6 animate-fade-in-up">
      Welcome to My Portfolio
    </h1>
    <p className="text-lg text-secondary mb-8 animate-fade-in-up stagger-1">
      Minimal, modern design with purpose
    </p>
    <button className="px-6 py-3 bg-accent text-white font-semibold rounded-md transition-smooth hover:opacity-90 animate-fade-in-up stagger-2">
      Get Started
    </button>
  </div>
</section>
```

### Card Grid
```tsx
<section className="py-section-md px-section bg-secondary">
  <div className="max-w-6xl mx-auto">
    <h2 className="h2 text-center mb-12">Featured Work</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, i) => (
        <div 
          key={i}
          className="bg-card rounded-lg border border-border p-6 space-y-4 hover-lift transition-smooth"
        >
          <h3 className="h3">{project.title}</h3>
          <p className="text-secondary">{project.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Dark Mode

The design system automatically adapts to dark mode with inverted backgrounds and adjusted text colors while maintaining the same accent color and visual hierarchy.

**Toggle via**: Add `.dark` class to `<html>` or implement via `darkMode: ['class']` in Tailwind config.

---

## Support & Maintenance

For questions or updates to this design system, refer to:
- `src/index.css` — CSS custom properties and base styles
- `tailwind.config.ts` — Tailwind extensions and utilities
- Component examples throughout the codebase

**Last Updated**: November 2025
