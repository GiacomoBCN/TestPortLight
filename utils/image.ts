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