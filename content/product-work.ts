// Testi della pagina Product Work (app/pages/ProductWork.tsx), nell'ordine delle sezioni.
// Le schede progetto sono rese da ProjectListingCard ("View Case Study" e' in content/shell.ts).
import { projects } from "./projects";

export const productWork = {
  hero: {
    eyebrow: "All Projects",
    title: "Product Work",
    subtitle: "Strategic product leadership with measurable business impact",
    description:
      "Over 8 years, I've led digital product initiatives across B2B, B2C, and enterprise environments - from design systems to SaaS transformations. Each project reflects hands-on leadership, clear strategy, and tangible results.",
  },

  // Schede progetto, nell'ordine della griglia (props di ProjectListingCard)
  projects: [
    projects.dowJones.productWorkCard,
    projects.falak.productWorkCard,
    projects.aiProduct.productWorkCard,
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
