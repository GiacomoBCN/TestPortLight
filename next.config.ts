import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Export statico: le misure ridotte sono file gia' pronti in public/images/_w
    // (scripts/build-image-sizes.mjs), scelti da utils/image-loader.ts per il srcset.
    loader: "custom",
    loaderFile: "./utils/image-loader.ts",
    imageSizes: [128, 256, 384],
    deviceSizes: [640, 1080, 1920],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;