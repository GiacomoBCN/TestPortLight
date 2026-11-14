// Testi della pagina Dow Jones Design System (app/pages/DowJones.tsx), nell'ordine delle sezioni.
// Stessa struttura di /design-system/, /ai-product/ e /falak/: titolo e frase tesi, Challenge · Role · Scope,
// Approach, Key Decisions & Trade-offs, What I Learned, chiusura.
// Testo semplice: nessun mini-markup in questa pagina.
import { projects } from "./projects";
import { shell } from "./shell";

export const dowJones = {
  backLink: shell.caseStudy.backLink,

  hero: projects.dowJones.caseStudyHero,
  // Riga sotto il paragrafo di apertura (hero.description)
  scale: "8 brands · 18+ brand versions across web, iOS and Android · 60+ designers · 120+ stakeholders · 200K+ component references · WCAG 2.2",

  intro: {
    image: "images/projects/brand-ds.webp",
    title: "Eight brands, one system, adopted by choice",
    paragraphs: [
      "Dow Jones operates multiple B2B and B2C brands including The Wall Street Journal, Barron's, MarketWatch and Factiva (B2B), with more in the pipeline (B2C and B2B). Each brand had evolved independently with its own design team, which drove rapid innovation and brand-specific optimization. As the company scaled, the opportunity emerged to unify these learnings into a shared foundation while preserving each brand's unique identity.",
      "As Lead Design Technologist and Product Owner for the design system, I co-owned the product roadmap with design and engineering leadership. The challenge was a governance model that 8 autonomous brands would adopt by choice.",
      "We succeeded by reorganizing the architecture (20% less complexity), streamlining workflows (30% less back-and-forth between design and engineering), and embedding accessibility (WCAG 2.2) from day one. Today, the system powers 200K+ component instances used by 60+ designers and 120+ stakeholders across web, iOS, and Android.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "Multiple B2B and B2C brands, each with strong design identities. The opportunity: create a unified foundation that accelerates development while preserving brand uniqueness.",
  },

  role: {
    title: "My Role",
    summary: "Lead Design Technologist, one of two.",
    // label in grassetto, poi il testo
    groups: [
      {
        label: "Owned:",
        text: "the review and handoff process between design and engineering. The final quality check on every project using the system, from PRD to QA. The reorganization of the library across Figma, repositories and Storybook.",
      },
      {
        label: "Co-led:",
        text: "governance and adoption across 8 brands. Roadmap and backlog, with design and engineering leadership.",
      },
      {
        label: "Contributed to:",
        text: "the token architecture, led by Kevin Muldoon. The move to Style Dictionary, built with the engineers.",
      },
    ],
  },

  scope: {
    title: "Scope",
    text: "Cross-platform system · 8 brands · Web, iOS, Android · WCAG 2.2 compliant",
  },

  gallery: {
    title: "Project Gallery",
    images: [
      { file: "images/projects/token1-ds.webp", alt: "Design System" },
      { file: "images/projects/token2-ds.webp", alt: "Design Tokens" },
      { file: "images/projects/token3-ds.webp", alt: "Design System" },
    ],
  },

  // Approach: una card per sottosezione, nell'ordine della pagina.
  // stat (facoltativo): il numero del vecchio blocco di Business Outcomes, mostrato in cima alla card.
  // lists: elenchi con la loro etichetta. closing (facoltativo): frase finale.
  // Icone nella pagina (approachIcons), stesso ordine.
  approach: {
    number: "01",
    title: "Approach",
    items: [
      {
        title: "Token-first architecture",
        paragraphs: [
          "Our team proposed a token-first strategy to enable multi-brand scale. Design tokens are variables that store foundational design attributes: colors, spacing, typography, shadows.",
          "All brands use the same token structure, but each assigns different values. For example, \"Ink\" is a token family for typography and iconography. Within that family, there are specific tokens like InkBrand. Both The Wall Street Journal and Factiva have the same Ink family with the same InkBrand token, but each brand assigns different values to it. Same structure, different brand expression.",
          "My role was bridging the technical vision with designers and stakeholders, helping them understand how \"variables\" would speed up their work. Many struggled with the abstraction, so I translated it simply: \"Design once, the system adapts it to every brand automatically.\" I also worked with teams when system rules felt too strict, explaining the reasoning behind governance decisions and helping stakeholders see why consistency mattered for long-term scale.",
        ],
        lists: [
          {
            label: "What this enabled:",
            items: [
              "Migrated to platform-agnostic Style Dictionary (one source for web, iOS, and Android)",
              "Automated token distribution via CI/CD (designers update Figma, tokens flow to all platforms)",
              "Single source of truth for visual properties (no more \"which blue?\" debates)",
              "White-label theming and dark mode without rebuilding components",
            ],
          },
        ],
        closing:
          "Instead of 8 separate design systems, we had one flexible system expressing 8 brand identities. Kevin Muldoon and I were the two Lead Design Technologists. He led the token architecture; I contributed to it and co-led governance and adoption across eight brands.",
      },
      {
        title: "Review and handoff",
        stat: { value: "30%", label: "Less back-and-forth" },
        paragraphs: [
          "I had no direct authority over designers or engineers, so the change had to be earned, not imposed. Approving one component could take two weeks of open questions in GitHub threads. I analysed the threads and found the arguments were about who could close a discussion, not about what the spec said. Measured by comparing GitHub review threads before and after the pilot.",
        ],
        lists: [
          {
            label: "How we got there:",
            items: [
              "Questions written to be closed, not open",
              "A short ceremony before every handoff",
              "A 15-minute call, with me moderating, once a thread stalled",
              "Piloted on one team, then extended to all eight",
            ],
          },
        ],
      },
      {
        title: "Repository & documentation overhaul",
        stat: { value: "20%", label: "Complexity Reduction" },
        paragraphs: [
          "I directed the reorganization of the library across Figma, the shared repositories and Storybook, so that a designer or an engineer could find and use a component without asking the system team. Because each brand had grown on its own, the libraries held duplicates and components that were only partly used. I set the direction: merge the duplicates, retire what nobody used, and rename the rest so that a name says what the component does. The team did the work and I approved each change. The 20% is the drop in components and variants after that work.",
          "I moderated every handoff and pre-handoff session, acting as problem solver when brand-specific needs conflicted with system-wide goals. These sessions were where the real governance work happened: finding solutions that satisfied individual brand requirements while maintaining system integrity.",
        ],
        lists: [
          {
            label: "What changed:",
            items: [
              "Consolidated redundant components",
              "Clearer component hierarchy in Storybook",
              "Platform-agnostic tokens reduced platform-specific code",
            ],
          },
        ],
      },
      {
        title: "Accessibility in UAT",
        paragraphs: [
          "The system was built to WCAG 2.2, the EU and U.S. standard. The accessibility lead reviewed every new or changed component in UAT, and nothing reached the production library without that sign-off.",
          "Semantic markup and keyboard behaviour were written as component requirements, not left to an audit. I was the final check from PRD to QA, and no project closed with an open gap in UX, design or accessibility deliverables.",
        ],
        lists: [],
      },
      {
        title: "Cross-functional partnership",
        paragraphs: [
          "Partnered with over 120 stakeholders from product, engineering, and accessibility teams to ensure scalable implementation and alignment across all brands.",
        ],
        lists: [
          {
            label: "What this looked like:",
            items: [
              "Used internal dashboards to track how the system was used, and turned that into roadmap priorities",
              "Ran 15-minute online coffee chats with stakeholders and their managers to understand their constraints before asking them for anything",
              "Regular sync meetings across time zones to keep 8 brands aligned",
            ],
          },
        ],
      },
      {
        title: "AI in documentation",
        paragraphs: [
          "This was before today’s AI tooling. I used ChatGPT and Vertex AI mainly for documentation: the same component was described in three ways, for a product manager, a designer and a developer, so each reader got what they needed to decide or to build.",
        ],
        lists: [],
      },
    ],
  },

  keyDecisions: {
    number: "02",
    title: "Key Decisions & Trade-offs",
    decisions: [
      {
        point: "Governance Model",
        options: ["Centralized team", "Distributed contributors", "Hybrid model"],
        rationale:
          "Hybrid approach balanced central oversight with brand autonomy. Brands contributed to the system while maintaining their unique identities. This voluntary adoption model was critical.",
        impact: "All 8 brands adopted the system",
      },
      {
        point: "Platform Architecture",
        options: [
          "React-only",
          "Native per platform",
          "Token-based cross-platform",
        ],
        rationale:
          "Token-first strategy using Style Dictionary enabled one source of truth across web, iOS, and Android. This unlocked multi-brand theming and dark mode without rebuilding components.",
        impact: "Cross-platform consistency",
      },
      {
        point: "Component Complexity",
        options: ["Simple atoms only", "Complex compositions", "Tiered system"],
        rationale:
          "Tiered system with reorganized Storybook architecture provided flexibility while maintaining consistency. Improved discoverability for 60+ designers and 120+ stakeholders.",
        impact: "20% complexity reduction",
      },
      {
        point: "Documentation & Workflow Strategy",
        options: [
          "Code comments",
          "Separate docs site",
          "Integrated Storybook + process optimization",
        ],
        rationale:
          "Storybook integration kept docs close to code, increasing usage and reducing maintenance burden. I also improved team workflows for handoffs, UAT, QA, and design acceptance, streamlining how designers and engineers collaborated.",
        impact: "30% less back-and-forth in reviews",
      },
    ],
  },

  learnings: {
    number: "03",
    title: "What I Learned",
    items: [
      {
        title: "The system was never the hard part. The handoff was.",
        text: "Tokens, components and documentation could be planned. What slowed delivery was the moment work passed from design to engineering, across teams and time zones. I moderated every handoff, and that is where the biggest gain came from.",
      },
      {
        title: "Friction moves upstream: talk before the handoff, not after it.",
        text: "Many questions in review came from designs that did not fit technical constraints. Adding two or three short meetings between designers and engineers before the handoff meant those questions were answered while the design could still change.",
      },
      {
        title: "A component earns its place when more than one product needs it.",
        text: "A request from one product stayed in that product’s library. We logged it, and promoted it to the shared system only when two or three products needed the same thing. Exceptions needed numbers, not opinions.",
      },
      {
        title: "Without numbers you trust, every no is just an opinion.",
        text: "We tracked adoption by hand, and the data was always behind. Figma showed where designers detached components, a script showed where code imported them, and neither showed how often people actually saw them. Next time I would measure all three from day one.",
      },
    ],
  },

  // Immagine prima della chiusura (la stessa dell'introduzione), con didascalia
  closingImage: {
    file: "images/projects/brand-ds.webp",
    alt: "Design system deployed across WSJ, Barron's, Factiva, and MarketWatch on multiple devices",
    caption: "The system in production across B2B & B2C brands and 3 platforms",
  },

  // Chiusura: il sistema non e' pubblico, quindi niente demo; contatto e tutti i progetti
  cta: {
    title: "Talk about the system",
    text: "The system is internal to Dow Jones, so there is no public link. I’m happy to walk you through the architecture, the review process and the decisions behind them.",
    talk: shell.caseStudy.letsTalk,
    allProjects: shell.caseStudy.allProjects,
  },
};
