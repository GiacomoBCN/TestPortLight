'use client';

import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Home, ArrowLeft } from 'lucide-react';

// Import military stencil font
import { Black_Ops_One } from 'next/font/google';

const militaryFont = Black_Ops_One({
  weight: '400',
  subsets: ['latin'],
});

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8 animate-fade-in">
          <h1 className={`${militaryFont.className} text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text-link-default)] to-[var(--color-surface-interactive-default)] animate-float`}>
            404
          </h1>
        </div>

        {/* Glass Card */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-inverse)] mb-4">
            Page Not Found
          </h2>
          <p className="text-[var(--color-text-tertiary)] text-lg mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={createPageUrl('Home')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--button-primary-background-default)] rounded-xl text-[var(--button-primary-text)] font-semibold hover:bg-[var(--button-primary-background-hover)] transition-all glow-blue hover:scale-105"
            >
              <Home size={20} />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 glass rounded-xl text-[var(--color-text-inverse)] font-semibold hover:bg-[var(--color-surface-interactive-default)] hover:border-[var(--color-border-interactive)] transition-all"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="text-[var(--color-text-secondary)] text-sm">
          <p className="mb-2">You might be looking for:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={createPageUrl('ProductWork')}
              className="text-[var(--color-text-link-default)] hover:text-[var(--color-text-link-hover)] transition-colors"
            >
              Product Work
            </Link>
            <span className="text-[var(--color-text-secondary)]">•</span>
            <Link
              href={createPageUrl('Teaching')}
              className="text-[var(--color-text-link-default)] hover:text-[var(--color-text-link-hover)] transition-colors"
            >
              Teaching
            </Link>
            <span className="text-[var(--color-text-secondary)]">•</span>
            <a
              href="mailto:consulting@giacomobianchi.tech"
              className="text-[var(--color-text-link-default)] hover:text-[var(--color-text-link-hover)] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
