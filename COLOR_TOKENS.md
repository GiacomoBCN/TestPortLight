# Color Token System Documentation

## Overview

This project uses a **three-tier design token methodology** for managing colors. This system provides a structured, scalable approach to color management that ensures consistency, accessibility, and maintainability across the entire application.

## Three-Tier Token Hierarchy

### What is a Design Token?

Design tokens are "a methodology for expressing design decisions in a platform-agnostic way so that they can be shared across different disciplines, tools, and technologies" (W3C definition). They extend beyond simple variables to establish a shared vocabulary across the organization.

### The Three Tiers

```
┌─────────────────────────────────────────────────────────────┐
│  TIER 3: Component Tokens (WHERE to use)                    │
│  --button-primary-background, --card-border-hover           │
│                            ↓                                 │
│  TIER 2: Semantic Tokens (HOW to use)                       │
│  --color-text-primary, --color-surface-interactive          │
│                            ↓                                 │
│  TIER 1: Primitive Tokens (Raw values)                      │
│  --primitive-blue-500: #1a7aff                              │
└─────────────────────────────────────────────────────────────┘
```

---

## TIER 1: Primitive Tokens

**Purpose:** Store raw color values. These are the foundation layer and should **NEVER** be used directly in components.

**Naming Convention:** `--primitive-[color-name]-[shade]`

### Current Primitive Tokens

#### Blue Palette
```css
--primitive-blue-400: #2375ef;    /* Hover states (4.64:1 on dark bg) */
--primitive-blue-500: #1a7aff;    /* Primary blue (5.03:1 on dark bg) */
--primitive-blue-600: #086efd;    /* Dark blue (4.51:1 with white text) */
```

#### Slate/Neutral Palette
```css
--primitive-slate-300: #cbd5e1;   /* 13.49:1 - AAA compliant */
--primitive-slate-400: #94a3b8;   /* 7.81:1 - AAA compliant */
--primitive-slate-500: #697990;   /* 4.52:1 - AA compliant */
```

#### Emerald/Success Palette
```css
--primitive-emerald-500: #10b981; /* 7.89:1 - AAA compliant */
```

#### Dark/Background Palette
```css
--primitive-dark-900: #050810;    /* Main dark background */
--primitive-dark-800: #0a0e27;    /* Glass card backgrounds */
--primitive-dark-700: #0f1629;    /* Elevated surfaces */
```

#### Base Monochrome
```css
--primitive-white: #ffffff;
--primitive-black: #0a0a0a;
--primitive-gray-900: #171717;
--primitive-gray-100: #ededed;
```

#### Opacity Values
```css
--primitive-alpha-subtle: 0.08;
--primitive-alpha-light: 0.1;
--primitive-alpha-medium: 0.3;
--primitive-alpha-heavy: 0.6;
```

### WCAG Compliance

All primitive colors are documented with their contrast ratios to ensure WCAG AA compliance (minimum 4.5:1 for normal text):

- **Blue 500:** 5.03:1 on dark bg (AA compliant)
- **Blue 600:** 4.51:1 with white text (AA compliant)
- **Slate 300:** 13.49:1 (AAA compliant)
- **Slate 400:** 7.81:1 (AAA compliant)
- **Slate 500:** 4.52:1 (AA compliant)
- **Emerald 500:** 7.89:1 (AAA compliant)

---

## TIER 2: Semantic Tokens

**Purpose:** Add contextual meaning by describing **HOW** colors should be used. These reference primitive tokens.

**Naming Convention:** `--color-[property]-[element]-[variant]-[state]`

### Text Colors

#### Primary Text
```css
--color-text-primary: var(--primitive-slate-300);      /* Main body text */
--color-text-secondary: var(--primitive-slate-500);    /* Supporting text */
--color-text-tertiary: var(--primitive-slate-400);     /* Subtle/meta info */
--color-text-inverse: var(--primitive-white);          /* Text on dark surfaces */
--color-text-on-light: var(--primitive-gray-900);      /* Text on light backgrounds */
```

#### Interactive Text
```css
--color-text-link-default: var(--primitive-blue-500);  /* Links default state */
--color-text-link-hover: var(--primitive-blue-400);    /* Links hover state */
--color-text-brand: var(--primitive-blue-500);         /* Brand-colored text */
--color-text-accent: var(--primitive-blue-600);        /* Accent/emphasis text */
```

#### Feedback Text
```css
--color-text-success: var(--primitive-emerald-500);    /* Success messages */
--color-text-teaching: var(--primitive-emerald-500);   /* Teaching section text */
```

### Background/Surface Colors

#### Surface Colors
```css
--color-surface-primary: var(--primitive-dark-900);        /* Main background */
--color-surface-secondary: var(--primitive-dark-800);      /* Card/glass backgrounds */
--color-surface-tertiary: var(--primitive-dark-700);       /* Elevated surfaces */
--color-surface-inverse: var(--primitive-white);           /* Light mode primary */
--color-surface-inverse-secondary: var(--primitive-gray-100); /* Light mode secondary */
```

#### Interactive Surfaces
```css
--color-surface-interactive-default: var(--primitive-blue-600);  /* Button backgrounds */
--color-surface-interactive-hover: var(--primitive-blue-500);    /* Button hover */
```

#### Effects
```css
--color-surface-glow: rgba(8, 110, 253, var(--primitive-alpha-light)); /* Blue glow effects */
```

### Border Colors

```css
--color-border-default: rgba(255, 255, 255, var(--primitive-alpha-subtle));  /* Subtle borders */
--color-border-interactive: var(--primitive-blue-500);     /* Active/interactive borders */
--color-border-interactive-hover: var(--primitive-blue-400); /* Hover state borders */
--color-border-emphasis: var(--primitive-blue-600);        /* Emphasized borders */
```

### Decoration & Effects

```css
--color-decoration-grid: rgba(26, 122, 255, var(--primitive-alpha-light));  /* Background grid */
--color-decoration-accent: var(--primitive-blue-500);      /* Accent decorations */
```

### Glass Morphism

```css
--color-glass-border: rgba(255, 255, 255, var(--primitive-alpha-subtle));
--color-glass-background: rgba(10, 14, 39, 0.7);
```

---

## TIER 3: Component Tokens

**Purpose:** Component-specific tokens that describe **WHERE** colors are used. These reference semantic tokens.

**Naming Convention:** `--[component]-[property]-[variant]-[state]`

### Buttons

#### Primary Buttons
```css
--button-primary-background-default: var(--color-surface-interactive-default);
--button-primary-background-hover: var(--color-surface-interactive-hover);
--button-primary-text: var(--color-text-inverse);
--button-primary-border-focus: var(--color-border-interactive);
```

#### Secondary Buttons
```css
--button-secondary-background-default: transparent;
--button-secondary-background-hover: var(--color-surface-secondary);
--button-secondary-text: var(--color-text-link-default);
--button-secondary-border: var(--color-border-interactive);
```

### Cards

#### Glass Cards
```css
--glass-card-background: var(--color-glass-background);
--glass-card-border: var(--color-glass-border);
```

#### Standard Cards
```css
--card-background: var(--color-surface-secondary);
--card-background-hover: var(--color-surface-tertiary);
--card-border-default: var(--color-border-default);
--card-border-hover: var(--color-border-interactive);
--card-text-heading: var(--color-text-inverse);
--card-text-body: var(--color-text-primary);
--card-text-meta: var(--color-text-tertiary);
```

#### Project Cards
```css
--project-card-role-text: var(--color-text-brand);
--project-card-title-default: var(--color-text-inverse);
--project-card-title-hover: var(--color-text-link-hover);
--project-card-company-text: var(--color-text-tertiary);
--project-card-description-text: var(--color-text-primary);
--project-card-metric-value: var(--color-text-brand);
--project-card-metric-label: var(--color-text-tertiary);
--project-card-tag-border: var(--color-border-interactive);
--project-card-tag-text: var(--color-text-primary);
```

### Navigation

```css
--nav-background: var(--color-surface-secondary);
--nav-border: var(--color-border-default);
--nav-link-default: var(--color-text-primary);
--nav-link-hover: var(--color-text-link-hover);
--nav-link-active: var(--color-text-brand);
```

### Hero Section

```css
--hero-background: var(--color-surface-primary);
--hero-title-text: var(--color-text-inverse);
--hero-body-text: var(--color-text-primary);
--hero-grid-decoration: var(--color-decoration-grid);
--hero-glow-effect: var(--color-surface-glow);
```

### Teaching Section

```css
--teaching-accent-text: var(--color-text-teaching);
--teaching-accent-border: var(--primitive-emerald-500);
--teaching-card-background: var(--color-surface-secondary);
```

### Metrics/Statistics

```css
--metric-value-text: var(--color-text-brand);
--metric-label-text: var(--color-text-tertiary);
--metric-card-background: var(--color-surface-secondary);
```

### Tags/Badges

```css
--tag-background: transparent;
--tag-border: var(--color-border-interactive);
--tag-text: var(--color-text-primary);
--tag-background-hover: var(--color-surface-secondary);
```

---

## Benefits of This System

### 1. Single Source of Truth
Change a primitive token once, and it propagates through all semantic and component tokens that reference it.

**Example:** Change `--primitive-blue-500` from `#1a7aff` to `#0066ff`, and it automatically updates:
- All links
- All brand text
- All metric values
- All interactive elements

### 2. Theme Switching Ready
Semantic tokens can point to different primitive values based on theme:

```css
/* Dark mode (current) */
:root {
  --color-text-primary: var(--primitive-slate-300);
  --color-surface-primary: var(--primitive-dark-900);
}

/* Light mode (future) */
@media (prefers-color-scheme: light) {
  :root {
    --color-text-primary: var(--primitive-gray-900);
    --color-surface-primary: var(--primitive-white);
  }
}
```

### 3. Component Independence
Components reference semantic or component tokens, never primitives directly.

```tsx
// ✅ Good - Uses component token
className="bg-[var(--card-background)]"

// ✅ Good - Uses semantic token
className="text-[var(--color-text-primary)]"

// ❌ Bad - Uses Tailwind class (bypasses token system)
className="text-slate-300"

// ❌ Bad - Uses primitive directly
className="text-[var(--primitive-slate-300)]"
```

### 4. Self-Documenting Code
Token names describe their purpose, creating a shared vocabulary between design and development:
- `--color-text-link-hover` is clearer than `--color-blue-400`
- `--card-border-hover` is clearer than `--border-1`
- `--teaching-accent-text` is clearer than `--text-green`

### 5. WCAG Compliance Tracking
All contrast ratios are documented at the primitive level, making accessibility audits straightforward.

### 6. Design-Development Alignment
Token structure matches design tool (Figma) variables, ensuring consistency between design and implementation.

---

## Usage Guidelines

### Rule 1: Never Use Primitives Directly
Primitive tokens should only be referenced by semantic tokens, never by components.

```css
/* ❌ WRONG */
.my-component {
  color: var(--primitive-blue-500);
}

/* ✅ CORRECT */
.my-component {
  color: var(--color-text-brand);
}
```

### Rule 2: Prefer Component Tokens Over Semantic
When a component token exists, use it instead of a semantic token.

```css
/* ❌ Less specific */
.button {
  background: var(--color-surface-interactive-default);
}

/* ✅ More specific */
.button {
  background: var(--button-primary-background-default);
}
```

### Rule 3: Create New Tokens When Needed
If you need a new color usage pattern:

1. **Check primitives:** Is the color value already defined?
2. **Check semantics:** Does a semantic token already exist for this usage?
3. **Create if needed:** Add to the appropriate tier

```css
/* Example: Adding a new warning color */

/* 1. Add primitive (if new color) */
--primitive-amber-500: #f59e0b;

/* 2. Add semantic meaning */
--color-text-warning: var(--primitive-amber-500);
--color-border-warning: var(--primitive-amber-500);

/* 3. Add component usage (if needed) */
--alert-warning-text: var(--color-text-warning);
--alert-warning-border: var(--color-border-warning);
```

### Rule 4: Maintain the Hierarchy
Always maintain the three-tier structure:

```
Component Token → Semantic Token → Primitive Token
```

Never skip levels:
```css
/* ❌ WRONG - Skips semantic layer */
--card-background: var(--primitive-dark-800);

/* ✅ CORRECT - Maintains hierarchy */
--card-background: var(--color-surface-secondary);
--color-surface-secondary: var(--primitive-dark-800);
```

### Rule 5: CSS Variables in Tailwind Arbitrary Values - Important Limitations

**Problem:** CSS variables don't work inside Tailwind's arbitrary shadow values.

```tsx
/* ❌ WRONG - CSS variable in shadow arbitrary value */
className="shadow-[0_0_30px_var(--color-surface-glow)]"

/* ✅ CORRECT - Direct rgba value in shadow */
className="shadow-[0_0_30px_rgba(8,110,253,0.3)]"
```

**When you CAN use CSS variables:**
- Background colors: `bg-[var(--card-background)]` ✅
- Text colors: `text-[var(--color-text-primary)]` ✅
- Border colors: `border-[var(--card-border-hover)]` ✅

**When you CANNOT use CSS variables:**
- Shadow values: `shadow-[0_0_30px_var(--color-surface-glow)]` ❌
- Must use direct color: `shadow-[0_0_30px_rgba(8,110,253,0.3)]` ✅

**Additional rule for CSS custom properties:**
Don't nest CSS variables inside color functions in your token definitions:

```css
/* ❌ WRONG - Nested variable in rgba() */
--color-surface-glow: rgba(8, 110, 253, var(--primitive-alpha-light));

/* ✅ CORRECT - Direct opacity value */
--color-surface-glow: rgba(8, 110, 253, 0.1);
```

**Why this matters:**
- Tailwind doesn't parse CSS variables inside shadow arbitrary values
- Even if the token contains a valid color, Tailwind can't use it in shadows
- Use direct rgba/hex values for shadows and glow effects
- Always use direct opacity values in `rgba()` definitions (not nested variables)

---

## Implementation Roadmap

### Phase 1: Foundation (Current)
- ✅ Define all primitive tokens in `globals.css`
- ✅ Create semantic layer
- ✅ Build component tokens for existing patterns

### Phase 2: Component Migration (Future)
- Gradually refactor components to use new token system
- Start with high-impact components (buttons, cards)
- Update Tailwind classes to CSS variables where needed

### Phase 3: Design Tool Integration (Future)
- Export tokens to Figma as variables
- Establish design-to-code workflow
- Create token documentation in design files

### Phase 4: Theming (Future)
- Implement light mode
- Add theme switcher
- Create additional theme variants if needed

---

## References

This system is based on industry-standard design token methodologies:

- **W3C Design Tokens Community Group** - Token standardization
- **Design Systems Collective** - Token hierarchy and semantic naming
- **Nathan Curtis** - "Primitives are the options; semantics are the choices"
- **Contentful Design Token Guide** - Three-tier implementation

---

## File Structure

```
/app
  └── globals.css          # All color tokens defined here
/
  └── COLOR_TOKENS.md      # This documentation file
  └── tailwind.config.ts   # References tokens from globals.css
```

---

## Questions or Contributions

When adding new colors:
1. Document the use case
2. Check if existing tokens can be reused
3. Follow the three-tier hierarchy
4. Update this documentation
5. Ensure WCAG compliance

---

**Last Updated:** 2025-10-24
**Version:** 1.0.0
