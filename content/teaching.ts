// Testi della pagina Teaching (app/pages/Teaching.tsx), nell'ordine delle sezioni.

export const teaching = {
  hero: {
    eyebrow: "PhD · 7 years teaching",
    title: "Teaching & Research",
    description:
      "I bring real-world product expertise into the classroom, helping 1000+ students design impactful products and navigate the challenges of cross-cultural collaboration.",
    scrollLabel: "Scroll to Teaching Experience",
  },

  experience: {
    title: "Teaching Experience",
    // Icone nella pagina, nello stesso ordine: GraduationCap, Users, BookOpen, TrendingUp
    stats: [
      { value: "7 years", label: "EAE Business School" },
      { value: "1000+", label: "Students mentored" },
      { value: "2", label: "Master's courses across official programs" },
      { value: "19 teams", label: "Guided through full product design projects each year" },
    ],
  },

  approach: {
    title: "Teaching Approach",
    items: [
      {
        title: "Experiential Learning",
        text: "My teaching approach combines theory with real-world application. Students learn by doing - designing, collaborating, and reflecting - through hands-on experiences that connect academic concepts to professional practice.",
      },
      {
        title: "Collaborative Learning Environments",
        text: "Teamwork is central to both courses. In Product Design (UX/UI), students work in design teams to deliver complete e-commerce projects. In Cross-Cultural Management, they collaborate through case studies and role plays, learning how cultural differences shape communication, leadership, and teamwork.",
      },
      {
        title: "Skill Development through Practice",
        text: "Through project-based and interactive activities, students develop critical thinking, adaptability, and creative problem-solving skills. Each exercise is designed to help them perform effectively in diverse, multidisciplinary environments.",
      },
      {
        title: "Mentorship & Reflection",
        text: "I guide students throughout their learning journey, fostering awareness of their strengths and areas for growth. Reflection and feedback are key to helping them translate classroom experience into professional confidence and real-world competence.",
      },
    ],
  },

  courses: {
    title: "Courses Taught",
    subtitle: "Bridging academic theory with industry practice",
    topicsLabel: "Key Topics",
    outcomesLabel: "Learning Outcomes",
    toolsLabel: "Tools & Technologies",
    // name e' anche il testo alternativo dell'immagine
    list: [
      {
        name: "Product Design (UX/UI)",
        program: "Master in Digital Marketing",
        image: "images/univerity/Product_D_GB.webp",
        topics: [
          "User Research",
          "Information Architecture",
          "Wireframing & Prototyping",
          "UI Design Patterns",
          "Usability Testing",
          "Design Systems",
          "Cross-Cultural Communication",
        ],
        outcomes: [
          "End-to-End Design Process",
          "Practical Team Projects",
          "Design Thinking & Tools",
        ],
        tools: ["Figma", "Miro", "Maze", "Notion"],
      },
      {
        name: "Cross-Cultural Management",
        program: "Master in International Business",
        image: "images/univerity/CCM.webp",
        topics: [
          "Management Across Cultures",
          "Global Leadership",
          "Cultural Environment",
          "Organizational Culture",
          "Intercultural Communication",
          "Negotiation",
          "Managing Global Teams",
          "Ethics & Responsibility in Global Contexts",
        ],
        outcomes: [
          "Managing global and multicultural teams",
          "Cross-cultural negotiation and communication",
          "Ethical decision-making in global contexts",
        ],
        tools: ["Case Studies", "Role-Play Simulations", "Miro", "Notion"],
      },
      {
        name: "AI Workshop",
        program: "Executive Education",
        image: "images/univerity/AI_tools.webp",
        topics: ["AI in Design Workflows", "Prompt Engineering", "Rapid Prototyping"],
        outcomes: [
          "AI-Enhanced Creativity",
          "Prompt Engineering for Design",
          "AI Integration in UX Workflows",
        ],
        tools: ["Figma", "ChatGPT", "Midjourney"],
      },
    ],
  },

  philosophy: {
    title: "Teaching Philosophy",
    paragraphs: [
      "I see teaching as a dialogue between theory and practice. My goal is to help students connect what they learn in class to the complexity of real professional life - where outcomes are uncertain, collaboration is essential, and critical thinking makes the difference.",
      "Drawing on my background in psychology and design, I approach education as a process of guided discovery. I encourage students to question, test, and refine their ideas through practice rather than memorization. Mistakes are treated as learning moments, and reflection is a constant part of the process.",
      "Ultimately, I aim to prepare students who can think independently and work effectively across disciplines and cultures. Beyond technical skills, I want them to leave the classroom with a clear sense of responsibility, curiosity, and confidence in their ability to contribute meaningfully to the world around them.",
    ],
  },

  research: {
    title: "Research Background",
    degree: "PhD in Human Capital Formation and Labour Relations",
    institution: "University of Bergamo • Focus: Human Factors, Behavioral Systems & Labour Regulations",
    focus: {
      title: "Research Focus",
      paragraphs: [
        "My academic journey began with a PhD at the University of Bergamo, where I explored how work environments, organizational design, and labour relations shape team performance, well-being, and collaboration. Through field research in SMEs and collaborations with healthcare organizations, I co-developed a scalable model for assessing work-related stress - integrating insights from human factors, behavioural systems, and labour law.",
        "Over time, my focus evolved from occupational health and organizational psychology toward technology - exploring how digital products are created, experienced, and improved through user interaction. This progression allowed me to apply evidence-based research methods to UX/UI design, team dynamics, and design system governance.",
      ],
    },
    practice: {
      title: "Applied to Practice and Teaching",
      text: "Today, my work bridges research and practice through industry-driven methodologies in UX/UI design and cross-cultural management. I guide teams and students in understanding how human behaviour, collaboration, and organizational design intersect - fostering scalable, people-centred frameworks that connect academic insight with real-world impact.",
    },
  },
};
