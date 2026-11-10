"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  GraduationCap,
  Users,
  BookOpen,
  UsersRound,
  TrendingUp,
  Languages,
} from "lucide-react";
import { createPageUrl } from "@/utils";
import { getImagePath } from "@/utils/image";
import GlassCard from "@/Components/portfolio/GlassCard";
import SectionHeader from "@/Components/portfolio/SectionHeader";
import CopyEmailLink from "@/app/components/CopyEmailLink";
import RichText from "@/app/components/RichText";
import { teaching } from "@/content/teaching";

// Grassetti dei testi: stesso inchiostro dei titoli
const BOLD = "text-ink-900 font-semibold";

// Icone delle card con i numeri, nello stesso ordine di teaching.stats
const statIcons = [GraduationCap, Users, BookOpen, UsersRound, TrendingUp, Languages];

export default function Teaching() {
  const courses = teaching.courses.list.map((course) => ({
    ...course,
    image: getImagePath(course.image),
  }));

  return (
    <div className="overflow-hidden">
      {/* Hero: occupa la prima schermata (meno la nav) a ogni larghezza, cosi' la sezione dopo inizia sotto,
          non a meta'. pb lascia spazio alla freccia, che non si sovrappone mai al testo. */}
      <section className="min-h-[calc(100svh-5rem)] flex items-center justify-center relative px-6 pt-16 pb-28">
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
            className="hero-in text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            <RichText text={teaching.hero.description} boldClassName={BOLD} />
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

      {/* Card con i numeri */}
      {/* Stesso markup delle card dei numeri delle altre pagine (es. SGPV, Project Impact Snapshot) */}
      <section id="teaching-overview" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teaching.stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <GlassCard key={i}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent-icon" aria-hidden="true" />
                  </div>
                  <div className="text-4xl font-bold text-ink-900 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-accent">{stat.label}</div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title={teaching.philosophy.title} />
          <GlassCard>
            <p className="text-lg text-slate-300 leading-relaxed">
              <RichText text={teaching.philosophy.text} boldClassName={BOLD} />
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Courses */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={teaching.courses.title} />

          {/* Tre corsi sulla stessa riga da 1024px; sotto, uno sotto l'altro (mai una card da sola).
              Da 1024px ogni card usa le righe della griglia comune (subgrid): immagine, titolo, programma,
              Format, testo e Topics hanno la stessa altezza nelle tre card, e Topics resta in fondo. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-y-0">
            {courses.map((course, index) => (
              <GlassCard key={index} delay={index * 0.1} className="lg:grid lg:grid-rows-subgrid lg:row-span-6">
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
                  <p className="text-sm text-[var(--color-text-tertiary)] mb-4">{course.program}</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    <span className="type-label text-ink-900">{teaching.courses.formatLabel}</span> {course.format}
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    <RichText text={course.text} boldClassName={BOLD} />
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed pt-4 border-t border-[var(--color-border-default)]">
                    <span className="type-label text-ink-900">{teaching.courses.topicsLabel}</span> {course.topics}
                  </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Research Background: due box affiancati */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={teaching.research.title} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teaching.research.blocks.map((block, i) => (
              <GlassCard key={i} delay={i * 0.1}>
                <h3 className="type-work text-xl text-ink-900 mb-3">{block.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  <RichText text={block.text} boldClassName={BOLD} />
                </p>
                {block.link && (
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

      {/* Beyond the classroom */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title={teaching.beyond.title} />
          <GlassCard>
            <p className="text-lg text-slate-300 leading-relaxed">
              <RichText text={teaching.beyond.text} boldClassName={BOLD} />
            </p>
          </GlassCard>
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
