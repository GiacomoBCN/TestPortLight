import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createPageUrl } from "@/utils";
import { getImagePath } from "@/utils/image";
import {
  ChevronDown,
  Layers,
  TrendingUp,
  GraduationCap,
  Users,
  Package,
  Zap,
  Code,
  Sparkles,
  Briefcase,
  MonitorCog,
  DraftingCompass,
  SquareDashedKanban,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "../components/portfolio/SectionHeader";
import MetricCard from "../components/portfolio/MetricCard";
import LeadershipCard from "../components/portfolio/LeadershipCard";
import ProjectCard from "../components/portfolio/ProjectCard";
import GlassCard from "../components/portfolio/GlassCard";
import ExpandableText from "../components/ExpandableText";
import BeforeAfterImpactCard from "../components/portfolio/BeforeAfterImpactCard";
import TestimonialCarousel from "../components/TestimonialCarousel";
import SketchFrame from "../components/SketchFrame";
import { home } from "@/content/home";

const { hero, impact, howILead, featuredWork, howIWork, testimonials, cta } = home;

export default function Home() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[85vh] md:min-h-screen flex items-center justify-center relative px-6 pt-12 md:pt-0">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(transparent 1px, transparent 1px), linear-gradient(90deg, transparent 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-transparent rounded-full opacity-10 blur-3xl"></div>
        </div>

        {/* Entrata della hero in CSS: parte al primo paint, senza aspettare il JS */}
        <div className="hero-in hero-in-container max-w-4xl mx-auto text-center relative z-10">
          <div className="hero-in hero-in-fade mb-3 md:mb-6" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block text-[var(--color-text-brand)] text-base md:text-lg uppercase tracking-[0.2em] font-semibold">
              {/* Mobile: una qualifica per riga, senza puntino. Da md in su: una riga sola */}
              <span className="block md:inline">{hero.titleLines[0]}</span>
              <span className="hidden md:inline" aria-hidden="true"> · </span>
              <span className="block md:inline">{hero.titleLines[1]}</span>
            </span>
          </div>

          <h1
            className="hero-in text-5xl md:text-7xl font-bold text-[var(--color-text-inverse)] mb-6"
            style={{ animationDelay: "0.3s" }}
          >
            {hero.name}
          </h1>

          <p
            style={{ animationDelay: "0.4s" }}
            className="hero-in text-xl md:text-2xl text-[var(--color-text-primary)] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {hero.intro}
          </p>

          <div
            style={{ animationDelay: "0.5s" }}
            className="hero-in flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="#work"
              className="px-8 py-4 bg-[var(--button-primary-background-default)] rounded-xl text-[var(--button-primary-text)] font-semibold hover:bg-[var(--button-primary-background-hover)] transition-all duration-200 glow-blue hover:scale-105"
            >
              {hero.productWorkCta}
            </a>
            <Link
              href={createPageUrl("Teaching")}
              className="px-8 py-4 glass rounded-xl text-[var(--button-secondary-text)] hover:text-[var(--color-text-inverse)] font-semibold hover:bg-[var(--teaching-accent-border)] active:bg-[var(--teaching-accent-border)] active:text-[var(--color-text-inverse)] active:border-[var(--teaching-accent-border)] hover:border-[var(--teaching-accent-border)] transition-all duration-200 hover:scale-105"
            >
              {hero.teachingCta}
            </Link>
          </div>

          <motion.a
            href="#impact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              // con prefers-reduced-motion la freccia compare e resta ferma
              repeat: reduceMotion ? 0 : Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
            className="flex justify-center cursor-pointer"
            aria-label={hero.scrollCueLabel}
          >
            <ChevronDown size={32} className="text-[var(--color-icon-accent)] glow-blue" aria-hidden="true" />
          </motion.a>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section id="impact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title={impact.title}
            subtitle={impact.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BeforeAfterImpactCard
              icon={MonitorCog}
              headline={impact.cards.dowJones.headline}
              subHeadline={impact.cards.dowJones.subHeadline}
              before={impact.cards.dowJones.before}
              after={impact.cards.dowJones.after}
              impact={impact.cards.dowJones.impact}
              delay={0}
            />
            <BeforeAfterImpactCard
              icon={TrendingUp}
              headline={impact.cards.vod.headline}
              subHeadline={impact.cards.vod.subHeadline}
              before={impact.cards.vod.before}
              after={impact.cards.vod.after}
              impact={impact.cards.vod.impact}
              delay={0.1}
            />
            <BeforeAfterImpactCard
              icon={GraduationCap}
              headline={impact.cards.teaching.headline}
              subHeadline={impact.cards.teaching.subHeadline}
              before={impact.cards.teaching.before}
              after={impact.cards.teaching.after}
              impact={impact.cards.teaching.impact}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* How I Lead Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title={howILead.title}
            subtitle={howILead.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LeadershipCard
              icon={Users}
              title={howILead.cards.people.title}
              points={howILead.cards.people.points}
              delay={0}
            />
            <LeadershipCard
              icon={Package}
              title={howILead.cards.product.title}
              points={howILead.cards.product.points}
              delay={0.1}
            />
            <LeadershipCard
              icon={Zap}
              title={howILead.cards.strategy.title}
              points={howILead.cards.strategy.points}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title={featuredWork.title}
            subtitle={featuredWork.subtitle}
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              compact
              role={featuredWork.projects.dowJones.role}
              title={featuredWork.projects.dowJones.title}
              company={featuredWork.projects.dowJones.company}
              timeframe={featuredWork.projects.dowJones.timeframe}
              description={featuredWork.projects.dowJones.description}
              image={getImagePath(featuredWork.projects.dowJones.image)}
              imageFit="contain"
              imageBg="#ffffff"
              metrics={featuredWork.projects.dowJones.metrics}
              link={createPageUrl("DowJones")}
              delay={0}
            />

            <ProjectCard
              compact
              role={featuredWork.projects.designSystem.role}
              title={featuredWork.projects.designSystem.title}
              company={featuredWork.projects.designSystem.company}
              timeframe={featuredWork.projects.designSystem.timeframe}
              description={featuredWork.projects.designSystem.description}
              video={featuredWork.projects.designSystem.video}
              videoLabels={featuredWork.videoLabels}
              metrics={featuredWork.projects.designSystem.metrics}
              link={createPageUrl("DesignSystem")}
              delay={0.1}
            />

            <ProjectCard
              compact
              role={featuredWork.projects.aiProduct.role}
              title={featuredWork.projects.aiProduct.title}
              company={featuredWork.projects.aiProduct.company}
              timeframe={featuredWork.projects.aiProduct.timeframe}
              description={featuredWork.projects.aiProduct.description}
              video={featuredWork.projects.aiProduct.video}
              videoLabels={featuredWork.videoLabels}
              metrics={featuredWork.projects.aiProduct.metrics}
              link={createPageUrl("AiProduct")}
              delay={0.2}
            />

            <ProjectCard
              compact
              role={featuredWork.projects.falak.role}
              title={featuredWork.projects.falak.title}
              company={featuredWork.projects.falak.company}
              timeframe={featuredWork.projects.falak.timeframe}
              description={featuredWork.projects.falak.description}
              image={getImagePath(featuredWork.projects.falak.image)}
              imageFit="contain"
              imageBg="#eaece9"
              metrics={featuredWork.projects.falak.metrics}
              link={createPageUrl("Falak")}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* How I Work Section (updated layout with portrait) */}
      <section id="about" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-surface-interactive-default)]/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
            title={howIWork.title}
            subtitle={howIWork.subtitle}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="overflow-hidden rounded-2xl ring-1 ring-ink-900/10 shadow-2xl max-w-sm">
                <Image
                  src={getImagePath(howIWork.portrait.image)}
                  alt={howIWork.portrait.alt}
                  width={480}
                  height={640}
                  className="object-cover w-full h-auto grayscale"
                />
              </div>
            </motion.div>

            {/* Cards + Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <GlassCard hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 glow-blue">
                      <DraftingCompass size={24} className="text-[var(--color-icon-accent)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-inverse)] mb-2">
                        {howIWork.cards.productDesign.title}
                      </h3>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                        {howIWork.cards.productDesign.tools}
                      </p>
                      <p className="text-sm text-[var(--color-text-tertiary)]">
                        {howIWork.cards.productDesign.text}
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard hover={false} delay={0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 glow-blue">
                      <SquareDashedKanban
                        size={24}
                        className="text-[var(--color-icon-accent)]"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-inverse)] mb-2">
                        {howIWork.cards.productStrategy.title}
                      </h3>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                        {howIWork.cards.productStrategy.tools}
                      </p>
                      <p className="text-sm text-[var(--color-text-tertiary)]">
                        {howIWork.cards.productStrategy.text}
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 glow-blue">
                      <Code size={24} className="text-[var(--color-icon-accent)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-inverse)] mb-2">
                        {howIWork.cards.frontEnd.title}
                      </h3>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                        {howIWork.cards.frontEnd.tools}
                      </p>
                      <p className="text-sm text-[var(--color-text-tertiary)]">
                        {howIWork.cards.frontEnd.text}
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard hover={false} delay={0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 glow-blue">
                      <Sparkles size={24} className="text-[var(--color-icon-accent)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-inverse)] mb-2">{howIWork.cards.aiNative.title}
                      </h3>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                        {howIWork.cards.aiNative.tools}
                      </p>
                      <p className="text-sm text-[var(--color-text-tertiary)]">
                        {howIWork.cards.aiNative.text}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
              <GlassCard hover={false} delay={0.1}>
                <p className="text-lg text-[var(--color-text-primary)] leading-relaxed ">
                  {howIWork.summary}
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={testimonials.title} />
          <TestimonialCarousel testimonials={testimonials.items} />
        </div>
      </section>

      {/* Dual Path CTA Section */}
      <section className="py-24 px-6">
        {/* Due box separate, ognuna con la sua cornice */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product & Design Leadership */}
            <div className="glass sketch rounded-2xl p-8 md:p-10 relative group hover:bg-[rgba(245,195,59,0.1)] transition-all duration-300">
              <SketchFrame />
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-br from-[var(--color-surface-interactive-default)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 glass rounded-full flex items-center justify-center mb-5 glow-blue">
                  <Briefcase size={28} className="text-[var(--color-icon-accent)]" />
                </div>
                <h3 className="text-2xl md:text-[1.75rem] font-bold text-[var(--color-text-inverse)] mb-3">
                  {cta.productLeadership.title}
                </h3>
                <p className="text-[var(--color-text-primary)] mb-6 leading-relaxed">
                  {cta.productLeadership.text}
                </p>
                <Link
                  href={createPageUrl("ProductWork")}
                  className="inline-block px-7 py-3.5 bg-[var(--button-primary-background-default)] rounded-xl text-[var(--button-primary-text)] font-semibold hover:bg-[var(--button-primary-background-hover)] transition-all duration-200 glow-blue hover:scale-105"
                >
                  {cta.productLeadership.button}
                </Link>
              </div>
            </div>

            {/* Teaching & Research */}
            <div className="glass sketch rounded-2xl p-8 md:p-10 relative group hover:bg-[rgba(245,195,59,0.1)] transition-all duration-300">
              <SketchFrame />
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-br from-[var(--teaching-accent-border)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 glass rounded-full flex items-center justify-center mb-5"
                  style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
                >
                  <GraduationCap size={28} className="text-[var(--color-text-teaching)]" />
                </div>
                <h3 className="text-2xl md:text-[1.75rem] font-bold text-[var(--color-text-inverse)] mb-3">
                  {cta.teaching.title}
                </h3>
                <p className="text-[var(--color-text-primary)] mb-6 leading-relaxed">
                  {cta.teaching.text}
                </p>
                <Link
                  href={createPageUrl("Teaching")}
                  className="inline-block px-7 py-3.5 glass rounded-xl text-[var(--button-secondary-text)] hover:text-[var(--color-text-inverse)] font-semibold border-2 border-[var(--teaching-accent-border)] hover:bg-[var(--teaching-accent-border)] active:bg-[var(--teaching-accent-border)] active:text-[var(--color-text-inverse)] active:border-[var(--teaching-accent-border)] transition-all duration-200 hover:scale-105"
                >
                  {cta.teaching.button}{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
