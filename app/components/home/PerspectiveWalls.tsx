"use client";

import { useEffect, useState } from "react";

/**
 * Two walls of flat bands, one in each gutter beside the content column,
 * all converging on a single vanishing point above the page (off-centre,
 * to the right). Drawn as SVG polygons from a seeded sequence so the rhythm
 * is irregular but identical on every load. Static in this phase.
 *
 * Rendered only at and above MIN_WIDTH; below that the column stands alone.
 */

const COLUMN = 1120; // content column width in px (see HomeShell)
const MIN_WIDTH = 1280;
const VP_X = 0.56; // vanishing point, fraction of viewport width
const VP_Y = -0.55; // vanishing point, fraction of viewport height (above the top)

const TONES = ["var(--m-sand)", "var(--m-blue-dust)", "var(--m-terracotta)"];

type Band = { x1: number; x2: number; tone: number };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bands along the bottom edge from `from` towards `to` (either direction). */
function makeBands(from: number, to: number, seed: number): Band[] {
  const rnd = mulberry32(seed);
  const dir = to > from ? 1 : -1;
  const bands: Band[] = [];
  let x = from;
  while (dir > 0 ? x < to : x > to) {
    const r = rnd();
    let w: number;
    let tone: number;
    if (r < 0.3) {
      w = 2 + rnd() * 4; // hairline
      tone = rnd() < 0.55 ? 2 : 1;
    } else if (r < 0.72) {
      w = 10 + rnd() * 22; // medium
      tone = rnd() < 0.18 ? 2 : 1;
    } else {
      w = 44 + rnd() * 90; // wide field
      tone = 0;
    }
    const gap = 10 + rnd() * 56;
    const x1 = x;
    const x2 = x + dir * w;
    bands.push({ x1: Math.min(x1, x2), x2: Math.max(x1, x2), tone });
    x = x2 + dir * gap;
  }
  return bands;
}

export default function PerspectiveWalls() {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setSize(w >= MIN_WIDTH ? { w, h } : null);
    };
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!size) return null;

  const { w, h } = size;
  const gutter = (w - COLUMN) / 2;
  const vpx = w * VP_X;
  const vpy = h * VP_Y;
  const bottom = h + 40;

  const left = makeBands(gutter - 4, -1.1 * w, 20261101);
  const right = makeBands(w - gutter + 4, 2.1 * w, 19300505);

  const poly = (b: Band) =>
    `${b.x1},${bottom} ${b.x2},${bottom} ${vpx},${vpy}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none fixed inset-0 z-0"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
    >
      <defs>
        <clipPath id="m-wall-left">
          <rect x="0" y="0" width={Math.max(0, gutter - 1)} height={h} />
        </clipPath>
        <clipPath id="m-wall-right">
          <rect
            x={w - gutter + 1}
            y="0"
            width={Math.max(0, gutter - 1)}
            height={h}
          />
        </clipPath>
      </defs>
      <g clipPath="url(#m-wall-left)">
        {left.map((b, i) => (
          <polygon key={`l${i}`} points={poly(b)} fill={TONES[b.tone]} />
        ))}
      </g>
      <g clipPath="url(#m-wall-right)">
        {right.map((b, i) => (
          <polygon key={`r${i}`} points={poly(b)} fill={TONES[b.tone]} />
        ))}
      </g>
    </svg>
  );
}
