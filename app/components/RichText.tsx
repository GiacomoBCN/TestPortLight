import React from "react";

/**
 * Rende il mini-markup dei file in content/:
 *   **testo**     → <strong>testo</strong>
 *                   (oppure <span className={boldClassName}> se boldClassName e' passato,
 *                   per i numeri evidenziati nei paragrafi: "text-ink-900 font-semibold")
 *   *testo*       → <em>testo</em>
 *   [testo](url)  → <a href={url} target="_blank" rel="noopener noreferrer" className={linkClassName}>
 *   a capo (\n)   → <br />
 * Tutto il resto, spazi compresi, resta com'e'.
 */
const TOKEN = /\*\*([\s\S]+?)\*\*|\*([^*\n]+?)\*|\[([^\]]+)\]\(([^)\s]+)\)|\n/g;

export default function RichText({
  text,
  boldClassName,
  linkClassName,
}: {
  text: string;
  boldClassName?: string;
  linkClassName?: string;
}) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = out.length;
    if (m[1] !== undefined) {
      out.push(
        boldClassName ? (
          <span key={k} className={boldClassName}>{m[1]}</span>
        ) : (
          <strong key={k}>{m[1]}</strong>
        )
      );
    } else if (m[2] !== undefined) {
      out.push(<em key={k}>{m[2]}</em>);
    } else if (m[3] !== undefined) {
      out.push(
        <a key={k} href={m[4]} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          {m[3]}
        </a>
      );
    } else {
      out.push(<br key={k} />);
    }
    last = TOKEN.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
