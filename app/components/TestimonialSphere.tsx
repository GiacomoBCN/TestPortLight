"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { getImagePath } from "@/utils/image";

/**
 * Testimonianze come sfera di punti e linee in continuo movimento (da 768px).
 * Canvas 2D fatto a mano, nessuna libreria: qualche centinaio di punti su una sfera,
 * maglia di linee sottili e "ciuffi" a raggiera. Le cinque persone sono nodi della sfera
 * con la foto: ruotano con il resto, in primo piano mostrano il nome, dietro si allontanano.
 *  - mouse sulla sfera: rallenta; clic su una persona: la sfera si ferma e si apre la scatola
 *    con foto, nome, ruolo e frase; il testo completo (<details> nativo) scorre dentro la scatola,
 *    che ha altezza fissa, cosi' i testi lunghi non allargano la sezione;
 *  - se nessuno interagisce, dopo qualche secondo con la sezione visibile si apre da sola
 *    la persona piu' in primo piano (una volta sola);
 *  - prefers-reduced-motion: sfera ferma;
 *  - l'animazione gira solo quando la sezione e' visibile.
 * Accessibilita': canvas e foto in movimento sono solo per il puntatore (aria-hidden);
 * sotto la sfera una riga di pulsanti con i nomi apre le stesse scatole da tastiera e screen reader.
 * Sotto 768px niente sfera: lista verticale con gli stessi contenuti.
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
  groupLabel: string;
  close: string;
  readFull: string;
  seeOnLinkedIn: string;
  linkedInUrl: string;
}

const AUTO_OPEN_MS = 6000;
const SPEED = 0.0016; // radianti per frame (circa 60 fps)
const INK = "17, 20, 24"; // --foreground #111418
const ORANGE = "242, 140, 40"; // --primitive-orange-500 #F28C28

type V3 = [number, number, number];

// ---------- Geometria della sfera (deterministica: stesso disegno a ogni caricamento) ----------

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function norm(v: V3): V3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

/** Persone sulla sfera: latitudini diverse, longitudini sfalsate di 72 gradi. */
const PERSON_LATS = [0.35, -0.25, 0.55, -0.5, 0.05];
function personPoint(i: number): V3 {
  const lat = PERSON_LATS[i % PERSON_LATS.length];
  const lon = (i / 5) * Math.PI * 2 + 0.3;
  return [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)];
}

interface Geometry {
  points: V3[]; // punti visibili (puntini)
  tips: V3[]; // estremi dei raggi (senza puntino)
  edges: [number, number][]; // indici su all = points ++ tips
  personEdges: number[][]; // per ogni persona, gli indici dei suoi raggi in edges
}

function buildGeometry(personCount: number): Geometry {
  const r = rng(7);
  const N = 220;
  const points: V3[] = [];
  // Punti di Fibonacci con un po' di disordine
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = i * Math.PI * (3 - Math.sqrt(5));
    points.push(
      norm([Math.cos(th) * rad + (r() - 0.5) * 0.12, y + (r() - 0.5) * 0.12, Math.sin(th) * rad + (r() - 0.5) * 0.12])
    );
  }
  // Le persone sono gli ultimi punti
  const personIdx: number[] = [];
  for (let p = 0; p < personCount; p++) {
    personIdx.push(points.length);
    points.push(personPoint(p));
  }

  const tips: V3[] = [];
  const edges: [number, number][] = [];
  const personEdges: number[][] = personIdx.map(() => []);
  const tipIndex = () => points.length + tips.length - 1;

  // Maglia: ogni punto ai suoi 2 vicini piu' prossimi
  for (let i = 0; i < N; i++) {
    const d = points
      .slice(0, N)
      .map((q, j) => [j, (q[0] - points[i][0]) ** 2 + (q[1] - points[i][1]) ** 2 + (q[2] - points[i][2]) ** 2] as const)
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1]);
    edges.push([i, d[0][0]], [i, d[1][0]]);
  }
  // Corde lunghe che attraversano la sfera (l'effetto groviglio)
  for (let k = 0; k < 70; k++) {
    const a = Math.floor(r() * N);
    const b = Math.floor(r() * N);
    if (a !== b) edges.push([a, b]);
  }
  // Ciuffi a raggiera: alcuni punti qualunque e tutte le persone
  const spray = (center: number, count: number, len: number, owner?: number) => {
    const c = points[center];
    for (let k = 0; k < count; k++) {
      const dir: V3 = [r() - 0.5, r() - 0.5, r() - 0.5];
      const l = len * (0.4 + r() * 0.6);
      tips.push(norm([c[0] + dir[0] * l, c[1] + dir[1] * l, c[2] + dir[2] * l]));
      edges.push([center, tipIndex()]);
      if (owner !== undefined) personEdges[owner].push(edges.length - 1);
    }
  };
  for (let k = 0; k < 10; k++) spray(Math.floor(r() * N), 18 + Math.floor(r() * 14), 0.55);
  personIdx.forEach((pi, p) => {
    spray(pi, 34, 0.7, p);
    // ogni persona e' legata anche alla maglia
    for (let k = 0; k < 4; k++) {
      edges.push([pi, Math.floor(r() * N)]);
      personEdges[p].push(edges.length - 1);
    }
  });
  return { points, tips, edges, personEdges };
}

// ---------- Componenti di contenuto ----------

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
      decoding="async"
      onError={() => setFailed(true)}
      style={style}
      className="shrink-0 rounded-full object-cover ring-2 ring-[var(--color-surface-interactive-default)] bg-[var(--background)]"
    />
  );
}

/** Frase + testo completo apribile + link LinkedIn: uguale nella scatola e nella lista. */
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
      <blockquote className="text-lg text-[var(--color-text-inverse)] leading-relaxed">“{t.quote}”</blockquote>
      <details className="mt-4">
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

// ---------- Sfera ----------

export default function TestimonialSphere({ items, groupLabel, close, readFull, seeOnLinkedIn, linkedInUrl }: Props) {
  const people = items.slice(0, PERSON_LATS.length);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const geoRef = useRef<Geometry | null>(null);
  const angleRef = useRef(0.4);
  const hoverRef = useRef(false);
  const activeRef = useRef<number>(-1);
  const interactedRef = useRef(false);
  const depthRef = useRef<number[]>([]); // profondita' corrente delle persone (per l'apertura automatica)

  const activeIndex = people.findIndex((p) => p.id === activeId);
  activeRef.current = activeIndex;
  const active = activeIndex >= 0 ? people[activeIndex] : null;

  const open = (id: string) => {
    interactedRef.current = true;
    setActiveId(id);
  };

  // Disegno e animazione
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!geoRef.current) geoRef.current = buildGeometry(people.length);
    const geo = geoRef.current;
    const all = [...geo.points, ...geo.tips];
    const personStart = geo.points.length - people.length;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(wrap);

    const tilt = 0.35;
    const project = (v: V3, a: number) => {
      // rotazione attorno a Y, poi inclinazione fissa attorno a X
      const x1 = v[0] * Math.cos(a) + v[2] * Math.sin(a);
      const z1 = -v[0] * Math.sin(a) + v[2] * Math.cos(a);
      const y2 = v[1] * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = v[1] * Math.sin(tilt) + z1 * Math.cos(tilt);
      const R = Math.min(w, h) * 0.42;
      const s = 3 / (3 - z2);
      return { x: w / 2 + x1 * R * s, y: h / 2 + y2 * R * s, z: z2 };
    };

    function draw() {
      const a = angleRef.current;
      const pr = all.map((v) => project(v, a));
      ctx!.clearRect(0, 0, w, h);
      ctx!.lineWidth = 0.6;
      const activeSet = new Set(activeRef.current >= 0 ? geo.personEdges[activeRef.current] : []);
      geo.edges.forEach(([i, j], k) => {
        const p = pr[i];
        const q = pr[j];
        const depth = ((p.z + q.z) / 2 + 1) / 2; // 0 dietro, 1 davanti
        if (activeSet.has(k)) {
          ctx!.strokeStyle = `rgba(${ORANGE}, ${0.35 + depth * 0.6})`;
          ctx!.lineWidth = 0.9;
        } else {
          ctx!.strokeStyle = `rgba(${INK}, ${0.05 + depth * 0.3})`;
          ctx!.lineWidth = 0.6;
        }
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(q.x, q.y);
        ctx!.stroke();
      });
      for (let i = 0; i < personStart; i++) {
        const p = pr[i];
        const depth = (p.z + 1) / 2;
        ctx!.fillStyle = `rgba(${INK}, ${0.15 + depth * 0.55})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1 + depth * 1.2, 0, Math.PI * 2);
        ctx!.fill();
      }
      // Nodi delle persone (HTML sopra il canvas)
      people.forEach((_, i) => {
        const el = nodeRefs.current[i];
        const p = pr[personStart + i];
        depthRef.current[i] = p.z;
        if (!el) return;
        const depth = (p.z + 1) / 2;
        const isActive = activeRef.current === i;
        const scale = 0.55 + depth * 0.55;
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${isActive ? Math.max(scale, 1) : scale})`;
        el.style.opacity = String(isActive ? 1 : 0.25 + depth * 0.75);
        el.style.zIndex = String(Math.round(depth * 100) + (isActive ? 100 : 0));
        el.style.pointerEvents = p.z > -0.2 || isActive ? "auto" : "none";
        el.dataset.front = p.z > 0.15 || isActive ? "1" : "0";
      });
    }

    let raf = 0;
    let visible = false;
    const tick = () => {
      if (!reduceMotion && activeRef.current < 0) {
        angleRef.current += hoverRef.current ? SPEED * 0.25 : SPEED;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    draw();

    // Anima solo quando la sezione e' visibile; apertura automatica dopo AUTO_OPEN_MS senza interazioni
    let autoTimer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(tick);
        if (visible && entry.intersectionRatio >= 0.5 && !interactedRef.current && autoTimer === undefined) {
          autoTimer = setTimeout(() => {
            if (interactedRef.current || activeRef.current >= 0) return;
            const z = depthRef.current;
            const front = z.reduce((best, v, i) => (v > z[best] ? i : best), 0);
            setActiveId(people[front].id);
          }, AUTO_OPEN_MS);
        }
        if (!visible && autoTimer !== undefined && !interactedRef.current) {
          clearTimeout(autoTimer);
          autoTimer = undefined;
        }
      },
      { threshold: [0, 0.5] }
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(autoTimer);
      io.disconnect();
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, people.length]);

  return (
    <>
      {/* Sfera: solo da 768px */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div
            ref={wrapRef}
            className={`relative h-[520px] ${active ? "col-span-7" : "col-span-12"} transition-[grid-column] motion-reduce:transition-none`}
            onPointerEnter={() => (hoverRef.current = true)}
            onPointerLeave={() => (hoverRef.current = false)}
          >
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />
            {people.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="group absolute left-0 top-0 flex flex-col items-center will-change-transform"
                data-front="0"
              >
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  title={t.name}
                  onClick={() => open(t.id)}
                  className="rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 motion-reduce:transition-none"
                >
                  <Avatar name={t.name} image={t.image} size={44} />
                </button>
                <span
                  aria-hidden="true"
                  className="type-label mt-2 text-[11px] whitespace-nowrap text-[var(--color-text-inverse)] bg-[var(--background)] px-1 opacity-0 transition-opacity duration-300 group-data-[front=1]:opacity-100"
                >
                  {t.name}
                </span>
              </div>
            ))}
          </div>

          {/* Scatola: altezza fissa, il testo lungo scorre dentro */}
          <AnimatePresence>
            {active && (
              <motion.div
                key={active.id}
                role="region"
                aria-label={active.name}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
                className="col-span-5 relative glass rounded-xl p-6 max-h-[520px] overflow-y-auto"
              >
                <button
                  type="button"
                  onClick={() => {
                    interactedRef.current = true;
                    setActiveId(null);
                  }}
                  aria-label={close}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-text-inverse)] hover:bg-[var(--color-surface-interactive-default)] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-border-interactive)]"
                >
                  <X size={18} aria-hidden="true" />
                </button>
                <div className="flex items-center gap-4 mb-5 pr-8">
                  <Avatar name={active.name} image={active.image} size={64} />
                  <div>
                    <p className="type-work text-xl text-[var(--color-text-inverse)]">{active.name}</p>
                    <p className="text-sm text-[var(--color-text-tertiary)]">{active.role}</p>
                  </div>
                </div>
                <Recommendation t={active} readFull={readFull} seeOnLinkedIn={seeOnLinkedIn} linkedInUrl={linkedInUrl} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nomi: stessa scelta da tastiera e screen reader */}
        <div role="group" aria-label={groupLabel} className="mt-6 flex flex-wrap justify-center gap-2">
          {people.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={t.id === activeId}
              onClick={() => (t.id === activeId ? setActiveId(null) : open(t.id))}
              className={`type-label text-xs px-3 py-2 rounded-full border transition-colors ${
                t.id === activeId
                  ? "bg-[var(--color-label-background)] border-[var(--color-label-background)] text-[var(--color-label-text)]"
                  : "border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-[var(--color-border-interactive)]"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
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
