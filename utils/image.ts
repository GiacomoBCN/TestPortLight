import dimensions from "./image-dimensions.json";

// Helper to get the correct image path for static exports
export function getImagePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.__NEXT_ROUTER_BASEPATH || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // For static exports, we need to handle basePath differently
  if (process.env.NODE_ENV === 'production' && basePath) {
    // In production with basePath, images should be served from the basePath
    return `${basePath}${cleanPath}`;
  }

  // In development or without basePath, use clean paths
  return cleanPath;
}

// Larghezza e altezza dell'originale (utils/image-dimensions.json, da scripts/build-image-sizes.mjs).
// Accetta il percorso con o senza basePath; se l'immagine non e' nel file, una misura 16:9.
const DIMENSIONS = dimensions as unknown as Record<string, [number, number]>;

export function getImageSize(src: string): { width: number; height: number } {
  const rel = src.match(/\/?images\/(?!_w\/)(.+)$/)?.[1];
  const d = rel ? DIMENSIONS[rel] : undefined;
  return d ? { width: d[0], height: d[1] } : { width: 1600, height: 900 };
}
