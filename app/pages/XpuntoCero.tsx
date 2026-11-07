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
} from "lucide-react";
import Lightbox from "../components/Lightbox";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import ImageTextCard from "../components/casestudy/ImageTextCard";
import { getImagePath } from "@/utils/image";
import CopyEmailLink from "@/app/components/CopyEmailLink";
import RichText from "@/app/components/RichText";
import { xpuntoCero } from "@/content/xpuntocero";
import SectionNumber from "../components/casestudy/SectionNumber";

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
  const keyDecisions = xpuntoCero.keyDecisions.decisions;

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
      <div className="fixed top-24 left-6 z-40" style={{ left: "calc(var(--band) + 1.5rem)" }}>
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 hover:text-ink-900 hover:border-blue transition-all"
        >
          <ArrowLeft size={20} />
          <span className="sr-only md:not-sr-only">{xpuntoCero.backLink}</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            {xpuntoCero.hero.breadcrumb}
          </p>

          <div className="mb-4">
            <span className="label-tag text-xs">
              {xpuntoCero.hero.category}
            </span>
          </div>

          <h1 className="type-page-title text-ink-900 mb-4">
            {xpuntoCero.hero.title}
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            {xpuntoCero.hero.subtitle}
          </p>

          <p className="text-xl text-gray-300 mb-8">
            <RichText text={xpuntoCero.hero.description} boldClassName="text-ink-900 font-semibold" />
          </p>

          <div className="flex flex-wrap gap-2">
            {xpuntoCero.hero.tags.map((tag, i) => (
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
        image={getImagePath(xpuntoCero.intro.image)}
        title={xpuntoCero.intro.title}
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          <RichText text={xpuntoCero.intro.paragraphs[0]} />
        </p>

        <p className="text-gray-300 leading-relaxed">
          <RichText text={xpuntoCero.intro.paragraphs[1]} />
        </p>

        <p className="text-gray-300 leading-relaxed">
          <RichText text={xpuntoCero.intro.paragraphs[2]} boldClassName="text-ink-900 font-semibold" />
        </p>
      </ProjectIntroCard>

      {/* Overview - 3 COLUMNS CENTERED */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title={xpuntoCero.challenge.title}>
              <RichText text={xpuntoCero.challenge.text} />
            </OverviewCard>

            <OverviewCard icon={User} title={xpuntoCero.role.title}>
              <p className="font-semibold mb-2">
                {xpuntoCero.role.summary}
              </p>
              <ul className="space-y-1">
                {xpuntoCero.role.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard icon={GitBranch} title={xpuntoCero.scope.title}>
              <ul className="space-y-1">
                {xpuntoCero.scope.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* Project Impact */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="type-section-title text-ink-900 mb-12 text-center">
            {xpuntoCero.projectImpact.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-accent-icon" />
                </div>
                <div className="text-4xl font-bold text-ink-900 mb-2">{xpuntoCero.projectImpact.metrics[0].value}</div>
                <div className="text-sm font-semibold text-accent mb-2">
                  {xpuntoCero.projectImpact.metrics[0].label}
                </div>
                <div className="text-xs text-gray-400">
                  {xpuntoCero.projectImpact.metrics[0].description}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent-icon" />
                </div>
                <div className="text-4xl font-bold text-ink-900 mb-2">{xpuntoCero.projectImpact.metrics[1].value}</div>
                <div className="text-sm font-semibold text-accent mb-2">
                  {xpuntoCero.projectImpact.metrics[1].label}
                </div>
                <div className="text-xs text-gray-400">
                  {xpuntoCero.projectImpact.metrics[1].description}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-accent-icon" />
                </div>
                <div className="text-4xl font-bold text-ink-900 mb-2">{xpuntoCero.projectImpact.metrics[2].value}</div>
                <div className="text-sm font-semibold text-accent mb-2">
                  {xpuntoCero.projectImpact.metrics[2].label}
                </div>
                <div className="text-xs text-gray-400">
                  {xpuntoCero.projectImpact.metrics[2].description}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <ProjectGallery
        title={xpuntoCero.gallery.title}
        images={xpuntoCero.gallery.images.map((im) => ({
          src: getImagePath(im.src),
          alt: im.alt,
        }))}
      />

      {/* 01 Business Context */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(xpuntoCero.businessContext.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {xpuntoCero.businessContext.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            <GlassCard>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  <RichText text={xpuntoCero.businessContext.paragraphs[0]} boldClassName="text-ink-900 font-semibold" />
                </p>

                <p className="text-gray-300 leading-relaxed">
                  <RichText text={xpuntoCero.businessContext.paragraphs[1]} />
                </p>

                <p className="text-gray-300 leading-relaxed">
                  <RichText text={xpuntoCero.businessContext.paragraphs[2]} />
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 02 Research & Design Approach */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(xpuntoCero.research.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {xpuntoCero.research.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* Discovery */}
            <ImageTextCard
              title={xpuntoCero.research.cards.discovery.title}
              description={xpuntoCero.research.cards.discovery.description}
              bulletPoints={xpuntoCero.research.cards.discovery.bulletPoints}
              images={xpuntoCero.research.cards.discovery.images.map((im) => ({
                src: getImagePath(im.src),
                alt: im.alt,
              }))}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText={xpuntoCero.research.cards.discovery.additionalText}
            />

            {/* Key Insights */}
            <ImageTextCard
              title={xpuntoCero.research.cards.keyInsights.title}
              description={xpuntoCero.research.cards.keyInsights.description}
              bulletPoints={xpuntoCero.research.cards.keyInsights.bulletPoints}
              images={xpuntoCero.research.cards.keyInsights.images.map((im) => ({
                src: getImagePath(im.src),
                alt: im.alt,
              }))}
              imagePosition="right"
              onOpenGallery={openGallery}
              additionalText={xpuntoCero.research.cards.keyInsights.additionalText}
            />

            {/* Design Direction */}
            <ImageTextCard
              title={xpuntoCero.research.cards.designDirection.title}
              description={xpuntoCero.research.cards.designDirection.description}
              bulletPoints={xpuntoCero.research.cards.designDirection.bulletPoints}
              images={xpuntoCero.research.cards.designDirection.images.map((im) => ({
                src: getImagePath(im.src),
                alt: im.alt,
              }))}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText={xpuntoCero.research.cards.designDirection.additionalText}
            />
          </div>
        </div>
      </section>

      {/* 03 Key Design Decisions & Trade-offs */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(xpuntoCero.keyDecisions.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {xpuntoCero.keyDecisions.title}
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
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(xpuntoCero.visualIdentity.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {xpuntoCero.visualIdentity.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* Visual kit */}
            <ImageTextCard
              title={xpuntoCero.visualIdentity.cards.visualKit.title}
              description={xpuntoCero.visualIdentity.cards.visualKit.description}
              bulletPoints={xpuntoCero.visualIdentity.cards.visualKit.bulletPoints}
              images={xpuntoCero.visualIdentity.cards.visualKit.images.map((im) => ({
                src: getImagePath(im.src),
                alt: im.alt,
              }))}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText={xpuntoCero.visualIdentity.cards.visualKit.additionalText}
            />

            {/* Isometric Product Illustrations */}
            <ImageTextCard
              title={xpuntoCero.visualIdentity.cards.isometricIllustrations.title}
              description={xpuntoCero.visualIdentity.cards.isometricIllustrations.description}
              bulletPoints={xpuntoCero.visualIdentity.cards.isometricIllustrations.bulletPoints}
              images={xpuntoCero.visualIdentity.cards.isometricIllustrations.images.map((im) => ({
                src: getImagePath(im.src),
                alt: im.alt,
              }))}
              imagePosition="right"
              onOpenGallery={openGallery}
              additionalText={xpuntoCero.visualIdentity.cards.isometricIllustrations.additionalText}
            />
          </div>
        </div>
      </section>

      {/* 05 Outcomes & Business Impact */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(xpuntoCero.outcomes.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {xpuntoCero.outcomes.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* Intro */}
            <GlassCard>
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed">
                  {xpuntoCero.outcomes.intro}
                </p>
              </div>
            </GlassCard>

            {/* Grid: Lead Gen + UX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lead Generation & Marketing */}
              <GlassCard>
                <div className="p-6 space-y-4">
                  <h3 className="type-work text-lg text-accent mb-2">
                    {xpuntoCero.outcomes.leadGeneration.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    <RichText text={xpuntoCero.outcomes.leadGeneration.text} boldClassName="text-ink-900 font-semibold" />
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-ink-900 mb-1">
                        {xpuntoCero.outcomes.leadGeneration.metrics[0].value}
                      </div>
                      <div className="text-sm font-semibold text-accent">
                        {xpuntoCero.outcomes.leadGeneration.metrics[0].label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {xpuntoCero.outcomes.leadGeneration.metrics[0].description}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-4xl font-bold text-ink-900 mb-1">
                        {xpuntoCero.outcomes.leadGeneration.metrics[1].value}
                      </div>
                      <div className="text-sm font-semibold text-accent">
                        {xpuntoCero.outcomes.leadGeneration.metrics[1].label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {xpuntoCero.outcomes.leadGeneration.metrics[1].description}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* UX & Performance */}
              <GlassCard>
                <div className="p-6 space-y-4">
                  <h3 className="type-work text-lg text-accent mb-2">
                    {xpuntoCero.outcomes.uxPerformance.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    <RichText text={xpuntoCero.outcomes.uxPerformance.text} boldClassName="text-ink-900 font-semibold" />
                  </p>

                  <ul className="text-gray-400 text-sm space-y-1 pt-2">
                    {xpuntoCero.outcomes.uxPerformance.items.map((item, i) => (
                      <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>

            {/* Key Learnings */}
            <GlassCard>
              <div className="p-6 space-y-3">
                <h3 className="type-work text-lg text-accent mb-2">
                  {xpuntoCero.outcomes.keyLearnings.title}
                </h3>
                <ul className="text-gray-300 text-sm space-y-2 leading-relaxed">
                  {xpuntoCero.outcomes.keyLearnings.items.map((item, i) => (
                    <li key={i}>
                      <RichText text={item} />
                    </li>
                  ))}
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
              <h2 className="type-section-title text-ink-900 mb-4">
                {xpuntoCero.cta.title}
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                {xpuntoCero.cta.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105"
                >
                  {xpuntoCero.cta.allProjects}
                </Link>
                <CopyEmailLink className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all">
                  {xpuntoCero.cta.talk}
                </CopyEmailLink>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {isImageModalOpen && (
        <Lightbox
          images={galleryImages}
          index={currentImageIndex}
          onClose={closeImageModal}
          onPrev={previousImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
