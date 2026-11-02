"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { animate } from "framer-motion";

// Il simbolo (344 KB) serve solo nell'HTML generato dal server: nel bundle JS non entra.
// `typeof window` e' sostituito in fase di build, quindi nel bundle client il require sparisce.
// All'idratazione React non riscrive il contenuto di dangerouslySetInnerHTML: resta quello dell'HTML.
const FASCIA_SYMBOL: string =
  typeof window === "undefined"
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      (require("./fascia-symbol") as typeof import("./fascia-symbol")).FASCIA_SYMBOL
    : "";

/**
 * Fasce laterali fisse a tutta altezza con l'illustrazione lato-sinistro-linee.svg.
 * L'SVG è inline una sola volta come <symbol> ritagliato sulla parte destra del disegno
 * (x dal 25% al 100%); la fascia destra riusa il simbolo specchiato.
 * La colonna centrale e' larga almeno 1280px e si espande fino a dove finisce il disegno (--colonna,
 * --band in globals.css). Il disegno sta a tutta altezza, ancorato al bordo verso il contenuto:
 * intero se la fascia e' larga abbastanza, altrimenti la fascia ne taglia la parte esterna.
 * Sotto i 1280px le fasce non sono renderizzate.
 * Palette: variabili --fascia-* sul body, cambiate con l'attributo data-palette.
 *
 * Interazione al mouse: col cursore sopra una fascia le forme vicine si spostano via dal cursore
 * e tornano al loro posto, con un'onda che decresce con la distanza. Restano fermi il gruppo delle
 * linee blu e la forma di sfondo a tutta fascia. Nessun movimento senza mouse o con
 * prefers-reduced-motion. Per muovere le forme di una fascia sola, solo sui dispositivi con mouse
 * e a pagina caricata (idle) ogni <use> viene sostituito da una copia inline identica del simbolo:
 * l'HTML resta quello di prima e su touch / reduced-motion il DOM non cambia.
 */

const USE = '<use href="#fascia-sx" width="1912.5" height="3798" />';

// Stesso effetto del <use>: un <svg> annidato con il viewBox del simbolo, senza id duplicati.
// Costruito nel browser a partire dal simbolo gia' presente nella pagina.
let inlineCache: { html: string; viewBox: string } | null = null;
function inlineCopy() {
  if (inlineCache) return inlineCache;
  const symbol = document.getElementById("fascia-sx");
  if (!symbol) return null;
  const viewBox = symbol.getAttribute("viewBox") || "";
  const html =
    `<svg class="fascia-inline" viewBox="${viewBox}" width="1912.5" height="3798">` +
    symbol.innerHTML.replace('<g id="lines">', '<g data-fascia-lines="">') +
    "</svg>";
  inlineCache = { html, viewBox };
  return inlineCache;
}

// Parametri dell'onda (px a schermo, secondi)
const RADIUS = 140; // raggio d'influenza attorno al cursore
const MAX_SHIFT = 7; // spostamento massimo, per la forma piu' vicina
const DURATION = 0.35; // andata e ritorno
const WAVE_DELAY = 0.08; // ritardo massimo, per le forme al bordo del raggio

type Shape = { el: SVGGraphicsElement; cx: number; cy: number; busyUntil: number };

export default function SideBands({ inner = false }: { inner?: boolean }) {
  const leftRef = useRef<SVGSVGElement>(null);
  const rightRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mouse.matches || reduced.matches) return;

    const svgs = [leftRef.current, rightRef.current].filter(Boolean) as SVGSVGElement[];
    const shapesBySvg = new Map<SVGSVGElement, Shape[]>();
    let frame = 0;
    let last: PointerEvent | null = null;

    // Copie inline al primo momento libero dopo il caricamento
    const inline = () => {
      const copy = inlineCopy();
      if (!copy) return;
      svgs.forEach((s) => {
        if (!s.querySelector(".fascia-inline")) s.innerHTML = copy.html;
      });
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(inline, { timeout: 2000 })
      : window.setTimeout(inline, 200);

    // Centri delle forme in coordinate del disegno, calcolati alla prima passata del mouse
    const shapesOf = (svg: SVGSVGElement) => {
      let shapes = shapesBySvg.get(svg);
      if (shapes) return shapes;
      const [, , vbW, vbH] = (inlineCopy()?.viewBox || "0 0 0 0").split(/\s+/).map(Number);
      shapes = [];
      svg.querySelectorAll<SVGGraphicsElement>(".fascia-inline > path").forEach((el) => {
        const b = el.getBBox();
        if (b.width >= vbW * 0.9 && b.height >= vbH * 0.9) return; // sfondo a tutta fascia
        shapes!.push({ el, cx: b.x + b.width / 2, cy: b.y + b.height / 2, busyUntil: 0 });
      });
      shapesBySvg.set(svg, shapes);
      return shapes;
    };

    const tick = () => {
      frame = 0;
      const e = last;
      if (!e || reduced.matches) return;
      const svg = svgs.find((s) => {
        const band = s.parentElement!.getBoundingClientRect();
        return band.width > 0 && e.clientX >= band.left && e.clientX < band.right;
      });
      const copy = inlineCopy();
      if (svg && copy && !svg.querySelector(".fascia-inline")) {
        svg.innerHTML = copy.html; // il contenuto e' stato riscritto: nuova copia, nuove forme
        shapesBySvg.delete(svg);
      }
      const drawing = svg?.querySelector<SVGSVGElement>(".fascia-inline");
      const ctm = drawing?.getScreenCTM();
      if (!svg || !ctm) return;
      const scale = Math.hypot(ctm.a, ctm.b); // px a schermo per unita' del disegno
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      const r = RADIUS / scale;
      const now = performance.now();
      for (const s of shapesOf(svg)) {
        if (s.busyUntil > now) continue;
        const dx = s.cx - p.x;
        const dy = s.cy - p.y;
        const d = Math.hypot(dx, dy);
        if (d >= r) continue;
        const k = 1 - d / r; // 1 sotto il cursore, 0 al bordo del raggio
        if (MAX_SHIFT * k * k < 0.5) continue;
        const shift = (MAX_SHIFT * k * k) / scale; // in unita' del disegno
        const ux = d > 0 ? dx / d : 0;
        const uy = d > 0 ? dy / d : -1;
        const delay = WAVE_DELAY * (1 - k);
        s.busyUntil = now + (delay + DURATION) * 1000;
        animate(
          s.el,
          { x: [0, ux * shift, 0], y: [0, uy * shift, 0] },
          { duration: DURATION, delay, times: [0, 0.35, 1], ease: ["easeOut", "easeInOut"] },
        );
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  // Gli <svg> sono creati una volta sola: ai re-render (scroll, cambio pagina) React non li
  // tocca, quindi non riscrive il simbolo ne' rimette il <use> al posto delle copie inline.
  const svgs = useMemo(
    () => ({
      symbol: (
        <svg
          width="0"
          height="0"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
          aria-hidden="true"
          focusable="false"
          // Il contenuto e' volutamente diverso tra server e client (vedi FASCIA_SYMBOL):
          // React tiene quello dell'HTML, qui si spegne solo l'avviso di idratazione in dev.
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: FASCIA_SYMBOL }}
        />
      ),
      left: drawing(leftRef),
      right: drawing(rightRef),
    }),
    [],
  );

  const band = (side: "left" | "right") => (
    <div
      className={`side-band side-band-${side}`}
      style={inner ? { opacity: 0.7 } : undefined}
      aria-hidden="true"
    >
      {svgs[side]}
    </div>
  );

  return (
    <>
      {svgs.symbol}
      {band("left")}
      {band("right")}
    </>
  );
}

function drawing(ref: React.RefObject<SVGSVGElement | null>) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 1912.5 3798"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: USE }}
    />
  );
}
