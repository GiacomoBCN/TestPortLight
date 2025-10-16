import React from "react";
import GlassCard from "../portfolio/GlassCard";

interface ImageTextCardProps {
  title: string;
  description: string;
  bulletPoints: {
    label: string;
    text: string;
  }[];
  images: {
    src: string;
    alt: string;
  }[];
  imagePosition?: "left" | "right";
  onOpenGallery: (
    images: { src: string; alt: string }[],
    startIndex: number
  ) => void;
  additionalText?: string;
}

export default function ImageTextCard({
  title,
  description,
  bulletPoints,
  images,
  imagePosition = "left",
  onOpenGallery,
  additionalText,
}: ImageTextCardProps) {
  // Images already have getImagePath() applied in parent component
  const imagesWithPath = images;

  const imageSection = (
    <div className="md:w-1/3 flex-shrink-0 flex flex-col">
      <div className="rounded-lg overflow-hidden flex flex-col justify-evenly gap-4 flex-1">
        {imagesWithPath.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => onOpenGallery(imagesWithPath, index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                Click to enlarge
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const textSection = (
    <div className="md:w-2/3">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="text-gray-300 leading-relaxed mb-4 space-y-3">
        {description.split(/\n+/).filter(p => p.trim()).map((paragraph, index) => (
          <p key={index}>{paragraph.trim()}</p>
        ))}
      </div>
      <ul className="space-y-2 text-gray-400">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>{point.label}:</strong> {point.text}
            </span>
          </li>
        ))}
      </ul>
      {additionalText && (
        <p className="text-gray-300 leading-relaxed mt-4">{additionalText}</p>
      )}
    </div>
  );

  return (
    <GlassCard>
      <div className="p-6">
        {/* Mobile: Always text first, then images */}
        <div className="flex flex-col md:hidden gap-6">
          {textSection}
          {imageSection}
        </div>

        {/* Desktop: Respect imagePosition prop */}
        <div className="hidden md:flex md:flex-row gap-6">
          {imagePosition === "left" ? (
            <>
              {imageSection}
              {textSection}
            </>
          ) : (
            <>
              {textSection}
              {imageSection}
            </>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
