// Uso: node scripts/build-image-sizes.mjs
// Genera le versioni ridotte delle immagini di public/images in public/images/_w/<larghezza>/...
// (stesso percorso relativo) e utils/image-widths.json con la larghezza originale di ogni file.
// utils/image-loader.ts le usa per il srcset di next/image: il browser scarica la misura
// adatta allo spazio occupato. Gli originali restano invariati (lightbox, link diretti).
// Da rilanciare quando si aggiunge o cambia un'immagine: senza, il loader usa l'originale.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "public", "images");
const OUT = path.join(SRC, "_w");
// Devono coincidere con images.imageSizes + images.deviceSizes in next.config.ts
const WIDTHS = [128, 256, 384, 640, 1080, 1920];
const RASTER = /\.(webp|png|jpe?g)$/i;

const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (p === OUT) continue;
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (RASTER.test(f)) files.push(p);
  }
})(SRC);

const widths = {};
let before = 0, written = 0;
for (const file of files.sort()) {
  const rel = path.relative(SRC, file).split(path.sep).join("/");
  const { width } = await sharp(file).metadata();
  widths[rel] = width;
  for (const w of WIDTHS) {
    if (w >= width) break;
    const dest = path.join(OUT, String(w), rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const buf = await sharp(file).resize({ width: w }).webp({ quality: 82, effort: 6 }).toBuffer();
    fs.writeFileSync(dest, buf);
    written += buf.length;
  }
  before += fs.statSync(file).size;
}
fs.writeFileSync(path.join(ROOT, "utils", "image-widths.json"), JSON.stringify(widths, null, 1) + "\n");
console.log(`${files.length} immagini, ${(before / 1e6).toFixed(1)} MB originali, ${(written / 1e6).toFixed(1)} MB di versioni ridotte`);
