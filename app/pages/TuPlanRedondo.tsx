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
import { tuPlanRedondo } from "@/content/tu-plan-redondo";
import SectionNumber from "../components/casestudy/SectionNumber";

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


  const keyDecisions = tuPlanRedondo.keyDecisions.decisions;

  // Non renderizzato. Icone nello stesso ordine di tuPlanRedondo.achievements
  const achievementIcons = [Zap, CheckCircle, Database, BarChart3];
  const achievements = tuPlanRedondo.achievements.map((a, i) => ({
    icon: achievementIcons[i],
    ...a,
  }));

  const img = (im: { file: string; alt: string }) => ({
    src: getImagePath(im.file),
    alt: im.alt,
  });

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40" style={{ left: "calc(var(--band) + 1.5rem)" }}>
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 hover:text-ink-900 hover:border-blue transition-all"
        >
          <ArrowLeft size={20} />
          <span className="sr-only md:not-sr-only">{tuPlanRedondo.backLink}</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            {tuPlanRedondo.hero.breadcrumb}
          </p>

          <div className="mb-4">
            <span className="label-tag text-xs">
              {tuPlanRedondo.hero.category}
            </span>
          </div>

          <h1 className="type-page-title text-ink-900 mb-4">
            {tuPlanRedondo.hero.title}
          </h1>

          <p className="text-lg text-gray-400 mb-4">{tuPlanRedondo.hero.subtitle}</p>

          <p className="text-xl text-gray-300 mb-8">
            <RichText text={tuPlanRedondo.hero.description} boldClassName="text-ink-900 font-semibold" />
          </p>

          <div className="flex flex-wrap gap-2">
            {tuPlanRedondo.hero.tags.map((tag, i) => (
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
        image={getImagePath(tuPlanRedondo.intro.image)}
        title={tuPlanRedondo.intro.title}
      >
        <p className="text-gray-300 leading-relaxed">
          {tuPlanRedondo.intro.paragraphs[0]}
        </p>

        <p className="text-gray-300 leading-relaxed">
          {tuPlanRedondo.intro.paragraphs[1]}
        </p>

        <p className="text-gray-300 leading-relaxed">
          {tuPlanRedondo.intro.paragraphs[2]}
        </p>
      </ProjectIntroCard>

      {/* Overview - 3 COLUMNS */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title={tuPlanRedondo.challenge.title}>
              <RichText text={tuPlanRedondo.challenge.text} />
            </OverviewCard>

            <OverviewCard icon={User} title={tuPlanRedondo.role.title}>
              <p className="font-semibold mb-2">
                {tuPlanRedondo.role.summary}
              </p>
              <ul className="space-y-1">
                {tuPlanRedondo.role.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard icon={GitBranch} title={tuPlanRedondo.scope.title}>
              <ul className="space-y-1">
                {tuPlanRedondo.scope.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* Metrics Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="type-section-title text-ink-900 mb-12 text-center">
            {tuPlanRedondo.impact.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent-icon" />
                </div>
                <div className="text-4xl font-bold text-ink-900 mb-2">{tuPlanRedondo.impact.metrics[0].value}</div>
                <div className="text-sm font-semibold text-accent mb-2">
                  {tuPlanRedondo.impact.metrics[0].label}
                </div>
                <div className="text-xs text-gray-400">
                  {tuPlanRedondo.impact.metrics[0].description}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <SmilePlus className="w-6 h-6 text-accent-icon" />
                </div>
                <div className="text-4xl font-bold text-ink-900 mb-2">{tuPlanRedondo.impact.metrics[1].value}</div>
                <div className="text-sm font-semibold text-accent mb-2">
                  {tuPlanRedondo.impact.metrics[1].label}
                </div>
                <div className="text-xs text-gray-400">
                  {tuPlanRedondo.impact.metrics[1].description}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <CircleDollarSign className="w-6 h-6 text-accent-icon" />
                </div>
                <div className="text-4xl font-bold text-ink-900 mb-2">{tuPlanRedondo.impact.metrics[2].value}</div>
                <div className="text-sm font-semibold text-accent mb-2">
                  {tuPlanRedondo.impact.metrics[2].label}
                </div>
                <div className="text-xs text-gray-400">
                  {tuPlanRedondo.impact.metrics[2].description}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-accent-icon" />
                </div>
                <div className="text-4xl font-bold text-ink-900 mb-2">
                  {tuPlanRedondo.impact.metrics[3].value}
                </div>
                <div className="text-sm font-semibold text-accent mb-2">
                  {tuPlanRedondo.impact.metrics[3].label}
                </div>
                <div className="text-xs text-gray-400">
                  {tuPlanRedondo.impact.metrics[3].description}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <ProjectGallery
        title={tuPlanRedondo.gallery.title}
        images={tuPlanRedondo.gallery.images.map(img)}
      />

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(tuPlanRedondo.businessContext.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {tuPlanRedondo.businessContext.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24">
            <GlassCard>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {tuPlanRedondo.businessContext.paragraphs[0]}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {tuPlanRedondo.businessContext.paragraphs[1]}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {tuPlanRedondo.businessContext.paragraphs[2]}
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 02: Research & Definition */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(tuPlanRedondo.research.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {tuPlanRedondo.research.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* --- User Research Process --- */}

            <ImageTextCard
              title={tuPlanRedondo.research.userResearch.title}
              description={tuPlanRedondo.research.userResearch.description}
              bulletPoints={tuPlanRedondo.research.userResearch.bulletPoints}
              images={tuPlanRedondo.research.userResearch.images.map(img)}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            {/* --- Key Findings --- */}

            <ImageTextCard
              title={tuPlanRedondo.research.keyFindings.title}
              description={tuPlanRedondo.research.keyFindings.description}
              bulletPoints={tuPlanRedondo.research.keyFindings.bulletPoints}
              images={tuPlanRedondo.research.keyFindings.images.map(img)}
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
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(tuPlanRedondo.keyDecisions.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {tuPlanRedondo.keyDecisions.title}
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
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(tuPlanRedondo.designImplementation.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {tuPlanRedondo.designImplementation.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-8">
            {/* 1) Brand-Aligned Visual Design */}
            <ImageTextCard
              title={tuPlanRedondo.designImplementation.visualDesign.title}
              description={tuPlanRedondo.designImplementation.visualDesign.description}
              bulletPoints={tuPlanRedondo.designImplementation.visualDesign.bulletPoints}
              images={tuPlanRedondo.designImplementation.visualDesign.images.map(img)}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            {/* 2) Streamlined Evaluation Interface */}
            <ImageTextCard
              title={tuPlanRedondo.designImplementation.evaluationInterface.title}
              description={tuPlanRedondo.designImplementation.evaluationInterface.description}
              bulletPoints={tuPlanRedondo.designImplementation.evaluationInterface.bulletPoints}
              images={tuPlanRedondo.designImplementation.evaluationInterface.images.map(img)}
              imagePosition="right"
              onOpenGallery={openGallery}
              additionalText=""
            />

            {/* 3) Performance Evaluation */}
            <ImageTextCard
              title={tuPlanRedondo.designImplementation.performanceEvaluation.title}
              description={tuPlanRedondo.designImplementation.performanceEvaluation.description}
              bulletPoints={tuPlanRedondo.designImplementation.performanceEvaluation.bulletPoints}
              images={tuPlanRedondo.designImplementation.performanceEvaluation.images.map(img)}
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
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(tuPlanRedondo.businessImpact.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {tuPlanRedondo.businessImpact.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            <p className="text-gray-300 leading-relaxed">
              {tuPlanRedondo.businessImpact.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="type-work text-lg text-accent mb-3">
                    {tuPlanRedondo.businessImpact.efficiency.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {tuPlanRedondo.businessImpact.efficiency.items.map((item, i) => (
                      <li key={i}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="type-work text-lg text-accent mb-3">
                    {tuPlanRedondo.businessImpact.cost.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {tuPlanRedondo.businessImpact.cost.items.map((item, i) => (
                      <li key={i}>
                        <RichText text={item} />
                      </li>
                    ))}
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
              <h2 className="type-section-title text-ink-900 mb-4">
                {tuPlanRedondo.cta.title}
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                {tuPlanRedondo.cta.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105"
                >
                  {tuPlanRedondo.cta.allProjects}
                </Link>
                <CopyEmailLink className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all">
                  {tuPlanRedondo.cta.talk}
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
