"use client";
import React, { useState } from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  AlertCircle,
  User,
  Users,
  MessageSquare,
  Layers,
  SlidersHorizontal,
  Tag,
  Component,
  Figma,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import HeroVideo, { type HeroMediaFiles } from "../components/casestudy/HeroVideo";
import CopyEmailLink from "@/app/components/CopyEmailLink";
import RichText from "@/app/components/RichText";
import { designSystem, type DesignSystemShotKey } from "@/content/design-system";
import TokenDemoCard from "../components/casestudy/TokenDemoCard";
import Lightbox from "../components/Lightbox";
import { getImagePath } from "@/utils/image";
import ImageTextCard, { type CaseStudyImage } from "../components/casestudy/ImageTextCard";
import SectionNumber from "../components/casestudy/SectionNumber";
import HighlightLastWords from "../components/HighlightLastWords";

const DEMO_URL = designSystem.demoUrl;

type Shot = CaseStudyImage;

export default function DesignSystemCaseStudy({
  media,
  shotsAvailable,
}: {
  media: HeroMediaFiles;
  /** chiavi di designSystem.shots il cui file esiste in public/ (controllo a build time) */
  shotsAvailable: DesignSystemShotKey[];
}) {
  // Lightbox condivisa dalle card dell'approccio
  const [gallery, setGallery] = useState<Shot[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const open = (images: Shot[], i: number) => {
    setGallery(images);
    setIndex(i);
  };

  const shot = (k: DesignSystemShotKey): Shot => ({
    ...(designSystem.shots[k] as Omit<Shot, "src">),
    src: getImagePath(`images/projects/design-system/${designSystem.shots[k].file}`),
  });

  // Icone delle card dell'approccio, nello stesso ordine di designSystem.approach.patterns
  const patternIcons = [Layers, SlidersHorizontal, Tag, Component, Figma];

  const patterns = designSystem.approach.patterns.map((p, i) => ({
    icon: patternIcons[i],
    title: p.title,
    text: p.text,
    demo: p.demo,
    // Solo le immagini che esistono davvero: senza file, la card resta di solo testo
    images: (p.images as readonly DesignSystemShotKey[]).filter((k) => shotsAvailable.includes(k)).map(shot),
  }));

  const keyDecisions = designSystem.keyDecisions.decisions;

  const learnings = designSystem.learnings.items;

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40" style={{ left: "calc(var(--band) + 1.5rem)" }}>
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 hover:text-ink-900 hover:border-blue transition-all"
        >
          <ArrowLeft size={20} />
          <span className="sr-only md:not-sr-only">{designSystem.backLink}</span>
        </Link>
      </div>

      {/* 1. Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            {designSystem.hero.breadcrumb}
          </p>

          <div className="mb-4">
            <span className="label-tag text-xs">
              {designSystem.hero.category}
            </span>
          </div>

          <h1 className="type-page-title text-ink-900 mb-4">
            <HighlightLastWords text={designSystem.hero.title} />
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            {designSystem.hero.subtitle}
          </p>

          <p className="text-lg text-gray-400 mb-4">
            {designSystem.hero.tagline}
          </p>

          <p className="text-xl text-gray-300 mb-8">
            <RichText
              text={designSystem.hero.description}
              boldClassName="text-ink-900 font-semibold"
              linkClassName="link-underline hover:text-ink-900"
            />
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            {designSystem.hero.tags.map((tag, i) => (
              <span key={i} className="px-4 py-2 glass rounded-full text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          <HeroVideo files={media} media={designSystem.heroMedia} placeholder={designSystem.heroPlaceholder} />
        </div>
      </section>

      {/* Intro Card (senza immagine) */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <GlassCard hover={false} className="p-8 md:p-12">
            <h2 className="type-work-title text-[var(--color-text-inverse)] mb-6">
              {designSystem.intro.title}
            </h2>
            <div className="space-y-4">
              {designSystem.intro.paragraphs.map((para, i) => (
                <p key={i} className="text-gray-300 leading-relaxed">
                  <RichText text={para} />
                </p>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 2–4. Challenge / Role / Scope */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title={designSystem.challenge.title}>
              {designSystem.challenge.text}
            </OverviewCard>

            <OverviewCard icon={User} title={designSystem.role.title}>
              <p className="font-semibold mb-2">{designSystem.role.summary}</p>
              <ul className="space-y-1">
                {designSystem.role.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard icon={Users} title={designSystem.scope.title}>
              <ul className="space-y-1">
                {designSystem.scope.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* 5. Approach */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(designSystem.approach.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">{designSystem.approach.title}</h2>
              <p className="text-gray-400 mt-2">
                {designSystem.approach.subtitle}
              </p>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            {patterns.map((p, i) =>
              p.images.length > 0 ? (
                <ImageTextCard
                  key={i}
                  images={p.images}
                  imagePosition="right"
                  onOpenGallery={open}
                  enlargeLabel={designSystem.approach.enlargeImageLabel}
                  enlargeText={designSystem.approach.enlarge}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <p.icon className="w-5 h-5 text-accent-icon" />
                    </div>
                    <h3 className="type-work text-xl text-ink-900">{p.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    <RichText text={p.text} linkClassName="link-underline hover:text-ink-900" />
                  </p>
                </ImageTextCard>
              ) : (
              <GlassCard key={i} hover={!p.demo} className={p.demo ? "!p-3 sm:!p-8" : ""}>
                <div className={`${p.demo ? "p-3 sm:p-6 flex-wrap" : "p-6"} flex flex-col md:flex-row gap-6`}>
                  <div className="w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <p.icon className="w-5 h-5 text-accent-icon" />
                      </div>
                      <h3 className="type-work text-xl text-ink-900">{p.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <RichText text={p.text} linkClassName="link-underline hover:text-ink-900" />
                    </p>
                  </div>
                  {p.demo && (
                    <div className="w-full pt-2">
                      <TokenDemoCard />
                    </div>
                  )}
                </div>
              </GlassCard>
              )
            )}
          </div>
        </div>
      </section>

      {/* 6. Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(designSystem.keyDecisions.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">{designSystem.keyDecisions.title}</h2>
              <p className="text-gray-400 mt-2">
                {designSystem.keyDecisions.subtitle}
              </p>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={keyDecisions} impactLabel={designSystem.keyDecisions.impactLabel} />
          </div>
        </div>
      </section>

      {/* 9. What I learned */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(designSystem.learnings.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">{designSystem.learnings.title}</h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            {learnings.map((l, i) => (
              <GlassCard key={i}>
                <div className="p-6">
                  <h3 className="type-work text-xl text-ink-900 mb-3">{l.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{l.text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="type-section-title text-ink-900 mb-4">{designSystem.cta.title}</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                {designSystem.cta.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105"
                >
                  <MessageSquare size={18} aria-hidden="true" />
                  {designSystem.cta.demo}
                </a>
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all"
                >
                  {designSystem.cta.allProjects}
                </Link>
                <CopyEmailLink className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all">
                  {designSystem.cta.talk}
                </CopyEmailLink>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
      {index !== null && (
        <Lightbox
          images={gallery}
          index={index}
          onClose={() => setIndex(null)}
          onPrev={() => setIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setIndex((i) => (i !== null && i < gallery.length - 1 ? i + 1 : i))}
        />
      )}
    </div>
  );
}
