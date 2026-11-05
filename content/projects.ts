// Testi che descrivono ogni progetto, raccolti qui per confrontarli in revisione.
// Per ogni progetto ci sono, una accanto all'altra, le versioni usate nei vari punti del sito:
//   navLink          → voce del menu "Product Work" (app/SiteShell.tsx)
//   homeCard         → scheda in Home, sezione Featured Work (app/pages/Home.tsx)
//   productWorkCard  → scheda nella pagina Product Work (app/pages/ProductWork.tsx)
//   caseStudyHero    → hero in cima alla pagina del case study
// Le versioni NON sono unificate: alcune sono identiche, altre scritte diversamente.
// Decidere se devono coincidere e' compito della revisione.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**, *corsivo*, [testo](url), \n = <br />.

export const projects = {
  dowJones: {
    navLink: "Dow Jones Design System",
    homeCard: {
      role: "Enterprise Leadership",
      title: "Dow Jones Design System",
      company: "Dow Jones",
      timeframe: "",
      description:
        "Co-led design system adoption across B2B and B2C brands, boosting team productivity by 30% and reducing component complexity by 20%.",
      image: "images/projects/DJ1.webp",
      metrics: [
        { value: "60+", label: "Designers" },
        { value: "200K+", label: "Component Refs" },
        { value: "30%", label: "Efficiency" },
      ],
    },
    productWorkCard: {
      category: "DESIGN SYSTEMS · PRODUCT OWNERSHIP · ENTERPRISE",
      title: "Dow Jones Design System",
      role: "Lead Design Technologist | Design System Product Owner",
      year: "",
      description:
        "Co-led design system adoption across B2B and B2C brands, boosting team productivity by 30% and reducing component complexity by 20%.",
      metrics: [
        { value: "60+", label: "Designers" },
        { value: "200K+", label: "References" },
        { value: "30%", label: "Efficiency" },
      ],
      tags: [
        "Leadership",
        "AI-Enhanced",
        "Product Strategy",
        "Design Systems",
        "SAFe Agile",
        "WCAG 2.2",
        "CI/CD",
        "Storybook",
        "Style Dictionary",
        "Design Tokens",
        "React",
        "Figma",
      ],
      slug: "DowJones",
    },
    caseStudyHero: {
      breadcrumb: "Home > Product Work > Dow Jones Design System",
      category: "DESIGN SYSTEMS · PRODUCT OWNERSHIP · ENTERPRISE",
      title: "Dow Jones Design System",
      subtitle: "Lead Design Technologist | Design System Product Owner",
      description:
        "I co-led design system adoption across 8 brands at Dow Jones, from The Wall Street Journal to Factiva (B2C & B2B). We unified teams, reduced component complexity by 20%, and boosted productivity by 30%.",
      tags: [
        "Leadership",
        "AI-Enhanced",
        "Product Strategy",
        "Design Systems",
        "SAFe Agile",
        "WCAG 2.2",
        "CI/CD",
        "Storybook",
        "Style Dictionary",
        "Design Tokens",
        "React",
        "Figma",
      ],
    },
  },

  falak: {
    navLink: "Falak AI Assistant",
    homeCard: {
      role: "AI Interaction Design · Banking",
      title: "Falak: AI Assistant for a Bank",
      company: "Concept & Coded Prototype",
      timeframe: "",
      description:
        "Research-led study of how a banking AI assistant should handle uncertainty, hand over to people and keep human oversight honest. Eight patterns checked against the literature, built as a bilingual EN/AR Flutter prototype.",
      image: "images/projects/falak/04-desktop-spending-range.webp",
      metrics: [
        { value: "8", label: "Patterns" },
        { value: "EN · AR", label: "Bilingual" },
        { value: "Live", label: "Demo" },
      ],
    },
    productWorkCard: {
      category: "AI INTERACTION DESIGN · TRUST & ACCOUNTABILITY · BANKING",
      title: "Falak: AI Assistant for a Bank",
      role: "Concept, Research & Coded Prototype",
      year: "",
      description:
        "Research-led study of how a banking AI assistant should handle uncertainty, hand over to people and keep human oversight honest. Eight patterns checked against the literature, built as a bilingual EN/AR Flutter prototype.",
      metrics: [
        { value: "8", label: "Patterns" },
        { value: "EN · AR", label: "Bilingual" },
        { value: "Live", label: "Demo" },
      ],
      tags: [
        "AI Interaction Patterns",
        "Trust Calibration",
        "Human Oversight",
        "Research Synthesis",
        "Flutter",
        "Claude Code",
        "Arabic / RTL",
        "WCAG 2.2 AA",
      ],
      slug: "Falak",
    },
    caseStudyHero: {
      breadcrumb: "Home > Product Work > Falak AI Assistant",
      category: "AI INTERACTION DESIGN · TRUST & ACCOUNTABILITY · BANKING",
      title: "Falak: an AI assistant that shows its sources",
      subtitle: "Concept, Research & Coded Prototype",
      // **...** = <span className="text-ink-900 font-semibold">
      description:
        "A research-led study of how an AI assistant in a bank should handle uncertainty, hand over to people, and keep human oversight honest. Eight interaction patterns, each checked against the 2019–2026 literature, built as a bilingual **English / Arabic** Flutter prototype. Falak is a fictional bank; every name and figure is invented.",
      tags: [
        "AI Interaction Patterns",
        "Trust Calibration",
        "Human Oversight",
        "Research Synthesis",
        "Flutter",
        "Claude Code",
        "Arabic / RTL",
        "WCAG 2.2 AA",
        "EU AI Act",
      ],
    },
  },

  vod: {
    navLink: "VOD Platform",
    homeCard: {
      role: "B2C Multi-platform",
      title: "VOD Platform Redesign",
      company: "Design Challenge",
      timeframe: "",
      description:
        "Redesigned cross-device VOD experience with 40% fewer interaction steps (calculated via click-path analysis) and WCAG AA compliance across TV, mobile, and in-car displays.",
      image: "images/projects/Vod.webp",
      metrics: [
        { value: "40%", label: "Less Friction" },
        { value: "WCAG AA", label: "Compliant" },
        { value: "4", label: "Platforms" },
      ],
    },
    productWorkCard: {
      category: "B2C Multi-platform",
      title: "VOD Platform Redesign",
      role: "Design Challenge",
      year: "",
      description:
        "Redesigned cross-device VOD experience with 40% fewer interaction steps (calculated via click-path analysis) and WCAG AA compliance across TV, mobile, and in-car displays.",
      metrics: [
        { value: "40%", label: "Steps Reduced" },
        { value: "WCAG AA", label: "Compliant" },
        { value: "4", label: "Platforms" },
      ],
      tags: [
        "Heuristic Evaluation",
        "End-to-end UX/UI Process",
        "Figma",
        "Multi-platform Design",
        "UX Strategy",
        "WCAG 2.2 AA",
        "TV/10-foot UI",
      ],
      slug: "VODplatform",
    },
    caseStudyHero: {
      breadcrumb: "Home > Product Work > VOD Platform Redesign",
      category: "DESIGN CHALLENGE · MULTI-PLATFORM",
      title: "VOD Platform Redesign",
      subtitle: "Design Challenge · MENA streaming platform",
      description:
        "Redesigned a VOD platform for the MENA region. Reduced interaction steps by 40% through click-path analysis and brought the experience to WCAG AA compliance across TV, mobile, tablet, and in-car displays.",
      tags: [
        "Heuristic Evaluation",
        "End-to-end UX/UI Process",
        "Figma",
        "Multi-platform Design",
        "UX Strategy",
        "WCAG 2.2 AA",
        "TV/10-foot UI",
      ],
    },
  },

  sgpv: {
    navLink: "SGPV Evolution",
    homeCard: {
      role: "B2B SaaS Long-term",
      title: "SGPV Product Evolution",
      company: "XpuntoCero -> SGPV",
      timeframe: "",
      description:
        "Multi-year product evolution from PhoneGap to Flutter, serving 15 B2B clients. Redesigned user flows and AI-powered features reduced task time by 25%.",
      image: "images/projects/sgpv.webp",
      metrics: [
        { value: "15", label: "Global Brands" },
        { value: "25%", label: "Faster" },
        { value: "30%", label: "Satisfaction ↑" },
      ],
    },
    productWorkCard: {
      category: "SAAS",
      title: "SGPV Product Evolution",
      role: "Product Design & Development",
      year: "",
      description:
        "Multi-year product evolution from PhoneGap to Flutter, serving 15 B2B clients. Redesigned user flows and AI-powered features reduced task time by 25%.",
      metrics: [
        { value: "15", label: "Clients" },
        { value: "25%", label: "Faster" },
        { value: "30%", label: "Satisfaction ↑" },
      ],
      tags: [
        "Product Strategy",
        "End-to-end UX/UI Process",
        "Design System",
        "Figma",
        "AI",
        "Mobile",
        "B2B",
        "SaaS",
        "Flutter",
        "Dart",
        "PhoneGap",
        "JavaScript",
        "Bootstrap",
        "Agile/SCRUM",
      ],
      slug: "SGPVEvolution",
    },
    caseStudyHero: {
      breadcrumb: "Home > Product Work > SGPV Product Evolution",
      category: "MULTI-CLIENT PLATFORM · UX & PRODUCT EVOLUTION",
      title: "SGPV Product Evolution",
      subtitle: "Product Designer & UX Lead",
      // **...** = <span className="text-ink-900 font-semibold">
      description:
        "Led the modernization of a multi-client field app used by 15 FMCG brands. Unified fragmented versions into a single responsive platform and later migrated to Flutter, introducing AI-based data capture.\n The evolution cut hardware costs by **20%**, improved deployment efficiency by **80%**, and raised user satisfaction by **30%**.",
      tags: [
        "Product Strategy",
        "UX Research",
        "Responsive Design",
        "AI-Driven Workflows",
        "Figma",
        "Flutter",
        "B2B SaaS",
        "Agile / SCRUM",
      ],
    },
  },

  xpuntoCero: {
    navLink: "XpuntoCero Transformation",
    productWorkCard: {
      category: "GROWTH · BUSINESS IMPACT",
      title: "XpuntoCero Digital Transformation",
      role: "Product Design & Development",
      year: "",
      description:
        "Rebranded SaaS company with PWA redesign, increasing mobile traffic by 40%, qualified leads by 15% and doubling demo requests.",
      metrics: [
        { value: "40%", label: "Mobile Traffic" },
        { value: "15%", label: "More Leads" },
        { value: "2×", label: "Demo Requests" },
      ],
      tags: [
        "Branding",
        "Strategy",
        "End-to-end UX/UI Process",
        "Figma",
        "Front-End",
        "PWA",
        "WordPress",
        "Elementor",
      ],
      slug: "XpuntoCero",
    },
    caseStudyHero: {
      breadcrumb: "Home > Product Work > XpuntoCero Digital Transformation",
      category: "BRAND TRANSFORMATION · VISUAL DESIGN",
      title: "XpuntoCero Digital Transformation",
      subtitle: "Product Designer & Front-End Developer",
      description:
        "Internal rebrand of a legacy SaaS platform. \nI led the UX and visual redesign and partnered with engineering to ship a fast PWA.\nResults:** +40%** mobile traffic,** +15%** qualified leads, and** 2×** demo requests, proving how a refreshed brand and faster UX directly improved conversions.",
      tags: [
        "Brand Identity",
        "Visual Design",
        "Information Architecture",
        "UX Research",
        "Figma",
        "Front-End",
        "PWA",
        "WordPress / Elementor",
      ],
    },
  },

  backOffice: {
    navLink: "Back Office Unification",
    productWorkCard: {
      category: "TECHNICAL LEADERSHIP · SCALABILITY",
      title: "Back Office Unification",
      role: "Product Design & Development",
      year: "",
      description:
        "Unified 15 client portals with shared CSS and assets, reducing redundant work and enabling scalable updates across all platforms.",
      metrics: [
        { value: "15", label: "Portals" },
        { value: "99%", label: "Code Reuse" },
        { value: "80%", label: "Efficiency" },
      ],
      tags: ["Bootstrap 4", "CSS3", "Git Workflow"],
      slug: "BackOffice",
    },
    caseStudyHero: {
      breadcrumb: "Home > Product Work > Back Office Unification",
      category: "PLATFORM ARCHITECTURE · FRONT-END SCALABILITY",
      title: "Back Office Unification",
      subtitle: "Product Designer & Platform Strategist",
      // **...** = <span className="text-ink-900 font-semibold">; gli spazi dentro ** ** sono voluti
      // (nell'originale lo spazio sta dentro lo span: "** 80%**", "** 15+**").
      description:
        "Consolidated 15 fragmented client portals into a unified back-office platform. \nBuilt a shared CSS architecture, centralized assets, and Git-based rollout model achieving **99%** code reuse,** 80%** faster deployments, and consistent UX across** 15+** FMCG clients.",
      tags: [
        "Scalable Architecture",
        "Front-End Design",
        "CSS Tokens",
        "Git Workflow",
        "Bootstrap",
        "B2B SaaS",
        "Design Systems",
        "Process Governance",
      ],
    },
  },

  tuPlanRedondo: {
    navLink: "TuPlanRedondo PWA",
    productWorkCard: {
      category: "B2B SAAS · FIELD OPERATIONS",
      title: "TuPlanRedondo PWA",
      role: "Product Design & Development",
      year: "",
      description:
        "Streamlined evaluation user flows with a PWA for McDonald's franchise, saving 30% time and boosting satisfaction by 25%.",
      metrics: [
        { value: "30%", label: "Time Saved" },
        { value: "25%", label: "Satisfaction" },
        { value: "Real-time", label: "Data" },
      ],
      tags: [
        "End-to-end UX/UI Process",
        "Figma",
        "Front-End Development",
        "PWA",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "JavaScript",
      ],
      slug: "TuPlanRedondo",
    },
    caseStudyHero: {
      breadcrumb: "Home > Product Work > TuPlanRedondo PWA",
      category: "FULL-STACK DESIGN · RESEARCH → DESIGN → BUILD",
      title: "TuPlanRedondo PWA",
      subtitle: "Full-Stack Designer",
      // **...** = <span className="text-ink-900 font-semibold">
      description:
        "I designed and built a Progressive Web App that replaced a paper-based employee evaluation process across multiple McDonald’s restaurants. \nThe new system reduced manual work by **30%** and cut delivery costs by **45%**.",
      tags: [
        "User Research",
        "UI/UX Design",
        "Visual Design",
        "Front-End Development",
        "PWA",
        "Bootstrap",
        "JavaScript",
        "Figma",
      ],
    },
  },

};
