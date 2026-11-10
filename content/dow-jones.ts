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
  scale: "8 brands · 3 platforms · 60+ designers · 120+ stakeholders · 200K+ component references · WCAG 2.2",

  intro: {
    image: "images/projects/brand-ds.webp",
    title: "Eight brands, one system, adopted by choice",
    paragraphs: [
      "Dow Jones operates multiple B2B and B2C brands including The Wall Street Journal, Barron's, MarketWatch and Factiva (B2B), with more in the pipeline (B2C and B2B). Each brand had evolved independently with its own design team, which drove rapid innovation and brand-specific optimization. As the company scaled, the opportunity emerged to unify these learnings into a shared foundation while preserving each brand's unique identity.",
      "As Lead Design Technologist and Product Owner for the design system, I co-owned the product roadmap with design and engineering leadership. The challenge was establishing governance that 8 autonomous brands would embrace, not as a constraint, but as an accelerator.",
      "We succeeded by reorganizing the architecture (20% less complexity), streamlining workflows (30% less back-and-forth between design and engineering), and embedding accessibility (WCAG 2.2) from day one. Today, the system powers 200K+ component instances used by 60+ designers and 120+ stakeholders across web, iOS, and Android.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "Multiple B2B and B2C brands, each with strong design identities. The opportunity: create a unified foundation that accelerates development while preserving brand uniqueness.",
  },

  role: {
    title: "My Role",
    summary: "Lead Design Technologist",
    items: [
      "Product roadmap co-ownership",
      "Design system governance",
      "Component architecture",
      "Stakeholder alignment & conflict resolution",
      "Bridge between design vision and technical implementation",
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
          "Our team proposed a token-first strategy to enable multi-brand scale. Design tokens are variables that store foundational design attributes: colors, spacing, typography, shadows. Think of them like Lego bricks. You build the component structure once (the brick shape), then snap on different tokens (colors and styles) to create brand-specific versions.",
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
          "Instead of 8 separate design systems, we had one flexible system expressing 8 brand identities. The technical architecture made it possible; my role was ensuring adoption and governance.",
      },
      {
        title: "Repository & documentation overhaul",
        stat: { value: "20%", label: "Complexity Reduction" },
        paragraphs: [
          "Led the reorganization of core repositories and Storybook architecture, reducing component complexity by 20% and dramatically improving discoverability for both engineers and designers. This wasn't just technical cleanup. It required careful coordination across 8 brands.",
          "I moderated every handoff and pre-handoff session, acting as problem solver when brand-specific needs conflicted with system-wide goals. These sessions were where the real governance work happened: finding solutions that satisfied individual brand requirements while maintaining system integrity.",
          "Repository reorganization and architectural simplification made the system easier to maintain and extend. Simpler code means fewer bugs and faster onboarding.",
        ],
        lists: [
          {
            label: "Results:",
            items: [
              "Improved component organization and documentation structure",
              "Streamlined contribution workflows and approval processes",
              "Facilitated handoff sessions as moderator, resolving conflicts between brand needs and system goals",
              "Faster onboarding (new team members reached productivity sooner)",
            ],
          },
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
        title: "Review and handoff",
        stat: { value: "30%", label: "Less back-and-forth" },
        paragraphs: [
          "Approving one component could take two weeks of open questions in GitHub threads. I analysed the threads and found the arguments were about who could close a discussion, not about what the spec said. Measured by comparing GitHub review threads before and after the pilot.",
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
        title: "Accessibility in UAT",
        paragraphs: [
          "The system was built to WCAG 2.2, the EU and U.S. standard. The accessibility lead reviewed every new or changed component in UAT, and nothing reached the production library without that sign-off.",
        ],
        lists: [
          {
            label: "How we validated:",
            items: [
              "Collaborated with the accessibility lead on validation strategy and testing protocols",
              "Facilitated alignment between design, engineering, and accessibility teams on component compliance",
              "Improved workflows for accessibility review and design acceptance",
            ],
          },
        ],
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
              "Collaborated with analytics teams using Google Analytics and internal dashboards to inform product improvements and support data-driven prioritization",
              "Ran 15-minute online coffee chats with stakeholders and their managers to understand their constraints before asking them for anything",
              "Regular sync meetings across time zones to keep 8 brands aligned",
            ],
          },
        ],
      },
      {
        title: "AI-assisted workflow",
        paragraphs: [
          "I used AI throughout this work. ChatGPT and Vertex AI for speeding up documentation, component specs, and prototyping. Also automated quality checks and consistency validation. It's not magic, but it does let you iterate faster and catch more issues.",
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
