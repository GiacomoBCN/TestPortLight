"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div
            className="rounded-xl bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl border border-white/20 p-4"
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(0, 102, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex flex-col gap-3">
              <p className="text-sm text-[#cbd5e1] leading-relaxed">
                We use cookies to analyze site traffic and improve your
                experience.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDecline}
                  className="flex-1 px-4 py-2 text-xs font-medium text-[#94a3b8] hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 px-4 py-2 text-xs font-medium text-white bg-[#0066ff] hover:bg-[#0052cc] rounded-lg transition-all"
                  style={{ boxShadow: "0 0 20px rgba(0, 102, 255, 0.3)" }}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
