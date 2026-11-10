// Testi della pagina Product Work (app/pages/ProductWork.tsx), nell'ordine delle sezioni.
// Le schede progetto sono rese da ProjectListingCard ("View Case Study" e' in content/shell.ts).
import { projects } from "./projects";

export const productWork = {
  hero: {
    eyebrow: "All Projects",
    title: "Product Work",
    subtitle: "Design systems, AI products and internal tools, designed and built.",
    description:
      "Eight years of work between design and code. At Dow Jones I co-led a design system for 8 brands. At XpuntoCero I designed products and wrote their front end. Today I build StayKeel, my own AI product, from research to production.",
  },

  // Schede progetto, nell'ordine della griglia (props di ProjectListingCard)
  projects: [
    projects.dowJones.productWorkCard,
    projects.designSystem.productWorkCard,
    projects.aiProduct.productWorkCard,
    projects.falak.productWorkCard,
    projects.vod.productWorkCard,
    projects.sgpv.productWorkCard,
    projects.xpuntoCero.productWorkCard,
    projects.backOffice.productWorkCard,
    projects.tuPlanRedondo.productWorkCard,
    // TEMPORARILY HIDDEN - E-Commerce Product Management
    // {
    //   category: "PRODUCT MANAGEMENT · PORTFOLIO",
    //   title: "E-Commerce Product Management",
    //   role: "Project Management & Product Design",
    //   year: "",
    //   description:
    //     "Managed multiple e-commerce projects with 95% client satisfaction, 90% on-time delivery, and 20% boost in team productivity.",
    //   metrics: [
    //     { value: "95%", label: "Satisfaction" },
    //     { value: "90%", label: "On-Time" },
    //     { value: "20%", label: "Productivity" },
    //   ],
    //   tags: ["WordPress", "WooCommerce", "Agile", "Stakeholder Management"],
    //   slug: "EcommerceManagement",
    // },
  ],
};
