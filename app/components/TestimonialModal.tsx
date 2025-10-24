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
  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent scroll on body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass rounded-2xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-200 glow-blue hover:scale-110"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="flex flex-col">
                {/* Quote - Left aligned */}
                <p className="text-lg md:text-xl text-white font-light leading-relaxed mb-8 whitespace-pre-line text-left">
                  "{quote}"
                </p>

                {/* Author Info and Image - Centered */}
                <div className="flex flex-col items-center text-center">
                  {/* Author Info */}
                  <div className="mb-4">
                    <p className="font-semibold text-white text-lg">{name}</p>
                    <p className="text-sm text-slate-400">{title}</p>
                  </div>

                  {/* Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue to-[#10b981] flex-shrink-0">
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
