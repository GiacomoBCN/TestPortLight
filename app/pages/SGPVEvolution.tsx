"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  AlertCircle,
  User,
  TrendingUp,
  Smartphone,
  Layers,
  Users,
  Target,
  Zap,
  Camera,
  Sparkles,
  GitBranch,
  CheckCircle,
  X,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import ImageTextCard from "../components/casestudy/ImageTextCard";
import { getImagePath } from "@/utils/image";

export default function SGPVEvolution() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<
    { src: string; alt: string }[]
  >([]);

  const openImageModal = (src: string) => {
    setModalImageSrc(src);
    setIsImageModalOpen(true);
  };

  const openGallery = (
    images: { src: string; alt: string }[],
    startIndex: number = 0
  ) => {
    setGalleryImages(images);
    setCurrentImageIndex(startIndex);
    setModalImageSrc(images[startIndex].src);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageSrc("");
    setGalleryImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (galleryImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % galleryImages.length;
      setCurrentImageIndex(nextIndex);
      setModalImageSrc(galleryImages[nextIndex].src);
    }
  };

  const previousImage = () => {
    if (galleryImages.length > 0) {
      const prevIndex =
        (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      setCurrentImageIndex(prevIndex);
      setModalImageSrc(galleryImages[prevIndex].src);
    }
  };

  const keyDecisions = [
    {
      point: "Platform Strategy",
      options: ["Keep per-client forks", "Native rewrites", "Unify on Flutter"],
      rationale:
        "We evaluated React Native, Ionic, and Flutter. React Native had the larger ecosystem, but Flutter's coherent widget model, fast rendering, and shorter learning curve fit our design system goals and team capacity. One shared codebase would serve all 15 clients with native-level performance.",
      impact: "Unified codebase, lower latency, faster delivery",
    },
    {
      point: "Customization Governance",
      options: ["Maintain forks", "Hardcoded flags", "Theming and config"],
      rationale:
        "We replaced per-client forks with a configuration and theming system. Branding and workflows stayed flexible while updates remained centralized.",
      impact: "80% deployment efficiency, fewer regressions",
    },
    {
      point: "Migration Rollout Strategy",
      options: [
        "Free migration for all",
        "Individual opt-in pilots",
        "Paid staged adoption",
      ],
      rationale:
        "Each client ran its own instance, so migration required a new commercial agreement. We started with early adopters who funded the move, used their feedback to refine training and rollout, then scaled to others.",
      impact: "Self-financed path, validated ROI, repeatable rollout",
    },
    {
      point: "UX Research Approach",
      options: [
        "Heuristics only",
        "One-off user testing",
        "Continuous research operations",
      ],
      rationale:
        "We combined contextual inquiry, interviews, and iterative usability tests to shape information architecture, responsive patterns, and the AI photo-capture workflow.",
      impact: "25% task time reduction, 30% higher satisfaction",
    },
  ];

  const achievements = [
    {
      icon: Smartphone,
      metric: "−20%",
      label: "Hardware Cost",
      description: "Mobile-first eliminated tablet dependency [Phase01]",
    },
    {
      icon: Layers,
      metric: "+80%",
      label: "Dev Efficiency",
      description: "Centralized styling streamlined releases [Phase01]",
    },
    {
      icon: Target,
      metric: "15",
      label: "FMCG Clients",
      description:
        "Unified app with per-client branding and consistent UX [Phase01]",
    },

    {
      icon: Zap,
      metric: "−25%",
      label: "Task Time",
      description: "AI image recognition & optimized workflows [Phase02]",
    },
    {
      icon: CheckCircle,
      metric: "+30%",
      label: "Satisfaction",
      description: "Performance + usability improvements [Phase02]",
    },
    {
      icon: Users,
      metric: "25+",
      label: "Research Sessions",
      description:
        "Interviews, contextual inquiry, and usability testing across client teams [Phase02]",
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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            Home &gt; Product Work &gt; SGPV Product Evolution
          </p>

          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-blue-400">
              MULTI-CLIENT PLATFORM · UX &amp; PRODUCT EVOLUTION
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            SGPV Product Evolution
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            Product Designer &amp; UX Lead
          </p>

          <p className="text-xl text-gray-300 mb-8">
            Led the modernization of a multi-client field app used by 15 FMCG
            brands. Unified fragmented versions into a single responsive
            platform and later migrated to Flutter, introducing AI-based data
            capture.
            <br /> The evolution cut hardware costs by{" "}
            <span className="text-white font-semibold">20%</span>, improved
            deployment efficiency by{" "}
            <span className="text-white font-semibold">80%</span>, and raised
            user satisfaction by{" "}
            <span className="text-white font-semibold">30%</span>.
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "Product Strategy",
              "UX Research",
              "Responsive Design",
              "AI-Driven Workflows",
              "Figma",
              "Flutter",
              "B2B SaaS",
              "Agile / SCRUM",
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
        image={getImagePath("images/projects/sgpv-evo.png")}
        title="From Client Forks to a Unified, Scalable Platform"
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          SGPV is a field operations app used by merchandisers and sales
          representatives from 15 leading FMCG companies, including national and
          international brands across Spain, Portugal, and Italy. These field
          teams visit retail locations to audit shelf placement, negotiate
          product visibility, track promotional compliance, and secure better
          in-store positioning.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Over time, versions 5 and 6 had split into multiple client-specific
          forks to meet unique branding and workflow needs. This fragmentation
          increased maintenance costs and created inconsistent user experiences.
          I led a 18 months effort to modernize and consolidate SGPV while
          maintaining uninterrupted service for all 15 active clients.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Phase 1 introduced a responsive redesign and centralized assets,
          restoring delivery speed and removing the tablet-only limitation.
          <br />
          Phase 2 unified all clients under a single Flutter app and redesigned
          critical workflows such as AI-based photo data capture, which reduced
          task time and improved user satisfaction.
        </p>
      </ProjectIntroCard>
      {/* Overview - 3 COLUMNS */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title="The Challenge">
              <p>
                15 FMCG clients, each with its own branded SGPV version.
                Fragmented code, inconsistent UX, and tablet-only usage slowed
                delivery and increased costs.
              </p>
            </OverviewCard>

            <OverviewCard icon={User} title="My Role">
              <p className="font-semibold mb-2">
                Product Designer · UX Lead · Front-End Developer
              </p>
              <p>Led research, UX strategy, and product consolidation.</p>
              <p>
                Defined responsive patterns, unified assets, and collaborated on
                the Flutter rebuild to enable a single scalable app.
              </p>
            </OverviewCard>

            <OverviewCard icon={GitBranch} title="Scope">
              <ul className="space-y-1">
                <li>• 15 FMCG clients across Spain, Portugal, and Italy</li>
                <li>• Multi-phase product evolution (PhoneGap → Flutter)</li>
                <li>• Research, usability testing, and rollout alignment</li>
                <li>
                  • Unified UI kit, AI-assisted workflows, and faster releases
                </li>
              </ul>
            </OverviewCard>
          </div>
        </div>
      </section>
      {/* Metrics Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Project Impact Snapshot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <GlassCard key={index}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <achievement.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {achievement.metric}
                  </div>
                  <div className="text-sm font-semibold text-blue-400 mb-2">
                    {achievement.label}
                  </div>
                  <div className="text-xs text-gray-400">
                    {achievement.description}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      {/* PHASE 1 */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              01
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Phase 1 (v5→v6): Responsive Redesign
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Context
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  SGPV began as a cross-platform B2B field app for tablets. Over
                  time, client-specific customizations created many divergent
                  versions that were hard to update and maintain. As smartphone
                  adoption grew among field merchandisers, the tablet-only
                  constraint became costly and inconvenient for clients.
                  Approach
                </p>
              </div>
            </GlassCard>

            {/* Heuristic Review Card - Images on LEFT */}
            <ImageTextCard
              title="Approach"
              description="I led the responsive redesign of the app, making it fully usable on both tablets and smartphones. We centralized the CSS, icon system, and shared assets so that updates and fixes could be deployed once and applied across all client builds. This effort unified fifteen client versions without interrupting ongoing operations, laying the technical and visual foundation for future releases."
              bulletPoints={[]}
              images={[
                {
                  src: getImagePath("images/projects/SGPV_V6_Old_New.png"),
                  alt: "Legacy tablet app redesigned into responsive v6 for mobile and tablet.",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            <ImageTextCard
              title="Results"
              description=""
              bulletPoints={[
                {
                  label: "-20 % hardware cost",
                  text: "Clients no longer needed tablets for field teams.",
                },
                {
                  label: "+80% development efficiency",
                  text: "Centralized styling enabled instant rollouts across all clients.",
                },
                {
                  label: "+15% user satisfaction",
                  text: "The responsive interface improved clarity and reduced friction in daily use",
                },
                {
                  label: "25% faster future updates",
                  text: '"Simplified front-end structure accelerated deployment.',
                },
              ]}
              images={[
                {
                  src: getImagePath("images/projects/SGPV_V6_New_Diag.png"),
                  alt: "Diagram summarizing Phase 1 impact: centralized styling enabled scalability, 20 % lower hardware cost, 80 % higher deployment efficiency, and 15 % higher user satisfaction.",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Reflection
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  SGPV began as a cross-platform B2B field app for tablets. Over
                  time, client-specific customizations created many divergent
                  versions that were hard to update and maintain. As smartphone
                  adoption grew among field merchandisers, the tablet-only
                  constraint became costly and inconvenient for clients.
                  Approach
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
      {/* Phase 1 Gallery */}
      <ProjectGallery
        title="P1: Saved 15 Apps · From Legacy to Responsive Design"
        images={[
          {
            src: getImagePath("images/projects/SGPV_V6_New_01.png"),
            alt: "Updated visit flow and simplified mobile UI in v6.",
          },
          {
            src: getImagePath("images/projects/SGPV_V6_New_02.png"),
            alt: "Responsive document library, route map, and dashboard screens.",
          },
          {
            src: getImagePath("images/projects/SGPV_V6_New_03.png"),
            alt: "Route and product management screens with improved hierarchy.",
          },
        ]}
      />

      {/* PHASE 2 - Research */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              02
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Phase 2 (v6→v7): Research & Flutter Migration Strategy
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            <ImageTextCard
              title="Technology Research"
              description={`After Phase 1, we still faced performance bottlenecks on iOS and structural limits in the PhoneGap framework.

                          I led a comparative study of React Native, Ionic, and Flutter to identify a cross-platform solution that could deliver native performance from a single codebase.

                          Although React Native had the larger ecosystem, Flutter's coherent widget architecture, faster rendering engine, and shorter learning curve provided a more scalable foundation for our needs.

                          I mapped all major SGPV v6 components to Flutter's widget library and built prototypes to test parity and performance.

                          This validation proved that Flutter could reduce build complexity and accelerate releases across all client implementations.`}
              bulletPoints={[]}
              images={[
                {
                  src: getImagePath("images/projects/SGPV_Research_01.png"),
                  alt: "Diagram summarizing all the process + output tech reasearch.",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Research Workflow
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  The research program combined desk research with in-context
                  field studies to understand merchandiser workflows and
                  validate design decisions before development.
                </p>

                {/* Desktop Table View - hidden on mobile */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-4 pr-4 text-blue-400 font-semibold">
                          Phase
                        </th>
                        <th className="pb-4 pr-4 text-blue-400 font-semibold">
                          Methods
                        </th>
                        <th className="pb-4 pr-4 text-blue-400 font-semibold">
                          Purpose
                        </th>
                        <th className="pb-4 text-blue-400 font-semibold">
                          Key Outputs
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800">
                        <td className="py-4 pr-4">Discover</td>
                        <td className="py-4 pr-4">
                          Desk research, competitive analysis
                        </td>
                        <td className="py-4 pr-4">
                          Identify technical risks, market baselines, and
                          modernization opportunities
                        </td>
                        <td className="py-4">
                          Landscape scan, risk assessment, success metrics
                        </td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 pr-4">Define</td>
                        <td className="py-4 pr-4">
                          1 contextual inquiry, 10 user interviews
                        </td>
                        <td className="py-4 pr-4">
                          Understand field workflows across client types and
                          identify friction points
                        </td>
                        <td className="py-4">
                          Personas, empathy maps, journey maps, problem
                          statements
                        </td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 pr-4">Design</td>
                        <td className="py-4 pr-4">
                          Wireframes, low mockups, modern UI patterns
                        </td>
                        <td className="py-4 pr-4">
                          Simplify critical paths and prepare flows for
                          AI-powered features
                        </td>
                        <td className="py-4">
                          Interaction models, clickable prototypes
                        </td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 pr-4">Systemize</td>
                        <td className="py-4 pr-4">
                          Figma design system (components, tokens, specs)
                        </td>
                        <td className="py-4 pr-4">
                          Ensure visual and functional consistency across
                          unified app
                        </td>
                        <td className="py-4">
                          Component library, design tokens, usage guidelines
                        </td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 pr-4">Validate</td>
                        <td className="py-4 pr-4">10 usability tests</td>
                        <td className="py-4 pr-4">
                          Verify task time reductions and error rate
                          improvements
                        </td>
                        <td className="py-4">
                          Task completion benchmarks, issue log, refinements
                        </td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 pr-4">Deliver</td>
                        <td className="py-4 pr-4">
                          Flutter development, rollout coordination
                        </td>
                        <td className="py-4 pr-4">
                          Ship performant unified app and manage staged client
                          migration
                        </td>
                        <td className="py-4">
                          Production Flutter app, training materials, rollout
                          plan
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View - visible only on mobile */}
                <div className="lg:hidden space-y-4">
                  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <h4 className="text-white font-semibold text-base mb-4">
                      Discover
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Methods
                        </div>
                        <div className="text-gray-300 text-sm">
                          Desk research, competitive analysis
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Purpose
                        </div>
                        <div className="text-gray-300 text-sm">
                          Identify technical risks, market baselines, and
                          modernization opportunities
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Key Outputs
                        </div>
                        <div className="text-blue-400 text-sm">
                          Landscape scan, risk assessment, success metrics
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <h4 className="text-white font-semibold text-base mb-4">
                      Define
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Methods
                        </div>
                        <div className="text-gray-300 text-sm">
                          1 contextual inquiry, 10 user interviews
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Purpose
                        </div>
                        <div className="text-gray-300 text-sm">
                          Understand field workflows across client types and
                          identify friction points
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Key Outputs
                        </div>
                        <div className="text-blue-400 text-sm">
                          Personas, empathy maps, journey maps, problem
                          statements
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <h4 className="text-white font-semibold text-base mb-4">
                      Design
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Methods
                        </div>
                        <div className="text-gray-300 text-sm">
                          Wireframes, low mockups, modern UI patterns
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Purpose
                        </div>
                        <div className="text-gray-300 text-sm">
                          Simplify critical paths and prepare flows for
                          AI-powered features
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Key Outputs
                        </div>
                        <div className="text-blue-400 text-sm">
                          Interaction models, clickable prototypes
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <h4 className="text-white font-semibold text-base mb-4">
                      Systemize
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Methods
                        </div>
                        <div className="text-gray-300 text-sm">
                          Figma design system (components, tokens, specs)
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Purpose
                        </div>
                        <div className="text-gray-300 text-sm">
                          Ensure visual and functional consistency across
                          unified app
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Key Outputs
                        </div>
                        <div className="text-blue-400 text-sm">
                          Component library, design tokens, usage guidelines
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <h4 className="text-white font-semibold text-base mb-4">
                      Validate
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Methods
                        </div>
                        <div className="text-gray-300 text-sm">
                          10 usability tests
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Purpose
                        </div>
                        <div className="text-gray-300 text-sm">
                          Verify task time reductions and error rate
                          improvements
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Key Outputs
                        </div>
                        <div className="text-blue-400 text-sm">
                          Task completion benchmarks, issue log, refinements
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <h4 className="text-white font-semibold text-base mb-4">
                      Deliver
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Methods
                        </div>
                        <div className="text-gray-300 text-sm">
                          Flutter development, rollout coordination
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Purpose
                        </div>
                        <div className="text-gray-300 text-sm">
                          Ship performant unified app and manage staged client
                          migration
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
                          Key Outputs
                        </div>
                        <div className="text-blue-400 text-sm">
                          Production Flutter app, training materials, rollout
                          plan
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* AI Feature Explanation - NEW SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              03
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                AI-Powered Data Capture
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <ImageTextCard
              title="Transforming Field Data Collection"
              description={`Before migration, merchandisers visiting retail stores had to manually type product codes, shelf data, and promotion details. 
              It was a repetitive, error-prone process that slowed each store visit and reduced data reliability. A single audit could involve dozens of entries, making productivity and consistency difficult to sustain.`}
              bulletPoints={[]}
              images={[
                {
                  src: getImagePath(
                    "images/projects/sgpv_7_AI_flow_to colect_data.png"
                  ),
                  alt: "Flow diagram showing the redesigned AI-powered data capture process in SGPV v7. Users take photos of shelves or products instead of typing. The system extracts data automatically through image recognition, simplifying the field workflow.",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            <ImageTextCard
              title="The AI Solution"
              description={`I designed a new workflow enabling one-tap capture through image recognition. Users simply photograph shelf labels, barcodes, or displays; the AI automatically identifies products, prices, quantities, and placement details — removing the need for manual entry.`}
              bulletPoints={[
                {
                  label: "One-tap capture",
                  text: "Reduced data entry time by 25% through photo-based input",
                },
                {
                  label: "Error reduction",
                  text: "Automated extraction eliminated transcription mistakes",
                },
                {
                  label: "Instant validation",
                  text: "Real-time feedback confirmed successful data capture before leaving the store",
                },
                {
                  label: "Offline reliability",
                  text: '"Images processed locally and synced once online',
                },
              ]}
              images={[
                {
                  src: getImagePath(
                    "images/projects/sgpv_7_AI_Diagram_benefit.png"
                  ),
                  alt: "Diagram showing the impact of migrating to Flutter and adding AI image recognition in SGPV v7. Highlights include performance boost, task time reduced by 25%, and user satisfaction increased by 30%.",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />
          </div>
        </div>
      </section>
      {/* Phase 2 Gallery */}
      <ProjectGallery
        title="P2: From Hybrid to AI-Driven Workflows"
        images={[
          {
            src: getImagePath("images/projects/sgpv_7_01_mobile.png"),
            alt: "3D render of SGPV v7 mobile app screens highlighting redesigned interface and improved visual identity.",
          },
          {
            src: getImagePath("images/projects/sgpv_7_02_mobile.png"),
            alt: "Sequence of mobile screens showing login, confirmation, and performance dashboard in SGPV v7.",
          },
          {
            src: getImagePath(
              "images/projects/sgpv_7_03_tablet_shopdashboard_imgRec.png"
            ),
            alt: "Tablet interface displaying the shop dashboard and AI-based image recognition capture feature in SGPV v7.",
          },
          {
            src: getImagePath("images/projects/sgpv_7_03_tablet_form.png"),
            alt: "Tablet screens showing updated data entry forms and product status interface in SGPV v7.",
          },
        ]}
      />

      {/* Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              04
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

      {/* Business Impact - CONSOLIDATED */}

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              05
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Business Impact & Results
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            <p className="text-gray-300 leading-relaxed">
              The two-phase evolution improved performance, cost efficiency, and
              user satisfaction while establishing a sustainable multi-client
              platform.
            </p>

            {/* Consolidated Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Product Performance
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                      <strong>Unified Flutter codebase:</strong> Reduced latency
                      and improved responsiveness across iOS and Android.
                    </li>
                    <li>
                      <strong>25% faster task completion:</strong> AI-based
                      image recognition removed manual entry and reduced user
                      effort.
                    </li>
                    <li>
                      <strong>30% higher satisfaction:</strong> Field workers
                      reported smoother, faster daily workflows.
                    </li>
                    <li>
                      <strong>Seamless adoption:</strong> Early pilot clients
                      funded the migration, validating ROI before full rollout.
                    </li>
                  </ul>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Operational & Financial Outcomes
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                      <strong>20% lower hardware cost:</strong> Mobile-first
                      design removed the need for tablets.
                    </li>
                    <li>
                      <strong>80% deployment efficiency:</strong> Centralized
                      styling and shared assets simplified updates for 15
                      clients.
                    </li>
                    <li>
                      <strong>Faster delivery cycles:</strong> One-to-many
                      rollout process shortened release time.
                    </li>
                    <li>
                      <strong>Self-financed migration model:</strong>{" "}
                      Demonstrated commercial viability and created a scalable
                      adoption framework.
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </div>

            {/* Long-Term Value */}
            <GlassCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  Long-Term Platform Value
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Beyond short-term metrics, the transformation positioned SGPV
                  as a modern, competitive platform capable of rapid innovation.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>
                      <strong>Scalable growth:</strong> New clients can be
                      onboarded through configuration instead of new code forks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>
                      <strong>AI-ready architecture:</strong> The
                      image-recognition module established a foundation for
                      future machine-learning features.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>
                      <strong>Reduced technical debt:</strong> Legacy hybrid
                      layers were replaced with a sustainable native stack.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>
                      <strong>Competitive differentiation:</strong> Native
                      performance and AI automation positioned SGPV ahead of
                      competing field solutions.
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Key Learnings - EXPANDED */}

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              06
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Key Learnings
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            {/* Optional Intro */}
            <p className="text-gray-300 leading-relaxed mb-6">
              Scaling SGPV taught us that sustainable impact comes from
              structure, empathy, and clarity—not just code.
            </p>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    1. Governance Beats Heroics
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Efficiency came from governance, not heroics. Replacing code
                    forks with a theming and configuration system brought 80%
                    faster rollouts through shared structure and clear
                    ownership.
                  </p>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    2. User Research Drives Executive Buy-In
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Field studies and user videos proved pain points better than
                    any slide deck. Real stories convinced leadership to invest
                    in AI automation and UX upgrades.
                  </p>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    3. Standardization with Client Freedom
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Instead of enforcing uniformity, we moved customization into
                    configuration. Clients kept their identity while the
                    platform stayed unified and maintainable.
                  </p>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    4. Change Management Is Part of Design
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Migrating to Flutter meant retraining 15 client teams.
                    Success came from onboarding tools, training materials, and
                    empathy for field users adapting to new workflows.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to see more work?
              </h2>
              <p className="text-[#cbd5e1] mb-8 max-w-2xl mx-auto">
                This project shows how I lead multi-client product
                evolution—turning research insights and governance into scalable
                design systems.
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
      {/* Image Gallery Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X size={32} />
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
              >
                <ArrowLeft size={32} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
              >
                <ArrowLeft size={32} className="rotate-180" />
              </button>

              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </>
          )}

          <div
            className="flex flex-col items-center max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImageSrc}
              alt="Enlarged view"
              className="max-w-full max-h-[85vh] object-contain"
            />
            {galleryImages.length > 0 && galleryImages[currentImageIndex] && (
              <p className="text-white text-center mt-4 px-8 py-3 bg-black/70 rounded-lg max-w-3xl">
                {galleryImages[currentImageIndex].alt}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
