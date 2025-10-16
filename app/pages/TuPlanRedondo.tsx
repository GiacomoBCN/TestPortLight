"use client";
import React, { useState } from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  AlertCircle,
  User,
  TrendingUp,
  Calendar,
  Smartphone,
  Zap,
  CheckCircle,
  BarChart3,
  Users,
  Database,
  GitBranch,
  CircleDollarSign,
  SmilePlus,
  X,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import ImageTextCard from "../components/casestudy/ImageTextCard";

import { getImagePath } from "@/utils/image";

export default function TuPlanRedondo() {
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
      point: "Technology Choice",
      options: ["Native app", "Hybrid", "Progressive Web App (PWA)"],
      rationale:
        "The client asked for a native app. After assessing devices, budget, and rollout constraints, I proposed a PWA: no installs, works on any browser, faster to ship.",
      impact:
        "Delivery costs ↓ 45%; instant access on tablets, phones, laptops",
    },
    {
      point: "Connectivity Strategy",
      options: ["Offline-first", "Basic caching", "Online real-time"],
      rationale:
        "Restaurants had stable Wi-Fi. Offline would add complexity without clear value, so I optimized for fast loads and real-time submission.",
      impact: "Simpler maintenance; reliable performance; shorter timeline",
    },
    {
      point: "Interface Scope",
      options: [
        "Complex evaluation suite",
        "Feature creep",
        "Focused forms + dashboard",
      ],
      rationale:
        "Kept the MVP tight: streamlined forms, role-based access, and a simple live dashboard for managers.",
      impact: "30% less manual work; quicker adoption; easier training",
    },
  ];

  const achievements = [
    {
      icon: Zap,
      metric: "30%",
      label: "Time Savings",
      description: "Reduced manual evaluation time",
    },
    {
      icon: CheckCircle,
      metric: "25%",
      label: "Satisfaction ↑",
      description: "Improved evaluator experience",
    },
    {
      icon: Database,
      metric: "30%",
      label: "Cost Reduction",
      description: "PWA vs native app development",
    },
    {
      icon: BarChart3,
      metric: "Real-time",
      label: "Analytics",
      description: "Instant performance insights",
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
            Home &gt; Product Work &gt; TuPlanRedondo PWA
          </p>

          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-blue-400">
              FULL-STACK DESIGN · RESEARCH → DESIGN → BUILD
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            TuPlanRedondo PWA
          </h1>

          <p className="text-lg text-gray-400 mb-4">Full-Stack Designer</p>

          <p className="text-xl text-gray-300 mb-8">
            I designed and built a Progressive Web App that replaced a
            paper-based employee evaluation process across multiple McDonald’s
            restaurants. <br />
            The new system reduced manual work by{" "}
            <span className="text-white font-semibold">30%</span>
            and cut delivery costs by{" "}
            <span className="text-white font-semibold">45%</span>.
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "User Research",
              "UI/UX Design",
              "Visual Design",
              "Front-End Development",
              "PWA",
              "Bootstrap",
              "JavaScript",
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
      {/* End Hero */}

      {/* Intro Card */}
      <ProjectIntroCard
        image={getImagePath("images/projects/mc-1.png")}
        title="Digitizing Employee Evaluations for a McDonald’s Franchise"
      >
        <p className="text-gray-300 leading-relaxed">
          A McDonald’s franchise needed to replace its manual evaluation forms
          with a centralized digital solution. While working at
        </p>

        <p className="text-gray-300 leading-relaxed">
          While working at XpuntoCero, I led the project from user research to
          interface design and front-end development, delivering a lightweight
          Progressive Web App (PWA) that runs on any device without
          installation.
        </p>

        <p className="text-gray-300 leading-relaxed">
          The app streamlined how supervisors evaluated team performance, synced
          results in real time, and gave management a live dashboard to track
          data across locations — all at a fraction of the cost of a native app.
        </p>
      </ProjectIntroCard>

      {/* Overview - 3 COLUMNS */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title="The Challenge">
              Manual, paper-based evaluations across the franchise’s restaurants
              slowed daily operations and often led to data errors.
              <br /> The client needed a simple digital solution that worked on
              any device.
            </OverviewCard>

            <OverviewCard icon={User} title="My Role">
              <p className="font-semibold mb-2">
                Product Designer &amp; Front-End Developer
              </p>
              <ul className="space-y-1">
                <li>
                  • Led user interviews, affinity mapping, and usability testing
                </li>
                <li>• Designed all wireframes, mockups, and icons in Figma</li>
                <li>
                  • Built the PWA front-end for tablets, laptops, and
                  smartphones
                </li>
                <li>
                  • Delivered a cost-effective digital solution that cut
                  delivery costs by 45%
                </li>
              </ul>
            </OverviewCard>

            <OverviewCard icon={GitBranch} title="Scope">
              <ul className="space-y-1">
                <li>• End-to-end research → design → development</li>
                <li>• Evaluation forms, dashboard, and secure login</li>
                <li>
                  • Cross-device PWA built with HTML5, CSS3, Bootstrap, JS
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
            Project Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">30%</div>
                <div className="text-sm font-semibold text-blue-400 mb-2">
                  Faster Evaluations
                </div>
                <div className="text-xs text-gray-400">
                  Streamlined digital workflow replaced manual paper forms.
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <SmilePlus className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">25%</div>
                <div className="text-sm font-semibold text-blue-400 mb-2">
                  Higher Satisfaction
                </div>
                <div className="text-xs text-gray-400">
                  Evaluators found the PWA faster, simpler, and easier to
                  access.
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <CircleDollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">45%</div>
                <div className="text-sm font-semibold text-blue-400 mb-2">
                  Lower Dev Cost
                </div>
                <div className="text-xs text-gray-400">
                  PWA approach avoided native builds for iOS and Android.
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  Real-time
                </div>
                <div className="text-sm font-semibold text-blue-400 mb-2">
                  Insights
                </div>
                <div className="text-xs text-gray-400">
                  Live dashboards connected managers to instant performance
                  data.
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <ProjectGallery
        title="Design & Development"
        images={[
          {
            src: getImagePath("images/projects/mc-2.png"),
            alt: "Different profiles of the PWA",
          },
          {
            src: getImagePath("images/projects/mc-3.png"),
            alt: "Mobile first design",
          },
          {
            src: getImagePath("images/projects/mc-4.png"),
            alt: "Different screens of the PWA",
          },
        ]}
      />

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
                  The McDonald’s franchise approached requesting a mobile
                  application to digitalize employee evaluations and track
                  performance across its restaurants. The existing process
                  relied on printed forms and manual data entry, which made
                  reporting slow, fragmented, and prone to errors.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Managers wanted a simple tool to collect evaluations, review
                  results, and monitor staff performance more efficiently. The
                  priority was to eliminate paperwork and centralize all data in
                  a single digital system accessible during daily operations in
                  each restaurant.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  They initially asked for a native app, but after mapping their
                  environment, we realized a PWA would solve the same problem
                  faster, cheaper, and without app-store friction.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 02: Research & Definition */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              02
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Research & Definition
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* --- User Research Process --- */}

            <ImageTextCard
              title="  User Research Processs"
              description="I conducted comprehensive research to understand both evaluator workflows and management reporting needs, combining qualitative interviews with iterative usability testing."
              bulletPoints={[
                {
                  label: "Desk research",
                  text: "Analyzed existing paper forms and spreadsheet workflows.",
                },
                {
                  label: "5 user interviews",
                  text: "Field administrator/crew/supervisors to understand pain points.",
                },
                {
                  label: "Affinity mapping",
                  text: "Synthesized insights into themes around efficiency, accuracy, and reporting.",
                },
                {
                  label: "Personas",
                  text: "Developed profiles for field administrator/crew/supervisors.",
                },
                {
                  label: "Journey mapping",
                  text: "Documented end-to-end evaluation and reporting workflows.",
                },
                {
                  label: "10 usability tests",
                  text: "Iterative testing validated design decisions and interaction patterns.",
                },
              ]}
              images={[
                {
                  src: getImagePath(
                    "images/projects/mc-userflowEvol_Difprofiles.png"
                  ),
                  alt: "User flow boards showing administrator/restaurant manager/supervisors/crew paths",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            {/* --- Key Findings --- */}

            <ImageTextCard
              title="Key Findings"
              description="Research revealed critical pain points that shaped the product requirements and guided the design approach."
              bulletPoints={[
                {
                  label: "Time waste",
                  text: "Selects restaurants, reviews reports, manages global data.",
                },
                {
                  label: "Transcription errors",
                  text: "Manual data entry from paper to spreadsheets introduced mistakes.",
                },
                {
                  label: "Delayed insights",
                  text: "Weeks passed before management could see performance trends.",
                },
                {
                  label: "App friction",
                  text: "Users strongly resisted downloading apps due to privacy concern.",
                },

                {
                  label: "Connectivity",
                  text: "no iusse with Connectivity",
                },
                {
                  label: "User types",
                  text: "Administrator, restaurant manager, supervisor and crew members under one streamlined workflow.",
                },
              ]}
              images={[
                {
                  src: getImagePath("images/projects/mc-painPoints.png"),
                  alt: "Pain points in product development",
                },
              ]}
              imagePosition="right"
              onOpenGallery={openGallery}
              additionalText=""
            />
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

      {/* =========================
      04 · DESIGN & IMPLEMENTATION[])
      ========================= */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              04
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Design & Implementation
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* 1) Brand-Aligned Visual Design */}
            <ImageTextCard
              title="Brand-Aligned Visual Design"
              description="Created all icons and visual elements to align with McDonald’s brand guidelines while maintaining clarity and usability. The design balances brand recognition with functional requirements."
              bulletPoints={[
                {
                  label: "Employee selection",
                  text: "Avatar-based visual identification",
                },
                {
                  label: "Quick-tap input",
                  text: "Approval/rejection for criteria like food safety, cleanliness, and appearance",
                },
                {
                  label: "Color coding",
                  text: "McDonald’s brand colors (green = approved, red = needs improvement) for instant recognition",
                },
                {
                  label: "Autosave",
                  text: "Prevents data loss if evaluators are interrupted",
                },
              ]}
              images={[
                // replace with your real screenshots
                {
                  src: getImagePath(
                    "images/projects/mc-iconsVisualElements.png"
                  ),
                  alt: "Brand-aligned components and icons",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            {/* 2) Streamlined Evaluation Interface */}
            <ImageTextCard
              title="Streamlined Evaluation Interface"
              description="Designed evaluation forms to match the mental model of paper workflows while leveraging digital affordances. Visual indicators (thumbs up/down, color coding) enable fast data entry during observations."
              bulletPoints={[
                {
                  label: "Employee selection",
                  text: "Avatar-based visual identification",
                },
                {
                  label: "Quick-tap input",
                  text: "Approval/rejection for criteria like food safety, cleanliness, and appearance",
                },
                {
                  label: "Color coding",
                  text: "McDonald’s brand colors (green = approved, red = needs improvement) for instant recognition",
                },
                {
                  label: "Autosave",
                  text: "Prevents data loss if evaluators are interrupted",
                },
              ]}
              images={[
                // replace with your real screenshots
                {
                  src: getImagePath(
                    "images/projects/mc-userflowEvol-restaurantManager.png"
                  ),
                  alt: "Mockup of evaluation flow of general restaurant manager",
                },
              ]}
              imagePosition="right"
              onOpenGallery={openGallery}
              additionalText=""
            />

            {/* 3) Performance Evaluation */}
            <ImageTextCard
              title="Performance Evaluation"
              description="Managers select a worker and score core McDonald’s service metrics with quick taps. Visual fries icons make scoring unambiguous during fast service."
              bulletPoints={[
                {
                  label: "Core metrics",
                  text: "CLS (Quality | Service | Cleanliness) · Attitude · Appearance",
                },
                {
                  label: "Fast input",
                  text: "Green/red fries icons for quick, intuitive scoring",
                },
                {
                  label: "Autosave",
                  text: "No data loss if an evaluation is interrupted",
                },
              ]}
              images={[
                // replace with your real screenshots
                {
                  src: getImagePath(
                    "images/projects/mc-PerformanceEvaluation.png"
                  ),
                  alt: "PWA screenshoot of pervormance evaluation page",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
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
              The PWA delivered measurable improvements in efficiency, cost, and
              user satisfaction while establishing a scalable foundation for
              future franchise operations tools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Operational Efficiency & User Experience
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                      <strong>30% time savings:</strong> Evaluations that took
                      30-40 minutes now complete in 20-25 minutes.
                    </li>
                    <li>
                      <strong>Eliminated data entry:</strong> Zero manual
                      transcription from paper to spreadsheets.
                    </li>
                    <li>
                      <strong>25% satisfaction increase:</strong> managers
                      praised simplicity and speed.
                    </li>
                  </ul>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Cost
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                      <strong>45% cost reduction:</strong> PWA development
                      cheaper than native iOS + Android apps.
                    </li>
                    <li>
                      <strong>Cross-device compatibility:</strong> Single
                      codebase works on tablets, phones, and laptops.
                    </li>
                    <li>
                      <strong>Zero update friction:</strong> Directly ralise, no
                      app store approval delays.
                    </li>

                    <li>
                      <strong>Zero installation friction:</strong> Users access
                      via browser or they cand add to Home screen without app
                      store, without use the device memory.
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to see more work?
              </h2>
              <p className="text-[#cbd5e1] mb-8 max-w-2xl mx-auto">
                This project demonstrates how research-driven design, cohesive
                branding, and performant technical implementation create
                measurable business impact.
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
