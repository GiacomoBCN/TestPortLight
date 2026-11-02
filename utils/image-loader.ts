// Loader di next/image per l'export statico (niente ottimizzazione lato server).
// Per ogni larghezza del srcset restituisce la versione ridotta generata da
// scripts/build-image-sizes.mjs (public/images/_w/<w>/...), la piu' piccola che sia
// almeno larga quanto richiesto. Se l'originale e' piu' stretto, o l'immagine non e'
// in utils/image-widths.json (es. aggiunta senza rilanciare lo script), usa l'originale.
// Margine 1,5x quando possibile: il file scelto e' piu' largo di quanto richiesto, cosi' il
// ridimensionamento del browser resta nitido come con l'originale (testi piccoli negli
// screenshot); se nessuna misura ha il margine, la prima che basta.
import widths from "./image-widths.json";

const SIZES = [128, 256, 384, 640, 1080, 1920];
const ORIGINAL_WIDTHS = widths as Record<string, number>;

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const match = src.match(/^(.*?\/images\/)(?!_w\/)(.+\.webp)$/i);
  if (!match) return src;
  const [, prefix, rel] = match;
  const original = ORIGINAL_WIDTHS[rel];
  if (!original) return src;
  const size = SIZES.find((s) => s >= width * 1.5) ?? SIZES.find((s) => s >= width);
  if (!size || size >= original) return src;
  return `${prefix}_w/${size}/${rel}`;
}
