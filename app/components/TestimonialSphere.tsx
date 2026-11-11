"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { getImagePath } from "@/utils/image";

/**
 * Testimonianze (da 768px): sfera di punti e linee azzurre sempre in movimento a sinistra,
 * citazione sempre leggibile a destra. Canvas 2D fatto a mano, nessuna libreria.
 *  - la sfera (circa meta' schermo) ruota su due assi e non si ferma mai; col mouse sopra i punti
 *    vicini si scostano e tornano (come le bande laterali) e la rotazione prende una spinta;
 *  - le cinque persone sono nodi con la foto; quella della citazione e' evidenziata
 *    (linee arancioni, foto piena e piu' grande, nome sempre visibile);
 *  - la citazione cambia da sola ogni ROTATE_MS, insieme alla persona evidenziata;
 *    si ferma con mouse o focus sulla citazione, con il testo completo aperto e con il pulsante pausa;
 *    con prefers-reduced-motion non cambia da sola e la sfera e' ferma;
 *  - clic su una foto o su un pallino sotto la citazione: mostra quella persona;
 *  - il testo completo (<details> nativo) scorre dentro la colonna, che ha altezza fissa:
 *    la sezione non cambia altezza;
 *  - l'animazione gira solo quando la sezione e' visibile.
 * Accessibilita': canvas e foto sulla sfera sono solo per il puntatore (aria-hidden); pallini e
 * pulsante pausa sono pulsanti veri. Sotto 768px niente sfera: lista verticale.
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  group?: string; // stesso gruppo = collegati da archi sulla sfera
  image?: string;
  quote: string;
  text: string;
}

interface Props {
  items: Testimonial[];
  readFull: string;
  seeOnLinkedIn: string;
  linkedInUrl: string;
  pause: string;
  play: string;
  showQuoteFrom: string;
}

const ROTATE_MS = 7000; // ogni quanto cambia la citazione
const SPHERE_H = 440; // px: altezza della sfera (circa meta' schermo)
const YAW_SPEED = 0.0045; // rotazione di base attorno all'asse verticale, radianti per frame (~60 fps)
const PITCH_SPEED = 0.0013; // rotazione di base attorno all'asse orizzontale
const PUSH_RADIUS = 100; // px: raggio d'influenza del mouse sui punti
const PUSH_MAX = 12; // px: spostamento massimo del punto piu' vicino al mouse
const BLUE = "13, 153, 255"; // #0D99FF, lo stesso azzurro delle cornici (--sf-line-color)
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
  groupEdges: Set<number>; // linee tra persone dello stesso gruppo (disegnate piu' marcate)
}

function buildGeometry(groups: (string | undefined)[]): Geometry {
  const personCount = groups.length;
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
  // Linee rette tra le persone dello stesso gruppo: attraversano la sfera.
  // Ogni linea appartiene a entrambe le persone, cosi' si accende con l'una o con l'altra.
  const groupEdges = new Set<number>();
  for (let a = 0; a < personCount; a++) {
    for (let b = a + 1; b < personCount; b++) {
      if (!groups[a] || groups[a] !== groups[b]) continue;
      edges.push([personIdx[a], personIdx[b]]);
      groupEdges.add(edges.length - 1);
      personEdges[a].push(edges.length - 1);
      personEdges[b].push(edges.length - 1);
    }
  }
  return { points, tips, edges, personEdges, groupEdges };
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
  onToggle,
  large = false,
}: {
  t: Testimonial;
  readFull: string;
  seeOnLinkedIn: string;
  linkedInUrl: string;
  onToggle?: (open: boolean) => void;
  large?: boolean;
}) {
  return (
    <>
      <blockquote className={`${large ? "text-xl md:text-2xl" : "text-lg"} text-[var(--color-text-inverse)] leading-relaxed`}>“{t.quote}”</blockquote>
      <details className="mt-4" onToggle={(e) => onToggle?.(e.currentTarget.open)}>
        <summary className="cursor-pointer w-fit py-3 -my-3 text-sm font-medium text-[var(--color-text-link-default)] link-underline marker:text-[var(--color-list-bullet)]">
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
              className="inline-block py-3 -my-3 text-sm font-medium text-[var(--color-text-link-default)] link-underline"
            >
              {seeOnLinkedIn}
            </a>
          </p>
        </div>
      </details>
    </>
  );
}


// ---------- Sfera + citazione ----------

export default function TestimonialSphere({
  items,
  readFull,
  seeOnLinkedIn,
  linkedInUrl,
  pause,
  play,
  showQuoteFrom,
}: Props) {
  const people = items.slice(0, PERSON_LATS.length);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false); // pausa scelta dall'utente
  const [hold, setHold] = useState(false); // mouse/focus sulla citazione
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const geoRef = useRef<Geometry | null>(null);
  const activeRef = useRef(0);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  activeRef.current = activeIndex;
  const active = people[activeIndex];

  const show = (i: number) => {
    setDetailsOpen(false);
    setActiveIndex(i);
  };

  // Cambio automatico della citazione
  const rotating = !reduceMotion && !paused && !hold && !detailsOpen && inView;
  useEffect(() => {
    if (!rotating) return;
    const id = setTimeout(() => show((activeIndex + 1) % people.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [rotating, activeIndex, people.length]);

  // Disegno e animazione della sfera
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!geoRef.current) geoRef.current = buildGeometry(people.map((p) => p.group));
    const geo = geoRef.current;
    const all = [...geo.points, ...geo.tips];
    const personStart = geo.points.length - people.length;
    const off = all.map(() => ({ x: 0, y: 0 })); // spostamento a schermo dovuto al mouse

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

    let yaw = 0.4;
    let pitch = 0.35;
    let vYaw = YAW_SPEED;
    let vPitch = PITCH_SPEED;
    let t = 0;

    const project = (v: V3) => {
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const x1 = v[0] * cy + v[2] * sy;
      const z1 = -v[0] * sy + v[2] * cy;
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const y2 = v[1] * cp - z1 * sp;
      const z2 = v[1] * sp + z1 * cp;
      const R = Math.min(w, h) * 0.42;
      const s = 3 / (3 - z2);
      return { x: w / 2 + x1 * R * s, y: h / 2 + y2 * R * s, z: z2 };
    };

    function draw() {
      const pr = all.map(project);
      const ptr = pointerRef.current;
      pr.forEach((p, i) => {
        let tx = 0;
        let ty = 0;
        if (ptr && !reduceMotion) {
          const dx = p.x - ptr.x;
          const dy = p.y - ptr.y;
          const d = Math.hypot(dx, dy);
          if (d < PUSH_RADIUS && d > 0.01) {
            const f = PUSH_MAX * (1 - d / PUSH_RADIUS) * (0.4 + ((p.z + 1) / 2) * 0.6);
            tx = (dx / d) * f;
            ty = (dy / d) * f;
          }
        }
        off[i].x += (tx - off[i].x) * 0.18;
        off[i].y += (ty - off[i].y) * 0.18;
        p.x += off[i].x;
        p.y += off[i].y;
      });

      ctx!.clearRect(0, 0, w, h);
      const activeSet = new Set(geo.personEdges[activeRef.current] ?? []);
      geo.edges.forEach(([i, j], k) => {
        const p = pr[i];
        const q = pr[j];
        const depth = ((p.z + q.z) / 2 + 1) / 2; // 0 dietro, 1 davanti
        if (activeSet.has(k) && geo.groupEdges.has(k)) {
          // collegamento con le persone dello stesso gruppo: piu' marcato, visibile anche sul retro
          ctx!.strokeStyle = `rgba(${ORANGE}, ${0.55 + depth * 0.45})`;
          ctx!.lineWidth = 2;
        } else if (activeSet.has(k)) {
          ctx!.strokeStyle = `rgba(${ORANGE}, ${0.35 + depth * 0.6})`;
          ctx!.lineWidth = 0.9;
        } else {
          ctx!.strokeStyle = `rgba(${BLUE}, ${0.08 + depth * 0.4})`;
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
        ctx!.fillStyle = `rgba(${BLUE}, ${0.2 + depth * 0.6})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1 + depth * 1.2, 0, Math.PI * 2);
        ctx!.fill();
      }
      people.forEach((_, i) => {
        const el = nodeRefs.current[i];
        const p = pr[personStart + i];
        if (!el) return;
        const depth = (p.z + 1) / 2;
        const isActive = activeRef.current === i;
        const scale = 0.5 + depth * 0.5;
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${isActive ? Math.max(scale, 1) : scale})`;
        el.style.opacity = String(isActive ? 1 : 0.25 + depth * 0.75);
        el.style.zIndex = String(Math.round(depth * 100) + (isActive ? 100 : 0));
        el.style.pointerEvents = p.z > -0.2 || isActive ? "auto" : "none";
        el.dataset.active = isActive ? "1" : "0";
      });
    }

    let raf = 0;
    const tick = () => {
      if (!reduceMotion) {
        t += 1;
        vYaw += (YAW_SPEED - vYaw) * 0.02;
        vPitch += (PITCH_SPEED * Math.sin(t / 400) - vPitch) * 0.02;
        yaw += vYaw;
        pitch += vPitch;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(wrap);

    let last: { x: number; y: number } | null = null;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const p = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (last && !reduceMotion) {
        vYaw = Math.max(-0.04, Math.min(0.04, vYaw + (p.x - last.x) * 0.00012));
        vPitch = Math.max(-0.03, Math.min(0.03, vPitch + (p.y - last.y) * 0.00008));
      }
      last = p;
      pointerRef.current = p;
    };
    const onLeave = () => {
      last = null;
      pointerRef.current = null;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    // Animazione e cambio automatico solo con la sezione visibile
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
      setInView(entry.isIntersecting);
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, people.length]);

  return (
    <>
      {/* Desktop: sfera a sinistra, citazione sempre leggibile a destra */}
      <div className="hidden md:grid grid-cols-12 gap-10 items-center">
        {/* isolate: lo z-index delle foto resta dentro la sfera (non passano sopra il menu fisso) */}
        <div ref={wrapRef} className="col-span-6 relative isolate" style={{ height: SPHERE_H }}>
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />
          {people.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              aria-hidden="true"
              data-active="0"
              className="group absolute left-0 top-0 flex flex-col items-center will-change-transform"
            >
              <button
                type="button"
                tabIndex={-1}
                title={t.name}
                onClick={() => show(i)}
                className="relative before:absolute before:-inset-3 before:content-[''] rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 motion-reduce:transition-none"
              >
                <Avatar name={t.name} image={t.image} size={40} />
              </button>
              <span className="type-label mt-1.5 text-[10px] whitespace-nowrap text-[var(--color-text-inverse)] bg-[var(--background)] px-1 opacity-0 transition-opacity duration-300 group-data-[active=1]:opacity-100">
                {t.name}
              </span>
            </div>
          ))}
        </div>

        {/* Citazione: altezza fissa, il testo completo scorre dentro */}
        <div
          className="col-span-6 flex flex-col"
          style={{ height: SPHERE_H }}
          onPointerEnter={() => setHold(true)}
          onPointerLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHold(false);
          }}
        >
          {/* -m-1 p-1: spazio per l'anello delle foto, che la colonna (che scorre) altrimenti taglierebbe */}
          <div className="flex-1 min-h-0 overflow-y-auto -m-1 p-1 pr-3 flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={active.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                // my-auto centra senza tagliare l'inizio quando il testo completo scorre
                className="my-auto"
              >
                <div className="flex items-center gap-4 mb-5">
                  <Avatar name={active.name} image={active.image} size={56} />
                  <figcaption className="min-w-0">
                    <p className="type-work text-xl text-[var(--color-text-inverse)]">{active.name}</p>
                    <p className="text-sm text-[var(--color-text-tertiary)]">{active.role}</p>
                  </figcaption>
                </div>
                <Recommendation
                  t={active}
                  readFull={readFull}
                  seeOnLinkedIn={seeOnLinkedIn}
                  linkedInUrl={linkedInUrl}
                  onToggle={setDetailsOpen}
                  large
                />
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Pallini (una persona ciascuno) e pausa */}
          <div className="pt-5 flex items-center gap-1">
            {people.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`${showQuoteFrom} ${t.name}`}
                aria-current={i === activeIndex ? "true" : undefined}
                onClick={() => show(i)}
                className="group w-6 h-6 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[var(--color-border-interactive)]"
              >
                <span
                  className={`block rounded-full transition-all duration-300 motion-reduce:transition-none ${
                    i === activeIndex
                      ? "w-5 h-2 bg-[var(--color-surface-interactive-default)]"
                      : "w-2 h-2 bg-[var(--color-ink)]/25 group-hover:bg-[var(--color-ink)]/50"
                  }`}
                />
              </button>
            ))}
            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? play : pause}
                className="ml-0.5 -mr-1.5 -my-1.5 w-11 h-11 flex items-center justify-center rounded-full text-[var(--color-text-tertiary)] hover:text-[var(--color-text-inverse)] focus-visible:outline-2 focus-visible:outline-[var(--color-border-interactive)]"
              >
                {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              </button>
            )}
          </div>
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
