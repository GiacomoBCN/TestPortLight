import type { MetadataRoute } from "next";

// Export statico: generato alla build (out/robots.txt).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://giacomobianchi.tech/sitemap.xml",
  };
}
