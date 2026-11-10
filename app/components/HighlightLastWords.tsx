import React from "react";

/**
 * Evidenzia la fine di un titolo con la fascia gialla dell'utility .highlight.
 * Regola generale (se `count` non e' indicato):
 *   1 parola      → evidenziata tutta
 *   2 parole      → solo l'ultima (es. "TuPlanRedondo PWA" → "PWA")
 *   3 o piu'      → le ultime due
 * Passando `count` si forza un numero preciso di parole.
 * Il testo resta identico: cambia solo il markup.
 */
export default function HighlightLastWords({
  text,
  count,
}: {
  text: string;
  count?: number;
}) {
  const words = text.trim().split(/\s+/);
  const n = count ?? (words.length <= 2 ? 1 : 2);
  if (words.length <= n) return <span className="highlight">{text}</span>;
  const head = words.slice(0, -n).join(" ");
  const tail = words.slice(-n).join(" ");
  return (
    <>
      {head} <span className="highlight">{tail}</span>
    </>
  );
}
