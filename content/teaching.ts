// Testi della pagina Teaching (app/pages/Teaching.tsx), nell'ordine delle sezioni.
// Mini-markup (vedi app/components/RichText.tsx): **grassetto**.

export const teaching = {
  hero: {
    // label-tag e' in maiuscolo da CSS: si vede "PHD · 7 YEARS TEACHING"
    eyebrow: "PhD · 7 years teaching",
    title: "Teaching & Research",
    description:
      "I build digital products and teach students how to create them. Seven years at **EAE Business School**, more than **1,000 master’s students**, and a research background in **work and organizational psychology** behind the method.",
    // Riga dei numeri sotto il testo
    numbers: "7 years · 1,000+ master’s students · 2 official master’s programmes · 19 teams a year",
    scrollLabel: "Scroll to How a session works",
  },

  session: {
    title: "How a session works",
    text: "Every session lasts **135 minutes**: 60 for theory, 75 for practice. Students apply each framework the same day, in their teams. Through the course they deliver progressive artefacts: research reports, wireframes, prototypes and usability tests. I move between groups and give feedback in real time, so theory is tested while it is still fresh.",
  },

  courses: {
    title: "Courses",
    subtitle: "Bridging academic theory with industry practice",
    // name e' anche il testo alternativo dell'immagine
    list: [
      {
        name: "Product Design (UX/UI)",
        program: "Master in Digital Marketing",
        image: "images/univerity/Product_D_GB.webp",
        text: "Teams research, prototype and test a full e-commerce platform, using **Double Diamond**, **Design Thinking** and **Lean UX**. Each class moves between concept and experiment, and the design changes in response to feedback.",
      },
      {
        name: "Cross-Cultural Management",
        program: "Master in International Business",
        image: "images/univerity/CCM.webp",
        text: "Over ten sessions, students work through case studies, simulations and role plays, applying **Hofstede’s dimensions**, the **Global Mindset** and negotiation strategies to realistic scenarios.",
      },
      {
        name: "AI Workshop",
        program: "Executive Education",
        image: "images/univerity/AI_tools.webp",
        text: "Hands-on workshops on using AI in design work: prompt engineering and rapid prototyping with Figma, ChatGPT and Midjourney.",
      },
    ],
  },

  research: {
    title: "Research Background",
    blocks: [
      {
        title: "Same method, different domain",
        text: "My PhD in **Human Capital Formation and Labour Relations** (University of Bergamo) studied how work environments shape wellbeing and performance. I co-developed the **Consortium Model**, a multi-method stress-risk assessment piloted at AO Papa Giovanni XXIII Hospital. Moving from workplace stress to digital usability was a change of domain, not of method: in both, the job is to find the friction, model the behaviour and design an intervention that improves the outcome.",
      },
      {
        title: "What comes after the screen",
        text: "As AI moves into daily life, I keep asking whether the smartphone is still the right device for it, and how trust works when the interface disappears. My first planned study, **Trust Without Touch**, compares screen, voice and ambient interaction. **Falak**, my prototype of a banking AI assistant that shows its own uncertainty, is the applied side of the same question.",
        // Link alla pagina /falak/ sotto il testo
        link: "Falak →",
      },
    ],
  },

  // Chiusura: solo il bottone email, come nella home (copia l'indirizzo come Contact)
  closing: {
    button: "Let's talk",
  },
};
