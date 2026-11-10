// Testi della pagina Teaching (app/pages/Teaching.tsx), nell'ordine delle sezioni.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**.

export const teaching = {
  hero: {
    // label-tag e' in maiuscolo da CSS: si vede "PHD · 7 YEARS TEACHING"
    eyebrow: "PhD · 7 years teaching",
    title: "Teaching & Research",
    description:
      "I build digital products and teach students how to create them. For seven years at **EAE Business School** I have taught and coordinated courses in **Product Design (UX/UI)** and **Cross-Cultural Management** in official master’s programmes, guiding students through research, prototyping and testing until their ideas become products people can use. My research training in **work and organizational psychology** shapes how I teach.",
    scrollLabel: "Scroll down",
  },

  // Card con i numeri. Icone nella pagina (statIcons), stesso ordine.
  stats: [
    { value: "7", label: "years teaching" },
    { value: "1,000+", label: "master’s students" },
    { value: "2", label: "official master’s programmes" },
    { value: "40 to 60", label: "students per cohort" },
    { value: "19", label: "teams a year" },
    { value: "EN / ES", label: "teaching languages" },
  ],

  philosophy: {
    title: "Teaching Philosophy",
    text: "My teaching integrates theory and practice through **experiential and collaborative learning**. Each session starts with the core frameworks and moves straight into applying them, in teams, on real problems. Students do not memorize a method: they use it, see where it breaks, and adjust. My goal is to help them grow into independent, empathetic professionals who can move between theory and practice with confidence.",
  },

  courses: {
    title: "Courses",
    formatLabel: "Format:",
    topicsLabel: "Topics:",
    // name e' anche il testo alternativo dell'immagine
    list: [
      {
        name: "Product Design (UX/UI)",
        program: "Master in Digital Marketing",
        image: "images/univerity/Product_D_GB.webp",
        format: "135-minute sessions, 60 minutes of theory and 75 of practice.",
        text: "Students work in design teams to research, prototype and test a full **e-commerce platform**, using **Double Diamond**, **Design Thinking** and **Lean UX**. Through the course they deliver progressive artefacts: user research reports, wireframes, prototypes and usability tests. I move between groups to assess progress and give feedback in real time, so each framework is tested in practice the same day it is introduced.",
        topics: "User research · Information architecture · Wireframing and prototyping · UI patterns · Usability testing · Design systems",
      },
      {
        name: "Cross-Cultural Management",
        program: "Master in International Business",
        image: "images/univerity/CCM.webp",
        format: "50 minutes of theory, then the rest of each session on group work, case studies and role plays.",
        text: "Students explore how culture shapes communication, leadership and teamwork, applying **Hofstede’s dimensions**, the **Global Mindset** and **negotiation strategies** to realistic scenarios. Across ten sessions they run simulations and presentations that build intercultural competence and reflective leadership.",
        topics: "Management across cultures · Global leadership · Organizational culture · Intercultural communication · Negotiation · Managing global teams · Ethics in global contexts",
      },
      {
        name: "AI Workshop",
        program: "Executive Education",
        image: "images/univerity/AI_tools.webp",
        format: "",
        text: "Hands-on workshops within the master’s programme on bringing AI into design work: **prompt engineering**, AI-assisted ideation and **rapid prototyping** with Figma, ChatGPT and Midjourney.",
        topics: "AI in design workflows · Prompt engineering · Rapid prototyping",
      },
    ],
  },

  research: {
    title: "Research Background",
    blocks: [
      {
        title: "Same method, different domain",
        text: "My PhD in **Human Capital Formation and Labour Relations** (University of Bergamo) studied how work environments shape wellbeing, performance and collaboration. I co-developed the **Consortium Model**, a multi-method stress-risk assessment framework piloted at **AO Papa Giovanni XXIII Hospital**, and contributed to a study on occupational health in SMEs funded by Italy’s Ministry of Labour (CQIA, ADAPT and INAIL, 2007 to 2015). That work trained me in mixed-methods research, quantitative analysis, psychometric design and qualitative observation. Moving from workplace stress to digital usability was a change of domain, not of method: in both, the job is to find the friction, model the behaviour and design an intervention that improves the outcome.",
        link: "",
      },
      {
        title: "Research on people and AI",
        text: "The same method now drives my work on human-AI interaction. **Falak** is a research-led study of how an AI assistant in a bank should handle uncertainty, hand over to people and keep human oversight honest. I defined **eight interaction patterns**, checked each one against the research literature from 2019 to 2026, and built them as a coded prototype in English and Arabic.",
        // Link alla pagina /falak/ sotto il testo
        link: "Falak →",
      },
    ],
  },

  beyond: {
    title: "Beyond the classroom",
    text: "I bring eight years of industry work, including co-leading the design system at **Dow Jones**, into curriculum design, industry partnerships and student mentoring: how products are really built, and how to work with stakeholders across organizations and cultures.",
  },

  // Chiusura: solo il bottone email, come nella home (copia l'indirizzo come Contact)
  closing: {
    button: "Let's talk",
  },
};
