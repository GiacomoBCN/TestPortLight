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
  Users,
  Target,
  Zap,
  Code,
  Layers,
  GitBranch,
  CheckCircle,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import LeadershipCard from "../components/portfolio/LeadershipCard";
import MetricShowcase from "../components/casestudy/MetricShowcase";
import LeadershipProfile from "../components/casestudy/LeadershipProfile";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import { getImagePath } from "@/utils/image";

export default function DowJones() {
  const keyDecisions = [
    {
      point: "Governance Model",
      options: ["Centralized team", "Distributed contributors", "Hybrid model"],
      rationale:
        "Hybrid approach balanced central oversight with brand autonomy. Brands contributed to the system while maintaining their unique identities. This voluntary adoption model was critical.",
      impact: "All 8 brands adopted the system",
    },
    {
      point: "Platform Architecture",
      options: [
        "React-only",
        "Native per platform",
        "Token-based cross-platform",
      ],
      rationale:
        "Token-first strategy using Style Dictionary enabled one source of truth across web, iOS, and Android. This unlocked multi-brand theming and dark mode without rebuilding components.",
      impact: "Cross-platform consistency",
    },
    {
      point: "Component Complexity",
      options: ["Simple atoms only", "Complex compositions", "Tiered system"],
      rationale:
        "Tiered system with reorganized Storybook architecture provided flexibility while maintaining consistency. Improved discoverability for 60+ designers and 120+ engineers.",
      impact: "20% complexity reduction",
    },
    {
      point: "Documentation & Workflow Strategy",
      options: [
        "Code comments",
        "Separate docs site",
        "Integrated Storybook + process optimization",
      ],
      rationale:
        "Storybook integration kept docs close to code, increasing usage and reducing maintenance burden. I also improved team workflows for handoffs, UAT, QA, and design acceptance, streamlining how designers and engineers collaborated.",
      impact: "30% productivity boost",
    },
  ];
  const teamAdoptionMetrics = [
    {
      icon: Users,
      metric: "60+",
      label: "Designers Aligned",
      description: "Unified design teams across 8+ brands",
    },
    {
      icon: Code,
      metric: "200K+",
      label: "Component References",
      description: "System adoption at scale across all products",
    },
    {
      icon: Target,
      metric: "120+",
      label: "Stakeholders",
      description:
        "Cross-functional collaboration (business, product, engineering, accessibility)",
    },
    {
      icon: Layers,
      metric: "8+",
      label: "Brands",
      description: "WSJ, Factiva, Barron's, MarketWatch, and more",
    },
    {
      icon: GitBranch,
      metric: "3",
      label: "Platforms",
      description: "Web, iOS (SwiftUI), Android (native)",
    },
    {
      icon: CheckCircle,
      metric: "WCAG 2.2",
      label: "Accessibility",
      description: "EU & U.S. compliance standards",
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
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            Home &gt; Product Work &gt; Dow Jones Design System
          </p>
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-blue-400">
              DESIGN SYSTEMS · PRODUCT OWNERSHIP · ENTERPRISE
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Dow Jones Design System
          </h1>
          <p className="text-lg text-gray-400 mb-4">
            Lead Design Technologist | Design System Product Owner
          </p>
          <p className="text-xl text-gray-300 mb-8">
            I co-led design system adoption across 8 brands at Dow Jones, from
            The Wall Street Journal to Factiva (B2C & B2B). We unified teams,
            reduced component complexity by 20%, and boosted productivity by
            30%.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
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

      {/* Intro Card with your actual image */}

      <ProjectIntroCard
        image={getImagePath("images/projects/brand-ds.png")}
        title="Building a Unified System at Scale"
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          Dow Jones operates multiple B2B and B2C brands including The Wall
          Street Journal, Barron's, MarketWatch and Factiva (B2B), with more in
          the pipeline (B2C and B2B). Each brand had evolved independently with
          its own design team, which drove rapid innovation and brand-specific
          optimization. As the company scaled, the opportunity emerged to unify
          these learnings into a shared foundation while preserving each brand's
          unique identity.
        </p>
        <p className="text-gray-300 leading-relaxed">
          As Lead Design Technologist and Product Owner for the design system, I
          co-owned the product roadmap with design and engineering leadership.
          The challenge was establishing governance that 8 autonomous brands
          would embrace, not as a constraint, but as an accelerator.
        </p>

        <p className="text-gray-300 leading-relaxed">
          We succeeded by reorganizing the architecture (20% less complexity),
          streamlining workflows (30% productivity boost), and embedding
          accessibility (WCAG 2.2) from day one. Today, the system powers 200K+
          component instances used by 60+ designers and 120+ engineers across
          web, iOS, and Android.
        </p>
      </ProjectIntroCard>

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title="The Challenge">
              Multiple B2B and B2C, each with strong design identities. The
              opportunity: create a unified foundation that accelerates
              development while preserving brand uniqueness.
            </OverviewCard>

            <OverviewCard icon={User} title="My Role">
              <p className="font-semibold mb-2">Lead Design Technologist</p>
              <ul className="space-y-1">
                <li>• Product roadmap co-ownership</li>
                <li>• Design system governance</li>
                <li>• Component architecture</li>
                <li>• Stakeholder alignment & conflict resolution</li>
                <li>
                  • Bridge between design vision and technical implementation
                </li>
              </ul>
            </OverviewCard>

            <OverviewCard icon={GitBranch} title="Scope">
              Cross-platform system · 8 brands · Web, iOS, Android · WCAG 2.2
              compliant
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* Team Adoption & Scale */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Team Adoption & Scale
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Who uses the system and where it's deployed
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamAdoptionMetrics.map((metric, index) => (
              <GlassCard key={index}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <metric.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {metric.metric}
                  </div>
                  <div className="text-sm font-semibold text-blue-400 mb-2">
                    {metric.label}
                  </div>
                  <div className="text-xs text-gray-400">
                    {metric.description}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery Slider */}
      <ProjectGallery
        title="Project Gallery"
        images={[
          {
            src: getImagePath("images/projects/token1-ds.png"),
            alt: "Design System",
          },
          {
            src: getImagePath("images/projects/token2-ds.png"),
            alt: "Design Tokens",
          },
          {
            src: getImagePath("images/projects/token3-ds.png"),
            alt: "Design System",
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
          <div className="pl-0 md:pl-24 space-y-6">
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  From Autonomy to Unified Scale
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  As Dow Jones grew its portfolio—The Wall Street Journal,
                  Barron's, MarketWatch, Factiva, and more—each brand developed
                  its own design approaches and workflows. This autonomy was a
                  strength: teams moved fast, optimized for their specific
                  audiences, and built strong brand identities.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The opportunity emerged as the company scaled: could we
                  preserve that brand autonomy while creating a shared
                  foundation that would accelerate everyone? The goal wasn't to
                  standardize everything. It was to enable teams to move faster
                  by solving common problems once, then customizing where it
                  mattered.
                </p>
                <p className="text-gray-400 mb-2">What we needed:</p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      A governance model that brands would adopt voluntarily
                      (not mandated from above)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Technical architecture flexible enough to support B2C and
                      B2B contexts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      A system that preserved brand identity while enabling
                      cross-brand efficiency
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Section 2: Governance & Architecture */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              02
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Governance & Architecture
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            {/* Card 1: Token-First */}

            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Token-First Architecture
                </h3>

                <p className="text-gray-300 leading-relaxed mb-4">
                  Our team proposed a token-first strategy to enable multi-brand
                  scale. Design tokens are variables that store foundational
                  design attributes: colors, spacing, typography, shadows. Think
                  of them like Lego bricks. You build the component structure
                  once (the brick shape), then snap on different tokens (colors
                  and styles) to create brand-specific versions.
                </p>

                <p className="text-gray-300 leading-relaxed mb-4">
                  All brands use the same token structure, but each assigns
                  different values. For example, "Ink" is a token family for
                  typography and iconography. Within that family, there are
                  specific tokens like InkBrand. Both The Wall Street Journal
                  and Factiva have the same Ink family with the same InkBrand
                  token, but each brand assigns different values to it. Same
                  structure, different brand expression.
                </p>

                <p className="text-gray-300 leading-relaxed mb-4">
                  My role was bridging the technical vision with designers and
                  stakeholders, helping them understand how "variables" would
                  speed up their work. Many struggled with the abstraction, so I
                  translated it simply: "Design once, the system adapts it to
                  every brand automatically." I also worked with teams when
                  system rules felt too strict, explaining the reasoning behind
                  governance decisions and helping stakeholders see why
                  consistency mattered for long-term scale.
                </p>

                <p className="text-gray-400 mb-2">What this enabled:</p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Migrated to platform-agnostic Style Dictionary (one source
                      for web, iOS, and Android)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Automated token distribution via CI/CD (designers update
                      Figma, tokens flow to all platforms)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Single source of truth for visual properties (no more
                      "which blue?" debates)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      White-label theming and dark mode without rebuilding
                      components
                    </span>
                  </li>
                </ul>

                <p className="text-gray-300 leading-relaxed mt-4">
                  Instead of 8 separate design systems, we had one flexible
                  system expressing 8+ brand identities. The technical
                  architecture made it possible; my role was ensuring adoption
                  and governance.
                </p>
              </div>
            </GlassCard>

            {/* Card 2: Repository Overhaul */}
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Repository & Documentation Overhaul
                </h3>

                <p className="text-gray-300 leading-relaxed mb-4">
                  Led the reorganization of core repositories and Storybook
                  architecture, reducing component complexity by 20% and
                  dramatically improving discoverability for both engineers and
                  designers. This wasn't just technical cleanup. It required
                  careful coordination across 8 brands.
                </p>

                <p className="text-gray-300 leading-relaxed mb-4">
                  I moderated every handoff and pre-handoff session, acting as
                  problem solver when brand-specific needs conflicted with
                  system-wide goals. These sessions were where the real
                  governance work happened: finding solutions that satisfied
                  individual brand requirements while maintaining system
                  integrity.
                </p>

                <p className="text-gray-400 mb-2">Results:</p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Improved component organization and documentation
                      structure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Streamlined contribution workflows and approval processes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Facilitated handoff sessions as moderator, resolving
                      conflicts between brand needs and system goals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Faster onboarding (new team members reached productivity
                      sooner)
                    </span>
                  </li>
                </ul>
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
                Key Decisions & Trade-offs
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={keyDecisions} />
          </div>
        </div>
      </section>

      {/* Collaboration & Process */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              04
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                How We Worked: Process, Quality & Collaboration
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Cross-Functional Partnership
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Partnered with over 120 stakeholders from product,
                  engineering, and accessibility teams to ensure scalable
                  implementation and alignment across all brands.
                </p>
                <p className="text-gray-400 mb-2">What this looked like:</p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Collaborated with analytics teams using Google Analytics
                      and internal dashboards to inform product improvements and
                      support data-driven prioritization
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Demonstrated a "make things happen" mindset through
                      ownership and speed (no waiting for perfect conditions)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Regular sync meetings across time zones to keep 8+ brands
                      aligned
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Accessibility & Quality
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ensured accessibility (A11y) best practices were embedded into
                  the design system from day one, meeting EU and U.S. compliance
                  standards (WCAG 2.2). This wasn't a checklist. It was baked
                  into our workflow.
                </p>
                <p className="text-gray-400 mb-2">How we validated:</p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Collaborated with the accessibility lead on validation
                      strategy and testing protocols
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Facilitated alignment between design, engineering, and
                      accessibility teams on component compliance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Improved workflows for accessibility review and design
                      acceptance
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  AI-Assisted Workflow
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  I used AI throughout this work. ChatGPT and Vertex AI for
                  speeding up documentation, component specs, and prototyping.
                  Also automated quality checks and consistency validation. It's
                  not magic, but it does let you iterate faster and catch more
                  issues.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              05
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Business Outcomes
              </h2>
              <p className="text-gray-400 mt-2">
                How the system improved velocity and quality
              </p>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <p className="text-gray-300 leading-relaxed">
              The design system contributed to improved UX consistency across
              all Dow Jones digital properties, reduced friction in user
              journeys, and delivered measurable gains in how teams work. The
              system enabled scalable cross-platform development and faster
              time-to-market for new features.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    30%
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Productivity Boost
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Streamlined workflows, improved documentation, and reduced
                    design-to-code inconsistency. Teams spend less time
                    reinventing solutions and more time solving user problems.
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    How we got there:
                  </p>
                  <ul className="space-y-1 text-gray-400 text-sm">
                    <li>
                      • Better Storybook organization makes component discovery
                      faster
                    </li>
                    <li>
                      • Token automation eliminates manual sync between design
                      and code
                    </li>
                    <li>
                      • Clear contribution guidelines reduce back-and-forth in
                      reviews
                    </li>
                  </ul>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="p-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    20%
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Complexity Reduction
                  </h3>

                  <p className="text-gray-300 text-sm mb-4">
                    Repository reorganization and architectural simplification
                    made the system easier to maintain and extend. Simpler code
                    means fewer bugs and faster onboarding.
                  </p>

                  <p className="text-gray-400 text-sm mb-2">What changed:</p>
                  <ul className="space-y-1 text-gray-400 text-sm">
                    <li>• Consolidated redundant components</li>
                    <li>• Clearer component hierarchy in Storybook</li>
                    <li>
                      • Platform-agnostic tokens reduced platform-specific code
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </div>

            <GlassCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  WCAG 2.2 Compliance Across All Brands
                </h3>
                <p className="text-gray-300 text-sm">
                  Accessibility isn't a feature. It's a requirement. Every
                  component meets EU and U.S. compliance standards, validated
                  through automated testing and manual review. This benefits all
                  users, not just those with disabilities.
                </p>
              </div>
            </GlassCard>
          </div>
          {/* IMAGE 5: Multi-platform, multi-brand scale */}
          <div className="mt-8 rounded-lg overflow-hidden">
            <img
              src={getImagePath("images/projects/brand-ds.png")}
              alt="Design system deployed across WSJ, Barron's, Factiva, and MarketWatch on multiple devices"
              className="w-full"
            />
            <p className="text-sm text-gray-400 mt-3 text-center">
              The system in production across B2B & B2C brands and 3 platforms
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to see more work?
              </h2>
              <p className="text-[#cbd5e1] mb-8 max-w-2xl mx-auto">
                This is just one example of how I lead cross-functional teams to
                deliver measurable business impact through strategic design and
                technical leadership.
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
    </div>
  );
}
