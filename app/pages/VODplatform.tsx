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
  Monitor,
  Smartphone,
  Tablet,
  Car,
  Eye,
  Zap,
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

export default function VoDPlatform() {
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
      point: "Navigation Architecture",
      options: [
        "Keep 3-axis system",
        "Reduce to 2-axis (vertical + horizontal)",
        "Single axis with deep menus",
      ],
      rationale:
        "Vertical rail for primary sections, horizontal tabs for filtering within each section. This 2-axis model reduced remote clicks by 40% and works across TV, mobile, tablet, and car with the same logic.",
      impact: "40% reduction in interaction steps",
    },
    {
      point: "Landing Experience",
      options: [
        "Keep 'Who's watching?' gate",
        "Direct to homepage",
        "Direct to Continue Watching",
      ],
      rationale:
        "Profile switching happens 10x less than browsing, so I moved it to the utility bar and removed the welcome gate. Users now land directly on Continue Watching",
      impact: "60% faster profile access",
    },
    {
      point: "Accessibility Standards",
      options: [
        "Basic contrast fixes",
        "WCAG AA compliance",
        "WCAG AAA compliance",
      ],
      rationale:
        "WCAG AA gives you solid accessibility without the extreme constraints of AAA. It's critical for TV viewing from 3 meters away - if you can't see the focus indicator from your couch, the interface is broken.",
      impact: "WCAG AA compliant",
    },
    {
      point: "Component System Approach",
      options: [
        "Device-specific designs",
        "Responsive single design",
        "Adaptive box-first grid",
      ],
      rationale:
        "The component grid maintains visual consistency across all platforms while respecting each device's interaction model (D-pad for TV, touch for mobile/car, hybrid for tablet).",
      impact: "Unified design language",
    },
  ];

  const achievements = [
    {
      icon: Zap,
      metric: "40%",
      label: "Interaction Reduction",
      description: "Fewer clicks/taps for common user journeys",
    },
    {
      icon: Eye,
      metric: "60%",
      label: "Faster Profile Switch",
      description: "From ≥10 taps to just 4 taps",
    },
    {
      icon: CheckCircle,
      metric: "WCAG AA",
      label: "Accessibility",
      description: "Contrast ratios & focus states compliant",
    },
    {
      icon: Monitor,
      metric: "4 Devices",
      label: "Multi-Platform",
      description: "TV, mobile, tablet, in-car displays",
    },
  ];

  const interactionImprovements = [
    {
      task: "Switch from Watch → Live TV to Shop → Groceries",
      before: "9 taps",
      after: "6 taps",
      improvement: "–33%",
    },
    {
      task: "Go from landing hero to first row card",
      before: "2 taps",
      after: "1 tap",
      improvement: "–50%",
    },
    {
      task: "Open profile switcher from deep in content",
      before: "≥10 taps",
      after: "4 taps",
      improvement: "–60%",
    },
  ];

  const evaluationImages = [
    {
      src: getImagePath("images/projects/Vod-Old_Home_nav.png"),
      alt: "Original VOD platform interface showing navigation complexity",
    },
    {
      src: getImagePath("images/projects/Vod-Old_Welcom.png"),
      alt: "Original VOD platform welcome screen interface",
    },
  ];

  const heuristicData = {
    title: "Heuristic Review Findings",
    description:
      "I ran a heuristic evaluation to figure out why the interface felt clunky. The issues weren't just visual. The interaction model itself was broken:",
    bulletPoints: [
      {
        label: "Complex interaction flow",
        text: "Users had to navigate through three axes (icon belt, tabs, carousels) just to find content",
      },
      {
        label: "Legibility challenges",
        text: "Light text over artwork failed WCAG contrast standards (under 4.5:1)",
      },
      {
        label: "Weak focus indicators",
        text: "Focus indicators were nearly invisible from 3 meters away (TV viewing distance)",
      },
      {
        label: "Unnecessary friction",
        text: '"Who\'s watching?" welcome screen blocked immediate content access',
      },
    ],
    additionalText:
      'I mapped click-paths for common tasks to quantify the problem. Switching from "Watch > Live TV" to "Shop > Groceries" took 9 button presses on a TV remote. Opening the profile switcher from deep in content took over 10 presses.',
  };

  const accessibilityData = {
    title: "Accessibility Gaps",
    description:
      "The accessibility audit found several WCAG violations. Contrast ratios were too low, focus indicators were nearly invisible, and touch targets were under 44px. These issues hurt everyone, not just users with disabilities. Try watching TV from 3 meters away with weak focus states and you'll see the problem.",
    bulletPoints: [
      {
        label: "Contrast ratios below WCAG AA standards",
        text: "< 4.5:1 for normal text",
      },
      {
        label: "Focus indicators",
        text: "Not meeting 3:1 contrast requirement against adjacent colors",
      },
      {
        label: "Color-only information",
        text: "Without text labels or icons",
      },
      {
        label: "Insufficient touch target sizes",
        text: "For mobile (< 44px)",
      },
    ],
  };

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
            Home &gt; Product Work &gt; VOD Platform Redesign
          </p>
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-blue-400">
              PRODUCT CONSULTING · MULTI-PLATFORM
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            VOD Platform Redesign
          </h1>
          <p className="text-lg text-gray-400 mb-4">
            Product Consultant · Confidential Client (MENA)
          </p>
          <p className="text-xl text-gray-300 mb-8">
            Redesigned a VOD platform for the MENA region. Reduced interaction
            steps by 40% through click-path analysis and brought the experience
            to WCAG AA compliance across TV, mobile, tablet, and in-car
            displays.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Consultant",
              "Heuristic Evaluation",
              "End-to-end UX/UI Process",
              "Figma",
              "Multi-platform Design",
              "UX Strategy",
              "WCAG 2.2 AA",
              "TV/10-foot UI",
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
        image={getImagePath("images/projects/Vod-01.png")}
        title="Evaluating & Redesigning a Multi-Device Streaming Experience"
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          A MENA based client commissioned me to review and redesign the initial
          prototype of their VOD Platform. The platform needed to serve content
          across multiple contexts: traditional TV viewing, mobile on-the-go,
          tablet browsing, and in-car entertainment systems.
        </p>
        <p className="text-gray-300 leading-relaxed">
          My role was to evaluate usability, visual clarity, and interaction
          flow through heuristic review, identify accessibility gaps against
          WCAG standards, and propose a unified home screen concept that could
          scale across all devices while reducing user friction.
        </p>
      </ProjectIntroCard>

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title="The Challenge">
              Complex 3-axis navigation causing user friction. Poor legibility
              with light text over artwork. Weak focus indicators for TV
              viewing. Unnecessary entry gates before content access.
            </OverviewCard>

            <OverviewCard icon={User} title="My Role">
              <p className="font-semibold mb-2">Product Design Consultant</p>
              <ul className="space-y-1">
                <li>• Heuristic evaluation & accessibility audit</li>
                <li>
                  • Cross-platform design strategy (TV, mobile, tablet, car)
                </li>
              </ul>
            </OverviewCard>

            <OverviewCard icon={TrendingUp} title="Impact">
              <ul className="space-y-1">
                <li>• 40% reduction in interaction steps</li>
                <li>• WCAG AA compliant accessibility</li>
                <li>• Unified design language across devices</li>
                <li>• 60% faster profile switching</li>
              </ul>
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* Metrics Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Redesign Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Project Gallery Slider */}
      <ProjectGallery
        title="Design Evolution"
        images={[
          {
            src: getImagePath("images/projects/Vod-1_New _LiveTV.png"),
            alt: "New version of LiveTV page",
          },
          {
            src: getImagePath("images/projects/Vod-2-New_Vod_Page.png"),
            alt: "New version of VOD page",
          },
          {
            src: getImagePath("images/projects/Vod-3- Nwe_Catch-up.png"),
            alt: "New version of Chach-Up pagem",
          },
          {
            src: getImagePath("images/projects/Vod-3_old_new_gamePage.png"),
            alt: "After & Before of Game page",
          },
          {
            src: getImagePath("images/projects/Vod-4_old_new_learnigPage.png"),
            alt: "After & Before of Learning page",
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
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  A MENA based client was building a VOD platform to compete
                  with Netflix and Disney+ in the region. The prototype had a
                  lot of features, but users got lost in a three-layer
                  navigation system (icon belt, tab row, carousels). Light text
                  over images created poor contrast. Focus indicators were too
                  weak for TV viewing from 3 meters away. And the "Who's
                  watching?" welcome screen blocked users from accessing
                  content.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  The MENA streaming market was getting crowded with global
                  players. Users expected Netflix-level usability, but localized
                  for regional preferences. The platform needed to work across
                  TV, mobile, tablet, and in-car displays without feeling
                  fragmented.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Section 2: The Problem & Evaluation */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              02
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The Problem & Evaluation
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            {/* Heuristic Review Card - Images on LEFT */}
            <ImageTextCard
              title={heuristicData.title}
              description={heuristicData.description}
              bulletPoints={heuristicData.bulletPoints}
              images={[
                {
                  src: getImagePath("images/projects/Vod-Old_Home_nav.png"),
                  alt: "Original VOD platform home screen showing the cluttered three-axis navigation layout",
                },
                {
                  src: getImagePath(
                    "images/projects/Vod_Redesing_Nav_Graf_Reason.png"
                  ),
                  alt: "Diagram showing how redesigning VOD navigation improved usability and user experience through simplicity and accessibility.",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText={heuristicData.additionalText}
            />

            {/* Accessibility Card - Images on RIGHT */}
            <ImageTextCard
              title={accessibilityData.title}
              description={accessibilityData.description}
              bulletPoints={accessibilityData.bulletPoints}
              images={[
                {
                  src: getImagePath("images/projects/Vod-Old_Welcom.png"),
                  alt: "Original VOD welcome screen requiring multiple clicks before accessing content",
                },
                {
                  src: getImagePath("images/projects/Vod-Old_ex_a11y.png"),
                  alt: "Example of accessibility issues in the original VOD interface, showing low contrast and poor legibility",
                },
              ]}
              imagePosition="right"
              onOpenGallery={openGallery}
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

      {/* Section 4: The Redesign */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              04
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The Redesign Solution
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
              <div className="p-3">
                <h3 className="text-xl font-semibold text-white mb-3">
                  2-Axis Navigation System
                </h3>

                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Vertical rail stays visible across all screens for
                      wayfinding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Horizontal tabs filter content within each section
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Clear mental model: vertical for "where," horizontal for
                      "what"
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Removed Welcome Screen Friction
                </h3>

                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Instant access to content without gates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Profile switcher in persistent top-right utility bar
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Continue Watching is now the landing page</span>
                  </li>
                </ul>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  WCAG AA Compliance
                </h3>

                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Contrast ratios of 4.5:1+ for all text elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Bold focus states with 3:1+ contrast against backgrounds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Color-blind safe iconography and information architecture
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Touch targets sized at 44x44px minimum for mobile
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Box-First Component Grid
                </h3>

                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Adaptive grid scales from 5" phones to 75" TVs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Platform-specific interaction patterns (D-pad vs touch)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Consistent visual language across all devices</span>
                  </li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Navigation System Deep Dive */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="pl-0 md:pl-24 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Navigation System Deep Dive
            </h3>
            <p className="text-gray-400">
              A detailed comparison of the old 3-axis vs new 2-axis navigation
              system
            </p>
          </div>

          {/* 📸 Side-by-side images */}
          <div className="pl-0 md:pl-24 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-700 shadow-lg">
                  <img
                    src={getImagePath("images/projects/Vod_old_navigation.png")}
                    alt="Old Navigation (3-Axis)"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  🟥 Old Navigation (3-Axis)
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-700 shadow-lg">
                  <img
                    src={getImagePath("images/projects/Vod_New_navigarion.png")}
                    alt="New Navigation (2-Axis)"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  🟦 New Navigation (2-Axis)
                </p>
              </div>
            </div>
          </div>

          {/* 🧭 Comparison Table */}
          <div className="pl-0 md:pl-24">
            {/* Desktop Table View - hidden on mobile */}
            <GlassCard className="hidden lg:block">
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left align-top">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="pb-4 pr-4 text-blue-400 font-semibold w-[18%]">
                        Category
                      </th>
                      <th className="pb-4 pr-4 text-blue-400 font-semibold w-[41%]">
                        🟥 OLD NAVIGATION (3-Axis)
                      </th>
                      <th className="pb-4 pr-4 text-blue-400 font-semibold w-[41%]">
                        🟦 NEW NAVIGATION (2-Axis)
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-4 pr-4 font-semibold">Structure</td>
                      <td className="py-4 pr-4">
                        1️⃣ <strong>Top icon belt</strong> — horizontal row
                        (Home, Games, Learning, Shop…)
                        <br />
                        2️⃣ <strong>Second horizontal tab row</strong> — (Live
                        TV, VOD, Catch-up, TV Guide)
                        <br />
                        3️⃣ <strong>Content rows</strong> — horizontal carousels
                        of shows/movies
                      </td>
                      <td className="py-4 pr-4">
                        1️⃣ <strong>Vertical rail (left)</strong> — primary
                        sections (Watch, Play, Learn, Shop…)
                        <br />
                        2️⃣ <strong>Top horizontal tabs</strong> — filter within
                        the section (Live TV, VOD, Catch-up…)
                      </td>
                    </tr>

                    <tr className="border-b border-gray-800">
                      <td className="py-4 pr-4 font-semibold">Movement</td>
                      <td className="py-4 pr-4">
                        ⬆️⬇️ jump between stacked rows
                        <br />
                        ⬅️➡️ move within each row
                        <br />
                        <span className="text-gray-400">
                          Zig-zag pattern due to two horizontal layers:
                          <br />
                          <em>Up → right → down → right → up → left…</em>
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        ⬆️⬇️ move between main sections (vertical rail)
                        <br />
                        ⬅️➡️ browse tabs or content horizontally
                        <br />
                        <span className="text-gray-400">
                          Planar, predictable; no zig-zag.
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-800">
                      <td className="py-4 pr-4 font-semibold">
                        Focus & Legibility
                      </td>
                      <td className="py-4 pr-4">
                        Weak focus; easy to lose track across layers.
                        <br />
                        Light text over artwork → poor contrast.
                      </td>
                      <td className="py-4 pr-4">
                        Persistent focus halo (+5% scale, Orbit Blue outline).
                        <br />
                        Text on 80% dark scrim → WCAG AA.
                      </td>
                    </tr>

                    <tr className="border-b border-gray-800">
                      <td className="py-4 pr-4 font-semibold">
                        Utility & Feedback
                      </td>
                      <td className="py-4 pr-4">
                        Scattered top-right icons; no micro-interactions.
                      </td>
                      <td className="py-4 pr-4">
                        Right-aligned utility cluster (Search, Grid, AI,
                        Avatar).
                        <br />
                        Gentle bounce/scale + soft click feedback (specified).
                      </td>
                    </tr>

                    <tr>
                      <td className="py-4 pr-4 font-semibold">Outcome</td>
                      <td className="py-4 pr-4">
                        Higher cognitive load; extra remote clicks.
                      </td>
                      <td className="py-4 pr-4">
                        ~40% fewer interaction steps; clearer "where vs what"
                        mental model.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* Mobile Card View - visible only on mobile */}
            <div className="lg:hidden space-y-6">
              {/* Structure Card */}
              <GlassCard>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-4">
                    Structure
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                        🟥 OLD (3-Axis)
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        <p>
                          1️⃣ <strong>Top icon belt</strong> — horizontal row
                          (Home, Games, Learning, Shop…)
                        </p>
                        <p>
                          2️⃣ <strong>Second horizontal tab row</strong> — (Live
                          TV, VOD, Catch-up, TV Guide)
                        </p>
                        <p>
                          3️⃣ <strong>Content rows</strong> — horizontal
                          carousels of shows/movies
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-blue-400 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                        🟦 NEW (2-Axis)
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        <p>
                          1️⃣ <strong>Vertical rail (left)</strong> — primary
                          sections (Watch, Play, Learn, Shop…)
                        </p>
                        <p>
                          2️⃣ <strong>Top horizontal tabs</strong> — filter
                          within the section (Live TV, VOD, Catch-up…)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Movement Card */}
              <GlassCard>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-4">
                    Movement
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        🟥 OLD (3-Axis)
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        <p>⬆️⬇️ jump between stacked rows</p>
                        <p>⬅️➡️ move within each row</p>
                        <p className="text-gray-400 italic">
                          Zig-zag pattern due to two horizontal layers: Up →
                          right → down → right → up → left…
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-blue-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        🟦 NEW (2-Axis)
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        <p>⬆️⬇️ move between main sections (vertical rail)</p>
                        <p>⬅️➡️ browse tabs or content horizontally</p>
                        <p className="text-gray-400">
                          Planar, predictable; no zig-zag.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Focus & Legibility Card */}
              <GlassCard>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-4">
                    Focus & Legibility
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        🟥 OLD (3-Axis)
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        <p>Weak focus; easy to lose track across layers.</p>
                        <p>Light text over artwork → poor contrast.</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-blue-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        🟦 NEW (2-Axis)
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        <p>
                          Persistent focus halo (+5% scale, Orbit Blue outline).
                        </p>
                        <p>Text on 80% dark scrim → WCAG AA.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Utility & Feedback Card */}
              <GlassCard>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-4">
                    Utility & Feedback
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        🟥 OLD (3-Axis)
                      </div>
                      <div className="text-gray-300 text-sm">
                        <p>Scattered top-right icons; no micro-interactions.</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-blue-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        🟦 NEW (2-Axis)
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        <p>
                          Right-aligned utility cluster (Search, Grid, AI,
                          Avatar).
                        </p>
                        <p>
                          Gentle bounce/scale + soft click feedback (specified).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Outcome Card */}
              <GlassCard>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-4">
                    Outcome
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        🟥 OLD (3-Axis)
                      </div>
                      <div className="text-gray-300 text-sm">
                        <p>Higher cognitive load; extra remote clicks.</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-blue-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        🟦 NEW (2-Axis)
                      </div>
                      <div className="text-gray-300 text-sm">
                        <p>
                          ~40% fewer interaction steps; clearer "where vs what"
                          mental model.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Interaction Improvements Table */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              05
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Measured Interaction Improvements
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <GlassCard>
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed mb-6">
                  I mapped click-paths before and after the redesign to measure
                  the improvement in common TV remote tasks.
                </p>

                {/* Desktop Table View - hidden on mobile */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-4 pr-4 text-blue-400 font-semibold">
                          Task (TV Example)
                        </th>
                        <th className="pb-4 pr-4 text-blue-400 font-semibold">
                          Original Prototype
                        </th>
                        <th className="pb-4 pr-4 text-blue-400 font-semibold">
                          Redesigned Flow
                        </th>
                        <th className="pb-4 text-blue-400 font-semibold">
                          Improvement
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      {interactionImprovements.map((item, index) => (
                        <tr key={index} className="border-b border-gray-800">
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

                {/* Mobile Card View - visible only on mobile */}
                <div className="lg:hidden space-y-4">
                  {interactionImprovements.map((item, index) => (
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
                            Original Prototype
                          </div>
                          <div className="text-gray-300 text-sm font-semibold">
                            {item.before}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-white/60 text-xs font-semibold uppercase tracking-wide">
                            Redesigned Flow
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
            <p className="text-gray-300 leading-relaxed">
              This was a consulting engagement focused on evaluation and design
              recommendations. I delivered mid-fidelity Figma mockups across TV,
              mobile, tablet, and in-car contexts, plus click-path analysis
              documentation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Constraints & Trade-offs
                  </h3>

                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>WCAG AA vs AAA:</strong> Chose AA to balance
                        accessibility with design flexibility for TV viewing.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>2-axis vs 1-axis navigation:</strong> Kept
                        horizontal tabs because removing them would require
                        deeper menus and increase click-paths.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>Profile switching location:</strong> Validated
                        top-right placement by showing Netflix and Disney+ use
                        the same pattern.
                      </span>
                    </li>
                  </ul>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Key Learnings
                  </h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>TV design requires different thinking:</strong>{" "}
                        Focus indicators must be bold, text high-contrast, and
                        navigation needs clear vertical/horizontal axes.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>
                          Accessibility improvements benefit everyone:
                        </strong>{" "}
                        Better contrast helped users in bright rooms, stronger
                        focus states improved TV viewing.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>Remove friction before adding features:</strong>{" "}
                        The biggest win came from deleting the welcome screen,
                        not adding functionality.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>Quantify interaction costs:</strong> Mapping
                        click-paths (9 taps → 6 taps = -33%) gave stakeholders
                        concrete proof.
                      </span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* IMAGE 5: Multi-platform, multi-brand scale */}
          <div className="mt-8 rounded-lg overflow-hidden">
            <img
              src={getImagePath("images/projects/Vod-NewGamePage.png")}
              alt="Resesign Game page"
              className="w-full"
            />
            <p className="text-sm text-gray-400 mt-3 text-center">
              Resesign game page
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to see more work?
              </h2>
              <p className="text-[#cbd5e1] mb-8 max-w-2xl mx-auto">
                This is one example of how I evaluate complex products and
                propose solutions that balance user needs with business
                constraints.
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
