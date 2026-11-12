import type { MetadataRoute } from "next";

// Export statico: il file viene generato una volta sola, alla build (out/sitemap.xml).
export const dynamic = "force-static";

const SITE = "https://giacomobianchi.tech";

// Pagine pubbliche, con la barra finale (trailingSlash: true).
// /ecommerce-management/ resta fuori: e' nascosta dal menu (vedi app/utils.ts).
// Quando aggiungi una pagina in app/(links), aggiungila anche qui.
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/product-work/", priority: 0.9 },
  { path: "/teaching/", priority: 0.8 },
  { path: "/design-system/", priority: 0.8 },
  { path: "/ai-product/", priority: 0.8 },
  { path: "/dowjones/", priority: 0.7 },
  { path: "/falak/", priority: 0.7 },
  { path: "/vodplatform/", priority: 0.7 },
  { path: "/sgpvevolution/", priority: 0.7 },
  { path: "/xpuntocero/", priority: 0.7 },
  { path: "/back-office/", priority: 0.7 },
  { path: "/tu-plan-redondo/", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
