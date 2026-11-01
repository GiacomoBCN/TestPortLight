# Redesign 2 — appunti di lavoro

Branch: `redesign-2` (creata da `main`, commit `21d228f`). Nessun merge fatto.
Le branch `redesign` e `redesign-home` non sono state toccate.

Per vederla in locale:

```bash
git fetch origin redesign-2
git checkout redesign-2
npm install
npm run dev
```

---

## 1. Ricolorazione (commit `d5a2054`)

Solo colori: layout, card, bordi, ombre, hover, animazioni, testi, spaziature, immagini e font identici a `main`.

| Vecchio | Nuovo | Dove |
|---|---|---|
| `#050810` fondo pagina | `#FFFFFF` | body, shell, theme-color, manifest |
| `#0a0e27` fondo gradiente / card | `#F7F3EE` | gradiente body, card, sfumatura immagini corsi |
| `#0f1629` superfici rialzate | `#EFE9E2` | hover card |
| `rgba(255,255,255,0.05)` fondo glass | `rgba(74,59,50,0.05)` | tutte le card `.glass` |
| `rgba(255,255,255,0.08–0.15)` bordi | `rgba(28,25,23,0.10–0.15)` | bordi card, nav, footer, dropdown |
| `#ffffff` testo (`text-white`) | `#2B1D16` bruno scuro | titoli |
| `#cbd5e1` slate-300 / gray-300 | `#4A3B32` | corpo testo |
| `#94a3b8` slate-400 / gray-400 | `#6B5C52` | testo terziario |
| `#697990` slate-500 | `#75665B` | testo secondario (prima falliva AA) |
| `#1a7aff` blu testo | `#C73E13` rosso-arancio | link, metriche, etichette |
| `#2375ef` blu hover testo | `#A33210` | hover link |
| `#1a7aff` blu icone | `#F28C28` arancio | icone |
| blu bordi | `#F28C28` arancio | border-blue, tag, ring |
| blu fondi tenui | `#F5C33B` giallo (stessa alpha) | bg-blue-500/20, gradiente hero case study |
| `#086efd` fondo bottoni | `#1C1917` nero caldo | CTA primarie, skip link, cookie Accept |
| `#2375ef` hover bottoni | `#2E2925` | hover CTA |
| glow / ombre blu | arancio, stessa alpha | `.glow-blue`, ombre card |
| `#10b981` verde testo / icone | `#3F7A52` | Teaching |
| `#10b981` verde bordi / fondi | `#B5DDC0` | Teaching |
| `#94a3b8` / `#cbd5e1` puntini carosello | `#D9CFC4` / `#C9BDB0` | testimonianze |
| overlay neri su immagini | `#1C1917` stessa alpha, testo bianco | gallerie, modali |

Meccanica: i token in `app/globals.css` (tier 1/2/3) hanno i nuovi valori e un blocco `@theme` rimappa le utility Tailwind legacy (`text-gray-300`, `bg-blue-600`, ...). `text-white` è diventato `text-ink-900` tranne dove sta su fondi scuri (overlay, bottoni). Nuove utility: `text-accent` (testo rosso-arancio), `text-accent-icon` (icone arancio).

Lighthouse mobile home: Accessibility 86 (era 82). Il color-contrast passa ovunque. I 4 punti rimasti NON sono di colore e non sono stati toccati:
1. bottone menu mobile senza `aria-label`
2. freccia "scorri giù" nella hero senza testo accessibile
3. puntini carosello 12px (Lighthouse vuole 24px)
4. logo: `aria-label` diverso dal testo visibile

Nei case study i numeri di sezione decorativi ("01", "02") al 20% di opacità risultano 1.34:1 (erano così anche prima).

`COLOR_TOKENS.md` e `check-contrast.js` descrivono ancora la palette vecchia.

---

## 2. Fasce laterali (commit `4eea7c3` → `a79acbe`)

- `app/components/SideBands.tsx`: SVG `lato-sinistro-linee.svg` inline una sola volta come `<symbol id="fascia-sx">`, fascia sinistra + fascia destra specchiata (`scaleX(-1)`). Fisse, a tutta altezza, su tutte le pagine; pagine interne con opacità 0.7.
- `app/components/fascia-symbol.ts`: il simbolo generato. Non modificare a mano: si rigenera con `node scripts/build-fascia.js` da `scripts/fascia/lato-sinistro-linee.svg`.
- viewBox ritagliato: x dal 25% al 100% del disegno (`637.5 0 1912.5 3798`), rapporto 0.5036. Rettangolo azzurro di sfondo rimosso.
- 9 variabili CSS sul `body` (`--fascia-nero`, `--fascia-rosso-arancio`, `--fascia-oro`, `--fascia-arancio`, `--fascia-bianco`, `--fascia-ardesia`, `--fascia-beige`, `--fascia-oliva`, `--fascia-linee`). Ogni tinta dell'SVG (207) è `color-mix(in oklch, var(--fascia-x), white|black n%)`: cambiando le variabili cambia tutto il disegno, sfumature comprese.
- Palette A = valori originali. Palette B con `<body data-palette="b">`: rosso-arancio → oro `#C9A24A`, arancio → beige `#E6D3AF`. Transizione 600 ms.
- I 16 tratti blu `#0D99FF` sono nel gruppo `<g id="lines">` e non cambiano con la palette.

Layout (in `globals.css`, sezione FASCE LATERALI):
- colonna centrale `--colonna = max(1280px, 100vw − 2 × larghezza disegno)`; fascia `--band = (100vw − colonna) / 2`.
- Il disegno sta a tutta altezza con le sue proporzioni (`xMidYMid meet`), ancorato al bordo verso il contenuto: sui monitor grandi si vede intero e la colonna si allarga fino al disegno, su quelli piccoli la fascia taglia la parte esterna. Mai spazio vuoto.
- Sotto i 1280px le fasce spariscono (`--band: 0`).
- Nav, main, footer, scroll-to-top, cookie, prompt PWA e "Back to Projects" stanno dentro la colonna.

| Finestra | Colonna | Fascia |
|---|---|---|
| 1440 × 900 | 1280 | 80 |
| 1920 × 1080 | 1280 | 320 |
| 2560 × 1440 | 1280 | 640 |
| 3440 × 1440 | 1990 | 725 (disegno intero) |

Lighthouse mobile home con le fasce: Performance 53 (era 75) perché i 344 KB di SVG inline stanno in HTML e bundle JS anche su mobile. Rimedio possibile, non fatto: import dinamico del simbolo solo da 1280px in su.

---

## 3. Cornici "linee di costruzione" (commit `5db80dc` → `136ebb8`)

- `app/components/SketchFrame.tsx`: SVG inline dentro ogni box con classe `.sketch`. 12 elementi veri: 4 bande (`.sketch-band`, 4px, estremità arrotondate), 4 filetti (`.sketch-line`, 1px), 4 puntini (`.sketch-dot`). Tutti `#0D99FF` via `--fascia-linee`. Regolabili dall'ispettore.
- Geometria: 6px dentro il bordo del box, filetti che proseguono 10px oltre l'angolo, banda 4px subito fuori dal filetto. Il box tiene il suo border-radius.
- Opacità (variabili in `globals.css`, sezione LINEE DI COSTRUZIONE): `--sketch-line-opacity: 0.3`, `--sketch-band-opacity: 0.2`, `--sketch-dot-opacity: 0.3`. Geometria: `--sketch-in`, `--sketch-over`, `--sketch-pad`.
- Dove: nav, footer, `GlassCard` (impatto, How I Lead, How I Work, testimonianze, case study), `ProjectCard`, `ProjectListingCard`, `OverviewCard`, `ProjectIntroCard`, `DecisionTable`, blocco CTA finale della home.
- Dove no: box interni (Before/After/Impact, metriche dentro le card), tag, bottoni, modali.
- Provati e scartati: filtro SVG "mano incerta" (feTurbulence + feDisplacementMap), linea doppia, quadratini bianchi agli angoli (commit `b76239a`, poi tolti).

---

## Aperti

- I 4 punti Accessibility non di colore (sopra).
- Performance mobile delle fasce (import dinamico).
- Scegliere se tenere le opacità 30/20/30 delle cornici.
