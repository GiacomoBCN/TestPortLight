// Testi della pagina Design System (app/pages/DesignSystem.tsx), nell'ordine delle sezioni.
// Stesso schema di content/falak.ts e content/ai-product.ts.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**, *corsivo*, [testo](url), `codice`, \n = <br />.
import { projects } from "./projects";
import { shell } from "./shell";

export const designSystem = {
  demoUrl: "https://staykeel.com",

  backLink: shell.caseStudy.backLink,

  // Metadati della pagina (app/(links)/design-system/page.tsx)
  metadata: {
    title: "A design system sized to its product · Giacomo Bianchi",
    description:
      "A three-level token architecture for one product, with the reasons for what was built and what was not.",
  },

  // Immagini: file in public/images/projects/design-system/ e testo alternativo.
  // Se un file manca al build, la sezione mostra solo il testo.
  shots: {
    cardRest: { file: "01-card-rest.webp", alt: "The card at rest" },
    tokensBoard: { file: "02-tokens-board.webp", alt: "The full token board" },
    cardAnatomy: { file: "03-card-anatomy.webp", alt: "Card anatomy and states" },
    // Libreria Figma, in ordine Atomic Design: si apre come galleria dalla box 5
    figmaAtoms: { file: "05-figma-atoms.webp", alt: "Figma library: icons, buttons, chips and inputs, all labelled IN CODE" },
    figmaMolecules: { file: "06-figma-molecules.webp", alt: "Figma library: rating bar, citation chip, ask dock and error notices, all labelled IN CODE" },
    figmaOrganisms: { file: "07-figma-organisms.webp", alt: "Figma library: the document card in all its states, and the header" },
  },

  hero: projects.designSystem.caseStudyHero,

  // Blocco 16:9 sotto l'hero. Percorsi sotto public/.
  // Se i video non ci sono (controllo a build time) si vede il segnaposto `heroPlaceholder`.
  heroMedia: {
    video: "video/token-layers-loop.mp4",
    webm: "video/token-layers-loop.webm",
    poster: "video/token-layers-loop-poster.webp",
    // Testo alternativo del video: da scrivere. Finche' e' vuoto il video e' trattato come decorativo.
    alt: "",
    // Etichette (per screen reader) del bottone sotto il video
    pauseLabel: "Pause video",
    playLabel: "Play video",
  },

  heroPlaceholder: [
    { label: "L1 · Palette", note: "raw values" },
    { label: "L2 · Source scope", note: "[data-source]" },
    { label: "L3 · Contextual", note: "what components read" },
  ],

  intro: {
    title: "The source is the theme",
    paragraphs: [
      "In a multi-brand system, one theme keeps every product on the same structure: same token names, different values. Here there is one product, but five kinds of content, and each needs its own colour on the card. So I treated the five sources as five themes. The colour is the theme, and the theme is where the token architecture starts.",
      "Three levels. Raw values that no component ever reads. A scope per source that remaps six contextual tokens. And the contextual tokens, which are the only thing a component reads. The card does not know YouTube exists. Adding a source tomorrow is one block of CSS and zero lines in any component.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "Keep the discipline of a system built for sixty designers, without its weight. Decide what deserves a token, what deserves a component, and what should stay a one-off, when there is nobody to ask and no second product to justify an abstraction.",
  },

  role: {
    title: "My Role",
    summary: "Architecture, tokens, components, documentation",
    items: [
      "Designed the three-level token architecture and its naming.",
      "Built it in CSS custom properties, with a generated token page and a drift check.",
      "Decided which parts become components and which states exist.",
      "Mirrored the system in Figma from the product, not before it.",
    ],
  },

  scope: {
    title: "Scope",
    items: [
      "113 tokens, each with a documented role",
      "Five content sources as theme scopes, plus a fallback",
      "38 components and 162 variants in Figma, every one shipped and labelled IN CODE; nothing designed that is not in production",
      "Figma variables that mirror the code one to one",
    ],
  },

  approach: {
    number: "01",
    title: "Approach",
    subtitle: "Three levels, one rule, and the proof that it holds.",
    enlarge: "Enlarge",
    enlargeImageLabel: (alt: string) => `Enlarge image: ${alt}`,
    // Box con piu' immagini: si vede solo la prima, con "+N"; il clic apre la galleria
    galleryLabel: (alt: string, count: number) => `Open gallery of ${count} images: ${alt}`,
    moreImages: (n: number) => `+${n}`,
    // images: chiavi di `shots`; demo: true = qui va la demo interattiva (TokenDemoCard)
    patterns: [
      {
        title: "Three levels, and components read only the third",
        text: "Level 1 is the palette: raw values, named by value, never read by a component. Level 2 is a scope per source, `[data-source=\"youtube\"]`, that remaps six contextual tokens. Level 3 is what the card reads: `border-card`, `icon-card`, `bkg-pill` and so on. A source lives in the scope, never in a token name. If it were in the name, the card would need a condition to pick it, and every new source would touch the component.",
        images: ["tokensBoard"],
        demo: false,
      },
      {
        title: "The proof, live",
        text: "This is a demonstration card written for this page, with the same architecture and the same values. Change the source: six colours follow, the rating box doesn't, and the component code contains no colour name. In the product, a search for any source name inside the components, for colour purposes, returns nothing.",
        images: [],
        demo: true,
      },
      {
        title: "A token is chosen for its role, never for its value",
        text: "Two things that look the same today get two tokens if they do different jobs, because they will diverge. The rating label and the meta line are both small monospace capitals; they are two roles, so two tokens. The rule cuts both ways: a new role gets a new token even when its value already exists.",
        images: [],
        demo: false,
      },
      {
        title: "Component, pattern, guideline or one-off",
        text: "One question decides: is it reused in more than one place? When the system was only the card, that test gave four components: source icon, tab selector, chip and rating row. Header, tab row, content area and footer are used once, so they stay inside the card. \"Confirm before delete, inside the card\" is a pattern. \"Only source colours go through tokens\" is a guideline. As the product grew to the header, the chat and the onboarding, the same test gave 38 components, each with its states, and every one of them is in production.",
        images: ["cardAnatomy"],
        demo: false,
      },
      {
        title: "Figma came last, generated from the product",
        text: "Alone, the product was the fastest place to decide. The Figma library was generated from the code afterwards, so the two cannot disagree: every variable mirrors a token, every component carries an `IN CODE` label, the component library follows Atomic Design (tokens, atoms, molecules, organisms, templates), and the token page in the app is read from the stylesheet itself, with a drift check that flags any token without a documented role.",
        images: ["figmaAtoms", "figmaMolecules", "figmaOrganisms"],
        demo: false,
      },
    ] as const,
  },

  // Demo interattiva (app/components/casestudy/TokenDemoCard.tsx).
  // I nomi delle fonti stanno solo qui e nel CSS della demo, mai nel componente.
  demo: {
    chipsLabel: "Content source",
    // id = valore di data-source; glyph = segno nel riquadro icona della card
    sources: [
      { id: "youtube", label: "YouTube", glyph: "▶" },
      { id: "linkedin", label: "LinkedIn", glyph: "in" },
      { id: "instagram", label: "Instagram", glyph: "IG" },
      { id: "article", label: "Article", glyph: "Aa" },
      // PDF: per StayKeel e' un articolo, quindi usa lo scope (i colori) di Article; cambia solo il simbolo
      { id: "pdf", label: "PDF", glyph: "pdf", scope: "article" },
      { id: "github", label: "GitHub", glyph: "GH" },
      { id: "unknown", label: "Unknown source", glyph: "?" },
    ],
    card: {
      title: "One card, five sources",
      author: "G.B.",
      saved: "SAVED 7 NOV 26",
      tabs: ["Short", "Medium", "Original"],
      body: "This card changes its colour and icon with each of its five sources. The layout and the tokens behind it stay the same.",
      chips: ["Tokens", "Theming", "Design systems"],
      rated: "RATED: LOVE IT",
      focus: "READ IN FOCUS",
    },
    table: {
      tokenHeader: "Contextual token",
      valueHeader: (scope: string) => `Resolved value (scope: ${scope})`,
    },
  },

  keyDecisions: {
    number: "02",
    title: "Key Decisions & Trade-offs",
    subtitle: "What I chose, what I gave up, and what it bought.",
    impactLabel: "What it bought",
    decisions: [
      {
        point: "Where the source lives",
        options: ["In the token name (`border-card-youtube`)", "In a scope (`[data-source]`) that remaps the same names"],
        rationale:
          "A name per source puts a condition in every component. A scope keeps the component ignorant and makes a new source a CSS block.",
        impact: "New source: 1 block, 0 component changes",
      },
      {
        point: "Two levels or three",
        options: ["Palette + semantic", "Palette + scope + contextual"],
        rationale:
          "With two levels the theme axis has nowhere to go but the component. The middle level is small (six tokens per source) and is the whole theming mechanism.",
        impact: "Theme axis independent of components",
      },
      {
        point: "Lightness over nominal level",
        options: ["Every source at the same Tailwind step", "Align on perceived lightness"],
        rationale:
          "Four sources sit at step 400. GitHub at 400 was ten L* points lighter than the cluster, so it is at 500. The palette aligns on how light the colour looks, not on what the scale calls it.",
        impact: "Sources read as one family",
      },
      {
        point: "Colour is never the only signal",
        options: ["Colour alone", "Colour plus a text badge; read/unread on a different channel"],
        rationale:
          "Each card carries a short text label of its source, so it works in greyscale and with colour blindness. Read and unread never share the colour channel with the source.",
        impact: "Works without colour",
      },
      {
        point: "What not to tokenise",
        options: ["Full type scale, spacing and radius tokens", "Only roles the product uses"],
        rationale:
          "A single product does not justify a scale. Type tokens are per role; spacing and radius are not tokenised yet. The day a second surface needs them is the day they get built, everywhere at once.",
        impact: "113 tokens, none unused",
      },
      {
        point: "How many components",
        options: ["A component per visual element", "Only what passes the reuse test"],
        rationale:
          "Parts used once stay where they are. Promoting them would add files, variants and maintenance for zero reuse. Nothing in the library is speculative: a component exists because the product ships it.",
        impact: "38 components, 162 variants, none unused",
      },
    ],
  },

  learnings: {
    number: "03",
    title: "What I Learned",
    items: [
      {
        title: "The work that disappeared was the drawing. The work that stayed was deciding.",
        text: "Generating Figma from the product removed hours of redrawing. It did not remove a single decision: which states exist, which parts earn a component, what stays out. Those were made before any tool ran.",
      },
      {
        title: "A known outlier beats a hidden one",
        text: "The article amber sits fourteen L* points above the other sources, and it is the most frequent colour in the feed, next to the brand peach. It is not a defect today. It is written down as the worst case for any dark theme, with the ticket that will pay for it. A palette that is honest about its weak point is easier to govern than one that looks perfect.",
      },
      {
        title: "Alone, the product is the fastest place to decide. With a team, that changes.",
        text: "Working solo, Figma was a canvas for early ideas and the code was the source of truth. Add one more designer and the Figma file stops being optional: it is where people see the system without opening the product. The right setup depends on who has to reach the decisions, not on the tool.",
      },
      {
        title: "Figma can hold the truth. It cannot be the bottleneck.",
        text: "If a decision lives somewhere only one role can open, that role becomes the bottleneck. The question is not which tool holds the truth; it is who can reach it.",
      },
    ],
  },

  cta: {
    title: "See the tokens, or talk about them",
    text: "The product is live. If you run a design system and are deciding how much of it one product really needs, I'd like to compare notes.",
    demo: "Open StayKeel",
    allProjects: shell.caseStudy.allProjects,
    talk: shell.caseStudy.letsTalk,
  },
};

export type DesignSystemShotKey = keyof typeof designSystem.shots;
