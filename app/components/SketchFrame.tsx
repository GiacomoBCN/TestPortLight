"use client";
import React, { useId } from "react";

/**
 * Cornice delle box (.sketch), copiata dal bordo esterno del disegno delle fasce
 * (scripts/fascia/lato-sinistro-linee.svg), senza il disegno:
 *  - .sf-band    banda azzurra chiara sui 4 lati
 *  - .sf-line    linea definita dentro la banda: a tratti c'e' e a tratti no
 *  - .sf-corner  angoli irregolari, ognuno con la sua forma
 * Misure, colori e opacita' in globals.css (sezione CORNICI DELLE BOX), variabili --sf-*.
 *
 * I tratti della linea sono "casuali" ma diversi per ogni box: il seme viene da useId(),
 * che e' uguale sul server e nel browser, quindi niente errori di idratazione e la stessa
 * box ha sempre gli stessi tratti.
 */

// Parametri dei tratti (in % della lunghezza del lato)
const DASH_MIN = 10; // tratto piu' corto
const DASH_MAX = 38; // tratto piu' lungo
const GAP_MIN = 4; // interruzione piu' corta
const GAP_MAX = 16; // interruzione piu' lunga

// Numero pseudo-casuale ripetibile a partire da una stringa
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Maschera con tratti e vuoti alternati di lunghezza casuale
function dashMask(rand: () => number, direction: "to right" | "to bottom") {
  const between = (a: number, b: number) => a + rand() * (b - a);
  const stops: string[] = [];
  let pos = rand() < 0.5 ? 0 : between(2, 12); // a volte parte subito, a volte dopo un vuoto
  if (pos > 0) stops.push(`transparent 0 ${pos.toFixed(1)}%`);
  while (pos < 100) {
    const end = Math.min(100, pos + between(DASH_MIN, DASH_MAX));
    stops.push(`#000 ${pos.toFixed(1)}% ${end.toFixed(1)}%`);
    pos = end;
    if (pos >= 100) break;
    const gapEnd = Math.min(100, pos + between(GAP_MIN, GAP_MAX));
    stops.push(`transparent ${pos.toFixed(1)}% ${gapEnd.toFixed(1)}%`);
    pos = gapEnd;
  }
  const image = `linear-gradient(${direction}, ${stops.join(", ")})`;
  return { maskImage: image, WebkitMaskImage: image };
}

export default function SketchFrame() {
  const rand = seeded(useId());
  const top = dashMask(rand, "to right");
  const bottom = dashMask(rand, "to right");
  const left = dashMask(rand, "to bottom");
  const right = dashMask(rand, "to bottom");

  return (
    <span className="sketch-frame" aria-hidden="true">
      <span className="sf-band sf-band-top" />
      <span className="sf-band sf-band-bottom" />
      <span className="sf-band sf-band-left" />
      <span className="sf-band sf-band-right" />
      <span className="sf-line sf-line-top" style={top} />
      <span className="sf-line sf-line-bottom" style={bottom} />
      <span className="sf-line sf-line-left" style={left} />
      <span className="sf-line sf-line-right" style={right} />
      <span className="sf-corner sf-corner-tl" />
      <span className="sf-corner sf-corner-tr" />
      <span className="sf-corner sf-corner-br" />
      <span className="sf-corner sf-corner-bl" />
    </span>
  );
}
