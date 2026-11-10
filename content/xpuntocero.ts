// Testi della pagina XpuntoCero (app/pages/XpuntoCero.tsx), nell'ordine delle sezioni.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**, *corsivo*, [testo](url), \n = <br />.
// Nei paragrafi i numeri evidenziati usano **...** con boldClassName="text-ink-900 font-semibold";
// lo spazio dentro gli asterischi (es. "** +40%**") e' voluto: nell'originale stava dentro lo span.
// Immagini dei box testo+immagine (ImageTextCard): campo facoltativo `position` = punto di fuoco
// (valore CSS object-position, es. "center" o "50% 20%"); senza, "top".
import { projects } from "./projects";
import { shell } from "./shell";

export const xpuntoCero = {
  backLink: shell.caseStudy.backLink,

  hero: projects.xpuntoCero.caseStudyHero,

  intro: {
    image: "images/projects/XP0-old_new.webp",
    title: "Revitalizing a SaaS Brand for Growth",
    paragraphs: [
      "XpuntoCero, a B2B SaaS provider specializing in point-of-sale solutions for FMCG, Out-of-Home services, and Digital Marketing, had a strong product but an outdated brand. After years without a redesign, its interfaces no longer reflected the company’s innovation or technical depth. \nThe image above shows how the new design modernized the experience, improving clarity, hierarchy, and visual consistency across key pages.",
      "I led the UX and visual rebrand, connecting research insights with a new design language. This included refining the logo, color palette, icon system, and overall interface composition, then implementing the new front-end on a performant PWA.",
      "The result was a cohesive brand presence that felt faster, clearer, and more credible, driving measurable results such as** 2× ** more demo requests and stronger lead conversion.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "XpuntoCero’s brand and platform hadn’t evolved in years. \nThe outdated design and weak mobile experience made the company appear less innovative, while inconsistent hierarchy and typography hurt clarity and user trust during sales demos.",
  },

  role: {
    title: "My Role",
    summary: "Product Designer & Front-End Developer",
    items: [
      "Led UX research and brand redesign strategy",
      "Defined new information architecture and visual system",
      "Designed isometric illustrations and refined logo system",
      "Implemented PWA front-end with WordPress integration",
    ],
  },

  scope: {
    title: "Scope",
    items: [
      "Internal product rebrand across 8 SaaS solutions",
      "UX/UI modernization for web and mobile",
      "Logo and visual identity refresh",
      "PWA implementation and performance optimization",
    ],
  },

  // Icone delle card nella pagina, nello stesso ordine
  projectImpact: {
    title: "Project Impact",
    metrics: [
      {
        value: "+40%",
        label: "Mobile Traffic",
        description: "The new responsive PWA improved load speed and mobile usability.",
      },
      {
        value: "+15%",
        label: "Qualified Leads",
        description: "Clearer messaging and visual hierarchy improved visitor retention.",
      },
      {
        value: "2×",
        label: "Demo Requests",
        description: "The refreshed brand and faster flows doubled demo interest.",
      },
    ],
  },

  gallery: {
    title: "Design Evolution",
    images: [
      { src: "images/projects/XP0_Home_OldVsNew.webp", alt: "Home Before & After - Website Transformation" },
      { src: "images/projects/XP0_CorePageProd_OldVsNew.webp", alt: "Product page Before & After - Website Transformation" },
      { src: "images/projects/XP0_ProductCards_OldVsNew.webp", alt: "Product cards Before & After - Website Transformation" },
      { src: "images/projects/XP0_Pwa.webp", alt: "Progressive web App" },
    ],
  },

  businessContext: {
    number: "01",
    title: "Business Context",
    paragraphs: [
      "XpuntoCero is a B2B SaaS company providing point-of-sale and marketing platforms for clients in the FMCG and Out-of-Home sectors. The company also develops **SGPV**, a field operations app used by merchandisers from major consumer brands across Southern Europe. After more than a decade without a redesign, XpuntoCero’s visual identity no longer reflected the quality or innovation of its technology.",
      "Over time, the brand began to feel dated. The old website was slow on mobile and visually inconsistent, making it harder to communicate the company’s value and innovation. Competing startups looked fresher and more user-friendly, which made XpuntoCero appear less dynamic than it actually was.",
      "The company needed to refresh its brand and user experience to regain credibility, improve mobile performance, and clearly communicate the value of its multi-product ecosystem to enterprise buyers.",
    ],
  },

  research: {
    number: "02",
    title: "Research & Design Approach",
    cards: {
      discovery: {
        title: "Discovery",
        description:
          "I began with a competitive and heuristic review of similar B2B SaaS platforms to identify visual and structural patterns that conveyed innovation and trust. Five quick interviews with existing clients and internal stakeholders helped uncover perception gaps and usability issues, especially on mobile.",
        bulletPoints: [
          { label: "5 Interviews", text: "Gathered qualitative feedback on brand perception and usability." },
          { label: "Heuristic Review", text: "Benchmarked layout, tone, and accessibility of modern SaaS interfaces." },
          { label: "Key Finding", text: "Outdated visuals and slow mobile performance reduced credibility." },
        ],
        images: [
          {
            src: "images/projects/XP0-SaaS_Platform_Analysis.webp",
            alt: "Brand perception map positioning XpuntoCero as reliable but outdated in the SaaS landscape.",
          },
        ],
        additionalText: "",
      },
      keyInsights: {
        title: "Key Insights",
        description:
          "Analysis of interviews and tests revealed that users trusted the platform’s reliability but found the interface dated and inconsistent. Navigation labels were unclear, and the visual tone didn’t match the company’s innovative positioning.",
        bulletPoints: [
          { label: "Users wanted", text: "Simpler menus and a clearer hierarchy of features." },
          { label: "Mobile first", text: "Most usage happened on smartphones, yet the UI was not optimized." },
          { label: "Visual mismatch", text: "The brand looked older than the technology behind it." },
        ],
        images: [
          {
            src: "images/projects/XP0-ux_Issues_Stem_from_Deeper_Problems..webp",
            alt: "Iceberg diagram showing how surface usability issues stemmed from deeper UX and information architecture problems.",
          },
        ],
        additionalText: "",
      },
      designDirection: {
        title: "Design Direction",
        description:
          "These insights informed a new design language based on simplicity, trust, and coherence. I refreshed the color palette, introduced a modular layout system, and tested early prototypes internally to ensure clarity on both desktop and mobile.",
        bulletPoints: [
          { label: "Color palette", text: "Cooler blues and neutral grays to convey trust and precision." },
          { label: "Typography", text: "Modern sans-serif fonts improving legibility and hierarchy." },
          { label: "Prototyping", text: "Interactive Figma flows validated early navigation and layout choices." },
        ],
        images: [
          {
            src: "images/projects/XP0-ux_laptop_mobile.webp",
            alt: "Responsive redesign preview of XpuntoCero’s platform on laptop and smartphone screens.",
          },
        ],
        additionalText: "",
      },
    },
  },

  keyDecisions: {
    number: "03",
    title: "Key Design Decisions & Trade-offs",
    decisions: [
      {
        point: "Brand Direction",
        options: ["Full rebrand", "Identity refresh", "Keep legacy"],
        rationale:
          "Refreshed typography, colors, and icons while keeping the logo mark to preserve recognition.",
        impact: "Modernized look without disrupting brand equity.",
      },
      {
        point: "Information Architecture & Navigation",
        options: ["Keep old IA", "Light tweaks", "Simplify structure"],
        rationale:
          "Reduced top navigation and clarified labels to match how users browse products.",
        impact: "Simpler flow and faster access to key pages.",
      },
      {
        point: "Visual Language",
        options: ["Stock photos", "Isometric visuals", "Mixed media"],
        rationale:
          "Replaced stock images with custom isometric illustrations for clarity and personality.",
        impact: "Consistent style and quicker content creation.",
      },
      {
        point: "Front-End",
        options: ["Static site", "SPA", "PWA"],
        rationale:
          "Adopted a lightweight PWA with caching and optimized assets for better mobile speed.",
        impact: "Pages load 20% faster and mobile engagement improved.",
      },
      {
        point: "Accessibility",
        options: ["Bright warm + white text", "Dark text on warm", "Overlay contrast"],
        rationale:
          "Adjusted warm colors and added overlays to meet WCAG contrast standards.",
        impact: "Improved readability and visual comfort on mobile.",
      },
      {
        point: "CMS Choice",
        options: ["Custom React", "Headless CMS", "WordPress + Elementor"],
        rationale:
          "Used WordPress with shared components so non-devs could update content easily.",
        impact: "Faster page launches with consistent design.",
      },
    ],
  },

  visualIdentity: {
    number: "04",
    title: "Visual & Brand Identity",
    cards: {
      visualKit: {
        title: "Visual Kit & Brand Personality",
        description:
          "The brand identity needed to feel bold, modern, and instantly recognizable. I anchored the design on strong color blocking and clear typography to give the interface a tech-forward character. The visual language communicates confidence and accessibility, while the bright coral CTAs make interaction effortless.",
        bulletPoints: [
          { label: "Anchor Colors", text: "Turquoise #5DD9D2 and Coral #FF5757, supported by neutral grays." },
          { label: "Logo Redesign", text: "Simplified, memorable mark that reflects the platform’s technical precision." },
          { label: "Contrast Rules", text: "Dark text on warm backgrounds, subtle overlays for accessibility." },
          { label: "Typography", text: "Clean sans-serif type with clear hierarchy for mobile readability." },
          { label: "Icon Library (SVG)", text: "Functional icons guiding users through key features across products." },
        ],
        images: [
          {
            src: "images/projects/XP0-logo-colors-icons.webp",
            alt: "XpuntoCero logo old vs new, anchor colors, and core product icons/logos",
          },
        ],
        additionalText:
          "The result was a strong, memorable, and modern identity that balanced energy with clarity, exactly what a tech brand needs to stand out without overwhelming users.",
      },
      isometricIllustrations: {
        title: "Isometric Product Illustrations",
        description:
          "To make the product self-explanatory, I created a full set of custom isometric illustrations. Each one visualizes how XpuntoCero’s SaaS tools connect digital dashboards with real-world retail activity. The goal was for users to grasp the product’s purpose instantly, even before reading any text.",
        bulletPoints: [
          { label: "Storytelling", text: "Illustrations show data flow from mobile to in-store operations." },
          { label: "Differentiation", text: "Custom visuals replaced generic SaaS stock imagery." },
          { label: "Clarity", text: "Users could understand each product’s function at a glance." },
        ],
        images: [
          {
            src: "images/projects/XP0-Custom_isometric_illustration.webp",
            alt: "Custom isometric illustration showing mobile, tablet, and retail environments linked through XpuntoCero’s SaaS solution.",
          },
        ],
        additionalText:
          "The brand relied on visual storytelling rather than lengthy explanations, making complex tools feel approachable and clear.",
      },
    },
  },

  outcomes: {
    number: "05",
    title: "Outcomes & Business Impact",
    intro:
      "The redesign improved acquisition, engagement, and mobile performance while giving XpuntoCero a recognizable, modern identity that restored credibility as a SaaS provider.",
    leadGeneration: {
      title: "Lead Generation & Marketing",
      text: "Clearer messaging and improved visual hierarchy increased qualified leads by** +15%** and doubled demo interest.",
      metrics: [
        {
          value: "+15%",
          label: "Qualified Leads",
          description: "Clearer messaging and better hierarchy improved retention.",
        },
        {
          value: "2×",
          label: "Demo Requests",
          description: "The refreshed brand and faster flows doubled demo interest.",
        },
      ],
    },
    uxPerformance: {
      title: "UX & Performance",
      text: "PWA architecture boosted mobile traffic by** 40%** and reduced load times by** 20%**. Users experienced smoother navigation and a more consistent brand across devices.",
      items: ["+40% mobile traffic", "20% faster loads", "Higher satisfaction and engagement"],
    },
    keyLearnings: {
      title: "Key Learnings",
      // "→ " fa parte del testo; **...** = <strong>
      items: [
        "→ **Brand perception shapes B2B trust:** enterprise buyers judge credibility visually before exploring features.",
        "→ **Mobile speed matters:** even B2B decision-makers browse on mobile; quick, accessible sites retain attention.",
        "→ **Visual storytelling simplifies complexity:** custom isometric illustrations helped users grasp multi-product offerings instantly.",
        "→ **Early validation saves time:** quick usability tests caught navigation issues before rollout.",
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
