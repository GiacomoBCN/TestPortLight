"use client";
import React from "react";
import Image from "next/image";
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
import CopyEmailLink from "@/app/components/CopyEmailLink";
import { dowJones } from "@/content/dow-jones";
import SectionNumber from "../components/casestudy/SectionNumber";

export default function DowJones() {
  // Icone delle metriche "Team Adoption & Scale", stesso ordine di dowJones.teamAdoption.metrics
  const teamAdoptionIcons = [Users, Code, Target, Layers, GitBranch, CheckCircle];
  const teamAdoptionMetrics = dowJones.teamAdoption.metrics.map((metric, index) => ({
    icon: teamAdoptionIcons[index],
    ...metric,
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
          <span className="sr-only md:not-sr-only">{dowJones.backLink}</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            {dowJones.hero.breadcrumb}
          </p>
          <div className="mb-4">
            <span className="label-tag text-xs">
              {dowJones.hero.category}
            </span>
          </div>
          <h1 className="type-page-title text-ink-900 mb-4">
            {dowJones.hero.title}
          </h1>
          <p className="text-lg text-gray-400 mb-4">
            {dowJones.hero.subtitle}
          </p>
          <p className="text-xl text-gray-300 mb-8">
            {dowJones.hero.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {dowJones.hero.tags.map((tag, i) => (
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
        image={getImagePath(dowJones.intro.image)}
        title={dowJones.intro.title}
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          {dowJones.intro.paragraphs[0]}
        </p>
        <p className="text-gray-300 leading-relaxed">
          {dowJones.intro.paragraphs[1]}
        </p>

        <p className="text-gray-300 leading-relaxed">
          {dowJones.intro.paragraphs[2]}
        </p>
      </ProjectIntroCard>

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title={dowJones.challenge.title}>
              {dowJones.challenge.text}
            </OverviewCard>

            <OverviewCard icon={User} title={dowJones.role.title}>
              <p className="font-semibold mb-2">{dowJones.role.summary}</p>
              <ul className="space-y-1">
                {dowJones.role.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span>{` ${item}`}</li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard icon={GitBranch} title={dowJones.scope.title}>
              {dowJones.scope.text}
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* Team Adoption & Scale */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="type-section-title text-ink-900 mb-4 text-center">
            {dowJones.teamAdoption.title}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {dowJones.teamAdoption.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamAdoptionMetrics.map((metric, index) => (
              <GlassCard key={index}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <metric.icon className="w-6 h-6 text-accent-icon" />
                  </div>
                  <div className="text-4xl type-number text-ink-900 mb-2">
                    {metric.metric}
                  </div>
                  <div className="text-sm font-semibold text-accent mb-2">
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
        title={dowJones.gallery.title}
        images={dowJones.gallery.images.map((image) => ({
          src: getImagePath(image.file),
          alt: image.alt,
        }))}
      />

      {/* Section 1: Business Context */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(dowJones.businessContext.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {dowJones.businessContext.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-xl text-ink-900 mb-3">
                  {dowJones.businessContext.card.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {dowJones.businessContext.card.paragraphs[0]}
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {dowJones.businessContext.card.paragraphs[1]}
                </p>
                <p className="text-gray-400 mb-2">{dowJones.businessContext.card.needsLabel}</p>
                <ul className="space-y-2 text-gray-400">
                  {dowJones.businessContext.card.needs.map((item, i) => (
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

      {/* Section 2: Governance & Architecture */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(dowJones.governance.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {dowJones.governance.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            {/* Card 1: Token-First */}

            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-xl text-ink-900 mb-3">
                  {dowJones.governance.tokenFirst.title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-4">
                  {dowJones.governance.tokenFirst.paragraphs[0]}
                </p>

                <p className="text-gray-300 leading-relaxed mb-4">
                  {dowJones.governance.tokenFirst.paragraphs[1]}
                </p>

                <p className="text-gray-300 leading-relaxed mb-4">
                  {dowJones.governance.tokenFirst.paragraphs[2]}
                </p>

                <p className="text-gray-400 mb-2">{dowJones.governance.tokenFirst.enabledLabel}</p>
                <ul className="space-y-2 text-gray-400">
                  {dowJones.governance.tokenFirst.enabled.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-list-bullet)] mt-1" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-300 leading-relaxed mt-4">
                  {dowJones.governance.tokenFirst.conclusion}
                </p>
              </div>
            </GlassCard>

            {/* Card 2: Repository Overhaul */}
            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-xl text-ink-900 mb-3">
                  {dowJones.governance.repository.title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-4">
                  {dowJones.governance.repository.paragraphs[0]}
                </p>

                <p className="text-gray-300 leading-relaxed mb-4">
                  {dowJones.governance.repository.paragraphs[1]}
                </p>

                <p className="text-gray-400 mb-2">{dowJones.governance.repository.resultsLabel}</p>
                <ul className="space-y-2 text-gray-400">
                  {dowJones.governance.repository.results.map((item, i) => (
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

      {/* Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(dowJones.keyDecisions.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {dowJones.keyDecisions.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={dowJones.keyDecisions.decisions} />
          </div>
        </div>
      </section>

      {/* Collaboration & Process */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(dowJones.collaboration.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {dowJones.collaboration.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-xl text-ink-900 mb-3">
                  {dowJones.collaboration.partnership.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {dowJones.collaboration.partnership.text}
                </p>
                <p className="text-gray-400 mb-2">{dowJones.collaboration.partnership.listLabel}</p>
                <ul className="space-y-2 text-gray-400">
                  {dowJones.collaboration.partnership.items.map((item, i) => (
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
                  {dowJones.collaboration.accessibility.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {dowJones.collaboration.accessibility.text}
                </p>
                <p className="text-gray-400 mb-2">{dowJones.collaboration.accessibility.listLabel}</p>
                <ul className="space-y-2 text-gray-400">
                  {dowJones.collaboration.accessibility.items.map((item, i) => (
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
                  {dowJones.collaboration.aiWorkflow.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {dowJones.collaboration.aiWorkflow.text}
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(dowJones.outcomes.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">
                {dowJones.outcomes.title}
              </h2>
              <p className="text-gray-400 mt-2">
                {dowJones.outcomes.subtitle}
              </p>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <p className="text-gray-300 leading-relaxed">
              {dowJones.outcomes.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <div className="text-4xl type-number text-ink-900 mb-2">
                    {dowJones.outcomes.productivity.value}
                  </div>
                  <h3 className="type-work text-lg text-ink-900 mb-3">
                    {dowJones.outcomes.productivity.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {dowJones.outcomes.productivity.text}
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    {dowJones.outcomes.productivity.listLabel}
                  </p>
                  <ul className="space-y-1 text-gray-400 text-sm">
                    {dowJones.outcomes.productivity.items.map((item, i) => (
                      <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span>{` ${item}`}</li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="p-6">
                  <div className="text-4xl type-number text-ink-900 mb-2">
                    {dowJones.outcomes.complexity.value}
                  </div>
                  <h3 className="type-work text-lg text-ink-900 mb-3">
                    {dowJones.outcomes.complexity.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4">
                    {dowJones.outcomes.complexity.text}
                  </p>

                  <p className="text-gray-400 text-sm mb-2">{dowJones.outcomes.complexity.listLabel}</p>
                  <ul className="space-y-1 text-gray-400 text-sm">
                    {dowJones.outcomes.complexity.items.map((item, i) => (
                      <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span>{` ${item}`}</li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>

            <GlassCard>
              <div className="p-6">
                <h3 className="type-work text-lg text-ink-900 mb-3">
                  {dowJones.outcomes.wcag.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {dowJones.outcomes.wcag.text}
                </p>
              </div>
            </GlassCard>
          </div>
          {/* IMAGE 5: Multi-platform, multi-brand scale */}
          <div className="mt-8 rounded-lg overflow-hidden relative w-full aspect-video">
            <Image
              src={getImagePath(dowJones.outcomes.image.file)}
              alt={dowJones.outcomes.image.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <p className="text-sm text-gray-400 mt-3 text-center">
              {dowJones.outcomes.image.caption}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="type-section-title text-ink-900 mb-4">
                {dowJones.cta.title}
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                {dowJones.cta.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105"
                >
                  {dowJones.cta.primary}
                </Link>
                <CopyEmailLink className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all">
                  {dowJones.cta.secondary}
                </CopyEmailLink>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
