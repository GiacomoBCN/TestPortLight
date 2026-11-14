"use client";
import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { shell } from "@/content/shell";

/**
 * Video ingrandito a tutto schermo, con lo stesso aspetto e le stesse regole della Lightbox
 * delle foto: fondo nero, X in alto a destra, role="dialog", focus sul bottone chiudi e
 * restituito a chi l'ha aperta, Tab intrappolato, Esc o tocco sul fondo per chiudere,
 * scroll della pagina bloccato.
 * Il video riparte dal punto in cui era quello nella pagina (startAt) e ha i comandi nativi,
 * cosi' su telefono si puo' anche passare allo schermo intero e ruotare.
 * E' montato in fondo al <body> (portal): dentro una card con backdrop-filter un elemento fixed
 * resterebbe chiuso nella card e sotto il menu.
 */
export default function VideoLightbox({
  mp4,
  webm,
  poster,
  alt,
  startAt = 0,
  onClose,
}: {
  mp4?: string;
  webm?: string;
  poster?: string;
  alt: string;
  startAt?: number;
  onClose: (currentTime: number) => void;
}) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const handler = React.useRef(onClose);
  handler.current = onClose;
  const close = () => handler.current(videoRef.current?.currentTime ?? 0);

  React.useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const el = videoRef.current;
    if (el) {
      const start = () => {
        if (startAt > 0) el.currentTime = startAt;
        el.play().catch(() => {});
      };
      if (el.readyState >= 1) start();
      else el.addEventListener("loadedmetadata", start, { once: true });
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handler.current(videoRef.current?.currentTime ?? 0);
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button, video[controls]"),
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={shell.ui.videoLightbox.dialogLabel(alt)}
      className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4 overscroll-contain"
      data-track-area="lightbox"
      onClick={close}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={close}
        className="absolute top-4 right-4 text-white hover:text-sand-200 transition-colors z-10"
        aria-label={shell.ui.videoLightbox.close}
      >
        <X size={32} aria-hidden="true" />
      </button>
      <video
        ref={videoRef}
        className="max-w-full max-h-[85vh] aspect-video w-full bg-white rounded-lg"
        muted
        loop
        playsInline
        controls
        poster={poster}
        aria-label={alt || undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {mp4 && <source src={mp4} type="video/mp4" />}
        {webm && <source src={webm} type="video/webm" />}
      </video>
    </div>,
    document.body,
  );
}
