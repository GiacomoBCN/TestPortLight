"use client";

import { useEffect, useState } from "react";

/**
 * Two walls of vertical bands, one in each gutter beside the content column,
 * like the Art Déco columns of the sketch: each wall converges on its own
 * vanishing point high above the page, at the inner top corner of the gutter,
 * so the bands stand almost vertical next to the content and fan out towards
 * the outer edge. Dense at the top, sparser at the bottom.
 *
 * Fixed to the viewport: the walls accompany the whole scroll.
 * Colour is laid as watercolour: an SVG filter wobbles the edges and varies
 * the density of the wash. Static in this phase.
 *
 * Rendered only at and above MIN_WIDTH; below that the column stands alone.
 */

const COLUMN = 1120; // content column width in px (see HomeShell)
const MIN_WIDTH = 1280;
const VP_Y = -0.1; // vanishing point, fraction of viewport height (just above the top edge)
const VP_INSET = 0.22; // vanishing point x, fraction of the gutter in from the column edge

const TONES = ["var(--m-sand)", "var(--m-blue-dust)", "var(--m-terracotta)"];

type Band = { x1: number; x2: number; tone: number };

/* Déco motif, measured at the bottom edge next to the column: [width, tone]
   for a band, [gap] for empty cream. Repeated outwards with jitter. */
const MOTIF: (readonly [number, number] | readonly [number])[] = [
  [5, 2],
  [16],
  [96, 0],
  [10],
  [3, 1],
  [7],
  [3, 1],
  [28],
  [44, 1],
  [12],
  [130, 0],
  [22],
  [6, 2],
  [34],
  [72, 0],
  [9],
  [18, 1],
  [46],
  [4, 2],
  [8],
  [4, 2],
  [60],
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bands along the bottom edge from `from` (column edge) outwards to `to`. */
function makeBands(from: number, to: number, seed: number): Band[] {
  const rnd = mulberry32(seed);
  const dir = to > from ? 1 : -1;
  const bands: Band[] = [];
  let x = from;
  let i = 0;
  while (dir > 0 ? x < to : x > to) {
    const step = MOTIF[i % MOTIF.length];
    // bands far from the column are seen compressed, so they grow with distance
    const grow = 1 + Math.abs(x - from) / 900;
    const jitter = 0.8 + rnd() * 0.5;
    const w = step[0] * grow * jitter;
    if (step.length === 2) {
      const x1 = x;
      const x2 = x + dir * w;
      bands.push({ x1: Math.min(x1, x2), x2: Math.max(x1, x2), tone: step[1] });
    }
    x += dir * w;
    i++;
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
  const vpy = h * VP_Y;
  const bottom = h + 60;

  // Left wall: column edge at x = gutter, vanishing point just inside the gutter.
  const leftVpx = gutter - gutter * VP_INSET;
  const left = makeBands(gutter - 2, -1.6 * w, 20261101);
  // Right wall: mirror image.
  const rightVpx = w - gutter + gutter * VP_INSET;
  const right = makeBands(w - gutter + 2, 2.6 * w, 19300505);

  const poly = (b: Band, vpx: number) =>
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
        {/* Watercolour: wobbled edges, uneven wash, pigment pooling at the edges */}
        <filter
          id="m-watercolour"
          x="-4%"
          y="-4%"
          width="108%"
          height="108%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011 0.006"
            numOctaves="3"
            seed="7"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.009"
            numOctaves="4"
            seed="3"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.9 0 0 0 0.35"
            result="wash"
          />
          <feComposite in="shape" in2="wash" operator="in" result="washed" />
          <feMorphology in="shape" operator="erode" radius="2.5" result="inner" />
          <feComposite in="shape" in2="inner" operator="out" result="rim" />
          <feColorMatrix
            in="rim"
            type="matrix"
            values="0.8 0 0 0 0  0 0.8 0 0 0  0 0 0.8 0 0  0 0 0 0.55 0"
            result="rimDark"
          />
          <feMerge>
            <feMergeNode in="washed" />
            <feMergeNode in="rimDark" />
          </feMerge>
        </filter>
      </defs>
      <g clipPath="url(#m-wall-left)">
        <g filter="url(#m-watercolour)" style={{ mixBlendMode: "multiply" }}>
          {left.map((b, i) => (
            <polygon key={`l${i}`} points={poly(b, leftVpx)} fill={TONES[b.tone]} />
          ))}
        </g>
      </g>
      <g clipPath="url(#m-wall-right)">
        <g filter="url(#m-watercolour)" style={{ mixBlendMode: "multiply" }}>
          {right.map((b, i) => (
            <polygon key={`r${i}`} points={poly(b, rightVpx)} fill={TONES[b.tone]} />
          ))}
        </g>
      </g>
    </svg>
  );
}
