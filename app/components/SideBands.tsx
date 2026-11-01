"use client";
import React from "react";
import { FASCIA_SYMBOL } from "./fascia-symbol";

/**
 * Fasce laterali fisse a tutta altezza con l'illustrazione lato-sinistro-linee.svg.
 * L'SVG è inline una sola volta come <symbol> ritagliato sulla parte destra del disegno
 * (x dal 25% al 100%); la fascia destra riusa il simbolo specchiato.
 * La colonna centrale sta tra 900 e 1000px e le fasce prendono il resto (--colonna, --band in globals.css).
 * Il disegno sta a tutta altezza, ancorato al bordo verso il contenuto: intero se la fascia e' larga
 * abbastanza, altrimenti la fascia ne taglia la parte esterna.
 * Sotto i 1280px le fasce non sono renderizzate.
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
        viewBox="0 0 1912.5 3798"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
      >
        <use href="#fascia-sx" width="1912.5" height="3798" />
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
