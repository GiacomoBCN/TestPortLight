// Testi della Home (app/pages/Home.tsx), nell'ordine delle sezioni.
// Nessun mini-markup in questa pagina: tutte stringhe semplici.
import { projects } from "./projects";

export const home = {
  hero: {
    // Mobile: una qualifica per riga; da md in su sulla stessa riga, separate da " · " (nel JSX)
    titleLines: ["Product Builder", "Design Engineer"],
    name: "Giacomo Bianchi",
    intro:
      "I build AI products end to end. When something matters and I don't know it yet, I learn it, cross-check it and prove it with tests. Before that, I co-led the Dow Jones design system across 8 brands and taught product design to 1,000+ students.",
    productWorkCta: "View Product Work",
    teachingCta: "View Teaching Portfolio",
    scrollCueLabel: "Scroll to Selected work",
  },

  impact: {
    title: "Driving Measurable Impact",
    subtitle:
      "From leading design systems at Dow Jones to teaching at EAE. I focus on systems that scale and teams that succeed.",
    cards: {
      dowJones: {
        headline: "60 +",
        subHeadline: "DOW JONES - 8 BRANDS ALIGNED",
        before:
          "8 brands with separate design and engineering teams. Each team had different processes, priorities, and platforms.",
        after:
          "Co-owned roadmap and led adoption across 60+ designers, 120+ stakeholders. Spearheaded token-first architecture. Reduced component complexity 20%.",
        impact:
          "200K+ components in production. 30% productivity increase through improved workflows. WCAG 2.2 compliant.",
      },
      vod: {
        headline: "40 %",
        subHeadline: "INTERACTION FRICTION",
        before:
          "VOD platform required 10+ button presses to switch profiles. 3-axis navigation confused users.",
        after: "Heuristic evaluation identified friction. Redesigned to 4 presses. Clear 2-axis structure.",
        impact:
          "60% fewer presses to switch profiles. WCAG AA accessible. Scaled across TV, mobile, tablet, car.",
      },
      teaching: {
        headline: "1000 +",
        subHeadline: "STUDENTS MENTORED",
        before: "Theory-heavy lectures with limited real-world application.",
        after: "Project-driven learning across design and management disciplines.",
        impact:
          "7 years teaching at EAE Business School. 2 master's programs. 19 project teams annually.",
      },
    },
  },

  howILead: {
    title: "How I Lead",
    subtitle: "Through people, product, and strategy",
    cards: {
      people: {
        title: "Through People",
        points: [
          "Facilitated cross-brand collaboration and design critiques at Dow Jones",
          "Bridged design-engineering gap through 1:1 key role relationships and problem-solving meetings",
          "Taught 1000+ students across 2 official master's programs at EAE Business School",
        ],
      },
      product: {
        title: "Through Product",
        points: [
          "Co-owned design system roadmap and sprint planning",
          "Led SGPV product evolution over 18 months (PhoneGap → Flutter + AI) serving 15 FMCG clients",
          "Balanced user value with technical constraints across B2B and B2C platforms",
        ],
      },
      strategy: {
        title: "Through Strategy",
        points: [
          "Improved UAT/QA workflows - 30% team productivity increase",
          "Proposed removing the VOD welcome screen, prioritizing user value over convention",
          "Managed feature backlog and prioritization for B2B platforms - balanced user value with technical constraints",
        ],
      },
    },
  },

  featuredWork: {
    title: "Selected work",
    // image: percorso sotto public/ (passato a getImagePath nella pagina)
    projects: {
      dowJones: projects.dowJones.homeCard,
      designSystem: projects.designSystem.homeCard,
      aiProduct: projects.aiProduct.homeCard,
      falak: projects.falak.homeCard,
      // VOD e SGPV non sono piu' in Home: restano in Product Work e nel menu
    },
    // Etichette (per screen reader) del bottone pausa / play sui video delle schede
    videoLabels: { pause: "Pause video", play: "Play video" },
  },

  howIWork: {
    title: "How I Work",
    subtitle: "Merging strategy, design, and technology through empathy and clarity",
    portrait: { image: "images/profile/gb.ven_2.webp", alt: "Giacomo Bianchi portrait" },
    // Card: title (h3), tools (riga in grassetto), text
    cards: {
      productDesign: {
        title: "Product Design",
        tools: "Research → Strategy → Design → Testing → Delivery.",
        text: "I run heuristic evaluations, user interviews, and usability tests to validate decisions before engineering builds.",
      },
      productStrategy: {
        title: "Product Strategy",
        tools: "Roadmaps, Prioritization, Stakeholder Alignment.",
        text: "I co-own product roadmaps and prioritize features based on user research, business goals, and technical constraints. I have driven strategic decisions across design systems, mobile apps, and B2B platforms.",
      },
      frontEnd: {
        title: "Front-End Development",
        tools: "React, Flutter, Dart, HTML5, CSS3, JavaScript, TypeScript, Tailwind.",
        text: "I code functional prototypes to bridge design and engineering. This shared language helps me validate feasibility early and align teams on technical approach.",
      },
      aiNative: {
        title: "AI-Native Builder",
        tools:
          "Cursor, Claude Code, Claude API, n8n, Vercel, Ollama, GitHub Copilot, Vertex AI, ChatGPT, Midjourney.",
        text: "ML/AI certified (Python, TensorFlow, Deep Learning). I build with Cursor, Claude Code, and local LLMs, shipping functional prototypes and AI-powered workflows, not just designing around them. Genuine technical fluency at the intersection of design craft and AI.",
      },
    },
    summary:
      "My technical background allows me to bridge design and engineering - prototyping rapidly and participating in architecture discussions. I use AI tools to validate ideas in hours instead of weeks, building working prototypes that teams can react to instead of debating abstract specs.",
  },

  testimonials: {
    title: "What Colleagues Say",
    // image: percorso sotto public/ (TestimonialCarousel lo passa a getImagePath)
    items: [
      {
        quote: "Giacomo is a very good asset when it comes to building bridges between design and tech. Not only does he have a very good understanding of both sides; his best characteristic is the ability to talk to both in their own languages and to be the medium across the two worlds, communicating needs, constraints and opportunities efficiently. Last but not least, he is a good team player, able to build bonds with everyone in the office, which is a benefit to the design team. He is also very good at research and brings a humanistic approach. His ability to capture requirements and information out of interviews and focus groups is fantastic. Something I really value in a person in his position.",
        name: "Antonella Sassu",
        title: "Senior Design Manager • Dow Jones",
        image: "images/profile/1756901959970.webp",
        alt: "Antonella Sassu",
      },
      {
        quote: "I had the pleasure of working closely with Giacomo as a Design Lead Technologist at Dow Jones, and I can confidently say he is an exceptional professional. Giacomo played a critical role as a bridge between engineering and UX, which was instrumental in driving the success of our projects and ensuring smooth handoffs between teams. Additionally, I had the opportunity to collaborate with Giacomo on improving the User Acceptance Testing (UAT), Quality Assurance (QA), and Design acceptance processes. During this collaboration, Giacomo demonstrated his meticulous attention to detail, problem-solving skills, and dedication to optimizing workflows.",
        name: "Oana Stroe",
        title: "Product Design Lead • UX Mentor",
        image: "images/profile/1710886367232.webp",
        alt: "Oana Stroe",
      },
      {
        quote: "I had the pleasure of working with Giacomo while teaching Intelligent Capital and Talent Management in the Master's in International Business program at EAE Business School. He not only helped organize the course and structure content but also brought invaluable expertise in cross-cultural management, ensuring students gained a truly global perspective.\n\nHaving taught Inclusive Leadership, I can confidently say that Giacomo embodies its principles. He fosters diverse perspectives, builds trust, and creates space where all voices are heard. He doesn't just lead - he empowers, ensuring that learning and collaboration thrive.\n\nHis communication skills stand out - clear, engaging, and adaptable. Whether leading discussions, mentoring students, or working with colleagues, he knows how to connect with people, spark thoughtful conversations, and bring key insights to life. And when it comes to collaboration, Giacomo strengthens every team he's part of.\n\nHis leadership reflects the core values of global citizenship: inclusiveness, cultural competence, adaptability, and a genuine commitment to making a positive impact. I would highly recommend him for any role that values strong leadership, strategic management, and the ability to foster inclusive, cross-cultural collaboration. Any organization would be lucky to have him on board!",
        name: "Frank Longo",
        title: "Higher Education Leader • University",
        image: "images/profile/1685965339196.webp",
        alt: "Frank Longo",
      },
      {
        quote: "I had the opportunity to be instructed by Giacomo in UX/UI at EAE. Giacomo's extensive experience and insightful perspective in this field provided me a solid foundation to effectively prepare and manage digital products. He is truly a great professional.",
        name: "Ismael Ruiz Gutierrez",
        title: "Marketing Manager • Former Student",
        image: "images/profile/1685897244209.webp",
        alt: "Ismael Ruiz",
      },
      {
        quote: "Giacomo acted as consultant on a personal project that involved the design and implementation of a website. He mentored me and guided me through several difficult choices pointing at the direction to take for each of them. The project would not have been possible without his input. He is very professional and also fun to work with. Thanks, wish you all the best.",
        name: "Sergio D'Argenio",
        title: "Data Analyst • Tech Company",
        image: "images/profile/1517687171761.webp",
        alt: "Sergio D'Argenio",
      },
    ],
  },

  cta: {
    productLeadership: {
      title: "Product & Design Leadership",
      text: "Explore my work leading cross-functional teams, building design systems, and driving measurable business impact.",
      button: "Explore Product Work",
    },
    teaching: {
      title: "Teaching & Research",
      text: "Discover my experience teaching 1000+ students and bridging academic research with industry practice.",
      // nel JSX seguito da {" "} (nodo di testo separato), come nell'originale
      button: "View Teaching Portfolio",
    },
  },
};
