"use client";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getImagePath } from "@/utils/image";

/**
 * Testimonianze come grafo (da 768px): un nodo centrale collegato a un nodo per persona.
 * SVG fatto a mano con posizioni fisse, nessuna libreria. Tre livelli:
 *  1. ogni persona e' un puntino;
 *  2. al clic sul puntino compaiono foto, nome, ruolo e frase (un solo nodo attivo);
 *  3. "Read full recommendation" apre il testo completo con <details> nativo (niente JS).
 * Sotto 768px il grafo non c'e': lista verticale con gli stessi contenuti.
 * Accessibilita' da 768px: linee e nodo centrale sono decorativi (aria-hidden); i puntini sono
 * pulsanti veri (nome e ruolo come etichetta, aria-pressed), usabili da tastiera e screen reader.
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image?: string;
  quote: string;
  text: string;
}

interface Props {
  items: Testimonial[];
  defaultActive: string;
  centerLabel: string;
  readFull: string;
  seeOnLinkedIn: string;
  linkedInUrl: string;
}

// Coordinate nel viewBox 100 x 64 (stesse proporzioni del contenitore, aspect 100/64).
const CENTER = { x: 50, y: 32 };
const POSITIONS = [
  { x: 50, y: 7 },   // in alto
  { x: 86, y: 22 },  // destra in alto
  { x: 75, y: 57 },  // destra in basso
  { x: 25, y: 57 },  // sinistra in basso
  { x: 14, y: 22 },  // sinistra in alto
];
const VB_H = 64;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Foto rotonda; finche' la foto manca (o non si carica) mostra le iniziali. */
function Avatar({ name, image, size }: { name: string; image?: string; size: number }) {
  const [failed, setFailed] = useState(false);
  const style = { width: size, height: size };
  if (!image || failed) {
    return (
      <span
        aria-hidden="true"
        style={style}
        className="type-label shrink-0 rounded-full bg-[var(--color-label-background)] text-[var(--color-label-text)] flex items-center justify-center text-xs"
      >
        {initials(name)}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getImagePath(image)}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={style}
      className="shrink-0 rounded-full object-cover ring-2 ring-[var(--color-surface-interactive-default)]"
    />
  );
}

/** Frase + testo completo apribile + link LinkedIn: uguale nel grafo e nella lista. */
function Recommendation({
  t,
  readFull,
  seeOnLinkedIn,
  linkedInUrl,
}: {
  t: Testimonial;
  readFull: string;
  seeOnLinkedIn: string;
  linkedInUrl: string;
}) {
  return (
    <>
      <blockquote className="text-lg text-[var(--color-text-inverse)] leading-relaxed">
        “{t.quote}”
      </blockquote>
      <details className="group mt-4">
        <summary className="cursor-pointer w-fit text-sm font-medium text-[var(--color-text-link-default)] link-underline marker:text-[var(--color-list-bullet)]">
          {readFull}
        </summary>
        <div className="mt-4 space-y-3 text-[var(--color-text-primary)] leading-relaxed">
          {t.text.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-text-link-default)] link-underline"
            >
              {seeOnLinkedIn}
            </a>
          </p>
        </div>
      </details>
    </>
  );
}

export default function TestimonialGraph({
  items,
  defaultActive,
  centerLabel,
  readFull,
  seeOnLinkedIn,
  linkedInUrl,
}: Props) {
  const [activeId, setActiveId] = useState(defaultActive);
  const reduceMotion = useReducedMotion();
  const active = items.find((t) => t.id === activeId) ?? items[0];
  const nodes = items.slice(0, POSITIONS.length).map((t, i) => ({ t, ...POSITIONS[i] }));

  return (
    <>
      {/* Grafo: solo da 768px */}
      <div className="hidden md:grid grid-cols-12 gap-10 items-start">
        <div className="col-span-7 relative w-full md:sticky md:top-28" style={{ aspectRatio: `100 / ${VB_H}` }}>
          <svg
            viewBox={`0 0 100 ${VB_H}`}
            className="absolute inset-0 w-full h-full overflow-visible"
            aria-hidden="true"
            focusable="false"
          >
            {nodes.map(({ t, x, y }) => (
              <line
                key={t.id}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={x}
                y2={y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={t.id === active.id ? 1.5 : 1}
                className={`transition-[stroke] duration-300 motion-reduce:transition-none ${
                  t.id === active.id
                    ? "stroke-[var(--color-surface-interactive-default)]"
                    : "stroke-[var(--color-border-default)]"
                }`}
              />
            ))}
          </svg>

          {/* Nodo centrale */}
          <div
            aria-hidden="true"
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            style={{ left: `${CENTER.x}%`, top: `${(CENTER.y / VB_H) * 100}%` }}
          >
            <span className="type-number w-12 h-12 rounded-full bg-[var(--color-label-background)] text-[var(--color-label-text)] flex items-center justify-center text-base">
              GB
            </span>
          </div>
          <span
            aria-hidden="true"
            className="absolute -translate-x-1/2 type-label text-xs text-[var(--color-text-tertiary)] whitespace-nowrap bg-[var(--background)] px-1"
            style={{ left: `${CENTER.x}%`, top: `calc(${(CENTER.y / VB_H) * 100}% + 32px)` }}
          >
            {centerLabel}
          </span>

          {/* Nodi delle persone: puntino, o foto quando attivo */}
          {nodes.map(({ t, x, y }) => {
            const isActive = t.id === active.id;
            return (
              <button
                key={t.id}
                type="button"
                title={t.name}
                aria-label={`${t.name}, ${t.role}`}
                aria-pressed={isActive}
                onClick={() => setActiveId(t.id)}
                className="group absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-interactive)]"
                style={{ left: `${x}%`, top: `${(y / VB_H) * 100}%` }}
              >
                {isActive ? (
                  <Avatar name={t.name} image={t.image} size={48} />
                ) : (
                  <span className="block w-3 h-3 rounded-full bg-[var(--color-ink)] transition-transform duration-200 group-hover:scale-150 group-hover:bg-[var(--color-surface-interactive-default)] motion-reduce:transition-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Pannello della persona attiva */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          aria-live="polite"
          className="col-span-5"
        >
          <div className="flex items-center gap-4 mb-5">
            <Avatar name={active.name} image={active.image} size={64} />
            <div>
              <p className="type-work text-xl text-[var(--color-text-inverse)]">{active.name}</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">{active.role}</p>
            </div>
          </div>
          <Recommendation t={active} readFull={readFull} seeOnLinkedIn={seeOnLinkedIn} linkedInUrl={linkedInUrl} />
        </motion.div>
      </div>

      {/* Lista: solo sotto 768px */}
      <ul className="space-y-10 md:hidden">
        {items.map((t) => (
          <li key={t.id}>
            <div className="flex items-center gap-4 mb-4">
              <Avatar name={t.name} image={t.image} size={56} />
              <div>
                <p className="type-work text-lg text-[var(--color-text-inverse)]">{t.name}</p>
                <p className="text-sm text-[var(--color-text-tertiary)]">{t.role}</p>
              </div>
            </div>
            <Recommendation t={t} readFull={readFull} seeOnLinkedIn={seeOnLinkedIn} linkedInUrl={linkedInUrl} />
          </li>
        ))}
      </ul>
    </>
  );
}
