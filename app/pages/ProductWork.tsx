"use client";

import React from "react";
import ProjectListingCard from "../components/work/ProjectListingCard";

export default function ProductWork() {
  const projects = [
    {
      category: "DESIGN SYSTEMS · PRODUCT OWNERSHIP · ENTERPRISE",
      title: "Dow Jones Design System",
      role: "Lead Design Technologist | Design System Product Owner",
      year: "",
      description:
        "Co-led design system adoption across B2B and B2C brands, boosting team productivity by 30% and reducing component complexity by 20%.",
      metrics: [
        { value: "60+", label: "Designers" },
        { value: "200K+", label: "References" },
        { value: "30%", label: "Efficiency" },
      ],
      tags: [
        "Leadership",
        "AI-Enhanced",
        "Product Strategy",
        "Design Systems",
        "SAFe Agile",
        "WCAG 2.2",
        "CI/CD",
        "Storybook",
        "Style Dictionary",
        "Design Tokens",
        "React",
        "Figma",
      ],
      slug: "DowJones",
    },
    {
      category: "B2C Multi-platform",
      title: "VOD Platform Redesign",
      role: "Product Consultant",
      year: "",
      description:
        "Redesigned cross-device VOD experience with 40% fewer interaction steps (calculated via click-path analysis) and WCAG AA compliance across TV, mobile, and in-car displays.",
      metrics: [
        { value: "40%", label: "Steps Reduced" },
        { value: "WCAG AA", label: "Compliant" },
        { value: "5", label: "Platforms" },
      ],
      tags: [
        "Consultant",
        "Heuristic Evaluation",
        "End-to-end UX/UI Process",
        "Figma",
        "Multi-platform Design",
        "UX Strategy",
        "WCAG 2.2 AA",
        "TV/10-foot UI",
      ],
      slug: "VODplatform",
    },
    {
      category: "SAAS",
      title: "SGPV Product Evolution",
      role: "Product Design & Development",
      year: "",
      description:
        "Multi-year product evolution from PhoneGap to Flutter, serving 15 B2B clients. Redesigned user flows and AI-powered features reduced task time by 25%.",
      metrics: [
        { value: "15", label: "Clients" },
        { value: "25%", label: "Faster" },
        { value: "30%", label: "Satisfaction ↑" },
      ],
      tags: [
        "Product Strategy",
        "End-to-end UX/UI Process",
        "Design System",
        "Figma",
        "AI",
        "Mobile",
        "B2B",
        "SaaS",
        "Flutter",
        "Dart",
        "PhoneGap",
        "JavaScript",
        "Bootstrap",
        "Agile/SCRUM",
      ],
      slug: "SGPVEvolution",
    },
    {
      category: "GROWTH · BUSINESS IMPACT",
      title: "XpuntoCero Digital Transformation",
      role: "Product Design & Development",
      year: "",
      description:
        "Rebranded SaaS company with PWA redesign, increasing mobile traffic by 40%, leads by 15%, and customer satisfaction by 30%.",
      metrics: [
        { value: "40%", label: "Mobile Trafic" },
        { value: "15%", label: "More Leads" },
        { value: "2 x", label: "Demo Requests" },
      ],
      tags: [
        "Branding",
        "Strategy",
        "End-to-end UX/UI Process",
        "Figma",
        "Front-End",
        "PWA",
        "WordPress",
        "Elementor",
      ],
      slug: "XpuntoCero",
    },
    {
      category: "TECHNICAL LEADERSHIP · SCALABILITY",
      title: "Back Office Unification",
      role: "Product Design & Development",
      year: "",
      description:
        "Unified 15 client portals with shared CSS and assets, reducing redundant work and enabling scalable updates across all platforms.",
      metrics: [
        { value: "15", label: "Portals" },
        { value: "99%", label: "Code Reuse" },
        { value: "80%", label: "Efficiency" },
      ],
      tags: ["Bootstrap 4", "CSS3", "Git Workflow"],
      slug: "BackOffice",
    },
    {
      category: "B2B SAAS · FIELD OPERATIONS",
      title: "TuPlanRedondo PWA",
      role: "Product Design & Development",
      year: "",
      description:
        "Streamlined evaluation user flows with a PWA for McDonald's franchise, saving 30% time and boosting satisfaction by 25%.",
      metrics: [
        { value: "30%", label: "Time Saved" },
        { value: "25%", label: "Satisfaction" },
        { value: "Real-time", label: "Data" },
      ],
      tags: [
        "End-to-end UX/UI Process",
        "Figma",
        "Front-End Development",
        "PWA",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "JavaScript",
      ],
      slug: "TuPlanRedondo",
    },
    // TEMPORARILY HIDDEN - E-Commerce Product Management
    // {
    //   category: "PRODUCT MANAGEMENT · PORTFOLIO",
    //   title: "E-Commerce Product Management",
    //   role: "Project Managment & Product Design",
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
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-6 py-3 glass rounded-full text-blue-400 text-base md:text-lg uppercase tracking-[0.2em] font-semibold">
              All Projects
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Product Work
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Strategic product leadership with measurable business impact
          </p>

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Over 8+ years, I've led digital product initiatives across B2B, B2C,
            and enterprise environments - from design systems to SaaS
            transformations. Each project reflects hands-on leadership, clear
            strategy, and tangible results.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectListingCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
