# Diagnostica redesign-2 — impeccable audit + web-design-guidelines

Branch `redesign-2` @ `bc81e8f`, 1 novembre 2026. **Solo diagnosi: nessun file del sito modificato.**

Come è stata fatta:
- **impeccable audit** (skill v4.8.0, motore 0.1.18): detector automatico su sorgente (`app/`) e su 4 pagine renderizzate (home, product-work, dowjones, teaching) a 1920×1080 e 390×844; Lighthouse mobile + desktop su 5 pagine; test Playwright su overflow (320/390/768/1024 px, 10 pagine), navigazione da tastiera, reduced-motion, iPhone 13 emulato.
- **web-design-guidelines** (regole Vercel `command.md` scaricate oggi): revisione file per file, 118 rilievi verificati sul codice. Report completo: `WEB-DESIGN-GUIDELINES.md` nella stessa cartella.
- Limiti: build di produzione servita in locale senza compressione gzip/cache (i pesi in KB sono non compressi; i rilievi "cache" e "document latency" di Lighthouse dipendono dal server locale, non dal sito). Chromium headless, nessun dispositivo reale. `PRODUCT.md`/`DESIGN.md` non esistono: impeccable ha usato il codice come riferimento.

---

## Punteggio (impeccable audit)

| # | Dimensione | Voto | Rilievo principale |
|---|---|---|---|
| 1 | Accessibilità | 2/4 | Elementi senza nome (menu mobile, freccia hero, "Back to Projects" su mobile, frecce galleria), immagini cliccabili non raggiungibili da tastiera, lightbox senza `role="dialog"`, animazioni che ignorano reduced-motion |
| 2 | Performance | 2/4 | Mobile: home 68, teaching 68 (LCP 9,5 s e 11,2 s simulati). Testo della hero nascosto (`opacity:0`) finché il JS non parte; SVG delle fasce (344 KB) in HTML e JS anche su mobile dove le fasce non si vedono; immagini da 1,8–2,6 MB |
| 3 | Theming | 2/4 | Token esistono ma i nomi mentono: `text-gray-300` (126 volte), `text-slate-300` (46), `bg-blue-600` (20) oggi significano marrone / nero. 28 colori hex scritti a mano in 7 file. `COLOR_TOKENS.md` descrive la palette vecchia |
| 4 | Responsive | 2/4 | Su tutte le pagine sotto 1280 px la pagina è 8 px più larga dello schermo (cornici blu di nav e footer escono dal bordo); su iPhone la viewport diventa 398 px invece di 390. Galleria solo swipe su mobile, puntini carosello 12 px |
| 5 | Integrità d'implementazione | 3/4 | Sistema coerente (palette, fasce, cornici); restano tic generici: alone arancio (`glow-blue`, 34 usi), card dentro card, bordo laterale `border-l-4`, testo sfumato nella 404; 4 componenti mai usati |
| | **Totale** | **11/20** | **Accettabile — serve lavoro mirato** |

### Verdetto integrità
**Passa, con riserva.** Fasce laterali, cornici "linee di costruzione" e palette calda sono una voce precisa e personale: non è un sito intercambiabile. Ma sotto quella voce restano residui del tema scuro precedente (aloni colorati pensati per il nero, nomi di classi blu/grigi, numeri decorativi al 20%) che il detector segnala come stereotipi.

---

## Riepilogo

- **Rilievi**: P0 0 · P1 8 · P2 10 · P3 4 (più i 118 rilievi di dettaglio nel report Vercel)
- **Lighthouse** (mediana, server locale):

| Pagina | Mobile Perf / A11y | Desktop Perf / A11y |
|---|---|---|
| Home | 68 / 86 | 88 / 96 |
| Product Work | 89 / 92 | 100 / 98 |
| Dow Jones | 87 / 86 | 100 / 96 |
| VOD Platform | 85 / 86 | 100 / 91 |
| Teaching | 68 / 93 | 87 / 98 |

Best Practices e SEO 100 ovunque. CLS 0 ovunque.

---

## Rilievi per gravità

### P1 — da risolvere prima di andare in main

**[P1] Le animazioni ignorano `prefers-reduced-motion`**
- Dove: 16 file importano framer-motion, nessuno usa `MotionConfig`/`useReducedMotion`. Peggiori: freccia hero che lampeggia all'infinito (`Home.tsx:154`), float della 404, `scroll-behavior: smooth` globale (`SiteShell.tsx:64`), contatori animati.
- Verificato: con reduced-motion attivo, 27 elementi della home animano ancora opacità + spostamento.
- WCAG 2.3.3 / 2.2.2. Consiglio: `<MotionConfig reducedMotion="user">` in `SiteShell` + blocco `@media (prefers-reduced-motion: reduce)` per smooth-scroll e loop infiniti. (Le fasce laterali lo rispettano già.)

**[P1] Contenuto nascosto finché il JS non parte (LCP mobile 9–11 s)**
- Dove: animazioni di ingresso framer-motion renderizzate dal server con `style="opacity:0"`: 29 elementi in home, 19 dowjones, 16 teaching. L'elemento LCP mobile è il paragrafo della hero, fermo ~1 s in "render delay" anche a rete veloce.
- Impatto: con rete lenta o JS bloccato il testo principale non si vede; Performance mobile 68.
- Consiglio: hero visibile subito (niente `initial={{opacity:0}}` sopra la piega, o fade solo da 0.6 a 1); animare solo ciò che è sotto la piega.

**[P1] Pagina più larga dello schermo su mobile e tablet**
- Dove: `SketchFrame` dentro `nav` e `footer` (`app/SiteShell.tsx`), geometria `--sketch-over: 10px` in `globals.css:415`. Le linee che proseguono oltre l'angolo escono di 8 px dal bordo destro.
- Verificato a 320, 390, 768, 1024 px su tutte le 10 pagine: `scrollWidth` = larghezza + 8. Su iPhone 13 emulato la viewport di layout passa da 390 a 398 px (la pagina si rimpicciolisce o si sposta di lato col dito).
- Consiglio: per nav e footer a tutta larghezza, cornice che non sborda (o `overflow-x: clip` su `html`).

**[P1] Controlli senza nome accessibile**
- Bottone menu mobile senza `aria-label` (noto) — `SiteShell.tsx`
- Freccia "scorri giù" della hero: link vuoto (noto) — `Home.tsx:154`
- "Back to Projects" su mobile: il testo è `hidden md:inline`, il link resta vuoto — tutte e 6 le case study
- Frecce della galleria (VOD e altre) senza label
- WCAG 4.1.2. Consiglio: `aria-label`, oppure `sr-only md:not-sr-only` sul testo.

**[P1] Immagini cliccabili non utilizzabili da tastiera**
- Dove: `ImageTextCard.tsx:40`, `ProjectGallery.tsx:126`, `VODplatform.tsx:728/749` — sono `<div onClick>`.
- WCAG 2.1.1. Consiglio: `<button aria-label="Ingrandisci …">`.

**[P1] Lightbox e modali non accessibili**
- Dove: 5 copie di lightbox nelle case study + `TestimonialModal.tsx:60`. Niente `role="dialog"`/`aria-modal`, focus non spostato né intrappolato, bottone chiudi senza label, alt "Enlarged view".
- Consiglio: un solo componente `<Lightbox>` basato su `<dialog>` nativo, riusato ovunque.

**[P1] Navigazione principale in parte solo-mouse**
- Dove: dropdown "Product Work" si apre solo con hover (`SiteShell.tsx:114`); `role="menu"` usato per semplici link; focus non gestito nel menu mobile.
- WCAG 2.1.1. Consiglio: apertura con click/Enter, togliere `role="menu"`, focus sul primo link all'apertura del menu mobile.

**[P1] Contrasto testi**
- "Click to enlarge": testo scuro su overlay nero al 50% (`ImageTextCard.tsx:55`, `ProjectGallery.tsx:139`, `VODplatform.tsx:740/761`) — illeggibile, residuo della ricolorazione (`--color-text-inverse` oggi è marrone).
- Etichette rosso-arancio `#C73E13` su `#EDECEB` nelle card Before/After: 4,3:1 (serve 4,5). Verde `#3F7A52` sui tag di Teaching: 4,3:1.
- Numeri di sezione "01–06" al 20%: 1,34:1 (decorativi, ma vengono letti dagli screen reader: vanno `aria-hidden`).
- Consiglio: testo bianco sugli overlay; scurire di un passo `#C73E13`/`#3F7A52` quando stanno su fondo crema.

### P2 — prossimo giro

**[P2] Fasce laterali pesano anche su mobile** — `fascia-symbol.ts` (344 KB) sta nell'HTML di ogni pagina e nel chunk JS da 363 KB, anche sotto i 1280 px dove le fasce non si vedono. Già annotato nei punti aperti. Consiglio: caricare il simbolo solo da 1280 px in su (import dinamico + `matchMedia`).

**[P2] Immagini troppo pesanti** — `Vod-01.webp` 2,6 MB, `brand-ds.webp` 1,8 MB, `CCM.webp` 702 KB; 11 `<img>` senza `loading="lazy"` né `width/height`. Consiglio: ridimensionare a 2× della larghezza mostrata, `loading="lazy"` sotto la piega.

**[P2] Galleria solo swipe su mobile** — frecce `hidden md:flex`, scrollbar nascosta, frecce di scroll visibili solo in hover (`ProjectGallery.tsx:107/148`).

**[P2] Puntini del carosello testimonianze** — 12×12 px (WCAG 2.5.8 vuole 24), contrasto 1,5:1 e 2,2:1, cambio slide non annunciato, layout che salta da 1 a 3 card dopo il caricamento. "Read more" generico (×3).

**[P2] Ordine dei titoli** — h1 → h3 senza h2 in `ProductWork.tsx:182` e `Teaching.tsx:131`.

**[P2] ScrollToTop raggiungibile col Tab quando è invisibile** — a inizio pagina ha `opacity:0` ma riceve il focus; il banner cookie lo copre.

**[P2] Segnali di click falsi** — `GlassCard` mette `cursor-pointer` + hover su card statiche (`GlassCard.tsx:34`); `ProjectListingCard` anima tutta la card ma è cliccabile solo un piccolo link ("View Case Study" alto 20 px).

**[P2] Nomi delle classi colore fuorvianti** — 126 `text-gray-300`, 62 `text-gray-400`, 46 `text-slate-300`, 20 `bg-blue-600` rimappati nel `@theme` a marroni/nero; 28 hex scritti a mano (`CookieConsent`, `PWAInstallPrompt`, `TestimonialCarousel`, `SiteShell`, `layout`, `XpuntoCero`, `Teaching`). Chi tocca il codice legge "blu" e ottiene nero. `COLOR_TOKENS.md` e `check-contrast.js` sono ancora sulla palette vecchia.

**[P2] Aloni arancio** — `glow-blue` / shadow `0 0 20px rgba(242,140,40,.3)` su 34 elementi (icone, CTA, freccia hero): era un effetto pensato per il fondo nero, su crema sembra una sbavatura. Il detector lo classifica come stereotipo "AI".

**[P2] Logo: label diversa dal testo visibile** (noto) — `aria-label="Giacomo Bianchi - Home"` mentre il testo visibile è diverso: chi usa i comandi vocali non lo trova.

### P3 — rifinitura

- **Righe troppo lunghe**: 105–116 caratteri nei paragrafi di Dow Jones e Teaching (ideale < 80). Parole orfane in fondo ai paragrafi: `text-wrap: pretty`.
- **Card dentro card**: box Before/After/Impact dentro `GlassCard` in home (9 casi).
- **Componenti morti**: `CaseStudyTemplate` e i componenti `casestudy/*` che usa solo lui, `PWAInstallPrompt`, `ExpandableText` (importato, mai renderizzato).
- **Font**: Inter al 100% (segnalato come "troppo usato"); la 404 ha testo sfumato e c'è un `border-l-4` in `BeforeAfterImpactCard.tsx:95`.

Falso positivo scartato: "griglia di sfondo" sul body — è un solo gradiente diagonale (`SiteShell.tsx:66`).

---

## Cose che funzionano

- Best Practices e SEO 100 su tutte le pagine, CLS 0 ovunque; desktop Performance 100 sulle case study.
- Skip link presente e funzionante; ordine di tabulazione logico; focus visibile (outline rosso-arancio) su tutti gli elementi raggiungibili.
- Fasce laterali: `aria-hidden`, nessun impatto su tastiera, reduced-motion rispettato, misure stabili.
- Palette con token a tre livelli: il cambio colore è avvenuto da un punto solo.
- Nessun overflow e nessun problema di layout da 1280 px in su.

---

## Azioni consigliate (in ordine)

1. **[P1] `$impeccable harden`** — nomi accessibili, immagini cliccabili come `<button>`, un `<Lightbox>` unico su `<dialog>`, dropdown da tastiera, focus nel menu mobile, ScrollToTop non focusabile quando invisibile.
2. **[P1] `$impeccable animate`** — `MotionConfig reducedMotion="user"`, niente loop infiniti, hero visibile senza aspettare il JS.
3. **[P1] `$impeccable adapt`** — cornici di nav/footer che non sbordano sotto i 1280 px; galleria con controlli su mobile; target ≥ 24 px.
4. **[P1] `$impeccable colorize`** — overlay "Click to enlarge" in bianco, `#C73E13`/`#3F7A52` su crema a 4,5:1, numeri decorativi `aria-hidden`.
5. **[P2] `$impeccable optimize`** — simbolo delle fasce solo da 1280 px, immagini ridimensionate e lazy.
6. **[P2] `$impeccable document`** — `DESIGN.md` + rinomina dei token (`text-gray-300` → nome semantico), aggiornare `COLOR_TOKENS.md`.
7. **[P2] `$impeccable quieter`** — togliere gli aloni arancio e i segnali di click falsi.
8. **[P3] `$impeccable typeset`** — misura delle righe, `text-wrap: pretty`, gerarchia h1→h2→h3.
9. **`$impeccable polish`** — passaggio finale.

Puoi chiedermi di eseguirli uno alla volta, tutti insieme o nell'ordine che preferisci. Dopo le correzioni, rilanciare `$impeccable audit` per vedere il punteggio salire.
