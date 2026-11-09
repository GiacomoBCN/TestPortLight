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

  // Sezione About (id="about"): foto, testo, quattro regole, competenze
  about: {
    title: "About",
    portrait: { image: "images/profile/gb.ven_2.webp", alt: "Giacomo Bianchi portrait" },
    intro:
      "I work where people and systems meet. I hold a PhD in human capital, taught product design for seven years at EAE Business School and co-led the Dow Jones design system as Lead Design Technologist. Today I design and build StayKeel on my own, from research to production.",
    rulesTitle: "How I work, in four rules:",
    rules: [
      "Design for the culture you ship to, and lead for the culture you work in.",
      "A token is chosen for its role, never for its value.",
      "What the product doesn’t use, I don’t build, and I write down why.",
      "When something matters and I don’t know it yet, I learn it, cross-check it and prove it with tests.",
    ],
    // Mostrate come etichette gialle (label-tag), come le etichette delle card
    skills: ["Product design", "Product strategy", "Design systems", "AI products", "Front-end"],
  },

  // Testimonianze: sfera animata (da 768px) e lista (sotto 768px). Testi parola per parola.
  // quote = frase scelta; text = raccomandazione completa (un paragrafo per riga, separati da "\n").
  // image: percorso sotto public/; se manca, il cerchio mostra le iniziali.
  testimonials: {
    title: "What Colleagues Say",
    readFull: "Read full recommendation",
    seeOnLinkedIn: "See on LinkedIn",
    linkedInUrl: "https://www.linkedin.com/in/giacomobianchi00/details/recommendations/",
    close: "Close",
    items: [
      {
        id: "antonella",
        name: "Antonella Sassu",
        role: "Senior Design Manager • Dow Jones",
        image: "images/profile/1756901959970.webp",
        quote:
          "His best characteristic is the ability to talk to both in their own languages and to be the medium across the two worlds.",
        text: "Giacomo is a very good asset when it comes to building bridges between design and tech. Not only does he have a very good understanding of both sides; his best characteristic is the ability to talk to both in their own languages and to be the medium across the two worlds, communicating needs, constraints and opportunities efficiently. Last but not least, he is a good team player, able to build bonds with everyone in the office, which is a benefit to the design team. He is also very good at research and brings a humanistic approach. His ability to capture requirements and information out of interviews and focus groups is fantastic. Something I really value in a person in his position.",
      },
      {
        id: "oana",
        name: "Oana Stroe",
        role: "Product Design Lead • UX Mentor",
        image: "images/profile/1710886367232.webp",
        quote:
          "Giacomo demonstrated his meticulous attention to detail, problem-solving skills, and dedication to optimizing workflows.",
        text: "I had the pleasure of working closely with Giacomo as a Design Lead Technologist at Dow Jones, and I can confidently say he is an exceptional professional. Giacomo played a critical role as a bridge between engineering and UX, which was instrumental in driving the success of our projects and ensuring smooth handoffs between teams. Additionally, I had the opportunity to collaborate with Giacomo on improving the User Acceptance Testing (UAT), Quality Assurance (QA), and Design acceptance processes. During this collaboration, Giacomo demonstrated his meticulous attention to detail, problem-solving skills, and dedication to optimizing workflows.",
      },
      {
        id: "frank",
        name: "Frank Longo",
        role: "Higher Education Leader • University",
        image: "images/profile/1685965339196.webp",
        quote: "He fosters diverse perspectives, builds trust, and creates space where all voices are heard.",
        text: "I had the pleasure of working with Giacomo while teaching Intelligent Capital and Talent Management in the Master’s in International Business program at EAE Business School. He not only helped organize the course and structure content but also brought invaluable expertise in cross-cultural management, ensuring students gained a truly global perspective.\nHaving taught Inclusive Leadership, I can confidently say that Giacomo embodies its principles. He fosters diverse perspectives, builds trust, and creates space where all voices are heard. He doesn’t just lead - he empowers, ensuring that learning and collaboration thrive.\nHis communication skills stand out - clear, engaging, and adaptable. Whether leading discussions, mentoring students, or working with colleagues, he knows how to connect with people, spark thoughtful conversations, and bring key insights to life. And when it comes to collaboration, Giacomo strengthens every team he’s part of.\nHis leadership reflects the core values of global citizenship: inclusiveness, cultural competence, adaptability, and a genuine commitment to making a positive impact. I would highly recommend him for any role that values strong leadership, strategic management, and the ability to foster inclusive, cross-cultural collaboration. Any organization would be lucky to have him on board!",
      },
      {
        id: "ismael",
        name: "Ismael Ruiz Gutierrez",
        role: "Marketing Manager • Former Student",
        image: "images/profile/1685897244209.webp",
        quote:
          "Giacomo’s extensive experience and insightful perspective in this field provided me a solid foundation to effectively prepare and manage digital products.",
        text: "I had the opportunity to be instructed by Giacomo in UX/UI at EAE. Giacomo’s extensive experience and insightful perspective in this field provided me a solid foundation to effectively prepare and manage digital products. He is truly a great professional.",
      },
      {
        id: "sergio",
        name: "Sergio D’Argenio",
        role: "Data Analyst • Tech Company",
        image: "images/profile/1517687171761.webp",
        quote:
          "He mentored me and guided me through several difficult choices pointing at the direction to take for each of them.",
        text: "Giacomo acted as consultant on a personal project that involved the design and implementation of a website. He mentored me and guided me through several difficult choices pointing at the direction to take for each of them. The project would not have been possible without his input. He is very professional and also fun to work with. Thanks, wish you all the best.",
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
