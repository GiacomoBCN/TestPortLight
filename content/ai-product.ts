// Testi della pagina AI Product (app/pages/AiProduct.tsx), nell'ordine delle sezioni.
// Stesso schema di content/falak.ts, senza screenshot e gallerie.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**, *corsivo*, [testo](url), \n = <br />.
import { projects } from "./projects";
import { shell } from "./shell";

export const aiProduct = {
  demoUrl: "https://staykeel.com",

  backLink: shell.caseStudy.backLink,

  // Metadati della pagina (app/(links)/ai-product/page.tsx)
  metadata: {
    title: "An AI product, end to end · Giacomo Bianchi",
    description:
      "Research, model evaluation, design system and deploy of a multilingual AI product, built and run in production by one person.",
  },

  hero: {
    ...projects.aiProduct.caseStudyHero,
    demoCta: "See the product",
  },

  // Blocco 16:9 sotto l'hero. Percorsi sotto public/.
  // Se i video non ci sono (controllo a build time) si vede il segnaposto `heroPlaceholder`.
  heroMedia: {
    video: "video/pipeline-loop.mp4",
    webm: "video/pipeline-loop.webm",
    poster: "video/pipeline-loop-poster.webp",
    // Testo alternativo del video: da scrivere. Finche' e' vuoto il video e' trattato come decorativo.
    alt: "",
  },

  heroPlaceholder: [
    { label: "CAPTURE", note: "code" },
    { label: "UNDERSTAND", note: "small model · large model only when it matters" },
    { label: "STORE", note: "code" },
    { label: "RETRIEVE", note: "small model + code" },
    { label: "ANSWER", note: "model · cites sources" },
  ],

  intro: {
    title: "One action, three models, and code where code is enough",
    paragraphs: [
      "The product looks simple on purpose. You share a link from your phone or paste it on your computer; a minute later there is a card with a short, medium or full summary in the language of the content. Later you can ask a question and get an answer built only from your own archive, with every source cited.",
      "Behind that one action sits a pipeline where three models of different size each do the step where they cost least and perform best, and plain code takes the decisions that don't need a model. I don't hand everything to the biggest model. Every choice in that pipeline was made by measuring, not by preference.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "People save links they never open. The product had to turn that into something useful in one gesture, for people who are not technical, on whatever phone they own, in whatever language the content is in. And it had to be built, run and paid for by one person, which makes cost per answer a design constraint, not an afterthought.",
  },

  role: {
    title: "My Role",
    summary: "Everything, from research to production",
    items: [
      "User research with alpha testers across devices and levels of digital comfort.",
      "Product decisions and backlog, prioritised with MoSCoW and WSJF.",
      "Model evaluation: criteria, blind benchmarks, cost measurement.",
      "Design system, brand system and interface.",
      "Front end, deploy, security and QA, with user isolation proven by tests.",
    ],
  },

  scope: {
    title: "Scope",
    items: [
      "Sources: web articles, videos, public reels, LinkedIn posts, code repositories, PDFs",
      "Input from phone share sheet, desktop, and an optional messaging bot",
      "Any language in, the same language out; questions answered in the language you ask",
      "Progressive Web App, no store, no download",
      "Free beta, paid subscription later",
    ],
  },

  approach: {
    number: "01",
    title: "Approach",
    subtitle: "Each decision either removes a step for the user, or removes a cost for the system.",
    patterns: [
      {
        title: "One action, not a workflow",
        text: "The user does one thing: share a link. Parsing, cleaning, summarising, tagging and indexing happen without a setting to choose. Each kind of source has its own parser, because a video, a PDF and a post fail in different ways, and a generic reader fails on all of them.",
      },
      {
        title: "A chat built for trust, not for conversation",
        text: "The assistant answers only from what you saved and never from the open web. Every answer lists its sources, and tapping a source opens the original card. If the archive doesn't contain the answer, it says so. The same principles I tested in [Falak](/falak) applied to a product in production.",
      },
      {
        title: "Three models, each where it earns its place",
        text: "A small, fast model does the high-volume work. A larger model is used only where quality is visible to the user. A third model classifies and routes. Code handles deduplication, guards and checks, because a model shouldn't take a decision that a rule can take reliably. Exhaustive search went from 1 result to 66–73 relevant cards with this split.",
      },
      {
        title: "Rules before the test, every time",
        text: "Before each evaluation I write the criteria, fix the configuration, score blind and run three times. Cost is measured against the estimate, not assumed. A blind benchmark of 8 models chose the current ones and cut the cost per answer by about 10×. Retrieval quality went from 43% to 73% hit@10. One of those tests also surfaced a production fault that users had been hitting silently.",
      },
      {
        title: "Research with the people who will actually use it",
        text: "Alpha testers on different phones and with different comfort with technology. Their sessions turned into a backlog prioritised with MoSCoW and WSJF. Several decisions came straight from them: the phone share sheet as the main entry, the bot made optional, installation as a home-screen icon.",
      },
      {
        title: "Fast and minimal, measured",
        text: "The interface follows research on neurodivergent reading: three reading levels, no infinite scroll, colour as an accent only, fixed card sizes. The landing page holds Performance 98 on mobile; an animated intro and a WebGL effect were cut to keep it there.",
      },
    ],
  },

  keyDecisions: {
    number: "02",
    title: "Key Decisions & Trade-offs",
    subtitle: "What I chose, what I gave up, and what the measurement said.",
    impactLabel: "Result",
    decisions: [
      {
        point: "Which model does what",
        options: ["One top model for every step", "Three models by role, code for the rest"],
        rationale:
          "The best model on every step is the most expensive and not always the most accurate for the task. Splitting by role let the small model do volume and the large one do only what the user sees.",
        impact: "Cost per answer ÷10",
      },
      {
        point: "How to pick a model",
        options: ["Reputation and benchmarks published by vendors", "Own blind benchmark on own content"],
        rationale:
          "Public benchmarks don't cover my sources, my languages or my cost ceiling. Criteria written first, 8 models, blind scoring, fixed configuration, three runs.",
        impact: "The chosen models, and a production fault found",
      },
      {
        point: "Retrieval",
        options: ["Keep the first setup", "Re-chunk and re-index the whole archive"],
        rationale:
          "Re-indexing everything costs time and a migration. The measurement said the first setup was missing more than half of the relevant cards.",
        impact: "hit@10 from 43% to 73%",
      },
      {
        point: "Where the chat can look",
        options: ["Archive plus web search", "Archive only, sources always shown"],
        rationale:
          "A web fallback makes answers look better and makes trust wrong. Archive only means the answer is checkable in one tap.",
        impact: "Every answer cites its sources",
      },
      {
        point: "How people get links in",
        options: ["A messaging bot as the only entry", "Share sheet first, bot optional"],
        rationale:
          "Testers didn't want a setup step, and iPhone users had no share option. The share sheet became the main path; the bot stayed for those who like it.",
        impact: "Setup in two minutes, no manual step",
      },
      {
        point: "Native app or PWA",
        options: ["App Store and Play Store", "Installable web app"],
        rationale:
          "One person, two stores and review cycles was not sustainable. A PWA installs as an icon, updates instantly, and keeps one codebase.",
        impact: "One build, every device",
      },
    ],
  },

  learnings: {
    number: "03",
    title: "What I Learned",
    items: [
      {
        title: "The best model is relative to your data",
        text: "Public benchmarks measure other people's tasks. On my own content, languages and sources, the ranking was different and the most expensive model was not at the top. The only benchmark that counts is the one run on the archive the product will actually answer from.",
      },
      {
        title: "Retrieval before the model",
        text: "A better model cannot answer from what retrieval didn't bring. Measuring hit@10 showed the first setup was missing more than half of the relevant cards. Fixing that moved quality more than any model change, and it is where I look first now.",
      },
      {
        title: "Mixing models is a recipe, tuned to the archive",
        text: "Which model does which step depends on the data: how long the sources are, how many languages, where an error is visible to the user and where it isn't. The split that works is not a rule I can reuse elsewhere; it is the result of measuring this archive, and it will change when the archive changes.",
      },
      {
        title: "Cost and quality in the same test, or you optimise one and pay the other",
        text: "Measuring quality alone pushed me towards the biggest model; measuring cost alone towards the smallest. Measuring both, three runs, fixed configuration, is what made the ÷10 on cost possible without losing answer quality.",
      },
    ],
  },

  cta: {
    title: "See it, or talk about it",
    text: "StayKeel is live and free during the beta. If you are building an AI product where cost, quality and trust all have to hold at once, I'd like to compare notes.",
    demo: "Open StayKeel",
    allProjects: shell.caseStudy.allProjects,
    talk: shell.caseStudy.letsTalk,
  },
};
