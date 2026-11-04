import React from "react";

/**
 * Cornice delle box (.sketch), copiata dal bordo esterno del disegno delle fasce
 * (scripts/fascia/lato-sinistro-linee.svg), senza il disegno:
 *  - .sf-band    banda azzurra chiara sui 4 lati
 *  - .sf-line    linea piu' intensa sul lato interno, a tratti interrotta
 *  - .sf-corner  angoli irregolari, ognuno con la sua forma
 * Misure, colori e opacita' in globals.css (sezione CORNICI DELLE BOX), variabili --sf-*.
 * Elementi HTML semplici: regolabili dall'ispettore.
 */
export default function SketchFrame() {
  return (
    <span className="sketch-frame" aria-hidden="true">
      <span className="sf-band sf-band-top" />
      <span className="sf-band sf-band-bottom" />
      <span className="sf-band sf-band-left" />
      <span className="sf-band sf-band-right" />
      <span className="sf-line sf-line-top" />
      <span className="sf-line sf-line-bottom" />
      <span className="sf-line sf-line-left" />
      <span className="sf-line sf-line-right" />
      <span className="sf-corner sf-corner-tl" />
      <span className="sf-corner sf-corner-tr" />
      <span className="sf-corner sf-corner-br" />
      <span className="sf-corner sf-corner-bl" />
    </span>
  );
}
