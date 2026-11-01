const fs = require("fs");
// Uso: node scripts/build-fascia.js
// Legge scripts/fascia/lato-sinistro-linee.svg e genera app/components/fascia-symbol.ts
const path = require("path");
const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(__dirname, "fascia", "lato-sinistro-linee.svg"), "utf8");

// 9 famiglie -> variabili CSS (palette A = valori originali dell'SVG)
const FAM = [
  { v: "--fascia-nero",          base: "#07090B" },
  { v: "--fascia-rosso-arancio", base: "#F75212" },
  { v: "--fascia-oro",           base: "#FAC741" },
  { v: "--fascia-arancio",       base: "#F0930C" },
  { v: "--fascia-bianco",        base: "#F3F2EF" },
  { v: "--fascia-ardesia",       base: "#5E6D73" },
  { v: "--fascia-beige",         base: "#EFCB85" },
  { v: "--fascia-oliva",         base: "#454031" },
  { v: "--fascia-linee",         base: "#0D99FF", seedAlso: "#B3D2E2" }, // le tinte azzurre chiare appartengono alla famiglia linee
];
const hex = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16) / 255);
const lin = c => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
function oklabL(h) {
  const [r, g, b] = hex(h).map(lin);
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  return 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
}
const dist = (a, b) => { const x = hex(a), y = hex(b); return Math.hypot(...x.map((v, i) => v - y[i])); };
const seeds = [];
FAM.forEach((f, i) => { seeds.push([f.base, i]); if (f.seedAlso) seeds.push([f.seedAlso, i]); });
function family(c) { let best = 0, bd = 1e9; for (const [s, i] of seeds) { const d = dist(c, s); if (d < bd) { bd = d; best = i; } } return FAM[best]; }
function mixExpr(c) {
  const f = family(c);
  const Lt = oklabL(c), Lb = oklabL(f.base);
  let p;
  if (Lt >= Lb) p = Math.round(((Lt - Lb) / (1 - Lb)) * 100), p = Math.min(p, 100), p ? `color-mix(in oklch, var(${f.v}), white ${p}%)` : `var(${f.v})`;
  const expr = Lt >= Lb
    ? (p ? `color-mix(in oklch, var(${f.v}), white ${p}%)` : `var(${f.v})`)
    : ((p = Math.round(((Lb - Lt) / Lb) * 100)) ? `color-mix(in oklch, var(${f.v}), black ${p}%)` : `var(${f.v})`);
  return { f, expr };
}
let paths = [...src.matchAll(/<path[^>]*\/>/g)].map(m => m[0]);
paths = paths.slice(1); // rimosso il rettangolo di sfondo #B3D2E2
const stats = {};
const out = paths.map(p => {
  const styles = [];
  p = p.replace(/\s(fill|stroke)="([^"]*)"/g, (m, k, val) => {
    if (val === "none") { styles.push(`${k}:none`); return ""; }
    const c = val === "white" ? "#FFFFFF" : val.toUpperCase();
    const { f, expr } = mixExpr(c);
    stats[f.v] = (stats[f.v] || 0) + 1;
    styles.push(`${k}:${expr}`);
    return "";
  });
  return p.replace(/\/>$/, ` style="${styles.join(";")}"/>`);
});
const lines = out.slice(-16), rest = out.slice(0, -16);
const body = rest.join("\n") + `\n<g id="lines">\n${lines.join("\n")}\n</g>`;
// viewBox del simbolo: solo la parte destra del disegno (x dal 25% al 100%), altezza intera
const CUT = 0.25, W = 2550, H = 3798;
const vbX = Math.round(W * CUT * 100) / 100, vbW = Math.round((W - vbX) * 100) / 100;
const symbol = `<symbol id="fascia-sx" viewBox="${vbX} 0 ${vbW} ${H}">\n${body}\n</symbol>`;
const header = [
  "// Illustrazione delle fasce laterali (lato-sinistro-linee.svg), viewBox x dal 25% al 100%.",
  "// 490 path; i 9 colori originali sono variabili CSS --fascia-* (vedi globals.css);",
  "// ogni sfumatura è color-mix(in oklch, var(--fascia-x), white|black n%).",
  "// I 16 tratti blu #0D99FF stanno nel gruppo #lines.",
  "// Generato da scripts/build-fascia.js: non modificare a mano.",
].join("\n");
fs.writeFileSync(path.join(ROOT, "app", "components", "fascia-symbol.ts"), `${header}\nexport const FASCIA_SYMBOL = \`${symbol}\`;\n`);
console.log("path:", out.length, "famiglie:", stats);
