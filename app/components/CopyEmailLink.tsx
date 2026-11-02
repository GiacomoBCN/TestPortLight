"use client";
import React, { useEffect, useRef, useState } from "react";

export const CONTACT_EMAIL = "consulting@giacomobianchi.tech";

/**
 * Link mailto che al clic copia anche l'indirizzo negli appunti e per 2 secondi
 * mostra "Email copied". Il clic non viene bloccato: chi ha un programma di posta
 * lo vede aprirsi, chi non ce l'ha si ritrova comunque l'indirizzo negli appunti.
 */
export default function CopyEmailLink({
  children,
  copiedLabel = "Email copied",
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  copiedLabel?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = () => {
    const fallback = () => {
      const t = document.createElement("textarea");
      t.value = CONTACT_EMAIL;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand("copy");
      } catch {}
      t.remove();
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(CONTACT_EMAIL).catch(fallback);
    } else {
      fallback();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className={className}
      aria-label={ariaLabel}
      onClick={copy}
    >
      {copied ? copiedLabel : children}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </a>
  );
}
