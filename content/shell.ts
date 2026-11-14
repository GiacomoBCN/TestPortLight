// Testi del guscio del sito: metadati, skip link, nav, footer, banner cookie,
// pagina 404 e le etichette dei componenti condivisi (lightbox, gallerie, tabelle...).
import { projects } from "./projects";

export const shell = {
  metadata: {
    title: "Giacomo Bianchi · Product Builder & Design Engineer",
    description:
      "I build AI products end to end. Product Builder and Design Engineer, former Lead Design Technologist at Dow Jones. Based in Barcelona.",
    keywords: [
      "Product Builder",
      "Design Engineer",
      "Design Systems",
      "AI products",
      "UX",
      "Dow Jones",
      "Barcelona",
    ],
    author: "Giacomo Bianchi",
    applicationName: "GB Portfolio",
    appleWebAppTitle: "GB Portfolio",
    siteName: "Giacomo Bianchi",
    ogImageAlt: "Giacomo Bianchi",
  },

  skipLink: "Skip to main content",

  nav: {
    ariaLabel: "Main navigation",
    logoMark: "GB",
    siteName: "Giacomo Bianchi",
    productWork: "Product Work",
    allProjects: "All Projects",
    projects: [
      { name: projects.dowJones.navLink, path: "DowJones" },
      { name: projects.designSystem.navLink, path: "DesignSystem" },
      { name: projects.aiProduct.navLink, path: "AiProduct" },
      { name: projects.falak.navLink, path: "Falak" },
      { name: projects.vod.navLink, path: "VODplatform" },
      { name: projects.sgpv.navLink, path: "SGPVEvolution" },
      { name: projects.xpuntoCero.navLink, path: "XpuntoCero" },
      { name: projects.backOffice.navLink, path: "BackOffice" },
      { name: projects.tuPlanRedondo.navLink, path: "TuPlanRedondo" },
      // TEMPORARILY HIDDEN - E-Commerce Management
      // { name: "E-Commerce Management", path: "EcommerceManagement" },
    ],
    teaching: "Teaching",
    about: "About",
    contact: "Contact",
    contactAriaLabel: "Contact via email",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  footer: {
    copyright: "© 2026 Giacomo Bianchi.",
    tagline: "Italian by birth. Product leader by craft. Global by vocation.",
    location: "Barcelona • Open to MENA, Europe & Remote",
    emailAriaLabel: "Email",
    linkedinAriaLabel: "LinkedIn",
  },

  cookieConsent: {
    ariaLabel: "Cookie consent",
    message: "We use cookies to analyze site traffic and improve your experience.",
    // sotto i 768px il banner e' una riga sola: versione corta della stessa frase
    messageShort: "We use analytics cookies.",
    decline: "Decline",
    accept: "Accept",
  },

  pwaInstall: {
    title: "Install Portfolio",
    message: "Add to your home screen for quick access",
    dismiss: "Not now",
    install: "Install",
  },

  // Testi uguali in tutte le pagine dei case study (pulsante in alto e CTA finale)
  caseStudy: {
    backLink: "Back to Projects",
    moreWorkTitle: "Want to see more work?",
    allProjects: "View All Projects",
    letsTalk: "Let's Talk",
  },

  notFound: {
    code: "404",
    title: "Page Not Found",
    message: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go Home",
    goBack: "Go Back",
    suggestionsIntro: "You might be looking for:",
    productWork: "Product Work",
    teaching: "Teaching",
    contact: "Contact",
  },

  // Etichette dei componenti condivisi
  ui: {
    copyEmail: {
      copied: "Email copied",
      copiedAnnouncement: "Email address copied to clipboard",
    },
    scrollToTop: "Scroll to top",
    lightbox: {
      dialogLabel: (n: number, total: number, alt: string) => `Image ${n} of ${total}: ${alt}`,
      close: "Close image",
      previous: "Previous image",
      next: "Next image",
      counter: (n: number, total: number) => `${n} / ${total}`,
    },
    // Barra del capitolo nei case study, solo su telefono (ChapterBar)
    chapterBar: {
      toggle: (number: string, title: string) => `Chapter ${number}: ${title}. Show all chapters`,
      listLabel: "Chapters on this page",
    },
    // Video ingrandito su telefono (HeroVideo -> VideoLightbox)
    videoLightbox: {
      open: "Enlarge video",
      dialogLabel: (alt: string) => (alt ? `Enlarged video: ${alt}` : "Enlarged video"),
      close: "Close video",
    },
    enlargeImageLabel: (alt: string) => `Enlarge image: ${alt}`,
    clickToEnlarge: "Click to enlarge",
    projectGallery: {
      defaultTitle: "Project Gallery",
      scrollLeft: "Scroll images left",
      scrollRight: "Scroll images right",
    },
    decisionTable: {
      decisionPoint: "Decision Point",
      optionsConsidered: "Options Considered",
      whyWeChose: "Why We Chose",
      defaultImpactLabel: "Impact",
    },
    expandableText: {
      showMore: "Show more",
      showLess: "Show less",
    },
    projectListingCard: {
      viewCaseStudy: "View Case Study",
      viewCaseStudyLabel: (title: string) => `View Case Study: ${title}`,
      metricsRegionLabel: (title: string) => `${title}: metrics and tags`,
    },
  },
};
