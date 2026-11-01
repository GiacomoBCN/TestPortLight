# Product

<!-- impeccable:product-schema 1 -->

Written from `direzione/sito-brief.md` (Giacomo's brief, 28 Oct – 1 Nov 2026). Facts marked *(inferred)* were not confirmed by Giacomo in this session.

## Platform

web

## Users

A hiring manager or recruiter who is **already inside a hiring process** with Giacomo and has about two minutes. They usually arrive from the CV, a LinkedIn message, or an application email; they already know who he is. Real audience by analytics: Spain first (49 users, 147 s average), then the Gulf. Universities open the Teaching page.

Two minutes is enough to scroll, not to read: first screen, headings, numbers, one or two images. Long text is for whoever prepares an interview.

## Product Purpose

Giacomo Bianchi's personal portfolio (giacomobianchi.tech). It exists to leave the visitor with the sentence to repeat at the hiring table when Giacomo is not there, and the proof to back it. Success is measured in time per page and which case studies get opened, not in visits.

## Positioning

A senior product designer who also builds: design-system governance at Dow Jones (8 brands, 60+ designers, 200K component references), seven years teaching product design (1000+ students, EAE Business School), a PhD, and an AI product (StayKeel) taken from idea to production. Product work and teaching/research are **two equal paths**, not a main path and a footnote.

## Operating Context

- Static Next.js export deployed by GitHub Actions to GitHub Pages on every push to `main`; custom domain in `CNAME`; Google Analytics with the ID in the `NEXT_PUBLIC_GA_MEASUREMENT_ID` secret.
- Work happens on branches (`redesign`, `redesign-home`); `main` publishes the live site and is only updated when Giacomo says so.
- Google Analytics and the cookie-consent components are frozen: do not touch `app/components/GoogleAnalytics.tsx` or `app/components/CookieConsent.tsx`.
- Page URLs stay as they are (`/dowjones`, `/product-work`, `/teaching`, …).

## Capabilities and Constraints

- Phase 1 (this round): only the **look** of the home page changes. Texts, sections, order, links and linked pages stay identical. Delivered on a branch, not in production.
- Phase 2 (later, with Giacomo): home content (hero sentence from the Profile, StayKeel, section order), new StayKeel pages, opening blocks on case studies, aligned numbers, VOD relabelled as a design challenge, `/ecommerce-management` removed.
- Contact is email and LinkedIn only. No "Get resume", no contact form, no "Currently building…" line.
- Lighthouse mobile 95+, Accessibility 100, axe 0 violations, WCAG 2.2 AA on every page. Any motion starts after load, desktop only, off under `prefers-reduced-motion`.
- Every page gets its own `<title>` (analytics needs it).
- Open: analytics tool (GA4 vs PostHog), hosting, which case studies stay primary, whether the lines move (mouse / scroll / breathing) and how.

## Brand Commitments

- Binding visual direction (Giacomo, 1 Nov 2026): a **light, warm manifesto**. Cream base; palette from three illustrated landscapes (terracotta and orange of a rock arch, cream and sky light, green of a vault, dusty blue of walls); text in a warm dark brown. Two side walls of lines converging to a vanishing point high up, drawn in code (SVG/canvas), never an image, never a figure. Content left-aligned in a central column, poster-scale typography, a thin-rule grid for header and sections. On mobile the walls disappear and the clear column remains.
- Never: navy or night blue, StayKeel's colours (separate project), dark backgrounds, glow, gradients, particles, the "AI look" (spheres, sparkles, purple), cyberpunk, grey iOS minimalism, template dark-SaaS, third-party effects, found illustrations or figures, parallel oblique stripes as decoration, orange/ochre/yellow as text on light.
- Taste references: Futurism, 1930s travel and racing posters, America's Cup posters, Mondrian/van Doesburg (asymmetric grid, flat colour, light), Piero della Francesca and Perugino (linear perspective, off-centre vanishing point). "Solarmente tecnico": sunny in tone, technical in substance. Period reference, present-day execution.
- Name and lockup: "Giacomo Bianchi", "GB" monogram. Voice: direct, first person, measured claims with numbers attached to the project that proves them.

## Evidence on Hand

- Case studies in `app/pages/`: Dow Jones design system, VOD platform (built for an interview, to be relabelled), SGPV evolution, XpuntoCero, Back Office, TuPlanRedondo. Each has decision tables and measured results.
- Five real LinkedIn testimonials (Antonella Sassu, Oana Stroe, Frank Longo, Ismael Ruiz Gutierrez, Sergio D'Argenio) in `app/pages/Home.tsx`.
- Project images in `public/images/projects/`, one portrait in `public/images/profile/gb.ven_2.webp`, testimonial avatars in `public/images/profile/`.
- Teaching: 7 years at EAE Business School, 2 master's programmes, 1000+ students.
- Not on hand yet: StayKeel screenshots, film and design-system material (Figma "SK"), a CV link (deliberately not on the site).
- Numbers to reconcile across pages before Phase 2 (listed in the brief, section 4): VOD 5 platforms vs 4 devices, Dow Jones engineers vs stakeholders, SGPV 80 % wording, XpuntoCero satisfaction, TuPlanRedondo cost.

## Product Principles

1. Work above the fold, not a metric hero: the first screen shows a project.
2. One idea carried all the way through (the vanishing lines), not effects.
3. Every number attached to the project that proves it.
4. Mobile designed, not adapted.
5. Obvious navigation: the visitor always knows where they are and how to go back.

## Accessibility & Inclusion

WCAG 2.2 AA, Lighthouse Accessibility 100, axe 0 violations. Measured contrast on every text/background pair. Keyboard-reachable galleries and menus, named controls, visible focus, `prefers-reduced-motion` respected.
