import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import AiProduct from "@/app/pages/AiProduct";
import { aiProduct } from "@/content/ai-product";
import { shell } from "@/content/shell";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: aiProduct.metadata.title,
  description: aiProduct.metadata.description,
  alternates: { canonical: "/ai-product/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://giacomobianchi.tech/ai-product/",
    siteName: shell.metadata.siteName,
    title: aiProduct.metadata.title,
    description: aiProduct.metadata.description,
    images: [
      {
        url: `${basePath}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: shell.metadata.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: aiProduct.metadata.title,
    description: aiProduct.metadata.description,
    images: [`${basePath}/android-chrome-512x512.png`],
  },
};

// Controllo a build time: quali file del video ci sono davvero in public/
const inPublic = (file: string) => fs.existsSync(path.join(process.cwd(), "public", file));

export default function Page() {
  const { video, webm, poster } = aiProduct.heroMedia;
  return (
    <AiProduct
      media={{
        mp4: inPublic(video),
        webm: inPublic(webm),
        poster: inPublic(poster),
      }}
    />
  );
}
