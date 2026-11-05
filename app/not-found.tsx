'use client';

import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Home, ArrowLeft } from 'lucide-react';
import CopyEmailLink from '@/app/components/CopyEmailLink';
import { shell } from '@/content/shell';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-8xl md:text-9xl font-bold text-accent tracking-tight">
            {shell.notFound.code}
          </h1>
        </div>

        {/* Glass Card */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-inverse)] mb-4">
            {shell.notFound.title}
          </h2>
          <p className="text-[var(--color-text-tertiary)] text-lg mb-6">
            {shell.notFound.message}
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={createPageUrl('Home')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--button-primary-background-default)] rounded-xl text-[var(--button-primary-text)] font-semibold hover:bg-[var(--button-primary-background-hover)] transition-all glow-blue hover:scale-105"
            >
              <Home size={20} />
              {shell.notFound.goHome}
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 glass rounded-xl text-[var(--color-text-inverse)] font-semibold hover:bg-[var(--color-surface-interactive-default)] hover:border-[var(--color-border-interactive)] transition-all"
            >
              <ArrowLeft size={20} />
              {shell.notFound.goBack}
            </button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="text-[var(--color-text-secondary)] text-sm">
          <p className="mb-2">{shell.notFound.suggestionsIntro}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={createPageUrl('ProductWork')}
              className="text-[var(--color-text-link-default)] underline decoration-[var(--primitive-orange-500)] decoration-2 underline-offset-4 hover:text-[var(--color-text-link-hover)] transition-colors"
            >
              {shell.notFound.productWork}
            </Link>
            <span className="text-[var(--color-text-secondary)]" aria-hidden="true">•</span>
            <Link
              href={createPageUrl('Teaching')}
              className="text-[var(--color-text-link-default)] underline decoration-[var(--primitive-orange-500)] decoration-2 underline-offset-4 hover:text-[var(--color-text-link-hover)] transition-colors"
            >
              {shell.notFound.teaching}
            </Link>
            <span className="text-[var(--color-text-secondary)]" aria-hidden="true">•</span>
            <CopyEmailLink className="text-[var(--color-text-link-default)] underline decoration-[var(--primitive-orange-500)] decoration-2 underline-offset-4 hover:text-[var(--color-text-link-hover)] transition-colors">
              {shell.notFound.contact}
            </CopyEmailLink>
          </div>
        </div>
      </div>
    </div>
  );
}
