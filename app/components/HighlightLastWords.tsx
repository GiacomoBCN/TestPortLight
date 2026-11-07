import React from "react";

/**
 * Evidenzia le ultime `count` parole di un testo (default 2) con la fascia
 * gialla dell'utility .highlight. Il testo resta identico: cambia solo il markup.
 */
export default function HighlightLastWords({
  text,
  count = 2,
}: {
  text: string;
  count?: number;
}) {
  const words = text.trim().split(/\s+/);
  if (words.length <= count) return <span className="highlight">{text}</span>;
  const head = words.slice(0, -count).join(" ");
  const tail = words.slice(-count).join(" ");
  return (
    <>
      {head} <span className="highlight">{tail}</span>
    </>
  );
}
