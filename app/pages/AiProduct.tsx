"use client";
import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  AlertCircle,
  User,
  Users,
  ExternalLink,
  MessageSquare,
  Share2,
  ShieldCheck,
  Layers,
  ClipboardCheck,
  UserCheck,
  Gauge,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import SketchFrame from "../components/SketchFrame";
import CopyEmailLink from "@/app/components/CopyEmailLink";
import RichText from "@/app/components/RichText";
import { getImagePath } from "@/utils/image";
import { aiProduct } from "@/content/ai-product";

const DEMO_URL = aiProduct.demoUrl;

/** Quali file del video esistono in public/ (controllato a build time da app/(links)/ai-product/page.tsx) */
export type HeroMediaFiles = { mp4: boolean; webm: boolean; poster: boolean };

/** Segnaposto statico: le cinque fasi della pipeline, nient'altro */
function PipelinePlaceholder() {
  return (
    <ol className="h-full grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-4 items-center p-6 sm:p-8">
      {aiProduct.heroPlaceholder.map((step) => (
        <li key={step.label} className="text-center">
          <div className="text-sm md:text-base font-semibold tracking-[0.2em] text-ink-900">{step.label}</div>
          <div className="mt-2 text-xs text-gray-400 leading-snug">{step.note}</div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Blocco 16:9 sotto l'hero. Con i file video presenti: <video> in loop, muto;
 * con prefers-reduced-motion solo il poster (o il segnaposto, se manca il poster).
 * Senza file video: il segnaposto.
 */
function HeroMedia({ files }: { files: HeroMediaFiles }) {
  const { video, webm, poster, alt } = aiProduct.heroMedia;
  const hasVideo = files.mp4 || files.webm;
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Con prefers-reduced-motion il video resta fermo (e nascosto via CSS)
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) el.pause();
      else el.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const frame = "glass sketch rounded-xl overflow-hidden";

  if (!hasVideo) {
    return (
      <div className={`${frame} sm:aspect-video`}>
        <SketchFrame />
        <PipelinePlaceholder />
      </div>
    );
  }

  const decorative = !alt;

  return (
    <div className={`${frame} relative aspect-video`}>
      <SketchFrame />
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={files.poster ? getImagePath(poster) : undefined}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : alt}
      >
        {files.webm && <source src={getImagePath(webm)} type="video/webm" />}
        {files.mp4 && <source src={getImagePath(video)} type="video/mp4" />}
      </video>
      {files.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getImagePath(poster)}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover hidden motion-reduce:block"
        />
      ) : (
        <div className="absolute inset-0 hidden motion-reduce:block">
          <PipelinePlaceholder />
        </div>
      )}
    </div>
  );
}

export default function AiProductCaseStudy({ media }: { media: HeroMediaFiles }) {
  // Icone delle card dell'approccio, nello stesso ordine di aiProduct.approach.patterns
  const patternIcons = [Share2, ShieldCheck, Layers, ClipboardCheck, UserCheck, Gauge];

  const patterns = aiProduct.approach.patterns.map((p, i) => ({
    icon: patternIcons[i],
    title: p.title,
    text: p.text,
  }));

  const keyDecisions = aiProduct.keyDecisions.decisions;

  const delivered = aiProduct.delivered.stats;

  const learnings = aiProduct.learnings.items;

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40" style={{ left: "calc(var(--band) + 1.5rem)" }}>
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 hover:text-ink-900 hover:border-blue transition-all"
        >
          <ArrowLeft size={20} />
          <span className="sr-only md:not-sr-only">{aiProduct.backLink}</span>
        </Link>
      </div>

      {/* 1. Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            {aiProduct.hero.breadcrumb}
          </p>

          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-accent">
              {aiProduct.hero.category}
            </span>
          </div>

          <h1 className="text-5xl font-bold text-ink-900 mb-4">
            {aiProduct.hero.title}
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            {aiProduct.hero.subtitle}
          </p>

          <p className="text-xl text-gray-300 mb-8">
            <RichText
              text={aiProduct.hero.description}
              boldClassName="text-ink-900 font-semibold"
              linkClassName="underline underline-offset-2 hover:text-ink-900"
            />
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue"
            >
              {aiProduct.hero.demoCta}
              <ExternalLink size={18} aria-hidden="true" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {aiProduct.hero.tags.map((tag, i) => (
              <span key={i} className="px-4 py-2 glass rounded-full text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          <HeroMedia files={media} />
        </div>
      </section>

      {/* Intro Card (senza immagine) */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <GlassCard hover={false} className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-inverse)] mb-6">
              {aiProduct.intro.title}
            </h2>
            <div className="space-y-4">
              {aiProduct.intro.paragraphs.map((para, i) => (
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
            <OverviewCard icon={AlertCircle} title={aiProduct.challenge.title}>
              {aiProduct.challenge.text}
            </OverviewCard>

            <OverviewCard icon={User} title={aiProduct.role.title}>
              <p className="font-semibold mb-2">{aiProduct.role.summary}</p>
              <ul className="space-y-1">
                {aiProduct.role.items.map((item, i) => (
                  <li key={i}><span aria-hidden="true">•</span> {item}</li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard icon={Users} title={aiProduct.scope.title}>
              <ul className="space-y-1">
                {aiProduct.scope.items.map((item, i) => (
                  <li key={i}><span aria-hidden="true">•</span> {item}</li>
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
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">{aiProduct.approach.number}</div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">{aiProduct.approach.title}</h2>
              <p className="text-gray-400 mt-2">
                {aiProduct.approach.subtitle}
              </p>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            {patterns.map((p, i) => (
              <GlassCard key={i}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <p.icon className="w-5 h-5 text-accent-icon" />
                    </div>
                    <h3 className="text-xl font-semibold text-ink-900">{p.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    <RichText text={p.text} linkClassName="underline underline-offset-2 hover:text-ink-900" />
                  </p>
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
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">{aiProduct.keyDecisions.number}</div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">{aiProduct.keyDecisions.title}</h2>
              <p className="text-gray-400 mt-2">
                {aiProduct.keyDecisions.subtitle}
              </p>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={keyDecisions} impactLabel={aiProduct.keyDecisions.impactLabel} />
          </div>
        </div>
      </section>

      {/* 8. Impact / Results */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">{aiProduct.delivered.number}</div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">{aiProduct.delivered.title}</h2>
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
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">{aiProduct.learnings.number}</div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">{aiProduct.learnings.title}</h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            {learnings.map((l, i) => (
              <GlassCard key={i}>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ink-900 mb-3">{l.title}</h3>
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
              <h2 className="text-3xl font-bold text-ink-900 mb-4">{aiProduct.cta.title}</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                {aiProduct.cta.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105"
                >
                  <MessageSquare size={18} aria-hidden="true" />
                  {aiProduct.cta.demo}
                </a>
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all"
                >
                  {aiProduct.cta.allProjects}
                </Link>
                <CopyEmailLink className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all">
                  {aiProduct.cta.talk}
                </CopyEmailLink>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
