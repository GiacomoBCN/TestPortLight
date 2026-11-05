// Testi della pagina Back Office (app/pages/BackOffice.tsx), nell'ordine delle sezioni.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**, *corsivo*, [testo](url), \n = <br />.
import { projects } from "./projects";
import { shell } from "./shell";

export const backOffice = {
  backLink: shell.caseStudy.backLink,

  hero: projects.backOffice.caseStudyHero,

  intro: {
    image: "images/projects/OnlineBackOffice-1.webp",
    title: "From Client Forks to a Unified Back Office System",
    paragraphs: [
      "XpuntoCero’s Back Office portals serve as dashboards for the SGPV field app, used by merchandisers and sales reps for 15 FMCG clients across Spain, Portugal, and Italy. \nThey visualize field data, manage promotions, and track retail execution. Over time, each portal evolved separately with custom branding and one-off requests. Updates became slow, inconsistent, and difficult to align with the SGPV app.",
      "My goal was to preserve each client’s identity while building a single, scalable foundation that simplified maintenance and accelerated delivery.",
      "I redesigned the UI kit, consolidated CSS, and introduced a Git-based release workflow, ensuring improvements shipped once and reached all client portals instantly. The result kept the freedom of customization while removing redundant work and bringing long-term consistency to the system.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "Inconsistent client forks, duplicated assets, and manual updates across 15+ portals made maintenance slow, costly, and prone to errors. Each portal required separate fixes, leading to diverging interfaces and unsustainable QA cycles.",
  },

  role: {
    title: "My Role",
    summary: "Product Designer & Platform Strategist",
    items: [
      "Diagnosed fragmented client forks and unsustainable update cycles.",
      "Led the back-office unification, built one shared core applied across 15+ client portals.",
      "Reverse-engineered legacy CSS to identify patterns and enable bulk front-end updates.",
      "Created the Git-based release model to propagate improvements from a single source.",
      "Established the roadmap and process that made the unified approach maintainable at scale.",
    ],
  },

  impact: {
    title: "Impact",
    items: [
      "99% core code reuse across all client portals",
      "80% faster rollout of visual and UI updates",
      "Consistent UX and brand alignment for 15+ clients",
    ],
  },

  outcomes: {
    title: "Program Outcomes",
    // Icone nella pagina, stesso ordine
    achievements: [
      {
        metric: "99%",
        label: "Code Reuse",
        description: "Single shared core powering all client portals",
      },
      {
        metric: "80%",
        label: "Efficiency Gain",
        description: "Faster testing and deployment through unified CSS and icons",
      },
      {
        metric: "15+",
        label: "Clients Unified",
        description: "Consistent UX and branding across the full client base",
      },
    ],
  },

  gallery: {
    title: "Design Evolution",
    images: [
      { file: "images/projects/OnlineBackOffice-2.webp", alt: "Legacy vs New dashboards" },
      { file: "images/projects/OnlineBackOffice-3.webp", alt: "Tables and data views – old vs new" },
      { file: "images/projects/OnlineBackOffice-4.webp", alt: "Unified approach diagram & laptop" },
    ],
  },

  businessContext: {
    number: "01",
    title: "Business Context",
    paragraphs: [
      "XpuntoCero’s Back Office portals are the dashboards for the SGPV field app. They visualize field data such as sales, promotions, and store audits.",
      "Over time, client portals drifted apart with custom branding, duplicated assets, and manual updates. This fragmentation slowed releases and caused inconsistencies with the SGPV mobile app.",
      "The goal was to create one shared core that keeps each client’s identity while centralizing maintenance and accelerating updates.",
    ],
    // Alcune voci hanno uno spazio finale, come nell'originale
    challenges: {
      title: "Challenges",
      items: [
        "Duplicated assets and inconsistent portals ",
        "Manual updates breaking alignment with SGPV app data",
        "High QA and maintenance costs across 15+ clients",
      ],
    },
    goals: {
      title: "Goals",
      items: [
        "Shared core with CSS-based theming ",
        "Git-powered centralized release workflow ",
        "Faster iteration aligned with SGPV product cycles",
      ],
    },
  },

  problemHypothesis: {
    number: "02",
    title: "Problem & Hypothesis",
    problem: {
      title: "The Problem",
      items: [
        "Inconsistent UI across portals due to heavy per-client customization",
        "Increased development time and QA overhead",
        "Updates could not be applied uniformly",
      ],
    },
    hypothesis: {
      title: "Hypothesis",
      text: "By concentrating changes in a single CSS file and a shared image/icon folder, we can roll out UI updates to all portals at once via Git, maintain client customization via themes, and dramatically reduce duplicated work.",
    },
  },

  keyDecisions: {
    number: "03",
    title: "Key Decisions & Trade-offs",
    decisions: [
      {
        point: "Architecture Strategy",
        options: [
          "Maintain per-client codebases",
          "Monorepo with themed builds",
          "Single shared core + client themes",
        ],
        rationale:
          "Created a single shared core style CSS and a shared asset folder. Client-specific tokens/themes override variables without touching core markup.",
        impact: "99% code reuse across portals",
      },
      {
        point: "Asset Management",
        options: [
          "Duplicate assets per client",
          "CDN per client",
          "Shared assets with client overrides",
        ],
        rationale:
          "Icons and images were centralized. Only logo and color tokens vary per client. This reduced duplication and guaranteed consistency.",
        impact: "80% faster deployment of visual updates",
      },
      {
        point: "Delivery Pipeline",
        options: [
          "Manual FTP per client",
          "Per-repo Git flow",
          "Git-based propagation to all clients",
        ],
        rationale:
          "Git-driven releases: update once in core, propagate to 15+ client portals via branches. Rollbacks and hotfixes became trivial.",
        impact: "Minutes to roll out changes (vs days)",
      },
    ],
  },

  solution: {
    number: "04",
    title: "The Unified Solution",
    sharedAssets: {
      title: "Single CSS + Shared Assets",
      paragraphs: [
        "Consolidated all client styles into one maintainable CSS architecture with variables and mixins.",
        "Reverse-engineered legacy files to find reusable patterns and moved icons and images into a shared library.",
        "Each client’s theme now overrides only color tokens and logos, keeping 99% of the codebase identical.",
      ],
    },
    gitPropagation: {
      title: "Git-Based Propagation",
      paragraphs: [
        "Updates are committed to the shared core, merged through dedicated client branches, and deployed to all portals using Git-based scripts.",
        "This workflow replaced manual uploads, reduced release errors, and made rollbacks fully traceable and fast to execute.",
      ],
    },
  },

  operationalImprovements: {
    number: "05",
    title: "Operational Improvements",
    intro:
      "Centralization turned multi-client maintenance into a productized workflow. Below are representative changes in effort/time to ship.",
    // Intestazioni della tabella (desktop) e etichette delle card (mobile)
    columns: {
      task: "Task",
      before: "Before",
      after: "After",
      improvement: "Improvement",
    },
    rows: [
      {
        task: "Apply a visual fix to a component",
        before: "15 repos / manual uploads",
        after: "1 core change → propagate",
        improvement: "–90% effort",
      },
      {
        task: "Add a new icon to all portals",
        before: "Duplicate in every client",
        after: "Drop once in shared assets",
        improvement: "–95% duplication",
      },
      {
        task: "Release a hotfix",
        before: "Per-client packaging",
        after: "Git merge → scripted deploy",
        improvement: "Hours → Minutes",
      },
    ],
  },

  deliverables: {
    number: "06",
    title: "Outcomes & Deliverables",
    frontEnd: {
      title: "Front-End",
      items: [
        "Unified CSS architecture with tokens",
        "Shared iconography & image library",
        "Bootstrap-based responsive components",
      ],
    },
    process: {
      title: "Process & Governance",
      items: [
        "Git release workflow for multi-client rollouts",
        "Branching model for hotfixes and theming",
        "QA checklist and A/B testing framework",
      ],
    },
    // **...** = <strong>
    results: {
      title: "Results",
      items: [
        "→ **Scalability:** Re-styled and deployed across 15+ clients with centralized updates.",
        "→ **Development Efficiency:** Focusing on core CSS + icons enabled 80% faster updates across portals.",
        "→ **Development Speed:** Centralized design and development enabled future updates to be implemented 25% faster.",
      ],
    },
  },

  cta: {
    title: shell.caseStudy.moreWorkTitle,
    text: "This project shows how a design-led front-end refactor can unlock scale and lower costs across a legacy estate.",
    allProjects: shell.caseStudy.allProjects,
    talk: shell.caseStudy.letsTalk,
  },
};
