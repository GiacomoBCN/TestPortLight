"use client";
import React from "react";
import { FASCIA_SYMBOL } from "./fascia-symbol";

/**
 * Fasce laterali fisse a tutta altezza con l'illustrazione lato-sinistro-linee.svg.
 * L'SVG è inline una sola volta come <symbol> ritagliato sulla parte destra del disegno
 * (x dal 45% al 100%); la fascia destra riusa il simbolo specchiato.
 * Il disegno si adatta alla larghezza della fascia, allineato in alto; la fascia taglia ciò che sborda in basso.
 * Larghezza: var(--band) (globals.css); sotto i 1024px le fasce non sono renderizzate.
 * Palette: variabili --fascia-* sul body, cambiate con l'attributo data-palette.
 */
export default function SideBands({ inner = false }: { inner?: boolean }) {
  const band = (side: "left" | "right") => (
    <div
      className={`side-band side-band-${side}`}
      style={inner ? { opacity: 0.7 } : undefined}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1402.5 3798"
        preserveAspectRatio="xMidYMin meet"
        width="100%"
        style={{ display: "block", width: "100%", height: "auto" }}
        focusable="false"
      >
        <use href="#fascia-sx" width="1402.5" height="3798" />
      </svg>
    </div>
  );

  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
        focusable="false"
        dangerouslySetInnerHTML={{ __html: FASCIA_SYMBOL }}
      />
      {band("left")}
      {band("right")}
    </>
  );
}
