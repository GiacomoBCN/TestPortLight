"use client";
import React from "react";
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
  Zap,
  CheckCircle,
  GitBranch,
  Layers,
  Wrench,
  Cloud,
  ServerCog,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import { getImagePath } from "@/utils/image";
import CopyEmailLink from "@/app/components/CopyEmailLink";
import RichText from "@/app/components/RichText";
import { backOffice } from "@/content/back-office";

export default function OnlineBackOfficeCaseStudy() {
  const keyDecisions = backOffice.keyDecisions.decisions;

  // Icone nello stesso ordine di backOffice.outcomes.achievements
  const achievementIcons = [Layers, Zap, CheckCircle];
  const achievements = backOffice.outcomes.achievements.map((a, i) => ({
    icon: achievementIcons[i],
    ...a,
  }));

  const rolloutImprovements = backOffice.operationalImprovements.rows;

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40" style={{ left: "calc(var(--band) + 1.5rem)" }}>
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 hover:text-ink-900 hover:border-blue transition-all"
        >
          <ArrowLeft size={20} />
          <span className="sr-only md:not-sr-only">{backOffice.backLink}</span>
        </Link>
      </div>

      {/* Hero */}
      {/* Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            {backOffice.hero.breadcrumb}
          </p>

          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-accent">
              {backOffice.hero.category}
            </span>
          </div>

          <h1 className="text-5xl font-bold text-ink-900 mb-4">
            {backOffice.hero.title}
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            {backOffice.hero.subtitle}
          </p>

          <p className="text-xl text-gray-300 mb-8">
            <RichText text={backOffice.hero.description} boldClassName="text-ink-900 font-semibold" />
          </p>

          <div className="flex flex-wrap gap-2">
            {backOffice.hero.tags.map((tag, i) => (
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
        image={getImagePath(backOffice.intro.image)}
        title={backOffice.intro.title}
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          <RichText text={backOffice.intro.paragraphs[0]} />
        </p>
        <p className="text-gray-300 leading-relaxed">
          {backOffice.intro.paragraphs[1]}
        </p>
        <p className="text-gray-300 leading-relaxed">
          {backOffice.intro.paragraphs[2]}
        </p>
      </ProjectIntroCard>

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title={backOffice.challenge.title}>
              {backOffice.challenge.text}
            </OverviewCard>
            <OverviewCard icon={User} title={backOffice.role.title}>
              <p className="font-semibold mb-2">
                {backOffice.role.summary}
              </p>
              <ul className="space-y-1 ">
                {backOffice.role.items.map((item, i) => (
                  <li key={i}><span aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard icon={TrendingUp} title={backOffice.impact.title}>
              <ul className="space-y-1">
                {backOffice.impact.items.map((item, i) => (
                  <li key={i}><span aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* Metrics Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-ink-900 mb-12 text-center">
            {backOffice.outcomes.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <GlassCard key={i}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <a.icon className="w-6 h-6 text-accent-icon" />
                  </div>
                  <div className="text-4xl font-bold text-ink-900 mb-2">
                    {a.metric}
                  </div>
                  <div className="text-sm font-semibold text-accent mb-2">
                    {a.label}
                  </div>
                  <div className="text-xs text-gray-400">{a.description}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery Slider */}
      <ProjectGallery
        title={backOffice.gallery.title}
        images={backOffice.gallery.images.map((im) => ({
          src: getImagePath(im.file),
          alt: im.alt,
        }))}
      />

      {/* Section 1: Business Context */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">
              {backOffice.businessContext.number}
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">
                {backOffice.businessContext.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24">
            <GlassCard>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {backOffice.businessContext.paragraphs[0]}
                </p>

                <p className="text-gray-300 leading-relaxed">
                  {backOffice.businessContext.paragraphs[1]}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {backOffice.businessContext.paragraphs[2]}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="text-gray-400 text-sm">
                    <div className="font-semibold text-accent mb-1">
                      {backOffice.businessContext.challenges.title}
                    </div>
                    <ul className="space-y-1">
                      {backOffice.businessContext.challenges.items.map((item, i) => (
                        <li key={i}><span aria-hidden="true">•</span> {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-gray-400 text-sm">
                    <div className="font-semibold text-accent mb-1">
                      {backOffice.businessContext.goals.title}
                    </div>
                    <ul className="space-y-1">
                      {backOffice.businessContext.goals.items.map((item, i) => (
                        <li key={i}><span aria-hidden="true">•</span> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Section 2: Problem & Hypothesis */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">
              {backOffice.problemHypothesis.number}
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">
                {backOffice.problemHypothesis.title}
              </h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard>
              <div className="p-6">
                {/* Styled header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink-900">
                    {backOffice.problemHypothesis.problem.title}
                  </h3>
                </div>

                {/* Your original list */}

                {backOffice.problemHypothesis.problem.items.map((item, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed">
                    <span aria-hidden="true">•</span> {item}
                  </p>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                {/* Styled header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-green-500/15 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink-900">
                    {backOffice.problemHypothesis.hypothesis.title}
                  </h3>
                </div>

                {/* Your original paragraph */}
                <p className="text-gray-300 leading-relaxed">
                  {backOffice.problemHypothesis.hypothesis.text}
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">
              {backOffice.keyDecisions.number}
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">
                {backOffice.keyDecisions.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={keyDecisions} />
          </div>
        </div>
      </section>

      {/* Section 4: The Solution */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">
              {backOffice.solution.number}
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">
                {backOffice.solution.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ink-900 mb-3">
                  {backOffice.solution.sharedAssets.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {backOffice.solution.sharedAssets.paragraphs[0]}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {backOffice.solution.sharedAssets.paragraphs[1]}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {backOffice.solution.sharedAssets.paragraphs[2]}
                </p>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ink-900 mb-3">
                  {backOffice.solution.gitPropagation.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {backOffice.solution.gitPropagation.paragraphs[0]}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {backOffice.solution.gitPropagation.paragraphs[1]}
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Interaction / Rollout Improvements */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">
              {backOffice.operationalImprovements.number}
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">
                {backOffice.operationalImprovements.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <GlassCard className="hidden lg:block">
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed mb-6">
                  {backOffice.operationalImprovements.intro}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-4 pr-4 text-accent font-semibold">
                          {backOffice.operationalImprovements.columns.task}
                        </th>
                        <th className="pb-4 pr-4 text-accent font-semibold">
                          {backOffice.operationalImprovements.columns.before}
                        </th>
                        <th className="pb-4 pr-4 text-accent font-semibold">
                          {backOffice.operationalImprovements.columns.after}
                        </th>
                        <th className="pb-4 text-accent font-semibold">
                          {backOffice.operationalImprovements.columns.improvement}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      {rolloutImprovements.map((item, i) => (
                        <tr key={i} className="border-b border-gray-800">
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
              </div>
            </GlassCard>

            {/* Mobile Card View - visible only on mobile (adopted from VoDCaseStudy.tsx) */}
            <GlassCard className="lg:hidden">
              <div className="space-y-4">
                {rolloutImprovements.map((item, index) => (
                  <div
                    key={index}
                    className="bg-ink-900/[0.05] border border-ink-900/10 rounded-lg p-4"
                  >
                    <h3 className="text-ink-900 font-semibold text-base mb-4">
                      {item.task}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide">
                          {backOffice.operationalImprovements.columns.before}
                        </div>
                        <div className="text-gray-300 text-sm font-semibold">
                          {item.before}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide">
                          {backOffice.operationalImprovements.columns.after}
                        </div>
                        <div className="text-gray-300 text-sm font-semibold">
                          {item.after}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-ink-900/10">
                        <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide">
                          {backOffice.operationalImprovements.columns.improvement}
                        </div>
                        <div className="text-green-400 text-base font-bold">
                          {item.improvement}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Outcomes & Deliverables */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">
              {backOffice.deliverables.number}
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">
                {backOffice.deliverables.title}
              </h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-accent mb-3">
                    {backOffice.deliverables.frontEnd.title}
                  </h3>
                  <ul className="space-y-1 text-gray-400 text-sm">
                    {backOffice.deliverables.frontEnd.items.map((item, i) => (
                      <li key={i}><span aria-hidden="true">•</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-accent mb-3">
                    {backOffice.deliverables.process.title}
                  </h3>
                  <ul className="space-y-1 text-gray-400 text-sm">
                    {backOffice.deliverables.process.items.map((item, i) => (
                      <li key={i}><span aria-hidden="true">•</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>

            <GlassCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-accent mb-3">
                  {backOffice.deliverables.results.title}
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  {backOffice.deliverables.results.items.map((item, i) => (
                    <li key={i}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>

        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <GlassCard>
              <div className="text-center py-8">
                <h2 className="text-3xl font-bold text-ink-900 mb-4">
                  {backOffice.cta.title}
                </h2>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                  {backOffice.cta.text}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={createPageUrl("ProductWork")}
                    className="px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105"
                  >
                    {backOffice.cta.allProjects}
                  </Link>
                  <CopyEmailLink className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all">
                  {backOffice.cta.talk}
                </CopyEmailLink>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </section>
    </div>
  );
}
