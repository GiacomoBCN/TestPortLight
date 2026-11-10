// Testi della pagina TuPlanRedondo (app/pages/TuPlanRedondo.tsx), nell'ordine delle sezioni.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**, *corsivo*, [testo](url), \n = <br />.
// Immagini dei box testo+immagine (ImageTextCard): campo facoltativo `position` = punto di fuoco
// (valore CSS object-position, es. "center" o "50% 20%"); senza, "top".
import { projects } from "./projects";
import { shell } from "./shell";

export const tuPlanRedondo = {
  backLink: shell.caseStudy.backLink,

  hero: projects.tuPlanRedondo.caseStudyHero,

  intro: {
    image: "images/projects/mc-1.webp",
    title: "Digitizing Employee Evaluations for a McDonald’s Franchise",
    paragraphs: [
      "A McDonald’s franchise needed to replace its manual evaluation forms with a centralized digital solution.",
      "While working at XpuntoCero, I led the project from user research to interface design and front-end development, delivering a lightweight Progressive Web App (PWA) that runs on any device without installation.",
      "The app streamlined how supervisors evaluated team performance, synced results in real time, and gave management a live dashboard to track data across locations, all at a fraction of the cost of a native app.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "Manual, paper-based evaluations across the franchise’s restaurants slowed daily operations and often led to data errors.\n The client needed a simple digital solution that worked on any device.",
  },

  role: {
    title: "My Role",
    summary: "Product Designer & Front-End Developer",
    items: [
      "Led user interviews, affinity mapping, and usability testing",
      "Designed all wireframes, mockups, and icons in Figma",
      "Built the PWA front-end for tablets, laptops, and smartphones",
      "Delivered a cost-effective digital solution that cut delivery costs by 45%",
    ],
  },

  scope: {
    title: "Scope",
    items: [
      "End-to-end research → design → development",
      "Evaluation forms, dashboard, and secure login",
      "Cross-device PWA built with HTML5, CSS3, Bootstrap, JS",
    ],
  },

  // Non mostrato: l'array `achievements` della pagina non e' renderizzato da nessuna parte.
  // Icone nella pagina, stesso ordine.
  achievements: [
    { metric: "30%", label: "Time Savings", description: "Reduced manual evaluation time" },
    { metric: "25%", label: "Satisfaction ↑", description: "Improved evaluator experience" },
    { metric: "30%", label: "Cost Reduction", description: "PWA vs native app development" },
    { metric: "Real-time", label: "Analytics", description: "Instant performance insights" },
  ],

  impact: {
    title: "Project Impact",
    // Icone nella pagina, stesso ordine
    metrics: [
      {
        value: "30%",
        label: "Faster Evaluations",
        description: "Streamlined digital workflow replaced manual paper forms.",
      },
      {
        value: "25%",
        label: "Higher Satisfaction",
        description: "Evaluators found the PWA faster, simpler, and easier to access.",
      },
      {
        value: "45%",
        label: "Lower Dev Cost",
        description: "PWA approach avoided native builds for iOS and Android.",
      },
      {
        value: "Real-time",
        label: "Insights",
        description: "Live dashboards connected managers to instant performance data.",
      },
    ],
  },

  gallery: {
    title: "Design & Development",
    images: [
      { file: "images/projects/mc-2.webp", alt: "Different profiles of the PWA" },
      { file: "images/projects/mc-3.webp", alt: "Mobile first design" },
      { file: "images/projects/mc-4.webp", alt: "Different screens of the PWA" },
    ],
  },

  businessContext: {
    number: "01",
    title: "Business Context",
    paragraphs: [
      "The McDonald’s franchise approached requesting a mobile application to digitalize employee evaluations and track performance across its restaurants. The existing process relied on printed forms and manual data entry, which made reporting slow, fragmented, and prone to errors.",
      "Managers wanted a simple tool to collect evaluations, review results, and monitor staff performance more efficiently. The priority was to eliminate paperwork and centralize all data in a single digital system accessible during daily operations in each restaurant.",
      "They initially asked for a native app, but after mapping their environment, we realized a PWA would solve the same problem faster, cheaper, and without app-store friction.",
    ],
  },

  research: {
    number: "02",
    title: "Research & Definition",
    userResearch: {
      title: "User Research Process",
      description:
        "I conducted comprehensive research to understand both evaluator workflows and management reporting needs, combining qualitative interviews with iterative usability testing.",
      bulletPoints: [
        { label: "Desk research", text: "Analyzed existing paper forms and spreadsheet workflows." },
        { label: "5 user interviews", text: "Field administrator/crew/supervisors to understand pain points." },
        { label: "Affinity mapping", text: "Synthesized insights into themes around efficiency, accuracy, and reporting." },
        { label: "Personas", text: "Developed profiles for field administrator/crew/supervisors." },
        { label: "Journey mapping", text: "Documented end-to-end evaluation and reporting workflows." },
        { label: "10 usability tests", text: "Iterative testing validated design decisions and interaction patterns." },
      ],
      images: [
        {
          file: "images/projects/mc-userflowEvol_Difprofiles.webp",
          alt: "User flow boards showing administrator/restaurant manager/supervisors/crew paths",
        },
      ],
    },
    keyFindings: {
      title: "Key Findings",
      description:
        "Research revealed critical pain points that shaped the product requirements and guided the design approach.",
      bulletPoints: [
        { label: "Time waste", text: "Paper forms and manual data entry made each evaluation slow and reporting fragmented." },
        { label: "Transcription errors", text: "Manual data entry from paper to spreadsheets introduced mistakes." },
        { label: "Delayed insights", text: "Weeks passed before management could see performance trends." },
        { label: "App friction", text: "Users strongly resisted downloading apps due to privacy concern." },
        { label: "Connectivity", text: "No issues with connectivity." },
        {
          label: "User types",
          text: "Administrator, restaurant manager, supervisor and crew members under one streamlined workflow.",
        },
      ],
      images: [{ file: "images/projects/mc-painPoints.webp", alt: "Pain points in product development" }],
    },
  },

  keyDecisions: {
    number: "03",
    title: "Key Decisions & Trade-offs",
    decisions: [
      {
        point: "Technology Choice",
        options: ["Native app", "Hybrid", "Progressive Web App (PWA)"],
        rationale:
          "The client asked for a native app. After assessing devices, budget, and rollout constraints, I proposed a PWA: no installs, works on any browser, faster to ship.",
        impact: "Delivery costs ↓ 45%; instant access on tablets, phones, laptops",
      },
      {
        point: "Connectivity Strategy",
        options: ["Offline-first", "Basic caching", "Online real-time"],
        rationale:
          "Restaurants had stable Wi-Fi. Offline would add complexity without clear value, so I optimized for fast loads and real-time submission.",
        impact: "Simpler maintenance; reliable performance; shorter timeline",
      },
      {
        point: "Interface Scope",
        options: ["Complex evaluation suite", "Feature creep", "Focused forms + dashboard"],
        rationale:
          "Kept the MVP tight: streamlined forms, role-based access, and a simple live dashboard for managers.",
        impact: "30% less manual work; quicker adoption; easier training",
      },
    ],
  },

  designImplementation: {
    number: "04",
    title: "Design & Implementation",
    visualDesign: {
      title: "Brand-Aligned Visual Design",
      description:
        "Created all icons and visual elements to align with McDonald’s brand guidelines while maintaining clarity and usability. The design balances brand recognition with functional requirements.",
      bulletPoints: [
        { label: "Employee selection", text: "Avatar-based visual identification" },
        {
          label: "Quick-tap input",
          text: "Approval/rejection for criteria like food safety, cleanliness, and appearance",
        },
        {
          label: "Color coding",
          text: "McDonald’s brand colors (green = approved, red = needs improvement) for instant recognition",
        },
        { label: "Autosave", text: "Prevents data loss if evaluators are interrupted" },
      ],
      images: [{ file: "images/projects/mc-iconsVisualElements.webp", alt: "Brand-aligned components and icons" }],
    },
    evaluationInterface: {
      title: "Streamlined Evaluation Interface",
      description:
        "Designed evaluation forms to match the mental model of paper workflows while leveraging digital affordances. Visual indicators (thumbs up/down, color coding) enable fast data entry during observations.",
      bulletPoints: [
        { label: "Employee selection", text: "Avatar-based visual identification" },
        {
          label: "Quick-tap input",
          text: "Approval/rejection for criteria like food safety, cleanliness, and appearance",
        },
        {
          label: "Color coding",
          text: "McDonald’s brand colors (green = approved, red = needs improvement) for instant recognition",
        },
        { label: "Autosave", text: "Prevents data loss if evaluators are interrupted" },
      ],
      images: [
        {
          file: "images/projects/mc-userflowEvol-restaurantManager.webp",
          alt: "Mockup of evaluation flow of general restaurant manager",
        },
      ],
    },
    performanceEvaluation: {
      title: "Performance Evaluation",
      description:
        "Managers select a worker and score core McDonald’s service metrics with quick taps. Visual fries icons make scoring unambiguous during fast service.",
      bulletPoints: [
        { label: "Core metrics", text: "CLS (Quality | Service | Cleanliness) · Attitude · Appearance" },
        { label: "Fast input", text: "Green/red fries icons for quick, intuitive scoring" },
        { label: "Autosave", text: "No data loss if an evaluation is interrupted" },
      ],
      images: [
        { file: "images/projects/mc-PerformanceEvaluation.webp", alt: "PWA screenshot of performance evaluation page" },
      ],
    },
  },

  businessImpact: {
    number: "05",
    title: "Business Impact & Results",
    intro:
      "The PWA delivered measurable improvements in efficiency, cost, and user satisfaction while establishing a scalable foundation for future franchise operations tools.",
    // **...** = <strong>
    efficiency: {
      title: "Operational Efficiency & User Experience",
      items: [
        "**30% time savings:** Evaluations that took 30-40 minutes now complete in 20-25 minutes.",
        "**Eliminated data entry:** Zero manual transcription from paper to spreadsheets.",
        "**25% satisfaction increase:** managers praised simplicity and speed.",
      ],
    },
    cost: {
      title: "Cost",
      items: [
        "**45% cost reduction:** PWA development cheaper than native iOS + Android apps.",
        "**Cross-device compatibility:** Single codebase works on tablets, phones, and laptops.",
        "**Zero update friction:** Directly released, no app-store approval delays.",
        "**Zero installation friction:** Users access via browser or can add it to the Home screen without an app store and without using device memory.",
      ],
    },
  },

  cta: {
    title: shell.caseStudy.moreWorkTitle,
    text: "This project demonstrates how research-driven design, cohesive branding, and performant technical implementation create measurable business impact.",
    allProjects: shell.caseStudy.allProjects,
    talk: shell.caseStudy.letsTalk,
  },
};
