"use client";
import React from "react";
import { Pause, Play } from "lucide-react";
import SketchFrame from "../SketchFrame";
import { getImagePath } from "@/utils/image";

/** Quali file del video esistono in public/ (controllato a build time nella route della pagina) */
export type HeroMediaFiles = { mp4: boolean; webm: boolean; poster: boolean };

export type HeroMediaContent = {
  video: string;
  webm: string;
  poster: string;
  alt: string;
  pauseLabel: string;
  playLabel: string;
};

/** Segnaposto statico: etichette in fila con una nota piccola sotto, nient'altro */
export function HeroPlaceholder({ steps }: { steps: ReadonlyArray<{ label: string; note: string }> }) {
  const cols: Record<number, string> = { 3: "sm:grid-cols-3", 5: "sm:grid-cols-5" };
  return (
    <ol className={`h-full grid grid-cols-1 ${cols[steps.length] ?? "sm:grid-cols-4"} gap-6 sm:gap-4 items-center p-6 sm:p-8`}>
      {steps.map((step) => (
        <li key={step.label} className="text-center">
          <div className="text-sm md:text-base font-semibold tracking-[0.2em] text-ink-900">{step.label}</div>
          <div className="mt-2 text-xs text-gray-400 leading-snug">{step.note}</div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Blocco 16:9 sotto l'hero (usato da /ai-product e /design-system) e dentro una card di /dowjones.
 * Con i file video presenti: <video> muto in loop che parte da solo,
 * con sotto un bottone tondo pausa / play (come nella home del prodotto).
 * Se il browser blocca l'autoplay il bottone mostra play.
 * Con prefers-reduced-motion il video non parte: resta il poster, e chi vuole lo avvia dal bottone.
 * Per questo la riproduzione parte da JavaScript e non dall'attributo autoplay.
 * L'mp4 (H.264) va prima: lo decodifica qualsiasi browser e scheda video; il webm e' la riserva.
 * (Con il webm per primo, su alcune macchine il video restava fermo e il bottone play non lo avviava.)
 * width / height: misure del file, dichiarate perche' il browser riservi lo spazio.
 * Senza file video: il segnaposto.
 */
export default function HeroVideo({
  files,
  media,
  placeholder,
  width = 1600,
  height = 900,
}: {
  files: HeroMediaFiles;
  media: HeroMediaContent;
  placeholder: ReadonlyArray<{ label: string; note: string }>;
  width?: number;
  height?: number;
}) {
  const { video, webm, poster, alt, pauseLabel, playLabel } = media;
  const hasVideo = files.mp4 || files.webm;
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    setPlaying(!el.paused);
    // Riduci movimento: niente avvio automatico, resta il poster
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(!el.paused));
    }
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  const frame = "glass sketch rounded-xl overflow-hidden";

  if (!hasVideo) {
    return (
      <div className={`${frame} sm:aspect-video`}>
        <SketchFrame />
        <HeroPlaceholder steps={placeholder} />
      </div>
    );
  }

  return (
    <div>
      <div className={`${frame} relative aspect-video`}>
        <SketchFrame />
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          width={width}
          height={height}
          muted
          loop
          playsInline
          preload="metadata"
          poster={files.poster ? getImagePath(poster) : undefined}
          aria-label={alt || undefined}
        >
          {files.mp4 && <source src={getImagePath(video)} type="video/mp4" />}
          {files.webm && <source src={getImagePath(webm)} type="video/webm" />}
        </video>
      </div>
      <div className="flex justify-end mt-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? pauseLabel : playLabel}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink-900 hover:border-blue transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-interactive)]"
        >
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
