import React from "react";

/**
 * Numero di sezione dei case study: sempre a due cifre ("01").
 * Red Hat Display 700, inchiostro, barretta arancione a sinistra.
 * Decorativo: aria-hidden (il titolo della sezione dice gia' tutto).
 * Token in app/globals.css: --section-number-*.
 * size="sm": stessa forma in piccolo, per le liste numerate (es. le regole dell'About in home).
 */
export default function SectionNumber({ n, size = "md" }: { n: number; size?: "md" | "sm" }) {
  const sizeClasses =
    size === "sm"
      ? "text-lg border-l-[3px] pl-2 min-w-[2.75rem] tabular-nums"
      : "text-[length:var(--section-number-size-mobile)] md:text-[length:var(--section-number-size-desktop)] border-l-[length:var(--section-number-bar-width)] pl-[var(--section-number-bar-gap)]";
  return (
    <div
      aria-hidden="true"
      className={`type-number shrink-0 leading-none text-[var(--section-number-color)] border-[color:var(--section-number-bar-color)] ${sizeClasses}`}
    >
      {String(n).padStart(2, "0")}
    </div>
  );
}
