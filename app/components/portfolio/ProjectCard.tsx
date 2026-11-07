import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { getImagePath } from "@/utils/image";
import SketchFrame from "../SketchFrame";

export default function ProjectCard({
  role,
  title,
  company,
  timeframe,
  description,
  metrics = [],
  tags = [],
  link,
  image,
  imageFit = "cover",
  imageBg,
  compact = false,
  delay = 0,
  video,
  videoLabels,
}: {
  role: string;
  title: string;
  company: string;
  timeframe: string;
  description: string;
  metrics?: { value: string; label: string }[];
  tags?: string[];
  link?: string;
  image?: string;
  /** cover (default) ritaglia; contain mostra tutta la schermata */
  imageFit?: "cover" | "contain";
  /** sfondo dietro l'immagine, utile con contain */
  imageBg?: string;
  /** versione bassa per la home: immagine piu' stretta, testi a 2 righe, meno aria */
  compact?: boolean;
  delay?: number;
  /** video muto in loop al posto dell'immagine (percorsi sotto public/); bg = fondo del video */
  video?: { mp4: string; webm: string; poster: string; bg: string };
  /** etichette del bottone pausa / play (obbligatorie con video) */
  videoLabels?: { pause: string; play: string };
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Video: parte quando la scheda entra nello schermo, si ferma quando esce.
  // Se l'utente lo mette in pausa resta fermo finche' non preme play.
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const userPaused = React.useRef(false);
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused.current) el.play().catch(() => {});
      else if (!entry.isIntersecting) el.pause();
    }, { threshold: 0.25 });
    io.observe(el);
    return () => {
      io.disconnect();
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);
  const toggleVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  // Bottone pausa / play: fuori dal link (un bottone dentro un link non e' valido),
  // posato sopra l'angolo in basso a destra dell'area video.
  const videoButton = video && videoLabels && (
    <div className={`absolute inset-x-0 top-0 ${compact ? "aspect-[2.4/1]" : "aspect-video"} pointer-events-none z-10`}>
      <button
        type="button"
        onClick={toggleVideo}
        aria-label={playing ? videoLabels.pause : videoLabels.play}
        className="pointer-events-auto absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 border border-ink-900/15 shadow-sm flex items-center justify-center text-ink-900 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-interactive)]"
      >
        {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
      </button>
    </div>
  );

  const cardContent = (
    <article className="flex flex-col h-full">
      {/* Project Image - Fixed height */}
      {image && (
        <div className={`${compact ? "mb-4 -mx-6 -mt-6" : "mb-6 -mx-8 -mt-8"} overflow-hidden rounded-t-xl`}>
          <div className={`relative ${compact ? "aspect-[2.4/1]" : "aspect-video"} overflow-hidden`} style={imageBg ? { background: imageBg } : undefined}>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`${imageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-500 group-hover:scale-105`}
            />
            {imageFit === "cover" && (
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-secondary)] via-transparent to-transparent opacity-60"></div>
            )}
          </div>
        </div>
      )}

      {/* Project Video - stessa area dell'immagine, video intero sul suo colore di fondo */}
      {video && (
        <div className={`${compact ? "mb-4 -mx-6 -mt-6" : "mb-6 -mx-8 -mt-8"} overflow-hidden rounded-t-xl`}>
          <div className={`relative ${compact ? "aspect-[2.4/1]" : "aspect-video"} overflow-hidden`} style={{ background: video.bg }}>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain"
              muted
              loop
              playsInline
              preload="metadata"
              poster={getImagePath(video.poster)}
              aria-hidden="true"
            >
              <source src={getImagePath(video.mp4)} type="video/mp4" />
              <source src={getImagePath(video.webm)} type="video/webm" />
            </video>
          </div>
        </div>
      )}

      {/* Header Section - Fixed height */}
      <div className={compact ? "mb-3" : "mb-6"}>
        <span className="label-tag text-xs">
          {role}
        </span>
        <h3 className={`${compact ? "type-work text-xl mt-1 mb-0.5 line-clamp-1" : "type-work-title mt-2 mb-1 min-h-[64px]"} text-[var(--project-card-title-default)] transition-colors duration-300 group-hover:text-[var(--project-card-title-hover)]`}>
          {title}
        </h3>
        <p className="text-sm text-[var(--project-card-company-text)]">
          {company}
          {timeframe && ` • ${timeframe}`}
        </p>
      </div>

      {/* Description - Fixed height */}
      <p className={`text-[var(--project-card-description-text)] ${compact ? "text-sm mb-3 line-clamp-2" : "mb-6 min-h-[72px]"}`}>{description}</p>

      {/* Spacer to push metrics and tags to bottom */}
      <div className="flex-1"></div>

      {/* Metrics - Fixed height */}
      <div className={compact ? "" : "mb-6 pb-6 border-b border-[var(--color-border-default)] min-h-[88px]"}>
        {metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`${compact ? "text-xl" : "text-2xl md:text-3xl"} font-bold text-[var(--project-card-metric-value)] mb-1`}>
                  {metric.value}
                </div>
                <div className="text-xs text-[var(--project-card-metric-label)] leading-tight">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Tags - Responsive height with better mobile handling */}
      {tags.length > 0 && (
        <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs glass rounded-full border border-[var(--project-card-tag-border)] text-[var(--project-card-tag-text)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );

  // If there's a link, wrap the entire card in a Link component
  if (link) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay }}
        className="h-full relative"
      >
        <Link
          href={link}
          className={`block h-full glass sketch rounded-xl ${compact ? "p-6" : "p-8"} transition-all duration-300 cursor-pointer group
                     hover:scale-[1.02] hover:border-[var(--card-border-hover)] hover:shadow-[0_0_30px_rgba(242,140,40,0.3)]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-interactive)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-secondary)]`}
        >
          <SketchFrame />
          {cardContent}
        </Link>
        {videoButton}
      </motion.div>
    );
  }

  // If no link, return a non-clickable card
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className={`glass sketch rounded-xl ${compact ? "p-6" : "p-8"}`}
    >
      <SketchFrame />
      {cardContent}
    </motion.div>
  );
}
