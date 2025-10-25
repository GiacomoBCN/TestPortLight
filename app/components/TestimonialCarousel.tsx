"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import GlassCard from "./portfolio/GlassCard";
import TestimonialModal from "./TestimonialModal";
import { getImagePath } from "@/utils/image";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image: string;
  alt: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  // Determine items per view based on screen (1 for mobile, 3 for desktop)
  const [itemsPerView, setItemsPerView] = useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 768 ? 3 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(testimonials.length / itemsPerView) - 1);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return maxIndex;
      if (nextIndex > maxIndex) return 0;
      return nextIndex;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const openModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Get current visible testimonials
  const startIdx = currentIndex * itemsPerView;
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + itemsPerView);

  // Truncate text function
  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return { text, isTruncated: false };
    return { text: text.slice(0, maxLength) + "...", isTruncated: true };
  };

  return (
    <>
      <div className="relative">
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {visibleTestimonials.map((testimonial, idx) => {
                const { text, isTruncated } = truncateText(testimonial.quote);

                return (
                  <GlassCard key={startIdx + idx} hover={false}>
                    <div className="flex flex-col h-full">
                      {/* Quote */}
                      <p className="text-base md:text-lg text-[var(--color-text-inverse)] font-light leading-relaxed mb-4 flex-grow text-left">
                        "{text}"
                      </p>

                      {/* Read More Button */}
                      {isTruncated && (
                        <button
                          onClick={() => openModal(testimonial)}
                          className="mb-4 text-sm text-[var(--color-text-brand)] hover:text-[var(--color-text-link-hover)] transition-colors duration-200 font-medium underline underline-offset-2 text-left"
                        >
                          Read more
                        </button>
                      )}

                      {/* Author Info and Image - Centered */}
                      <div className="flex flex-col items-center text-center">
                        {/* Author Info */}
                        <div className="mb-4">
                          <p className="font-semibold text-[var(--color-text-inverse)]">{testimonial.name}</p>
                          <p className="text-sm text-[var(--color-text-tertiary)]">{testimonial.title}</p>
                        </div>

                        {/* Image */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-text-brand)] to-[var(--color-text-teaching)] flex-shrink-0">
                          <Image
                            src={getImagePath(testimonial.image)}
                            alt={testimonial.alt}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation - only show if there are multiple pages */}
        {maxIndex > 0 && (
          <>
            {/* Navigation Arrows */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => paginate(-1)}
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-[var(--color-text-inverse)] hover:bg-[var(--color-surface-interactive-default)] transition-all duration-200 glow-blue hover:scale-110"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? "w-8 h-3 bg-[var(--color-surface-interactive-default)] glow-blue"
                        : "w-3 h-3 bg-[#94a3b8] hover:bg-[#cbd5e1]"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-[var(--color-text-inverse)] hover:bg-[var(--color-surface-interactive-default)] transition-all duration-200 glow-blue hover:scale-110"
                aria-label="Next testimonials"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Counter */}
            <div className="text-center mt-4">
              <p className="text-sm text-[var(--color-text-tertiary)]">
                {currentIndex + 1} / {maxIndex + 1}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedTestimonial && (
        <TestimonialModal
          isOpen={modalOpen}
          onClose={closeModal}
          quote={selectedTestimonial.quote}
          name={selectedTestimonial.name}
          title={selectedTestimonial.title}
          image={selectedTestimonial.image}
          alt={selectedTestimonial.alt}
        />
      )}
    </>
  );
}
