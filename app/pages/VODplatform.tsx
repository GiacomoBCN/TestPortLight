"use client";
import React, { useState } from "react";
import Image from "next/image";
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
import { vod } from "@/content/vod";
import SectionNumber from "../components/casestudy/SectionNumber";
import HighlightLastWords from "../components/HighlightLastWords";

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


  const keyDecisions = vod.keyDecisions.decisions;

  // Icone delle card dei risultati, nello stesso ordine di vod.achievements.items
  const achievementIcons = [Zap, Eye, CheckCircle, Monitor];

  const achievements = vod.achievements.items.map((a, i) => ({
    icon: achievementIcons[i],
    ...a,
  }));

  const interactionImprovements = vod.interactionImprovements.rows;

  const evaluationImages = vod.problem.evaluationImages.map((im) => ({
    src: getImagePath(im.src),
    alt: im.alt,
  }));

  const heuristicData = vod.problem.heuristic;

  const accessibilityData = vod.problem.accessibility;

  const navigationComparisonImages = vod.navigationDeepDive.comparisonImages.map((im) => ({
    src: getImagePath(im.src),
    alt: im.alt,
  }));

  const table = vod.navigationDeepDive.table;

  const cards = vod.navigationDeepDive.cards;

  const learnings = vod.outcomes.learnings.items;

  return (
    <div className="min-h-screen">
      {/* Back Button: in cima alla pagina, scorre via con il contenuto (altezza 0: non sposta nulla) */}
      <div className="relative z-20 h-0 flex items-start pl-6 [&>*]:mt-4">
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 hover:text-ink-900 hover:border-blue transition-all"
        >
          <ArrowLeft size={20} />
          <span className="sr-only md:not-sr-only">{vod.backLink}</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            {vod.hero.breadcrumb}
          </p>
          <div className="mb-4">
            <span className="label-tag text-xs">
              {vod.hero.category}
            </span>
          </div>
          <h1 className="type-page-title text-ink-900 mb-4">
            <HighlightLastWords text={vod.hero.title} />
          </h1>
          <p className="text-lg text-gray-400 mb-4">
            {vod.hero.subtitle}
          </p>
          <p className="text-xl text-gray-300 mb-8">
            {vod.hero.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {vod.hero.tags.map((tag, i) => (
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
        image={getImagePath(vod.intro.image)}
        title={vod.intro.title}
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          {vod.intro.paragraphs[0]}
        </p>
        <p className="text-gray-300 leading-relaxed">
          {vod.intro.paragraphs[1]}
        </p>
      </ProjectIntroCard>

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title={vod.challenge.title}>
              {vod.challenge.text}
            </OverviewCard>

            <OverviewCard icon={User} title={vod.role.title}>
              <p className="font-semibold mb-2">{vod.role.summary}</p>
              <ul className="space-y-1">
                {vod.role.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span>{` ${item}`}</li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard icon={TrendingUp} title={vod.impact.title}>
              <ul className="space-y-1">
                {vod.impact.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span>{` ${item}`}</li>
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
            {vod.achievements.title}
          </h2>
          <div className="grid grid-cols-[minmax(0,20rem)] md:grid-cols-[repeat(2,14rem)] lg:grid-cols-[repeat(4,14rem)] justify-center gap-6">
            {achievements.map((achievement, index) => (
              <GlassCard key={index} className="!p-5">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                    <achievement.icon className="w-5 h-5 text-accent-icon" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-bold text-ink-900 mb-1">
                    {achievement.metric}
                  </div>
                  <div className="text-sm font-semibold text-accent mb-1">
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
        title={vod.gallery.title}
        images={vod.gallery.images.map((im) => ({
          src: getImagePath(im.src),
          alt: im.alt,
        }))}
      />

      {/* Section 1: Business Context */}

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(vod.businessContext.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {vod.businessContext.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <GlassCard>
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  {vod.businessContext.paragraphs[0]}
                </p>

                <p className="text-gray-300 leading-relaxed">
                  {vod.businessContext.paragraphs[1]}
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Section 2: The Problem & Evaluation */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(vod.problem.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {vod.problem.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            {/* Heuristic Review Card - Images on LEFT */}
            <ImageTextCard
              title={heuristicData.title}
              description={heuristicData.description}
              bulletPoints={heuristicData.bulletPoints}
              images={heuristicData.images.map((im) => ({
                src: getImagePath(im.src),
                alt: im.alt,
              }))}
              imagePosition="left"
              onOpenGallery={openGallery}
              additionalText={heuristicData.additionalText}
            />

            {/* Accessibility Card - Images on RIGHT */}
            <ImageTextCard
              title={accessibilityData.title}
              description={accessibilityData.description}
              bulletPoints={accessibilityData.bulletPoints}
              images={accessibilityData.images.map((im) => ({
                src: getImagePath(im.src),
                alt: im.alt,
              }))}
              imagePosition="right"
              onOpenGallery={openGallery}
            />
          </div>
        </div>
      </section>

      {/* Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(vod.keyDecisions.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {vod.keyDecisions.title}
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
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(vod.redesign.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {vod.redesign.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
              <div className="p-3">
                <h3 className="type-work text-xl text-ink-900 mb-3">
                  {vod.redesign.navigation.title}
                </h3>

                <ul className="space-y-2 text-gray-400">
                  {vod.redesign.navigation.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-list-bullet)] mt-1" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-xl text-ink-900 mb-3">
                  {vod.redesign.welcomeScreen.title}
                </h3>

                <ul className="space-y-2 text-gray-400">
                  {vod.redesign.welcomeScreen.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-list-bullet)] mt-1" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-xl text-ink-900 mb-3">
                  {vod.redesign.wcag.title}
                </h3>

                <ul className="space-y-2 text-gray-400">
                  {vod.redesign.wcag.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-list-bullet)] mt-1" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-xl text-ink-900 mb-3">
                  {vod.redesign.grid.title}
                </h3>

                <ul className="space-y-2 text-gray-400">
                  {vod.redesign.grid.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-list-bullet)] mt-1" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
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
            <h3 className="type-work-title text-ink-900 mb-2">
              {vod.navigationDeepDive.title}
            </h3>
            <p className="text-gray-400">
              {vod.navigationDeepDive.subtitle}
            </p>
          </div>

          {/* 📸 Side-by-side images */}
          <div className="pl-0 md:pl-24 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-700 shadow-lg cursor-pointer group relative transition-all hover:border-blue-400"
                  onClick={() => openGallery(navigationComparisonImages, 0)}
                  aria-label={vod.navigationDeepDive.oldImage.enlargeLabel}
                >
                  <Image
                    src={getImagePath(vod.navigationDeepDive.oldImage.src)}
                    alt={vod.navigationDeepDive.oldImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex items-center justify-center" aria-hidden="true">
                    <span className="text-white text-sm font-medium">{vod.navigationDeepDive.oldImage.clickToEnlarge}</span>
                  </div>
                </button>
                <p className="text-gray-400 text-sm mt-2">
                  {vod.navigationDeepDive.oldImage.caption}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-700 shadow-lg cursor-pointer group relative transition-all hover:border-blue-400"
                  onClick={() => openGallery(navigationComparisonImages, 1)}
                  aria-label={vod.navigationDeepDive.newImage.enlargeLabel}
                >
                  <Image
                    src={getImagePath(vod.navigationDeepDive.newImage.src)}
                    alt={vod.navigationDeepDive.newImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex items-center justify-center" aria-hidden="true">
                    <span className="text-white text-sm font-medium">{vod.navigationDeepDive.newImage.clickToEnlarge}</span>
                  </div>
                </button>
                <p className="text-gray-400 text-sm mt-2">
                  {vod.navigationDeepDive.newImage.caption}
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
                      <th className="pb-4 pr-4 text-accent font-semibold w-[18%]">
                        {table.headers.category}
                      </th>
                      <th className="pb-4 pr-4 text-accent font-semibold w-[41%]">
                        {table.headers.old}
                      </th>
                      <th className="pb-4 pr-4 text-accent font-semibold w-[41%]">
                        {table.headers.new}
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-4 pr-4 font-semibold">{table.structure.category}</td>
                      <td className="py-4 pr-4">
                        <RichText text={table.structure.old} />
                      </td>
                      <td className="py-4 pr-4">
                        <RichText text={table.structure.new} />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-800">
                      <td className="py-4 pr-4 font-semibold">{table.movement.category}</td>
                      <td className="py-4 pr-4">
                        <RichText text={table.movement.old} />
                        <br />
                        <span className="text-gray-400">
                          <RichText text={table.movement.oldNote} />
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <RichText text={table.movement.new} />
                        <br />
                        <span className="text-gray-400">
                          {table.movement.newNote}
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-800">
                      <td className="py-4 pr-4 font-semibold">
                        {table.focus.category}
                      </td>
                      <td className="py-4 pr-4">
                        <RichText text={table.focus.old} />
                      </td>
                      <td className="py-4 pr-4">
                        <RichText text={table.focus.new} />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-800">
                      <td className="py-4 pr-4 font-semibold">
                        {table.utility.category}
                      </td>
                      <td className="py-4 pr-4">
                        {table.utility.old}
                      </td>
                      <td className="py-4 pr-4">
                        <RichText text={table.utility.new} />
                      </td>
                    </tr>

                    <tr>
                      <td className="py-4 pr-4 font-semibold">{table.outcome.category}</td>
                      <td className="py-4 pr-4">
                        {table.outcome.old}
                      </td>
                      <td className="py-4 pr-4">
                        {table.outcome.new}
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
                  <h3 className="type-work text-ink-900 text-lg mb-4">
                    {cards.structure.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                        {cards.structure.oldLabel}
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        {cards.structure.old.map((line, i) => (
                          <p key={i}>
                            <RichText text={line} />
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-accent text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                        {cards.structure.newLabel}
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        {cards.structure.new.map((line, i) => (
                          <p key={i}>
                            <RichText text={line} />
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Movement Card */}
              <GlassCard>
                <div className="p-5">
                  <h3 className="type-work text-ink-900 text-lg mb-4">
                    {cards.movement.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        {cards.movement.oldLabel}
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        {cards.movement.old.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                        <p className="text-gray-400 italic">
                          {cards.movement.oldNote}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">
                        {cards.movement.newLabel}
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        {cards.movement.new.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                        <p className="text-gray-400">
                          {cards.movement.newNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Focus & Legibility Card */}
              <GlassCard>
                <div className="p-5">
                  <h3 className="type-work text-ink-900 text-lg mb-4">
                    {cards.focus.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        {cards.focus.oldLabel}
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        {cards.focus.old.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">
                        {cards.focus.newLabel}
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        {cards.focus.new.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Utility & Feedback Card */}
              <GlassCard>
                <div className="p-5">
                  <h3 className="type-work text-ink-900 text-lg mb-4">
                    {cards.utility.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        {cards.utility.oldLabel}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {cards.utility.old.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">
                        {cards.utility.newLabel}
                      </div>
                      <div className="text-gray-300 text-sm space-y-2">
                        {cards.utility.new.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Outcome Card */}
              <GlassCard>
                <div className="p-5">
                  <h3 className="type-work text-ink-900 text-lg mb-4">
                    {cards.outcome.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        {cards.outcome.oldLabel}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {cards.outcome.old.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">
                        {cards.outcome.newLabel}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {cards.outcome.new.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
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
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(vod.interactionImprovements.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {vod.interactionImprovements.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <GlassCard>
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed mb-6">
                  {vod.interactionImprovements.intro}
                </p>

                {/* Desktop Table View - hidden on mobile */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-4 pr-4 text-accent font-semibold">
                          {vod.interactionImprovements.columns.task}
                        </th>
                        <th className="pb-4 pr-4 text-accent font-semibold">
                          {vod.interactionImprovements.columns.before}
                        </th>
                        <th className="pb-4 pr-4 text-accent font-semibold">
                          {vod.interactionImprovements.columns.after}
                        </th>
                        <th className="pb-4 text-accent font-semibold">
                          {vod.interactionImprovements.columns.improvement}
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
                      className="bg-ink-900/[0.05] border border-ink-900/10 rounded-lg p-4"
                    >
                      <h3 className="type-work text-ink-900 text-base mb-4">
                        {item.task}
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide">
                            {vod.interactionImprovements.cardLabels.before}
                          </div>
                          <div className="text-gray-300 text-sm font-semibold">
                            {item.before}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide">
                            {vod.interactionImprovements.cardLabels.after}
                          </div>
                          <div className="text-gray-300 text-sm font-semibold">
                            {item.after}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-ink-900/10">
                          <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide">
                            {vod.interactionImprovements.cardLabels.improvement}
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
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(vod.outcomes.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {vod.outcomes.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <p className="text-gray-300 leading-relaxed">
              {vod.outcomes.text}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="type-work text-lg text-accent mb-3">
                    {vod.outcomes.constraints.title}
                  </h3>

                  <ul className="space-y-2 text-gray-300 text-sm">
                    {vod.outcomes.constraints.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span>
                          <RichText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="type-work text-lg text-accent mb-3">
                    {vod.outcomes.learnings.title}
                  </h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    {/* Le prime tre hanno {" "} separato dopo il <strong>, l'ultima no (nodi di testo come nell'originale) */}
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>{learnings[0].label}</strong>{" "}
                        {learnings[0].text}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>
                          {learnings[1].label}
                        </strong>{" "}
                        {learnings[1].text}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>{learnings[2].label}</strong>{" "}
                        {learnings[2].text}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>
                        <strong>{learnings[3].label}</strong>
                        {` ${learnings[3].text}`}
                      </span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* IMAGE 5: Multi-platform, multi-brand scale */}
          <div className="mt-8 rounded-lg overflow-hidden relative w-full aspect-video">
            <Image
              src={getImagePath(vod.outcomes.image.src)}
              alt={vod.outcomes.image.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <p className="text-sm text-gray-400 mt-3 text-center">
              {vod.outcomes.image.caption}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="type-section-title text-ink-900 mb-4">
                {vod.cta.title}
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                {vod.cta.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CopyEmailLink className="px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105">
                  {vod.cta.talk}
                </CopyEmailLink>
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all"
                >
                  {vod.cta.allProjects}
                </Link>
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
