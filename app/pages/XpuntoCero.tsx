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
  Layers,
  Users,
  Target,
  GitBranch,
  X,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import ImageTextCard from "../components/casestudy/ImageTextCard";
import { getImagePath } from "@/utils/image";

export default function XpuntoCero() {
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

  // Add near the top with other arrays
  const keyDecisions = [
    {
      point: "Brand Direction",
      options: ["Full rebrand", "Identity refresh", "Keep legacy"],
      rationale:
        "Refreshed typography, colors, and icons while keeping the logo mark to preserve recognition.",
      impact: "Modernized look without disrupting brand equity.",
    },
    {
      point: "Information Architecture & Navigation",
      options: ["Keep old IA", "Light tweaks", "Simplify structure"],
      rationale:
        "Reduced top navigation and clarified labels to match how users browse products.",
      impact: "Simpler flow and faster access to key pages.",
    },
    {
      point: "Visual Language",
      options: ["Stock photos", "Isometric visuals", "Mixed media"],
      rationale:
        "Replaced stock images with custom isometric illustrations for clarity and personality.",
      impact: "Consistent style and quicker content creation.",
    },
    {
      point: "Front-End",
      options: ["Static site", "SPA", "PWA"],
      rationale:
        "Adopted a lightweight PWA with caching and optimized assets for better mobile speed.",
      impact: "Pages load 20% faster and mobile engagement improved.",
    },
    {
      point: "Accessibility",
      options: [
        "Bright warm + white text",
        "Dark text on warm",
        "Overlay contrast",
      ],
      rationale:
        "Adjusted warm colors and added overlays to meet WCAG contrast standards.",
      impact: "Improved readability and visual comfort on mobile.",
    },
    {
      point: "CMS Choice",
      options: ["Custom React", "Headless CMS", "WordPress + Elementor"],
      rationale:
        "Used WordPress with shared components so non-devs could update content easily.",
      impact: "Faster page launches with consistent design.",
    },
  ];

  const achievements = [
    {
      icon: Smartphone,
      metric: "40%",
      label: "Mobile Traffic ↑",
      description: "PWA redesign improved performance & accessibility",
    },
    {
      icon: Target,
      metric: "15%",
      label: "More Leads",
      description: "Streamlined UX increased visitor retention",
    },
    {
      icon: CheckCircle,
      metric: "30%",
      label: "Satisfaction ↑",
      description: "Clearer IA, faster flows, cohesive brand",
    },
    {
      icon: Zap,
      metric: "20%",
      label: "Faster Loads",
      description: "Optimized assets + caching strategy",
    },
    {
      icon: Users,
      metric: "5",
      label: "User Interviews",
      description: "Insights shaped personas & flow fixes",
    },
    {
      icon: Layers,
      metric: "25%",
      label: "Engagement ↑",
      description: "Isometric visuals improved scannability",
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
            Home &gt; Product Work &gt; XpuntoCero Digital Transformation
          </p>

          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-blue-400">
              BRAND TRANSFORMATION · VISUAL DESIGN
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            XpuntoCero Digital Transformation
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            Product Designer &amp; Front-End Developer
          </p>

          <p className="text-xl text-gray-300 mb-8">
            Internal rebrand of a legacy SaaS platform. <br />I led the UX and
            visual redesign and partnered with engineering to ship a fast PWA.
            <br />
            Results:
            <span className="text-white font-semibold"> +40%</span> mobile
            traffic,
            <span className="text-white font-semibold"> +15%</span> qualified
            leads, and
            <span className="text-white font-semibold"> 2×</span> demo requests,
            proving how a refreshed brand and faster UX directly improved
            conversions.
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "Brand Identity",
              "Visual Design",
              "Information Architecture",
              "UX Research",
              "Figma",
              "Front-End",
              "PWA",
              "WordPress / Elementor",
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
        image={getImagePath("images/projects/XP0-old_new.png")}
        title="Revitalizing a SaaS Brand for Growth"
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          XpuntoCero, a B2B SaaS provider specializing in point-of-sale
          solutions for FMCG, Out-of-Home services, and Digital Marketing, had a
          strong product but an outdated brand. After years without a redesign,
          its interfaces no longer reflected the company’s innovation or
          technical depth. <br />
          The image above shows how the new design modernized the experience,
          improving clarity, hierarchy, and visual consistency across key pages.
        </p>

        <p className="text-gray-300 leading-relaxed">
          I led the UX and visual rebrand, connecting research insights with a
          new design language. This included refining the logo, color palette,
          icon system, and overall interface composition, then implementing the
          new front-end on a performant PWA.
        </p>

        <p className="text-gray-300 leading-relaxed">
          The result was a cohesive brand presence that felt faster, clearer,
          and more credible, driving measurable results such as
          <span className="text-white font-semibold"> 2× </span> more demo
          requests and stronger lead conversion.
        </p>
      </ProjectIntroCard>

      {/* Overview - 3 COLUMNS CENTERED */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title="The Challenge">
              XpuntoCero’s brand and platform hadn’t evolved in years. <br />
              The outdated design and weak mobile experience made the company
              appear less innovative, while inconsistent hierarchy and
              typography hurt clarity and user trust during sales demos.
            </OverviewCard>

            <OverviewCard icon={User} title="My Role">
              <p className="font-semibold mb-2">
                Product Designer &amp; Front-End Developer
              </p>
              <ul className="space-y-1">
                <li>• Led UX research and brand redesign strategy</li>
                <li>
                  • Defined new information architecture and visual system
                </li>
                <li>
                  • Designed isometric illustrations and refined logo system
                </li>
                <li>• Implemented PWA front-end with WordPress integration</li>
              </ul>
            </OverviewCard>

            <OverviewCard icon={GitBranch} title="Scope">
              <ul className="space-y-1">
                <li>• Internal product rebrand across 8 SaaS solutions</li>
                <li>• UX/UI modernization for web and mobile</li>
                <li>• Logo and visual identity refresh</li>
                <li>• PWA implementation and performance optimization</li>
              </ul>
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* Project Impact */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Project Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">+40%</div>
                <div className="text-sm font-semibold text-blue-400 mb-2">
                  Mobile Traffic
                </div>
                <div className="text-xs text-gray-400">
                  The new responsive PWA improved load speed and mobile
                  usability.
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">+15%</div>
                <div className="text-sm font-semibold text-blue-400 mb-2">
                  Qualified Leads
                </div>
                <div className="text-xs text-gray-400">
                  Clearer messaging and visual hierarchy improved visitor
                  retention.
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">2×</div>
                <div className="text-sm font-semibold text-blue-400 mb-2">
                  Demo Requests
                </div>
                <div className="text-xs text-gray-400">
                  The refreshed brand and faster flows doubled demo interest.
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <ProjectGallery
        title="Design Evolution"
        images={[
          {
            src: getImagePath("images/projects/XP0_Home_OldVsNew.png"),
            alt: "Home Before & After - Website Transformation",
          },
          {
            src: getImagePath("images/projects/XP0_CorePageProd_OldVsNew.png"),
            alt: "Product page Before & After - Website Transformation",
          },
          {
            src: getImagePath("images/projects/XP0_ProductCards_OldVsNew.png"),
            alt: "Product cards Before & After - Website Transformation",
          },
          {
            src: getImagePath("images/projects/XP0_Pwa.png"),
            alt: "Progressive web App",
          },
        ]}
      />

      {/* 01 Business Context */}
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
              <div className="p-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  XpuntoCero is a B2B SaaS company providing point-of-sale and
                  marketing platforms for clients in the FMCG and Out-of-Home
                  sectors. The company also develops{" "}
                  <span className="text-white font-semibold">SGPV</span>, a
                  field operations app used by merchandisers from major consumer
                  brands across Southern Europe. After more than a decade
                  without a redesign, XpuntoCero’s visual identity no longer
                  reflected the quality or innovation of its technology.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  Over time, the brand began to feel dated. The old website was
                  slow on mobile and visually inconsistent, making it harder to
                  communicate the company’s value and innovation. Competing
                  startups looked fresher and more user-friendly, which made
                  XpuntoCero appear less dynamic than it actually was.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  The company needed to refresh its brand and user experience to
                  regain credibility, improve mobile performance, and clearly
                  communicate the value of its multi-product ecosystem to
                  enterprise buyers.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 02 Research & Design Approach */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              02
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Research & Design Approach
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* Discovery */}
            <ImageTextCard
              title="Discovery"
              description="I began with a competitive and heuristic review of similar B2B SaaS platforms to identify visual and structural patterns that conveyed innovation and trust. Five quick interviews with existing clients and internal stakeholders helped uncover perception gaps and usability issues, especially on mobile."
              bulletPoints={[
                {
                  label: "5 Interviews",
                  text: "Gathered qualitative feedback on brand perception and usability.",
                },
                {
                  label: "Heuristic Review",
                  text: "Benchmarked layout, tone, and accessibility of modern SaaS interfaces.",
                },
                {
                  label: "Key Finding",
                  text: "Outdated visuals and slow mobile performance reduced credibility.",
                },
              ]}
              images={[
                {
                  src: getImagePath(
                    "images/projects/XP0-SaaS_Platform_Analysis.png"
                  ),
                  alt: "Brand perception map positioning XpuntoCero as reliable but outdated in the SaaS landscape.",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            {/* Key Insights */}
            <ImageTextCard
              title="Key Insights"
              description="Analysis of interviews and tests revealed that users trusted the platform’s reliability but found the interface dated and inconsistent. Navigation labels were unclear, and the visual tone didn’t match the company’s innovative positioning."
              bulletPoints={[
                {
                  label: "Users wanted",
                  text: "Simpler menus and a clearer hierarchy of features.",
                },
                {
                  label: "Mobile first",
                  text: "Most usage happened on smartphones, yet the UI was not optimized.",
                },
                {
                  label: "Visual mismatch",
                  text: "The brand looked older than the technology behind it.",
                },
              ]}
              images={[
                {
                  src: getImagePath(
                    "images/projects/XP0-ux_Issues_Stem_from_Deeper_Problems..png"
                  ),
                  alt: "Iceberg diagram showing how surface usability issues stemmed from deeper UX and information architecture problems.",
                },
              ]}
              imagePosition="right"
              onOpenGallery={openGallery}
              additionalText=""
            />

            {/* Design Direction */}
            <ImageTextCard
              title="Design Direction"
              description="These insights informed a new design language based on simplicity, trust, and coherence. I refreshed the color palette, introduced a modular layout system, and tested early prototypes internally to ensure clarity on both desktop and mobile."
              bulletPoints={[
                {
                  label: "Color palette",
                  text: "Cooler blues and neutral grays to convey trust and precision.",
                },
                {
                  label: "Typography",
                  text: "Modern sans-serif fonts improving legibility and hierarchy.",
                },
                {
                  label: "Prototyping",
                  text: "Interactive Figma flows validated early navigation and layout choices.",
                },
              ]}
              images={[
                {
                  src: getImagePath("images/projects/XP0-ux_laptop_mobile.png"),
                  alt: "Responsive redesign preview of XpuntoCero’s platform on laptop and smartphone screens.",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />
          </div>
        </div>
      </section>

      {/* 03 Key Design Decisions & Trade-offs */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              03
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Key Design Decisions & Trade-offs
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={keyDecisions} />
          </div>
        </div>
      </section>

      {/* 04 Visual & Brand Identity */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              04
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Visual & Brand Identity
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* Visual kit */}
            <ImageTextCard
              title="Visual Kit & Brand Personality"
              description="The brand identity needed to feel bold, modern, and instantly recognizable. I anchored the design on strong color blocking and clear typography to give the interface a tech-forward character. The visual language communicates confidence and accessibility, while the bright coral CTAs make interaction effortless."
              bulletPoints={[
                {
                  label: "Anchor Colors",
                  text: "Turquoise #5DD9D2 and Coral #FF5757, supported by neutral grays.",
                },
                {
                  label: "Logo Redesign",
                  text: "Simplified, memorable mark that reflects the platform’s technical precision.",
                },
                {
                  label: "Contrast Rules",
                  text: "Dark text on warm backgrounds, subtle overlays for accessibility.",
                },
                {
                  label: "Typography",
                  text: "Clean sans-serif type with clear hierarchy for mobile readability.",
                },

                {
                  label: "Icon Library (SVG)",
                  text: "Functional icons guiding users through key features across products.",
                },
              ]}
              images={[
                {
                  src: getImagePath(
                    "images/projects/XP0-logo-colors-icons.png"
                  ),
                  alt: "XpuntoCero Logo old vs, anchor colors, and core products icons/logos",
                },
              ]}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText="The result was a strong, memorable, and modern identity that balanced energy with clarity, exactly what a tech brand needs to stand out without overwhelming users."
            />

            {/* Isometric Product Illustrations */}
            <ImageTextCard
              title="Isometric Product Illustrations"
              description="To make the product self-explanatory, I created a full set of custom isometric illustrations. Each one visualizes how XpuntoCero’s SaaS tools connect digital dashboards with real-world retail activity. The goal was for users to grasp the product’s purpose instantly, even before reading any text."
              bulletPoints={[
                {
                  label: "Storytelling",
                  text: "Illustrations show data flow from mobile to in-store operations.",
                },
                {
                  label: "Differentiation",
                  text: "Custom visuals replaced generic SaaS stock imagery.",
                },
                {
                  label: "Clarity",
                  text: "Users could understand each product’s function at a glance.",
                },
              ]}
              images={[
                {
                  src: getImagePath(
                    "images/projects/XP0-Custom_isometric_illustration.png"
                  ),
                  alt: "Custom isometric illustration showing mobile, tablet, and retail environments linked through XpuntoCero’s Saas solution.",
                },
              ]}
              imagePosition="right"
              onOpenGallery={openGallery}
              additionalText="The brand relied on visual storytelling rather than lengthy explanations, making complex tools feel approachable and clear."
            />
          </div>
        </div>
      </section>

      {/* 05 Outcomes & Business Impact */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-blue-400 opacity-20">
              05
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Outcomes & Business Impact
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* Intro */}
            <GlassCard>
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed">
                  The redesign improved acquisition, engagement, and mobile
                  performance while giving XpuntoCero a recognizable, modern
                  identity that restored credibility as a SaaS provider.
                </p>
              </div>
            </GlassCard>

            {/* Grid: Lead Gen + UX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lead Generation & Marketing */}
              <GlassCard>
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Lead Generation & Marketing
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Clearer messaging and improved visual hierarchy increased
                    qualified leads by
                    <span className="text-white font-semibold"> +15%</span> and
                    doubled demo interest.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-1">
                        +15%
                      </div>
                      <div className="text-sm font-semibold text-blue-400">
                        Qualified Leads
                      </div>
                      <div className="text-xs text-gray-400">
                        Clearer messaging and better hierarchy improved
                        retention.
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-1">
                        2×
                      </div>
                      <div className="text-sm font-semibold text-blue-400">
                        Demo Requests
                      </div>
                      <div className="text-xs text-gray-400">
                        The refreshed brand and faster flows doubled demo
                        interest.
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* UX & Performance */}
              <GlassCard>
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    UX & Performance
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    PWA architecture boosted mobile traffic by
                    <span className="text-white font-semibold"> 40%</span> and
                    reduced load times by
                    <span className="text-white font-semibold"> 20%</span>.
                    Users experienced smoother navigation and a more consistent
                    brand across devices.
                  </p>

                  <ul className="text-gray-400 text-sm space-y-1 pt-2">
                    <li>• +40% mobile traffic</li>
                    <li>• 20% faster loads</li>
                    <li>• Higher satisfaction and engagement</li>
                  </ul>
                </div>
              </GlassCard>
            </div>

            {/* Key Learnings */}
            <GlassCard>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  Key Learnings
                </h3>
                <ul className="text-gray-300 text-sm space-y-2 leading-relaxed">
                  <li>
                    → <strong>Brand perception shapes B2B trust:</strong>{" "}
                    enterprise buyers judge credibility visually before
                    exploring features.
                  </li>
                  <li>
                    → <strong>Mobile speed matters:</strong> even B2B
                    decision-makers browse on mobile; quick, accessible sites
                    retain attention.
                  </li>
                  <li>
                    →{" "}
                    <strong>Visual storytelling simplifies complexity:</strong>{" "}
                    custom isometric illustrations helped users grasp
                    multi-product offerings instantly.
                  </li>
                  <li>
                    → <strong>Early validation saves time:</strong> quick
                    usability tests caught navigation issues before rollout.
                  </li>
                </ul>
              </div>
            </GlassCard>
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
