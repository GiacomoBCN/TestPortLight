import React from "react";

/**
 * Cornice "linee di costruzione" dei box (.sketch): SVG inline con elementi veri,
 * ognuno con la sua classe, cosi' si possono regolare dall'ispettore.
 * Geometria e colori in globals.css (sezione LINEE DI COSTRUZIONE).
 *  - .sketch-band  bande pallide 4px, estremita' arrotondate
 *  - .sketch-line  filetti 1px, estremita' arrotondate
 *  - .sketch-dot   puntini agli incroci
 */
export default function SketchFrame() {
  return (
    <svg className="sketch-frame" aria-hidden="true" focusable="false">
      <rect className="sketch-band sketch-band-top" />
      <rect className="sketch-band sketch-band-bottom" />
      <rect className="sketch-band sketch-band-left" />
      <rect className="sketch-band sketch-band-right" />
      <rect className="sketch-line sketch-line-top" />
      <rect className="sketch-line sketch-line-bottom" />
      <rect className="sketch-line sketch-line-left" />
      <rect className="sketch-line sketch-line-right" />
      <circle className="sketch-dot sketch-dot-tl" />
      <circle className="sketch-dot sketch-dot-tr" />
      <circle className="sketch-dot sketch-dot-bl" />
      <circle className="sketch-dot sketch-dot-br" />
    </svg>
  );
}
