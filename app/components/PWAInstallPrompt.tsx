'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);

      // Check if user has dismissed the prompt before
      const dismissed = localStorage.getItem('pwa-prompt-dismissed');
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000); // Show after 3 seconds
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-prompt-dismissed', 'true');
    setShowPrompt(false);
  };

  if (!mounted || !showPrompt || !deferredPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
      >
        <div
          className="rounded-xl bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl border border-white/20 p-4"
          style={{ boxShadow: "0 8px 32px 0 rgba(26, 122, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 glass rounded-lg flex items-center justify-center flex-shrink-0">
              <Download size={20} className="text-[var(--color-text-brand)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[var(--color-text-inverse)] mb-1">
                Install Portfolio
              </h3>
              <p className="text-xs text-[var(--color-text-primary)] mb-3">
                Add to your home screen for quick access
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDismiss}
                  className="flex-1 px-3 py-1.5 text-xs font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-inverse)] bg-[var(--color-text-inverse)]/5 hover:bg-[var(--color-text-inverse)]/10 rounded-lg transition-all border border-[var(--color-text-inverse)]/10"
                >
                  Not now
                </button>
                <button
                  onClick={handleInstall}
                  className="flex-1 px-3 py-1.5 text-xs font-medium text-[var(--button-primary-text)] bg-[var(--button-primary-background-default)] hover:bg-[var(--button-primary-background-hover)] rounded-lg transition-all"
                  style={{ boxShadow: "0 0 20px var(--color-surface-glow)" }}
                >
                  Install
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-inverse)] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
