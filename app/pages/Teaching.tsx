"use client";
import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { createPageUrl } from "@/utils";
import { getImagePath } from "@/utils/image";
import GlassCard from "@/Components/portfolio/GlassCard";
import SectionHeader from "@/Components/portfolio/SectionHeader";
import CopyEmailLink from "@/app/components/CopyEmailLink";
import RichText from "@/app/components/RichText";
import { teaching } from "@/content/teaching";

// Grassetti dei testi: stesso inchiostro dei titoli
const BOLD = "text-ink-900 font-semibold";

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
            <span className="label-tag text-base md:text-lg">{teaching.hero.eyebrow}</span>
          </div>

          <h1 className="hero-in type-page-title text-ink-900 mb-6" style={{ animationDelay: "0.3s" }}>
            {teaching.hero.title}
          </h1>

          <p
            style={{ animationDelay: "0.4s" }}
            className="hero-in text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            <RichText text={teaching.hero.description} boldClassName={BOLD} />
          </p>

          {/* Numeri, in una riga */}
          <p style={{ animationDelay: "0.5s" }} className="hero-in text-gray-400 mb-8 max-w-3xl mx-auto">
            {teaching.hero.numbers}
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

      {/* How a session works */}
      <section id="teaching-overview" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title={teaching.session.title} />
          <GlassCard>
            <p className="text-lg text-slate-300 leading-relaxed">
              <RichText text={teaching.session.text} boldClassName={BOLD} />
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Courses */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={teaching.courses.title} subtitle={teaching.courses.subtitle} />

          {/* Tre corsi sulla stessa riga da 1024px; sotto, uno sotto l'altro (mai una card da sola) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

                  <h3 className="type-work-title text-ink-900 mb-2">{course.name}</h3>
                  <p className="text-sm text-[var(--color-text-tertiary)]">{course.program}</p>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  <RichText text={course.text} boldClassName={BOLD} />
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Research Background */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={teaching.research.title} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teaching.research.blocks.map((block, i) => (
              <GlassCard key={i} delay={i * 0.1}>
                <h3 className="type-work text-xl text-ink-900 mb-3">{block.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  <RichText text={block.text} boldClassName={BOLD} />
                </p>
                {"link" in block && block.link && (
                  <p className="mt-4">
                    <Link href={createPageUrl("Falak")} className="font-medium text-[var(--color-text-link-default)] link-underline">
                      {block.link}
                    </Link>
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Chiusura: solo il bottone email, come nella home */}
      <section className="py-24 px-6">
        <div className="flex justify-center">
          <CopyEmailLink className="px-8 py-4 bg-[var(--button-primary-background-default)] rounded-xl text-[var(--button-primary-text)] font-semibold hover:bg-[var(--button-primary-background-hover)] transition-all duration-200 glow-blue hover:scale-105">
            {teaching.closing.button}
          </CopyEmailLink>
        </div>
      </section>
    </div>
  );
}
