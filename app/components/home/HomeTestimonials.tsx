"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import { getImagePath } from "@/utils/image";

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image: string;
  alt: string;
}

const LIMIT = 220;

/** Cut at a word boundary, never mid-word. */
function truncate(text: string) {
  if (text.length <= LIMIT) return { short: text, truncated: false };
  const cut = text.lastIndexOf(" ", LIMIT);
  return { short: text.slice(0, cut > 0 ? cut : LIMIT) + "…", truncated: true };
}

function Quote({ t }: { t: Testimonial }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const { short, truncated } = truncate(t.quote);

  return (
    <li className="m-rule-t pt-6 md:last:col-span-2 md:last:max-w-[64ch]">
      <figure className="flex h-full flex-col gap-5">
      <blockquote className="flex-1">
        <p
          id={id}
          className="whitespace-pre-line text-base leading-relaxed md:text-[1.0625rem]"
        >
          “{open ? t.quote : short}”
        </p>
        {truncated && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={id}
            className="m-link mt-3 text-sm font-bold"
          >
            {open ? "Read less" : "Read more"}
          </button>
        )}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Image
          src={getImagePath(t.image)}
          alt={t.alt}
          width={44}
          height={44}
          loading="lazy"
          className="h-11 w-11 rounded-[var(--m-radius)] object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-bold">{t.name}</p>
          <p className="text-sm text-[var(--m-ink-2)]">{t.title}</p>
        </div>
      </figcaption>
      </figure>
    </li>
  );
}

export default function HomeTestimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
      {testimonials.map((t) => (
        <Quote key={t.name} t={t} />
      ))}
    </ul>
  );
}
