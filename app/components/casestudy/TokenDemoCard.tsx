"use client";
import React from "react";
import { Link2, Copy, Laugh, Smile, Meh, Frown, Trash2 } from "lucide-react";
import styles from "./TokenDemoCard.module.css";
import { designSystem } from "@/content/design-system";

/**
 * Demo dei tre livelli di token, scritta da zero per questa pagina.
 * Le chip cambiano solo l'attributo data-source sul contenitore: i colori
 * li decide il CSS (TokenDemoCard.module.css). Questo file non contiene
 * nomi di fonti ne' colori: l'elenco delle fonti e' in content/design-system.ts.
 */

const { demo } = designSystem;

// I sei token di livello 3 che cambiano con la fonte (tabella a destra)
const CONTEXTUAL_TOKENS = [
  "--demo-color-border-card",
  "--demo-color-border-card-hover",
  "--demo-color-border-card-read",
  "--demo-color-icon-card",
  "--demo-color-bkg-pill",
  "--demo-color-ring-card-active",
] as const;

/** Colore calcolato dal browser ("rgb(...)" o "color(srgb ...)") -> esadecimale maiuscolo */
function toHex(css: string): string {
  const rgb = css.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
  const srgb = css.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  let parts: number[] | null = null;
  if (rgb) parts = rgb.slice(1, 4).map(Number);
  else if (srgb) parts = srgb.slice(1, 4).map((v) => Number(v) * 255);
  if (!parts) return css;
  return "#" + parts.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
}

const FACES = [Laugh, Smile, Meh, Frown];

export default function TokenDemoCard() {
  const [sourceId, setSourceId] = React.useState<string>(demo.sources[0].id);
  const source = demo.sources.find((s) => s.id === sourceId) ?? demo.sources[0];
  // Una fonte puo' usare lo scope di un'altra (PDF usa i colori di Article): colori e tabella seguono lo scope
  const scopeId = "scope" in source && source.scope ? source.scope : source.id;
  const scopeSource = demo.sources.find((s) => s.id === scopeId) ?? source;

  // Valori risolti dal vivo: ogni token e' applicato a una sonda nascosta (senza transizione)
  // e il colore calcolato viene letto con getComputedStyle.
  const probes = React.useRef<Array<HTMLSpanElement | null>>([]);
  const [resolved, setResolved] = React.useState<string[]>([]);
  React.useLayoutEffect(() => {
    setResolved(
      probes.current.map((el) => (el ? toHex(getComputedStyle(el).backgroundColor) : ""))
    );
  }, [sourceId]);

  return (
    <div className={styles.root} data-source={scopeId}>
      {/* Chip delle fonti */}
      <div role="group" aria-label={demo.chipsLabel} className="flex flex-wrap gap-2 mb-6">
        {demo.sources.map((s) => {
          const active = s.id === sourceId;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSourceId(s.id)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-interactive)] focus-visible:ring-offset-2 ${
                active
                  ? "bg-ink-900 text-white border-ink-900"
                  : "bg-white text-gray-300 border-ink-900/15 hover:border-ink-900/40"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] gap-8 items-start">
        {/* Card dimostrativa, statica */}
        <div className={`${styles.card} mx-1`}>
          <div className={styles.header}>
            <div className={styles.title}>{demo.card.title}</div>
            <div className={styles.icon} aria-hidden="true">{source.glyph}</div>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.mono}>
              {source.label} · {demo.card.author} · {demo.card.saved}
            </span>
            <Link2 size={18} className={styles.action} aria-hidden="true" />
          </div>
          <div className={styles.tabRow}>
            <div className={styles.tabs}>
              {demo.card.tabs.map((t, i) => (
                <span key={t} className={`${styles.tab} ${i === 0 ? styles.tabActive : ""}`}>
                  {t}
                </span>
              ))}
            </div>
            <Copy size={18} className={styles.action} aria-hidden="true" />
          </div>
          <p className={styles.body}>{demo.card.body}</p>
          <div className={styles.chips}>
            {demo.card.chips.map((c) => (
              <span key={c} className={styles.chip}>{c}</span>
            ))}
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.faces} aria-hidden="true">
              {FACES.map((Face, i) => (
                <span key={i} className={`${styles.face} ${i === 0 ? styles.faceSelected : ""}`}>
                  <Face size={20} />
                </span>
              ))}
            </div>
            <Trash2 size={18} className={styles.action} aria-hidden="true" />
          </div>
          <div className={styles.captions}>
            <span className={styles.mono}>{demo.card.rated}</span>
            <span className={`${styles.mono} ${styles.focusLabel}`}>{demo.card.focus}</span>
          </div>
        </div>

        {/* Tabella dei token di livello 3 con il valore risolto */}
        <div>
          {/* Su mobile la tabella diventa un elenco: nome del token sopra, valore sotto */}
          <p className="sm:hidden text-sm font-semibold text-ink-900 pb-2 border-b border-ink-900/10">
            {demo.table.valueHeader(scopeSource.label)}
          </p>
          <table className="block sm:table w-full text-left text-sm">
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-ink-900/10">
                <th scope="col" className="pb-3 pr-4 font-semibold text-ink-900">{demo.table.tokenHeader}</th>
                <th scope="col" className="pb-3 font-semibold text-ink-900">{demo.table.valueHeader(scopeSource.label)}</th>
              </tr>
            </thead>
            <tbody className="block sm:table-row-group" aria-live="polite">
              {CONTEXTUAL_TOKENS.map((token, i) => (
                <tr key={token} className="flex flex-col gap-1.5 py-3 sm:table-row sm:py-0 border-b border-ink-900/5 last:border-0">
                  <td className="block sm:table-cell sm:py-3 sm:pr-4 font-mono text-xs text-gray-300 break-all sm:break-normal sm:whitespace-nowrap">{token}</td>
                  <td className="block sm:table-cell sm:py-3">
                    <span className="flex items-center gap-3">
                      <span
                        className="w-7 h-7 rounded-md border border-ink-900/10 flex-shrink-0 transition-colors duration-150"
                        style={{ background: `var(${token})` }}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-xs text-gray-300">{resolved[i]}</span>
                    </span>
                    <span
                      ref={(el) => { probes.current[i] = el; }}
                      className="hidden"
                      style={{ backgroundColor: `var(${token})` }}
                      aria-hidden="true"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
