"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shell } from "@/content/shell";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else if (consent === "accepted") {
      enableAnalytics();
    }
  }, []);

  const enableAnalytics = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    enableAnalytics();
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    //
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('consent', 'update', {
    //     analytics_storage: 'denied'
    //   });
    // }
    setShowBanner(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-auto md:right-[calc(var(--band)+1.5rem)] md:max-w-md z-50"
          data-track-area="cookie"
          role="region"
          aria-label={shell.cookieConsent.ariaLabel}
        >
          <div
            className="bg-[#ffffff]/90 backdrop-blur-xl border-t border-ink-900/20 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:rounded-xl md:bg-[#ffffff]/80 md:shadow-2xl md:border md:p-4"
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(242, 140, 40, 0.15), 0 0 0 1px rgba(7, 9, 11, 0.12)",
            }}
          >
            {/* Telefono: una sola riga in basso (testo a sinistra, pulsanti a destra). Da 768px: la card di prima */}
            <div className="flex items-center gap-3 md:flex-col md:items-stretch">
              <p className="flex-1 min-w-0 text-xs leading-snug md:flex-none md:text-sm md:leading-relaxed text-[var(--color-text-primary)]">
                <span className="md:hidden">{shell.cookieConsent.messageShort}</span>
                <span className="hidden md:inline">{shell.cookieConsent.message}</span>
              </p>
              <div className="flex flex-shrink-0 gap-2">
                <button
                  type="button"
                  onClick={handleDecline}
                  className="md:flex-1 px-3 md:px-4 py-2 min-h-11 md:min-h-0 text-xs font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-inverse)] bg-[var(--color-text-inverse)]/5 hover:bg-[var(--color-text-inverse)]/10 rounded-lg transition-all border border-[var(--color-text-inverse)]/10"
                >
                  {shell.cookieConsent.decline}
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  className="md:flex-1 px-3 md:px-4 py-2 min-h-11 md:min-h-0 text-xs font-medium text-[var(--button-primary-text)] bg-[var(--button-primary-background-default)] hover:bg-[var(--button-primary-background-hover)] rounded-lg transition-all"
                  style={{ boxShadow: "0 0 20px var(--color-surface-glow)" }}
                >
                  {shell.cookieConsent.accept}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
