"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { getImagePath } from "@/utils/image";

/**
 * Testimonianze come sfera di punti e linee sempre in movimento (da 768px).
 * Canvas 2D fatto a mano, nessuna libreria: circa 220 punti su una sfera che ruota su due assi,
 * maglia di linee sottili, corde e "ciuffi" a raggiera. Le cinque persone sono nodi con la foto:
 * ruotano con il resto, in primo piano mostrano il nome, dietro si allontanano.
 *  - la sfera non si ferma mai; col mouse sopra i punti vicini si scostano e tornano al loro posto
 *    (come le bande laterali) e il movimento del mouse da' una spinta alla rotazione;
 *  - clic su una persona: si apre un pop-up al centro, sopra la sfera, con foto, nome, ruolo e frase;
 *    il testo completo (<details> nativo) scorre dentro il pop-up, che ha altezza massima fissa;
 *    passando da una persona all'altra il pop-up si dissolve e riappare (mai due insieme);
 *    si chiude con la X, con Esc o cliccando fuori;
 *  - se nessuno clicca, dopo qualche secondo con la sezione visibile si apre da solo il pop-up
 *    della persona piu' in primo piano (una volta sola, senza spostare il focus);
 *  - prefers-reduced-motion: sfera ferma, nessuna reazione al mouse;
 *  - l'animazione gira solo quando la sezione e' visibile.
 * Tastiera e screen reader: le foto sono pulsanti (nome e ruolo come etichetta); con il focus su una
 * foto la sfera si ferma, cosi' il pulsante non scappa. Sotto 768px niente sfera: lista verticale.
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
  close: string;
  readFull: string;
  seeOnLinkedIn: string;
  linkedInUrl: string;
}

const AUTO_OPEN_MS = 6000;
const YAW_SPEED = 0.0045; // rotazione di base attorno all'asse verticale, radianti per frame (~60 fps)
const PITCH_SPEED = 0.0013; // rotazione di base attorno all'asse orizzontale
const PUSH_RADIUS = 120; // px: raggio d'influenza del mouse sui punti
const PUSH_MAX = 14; // px: spostamento massimo del punto piu' vicino al mouse
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

export default function TestimonialSphere({ items, close, readFull, seeOnLinkedIn, linkedInUrl }: Props) {
  const people = items.slice(0, PERSON_LATS.length);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const geoRef = useRef<Geometry | null>(null);
  const activeRef = useRef<number>(-1);
  const interactedRef = useRef(false);
  const focusPausedRef = useRef(false);
  const depthRef = useRef<number[]>([]); // profondita' corrente delle persone (per l'apertura automatica)
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const focusOnOpenRef = useRef(false);

  const activeIndex = people.findIndex((p) => p.id === activeId);
  activeRef.current = activeIndex;
  const active = activeIndex >= 0 ? people[activeIndex] : null;

  const open = (id: string, moveFocus: boolean) => {
    interactedRef.current = true;
    focusOnOpenRef.current = moveFocus;
    setActiveId(id);
  };
  const closePopup = () => {
    const i = activeRef.current;
    interactedRef.current = true;
    setActiveId(null);
    // il focus torna alla foto da cui si era aperto, se era nel pop-up
    if (i >= 0 && popupRef.current?.contains(document.activeElement)) buttonRefs.current[i]?.focus();
  };

  // Esc chiude (il focus entra nel pop-up dal ref, solo se lo apre l'utente da tastiera)
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

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
    // spostamento a schermo di ogni punto (reazione al mouse), che torna a zero da solo
    const off = all.map(() => ({ x: 0, y: 0 }));

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
      const R = Math.min(w, h) * 0.44;
      const s = 3 / (3 - z2);
      return { x: w / 2 + x1 * R * s, y: h / 2 + y2 * R * s, z: z2 };
    };

    function draw() {
      const pr = all.map(project);
      const ptr = pointerRef.current;
      // reazione al mouse: i punti vicini si scostano, poi tornano (molla)
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
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.pointerEvents = p.z > -0.2 ? "auto" : "none";
        el.dataset.front = p.z > 0.15 || isActive ? "1" : "0";
      });
    }

    let raf = 0;
    const tick = () => {
      if (!reduceMotion && !focusPausedRef.current) {
        t += 1;
        // la spinta data dal mouse si smorza e torna alla velocita' di base
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

    // Mouse: posizione per lo scostamento dei punti e spinta alla rotazione
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

    // Anima solo quando la sezione e' visibile; apertura automatica dopo AUTO_OPEN_MS senza clic
    let autoTimer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (entry.isIntersecting) raf = requestAnimationFrame(tick);
        if (entry.intersectionRatio >= 0.5 && !interactedRef.current && autoTimer === undefined) {
          autoTimer = setTimeout(() => {
            if (interactedRef.current || activeRef.current >= 0) return;
            const z = depthRef.current;
            const front = z.reduce((best, v, i) => (v > z[best] ? i : best), 0);
            focusOnOpenRef.current = false;
            setActiveId(people[front].id);
          }, AUTO_OPEN_MS);
        }
        if (!entry.isIntersecting && autoTimer !== undefined && !interactedRef.current) {
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
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, people.length]);

  return (
    <>
      {/* Sfera con pop-up sopra: solo da 768px */}
      <div
        ref={wrapRef}
        className="hidden md:block relative h-[600px]"
        onClick={(e) => {
          // clic fuori dal pop-up e fuori dalle foto: chiude
          if (active && e.target === e.currentTarget.querySelector("canvas")) closePopup();
        }}
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
              ref={(el) => {
                buttonRefs.current[i] = el;
              }}
              type="button"
              aria-label={`${t.name}, ${t.role}`}
              aria-expanded={t.id === activeId}
              onClick={(e) => open(t.id, e.detail === 0)}
              // pausa solo con il focus da tastiera (dopo un clic la sfera continua a girare)
              onFocus={(e) => (focusPausedRef.current = e.currentTarget.matches(":focus-visible"))}
              onBlur={() => (focusPausedRef.current = false)}
              className="rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-border-interactive)]"
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

        {/* Pop-up al centro: altezza massima fissa, il testo lungo scorre dentro.
            mode="wait": esce il vecchio, poi entra il nuovo (mai due pop-up insieme). */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              ref={(el: HTMLDivElement | null) => {
                popupRef.current = el;
                // il pop-up nuovo entra dopo l'uscita del vecchio: il focus va dato quando esiste
                if (el && focusOnOpenRef.current) {
                  focusOnOpenRef.current = false;
                  el.focus({ preventScroll: true });
                }
              }}
              role="dialog"
              aria-label={active.name}
              tabIndex={-1}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
              className="absolute z-[300] left-1/2 top-1/2 w-[min(28rem,90%)] max-h-[440px] overflow-y-auto rounded-xl p-6 bg-[var(--background)]/95 backdrop-blur-sm border border-[var(--color-border-default)] shadow-2xl outline-none"
              style={{ x: "-50%", y: "-50%" }}
            >
              <button
                type="button"
                onClick={closePopup}
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
