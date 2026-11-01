---
version: 1
slug: "app-pages-home-tsx"
primary_target: "app/pages/Home.tsx"
related_targets: ["app/page.tsx","app/components/home"]
---

# Home (/) — Phase 1: form only

Scope: the home page look. Content, sections, order, links and linked pages stay identical. Branch `redesign-home`. Visitor mode: Experience (portfolio) with a Persuade job: a recruiter already in process, two minutes, needs the sentence and the proof.

Audience and job: hiring manager / recruiter who knows Giacomo; scrolls, does not read; must leave with "aligns designers and engineers, design systems in production, 1000+ students" and the way to the case studies and to Teaching.

Proof on the page: Dow Jones, VOD, SGPV, XpuntoCero case studies with measured numbers; five real testimonials; one portrait.

Constraints: Lighthouse mobile 95+, Accessibility 100, WCAG 2.2 AA; no GA/consent changes; walls hidden below 1280px; no motion in this phase.

## Direction contract

THESIS: A light, warm manifesto. Two walls of vertical bands, like the Art Déco columns of Giacomo's sketch, each converging on its own vanishing point at the inner top corner of its gutter; the content stands in the light between them. It refuses the centred dark-SaaS hero with metric cards and glow, and it refuses parallel oblique stripes: within each wall every band really meets one point.

OWN-WORLD: Cream paper (#F5EEDF) with a warm dark brown ink (#2A1D15). Walls in three watercolour tones (SVG filter: wobbled edges, uneven wash, darker rim): sand (#E3CFA6) wide bands, dusty blue (#9DB1BF) medium bands, terracotta (#C2552A) thin accents. No colour fields: the page closes light, on cream. Archivo variable, two weights (400/700), headings semi-expanded; thin 1px rules (ink at 16%) draw the column edges, the header and every section top. No cards, no shadows; buttons, images, boxes and avatars share one 10px radius, the lines stay hard.

STORY: Name and claim first, in poster scale; proof in numbered columns; the work as large alternating rows; the person; the colleagues; the two doors (Product / Teaching) as a light two-column close, then the footer with email and LinkedIn.

FIRST VIEWPORT: Header row inside the column (GB mark + name left, nav right, rule below). Hero fills ~80vh: left-aligned H1 "Giacomo Bianchi, PhD" at clamp(3rem, 7vw, 6rem), the role line "Product & Design Leadership" under it in small caps (1.375rem) with a terracotta square, the two-sentence paragraph at 1.25rem with one ochre highlight, two buttons (ink-filled "View Product Work", outlined "View Teaching Portfolio") and the chevron link to #impact. The walls fill the gutters at either side at 1280 and above and stay fixed through the whole scroll; each wall's bands rise to its own vanishing point at 22 % of the gutter in from the column edge and 10 % of the viewport height above the top. Primary action: "View Product Work".

FORM: Perspective walls in code; chosen because the brief pins it. Position on the list: 1 (pinned). seed: none (unavailable) — the brief pinned the direction, no roll was run.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
