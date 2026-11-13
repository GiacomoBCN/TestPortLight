"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  AlertCircle,
  User,
  GitBranch,
  Layers,
  FolderTree,
  MessageSquare,
  CheckCircle,
  Users,
  Sparkles,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import { getImagePath } from "@/utils/image";
import CopyEmailLink from "@/app/components/CopyEmailLink";
import { dowJones } from "@/content/dow-jones";
import SectionNumber from "../components/casestudy/SectionNumber";
import HighlightLastWords from "../components/HighlightLastWords";

// Stessa struttura di /design-system/, /ai-product/ e /falak/:
// titolo e frase tesi, Challenge · Role · Scope, Approach, Key Decisions & Trade-offs, What I Learned, chiusura.

// Icone delle card dell'Approach, nello stesso ordine di dowJones.approach.items
const approachIcons = [Layers, FolderTree, MessageSquare, CheckCircle, Users, Sparkles];

export default function DowJones() {
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
          <p className="text-sm text-gray-400 mb-6">{dowJones.hero.breadcrumb}</p>
          <div className="mb-4">
            <span className="label-tag text-xs">{dowJones.hero.category}</span>
          </div>
          <h1 className="type-page-title text-ink-900 mb-4">
            <HighlightLastWords text={dowJones.hero.title} />
          </h1>
          <p className="text-lg text-gray-400 mb-4">{dowJones.hero.subtitle}</p>
          <p className="text-xl text-gray-300 mb-4">{dowJones.hero.description}</p>
          {/* Scala del sistema, in una riga */}
          <p className="text-gray-400 mb-8">{dowJones.scale}</p>
          <div className="flex flex-wrap gap-2">
            {dowJones.hero.tags.map((tag, i) => (
              <span key={i} className="px-4 py-2 glass rounded-full text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro: frase tesi e testo (con l'immagine dei brand, come la pagina Falak) */}
      <ProjectIntroCard image={getImagePath(dowJones.intro.image)} title={dowJones.intro.title} showGradient={false}>
        {dowJones.intro.paragraphs.map((para, i) => (
          <p key={i} className="text-gray-300 leading-relaxed">
            {para}
          </p>
        ))}
      </ProjectIntroCard>

      {/* Challenge / Role / Scope */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title={dowJones.challenge.title}>
              {dowJones.challenge.text}
            </OverviewCard>

            <OverviewCard icon={User} title={dowJones.role.title}>
              <p className="font-semibold mb-2">{dowJones.role.summary}</p>
              <div className="space-y-2">
                {dowJones.role.groups.map((group, i) => (
                  <p key={i}>
                    <strong className="font-semibold">{group.label}</strong>
                    {` ${group.text}`}
                  </p>
                ))}
              </div>
            </OverviewCard>

            <OverviewCard icon={GitBranch} title={dowJones.scope.title}>
              {dowJones.scope.text}
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* Galleria */}
      <ProjectGallery
        title={dowJones.gallery.title}
        images={dowJones.gallery.images.map((image) => ({
          src: getImagePath(image.file),
          alt: image.alt,
        }))}
      />

      {/* 1. Approach */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(dowJones.approach.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">{dowJones.approach.title}</h2>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            {dowJones.approach.items.map((item, i) => {
              const Icon = approachIcons[i];
              return (
                <GlassCard key={i}>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent-icon" aria-hidden="true" />
                      </div>
                      <h3 className="type-work text-xl text-ink-900">{item.title}</h3>
                    </div>

                    {"stat" in item && item.stat && (
                      <p className="flex items-baseline gap-3 mb-3">
                        <span className="text-4xl type-number text-ink-900">{item.stat.value}</span>
                        <span className="text-sm font-semibold text-accent">{item.stat.label}</span>
                      </p>
                    )}

                    <div className="space-y-4">
                      {item.paragraphs.map((para, j) => (
                        <p key={j} className="text-gray-300 leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>

                    {item.lists.map((list, j) => (
                      <div key={j} className="mt-4">
                        <p className="text-gray-400 mb-2">{list.label}</p>
                        <ul className="space-y-2 text-gray-400">
                          {list.items.map((li, k) => (
                            <li key={k} className="flex items-start gap-2">
                              <span className="text-[var(--color-list-bullet)] mt-1" aria-hidden="true">•</span>
                              <span>{li}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {"closing" in item && item.closing && (
                      <p className="text-gray-300 leading-relaxed mt-4">{item.closing}</p>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(dowJones.keyDecisions.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">{dowJones.keyDecisions.title}</h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={dowJones.keyDecisions.decisions} />
          </div>
        </div>
      </section>

      {/* 3. What I learned */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <SectionNumber n={Number(dowJones.learnings.number)} />
            <div className="flex-1">
              <h2 className="type-section-title text-ink-900">{dowJones.learnings.title}</h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            {dowJones.learnings.items.map((l, i) => (
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

      {/* Il sistema in produzione sui brand */}
      <section className="px-6">
        <figure className="max-w-5xl mx-auto md:pl-24">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={getImagePath(dowJones.closingImage.file)}
              alt={dowJones.closingImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-contain"
            />
          </div>
          <figcaption className="text-sm text-gray-400 mt-3 text-center">{dowJones.closingImage.caption}</figcaption>
        </figure>
      </section>

      {/* Chiusura: stesso blocco delle altre pagine; il sistema Dow Jones non e' pubblico, quindi niente demo */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="type-section-title text-ink-900 mb-4">{dowJones.cta.title}</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">{dowJones.cta.text}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CopyEmailLink className="px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105">
                  {dowJones.cta.talk}
                </CopyEmailLink>
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all"
                >
                  {dowJones.cta.allProjects}
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
