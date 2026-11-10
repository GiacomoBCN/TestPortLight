"use client";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  ChevronDown,
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
import { sgpv } from "@/content/sgpv";
import SectionNumber from "../components/casestudy/SectionNumber";
import HighlightLastWords from "../components/HighlightLastWords";

export default function SGPVEvolution() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Fase 1 chiusa di default: aperta mostra Context, Approach, Results, Reflection e la galleria P1
  const [isPhase1Open, setIsPhase1Open] = useState(false);
  const [isPhase1Animating, setIsPhase1Animating] = useState(false);
  const reduceMotion = useReducedMotion();
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


  const keyDecisions = sgpv.keyDecisions.decisions;

  // Icone delle card di impatto, nello stesso ordine di sgpv.impactSnapshot.achievements
  const achievementIcons = [Zap, CheckCircle, Users, Smartphone, Layers, Target];
  const achievements = sgpv.impactSnapshot.achievements.map((a, i) => ({
    icon: achievementIcons[i],
    ...a,
  }));


  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40" style={{ left: "calc(var(--band) + 1.5rem)" }}>
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 hover:text-ink-900 hover:border-blue transition-all"
        >
          <ArrowLeft size={20} />
          <span className="sr-only md:not-sr-only">{sgpv.backLink}</span>
        </Link>
      </div>
      {/* Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            {sgpv.hero.breadcrumb}
          </p>

          <div className="mb-4">
            <span className="label-tag text-xs">
              {sgpv.hero.category}
            </span>
          </div>

          <h1 className="type-page-title text-ink-900 mb-4">
            <HighlightLastWords text={sgpv.hero.title} />
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            {sgpv.hero.subtitle}
          </p>

          <p className="text-xl text-gray-300 mb-8">
            <RichText text={sgpv.hero.description} boldClassName="text-ink-900 font-semibold" />
          </p>

          <div className="flex flex-wrap gap-2">
            {sgpv.hero.tags.map((tag, i) => (
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
        image={getImagePath(sgpv.intro.image)}
        title={sgpv.intro.title}
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          <RichText text={sgpv.intro.paragraphs[0]} />
        </p>
        <p className="text-gray-300 leading-relaxed">
          <RichText text={sgpv.intro.paragraphs[1]} />
        </p>
        <p className="text-gray-300 leading-relaxed">
          <RichText text={sgpv.intro.paragraphs[2]} />
        </p>
      </ProjectIntroCard>
      {/* Overview - 3 COLUMNS */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title={sgpv.challenge.title}>
              <p>
                {sgpv.challenge.text}
              </p>
            </OverviewCard>

            <OverviewCard icon={User} title={sgpv.role.title}>
              <p className="font-semibold mb-2">
                {sgpv.role.summary}
              </p>
              <p>{sgpv.role.paragraphs[0]}</p>
              <p>
                {sgpv.role.paragraphs[1]}
              </p>
            </OverviewCard>

            <OverviewCard icon={GitBranch} title={sgpv.scope.title}>
              <ul className="space-y-1">
                {sgpv.scope.items.map((item, i) => (
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
            {sgpv.impactSnapshot.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <GlassCard key={index}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <achievement.icon className="w-5 h-5 text-accent-icon" aria-hidden="true" />
                  </div>
                  <div className="text-4xl font-bold text-ink-900 mb-2">
                    {achievement.metric}
                  </div>
                  <div className="text-sm font-semibold text-accent mb-2">
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
      {/* PHASE 1 — riassunto chiuso di default; il contenuto completo si apre con il bottone */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(sgpv.phase1.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {sgpv.phase1.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24">
            <GlassCard>
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed">
                  {sgpv.phase1.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {sgpv.phase1.summaryMetrics.map((m, i) => (
                    <li key={i} className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-ink-900">{m.metric}</span>
                      <span className="text-sm font-semibold text-accent">{m.label}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setIsPhase1Animating(true);
                    setIsPhase1Open((o) => !o);
                  }}
                  aria-expanded={isPhase1Open}
                  aria-controls="sgpv-phase1-content"
                  className="mt-6 inline-flex items-center gap-2 px-5 sm:px-6 py-3 whitespace-nowrap glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all"
                >
                  {isPhase1Open ? sgpv.phase1.toggle.close : sgpv.phase1.toggle.open}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform motion-reduce:transition-none ${isPhase1Open ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Contenuto completo della Fase 1: non renderizzato da chiuso (niente focus, niente screen reader, niente immagini caricate) */}
      <div id="sgpv-phase1-content">
        <AnimatePresence initial={false}>
          {isPhase1Open && (
            <motion.div
              key="phase1-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
              // overflow hidden solo durante l'animazione: da aperta la cornice delle card
              // (che sporge oltre il bordo) non deve essere tagliata
              onAnimationStart={() => setIsPhase1Animating(true)}
              onAnimationComplete={() => setIsPhase1Animating(false)}
              style={{ overflow: isPhase1Animating ? "hidden" : "visible" }}
            >
              <section className="pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                  <div className="pl-0 md:pl-24 space-y-6">
                    <GlassCard>
                      <div className="p-6">
                        <h3 className="type-work text-xl text-ink-900 mb-3">
                          {sgpv.phase1.context.title}
                        </h3>

                        <p className="text-gray-300 leading-relaxed">
                          {sgpv.phase1.context.text}
                        </p>
                      </div>
                    </GlassCard>

                    {/* Heuristic Review Card - Images on LEFT */}
                    <ImageTextCard
                      title={sgpv.phase1.approach.title}
                      description={sgpv.phase1.approach.description}
                      bulletPoints={[]}
                      images={sgpv.phase1.approach.images.map((im) => ({ src: getImagePath(im.src), alt: im.alt }))}
                      imagePosition="left"
                      onOpenGallery={openGallery}
                      additionalText=""
                    />

                    <ImageTextCard
                      title={sgpv.phase1.results.title}
                      description=""
                      bulletPoints={sgpv.phase1.results.bulletPoints}
                      images={sgpv.phase1.results.images.map((im) => ({ src: getImagePath(im.src), alt: im.alt }))}
                      imagePosition="left"
                      onOpenGallery={openGallery}
                      additionalText=""
                    />

                    <GlassCard>
                      <div className="p-6">
                        <h3 className="type-work text-xl text-ink-900 mb-3">
                          {sgpv.phase1.reflection.title}
                        </h3>

                        <p className="text-gray-300 leading-relaxed">
                          {sgpv.phase1.reflection.text}
                        </p>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </section>
              {/* Phase 1 Gallery */}
              <ProjectGallery
                title={sgpv.phase1Gallery.title}
                images={sgpv.phase1Gallery.images.map((im) => ({ src: getImagePath(im.src), alt: im.alt }))}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PHASE 2 - Research */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(sgpv.phase2.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {sgpv.phase2.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            <ImageTextCard
              title={sgpv.phase2.technologyResearch.title}
              description={sgpv.phase2.technologyResearch.description}
              bulletPoints={[]}
              images={sgpv.phase2.technologyResearch.images.map((im) => ({ src: getImagePath(im.src), alt: im.alt }))}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-xl text-ink-900 mb-3">
                  {sgpv.phase2.researchWorkflow.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {sgpv.phase2.researchWorkflow.intro}
                </p>

                {/* Desktop Table View - hidden on mobile */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-4 pr-4 text-accent font-semibold">
                          {sgpv.phase2.researchWorkflow.columns.phase}
                        </th>
                        <th className="pb-4 pr-4 text-accent font-semibold">
                          {sgpv.phase2.researchWorkflow.columns.methods}
                        </th>
                        <th className="pb-4 pr-4 text-accent font-semibold">
                          {sgpv.phase2.researchWorkflow.columns.purpose}
                        </th>
                        <th className="pb-4 text-accent font-semibold">
                          {sgpv.phase2.researchWorkflow.columns.outputs}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      {sgpv.phase2.researchWorkflow.rows.map((row, i) => (
                        <tr key={i} className="border-b border-gray-800">
                          <td className="py-4 pr-4">{row.phase}</td>
                          <td className="py-4 pr-4">
                            {row.methods}
                          </td>
                          <td className="py-4 pr-4">
                            {row.purpose}
                          </td>
                          <td className="py-4">
                            {row.outputs}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View - visible only on mobile */}
                <div className="lg:hidden space-y-4">
                  {sgpv.phase2.researchWorkflow.rows.map((row, i) => (
                    <div key={i} className="bg-ink-900/[0.03] backdrop-blur-xl border border-ink-900/10 rounded-xl p-5">
                      <h4 className="type-work text-ink-900 text-base mb-4">
                        {row.phase}
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide mb-1">
                            {sgpv.phase2.researchWorkflow.columns.methods}
                          </div>
                          <div className="text-gray-300 text-sm">
                            {row.methods}
                          </div>
                        </div>
                        <div>
                          <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide mb-1">
                            {sgpv.phase2.researchWorkflow.columns.purpose}
                          </div>
                          <div className="text-gray-300 text-sm">
                            {row.purpose}
                          </div>
                        </div>
                        <div>
                          <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide mb-1">
                            {sgpv.phase2.researchWorkflow.columns.outputs}
                          </div>
                          <div className="text-accent text-sm">
                            {row.outputs}
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

      {/* AI Feature Explanation - NEW SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(sgpv.aiDataCapture.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {sgpv.aiDataCapture.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <ImageTextCard
              title={sgpv.aiDataCapture.problem.title}
              description={sgpv.aiDataCapture.problem.description}
              bulletPoints={[]}
              images={sgpv.aiDataCapture.problem.images.map((im) => ({ src: getImagePath(im.src), alt: im.alt }))}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />

            <ImageTextCard
              title={sgpv.aiDataCapture.solution.title}
              description={sgpv.aiDataCapture.solution.description}
              bulletPoints={sgpv.aiDataCapture.solution.bulletPoints}
              images={sgpv.aiDataCapture.solution.images.map((im) => ({ src: getImagePath(im.src), alt: im.alt }))}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText=""
            />
          </div>
        </div>
      </section>
      {/* Phase 2 Gallery */}
      <ProjectGallery
        title={sgpv.phase2Gallery.title}
        images={sgpv.phase2Gallery.images.map((im) => ({ src: getImagePath(im.src), alt: im.alt }))}
      />

      {/* Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(sgpv.keyDecisions.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {sgpv.keyDecisions.title}
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
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(sgpv.businessImpact.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {sgpv.businessImpact.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            <p className="text-gray-300 leading-relaxed">
              {sgpv.businessImpact.intro}
            </p>

            {/* Consolidated Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="type-work text-lg text-accent mb-3">
                    {sgpv.businessImpact.productPerformance.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {sgpv.businessImpact.productPerformance.items.map((item, i) => (
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
                    {sgpv.businessImpact.operationalOutcomes.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {sgpv.businessImpact.operationalOutcomes.items.map((item, i) => (
                      <li key={i}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>

            {/* Long-Term Value */}
            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-lg text-accent mb-3">
                  {sgpv.businessImpact.longTermValue.title}
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  {sgpv.businessImpact.longTermValue.intro}
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  {sgpv.businessImpact.longTermValue.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-list-bullet)] mt-1">→</span>
                      <span>
                        <RichText text={item} />
                      </span>
                    </li>
                  ))}
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
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(sgpv.learnings.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {sgpv.learnings.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            {/* Optional Intro */}
            <p className="text-gray-300 leading-relaxed mb-6">
              {sgpv.learnings.intro}
            </p>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sgpv.learnings.items.map((item, i) => (
                <GlassCard key={i}>
                  <div className="p-6">
                    <h3 className="type-work text-xl text-ink-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="type-section-title text-ink-900 mb-4">
                {sgpv.cta.title}
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                {sgpv.cta.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105"
                >
                  {sgpv.cta.allProjects}
                </Link>
                <CopyEmailLink className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all">
                  {sgpv.cta.talk}
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
