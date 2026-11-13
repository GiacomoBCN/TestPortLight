import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createPageUrl } from "@/utils";
import { getImagePath } from "@/utils/image";
import { ChevronDown } from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "../components/portfolio/SectionHeader";
import SectionNumber from "../components/casestudy/SectionNumber";
import ProjectCard from "../components/portfolio/ProjectCard";
import TestimonialSphere from "../components/TestimonialSphere";
import CopyEmailLink from "../components/CopyEmailLink";
import SketchFrame from "../components/SketchFrame";
import { home } from "@/content/home";

const { hero, featuredWork, about, testimonials, cta } = home;

export default function Home() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="overflow-hidden">
      {/* Hero Section. "hero-glow" = luce calda dall'angolo in alto a destra (globals.css):
          togliendo la classe l'hero torna com'era. */}
      <section className="hero-glow min-h-[85vh] md:min-h-screen flex items-center justify-center relative px-6 pt-12 md:pt-0">
        {/* Luci e fasci di hero-glow: solo decorativi, senza la classe hero-glow non mostrano nulla */}
        <div className="hero-glow-layer absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="hero-glow-streak" />
          <span className="hero-glow-streak" />
        </div>
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
            <span className="label-tag text-base md:text-lg">
              {/* Mobile: una qualifica per riga, senza puntino. Da md in su: una riga sola */}
              <span className="block md:inline">{hero.titleLines[0]}</span>
              <span className="hidden md:inline" aria-hidden="true"> · </span>
              <span className="block md:inline">{hero.titleLines[1]}</span>
            </span>
          </div>

          <h1
            className="hero-in type-home-title text-[var(--color-text-inverse)] mb-6"
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
              className="px-8 py-4 glass rounded-xl text-[var(--button-secondary-text)] hover:text-[var(--color-text-inverse)] font-semibold hover:bg-[var(--color-surface-interactive-hover)] active:bg-[var(--color-surface-interactive-hover)] active:text-[var(--color-text-inverse)] active:border-[var(--color-border-interactive)] hover:border-[var(--color-border-interactive)] transition-all duration-200 hover:scale-105"
            >
              {hero.teachingCta}
            </Link>
          </div>

          <motion.a
            href="#work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              // con prefers-reduced-motion la freccia compare e resta ferma
              repeat: reduceMotion ? 0 : Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
            className="flex justify-center cursor-pointer py-1.5 -my-1.5"
            aria-label={hero.scrollCueLabel}
          >
            <ChevronDown size={32} className="text-[var(--color-icon-accent)] glow-blue" aria-hidden="true" />
          </motion.a>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={featuredWork.title} className="mb-8" />

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

      {/* About Section (id="about": link del menu /#about) */}
      <section id="about" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-surface-interactive-default)]/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader title={about.title} />

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
                  src={getImagePath(about.portrait.image)}
                  alt={about.portrait.alt}
                  width={480}
                  height={640}
                  className="object-cover w-full h-auto grayscale"
                />
              </div>
            </motion.div>

            {/* Testo, regole, competenze */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <p className="text-lg md:text-xl text-[var(--color-text-primary)] leading-relaxed">
                {about.intro}
              </p>

              <div>
                <h3 className="type-work text-xl text-[var(--color-text-inverse)] mb-4">
                  {about.rulesTitle}
                </h3>
                <ol className="space-y-3">
                  {about.rules.map((rule, i) => (
                    <li key={i} className="flex items-baseline gap-4 text-lg text-[var(--color-text-primary)] leading-relaxed">
                      <SectionNumber n={i + 1} size="sm" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <ul className="flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <li key={skill} className="label-tag text-xs">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={testimonials.title} />
          <TestimonialSphere
            items={testimonials.items}
            pause={testimonials.pause}
            play={testimonials.play}
            showQuoteFrom={testimonials.showQuoteFrom}
            readFull={testimonials.readFull}
            seeOnLinkedIn={testimonials.seeOnLinkedIn}
            linkedInUrl={testimonials.linkedInUrl}
          />
        </div>
      </section>

      {/* Chiusura: una banda con il titolo a sinistra e "Let's talk" a destra.
          "Let's talk" e' lo stesso componente di Contact: apre la posta e copia l'indirizzo ("Email copied").
          Su mobile il titolo resta in alto a sinistra e il bottone va in basso a destra. */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass sketch rounded-2xl p-8 md:p-12 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <SketchFrame />
          <h2 className="type-section-title text-[var(--color-text-inverse)] md:max-w-xl">{cta.title}</h2>
          <div className="shrink-0 self-end md:self-auto">
            <CopyEmailLink className="px-8 py-4 bg-[var(--button-primary-background-default)] rounded-xl text-[var(--button-primary-text)] font-semibold hover:bg-[var(--button-primary-background-hover)] transition-all duration-200 glow-blue hover:scale-105">
              {cta.button}
            </CopyEmailLink>
          </div>
        </div>
      </section>
    </div>
  );
}
