# Design system — "Manifesto" (home, phase 1)

Written from the built home page on branch `redesign-home` (1 Nov 2026). Scope: the home only; the other pages still use the dark tokens in `app/globals.css` (`:root`). Everything below lives under `[data-theme="manifesto"]` in `app/globals.css`.

## Idea

A light, warm manifesto. Two walls of vertical bands, like Art Déco columns, each converging on its own vanishing point high at the inner corner of its gutter; the content stands in the light between them, left-aligned, in a column drawn with thin rules. Lines are hard; everything else is soft (one 10px radius).

## Colour

| Token | Value | Role |
|---|---|---|
| `--m-paper` | `#F5EEDF` | Page and column background (cream) |
| `--m-paper-2` | `#EDE3CF` | Hover fields, image placeholders |
| `--m-ink` | `#2A1D15` | Text, buttons, rules at full strength (14.2:1 on paper) |
| `--m-ink-2` | `#5A463A` | Secondary text, labels (7.7:1 on paper) |
| `--m-rule` | `rgba(42,29,21,.16)` | Hairlines |
| `--m-rule-strong` | `rgba(42,29,21,.45)` | Underlines, outlined controls |
| `--m-sand` | `#E3CFA6` | Wall bands, wide |
| `--m-blue-dust` | `#9DB1BF` | Wall bands, medium |
| `--m-terracotta` | `#C2552A` | Wall bands, thin accents; label marker |
| `--m-terracotta-deep` | `#A63F1A` | Solid button hover (cream on it 5.4:1), Product icon |
| `--m-green` | `#45603D` | Teaching icon and marker |
| `--m-radius` | `10px` | Buttons, images, boxes, menus, avatars |
| `--m-ochre` | `#E9C77A` | Highlighter field behind dark text only (ink on it 10:1) |

Rules: orange, ochre and yellow are never text on light. Colour is used as fields (the walls, the highlighter) and icons, never as tinted text. No gradients, no glow, no shadows, no solid colour blocks.

## Type

Archivo (variable: weight 100–900, width 62–125 %), self-hosted through `next/font/google`, loaded only on the home (`app/page.tsx`). Two weights: 400 body, 700 display and labels.

- `.m-display`: 700, width 112 %, tracking −0.025em, line-height 0.96, `text-wrap: balance`. H1 `clamp(2.75rem, 8.4vw, 6rem)`; impact numbers 3.5–4rem.
- `.m-title`: 700, width 106 %, tracking −0.02em. Section H2 2–2.5rem; H3 1.75–2rem.
- Body 1rem / 1.125–1.375rem in the hero, line-height 1.5–1.6, measure ≤ 70ch.
- `.m-label`: 0.75rem, 700, uppercase, tracking 0.1em, ink-2. `.m-label-mark` adds a terracotta square (green variant for Teaching).
- Numbers: `.m-num` → `tabular-nums`.

## Layout

- Column `max-width: 1120px`, centred, `px-5` (mobile) / `px-8` (md+). At ≥1280px the column gets 1px rules on both sides and the walls appear in the gutters.
- Header sticky, 64px, rule below. Footer rule above.
- Every section starts with a rule; heading left (5/12), subtitle right (7/12).
- Columns inside sections are separated by vertical hairlines (`md:border-l`), never cards. Rows (featured work) alternate image 7/12 and text 5/12.
- Radius: `--m-radius` 10px on every box, button, image and avatar; 4px on the highlighter. Depth: none.

## Walls (`app/components/home/PerspectiveWalls.tsx`)

One fixed, full-viewport SVG (`aria-hidden`), rendered only at ≥1280px after mount, so it accompanies the whole scroll. Each wall is a Déco column: bands are triangles from a bottom segment to that wall's vanishing point, 22 % of the gutter in from the column edge and 10 % of the viewport height above the top (`VP_INSET`, `VP_Y`); the two walls mirror each other. Near the column the bands stand vertical, outward they fan; dense at the top, sparse at the bottom. Rhythm: the 22-step `MOTIF` (hairline terracotta, wide sand field, hairline blue pairs, medium blue band, gaps) repeated outward with ±25 % jitter from a seeded PRNG (`mulberry32`, seeds 20261101 / 19300505) and growing with distance from the column. Watercolour filter: `feTurbulence` + `feDisplacementMap` (16px) wobble the edges, a second noise modulates the wash alpha (0.35–1), a 2.5px eroded rim darkens the edge; bands multiply onto the cream. Static in this phase; motion, if any, comes last and off under `prefers-reduced-motion`.

## Components

- Buttons `.m-btn` 48px tall, 1px border, 10px radius: `-solid` (ink, terracotta-deep on hover), `-ghost` (outline, ink fill on hover).
- Links `.m-link`: 1px underline at 45 % ink, offset 0.2em; 2px full-ink underline on hover. Colour never changes on hover.
- Nav links: underline on hover / current.
- Role line `.m-role`: 1.125–1.375rem, 700, all small caps, tracking 0.06em, under the H1 (never a kicker above it).
- Highlighter `.m-hl` (`<mark>`): ochre field, ink text, 4px radius.
- Boxes `.m-box`: 1px rule, 10px radius, clipped (project images).
- Inline metadata lists `.m-inline-list`: items joined by "·".
- Focus: 2px ink outline, 3px offset, on `:focus-visible`. Selection: ochre.

## Browser surfaces

`color-scheme: light`, `scrollbar-color` ink 45 % on cream, `accent-color` terracotta-deep, tap highlight terracotta at 20 %, `scroll-margin-top: 5rem` on anchors, smooth scroll only without reduced motion, theme-color `#F5EEDF` from `app/page.tsx`.
