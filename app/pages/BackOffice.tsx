"use client";
import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  AlertCircle,
  User,
  TrendingUp,
  Calendar,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  CheckCircle,
  GitBranch,
  Layers,
  Wrench,
  Cloud,
  ServerCog,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import { getImagePath } from "@/utils/image";

export default function OnlineBackOfficeCaseStudy() {
  const keyDecisions = [
    {
      point: "Architecture Strategy",
      options: [
        "Maintain per-client codebases",
        "Monorepo with themed builds",
        "Single shared core + client themes",
      ],
      rationale:
        "Created a single shared core style CSS and a shared asset folder. Client-specific tokens/themes override variables without touching core markup.",
      impact: "99% code reuse across portals",
    },
    {
      point: "Asset Management",
      options: [
        "Duplicate assets per client",
        "CDN per client",
        "Shared assets with client overrides",
      ],
      rationale:
        "Icons and images were centralized. Only logo and color tokens vary per client. This reduced duplication and guaranteed consistency.",
      impact: "80% faster deployment of visual updates",
    },
    {
      point: "Delivery Pipeline",
      options: [
        "Manual FTP per client",
        "Per-repo Git flow",
        "Git-based propagation to all clients",
      ],
      rationale:
        "Git-driven releases: update once in core, propagate to 15+ client portals via branches. Rollbacks and hotfixes became trivial.",
      impact: "Minutes to roll out changes (vs days)",
    },
  ];

  const achievements = [
    {
      icon: Layers,
      metric: "99%",
      label: "Code Reuse",
      description: "Single shared core powering all client portals",
    },
    {
      icon: Zap,
      metric: "80%",
      label: "Efficiency Gain",
      description:
        "Faster testing and deployment through unified CSS and icons",
    },
    {
      icon: CheckCircle,
      metric: "15+",
      label: "Clients Unified",
      description: "Consistent UX and branding across the full client base",
    },
  ];

  const rolloutImprovements = [
    {
      task: "Apply a visual fix to a component",
      before: "15 repos / manual uploads",
      after: "1 core change → propagate",
      improvement: "–90% effort",
    },
    {
      task: "Add a new icon to all portals",
      before: "Duplicate in every client",
      after: "Drop once in shared assets",
      improvement: "–95% duplication",
    },
    {
      task: "Release a hotfix",
      before: "Per-client packaging",
      after: "Git merge → scripted deploy",
      improvement: "Hours → Minutes",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40">
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-[#cbd5e1] hover:text-white hover:border-[#0066ff] transition-all"
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline">Back to Projects</span>
        </Link>
      </div>

      {/* Hero */}
      {/* Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            Home &gt; Product Work &gt; Back Office Unification
          </p>

          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-blue-400">
              PLATFORM ARCHITECTURE · FRONT-END SCALABILITY
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            Back Office Unification
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            Product Designer &amp; Platform Strategist
          </p>

          <p className="text-xl text-gray-300 mb-8">
            Consolidated 15 fragmented client portals into a unified back-office
            platform. <br />
            Built a shared CSS architecture, centralized assets, and Git-based
            rollout model achieving{" "}
            <span className="text-white font-semibold">99%</span> code reuse,
            <span className="text-white font-semibold"> 80%</span> faster
            deployments, and consistent UX across
            <span className="text-white font-semibold"> 15+</span> FMCG clients.
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "Scalable Architecture",
              "Front-End Design",
              "CSS Tokens",
              "Git Workflow",
              "Bootstrap",
              "B2B SaaS",
              "Design Systems",
              "Process Governance",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 glass rounded-full text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Card */}
      <ProjectIntroCard
        image={getImagePath("images/projects/OnlineBackOffice-1.png")}
        title="From Client Forks to a Unified Back Office System"
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          XpuntoCero’s Back Office portals serve as dashboards for the SGPV
          field app, used by merchandisers and sales reps for 15 FMCG clients
          across Spain, Portugal, and Italy. <br />
          They visualize field data, manage promotions, and track retail
          execution. Over time, each portal evolved separately with custom
          branding and one-off requests. Updates became slow, inconsistent, and
          difficult to align with the SGPV app.
        </p>
        <p className="text-gray-300 leading-relaxed">
          My goal was to preserve each client’s identity while building a
          single, scalable foundation that simplified maintenance and
          accelerated delivery.
        </p>
        <p className="text-gray-300 leading-relaxed">
          I redesigned the UI kit, consolidated CSS, and introduced a Git-based
          release workflow, ensuring improvements shipped once and reached all
          client portals instantly. The result kept the freedom of customization
          while removing redundant work and bringing long-term consistency to
          the system.
        </p>
      </ProjectIntroCard>

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title="The Challenge">
              Inconsistent client forks, duplicated assets, and manual updates
              across 15+ portals made maintenance slow, costly, and prone to
              errors. Each portal required separate fixes, leading to diverging
              interfaces and unsustainable QA cycles.
            </OverviewCard>
            <OverviewCard icon={User} title="My Role">
              <p className="font-semibold mb-2">
                Product Designer & Platform Strategist
              </p>
              <ul className="space-y-1 ">
                <li>
                  • Diagnosed fragmented client forks and unsustainable update
                  cycles.
                </li>
                <li>
                  • Led the back-office unification, built one shared core
                  applied across 15+ client portals.
                </li>
                <li>
                  • Reverse-engineered legacy CSS to identify patterns and
                  enable bulk front-end updates.
                </li>
                <li>
                  • Created the Git-based release model to propagate
                  improvements from a single source.
                </li>
                <li>
                  • Established the roadmap and process that made the unified
                  approach maintainable at scale.
                </li>
              </ul>
            </OverviewCard>

            <OverviewCard icon={TrendingUp} title="Impact">
              <ul className="space-y-1">
                <li>• 99% core code reuse across all client portals</li>
                <li>• 80% faster rollout of visual and UI updates</li>
                <li>• Consistent UX and brand alignment for 15+ clients</li>
              </ul>
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* Metrics Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Program Outcomes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <GlassCard key={i}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <a.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {a.metric}
                  </div>
                  <div className="text-sm font-semibold text-blue-400 mb-2">
                    {a.label}
                  </div>
                  <div className="text-xs text-gray-400">{a.description}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery Slider */}
      <ProjectGallery
        title="Design Evolution"
        images={[
          {
            src: getImagePath("images/projects/OnlineBackOffice-2.png"),
            alt: "Legacy vs New dashboards",
          },
          {
            src: getImagePath("images/projects/OnlineBackOffice-3.png"),
            alt: "Tables and data views – old vs new",
          },
          {
            src: getImagePath("images/projects/OnlineBackOffice-4.png"),
            alt: "Unified approach diagram & laptop",
          },
        ]}
      />

      {/* Section 1: Business Context */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              01
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Business Context
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24">
            <GlassCard>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  These dashboards visualize field data such as sales,
                  promotions, and store audits. These dashboards visualize field
                  data such as sales, promotions, and store audits.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  Over time, client portals drifted apart with custom branding,
                  duplicated assets, and manual updates. This fragmentation
                  slowed releases and caused inconsistencies with the SGPV
                  mobile app.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  The goal was to create one shared core that keeps each
                  client’s identity while centralizing maintenance and
                  accelerating updates.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="text-gray-400 text-sm">
                    <div className="font-semibold text-blue-400 mb-1">
                      Challenges
                    </div>
                    <ul className="space-y-1">
                      <li>• Duplicated assets and inconsistent portals </li>
                      <li>
                        • Manual updates breaking alignment with SGPV app data
                      </li>
                      <li>
                        • High QA and maintenance costs across 15+ clients
                      </li>
                    </ul>
                  </div>
                  <div className="text-gray-400 text-sm">
                    <div className="font-semibold text-blue-400 mb-1">
                      Goals
                    </div>
                    <ul className="space-y-1">
                      <li>• Shared core with CSS-based theming </li>
                      <li>• Git-powered centralized release workflow </li>
                      <li>
                        • Faster iteration aligned with SGPV product cycles
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Section 2: Problem & Hypothesis */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              02
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Problem & Hypothesis
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard>
              <div className="p-6">
                {/* Styled header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    The Problem
                  </h3>
                </div>

                {/* Your original list */}

                <p className="text-gray-300 leading-relaxed">
                  • Inconsistent UI across portals due to heavy per-client
                  customization
                </p>
                <p className="text-gray-300 leading-relaxed">
                  • Increased development time and QA overhead
                </p>
                <p className="text-gray-300 leading-relaxed">
                  • Updates could not be applied uniformly
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                {/* Styled header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-green-500/15 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Hypothesis
                  </h3>
                </div>

                {/* Your original paragraph */}
                <p className="text-gray-300 leading-relaxed">
                  By concentrating changes in a single CSS file and a shared
                  image/icon folder, we can roll out UI updates to all portals
                  at once via Git, maintain client customization via themes, and
                  dramatically reduce duplicated work.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              03
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Key Decisions & Trade‑offs
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={keyDecisions} />
          </div>
        </div>
      </section>

      {/* Section 4: The Solution */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              04
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The Unified Solution
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Single CSS + Shared Assets
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Consolidated all client styles into one maintainable CSS
                  architecture with variables and mixins.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Reverse-engineered legacy files to find reusable patterns and
                  moved icons and images into a shared library.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Each client’s theme now overrides only color tokens and logos,
                  keeping 90% of the codebase identical.
                </p>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Git‑Based Propagation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Updates are committed to the shared core, merged through
                  dedicated client branches, and deployed to all portals using
                  Git-based scripts.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This workflow replaced manual uploads, reduced release errors,
                  and made rollbacks fully traceable and fast to execute.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Interaction / Rollout Improvements */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              05
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Operational Improvements
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <GlassCard className="hidden lg:block">
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Centralization turned multi‑client maintenance into a
                  productized workflow. Below are representative changes in
                  effort/time to ship.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-4 pr-4 text-blue-400 font-semibold">
                          Task
                        </th>
                        <th className="pb-4 pr-4 text-blue-400 font-semibold">
                          Before
                        </th>
                        <th className="pb-4 pr-4 text-blue-400 font-semibold">
                          After
                        </th>
                        <th className="pb-4 text-blue-400 font-semibold">
                          Improvement
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      {rolloutImprovements.map((item, i) => (
                        <tr key={i} className="border-b border-gray-800">
                          <td className="py-4 pr-4">{item.task}</td>
                          <td className="py-4 pr-4">{item.before}</td>
                          <td className="py-4 pr-4">{item.after}</td>
                          <td className="py-4">
                            <span className="font-bold text-green-400">
                              {item.improvement}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>

            {/* Mobile Card View - visible only on mobile (adopted from VoDCaseStudy.tsx) */}
            <GlassCard>
              <div className="lg:hidden space-y-4">
                {rolloutImprovements.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/[0.05] border border-white/10 rounded-lg p-4"
                  >
                    <h3 className="text-white font-semibold text-base mb-4">
                      {item.task}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide">
                          Before
                        </div>
                        <div className="text-gray-300 text-sm font-semibold">
                          {item.before}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide">
                          After
                        </div>
                        <div className="text-gray-300 text-sm font-semibold">
                          {item.after}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-white/10">
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide">
                          Improvement
                        </div>
                        <div className="text-green-400 text-base font-bold">
                          {item.improvement}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Outcomes & Deliverables */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              06
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Outcomes & Deliverables
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Front‑End
                  </h3>
                  <ul className="space-y-1 text-gray-400 text-sm">
                    <li>• Unified CSS architecture with tokens</li>
                    <li>• Shared iconography & image library</li>
                    <li>• Bootstrap‑based responsive components</li>
                  </ul>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Process & Governance
                  </h3>
                  <ul className="space-y-1 text-gray-400 text-sm">
                    <li>• Git release workflow for multi‑client rollouts</li>
                    <li>• Branching model for hotfixes and theming</li>
                    <li>• QA checklist and A/B testing framework</li>
                  </ul>
                </div>
              </GlassCard>
            </div>

            <GlassCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  Results
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>
                    → <strong>Scalability:</strong> Re‑styled and deployed
                    across 15+ clients with centralized updates.
                  </li>
                  <li>
                    → <strong>Development Efficiency:</strong> Focusing on core
                    CSS + icons enabled 80% faster updates across portals.
                  </li>
                  <li>
                    → <strong>Development Speed:</strong> Centralized design and
                    development enabled future updates to be implemented 25%
                    faster.
                  </li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>

        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <GlassCard>
              <div className="text-center py-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Want to see more work?
                </h2>
                <p className="text-[#cbd5e1] mb-8 max-w-2xl mx-auto">
                  This project shows how a design‑led front‑end refactor can
                  unlock scale and lower costs across a legacy estate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={createPageUrl("ProductWork")}
                    className="px-8 py-4 bg-[#0066ff] rounded-xl text-white font-semibold hover:bg-[#0052cc] transition-all glow-blue hover:scale-105"
                  >
                    View All Projects
                  </Link>
                  <a
                    href="mailto:consulting@giacomobianchi.tech"
                    className="px-8 py-4 glass rounded-xl text-white font-semibold hover:bg-[#0066ff] hover:border-[#0066ff] transition-all"
                  >
                    Let's Talk
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </section>
    </div>
  );
}
