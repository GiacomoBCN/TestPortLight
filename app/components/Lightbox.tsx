"use client";
import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Lightbox unica per tutte le gallerie (ProjectGallery e case study).
 * Aspetto identico alle copie che sostituisce; in piu':
 * - role="dialog" + aria-modal + nome accessibile
 * - focus spostato sul bottone chiudi all'apertura, Tab intrappolato dentro,
 *   focus restituito all'elemento che l'ha aperta alla chiusura
 * - scroll della pagina bloccato mentre e' aperta
 * - Esc chiude, frecce sinistra/destra cambiano immagine, swipe su touch
 * - alt reale dell'immagine (non "Enlarged view"), contatore annunciato
 */

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const MIN_SWIPE = 50;

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const touchStart = React.useRef<number | null>(null);
  const touchEnd = React.useRef<number | null>(null);

  // Callback sempre aggiornate senza ri-registrare i listener
  const handlers = React.useRef({ onClose, onPrev, onNext });
  handlers.current = { onClose, onPrev, onNext };

  // Focus dentro all'apertura, restituito alla chiusura; scroll della pagina bloccato
  React.useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, []);

  // Tastiera: Esc, frecce, Tab intrappolato
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handlers.current.onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlers.current.onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handlers.current.onNext();
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])"),
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
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

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > MIN_SWIPE) onNext();
    else if (distance < -MIN_SWIPE) onPrev();
  };

  const image = images[index];
  if (!image) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${image.alt}`}
      className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4 overscroll-contain"
      data-track-area="lightbox"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-sand-200 transition-colors z-10"
        aria-label="Close image"
      >
        <X size={32} aria-hidden="true" />
      </button>

      {images.length > 1 && (
        <>
          {/* Frecce: anche su mobile (alternativa allo swipe), piu' vicine ai bordi */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="flex absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-sand-200 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="flex absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-sand-200 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
            aria-label="Next image"
          >
            <ChevronRight size={32} aria-hidden="true" />
          </button>

          <div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full"
            aria-live="polite"
            aria-atomic="true"
          >
            {index + 1} / {images.length}
          </div>
        </>
      )}

      <figure className="flex flex-col items-center max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} className="max-w-full max-h-[85vh] object-contain" />
        {/* La didascalia ripete l'alt: lo screen reader la legge gia' dall'immagine */}
        <figcaption
          className="text-white text-center mt-4 px-8 py-3 bg-black/70 rounded-lg max-w-3xl"
          aria-hidden="true"
        >
          {image.alt}
        </figcaption>
      </figure>
    </div>
  );
}
