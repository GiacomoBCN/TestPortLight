// Testi della pagina SGPV Evolution (app/pages/SGPVEvolution.tsx), nell'ordine delle sezioni.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**, *corsivo*, [testo](url), \n = <br />.
// Le immagini sono percorsi relativi a public/ (la pagina applica getImagePath).
// Nota: le description di ImageTextCard sono divise in paragrafi su "\n" e ogni paragrafo
// viene trim()-mato dal componente.
import { projects } from "./projects";
import { shell } from "./shell";

export const sgpv = {
  backLink: shell.caseStudy.backLink,

  hero: projects.sgpv.caseStudyHero,

  intro: {
    image: "images/projects/sgpv-evo.webp",
    title: "From Client Forks to a Unified, Scalable Platform",
    paragraphs: [
      "SGPV is a field operations app used by merchandisers and sales representatives from 15 leading FMCG companies, including national and international brands across Spain, Portugal, and Italy. These field teams visit retail locations to audit shelf placement, negotiate product visibility, track promotional compliance, and secure better in-store positioning.",
      "Over time, versions 5 and 6 had split into multiple client-specific forks to meet unique branding and workflow needs. This fragmentation increased maintenance costs and created inconsistent user experiences. I led an 18-month effort to modernize and consolidate SGPV while maintaining uninterrupted service for all 15 active clients.",
      "Phase 1 introduced a responsive redesign and centralized assets, restoring delivery speed and removing the tablet-only limitation.\nPhase 2 unified all clients under a single Flutter app and redesigned critical workflows such as AI-based photo data capture, which reduced task time and improved user satisfaction.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "15 FMCG clients, each with its own branded SGPV version. Fragmented code, inconsistent UX, and tablet-only usage slowed delivery and increased costs.",
  },

  role: {
    title: "My Role",
    summary: "Product Designer · UX Lead · Front-End Developer",
    paragraphs: [
      "Led research, UX strategy, and product consolidation.",
      "Defined responsive patterns, unified assets, and collaborated on the Flutter rebuild to enable a single scalable app.",
    ],
  },

  scope: {
    title: "Scope",
    items: [
      "15 FMCG clients across Spain, Portugal, and Italy",
      "Multi-phase product evolution (PhoneGap → Flutter)",
      "Research, usability testing, and rollout alignment",
      "Unified UI kit, AI-assisted workflows, and faster releases",
    ],
  },

  impactSnapshot: {
    title: "Project Impact Snapshot",
    // "[Phase01]" / "[Phase02]" sono testo letterale (non passano da RichText)
    achievements: [
      { metric: "−20%", label: "Hardware Cost", description: "Mobile-first eliminated tablet dependency [Phase01]" },
      { metric: "+80%", label: "Dev Efficiency", description: "Centralized styling streamlined releases [Phase01]" },
      { metric: "15", label: "FMCG Clients", description: "Unified app with per-client branding and consistent UX [Phase01]" },
      { metric: "−25%", label: "Task Time", description: "AI image recognition & optimized workflows [Phase02]" },
      { metric: "+30%", label: "Satisfaction", description: "Performance + usability improvements [Phase02]" },
      { metric: "25+", label: "Research Sessions", description: "Interviews, contextual inquiry, and usability testing across client teams [Phase02]" },
    ],
  },

  phase1: {
    number: "01",
    title: "Phase 1 (v5→v6): Responsive Redesign",
    context: {
      title: "Context",
      text: "SGPV began as a cross-platform B2B field app for tablets. Over time, client-specific customizations created many divergent versions that were hard to update and maintain. As smartphone adoption grew among field merchandisers, the tablet-only constraint became costly and inconvenient for clients.",
    },
    approach: {
      title: "Approach",
      description:
        "I led the responsive redesign of the app, making it fully usable on both tablets and smartphones. We centralized the CSS, icon system, and shared assets so that updates and fixes could be deployed once and applied across all client builds. This effort unified fifteen client versions without interrupting ongoing operations, laying the technical and visual foundation for future releases.",
      images: [
        {
          src: "images/projects/SGPV_V6_Old_New.webp",
          alt: "Legacy tablet app redesigned into responsive v6 for mobile and tablet.",
        },
      ],
    },
    results: {
      title: "Results",
      bulletPoints: [
        { label: "-20% hardware cost", text: "Clients no longer needed tablets for field teams." },
        { label: "+80% development efficiency", text: "Centralized styling enabled instant rollouts across all clients." },
        { label: "+15% user satisfaction", text: "The responsive interface improved clarity and reduced friction in daily use." },
        { label: "25% faster future updates", text: "Simplified front-end structure accelerated deployment." },
      ],
      images: [
        {
          src: "images/projects/SGPV_V6_New_Diag.webp",
          alt: "Diagram summarizing Phase 1 impact: centralized styling enabled scalability, 20% lower hardware cost, 80% higher deployment efficiency, and 15% higher user satisfaction.",
        },
      ],
    },
    reflection: {
      title: "Reflection",
      text: "Consolidating fifteen client versions without interrupting operations proved that centralizing the CSS, icon system, and shared assets was the real leverage point. Once updates could be deployed once and applied everywhere, delivery speed recovered and the responsive redesign became the technical and visual foundation for the Flutter migration in Phase 2.",
    },
  },

  phase1Gallery: {
    title: "P1: Saved 15 Apps · From Legacy to Responsive Design",
    images: [
      { src: "images/projects/SGPV_V6_New_01.webp", alt: "Updated visit flow and simplified mobile UI in v6." },
      { src: "images/projects/SGPV_V6_New_02.webp", alt: "Responsive document library, route map, and dashboard screens." },
      { src: "images/projects/SGPV_V6_New_03.webp", alt: "Route and product management screens with improved hierarchy." },
    ],
  },

  phase2: {
    number: "02",
    title: "Phase 2 (v6→v7): Research & Flutter Migration Strategy",
    technologyResearch: {
      title: "Technology Research",
      // un paragrafo per riga
      description:
        "After Phase 1, we still faced performance bottlenecks on iOS and structural limits in the PhoneGap framework.\n\nI led a comparative study of React Native, Ionic, and Flutter to identify a cross-platform solution that could deliver native performance from a single codebase.\n\nAlthough React Native had the larger ecosystem, Flutter's coherent widget architecture, faster rendering engine, and shorter learning curve provided a more scalable foundation for our needs.\n\nI mapped all major SGPV v6 components to Flutter's widget library and built prototypes to test parity and performance.\n\nThis validation proved that Flutter could reduce build complexity and accelerate releases across all client implementations.",
      images: [
        {
          src: "images/projects/SGPV_Research_01.webp",
          alt: "Diagram summarizing the process and output of the tech research.",
        },
      ],
    },
    researchWorkflow: {
      title: "Research Workflow",
      intro:
        "The research program combined desk research with in-context field studies to understand merchandiser workflows and validate design decisions before development.",
      // intestazioni della tabella desktop (methods/purpose/outputs anche come etichette delle card mobile)
      columns: {
        phase: "Phase",
        methods: "Methods",
        purpose: "Purpose",
        outputs: "Key Outputs",
      },
      rows: [
        {
          phase: "Discover",
          methods: "Desk research, competitive analysis",
          purpose: "Identify technical risks, market baselines, and modernization opportunities",
          outputs: "Landscape scan, risk assessment, success metrics",
        },
        {
          phase: "Define",
          methods: "1 contextual inquiry, 10 user interviews",
          purpose: "Understand field workflows across client types and identify friction points",
          outputs: "Personas, empathy maps, journey maps, problem statements",
        },
        {
          phase: "Design",
          methods: "Wireframes, low mockups, modern UI patterns",
          purpose: "Simplify critical paths and prepare flows for AI-powered features",
          outputs: "Interaction models, clickable prototypes",
        },
        {
          phase: "Systemize",
          methods: "Figma design system (components, tokens, specs)",
          purpose: "Ensure visual and functional consistency across unified app",
          outputs: "Component library, design tokens, usage guidelines",
        },
        {
          phase: "Validate",
          methods: "10 usability tests",
          purpose: "Verify task time reductions and error rate improvements",
          outputs: "Task completion benchmarks, issue log, refinements",
        },
        {
          phase: "Deliver",
          methods: "Flutter development, rollout coordination",
          purpose: "Ship performant unified app and manage staged client migration",
          outputs: "Production Flutter app, training materials, rollout plan",
        },
      ],
    },
  },

  aiDataCapture: {
    number: "03",
    title: "AI-Powered Data Capture",
    problem: {
      title: "Transforming Field Data Collection",
      // un paragrafo per riga
      description:
        "Before migration, merchandisers visiting retail stores had to manually type product codes, shelf data, and promotion details.\nIt was a repetitive, error-prone process that slowed each store visit and reduced data reliability. A single audit could involve dozens of entries, making productivity and consistency difficult to sustain.",
      images: [
        {
          src: "images/projects/sgpv_7_AI_flow_to colect_data.webp",
          alt: "Flow diagram showing the redesigned AI-powered data capture process in SGPV v7. Users take photos of shelves or products instead of typing. The system extracts data automatically through image recognition, simplifying the field workflow.",
        },
      ],
    },
    solution: {
      title: "The AI Solution",
      description:
        "I designed a new workflow enabling one-tap capture through image recognition. Users simply photograph shelf labels, barcodes, or displays; the AI automatically identifies products, prices, quantities, and placement details — removing the need for manual entry.",
      bulletPoints: [
        { label: "One-tap capture", text: "Reduced data entry time by 25% through photo-based input" },
        { label: "Error reduction", text: "Automated extraction eliminated transcription mistakes" },
        { label: "Instant validation", text: "Real-time feedback confirmed successful data capture before leaving the store" },
        { label: "Offline reliability", text: "Images processed locally and synced once online." },
      ],
      images: [
        {
          src: "images/projects/sgpv_7_AI_Diagram_benefit.webp",
          alt: "Diagram showing the impact of migrating to Flutter and adding AI image recognition in SGPV v7. Highlights include performance boost, task time reduced by 25%, and user satisfaction increased by 30%.",
        },
      ],
    },
  },

  phase2Gallery: {
    title: "P2: From Hybrid to AI-Driven Workflows",
    images: [
      {
        src: "images/projects/sgpv_7_01_mobile.webp",
        alt: "3D render of SGPV v7 mobile app screens highlighting redesigned interface and improved visual identity.",
      },
      {
        src: "images/projects/sgpv_7_02_mobile.webp",
        alt: "Sequence of mobile screens showing login, confirmation, and performance dashboard in SGPV v7.",
      },
      {
        src: "images/projects/sgpv_7_03_tablet_shopdashboard_imgRec.webp",
        alt: "Tablet interface displaying the shop dashboard and AI-based image recognition capture feature in SGPV v7.",
      },
      {
        src: "images/projects/sgpv_7_03_tablet_form.webp",
        alt: "Tablet screens showing updated data entry forms and product status interface in SGPV v7.",
      },
    ],
  },

  keyDecisions: {
    number: "04",
    title: "Key Decisions & Trade-offs",
    decisions: [
      {
        point: "Platform Strategy",
        options: ["Keep per-client forks", "Native rewrites", "Unify on Flutter"],
        rationale:
          "We evaluated React Native, Ionic, and Flutter. React Native had the larger ecosystem, but Flutter's coherent widget model, fast rendering, and shorter learning curve fit our design system goals and team capacity. One shared codebase would serve all 15 clients with native-level performance.",
        impact: "Unified codebase, lower latency, faster delivery",
      },
      {
        point: "Customization Governance",
        options: ["Maintain forks", "Hardcoded flags", "Theming and config"],
        rationale:
          "We replaced per-client forks with a configuration and theming system. Branding and workflows stayed flexible while updates remained centralized.",
        impact: "80% deployment efficiency, fewer regressions",
      },
      {
        point: "Migration Rollout Strategy",
        options: ["Free migration for all", "Individual opt-in pilots", "Paid staged adoption"],
        rationale:
          "Each client ran its own instance, so migration required a new commercial agreement. We started with early adopters who funded the move, used their feedback to refine training and rollout, then scaled to others.",
        impact: "Self-financed path, validated ROI, repeatable rollout",
      },
      {
        point: "UX Research Approach",
        options: ["Heuristics only", "One-off user testing", "Continuous research operations"],
        rationale:
          "We combined contextual inquiry, interviews, and iterative usability tests to shape information architecture, responsive patterns, and the AI photo-capture workflow.",
        impact: "25% task time reduction, 30% higher satisfaction",
      },
    ],
  },

  businessImpact: {
    number: "05",
    title: "Business Impact & Results",
    intro:
      "The two-phase evolution improved performance, cost efficiency, and user satisfaction while establishing a sustainable multi-client platform.",
    // **...** = <strong>
    productPerformance: {
      title: "Product Performance",
      items: [
        "**Unified Flutter codebase:** Reduced latency and improved responsiveness across iOS and Android.",
        "**25% faster task completion:** AI-based image recognition removed manual entry and reduced user effort.",
        "**30% higher satisfaction:** Field workers reported smoother, faster daily workflows.",
        "**Seamless adoption:** Early pilot clients funded the migration, validating ROI before full rollout.",
      ],
    },
    operationalOutcomes: {
      title: "Operational & Financial Outcomes",
      items: [
        "**20% lower hardware cost:** Mobile-first design removed the need for tablets.",
        "**80% deployment efficiency:** Centralized styling and shared assets simplified updates for 15 clients.",
        "**Faster delivery cycles:** One-to-many rollout process shortened release time.",
        "**Self-financed migration model:** Demonstrated commercial viability and created a scalable adoption framework.",
      ],
    },
    longTermValue: {
      title: "Long-Term Platform Value",
      intro:
        "Beyond short-term metrics, the transformation positioned SGPV as a modern, competitive platform capable of rapid innovation.",
      items: [
        "**Scalable growth:** New clients can be onboarded through configuration instead of new code forks.",
        "**AI-ready architecture:** The image-recognition module established a foundation for future machine-learning features.",
        "**Reduced technical debt:** Legacy hybrid layers were replaced with a sustainable native stack.",
        "**Competitive differentiation:** Native performance and AI automation positioned SGPV ahead of competing field solutions.",
      ],
    },
  },

  learnings: {
    number: "06",
    title: "Key Learnings",
    intro: "Scaling SGPV taught us that sustainable impact comes from structure, empathy, and clarity—not just code.",
    items: [
      {
        title: "1. Governance Beats Heroics",
        text: "Efficiency came from governance, not heroics. Replacing code forks with a theming and configuration system brought 80% faster rollouts through shared structure and clear ownership.",
      },
      {
        title: "2. User Research Drives Executive Buy-In",
        text: "Field studies and user videos proved pain points better than any slide deck. Real stories convinced leadership to invest in AI automation and UX upgrades.",
      },
      {
        title: "3. Standardization with Client Freedom",
        text: "Instead of enforcing uniformity, we moved customization into configuration. Clients kept their identity while the platform stayed unified and maintainable.",
      },
      {
        title: "4. Change Management Is Part of Design",
        text: "Migrating to Flutter meant retraining 15 client teams. Success came from onboarding tools, training materials, and empathy for field users adapting to new workflows.",
      },
    ],
  },

  cta: {
    title: shell.caseStudy.moreWorkTitle,
    text: "This project shows how I lead multi-client product evolution—turning research insights and governance into scalable design systems.",
    allProjects: shell.caseStudy.allProjects,
    talk: shell.caseStudy.letsTalk,
  },
};
