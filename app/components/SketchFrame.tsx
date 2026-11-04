"use client";
import React, { useId } from "react";

/**
 * Cornice delle box (.sketch), copiata dal bordo esterno del disegno delle fasce
 * (scripts/fascia/lato-sinistro-linee.svg), senza il disegno:
 *  - .sf-band    banda azzurra chiara sui 4 lati
 *  - .sf-line    un tratto "a matita" per lato dentro la banda (vedi regola dello schizzo)
 *  - .sf-corner  angoli irregolari, ognuno con la sua forma
 * Misure, colori e opacita' in globals.css (sezione CORNICI DELLE BOX), variabili --sf-*.
 *
 * I tratti sono "casuali" ma diversi per ogni box: il seme viene da useId(),
 * che e' uguale sul server e nel browser, quindi niente errori di idratazione e la stessa
 * box ha sempre gli stessi tratti.
 */

// Regola dello schizzo: un solo tratto per lato, come a matita. Il tratto non arriva da
// angolo ad angolo (si ferma prima o parte piu' in la'), a volte un lato manca, ed e' appena
// storto, con spessore e intensita' un po' diversi.
const LEN_MIN = 55; // lunghezza minima del tratto (% del lato)
const LEN_MAX = 95; // lunghezza massima
const SKIP = 0.17; // probabilita' che un lato manchi (almeno 3 lati restano sempre)
const TILT = 0.25; // inclinazione massima, in gradi
const TILT_MIN = 0.12; // inclinazione minima: un tratto perfettamente dritto viene netto e sembra piu' scuro degli altri
const WIDTHS = [1]; // spessore in px (1,5 era troppo)
const OPACITY_MIN = 0.3; // intensita' minima del tratto
const OPACITY_MAX = 0.5; // massima (0,7 e 0,95 erano troppo blu)

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

type Side = "top" | "bottom" | "left" | "right";

// Un tratto per lato: dove inizia e finisce, inclinazione, spessore, intensita'
function stroke(rand: () => number, side: Side, hidden: boolean): React.CSSProperties {
  if (hidden) return { display: "none" };
  const between = (a: number, b: number) => a + rand() * (b - a);
  const len = between(LEN_MIN, LEN_MAX);
  const start = between(0, 100 - len);
  const end = start + len;
  const dir = side === "top" || side === "bottom" ? "to right" : "to bottom";
  const image = `linear-gradient(${dir}, transparent 0 ${start.toFixed(1)}%, #000 ${start.toFixed(1)}% ${end.toFixed(1)}%, transparent ${end.toFixed(1)}% 100%)`;
  const width = WIDTHS[Math.floor(rand() * WIDTHS.length)];
  const size = side === "top" || side === "bottom" ? { height: `${width}px` } : { width: `${width}px` };
  return {
    maskImage: image,
    WebkitMaskImage: image,
    transform: `rotate(${((rand() < 0.5 ? -1 : 1) * between(TILT_MIN, TILT)).toFixed(2)}deg)`,
    opacity: between(OPACITY_MIN, OPACITY_MAX).toFixed(2),
    ...size,
  };
}

export default function SketchFrame() {
  const rand = seeded(useId());
  const sides: Side[] = ["top", "bottom", "left", "right"];
  // quali lati mancano: mai piu' di uno
  const hidden = sides.map(() => rand() < SKIP);
  if (hidden.filter(Boolean).length > 1) hidden.forEach((_, i) => (hidden[i] = i === hidden.indexOf(true)));
  const [top, bottom, left, right] = sides.map((side, i) => stroke(rand, side, hidden[i]));

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
