"use client";
import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 pointer-events-none" style={{ left: "var(--band)", right: "var(--band)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-end">
          <button
            onClick={scrollToTop}
            className={`w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-[var(--color-surface-interactive-default)] glow-blue transition-all duration-300 pointer-events-auto ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
            aria-label="Scroll to top"
            title="Scroll to top"
            type="button"
            tabIndex={isVisible ? 0 : -1}
            aria-hidden={isVisible ? undefined : true}
          >
            <ChevronUp size={24} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
