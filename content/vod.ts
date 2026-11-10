// Testi della pagina VOD Platform (app/pages/VODplatform.tsx), nell'ordine delle sezioni.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**, *corsivo*, [testo](url), \n = <br />.
// I percorsi immagine passano da getImagePath() nella pagina.
// Immagini dei box testo+immagine (ImageTextCard): campo facoltativo `position` = punto di fuoco
// (valore CSS object-position, es. "center" o "50% 20%"); senza, "top".
import { projects } from "./projects";
import { shell } from "./shell";

export const vod = {
  backLink: shell.caseStudy.backLink,

  hero: projects.vod.caseStudyHero,

  intro: {
    image: "images/projects/Vod-01.webp",
    title: "Evaluating & Redesigning a Multi-Device Streaming Experience",
    paragraphs: [
      "As a design challenge in a hiring process, I reviewed and redesigned the initial prototype of a MENA-based VOD platform. The platform needed to serve content across multiple contexts: traditional TV viewing, mobile on-the-go, tablet browsing, and in-car entertainment systems.",
      "My role was to evaluate usability, visual clarity, and interaction flow through heuristic review, identify accessibility gaps against WCAG standards, and propose a unified home screen concept that could scale across all devices while reducing user friction.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "Complex 3-axis navigation causing user friction. Poor legibility with light text over artwork. Weak focus indicators for TV viewing. Unnecessary entry gates before content access.",
  },

  role: {
    title: "My Role",
    summary: "Product Designer",
    items: [
      "Heuristic evaluation & accessibility audit",
      "Cross-platform design strategy (TV, mobile, tablet, car)",
    ],
  },

  impact: {
    title: "Impact",
    items: [
      "40% reduction in interaction steps",
      "WCAG AA compliant accessibility",
      "Unified design language across devices",
      "60% fewer presses to switch profiles",
    ],
  },

  // Icone nella pagina (achievementIcons), stesso ordine
  achievements: {
    title: "Redesign Impact",
    items: [
      {
        metric: "40%",
        label: "Interaction Reduction",
        description: "Fewer clicks/taps for common user journeys",
      },
      {
        metric: "60%",
        label: "Fewer Presses to Switch Profile",
        description: "From ≥10 taps to just 4 taps",
      },
      {
        metric: "WCAG AA",
        label: "Accessibility",
        description: "Contrast ratios & focus states compliant",
      },
      {
        metric: "4 Devices",
        label: "Multi-Platform",
        description: "TV, mobile, tablet, in-car displays",
      },
    ],
  },

  gallery: {
    title: "Design Evolution",
    images: [
      { src: "images/projects/Vod-1_New _LiveTV.webp", alt: "New version of LiveTV page" },
      { src: "images/projects/Vod-2-New_Vod_Page.webp", alt: "New version of VOD page" },
      { src: "images/projects/Vod-3- Nwe_Catch-up.webp", alt: "New version of Catch-Up page" },
      { src: "images/projects/Vod-3_old_new_gamePage.webp", alt: "After & Before of Game page" },
      { src: "images/projects/Vod-4_old_new_learnigPage.webp", alt: "After & Before of Learning page" },
    ],
  },

  businessContext: {
    number: "01",
    title: "Business Context",
    paragraphs: [
      "The company was building a VOD platform to compete with Netflix and Disney+ in the region. The prototype had a lot of features, but users got lost in a three-layer navigation system (icon belt, tab row, carousels). Light text over images created poor contrast. Focus indicators were too weak for TV viewing from 3 meters away. And the \"Who's watching?\" welcome screen blocked users from accessing content.",
      "The MENA streaming market was getting crowded with global players. Users expected Netflix-level usability, but localized for regional preferences. The platform needed to work across TV, mobile, tablet, and in-car displays without feeling fragmented.",
    ],
  },

  problem: {
    number: "02",
    title: "The Problem & Evaluation",
    // Non usato nella pagina (const evaluationImages mai renderizzata), estratto com'era
    evaluationImages: [
      {
        src: "images/projects/Vod-Old_Home_nav.webp",
        alt: "Original VOD platform interface showing navigation complexity",
      },
      {
        src: "images/projects/Vod-Old_Welcom.webp",
        alt: "Original VOD platform welcome screen interface",
      },
    ],
    heuristic: {
      title: "Heuristic Review Findings",
      description:
        "I ran a heuristic evaluation to figure out why the interface felt clunky. The issues weren't just visual. The interaction model itself was broken:",
      bulletPoints: [
        {
          label: "Complex interaction flow",
          text: "Users had to navigate through three axes (icon belt, tabs, carousels) just to find content",
        },
        {
          label: "Legibility challenges",
          text: "Light text over artwork failed WCAG contrast standards (under 4.5:1)",
        },
        {
          label: "Weak focus indicators",
          text: "Focus indicators were nearly invisible from 3 meters away (TV viewing distance)",
        },
        {
          label: "Unnecessary friction",
          text: "\"Who's watching?\" welcome screen blocked immediate content access",
        },
      ],
      additionalText:
        "I mapped click-paths for common tasks to quantify the problem. Switching from \"Watch > Live TV\" to \"Shop > Groceries\" took 9 button presses on a TV remote. Opening the profile switcher from deep in content took over 10 presses.",
      images: [
        {
          src: "images/projects/Vod-Old_Home_nav.webp",
          alt: "Original VOD platform home screen showing the cluttered three-axis navigation layout",
        },
        {
          src: "images/projects/Vod_Redesing_Nav_Graf_Reason.webp",
          alt: "Diagram showing how redesigning VOD navigation improved usability and user experience through simplicity and accessibility.",
        },
      ],
    },
    accessibility: {
      title: "Accessibility Gaps",
      description:
        "The accessibility audit found several WCAG violations. Contrast ratios were too low, focus indicators were nearly invisible, and touch targets were under 44px. These issues hurt everyone, not just users with disabilities. Try watching TV from 3 meters away with weak focus states and you'll see the problem.",
      bulletPoints: [
        {
          label: "Contrast ratios below WCAG AA standards",
          text: "< 4.5:1 for normal text",
        },
        {
          label: "Focus indicators",
          text: "Not meeting 3:1 contrast requirement against adjacent colors",
        },
        {
          label: "Color-only information",
          text: "Without text labels or icons",
        },
        {
          label: "Insufficient touch target sizes",
          text: "For mobile (< 44px)",
        },
      ],
      images: [
        {
          src: "images/projects/Vod-Old_Welcom.webp",
          alt: "Original VOD welcome screen requiring multiple clicks before accessing content",
        },
        {
          src: "images/projects/Vod-Old_ex_a11y.webp",
          alt: "Example of accessibility issues in the original VOD interface, showing low contrast and poor legibility",
        },
      ],
    },
  },

  keyDecisions: {
    number: "03",
    title: "Key Decisions & Trade-offs",
    decisions: [
      {
        point: "Navigation Architecture",
        options: [
          "Keep 3-axis system",
          "Reduce to 2-axis (vertical + horizontal)",
          "Single axis with deep menus",
        ],
        rationale:
          "Vertical rail for primary sections, horizontal tabs for filtering within each section. This 2-axis model reduced remote clicks by 40% and works across TV, mobile, tablet, and car with the same logic.",
        impact: "40% reduction in interaction steps",
      },
      {
        point: "Landing Experience",
        options: [
          "Keep 'Who's watching?' gate",
          "Direct to homepage",
          "Direct to Continue Watching",
        ],
        rationale:
          "Profile switching happens 10x less than browsing, so I moved it to the utility bar and removed the welcome gate. Users now land directly on Continue Watching",
        impact: "60% fewer presses to reach profiles",
      },
      {
        point: "Accessibility Standards",
        options: [
          "Basic contrast fixes",
          "WCAG AA compliance",
          "WCAG AAA compliance",
        ],
        rationale:
          "WCAG AA gives you solid accessibility without the extreme constraints of AAA. It's critical for TV viewing from 3 meters away - if you can't see the focus indicator from your couch, the interface is broken.",
        impact: "WCAG AA compliant",
      },
      {
        point: "Component System Approach",
        options: [
          "Device-specific designs",
          "Responsive single design",
          "Adaptive box-first grid",
        ],
        rationale:
          "The component grid maintains visual consistency across all platforms while respecting each device's interaction model (D-pad for TV, touch for mobile/car, hybrid for tablet).",
        impact: "Unified design language",
      },
    ],
  },

  redesign: {
    number: "04",
    title: "The Redesign Solution",
    navigation: {
      title: "2-Axis Navigation System",
      items: [
        "Vertical rail stays visible across all screens for wayfinding",
        "Horizontal tabs filter content within each section",
        "Clear mental model: vertical for \"where,\" horizontal for \"what\"",
      ],
    },
    welcomeScreen: {
      title: "Removed Welcome Screen Friction",
      items: [
        "Instant access to content without gates",
        "Profile switcher in persistent top-right utility bar",
        "Continue Watching is now the landing page",
      ],
    },
    wcag: {
      title: "WCAG AA Compliance",
      items: [
        "Contrast ratios of 4.5:1+ for all text elements",
        "Bold focus states with 3:1+ contrast against backgrounds",
        "Color-blind safe iconography and information architecture",
        "Touch targets sized at 44x44px minimum for mobile",
      ],
    },
    grid: {
      title: "Box-First Component Grid",
      items: [
        "Adaptive grid scales from 5\" phones to 75\" TVs",
        "Platform-specific interaction patterns (D-pad vs touch)",
        "Consistent visual language across all devices",
      ],
    },
  },

  navigationDeepDive: {
    title: "Navigation System Deep Dive",
    subtitle: "A detailed comparison of the old 3-axis vs new 2-axis navigation system",
    // Immagini aperte nella lightbox (navigationComparisonImages)
    comparisonImages: [
      {
        src: "images/projects/Vod_old_navigation.webp",
        alt: "Old Navigation (3-Axis) - Complex three-layer navigation system with icon belt, tabs, and carousels",
      },
      {
        src: "images/projects/Vod_New_navigarion.webp",
        alt: "New Navigation (2-Axis) - Simplified vertical rail and horizontal tabs system reducing interaction steps by 40%",
      },
    ],
    // Miniature affiancate
    oldImage: {
      src: "images/projects/Vod_old_navigation.webp",
      alt: "Old Navigation (3-Axis)",
      enlargeLabel: "Enlarge image: Old Navigation (3-Axis)",
      clickToEnlarge: "Click to enlarge",
      caption: "🟥 Old Navigation (3-Axis)",
    },
    newImage: {
      src: "images/projects/Vod_New_navigarion.webp",
      alt: "New Navigation (2-Axis)",
      enlargeLabel: "Enlarge image: New Navigation (2-Axis)",
      clickToEnlarge: "Click to enlarge",
      caption: "🟦 New Navigation (2-Axis)",
    },

    // Tabella desktop (lg+)
    table: {
      headers: {
        category: "Category",
        old: "🟥 OLD NAVIGATION (3-Axis)",
        new: "🟦 NEW NAVIGATION (2-Axis)",
      },
      structure: {
        category: "Structure",
        old: "1️⃣ **Top icon belt**: horizontal row (Home, Games, Learning, Shop…)\n2️⃣ **Second horizontal tab row**: Live TV, VOD, Catch-up, TV Guide\n3️⃣ **Content rows**: horizontal carousels of shows/movies",
        new: "1️⃣ **Vertical rail (left)**: primary sections (Watch, Play, Learn, Shop…)\n2️⃣ **Top horizontal tabs**: filter within the section (Live TV, VOD, Catch-up…)",
      },
      movement: {
        category: "Movement",
        old: "⬆️⬇️ jump between stacked rows\n⬅️➡️ move within each row",
        oldNote: "Zig-zag pattern due to two horizontal layers:\n*Up → right → down → right → up → left…*",
        new: "⬆️⬇️ move between main sections (vertical rail)\n⬅️➡️ browse tabs or content horizontally",
        newNote: "Planar, predictable; no zig-zag.",
      },
      focus: {
        category: "Focus & Legibility",
        old: "Weak focus; easy to lose track across layers.\nLight text over artwork → poor contrast.",
        new: "Persistent focus halo (+5% scale, Orbit Blue outline).\nText on 80% dark scrim → WCAG AA.",
      },
      utility: {
        category: "Utility & Feedback",
        old: "Scattered top-right icons; no micro-interactions.",
        new: "Right-aligned utility cluster (Search, Grid, AI, Avatar).\nGentle bounce/scale + soft click feedback (specified).",
      },
      outcome: {
        category: "Outcome",
        old: "Higher cognitive load; extra remote clicks.",
        new: "~40% fewer interaction steps; clearer \"where vs what\" mental model.",
      },
    },

    // Card mobile (sotto lg): stessi contenuti della tabella, ripetuti come sono
    cards: {
      structure: {
        title: "Structure",
        oldLabel: "🟥 OLD (3-Axis)",
        old: [
          "1️⃣ **Top icon belt**: horizontal row (Home, Games, Learning, Shop…)",
          "2️⃣ **Second horizontal tab row**: Live TV, VOD, Catch-up, TV Guide",
          "3️⃣ **Content rows**: horizontal carousels of shows/movies",
        ],
        newLabel: "🟦 NEW (2-Axis)",
        new: [
          "1️⃣ **Vertical rail (left)**: primary sections (Watch, Play, Learn, Shop…)",
          "2️⃣ **Top horizontal tabs**: filter within the section (Live TV, VOD, Catch-up…)",
        ],
      },
      movement: {
        title: "Movement",
        oldLabel: "🟥 OLD (3-Axis)",
        old: ["⬆️⬇️ jump between stacked rows", "⬅️➡️ move within each row"],
        oldNote: "Zig-zag pattern due to two horizontal layers: Up → right → down → right → up → left…",
        newLabel: "🟦 NEW (2-Axis)",
        new: ["⬆️⬇️ move between main sections (vertical rail)", "⬅️➡️ browse tabs or content horizontally"],
        newNote: "Planar, predictable; no zig-zag.",
      },
      focus: {
        title: "Focus & Legibility",
        oldLabel: "🟥 OLD (3-Axis)",
        old: ["Weak focus; easy to lose track across layers.", "Light text over artwork → poor contrast."],
        newLabel: "🟦 NEW (2-Axis)",
        new: ["Persistent focus halo (+5% scale, Orbit Blue outline).", "Text on 80% dark scrim → WCAG AA."],
      },
      utility: {
        title: "Utility & Feedback",
        oldLabel: "🟥 OLD (3-Axis)",
        old: ["Scattered top-right icons; no micro-interactions."],
        newLabel: "🟦 NEW (2-Axis)",
        new: [
          "Right-aligned utility cluster (Search, Grid, AI, Avatar).",
          "Gentle bounce/scale + soft click feedback (specified).",
        ],
      },
      outcome: {
        title: "Outcome",
        oldLabel: "🟥 OLD (3-Axis)",
        old: ["Higher cognitive load; extra remote clicks."],
        newLabel: "🟦 NEW (2-Axis)",
        new: ["~40% fewer interaction steps; clearer \"where vs what\" mental model."],
      },
    },
  },

  interactionImprovements: {
    number: "05",
    title: "Measured Interaction Improvements",
    intro: "I mapped click-paths before and after the redesign to measure the improvement in common TV remote tasks.",
    // Intestazioni della tabella desktop
    columns: {
      task: "Task (TV Example)",
      before: "Original Prototype",
      after: "Redesigned Flow",
      improvement: "Improvement",
    },
    // Etichette delle card mobile
    cardLabels: {
      before: "Original Prototype",
      after: "Redesigned Flow",
      improvement: "Improvement",
    },
    rows: [
      {
        task: "Switch from Watch → Live TV to Shop → Groceries",
        before: "9 taps",
        after: "6 taps",
        improvement: "–33%",
      },
      {
        task: "Go from landing hero to first row card",
        before: "2 taps",
        after: "1 tap",
        improvement: "–50%",
      },
      {
        task: "Open profile switcher from deep in content",
        before: "≥10 taps",
        after: "4 taps",
        improvement: "–60%",
      },
    ],
  },

  outcomes: {
    number: "06",
    title: "Outcomes & Deliverables",
    text: "This was a design challenge focused on evaluation and design recommendations. I delivered mid-fidelity Figma mockups across TV, mobile, tablet, and in-car contexts, plus click-path analysis documentation.",
    constraints: {
      title: "Constraints & Trade-offs",
      // **...** = <strong>, seguito dal testo nello stesso nodo
      items: [
        "**WCAG AA vs AAA:** Chose AA to balance accessibility with design flexibility for TV viewing.",
        "**2-axis vs 1-axis navigation:** Kept horizontal tabs because removing them would require deeper menus and increase click-paths.",
        "**Profile switching location:** Validated top-right placement by showing Netflix and Disney+ use the same pattern.",
      ],
    },
    learnings: {
      title: "Key Learnings",
      // label in <strong>, poi {" "} e text (nodi separati come nell'originale)
      items: [
        {
          label: "TV design requires different thinking:",
          text: "Focus indicators must be bold, text high-contrast, and navigation needs clear vertical/horizontal axes.",
        },
        {
          label: "Accessibility improvements benefit everyone:",
          text: "Better contrast helped users in bright rooms, stronger focus states improved TV viewing.",
        },
        {
          label: "Remove friction before adding features:",
          text: "The biggest win came from deleting the welcome screen, not adding functionality.",
        },
        {
          label: "Quantify interaction costs:",
          text: "Mapping click-paths (9 taps → 6 taps = –33%) gave stakeholders concrete proof.",
        },
      ],
    },
    image: {
      src: "images/projects/Vod-NewGamePage.webp",
      alt: "Redesign Game page",
      caption: "Redesign game page",
    },
  },

  cta: {
    title: shell.caseStudy.moreWorkTitle,
    text: "This is one example of how I evaluate complex products and propose solutions that balance user needs with business constraints.",
    allProjects: shell.caseStudy.allProjects,
    talk: shell.caseStudy.letsTalk,
  },
};
