// Testi della pagina Dow Jones Design System (app/pages/DowJones.tsx), nell'ordine delle sezioni.
// Testo semplice: nessun mini-markup in questa pagina.
// Le voci degli elenchi con il pallino "•" (role.items, outcomes.*.items) sono rese come
// " " + testo dopo lo span aria-hidden, come nell'originale.
import { projects } from "./projects";
import { shell } from "./shell";

export const dowJones = {
  backLink: shell.caseStudy.backLink,

  hero: projects.dowJones.caseStudyHero,

  intro: {
    image: "images/projects/brand-ds.webp",
    title: "Building a Unified System at Scale",
    paragraphs: [
      "Dow Jones operates multiple B2B and B2C brands including The Wall Street Journal, Barron's, MarketWatch and Factiva (B2B), with more in the pipeline (B2C and B2B). Each brand had evolved independently with its own design team, which drove rapid innovation and brand-specific optimization. As the company scaled, the opportunity emerged to unify these learnings into a shared foundation while preserving each brand's unique identity.",
      "As Lead Design Technologist and Product Owner for the design system, I co-owned the product roadmap with design and engineering leadership. The challenge was establishing governance that 8 autonomous brands would embrace, not as a constraint, but as an accelerator.",
      "We succeeded by reorganizing the architecture (20% less complexity), streamlining workflows (30% productivity boost), and embedding accessibility (WCAG 2.2) from day one. Today, the system powers 200K+ component instances used by 60+ designers and 120+ stakeholders across web, iOS, and Android.",
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

  teamAdoption: {
    title: "Team Adoption & Scale",
    subtitle: "Who uses the system and where it's deployed",
    // Icone nella pagina (teamAdoptionIcons), stesso ordine
    metrics: [
      {
        metric: "60+",
        label: "Designers Aligned",
        description: "Unified design teams across 8 brands",
      },
      {
        metric: "200K+",
        label: "Component References",
        description: "System adoption at scale across all products",
      },
      {
        metric: "120+",
        label: "Stakeholders",
        description:
          "Cross-functional collaboration (business, product, engineering, accessibility)",
      },
      {
        metric: "8",
        label: "Brands",
        description: "WSJ, Factiva, Barron's, MarketWatch, and more",
      },
      {
        metric: "3",
        label: "Platforms",
        description: "Web, iOS (SwiftUI), Android (native)",
      },
      {
        metric: "WCAG 2.2",
        label: "Accessibility",
        description: "EU & U.S. compliance standards",
      },
    ],
  },

  gallery: {
    title: "Project Gallery",
    images: [
      { file: "images/projects/token1-ds.webp", alt: "Design System" },
      { file: "images/projects/token2-ds.webp", alt: "Design Tokens" },
      { file: "images/projects/token3-ds.webp", alt: "Design System" },
    ],
  },

  businessContext: {
    number: "01",
    title: "Business Context",
    card: {
      title: "From Autonomy to Unified Scale",
      paragraphs: [
        "As Dow Jones grew its portfolio—The Wall Street Journal, Barron's, MarketWatch, Factiva, and more—each brand developed its own design approaches and workflows. This autonomy was a strength: teams moved fast, optimized for their specific audiences, and built strong brand identities.",
        "The opportunity emerged as the company scaled: could we preserve that brand autonomy while creating a shared foundation that would accelerate everyone? The goal wasn't to standardize everything. It was to enable teams to move faster by solving common problems once, then customizing where it mattered.",
      ],
      needsLabel: "What we needed:",
      needs: [
        "A governance model that brands would adopt voluntarily (not mandated from above)",
        "Technical architecture flexible enough to support B2C and B2B contexts",
        "A system that preserved brand identity while enabling cross-brand efficiency",
      ],
    },
  },

  governance: {
    number: "02",
    title: "Governance & Architecture",
    tokenFirst: {
      title: "Token-First Architecture",
      paragraphs: [
        "Our team proposed a token-first strategy to enable multi-brand scale. Design tokens are variables that store foundational design attributes: colors, spacing, typography, shadows. Think of them like Lego bricks. You build the component structure once (the brick shape), then snap on different tokens (colors and styles) to create brand-specific versions.",
        "All brands use the same token structure, but each assigns different values. For example, \"Ink\" is a token family for typography and iconography. Within that family, there are specific tokens like InkBrand. Both The Wall Street Journal and Factiva have the same Ink family with the same InkBrand token, but each brand assigns different values to it. Same structure, different brand expression.",
        "My role was bridging the technical vision with designers and stakeholders, helping them understand how \"variables\" would speed up their work. Many struggled with the abstraction, so I translated it simply: \"Design once, the system adapts it to every brand automatically.\" I also worked with teams when system rules felt too strict, explaining the reasoning behind governance decisions and helping stakeholders see why consistency mattered for long-term scale.",
      ],
      enabledLabel: "What this enabled:",
      enabled: [
        "Migrated to platform-agnostic Style Dictionary (one source for web, iOS, and Android)",
        "Automated token distribution via CI/CD (designers update Figma, tokens flow to all platforms)",
        "Single source of truth for visual properties (no more \"which blue?\" debates)",
        "White-label theming and dark mode without rebuilding components",
      ],
      conclusion:
        "Instead of 8 separate design systems, we had one flexible system expressing 8 brand identities. The technical architecture made it possible; my role was ensuring adoption and governance.",
    },
    repository: {
      title: "Repository & Documentation Overhaul",
      paragraphs: [
        "Led the reorganization of core repositories and Storybook architecture, reducing component complexity by 20% and dramatically improving discoverability for both engineers and designers. This wasn't just technical cleanup. It required careful coordination across 8 brands.",
        "I moderated every handoff and pre-handoff session, acting as problem solver when brand-specific needs conflicted with system-wide goals. These sessions were where the real governance work happened: finding solutions that satisfied individual brand requirements while maintaining system integrity.",
      ],
      resultsLabel: "Results:",
      results: [
        "Improved component organization and documentation structure",
        "Streamlined contribution workflows and approval processes",
        "Facilitated handoff sessions as moderator, resolving conflicts between brand needs and system goals",
        "Faster onboarding (new team members reached productivity sooner)",
      ],
    },
  },

  keyDecisions: {
    number: "03",
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
        impact: "30% productivity boost",
      },
    ],
  },

  collaboration: {
    number: "04",
    title: "How We Worked: Process, Quality & Collaboration",
    partnership: {
      title: "Cross-Functional Partnership",
      text: "Partnered with over 120 stakeholders from product, engineering, and accessibility teams to ensure scalable implementation and alignment across all brands.",
      listLabel: "What this looked like:",
      items: [
        "Collaborated with analytics teams using Google Analytics and internal dashboards to inform product improvements and support data-driven prioritization",
        "Demonstrated a \"make things happen\" mindset through ownership and speed (no waiting for perfect conditions)",
        "Regular sync meetings across time zones to keep 8 brands aligned",
      ],
    },
    accessibility: {
      title: "Accessibility & Quality",
      text: "Ensured accessibility (A11y) best practices were embedded into the design system from day one, meeting EU and U.S. compliance standards (WCAG 2.2). This wasn't a checklist. It was baked into our workflow.",
      listLabel: "How we validated:",
      items: [
        "Collaborated with the accessibility lead on validation strategy and testing protocols",
        "Facilitated alignment between design, engineering, and accessibility teams on component compliance",
        "Improved workflows for accessibility review and design acceptance",
      ],
    },
    aiWorkflow: {
      title: "AI-Assisted Workflow",
      text: "I used AI throughout this work. ChatGPT and Vertex AI for speeding up documentation, component specs, and prototyping. Also automated quality checks and consistency validation. It's not magic, but it does let you iterate faster and catch more issues.",
    },
  },

  outcomes: {
    number: "05",
    title: "Business Outcomes",
    subtitle: "How the system improved velocity and quality",
    intro:
      "The design system contributed to improved UX consistency across all Dow Jones digital properties, reduced friction in user journeys, and delivered measurable gains in how teams work. The system enabled scalable cross-platform development and faster time-to-market for new features.",
    productivity: {
      value: "30%",
      title: "Productivity Boost",
      text: "Streamlined workflows, improved documentation, and reduced design-to-code inconsistency. Teams spend less time reinventing solutions and more time solving user problems.",
      listLabel: "How we got there:",
      items: [
        "Better Storybook organization makes component discovery faster",
        "Token automation eliminates manual sync between design and code",
        "Clear contribution guidelines reduce back-and-forth in reviews",
      ],
    },
    complexity: {
      value: "20%",
      title: "Complexity Reduction",
      text: "Repository reorganization and architectural simplification made the system easier to maintain and extend. Simpler code means fewer bugs and faster onboarding.",
      listLabel: "What changed:",
      items: [
        "Consolidated redundant components",
        "Clearer component hierarchy in Storybook",
        "Platform-agnostic tokens reduced platform-specific code",
      ],
    },
    wcag: {
      title: "WCAG 2.2 Compliance Across All Brands",
      text: "Accessibility isn't a feature. It's a requirement. Every component meets EU and U.S. compliance standards, validated through automated testing and manual review. This benefits all users, not just those with disabilities.",
    },
    image: {
      file: "images/projects/brand-ds.webp",
      alt: "Design system deployed across WSJ, Barron's, Factiva, and MarketWatch on multiple devices",
      caption: "The system in production across B2B & B2C brands and 3 platforms",
    },
  },

  cta: {
    title: shell.caseStudy.moreWorkTitle,
    text: "This is just one example of how I lead cross-functional teams to deliver measurable business impact through strategic design and technical leadership.",
    primary: shell.caseStudy.allProjects,
    secondary: shell.caseStudy.letsTalk,
  },
};
