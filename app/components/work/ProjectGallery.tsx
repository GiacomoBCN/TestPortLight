"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "../Lightbox";
import { shell } from "@/content/shell";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
  title?: string;
  /** Forma delle miniature: "wide" (5:3, default) per screenshot orizzontali, "square" per immagini
   *  quadrate, che in un riquadro largo resterebbero piccole con due strisce bianche ai lati. */
  thumb?: "wide" | "square";
}

export default function ProjectGallery({
  images,
  title = shell.ui.projectGallery.defaultTitle,
  thumb = "wide",
}: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const nextImage = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const scrollByPx = (left: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollContainerRef.current?.scrollBy({ left, behavior: reduce ? "auto" : "smooth" });
  };
  // Un passo = circa una miniatura (l'80% della larghezza visibile)
  const step = () => (scrollContainerRef.current?.clientWidth ?? 400) * 0.8;
  const scrollLeft = () => scrollByPx(-step());
  const scrollRight = () => scrollByPx(step());

  return (
    <>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="type-section-title text-ink-900 mb-8 text-center">
            {title}
          </h2>
          <div className="relative group sm:px-12">
            {/* Left Arrow - Only show if more than 2 images (da sm in su: su touch si scorre col dito) */}
            {images.length > 2 && (
              <button
                type="button"
                onClick={scrollLeft}
                className="hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                aria-label={shell.ui.projectGallery.scrollLeft}
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
            )}

            {/* Gallery Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto pb-4 w-fit max-w-full mx-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {images.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  className={`block flex-shrink-0 ${thumb === "square" ? "w-[80vw] sm:w-[20rem] lg:w-[21rem] aspect-square" : "w-[80vw] sm:w-[28rem] lg:w-[30rem] aspect-[5/3]"} bg-white backdrop-blur-xl border border-ink-900/10 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform relative group`}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={shell.ui.enlargeImageLabel(image.alt)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={thumb === "square" ? "(max-width: 640px) 80vw, 336px" : "(max-width: 640px) 80vw, (max-width: 1024px) 448px, 480px"}
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex items-center justify-center" aria-hidden="true">
                    <span className="text-white text-sm font-medium">Click to enlarge</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Arrow - Only show if more than 2 images */}
            {images.length > 2 && (
              <button
                type="button"
                onClick={scrollRight}
                className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                aria-label={shell.ui.projectGallery.scrollRight}
              >
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedIndex !== null && (
        <Lightbox
          images={images}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}