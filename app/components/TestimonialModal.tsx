"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { getImagePath } from "@/utils/image";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  name: string;
  title: string;
  image: string;
  alt: string;
}

export default function TestimonialModal({
  isOpen,
  onClose,
  quote,
  name,
  title,
  image,
  alt,
}: TestimonialModalProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  // Esc chiude, Tab resta dentro la modale; focus sul bottone chiudi all'apertura
  // e di nuovo su "Read more" alla chiusura
  React.useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])"),
        );
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

    document.addEventListener("keydown", handleKeyDown);
    // Prevent scroll on body when modal is open
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain glass rounded-2xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-[var(--color-text-inverse)] hover:bg-[var(--color-surface-interactive-default)] transition-all duration-200 glow-blue hover:scale-110"
                aria-label="Close modal"
              >
                <X size={20} aria-hidden="true" />
              </button>

              {/* Content */}
              <div className="flex flex-col">
                {/* Quote - Left aligned */}
                <p className="text-lg md:text-xl text-[var(--color-text-inverse)] font-light leading-relaxed mb-8 whitespace-pre-line text-left">
                  "{quote}"
                </p>

                {/* Author Info and Image - Centered */}
                <div className="flex flex-col items-center text-center">
                  {/* Author Info */}
                  <div className="mb-4">
                    <p id={titleId} className="font-semibold text-[var(--color-text-inverse)] text-lg">
                      {name}
                    </p>
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      {title}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[var(--color-text-brand)] to-[var(--color-text-teaching)] flex-shrink-0">
                    <Image
                      src={getImagePath(image)}
                      alt={alt}
                      width={96}
                      height={96}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
