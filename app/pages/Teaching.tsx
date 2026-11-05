"use client";
import React from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { getImagePath } from "@/utils/image";
import ExpandableText from "@/Components/ExpandableText";
import GlassCard from "@/Components/portfolio/GlassCard";
import SectionHeader from "@/Components/portfolio/SectionHeader";
import { teaching } from "@/content/teaching";

export default function Teaching() {
  const courses = teaching.courses.list.map((course) => ({
    ...course,
    image: getImagePath(course.image),
  }));

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      {/* Su telefono la hero riempie lo schermo (meno la nav), cosi' la card sotto non si vede a meta' */}
      <section className="min-h-[calc(100svh-5rem)] md:min-h-[70vh] flex items-center justify-center relative px-6 pt-20 pb-24 md:pb-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-transparent rounded-full opacity-10 blur-3xl"></div>
        </div>

        {/* Entrata della hero in CSS: parte al primo paint, senza aspettare il JS */}
        <div className="hero-in hero-in-container max-w-4xl mx-auto text-center relative z-10">
          <div className="hero-in hero-in-fade mb-6" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block text-[var(--color-text-teaching)] text-base md:text-lg uppercase tracking-[0.2em] font-semibold">
              {teaching.hero.eyebrow}
            </span>
          </div>

          <h1
            className="hero-in text-5xl md:text-6xl font-bold text-ink-900 mb-6"
            style={{ animationDelay: "0.3s" }}
          >
            {teaching.hero.title}
          </h1>

          <p
            style={{ animationDelay: "0.4s" }}
            className="hero-in text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {teaching.hero.description}
          </p>
        </div>

        {/* Freccia verso la sezione sotto, come in home */}
        <a
          href="#teaching-overview"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex justify-center animate-bounce motion-reduce:animate-none"
          aria-label={teaching.hero.scrollLabel}
        >
          <ChevronDown size={32} className="text-[var(--color-icon-accent)] glow-blue" aria-hidden="true" />
        </a>
      </section>

      {/* Overview Stats */}
      <section id="teaching-overview" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Teaching Stats */}
            <GlassCard>
              <h2 className="text-2xl font-bold text-ink-900 mb-6">
                {teaching.experience.title}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
                  >
                    <GraduationCap size={24} className="text-[var(--color-text-teaching)]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--color-text-teaching)]">
                      {teaching.experience.stats[0].value}
                    </div>
                    <div className="text-sm text-slate-400">
                      {teaching.experience.stats[0].label}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
                  >
                    <Users size={24} className="text-[var(--color-text-teaching)]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--color-text-teaching)]">
                      {teaching.experience.stats[1].value}
                    </div>
                    <div className="text-sm text-slate-400">
                      {teaching.experience.stats[1].label}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
                  >
                    <BookOpen size={24} className="text-[var(--color-text-teaching)]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--color-text-teaching)]">{teaching.experience.stats[2].value}</div>
                    <div className="text-sm text-slate-400">
                      {teaching.experience.stats[2].label}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
                  >
                    <TrendingUp size={24} className="text-[var(--color-text-teaching)]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--color-text-teaching)]">
                      {teaching.experience.stats[3].value}
                    </div>
                    <div className="text-sm text-slate-400">
                      {teaching.experience.stats[3].label}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Right: Quick Facts */}
            <GlassCard delay={0.1}>
              <h2 className="text-2xl font-bold text-ink-900 mb-6">
                {teaching.approach.title}
              </h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-[rgba(7,9,11,0.10)]">
                  <h3 className="font-semibold text-ink-900 mb-2">
                    {teaching.approach.items[0].title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {teaching.approach.items[0].text}
                  </p>
                </div>

                <div className="pb-4 border-b border-[rgba(7,9,11,0.10)]">
                  <h3 className="font-semibold text-ink-900 mb-2">
                    {teaching.approach.items[1].title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {teaching.approach.items[1].text}
                  </p>
                </div>

                <div className="pb-4 border-b border-[rgba(7,9,11,0.10)]">
                  <h3 className="font-semibold text-ink-900 mb-2">
                    {teaching.approach.items[2].title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {teaching.approach.items[2].text}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-ink-900 mb-2">
                    {teaching.approach.items[3].title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {teaching.approach.items[3].text}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title={teaching.courses.title}
            subtitle={teaching.courses.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <GlassCard key={index} delay={index * 0.1}>
                <div className="mb-4">
                  <div className="mb-6 -mx-6 -mt-6 overflow-hidden rounded-t-xl">
                    <div className="relative aspect-video overflow-hidden group/image">
                      <Image
                        src={course.image}
                        alt={course.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#F4F5F6] via-transparent to-transparent opacity-60"></div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-ink-900 mb-2">
                    {course.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-teaching)]">{course.program}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-ink-900 mb-3 uppercase tracking-wider">
                    {teaching.courses.topicsLabel}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs glass rounded-full border border-[rgba(7,9,11,0.12)] text-slate-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-ink-900 mb-3 uppercase tracking-wider">
                    {teaching.courses.outcomesLabel}
                  </h4>
                  <ul className="space-y-2">
                    {course.outcomes.map((outcome, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-300 text-sm"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[var(--teaching-accent-border)] mt-1.5 flex-shrink-0"
                          style={{
                            boxShadow: "0 0 8px rgba(245, 195, 59, 0.5)",
                          }}
                        ></span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-ink-900 mb-3 uppercase tracking-wider">
                    {teaching.courses.toolsLabel}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs glass rounded-full border border-[var(--teaching-accent-border)] text-[var(--color-text-teaching)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title={teaching.philosophy.title} />

          <GlassCard>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {teaching.philosophy.paragraphs[0]}
              </p>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {teaching.philosophy.paragraphs[1]}
              </p>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {teaching.philosophy.paragraphs[2]}
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Research Background */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title={teaching.research.title} />

          <GlassCard>
            <div className="flex items-start gap-6">
              <div
                className="w-16 h-16 glass rounded-full flex items-center justify-center flex-shrink-0 hidden md:flex"
                style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
              >
                <Award size={32} className="text-[var(--color-text-teaching)]" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-ink-900 mb-2">
                  {teaching.research.degree}
                </h3>
                <p className="text-slate-300 mb-4">
                  {teaching.research.institution}
                </p>

                <div className="space-y-4 mt-6">
                  <div>
                    <h4 className="font-semibold text-ink-900 mb-2">
                      {teaching.research.focus.title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {teaching.research.focus.paragraphs[0]}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {teaching.research.focus.paragraphs[1]}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink-900 mb-2">
                      {teaching.research.practice.title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {teaching.research.practice.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
