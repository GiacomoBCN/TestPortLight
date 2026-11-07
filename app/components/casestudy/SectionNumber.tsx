import React from "react";

/**
 * Numero di sezione dei case study: sempre a due cifre ("01").
 * Red Hat Display 700, inchiostro, barretta arancione a sinistra.
 * Decorativo: aria-hidden (il titolo della sezione dice gia' tutto).
 * Token in app/globals.css: --section-number-*.
 */
export default function SectionNumber({ n }: { n: number }) {
  return (
    <div
      aria-hidden="true"
      className="type-number shrink-0 leading-none text-[length:var(--section-number-size-mobile)] md:text-[length:var(--section-number-size-desktop)] text-[var(--section-number-color)] border-l-[length:var(--section-number-bar-width)] border-[color:var(--section-number-bar-color)] pl-[var(--section-number-bar-gap)]"
    >
      {String(n).padStart(2, "0")}
    </div>
  );
}
