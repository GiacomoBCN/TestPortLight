"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  AlertCircle,
  User,
  Layers,
  ExternalLink,
  Github,
  Languages,
  Users,
  MessageSquare,
  Percent,
  BookOpen,
  Footprints,
  UserCheck,
  ClipboardCheck,
  Palette,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import Lightbox from "../components/Lightbox";
import { getImagePath } from "@/utils/image";
import CopyEmailLink from "@/app/components/CopyEmailLink";
import RichText from "@/app/components/RichText";
import { falak, type FalakShotKey } from "@/content/falak";
import SectionNumber from "../components/casestudy/SectionNumber";

const DEMO_URL = falak.demoUrl;
const REPO_URL = falak.repoUrl;

const img = (file: string) => getImagePath(`images/projects/falak/${file}`);

type Shot = { src: string; alt: string };

export default function FalakCaseStudy() {
  // Lightbox condivisa dalle card dell'approccio
  const [gallery, setGallery] = useState<Shot[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const open = (images: Shot[], i: number) => {
    setGallery(images);
    setIndex(i);
  };

  const shots = Object.fromEntries(
    Object.entries(falak.shots).map(([k, s]) => [k, { src: img(s.file), alt: s.alt }])
  ) as Record<FalakShotKey, Shot>;

  // Icone delle card dell'approccio, nello stesso ordine di falak.approach.patterns
  const patternIcons = [Layers, Percent, BookOpen, Footprints, UserCheck, ClipboardCheck, Languages, Palette];

  const patterns: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    text: string;
    images: Shot[];
  }> = falak.approach.patterns.map((p, i) => ({
    icon: patternIcons[i],
    title: p.title,
    text: p.text,
    images: p.images.map((k) => shots[k]),
  }));

  const keyDecisions = falak.keyDecisions.decisions;

  const delivered = falak.delivered.stats;

  const learnings = falak.learnings.items;

  const regulations = falak.regulations.rows;

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40" style={{ left: "calc(var(--band) + 1.5rem)" }}>
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 hover:text-ink-900 hover:border-blue transition-all"
        >
          <ArrowLeft size={20} />
          <span className="sr-only md:not-sr-only">{falak.backLink}</span>
        </Link>
      </div>

      {/* 1. Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            {falak.hero.breadcrumb}
          </p>

          <div className="mb-4">
            <span className="label-tag text-xs">
              {falak.hero.category}
            </span>
          </div>

          <h1 className="type-page-title text-ink-900 mb-4">
            {falak.hero.title}
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            {falak.hero.subtitle}
          </p>

          <div className="mb-6 space-y-2">
            {falak.hero.summary.map((line, i) => (
              <p key={i} className="text-xl text-gray-300">
                <RichText text={line} boldClassName="text-ink-900 font-semibold" />
              </p>
            ))}
          </div>

          <p className="text-xl text-gray-300 mb-8">
            <RichText text={falak.hero.description} boldClassName="text-ink-900 font-semibold" />
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue"
            >
              {falak.hero.demoCta}
              <ExternalLink size={18} aria-hidden="true" />
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all"
            >
              <Github size={18} aria-hidden="true" />
              {falak.hero.repoCta}
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {falak.hero.tags.map((tag, i) => (
              <span key={i} className="px-4 py-2 glass rounded-full text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Card */}
      <ProjectIntroCard
        image={shots[falak.intro.image].src}
        title={falak.intro.title}
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          <RichText text={falak.intro.paragraphs[0]} />
        </p>
        <p className="text-gray-300 leading-relaxed">
          <RichText text={falak.intro.paragraphs[1]} />
        </p>
      </ProjectIntroCard>

      {/* 2–4. Challenge / Role / Scope */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title={falak.challenge.title}>
              {falak.challenge.text}
            </OverviewCard>

            <OverviewCard icon={User} title={falak.role.title}>
              <p className="font-semibold mb-2">{falak.role.summary}</p>
              <ul className="space-y-1">
                {falak.role.items.map((item, i) => (
                  <li key={i}><span className="text-[var(--color-list-bullet)]" aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard icon={Users} title={falak.scope.title}>
              <ul className="space-y-1">
                {falak.scope.items.map((item, i) => (
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
          <div className="flex items-start gap-6 mb-8">
            <SectionNumber n={Number(falak.approach.number)} />
            <div className="flex-1 pt-2">
              <h2 className="type-section-title text-ink-900">{falak.approach.title}</h2>
              <p className="text-gray-400 mt-2">
                {falak.approach.subtitle}
              </p>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            {patterns.map((p, i) => (
              <GlassCard key={i}>
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  <div className="md:w-3/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <p.icon className="w-5 h-5 text-accent-icon" />
                      </div>
                      <h3 className="type-work text-xl text-ink-900">{p.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{p.text}</p>
                  </div>
                  <div className="md:w-2/5 grid grid-cols-2 gap-3 content-start">
                    {p.images.map((im, j) => (
                      <button
                        type="button"
                        key={j}
                        onClick={() => open(p.images, j)}
                        className="relative aspect-[3/2] rounded-lg overflow-hidden border border-ink-900/10 bg-white group cursor-pointer"
                        aria-label={falak.approach.enlargeImageLabel(im.alt)}
                      >
                        <Image
                          src={im.src}
                          alt={im.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 20vw"
                          className="object-cover object-top"
                        />
                        <div
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <span className="text-white text-xs font-medium">{falak.approach.enlarge}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <SectionNumber n={Number(falak.keyDecisions.number)} />
            <div className="flex-1 pt-2">
              <h2 className="type-section-title text-ink-900">{falak.keyDecisions.title}</h2>
              <p className="text-gray-400 mt-2">
                {falak.keyDecisions.subtitle}
              </p>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={keyDecisions} impactLabel={falak.keyDecisions.impactLabel} />
          </div>
        </div>
      </section>

      {/* Gallery: the prototype on mobile */}
      <ProjectGallery
        title={falak.gallery.title}
        images={falak.gallery.images.map((k) => shots[k])}
      />

      {/* 8. Impact / Results */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <SectionNumber n={Number(falak.delivered.number)} />
            <div className="flex-1 pt-2">
              <h2 className="type-section-title text-ink-900">{falak.delivered.title}</h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {delivered.map((d, i) => (
                <GlassCard key={i}>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="text-4xl font-bold text-ink-900 mb-1">{d.value}</div>
                    <div className="text-sm font-semibold text-accent mb-1">{d.label}</div>
                    <div className="text-xs text-gray-400">{d.note}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. What I learned */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <SectionNumber n={Number(falak.learnings.number)} />
            <div className="flex-1 pt-2">
              <h2 className="type-section-title text-ink-900">{falak.learnings.title}</h2>
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

      {/* 5. Regulatory reference */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <SectionNumber n={Number(falak.regulations.number)} />
            <div className="flex-1 pt-2">
              <h2 className="type-section-title text-ink-900">{falak.regulations.title}</h2>
              <p className="text-gray-400 mt-2">
                {falak.regulations.subtitle}
              </p>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            {/* Desktop table */}
            <GlassCard className="hidden lg:block">
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="pb-4 pr-4 text-accent font-semibold align-bottom">{falak.regulations.columns.rule}</th>
                      <th className="pb-4 pr-4 text-accent font-semibold align-bottom">{falak.regulations.columns.duty}</th>
                      <th className="pb-4 pr-4 text-accent font-semibold align-bottom">{falak.regulations.columns.status}</th>
                      <th className="pb-4 text-accent font-semibold align-bottom">{falak.regulations.columns.falak}</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {regulations.map((r, i) => (
                      <tr key={i} className="border-b border-gray-800 last:border-0 align-top">
                        <td className="py-4 pr-4 text-ink-900 font-medium w-40">{r.rule}</td>
                        <td className="py-4 pr-4">{r.duty}</td>
                        <td className="py-4 pr-4">{r.status}</td>
                        <td className="py-4 text-ink-900">{r.falak}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-4">
              {regulations.map((r, i) => (
                <GlassCard key={i}>
                  <div className="p-5">
                    <h3 className="type-work text-ink-900 text-base mb-3">{r.rule}</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide mb-1">{falak.regulations.columns.duty}</div>
                        <div className="text-gray-300">{r.duty}</div>
                      </div>
                      <div>
                        <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide mb-1">{falak.regulations.columns.status}</div>
                        <div className="text-gray-300">{r.status}</div>
                      </div>
                      <div>
                        <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide mb-1">{falak.regulations.columns.falak}</div>
                        <div className="text-ink-900">{r.falak}</div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              {falak.regulations.sources.label}{" "}
              {falak.regulations.sources.links.map(({ label, href }, i, arr) => (
                <React.Fragment key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ink-900">
                    {label}
                  </a>
                  {i < arr.length - 1 ? " · " : "."}
                </React.Fragment>
              ))}{" "}
              {falak.regulations.sources.note}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="type-section-title text-ink-900 mb-4">{falak.cta.title}</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                {falak.cta.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105"
                >
                  <MessageSquare size={18} aria-hidden="true" />
                  {falak.cta.demo}
                </a>
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all"
                >
                  {falak.cta.allProjects}
                </Link>
                <CopyEmailLink className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all">
                  {falak.cta.talk}
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
