"use client";
import React from "react";
import { motion } from "framer-motion";


type ImageLike =
  | string
  | {
      src: string;
      alt?: string;
    };

interface CaseStudyHeroProps {
  title: string;
  company?: string;
  role?: string;
  year?: string | number;
  tags?: string[];
  image?: ImageLike;
}

export default function CaseStudyHero({
  title,
  company,
  role,
  year,
  tags = [],
  image,
}: CaseStudyHeroProps) {
  const imgSrc = typeof image === "string" ? image : image?.src;
  const imgAlt =
    typeof image === "string" ? `${title} hero image` : image?.alt ?? `${title} hero image`;

  return (
    <section className="min-h-[60vh] relative px-6 pt-32 pb-16 overflow-hidden">
      {/* Background Image with Overlay */}
      {imgSrc && (
        <div className="absolute inset-0 -z-10">
          {/* usa <img> o next/image se preferisci */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        >
          {title}
        </motion.h1>

        <div className="mt-4 text-sm md:text-base text-white/70 space-x-3">
          {company && <span>{company}</span>}
          {role && <span>• {role}</span>}
          {year && <span>• {year}</span>}
        </div>

        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-xs bg-white/10 border border-white/15"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
