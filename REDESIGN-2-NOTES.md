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

## 4. Fasce: interazione al mouse (commit `c5a500a`, `0fd5407`)

- `app/components/SideBands.tsx`: col mouse sopra una fascia, le forme entro 140 px dal cursore si spostano **via dal cursore** e tornano al loro posto. Spostamento massimo 7 px (forma sotto il cursore), che decresce col quadrato della distanza; andata e ritorno in 350 ms (picco al 35%); onda: ritardo fino a 80 ms per le forme lontane. Ogni forma non riparte finche' non e' tornata. Mouse fermo o fuori dalle fasce: niente si muove.
- Libreria: `framer-motion` (`animate()`), gia' nel progetto. Niente GSAP.
- Fermi: il gruppo delle linee blu (`#lines`) e la forma di sfondo a tutta fascia. Si muovono solo le forme della fascia sotto il cursore.
- Struttura: l'HTML e' identico a prima (`<symbol>` + `<use>` per fascia). Solo se il dispositivo ha un mouse (`hover: hover` e `pointer: fine`) e non c'e' `prefers-reduced-motion`, a pagina caricata (idle) ogni `<use>` viene sostituito da una copia inline identica del simbolo (`<svg class="fascia-inline">`, stesso viewBox, senza id duplicati), cosi' le forme di una fascia si muovono da sole. Su touch e con reduced-motion il DOM non cambia e non c'e' nessun listener attivo.
- CSS (`globals.css`, FASCE LATERALI): le regole di posizione/specchiatura passano da `.side-band svg` a `.side-band > svg` (stesso effetto, ma non colpiscono l'svg annidato); la transizione di palette vale anche per `.fascia-inline path`.
- Gli `<svg>` delle fasce e il simbolo sono creati una volta sola (`useMemo`): prima ogni re-render (scroll, cambio pagina) faceva riscrivere a React il loro contenuto, rimettendo il `<use>` al posto delle copie inline, e l'effetto funzionava solo fino al primo scroll. Per sicurezza, se le copie spariscono vengono ricreate al passaggio successivo del mouse.
- Parametri in cima al componente: `RADIUS`, `MAX_SHIFT`, `DURATION`, `WAVE_DELAY`.

Misure (build di produzione, Chromium headless, misurate dopo la sostituzione inline):

| Finestra | Colonna | Fascia sx | Fascia dx |
|---|---|---|---|
| 1440 × 900 | 1280 | 80 | 80 |
| 1920 × 1080 | 1280 | 320 | 320 |
| 2560 × 1440 | 1280 | 640 | 640 |
| 3440 × 1440 | 1990 (1989,63) | 725 (725,17) | 725 (725,17) |

Identiche a prima, home e pagine interne. Screenshot delle fasce prima/dopo a riposo: identici al pixel (differenza 0) a tutte e quattro le misure.

Prestazioni (5 s di mouse sulle due fasce, 1920 × 1080, mediana di 3 run; Chromium headless senza GPU in container cloud, quindi indicative):
- FPS: 60 durante il movimento (prima: 60).
- CPU main thread: ~17% durante il movimento (prima: ~2%). A mouse fermo: 0, non gira niente.
- Lighthouse desktop home, 3 run: Performance 88 / Accessibility 96 / Best Practices 100 / SEO 100, identici a prima. TBT 0 ms, CLS 0, LCP 2,31 s (prima 2,31 s).
- Peso: HTML invariato; JS condiviso +10 kB (`animate` di framer-motion entra nel bundle comune).

---

## 5. Google Analytics: tutti i clic (commit `e2dff7a`)

- `app/components/ClickTracking.tsx`: un solo listener sul documento manda a GA un evento per ogni clic su qualcosa di cliccabile (link, bottoni, immagini ingrandibili, card con `cursor-pointer`). Nessun componente del sito modificato, tranne `data-track-area="cookie"` sul banner cookie. Montato dentro `GoogleAnalytics.tsx`: senza `NEXT_PUBLIC_GA_MEASUREMENT_ID` non gira. I clic sul testo normale non vengono registrati.

| Evento | Quando |
|---|---|
| `click_email` | link email |
| `click_linkedin` | link LinkedIn |
| `click_external` | altri siti esterni |
| `open_case_study` | link a una case study (`project`: dowjones, vodplatform, ...) |
| `click_nav` | link o bottoni nella barra di navigazione |
| `click_link` | altri link interni (es. "View Product Work") |
| `open_image` | immagine ingrandibile (`label` = testo alternativo dell'immagine) |
| `cookie_choice` | Accept / Decline (`choice`) |
| `click_button` | tutti gli altri bottoni (Read more, frecce, chiudi, ...) |

Parametri: `label` (cosa e' stato cliccato), `area` (nav, footer, lightbox, cookie o il titolo della sezione, es. "Featured Work"), `link_url` per i link, `project` per le case study. La pagina la aggiunge GA da sola.

Per vedere `label`, `area` e `project` nei report: GA → Amministrazione → Definizioni personalizzate → Crea dimensione personalizzata (ambito Evento) per ciascuno. Gli eventi compaiono in Report → Coinvolgimento → Eventi (in tempo reale subito, nei report standard entro 24-48 h).

Provato in locale con un ID di test: cookie, menu, email, LinkedIn, CTA della hero, card case study, Read more, frecce testimonianze, immagini e lightbox mandano l'evento giusto; testo normale nessun evento.

---

## 6. Skill e diagnostica (1 novembre 2026)

- Skill copiate identiche dalla branch `redesign` (commit `7d98e78`) in `.claude/skills/`: `impeccable`, `web-design-guidelines`, `playwright-cli`, piu' `skills-lock.json` (commit `bc81e8f`). Cosi' arrivano in main insieme a questa branch.
- Diagnostica completa, **solo lettura, nessuna modifica al sito**, fatta su `bc81e8f` (prima del tracciamento clic):
  - `DIAGNOSTICA.md`: audit impeccable (voto 11/20, "accettabile") + sintesi, rilievi P1/P2/P3 e ordine consigliato degli interventi. Il punto sul consenso di Google Analytics e' stato tolto su richiesta.
  - `WEB-DESIGN-GUIDELINES.md`: revisione file per file con le regole Vercel Web Interface Guidelines (118 rilievi, `file:riga`).
- Lighthouse mobile in quella diagnostica: home 68, teaching 68, case study 85-89; desktop home 88, case study 100.

## 7. Riepilogo della giornata (1 novembre 2026)

1. Fasce laterali: interazione al mouse (sezione 4).
2. Correzione: l'effetto si spegneva dopo il primo scroll o cambio pagina (React riscriveva le fasce); ora no.
3. Skill aggiunte a questa branch (sezione 6).
4. Diagnostica completa senza modifiche (`DIAGNOSTICA.md`, `WEB-DESIGN-GUIDELINES.md`).
5. Google Analytics: in GA le pagine si distinguono gia' per percorso (`/` = home, `/dowjones/`, `/teaching/`, ...): Report -> Coinvolgimento -> Pagine e schermate, vista "Percorso pagina". Il titolo e' "Giacomo Bianchi" su tutte le pagine.
6. Tracciamento di tutti i clic in GA (sezione 5).

Branch di servizio `claude/zen-faraday-vvpx4t` su GitHub: e' una copia di `redesign-2` a `c5a500a`, non contiene niente di diverso. Da qui non e' stato possibile cancellarla: va cancellata a mano da GitHub (pagina Branches).

---

## 8. Correzioni tecniche dalla diagnostica (2 novembre 2026)

Tutto su `redesign-2` (partendo da `27ba45e`). Un commit per blocco, nell'ordine di `DIAGNOSTICA.md`. Vincoli: nessun testo visibile cambiato, layout/colori/font/fasce/cornici identici tranne i punti concordati (contrasto e overflow mobile); punti di gusto non toccati (aloni arancio, card dentro card, Inter, lunghezza righe, bordo laterale, testo sfumato della 404).

| Blocco | Commit | Cosa |
|---|---|---|
| 1 harden | `0b05d04` | Lightbox unica (`app/components/Lightbox.tsx`) al posto delle 5 copie: `role="dialog"`, focus spostato/intrappolato/restituito, scroll bloccato, Esc/frecce/swipe, alt vero. Immagini ingrandibili come `<button>` con nome. Modale testimonianze accessibile. Menu mobile con `aria-label` e focus gestito; dropdown "Product Work" apribile da tastiera, Esc lo chiude; tolti `role="menu"`. "Back to Projects" leggibile su mobile (`sr-only`). Nomi accessibili a freccia hero, frecce galleria, controlli carosello; contatore `aria-live`. ScrollToTop fuori dal Tab quando invisibile. Gerarchia titoli h1→h2 (Product Work, Teaching). Pallini "•" `aria-hidden`; banner cookie come regione con nome. |
| 2 animate | `580843f` | `<MotionConfig reducedMotion="user">` su tutto il sito; con reduced-motion: niente scroll fluido, niente float infinito della 404, niente spostamenti delle card (le `transition-all` tengono solo colori/ombre), freccia hero ferma, contatori subito al valore finale. Entrata della hero di home e teaching in CSS (stessi tempi): il testo non resta a opacity 0 finche' non parte il JS, e si vede anche senza JS. |
| 3 adapt | `3501afc` | Cornici di nav e footer non escono piu' dallo schermo (`overflow-x: clip` + `overflow-clip-margin: var(--band)` sotto i 1298 px). Parole lunghe nei titoli a capo solo se da sole non entrano (`overflow-wrap: anywhere`). Frecce della lightbox anche su mobile. Pallini del carosello con area di tocco 24 px. |
| 4 colorize | `e0481d7` | Solo i 3 colori concordati, locali (token globali invariati) + numeri 01–06 `aria-hidden`. Correzione al blocco 3: negli elenchi la regola delle parole lunghe vale solo sotto i 340 px. |
| 5 optimize | `4371342` | Disegno delle fasce (344 KB) fuori dal bundle JS (resta nell'HTML come prima): JS condiviso 309 → 188 kB. Immagini responsive: versioni 128–1920 px in `public/images/_w`, loader `utils/image-loader.ts` per il srcset di `next/image`; originali intatti (lightbox). |

### Cambiamenti visibili (tutti concordati prima)
- Etichette "Before: / After: / Impact:" nelle card della home: `#C73E13` → `#A33210` (3,96 → 5,41:1 sullo sfondo glass reale).
- Badge "Academic Leadership" (hero Teaching): `#3F7A52` → `#3A7049` (4,49 → 5,14:1).
- "Click to enlarge" sull'overlay nero (solo hover/focus): da marrone scuro (illeggibile) a bianco.
- Pallini del carosello: stessi pallini, distanza 8 → 12 px (frecce spostate di 2 px verso l'esterno).
- Lightbox su mobile: frecce precedente/successiva visibili (prima solo swipe).
- Su telefoni stretti alcune parole lunghe nei titoli vanno a capo invece di uscire dallo schermo: h1 "TuPlanRedondo PWA" fino a 390 px ("TuPlanRedond / o PWA"), h1 "XpuntoCero..." fino a 375 px, alcuni h2 a 320–340 px, due voci di elenco solo sotto 340 px.
- Pagina non piu' larga dello schermo sotto i 1298 px: su iPhone la viewport e' 390 px (era 398, la pagina era leggermente rimpicciolita).
- Nuovi stati solo da tastiera: l'overlay "Click to enlarge" compare anche col focus; frecce della galleria visibili col focus.
- Con reduced-motion attivo: niente movimento (era il bug).

### Stato dei rilievi
Lo stato di ogni rilievo e' scritto direttamente nei due report: in `DIAGNOSTICA.md` (ogni P1/P2/P3 e le "Azioni consigliate") e in `WEB-DESIGN-GUIDELINES.md` (in fondo a ognuno dei 118 rilievi e nella Top 10): **✅ FATTO**, **🟡 IN PARTE** o **⏸ NON FATTO** con il motivo. Rilievi del report Vercel: 45 fatti, 19 in parte, 56 non fatti (testo visibile, gusto, layout, componenti non usati o fuori perimetro).

Blocchi di `DIAGNOSTICA.md` non eseguiti: 6 document (rinomina token, `COLOR_TOKENS.md`), 7 quieter (aloni, segnali di click: punti di gusto), 8 typeset fatto solo per la gerarchia dei titoli, 9 polish sostituito dalle verifiche qui sotto.

### Verifica
- Screenshot prima/dopo a pagina intera (scorrendo la pagina, cosi' le card animate sono visibili), 11 pagine, 390 e 1440 px: identici al pixel tranne i punti sopra e, nel blocco 5, il ricampionamento delle immagini (identiche a vista). A 1920/2560/3440: parte visibile identica; le fasce a riposo identiche al pixel.
- Misure (build finale): 1440×900 → colonna 1280, fascia 80; 1920×1080 → 1280 / 320; 2560×1440 → 1280 / 640; 3440×1440 → 1989,66 / 725,17. Invariate.
- Overflow: nessuna pagina piu' larga dello schermo a 320, 390, 768, 1024, 1279, 1280 px; iPhone 13 emulato 390 px.
- Tastiera (Playwright, 20 controlli, tutti passati): menu mobile, dropdown, modale, lightbox (focus, Tab intrappolato, Esc, frecce, alt), ScrollToTop.
- Reduced-motion: elementi che si spostano sulla home 29 → 0. Senza JS: h1 della hero visibile (prima opacity 0).
- axe-core (WCAG 2.2 AA + best practice), 11 pagine a 390 e 1440: restano solo i numeri decorativi 01–06 al 20% (vedi Aperti). Prima: button-name, link-name, label-content-name-mismatch, heading-order, region, scrollable-region-focusable, target-size.
- Pesi immagini (pagina scorsa fino in fondo): Dow Jones 3,9 MB → 0,2–0,4 MB; VOD 16,7 MB → 3,9 MB (desktop) / 10 MB (telefono 3x); Teaching desktop 1,3 MB → 0,15 MB.

Lighthouse (mediana di 3 run, build statica servita in locale senza gzip, Chromium headless; Perf / A11y / BP / SEO, LCP):

| Pagina | Mobile prima | Mobile dopo | Desktop prima | Desktop dopo |
|---|---|---|---|---|
| Home | 63 / 86 / 100 / 100, 9,9 s | 64 / 100 / 100 / 100, 8,3 s | 87 / 96 / 100 / 100, 2,4 s | 91 / 100 / 100 / 100, 2,0 s |
| Product Work | 71 / 91, 6,8 s | 71 / 100, 7,0 s | 95 / 98, 1,5 s | 97 / 100, 1,3 s |
| Dow Jones | 69 / 86, 7,8 s | 69 / 96, 7,6 s | 80 / 96, 3,7 s | 95 / 96, 1,5 s |
| VOD Platform | 68 / 86, 7,8 s | 69 / 96, 7,8 s | 92 / 91, 1,8 s | 93 / 96, 1,7 s |
| Teaching | 69 / 92, 11,2 s | 70 / 100, 8,8 s | 86 / 98, 2,5 s | 91 / 100, 1,9 s |

Best Practices e SEO 100 ovunque, CLS 0 ovunque.

Correzione sul metodo: a meta' lavoro e' emerso che lo script degli screenshot non scorreva la pagina, quindi le card che compaiono allo scroll erano invisibili sia prima che dopo. I commit dei blocchi 1 e 2 dicono "identici al pixel" sulla base di quella prima verifica, parziale. Lo script e' stato corretto e il confronto rifatto a pagina intera a 390 e 1440 px su tutte le 11 pagine (risultati sopra); ha trovato un effetto non voluto (a 390 px la regola sulle parole lunghe mandava a capo "administrator/crew/supervisors" in un elenco), corretto nel blocco 4. A 1920/2560/3440 px confrontata solo la parte visibile senza scroll e le fasce.

### Da sapere
- Immagini: dopo aver aggiunto o cambiato un'immagine in `public/images`, lanciare `npm run images` (rigenera `public/images/_w` e `utils/image-widths.json`). Se non lo si fa, quell'immagine usa l'originale: niente si rompe.
- Il disegno delle fasce si rigenera sempre con `node scripts/build-fascia.js`; ora entra solo nell'HTML.
- Google Analytics: alcune etichette (`label`) cambiano perche' ora i controlli hanno un nome: menu mobile "Open menu" (era "menu"), chiudi lightbox "Close image" (era "x"), freccia hero "Scroll to Driving Measurable Impact" (era "chevron-down"), frecce galleria "Scroll images left/right", "Read more: testimonial from <nome>" (era "Read more"), "View Case Study: <titolo>". Le card della home usano il testo della card. Eventi e parametri `area`/`project`/`choice` invariati.

---

## Aperti

- Numeri decorativi 01–06 delle case study al 20% (1,34:1): ora `aria-hidden`, quindi gli screen reader non li leggono e per WCAG sono decorazione (esenti). axe/Lighthouse li segnalano comunque (case study ferme ad Accessibility 96). Per azzerare l'avviso servirebbe cambiarne l'aspetto o spostarli in CSS (`::before`): da decidere.
- Performance mobile (64–71): il ritardo dell'LCP nella simulazione di Lighthouse viene ora dal runtime React/Next + framer-motion (~320 kB di JS) e dai 344 KB del disegno delle fasce, che restano nell'HTML di ogni pagina anche sotto i 1280 px. Toglierli dall'HTML vuol dire caricarli dopo (file esterno da 1280 px in su): su desktop le fasce comparirebbero un attimo dopo il resto. Da decidere.
- Puntini del carosello: contrasto 1,5:1 (inattivo) / 2,45:1 (attivo), freccia hero arancio 2,45:1: lasciati per scelta (le frecce del carosello fanno la stessa cosa dei puntini).
- Non fatti perche' fuori perimetro o di gusto: rinomina dei token colore e `COLOR_TOKENS.md`/`check-contrast.js` (blocco 6), aloni arancio e `GlassCard` con `cursor-pointer` su card non cliccabili (blocco 7), lunghezza righe e `text-wrap` (blocco 8), breadcrumb come link, bottone "Back to Projects" fisso sopra il contenuto su mobile, emoji di legenda nella VOD.
- Scegliere se tenere le opacita' 30/20/30 delle cornici.
- Titoli corti per ogni pagina ("Dow Jones", "Teaching", ...) per leggerli in GA: proposti, non fatti.
- In GA: creare le dimensioni personalizzate `label`, `area`, `project` (ambito Evento) e verificare in Tempo reale dopo il deploy.
- Facoltativo: Microsoft Clarity per le mappe di calore di tutti i clic (serve un account).
- Cancellare la branch `claude/zen-faraday-vvpx4t` da GitHub.
