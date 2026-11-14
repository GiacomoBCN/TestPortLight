"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { shell } from "@/content/shell";

type Chapter = { id: string; number: string; title: string; section: HTMLElement; heading: HTMLElement };

/**
 * Barra del capitolo, solo su telefono (sotto i 768px), nei case study.
 * Sta subito sotto il menu. Compare quando il titolo di un capitolo ("01 Approach") e' uscito
 * dallo schermo e mostra in una riga il numero e il titolo del capitolo che si sta leggendo.
 * Toccandola si apre l'elenco dei capitoli della pagina: un tocco porta a quello scelto.
 * I capitoli sono i titoli accanto a un SectionNumber grande (attributo data-chapter-number).
 * Senza capitoli nella pagina, o fuori da un capitolo, la barra non c'e'.
 * Un solo ascoltatore di scroll, passivo e limitato a un calcolo per fotogramma.
 */
export default function ChapterBar({ hidden = false }: { hidden?: boolean }) {
  const pathname = usePathname();
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const [current, setCurrent] = React.useState<number>(-1);
  const [open, setOpen] = React.useState(false);
  const barRef = React.useRef<HTMLDivElement>(null);

  // Capitoli della pagina: riletti a ogni cambio di pagina
  React.useEffect(() => {
    setOpen(false);
    setCurrent(-1);
    const found: Chapter[] = [];
    document.querySelectorAll<HTMLElement>("main [data-chapter-number]").forEach((num) => {
      const heading = num.parentElement?.querySelector<HTMLElement>("h2");
      const section = num.closest<HTMLElement>("section");
      if (!heading || !section) return;
      const number = num.dataset.chapterNumber || "";
      const id = heading.id || `chapter-${number}`;
      heading.id = id;
      // Arrivando da un link, il titolo si ferma sotto menu e barra invece che dietro
      heading.style.scrollMarginTop = "8.5rem";
      found.push({ id, number, title: heading.textContent?.trim() || "", section, heading });
    });
    setChapters(found);
  }, [pathname]);

  // Capitolo in lettura: l'ultimo il cui titolo e' gia' salito sotto la barra,
  // finche' la sua sezione e' ancora sullo schermo
  React.useEffect(() => {
    if (chapters.length === 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = (barRef.current?.parentElement?.getBoundingClientRect().bottom ?? 76) + 8;
      let idx = -1;
      chapters.forEach((c, i) => {
        if (c.heading.getBoundingClientRect().bottom < line) idx = i;
      });
      if (idx >= 0 && chapters[idx].section.getBoundingClientRect().bottom < line + 60) idx = -1;
      setCurrent(idx);
      if (idx < 0) setOpen(false);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [chapters]);

  // Esc o tocco fuori chiudono l'elenco
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  if (hidden || chapters.length === 0 || current < 0) return null;
  const chapter = chapters[current];

  const go = (c: Chapter) => {
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    c.heading.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div
      ref={barRef}
      className="md:hidden absolute inset-x-0 top-full bg-[#ffffff] border-b border-ink-900/10 shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chapter-list"
        aria-label={shell.ui.chapterBar.toggle(chapter.number, chapter.title)}
        className="w-full min-h-11 px-6 flex items-center gap-3 text-left text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-interactive)]"
      >
        <span className="type-number text-sm tabular-nums border-l-[3px] border-[color:var(--section-number-bar-color)] pl-2" aria-hidden="true">
          {chapter.number}
        </span>
        <span className="flex-1 min-w-0 truncate text-sm font-semibold" aria-hidden="true">
          {chapter.title}
        </span>
        <span className="text-xs text-[var(--color-text-tertiary)] tabular-nums" aria-hidden="true">
          {current + 1}/{chapters.length}
        </span>
        <ChevronDown size={18} aria-hidden="true" className={`shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ol id="chapter-list" aria-label={shell.ui.chapterBar.listLabel} className="border-t border-ink-900/10 max-h-[60vh] overflow-y-auto overscroll-contain">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(c);
                }}
                aria-current={i === current ? "true" : undefined}
                className={`min-h-11 px-6 flex items-center gap-3 text-sm ${i === current ? "font-semibold text-ink-900 bg-ink-900/5" : "text-ink-900"}`}
              >
                <span className="type-number tabular-nums w-6" aria-hidden="true">{c.number}</span>
                <span className="flex-1 min-w-0">{c.title}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
