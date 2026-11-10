import React from "react";
import Image from "next/image";
import GlassCard from "../portfolio/GlassCard";
import { shell } from "@/content/shell";
import { getImageSize } from "@/utils/image";

/**
 * Box dei case study con testo da una parte e immagine dall'altra. Una sola regola per tutti:
 *
 * Da 1024px (lg)
 *  - due colonne di uguale larghezza, testo e immagine; il lato dell'immagine lo dice imagePosition
 *  - la colonna immagine va da bordo a bordo del box: niente fondo, bordo o padding;
 *    gli angoli seguono quelli del box
 *  - l'immagine riempie la colonna (object-fit: cover), punto di fuoco = image.position (predefinito "top")
 *  - l'altezza del box la decide il testo, minimo 360px
 *  - piu' immagini: la prima riempie la colonna, le altre sono miniature in fila in basso, tutte visibili
 * Sotto i 1024px
 *  - immagine sopra, riquadro 16:9 a tutta larghezza del box, stesse regole; testo sotto
 * Sempre
 *  - clic (o Invio/Spazio) su un'immagine: apre l'originale intero nella galleria della pagina
 *  - width/height reali su ogni <img>; niente animazioni con prefers-reduced-motion
 */

export type CaseStudyImage = {
  src: string;
  alt: string;
  /** punto di fuoco dell'immagine (valore CSS object-position), predefinito "top" */
  position?: string;
};

type BaseProps = {
  images: CaseStudyImage[];
  imagePosition?: "left" | "right";
  onOpenGallery: (images: CaseStudyImage[], startIndex: number) => void;
  /** etichetta accessibile del pulsante di ogni immagine */
  enlargeLabel?: (alt: string) => string;
  /** testo mostrato al passaggio del mouse sull'immagine principale */
  enlargeText?: string;
  hover?: boolean;
};

// Testo standard (titolo, paragrafi, elenco) oppure un testo proprio della pagina (children)
type ImageTextCardProps = BaseProps &
  (
    | {
        title: string;
        description: string;
        bulletPoints: { label: string; text: string }[];
        additionalText?: string;
        children?: never;
      }
    | {
        children: React.ReactNode;
        title?: never;
        description?: never;
        bulletPoints?: never;
        additionalText?: never;
      }
  );

export default function ImageTextCard(props: ImageTextCardProps) {
  const {
    images,
    imagePosition = "left",
    onOpenGallery,
    enlargeLabel = shell.ui.enlargeImageLabel,
    enlargeText = shell.ui.clickToEnlarge,
    hover = true,
  } = props;
  const left = imagePosition === "left";
  const [main, ...thumbs] = images;

  const media = (image: CaseStudyImage, index: number, isMain: boolean) => {
    const { width, height } = getImageSize(image.src);
    return (
      <button
        type="button"
        key={index}
        className={`relative block overflow-hidden cursor-pointer group focus-visible:outline-offset-[-3px] ${
          isMain ? "flex-1 min-h-0 w-full" : "flex-1 min-w-0 h-full"
        }`}
        onClick={() => onOpenGallery(images, index)}
        aria-label={enlargeLabel(image.alt)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={width}
          height={height}
          sizes={isMain ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 12vw, 25vw"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: image.position ?? "top" }}
        />
        <span
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity motion-reduce:transition-none flex items-center justify-center"
          aria-hidden="true"
        >
          {isMain && <span className="text-white text-sm font-medium">{enlargeText}</span>}
        </span>
      </button>
    );
  };

  // angoli: 11px = raggio del box (rounded-xl, 12px) meno il bordo di 1px della .glass
  const mediaColumn = (
    <div
      data-media-col
      className={`relative aspect-video lg:aspect-auto ${left ? "lg:order-1" : "lg:order-2"}`}
    >
      <div
        className={`absolute inset-0 flex flex-col gap-0.5 overflow-hidden rounded-t-[11px] ${
          left ? "lg:rounded-tr-none lg:rounded-bl-[11px]" : "lg:rounded-tl-none lg:rounded-br-[11px]"
        }`}
      >
        {media(main, 0, true)}
        {thumbs.length > 0 && (
          <div className="flex gap-0.5 h-14 lg:h-20 flex-shrink-0">
            {thumbs.map((image, i) => media(image, i + 1, false))}
          </div>
        )}
      </div>
    </div>
  );

  const textColumn = (
    // stesso spazio di prima intorno al testo (p-8 della GlassCard + p-6 interno)
    <div className={`p-14 min-w-0 ${left ? "lg:order-2" : "lg:order-1"}`}>
      {"children" in props && props.children !== undefined ? (
        props.children
      ) : (
        <>
          <h3 className="type-work text-xl text-[var(--card-text-heading)] mb-4">{props.title}</h3>
          <div className="text-[var(--card-text-body)] leading-relaxed mb-4 space-y-3">
            {props.description!.split(/\n+/).filter(p => p.trim()).map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
          <ul className="space-y-2 text-[var(--card-text-meta)]">
            {props.bulletPoints!.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[var(--color-list-bullet)] mt-1" aria-hidden="true">•</span>
                <span>
                  <strong>{point.label}:</strong> {point.text}
                </span>
              </li>
            ))}
          </ul>
          {props.additionalText && (
            <p className="text-[var(--card-text-body)] leading-relaxed mt-4">{props.additionalText}</p>
          )}
        </>
      )}
    </div>
  );

  return (
    <GlassCard hover={hover} className="!p-0">
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:min-h-[360px]">
        {main && mediaColumn}
        {textColumn}
      </div>
    </GlassCard>
  );
}
