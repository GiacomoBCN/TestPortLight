// Testi della pagina Falak (app/pages/Falak.tsx), nell'ordine delle sezioni.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**, *corsivo*, [testo](url), \n = <br />.

export const falak = {
  demoUrl: "https://giacomobcn.github.io/chatTest/",
  repoUrl: "https://github.com/GiacomoBCN/chatTest",

  backLink: "Back to Projects",

  // Screenshot: file in public/images/projects/falak/ e testo alternativo
  shots: {
    overview: { file: "01-desktop-overview.webp", alt: "Falak demo: four scripted examples on the left, the chat on the right, opening with the AI disclosure" },
    balance: { file: "02-desktop-balance.webp", alt: "Balance answered directly, with its source and how fresh the data is" },
    spending: { file: "04-desktop-spending-range.webp", alt: "Spending shown as a range, split into confirmed, estimated and not yet synced" },
    items: { file: "05-desktop-estimated-items.webp", alt: "The six transactions behind the estimated amount, one tap away" },
    loan: { file: "06-desktop-loan-handoff.webp", alt: "Loan question handed to a licensed advisor, with wait time and the conversation passed along" },
    person: { file: "07-desktop-talk-to-person.webp", alt: "Talk to a person, always available from the header" },
    firstRead: { file: "08-desktop-staff-first-read.webp", alt: "Staff view: the relationship manager gives their own read before seeing the AI suggestion" },
    evidence: { file: "09-desktop-staff-suggestion-evidence.webp", alt: "AI suggestion with its evidence, inferred data labelled as such, and three named checks" },
    approve: { file: "10-desktop-staff-checks-approve.webp", alt: "Approving requires the checks and a reason, same as declining" },
    receipt: { file: "11-desktop-staff-receipt.webp", alt: "Receipt of the logged decision: reason, first read, who signed off, time, model, session" },
    decline: { file: "12-desktop-staff-decline.webp", alt: "Decline path, with a reason required" },
    dark: { file: "13-desktop-dark-spending.webp", alt: "Spending answer in the dark theme" },
    mobile: { file: "14-mobile-overview.webp", alt: "Mobile layout of the demo" },
    sheet: { file: "15-mobile-examples-sheet.webp", alt: "Examples sheet on mobile" },
    mobileBalance: { file: "16-mobile-balance.webp", alt: "Balance answer on mobile" },
    mobileSpending: { file: "17-mobile-spending.webp", alt: "Spending answer on mobile" },
    mobileLoan: { file: "18-mobile-loan-handoff.webp", alt: "Handoff to an advisor on mobile" },
    arSpending: { file: "19-arabic-mobile-spending.webp", alt: "Spending answer in Arabic, right-to-left, with the same marks and sources" },
    arBalance: { file: "20-arabic-mobile-balance.webp", alt: "Balance answer in Arabic" },
  },

  hero: {
    breadcrumb: "Home > Product Work > Falak AI Assistant",
    category: "AI INTERACTION DESIGN · TRUST & ACCOUNTABILITY · BANKING",
    title: "Falak: an AI assistant that shows its sources",
    subtitle: "Concept, Research & Coded Prototype",
    // **...** = <span className="text-ink-900 font-semibold">
    description:
      "A research-led study of how an AI assistant in a bank should handle uncertainty, hand over to people, and keep human oversight honest. Eight interaction patterns, each checked against the 2019–2026 literature, built as a bilingual **English / Arabic** Flutter prototype. Falak is a fictional bank; every name and figure is invented.",
    demoCta: "Open the live demo",
    repoCta: "Source on GitHub",
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

  intro: {
    title: "Four ways an AI answer earns trust",
    image: "spending" as const,
    paragraphs: [
      "Falak is a coded prototype of a banking assistant that shows where each answer comes from, how sure it is, and hands over to a person when it should. It runs four scripted examples: a balance (a fact), a spending estimate, a loan question an AI shouldn't decide, and a staff view where a relationship manager signs off an AI suggestion.",
      "One finding shaped everything. Trust signals such as percentages, citations, visible steps and explanations raise trust even when the AI is wrong. They only make trust *appropriate* when they lower the cost of checking an answer, or push the person to form their own judgement first.",
    ],
  },

  challenge: {
    title: "The Challenge",
    text: "In finance a single AI error costs more trust than a human adviser's would. How does a bank's assistant handle uncertainty and responsibility without either hiding it or dressing it up in fake precision? And how does a staff checkpoint stay a real decision instead of a rubber stamp?",
  },

  role: {
    title: "My Role",
    summary: "Concept, research and prototype",
    items: [
      "Defined the eight interaction patterns of the first PoC.",
      "Validated each against the literature; three were reworked, one dropped.",
      "Designed the interaction, visual language and bilingual copy.",
      "Built the prototype in Flutter with Claude Code.",
    ],
  },

  scope: {
    title: "Scope",
    items: [
      "Two audiences: customers and bank staff",
      "English and Arabic, full right-to-left",
      "Four scripted scenarios, light and dark",
      "No backend, no live model: the conversations are scripted to study the patterns",
    ],
  },

  approach: {
    number: "01",
    title: "Approach",
    subtitle: "Eight patterns. Each one either changes what the system does, or makes checking cheaper.",
    enlarge: "Enlarge",
    enlargeImageLabel: (alt: string) => `Enlarge image: ${alt}`,
    // images: chiavi di `shots`
    patterns: [
      {
        title: "Three behaviours, not one chat",
        text: "Every question lands in one of three tiers. A fact read from the system is answered straight away. An estimate is softened and broken down. A question an AI shouldn't decide goes to a person, with no best guess attached. The tier is set by the kind of question and the data available, not by a confidence number the model reports about itself.",
        images: ["balance", "spending", "loan"],
      },
      {
        title: "Words and marks instead of a percentage",
        text: "No \"87% confident\". Each answer carries a mark borrowed from banknote printing: solid for data read from the system, hatched for an estimate, dotted for something not yet synced. Estimates are shown as a range, and the estimated and unsynced amounts open the transactions behind them in one tap.",
        images: ["spending", "items"],
      },
      {
        title: "A source on every answer, the reasoning one tap away",
        text: "One line lists the sources actually used and how fresh each is. \"Why this answer\" is collapsed by default and lists the data the answer was built on, not a narrative of thinking.",
        images: ["balance", "dark"],
      },
      {
        title: "No fake progress",
        text: "A balance arrives immediately. Steps appear only when the assistant consults several sources, each step names what it is reading, and the work can be stopped. No artificial delays to make the answer look considered.",
        images: ["spending"],
      },
      {
        title: "A person is always one tap away",
        text: "\"Talk to a person\" sits in the header. The loan question is handed to a licensed advisor with an honest wait time, a booking alternative, and the conversation passed along so nothing has to be repeated. Any answer can be flagged as wrong.",
        images: ["loan", "person"],
      },
      {
        title: "Human oversight that isn't a rubber stamp",
        text: "The relationship manager sees the client data and answers \"should we contact them?\" before the AI suggestion appears. Three named checks replace a generic \"I have reviewed\" box. Approving needs a reason exactly as declining does. The form then turns into a receipt of what was logged. Inferred data (\"recently married\") is labelled as inferred, sensitive and not confirmed.",
        images: ["firstRead", "evidence", "approve", "receipt", "decline"],
      },
      {
        title: "Same signals in English and Arabic",
        text: "Switching language translates the whole conversation, screen-reader labels included, and flips the layout to right-to-left. Numbers stay unmirrored. The marks, sources and tiers are identical in both languages: culture changes how much people trust at the start, not the mechanism by which trust follows reliability.",
        images: ["arSpending", "arBalance", "mobileSpending"],
      },
      {
        title: "Red means error or decline, nothing else",
        text: "In banking red already means overdrafts, refusals and fraud. Uncertainty is never shown in red, and colour is never the only cue. Text contrast is at least 4.5:1 in light and dark, keyboard focus is visible, and motion is reduced when the system asks for it.",
        images: ["dark", "decline"],
      },
    ] as const,
  },

  keyDecisions: {
    number: "02",
    title: "Key Decisions & Trade-offs",
    subtitle: "The first PoC had all eight patterns. The literature confirmed four, reworked three and replaced one. Every row links to the evidence.",
    impactLabel: "Evidence",
    decisions: [
      {
        point: "How sure the answer is",
        options: [
          "Always-visible numeric score with a traffic light",
          "Verbal bands tied to an action, number on request",
          "Marks (solid / hatched / dotted) and ranges, no number",
        ],
        rationale:
          "With displayed confidence inflated and accuracy held fixed, people followed the AI more and most rated the overconfident AI as well calibrated. LLM self-reported confidence is systematically overestimated. Marks read without colour and without a reference class to misread.",
        impact: "Li et al. 2024 · PAIR Guidebook",
        impactHref: "https://arxiv.org/html/2402.07632v4",
      },
      {
        point: "Estimates",
        options: [
          "A precise total next to uncertain parts",
          "A range with the parts broken down",
        ],
        rationale:
          "A numeric range barely lowers trust in the source, while a single precise figure placed next to uncertain components distorts judgement. The breakdown tells the user where the uncertainty sits and what to check.",
        impact: "van der Bles et al. 2020 · Kale, Kay & Hullman",
        impactHref: "https://arxiv.org/pdf/2007.14516v3.pdf",
      },
      {
        point: "Cost of checking",
        options: [
          "More trust signals on the answer",
          "One tap to the transactions behind an estimate",
        ],
        rationale:
          "What reduces over-reliance on AI is making verification cheaper, not adding more signals. Every estimated or unsynced amount opens its items.",
        impact: "Vasconcelos et al. 2023",
        impactHref: "https://arxiv.org/abs/2212.06823",
      },
      {
        point: "Sources",
        options: [
          "A fixed list of three sources on every answer",
          "Only the sources actually used, with freshness",
        ],
        rationale:
          "Citations raise trust even when they are random, and under 10% of people check them. A source label is only worth showing if it is exact. Sources did reduce reliance on wrong answers, where explanations increased it.",
        impact: "Ding et al. 2025 · Kim et al. 2025",
        impactHref: "https://arxiv.org/pdf/2501.01303v1.pdf",
      },
      {
        point: "Visible steps",
        options: [
          "Scripted 'streaming validation' with fixed delays",
          "Steps only for real multi-source work, stoppable",
        ],
        rationale:
          "Slow algorithmic answers are judged less accurate, unlike slow human ones. A fake 'Authenticating credentials…' step is a false claim about a security check. AWS guidance: a step is a unit of real work; stream fast answers directly.",
        impact: "Efendić et al. · Cloudscape GenAI patterns",
        impactHref: "https://cloudscape.design/patterns/genai/progressive-steps",
      },
      {
        point: "Out-of-scope questions",
        options: [
          "Best guess with a low confidence label",
          "Handoff to a person, no guess shown",
        ],
        rationale:
          "Telling people the AI had declined, without showing its uncertain guess, gave the most accurate decisions. Showing the guess pulled people towards it even when it was wrong.",
        impact: "Bondi et al. 2022",
        impactHref: "https://ar5iv.labs.arxiv.org/html/2112.06751",
      },
      {
        point: "Staff checkpoint",
        options: [
          "Generic 'I have reviewed' attestation, reason only on decline",
          "Own read first, named checks, reason on both paths, receipt",
        ],
        rationale:
          "Automation bias hits experts and novices alike and isn't fixed by training. An independent judgement before seeing the suggestion reduces over-reliance more than explanations do. Asking for a reason only on decline makes approving the path of least resistance.",
        impact: "Parasuraman & Manzey · Buçinca et al. · Green",
        impactHref: "https://arxiv.org/pdf/2102.09692",
      },
      {
        point: "Cultural framing",
        options: [
          "Different trust mechanisms per language (high/low context)",
          "Same signals in both languages, style as a user preference",
        ],
        rationale:
          "Hall's high/low-context model isn't validated as a country classification, and Gulf preferences differ between countries. Across cultures trust starts at different levels but follows reliability the same way. The real risk is technical: calibration error is far worse in Arabic than in English.",
        impact: "Chien et al. · Zhou et al. 2025",
        impactHref: "https://d-scholarship.pitt.edu/34582/",
      },
    ],
  },

  gallery: {
    title: "The prototype on mobile",
    images: ["mobile", "sheet", "mobileBalance", "mobileLoan", "arSpending", "arBalance"] as const,
  },

  delivered: {
    number: "03",
    title: "What was delivered",
    stats: [
      { value: "4", label: "Scripted scenarios", note: "3 for customers, 1 for bank staff" },
      { value: "2", label: "Languages", note: "English and Arabic, full RTL" },
      { value: "2", label: "Themes", note: "Light and dark, 4.5:1 contrast" },
      { value: "0", label: "Invented metrics", note: "No users tested yet" },
    ],
    noMetrics: {
      title: "No numbers that weren't measured",
      text: "This is a concept study, not a shipped product. There are no conversion rates, no satisfaction scores and no time savings to report, because no user has been tested yet. What exists is a working, accessible, bilingual prototype and a documented rationale for every choice in it, including the ones the research overturned.",
      items: [
        "Coded prototype, public demo and source",
        "Research synthesis covering ~60 papers and guidelines, with a verdict per pattern",
        "Regulatory map: EU AI Act art. 50 and 14, GDPR art. 22, QCB guideline, CFPB expectations",
        "A test protocol for the next step, with behavioural metrics",
      ],
    },
  },

  learnings: {
    number: "04",
    title: "What I Learned",
    items: [
      {
        title: "Trust is the wrong success metric",
        text: "Almost every signal in the literature (percentages, citations, visible steps, reasoning) raises trust even on wrong answers. The patterns that hold up either move the decision from the user's interpretation to the system's behaviour, or make checking cheaper. A PoC should be judged on behaviour, not on a trust questionnaire.",
      },
      {
        title: "A scripted prototype can't measure calibration",
        text: "Falak always behaves the same, so it tells you nothing about how well people calibrate their trust. The next step is a test with deliberately wrong answers: how many errors people catch, how often they open the sources, how long staff reviews take and how much they vary.",
      },
      {
        title: "The evidence has gaps the bank could fill",
        text: "Most studies are lab or crowdsourced experiments on simplified tasks. There is no field study of banking chat, no attribution test on internal data, and no calibration measure for Gulf Arabic. A bank running this with real data would be producing new evidence, not confirming old.",
      },
      {
        title: "Regulation sets a floor, not a design",
        text: "The AI disclosure in the first message is the one duty that applies today (EU AI Act art. 50). Human oversight for high-risk credit decisions is required later, but GDPR art. 22 and the SCHUFA ruling already apply. The law says oversight must exist; it doesn't say how to keep it from becoming a stamp. That is the design problem.",
      },
    ],
  },

  regulations: {
    number: "05",
    title: "Regulatory Reference",
    subtitle: "The rules the design was checked against, as they stand after the EU Digital Omnibus. A design map, not legal advice. No rule found requires citing the data source on every answer: that pattern is good practice, not a duty.",
    columns: {
      rule: "Rule",
      duty: "Relevant duty",
      status: "Date / status",
      falak: "What Falak does",
    },
    rows: [
      {
        rule: "EU AI Act art. 50(1)",
        duty: "Tell people they are interacting with an AI, at the start of the first interaction, clearly and accessibly",
        status: "Applies from 2 Aug 2026, untouched by the Digital Omnibus",
        falak: "Done: the first message says it is an AI, in English and Arabic",
      },
      {
        rule: "EU AI Act art. 50(2)",
        duty: "Marking of generated content",
        status: "Postponed to 2 Dec 2026 for systems placed before 2 Aug 2026",
        falak: "Marginal for a text chat",
      },
      {
        rule: "Digital Omnibus on AI",
        duty: "Postpones high-risk obligations (Annex III, credit scoring included, and art. 14)",
        status: "In force 27 Jul 2026; Annex III applies from 2 Dec 2027, Annex I from 2 Aug 2028",
        falak: "The staff tool becomes high-risk only if it embeds creditworthiness scores",
      },
      {
        rule: "EU AI Act art. 14(4)",
        duty: "Awareness of automation bias, ability to ignore or override the output, a stop control",
        status: "From 2 Dec 2027 for high-risk systems",
        falak: "Partly: own read first, decline path, stop on multi-step work. Automation-bias signals for staff are a next step",
      },
      {
        rule: "EU AI Act art. 86",
        duty: "Explanation of the AI's role in a decision affecting a person",
        status: "From 2 Aug 2026, tied to the high-risk classification",
        falak: "The checkpoint receipt logs decision, reason, first read, who signed off, model and session",
      },
      {
        rule: "EU AI Act art. 5",
        duty: "Ban on manipulation and on exploiting vulnerabilities",
        status: "In force since Feb 2025",
        falak: "Conversion-rate pitch removed; a vulnerability check is one of the three named checks",
      },
      {
        rule: "GDPR art. 22 / SCHUFA ruling",
        duty: "Human intervention, right to be heard and to contest, when the bank draws strongly on a score",
        status: "Already in force; the Omnibus delay does not delay this",
        falak: "Human sign-off with a reason on both paths; inferred data labelled and unconfirmed",
      },
      {
        rule: "QCB AI Guideline (Qatar, Sep 2024)",
        duty: "AI register, human-oversight protocol, board accountability, customer notice, explanation of decisions",
        status: "In force for QCB-licensed institutions; which points bind is to be checked on qcb.gov.qa",
        falak: "Notice and explanations identical in English and Arabic",
      },
      {
        rule: "CFPB Issue Spotlight (US, Jun 2023)",
        duty: "No doom loops, recognise disputes and rights, accurate information",
        status: "Supervisory expectation",
        falak: "A person always one tap away; any answer can be flagged as wrong",
      },
    ],
    sources: {
      label: "Sources:",
      links: [
        { label: "Freshfields on the Digital Omnibus", href: "https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/eu-ai-act-unpacked-34-the-final-digital-omnibus-on-ai-key-amendments-to-the-a-102nber" },
        { label: "Usercentrics", href: "https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/" },
        { label: "BSI on art. 50", href: "https://www.bsigroup.com/en-US/insights-and-media/media-center/press-releases/2026/august/eu-ai-act-article-50-transparency-obligations/" },
        { label: "art. 14", href: "https://euaiact.com/article/14" },
        { label: "art. 86", href: "https://www.artificialintelligenceact.eu/article/86/" },
        { label: "A&O Shearman on SCHUFA", href: "https://www.aoshearman.com/en/insights/ao-shearman-on-data/cjeu-rules-that-a-credit-score-constitutes-automated-decision-making-under-the-gdpr" },
        { label: "QCB guideline", href: "https://regulations.ai/regulations/RAI-QA-DO-CBAGXXX-2024" },
        { label: "CFPB", href: "https://files.consumerfinance.gov/f/documents/cfpb_chatbot-issue-spotlight_2023-06.pdf" },
        { label: "Bird & Bird on the EBA mapping", href: "https://cm.twobirds.com/en/insights/2026/recent-developments-on-the-interplay-between-ai-and-financial-institutions" },
      ],
      note: "The EBA mapping (Nov 2025) finds no significant conflict between the AI Act and banking law, and lists as high-risk only creditworthiness assessment and credit scoring of natural persons.",
    },
  },

  cta: {
    title: "Try it, or talk about it",
    text: "The demo runs in the browser, in English and Arabic. If you are building an assistant where being wrong is expensive, I'd like to compare notes.",
    demo: "Open the demo",
    allProjects: "View All Projects",
    talk: "Let's Talk",
  },
};

export type FalakShotKey = keyof typeof falak.shots;
