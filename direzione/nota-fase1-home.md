# Fase 1 — home, solo la forma. Nota delle decisioni

Branch: `redesign-home` (da `redesign`). `main` non toccato. Contenuti della home identici: testi, sezioni, ordine, link, pagine collegate.

Seconda versione (1/11, dopo la tua correzione): linee rifatte sulla struttura dello schizzo e dipinte ad acquerello, fasce fisse per tutto lo scroll, angoli arrotondati (10 px) su bottoni, immagini, riquadri e avatar, via i due blocchi colorati: chiusura leggera su crema.

## Misure

Lighthouse mobile (build statica, `out/`): Performance 98 · Accessibility 100 · Best practices 100 · SEO 100. FCP 1,8 s, LCP 1,8 s, TBT 40 ms, CLS 0.

## Font

- **Archivo** (Google Fonts, variabile: peso 100–900, larghezza 62–125 %), auto-ospitato da `next/font`, caricato solo nella home.
- Due pesi: **400** testo, **700** titoli, etichette e bottoni.
- Titoli in Archivo semi-espanso (larghezza 112 % per H1 e numeri, 106 % per H2/H3), spaziatura −0,025em, interlinea 0,96.
- H1 `clamp(2.75rem, 8.4vw, 6rem)`; H2 2–2,5rem; numeri d'impatto 3,5–4rem; testo 1rem (hero 1,125–1,375rem).

## Colori esatti (contrasti misurati)

| Uso | Valore | Contrasto |
|---|---|---|
| Fondo crema | `#F5EEDF` | — |
| Crema più scura (hover, cornici vuote) | `#EDE3CF` | — |
| Testo, bottoni, filetti pieni (bruno caldo) | `#2A1D15` | 14,2:1 su crema |
| Testo secondario, etichette | `#5A463A` | 7,7:1 su crema |
| Filetti | bruno al 16 % | — |
| Linee: sabbia (fasce larghe) | `#E3CFA6` | decorativo |
| Linee: azzurro polvere (fasce medie) | `#9DB1BF` | decorativo |
| Linee: terracotta (fasce sottili) e quadratino delle etichette | `#C2552A` | decorativo |
| Terracotta scura: hover del bottone pieno, icona Product | `#A63F1A` | crema sopra 5,4:1 |
| Verde muschio: icona Teaching | `#45603D` | decorativo |
| Evidenziatore ocra nel hero | `#E9C77A` | bruno sopra 10:1 |

Arancio, ocra e giallo mai come testo: solo campi pieni con testo scuro sopra. Nessun blu navy, nessun gradiente, nessuna ombra, nessun glow. Raggio unico `--m-radius: 10px` su bottoni, immagini, riquadri, menu, avatar; le linee restano dure.

## Come sono costruite le linee

- File: `app/components/home/PerspectiveWalls.tsx`. Un solo SVG **fisso** a tutto schermo (`position: fixed`), `aria-hidden`: le due fasce accompagnano tutto lo scroll. Disegnato solo da 1280 px in su, dopo il caricamento; sotto resta la colonna chiara.
- **Struttura dello schizzo:** ogni parete è una colonna Déco di fasce verticali che convergono verso il suo **punto di fuga in alto**, all'angolo interno della fascia laterale (22 % della larghezza della fascia dentro dal bordo della colonna, 10 % dell'altezza della finestra sopra il bordo superiore). Vicino al contenuto le fasce sono quasi verticali, verso l'esterno si aprono a ventaglio; in alto si addensano, in basso si diradano. Le due pareti sono speculari. Ogni fascia è un triangolo (base sul bordo inferiore, vertice nel punto di fuga): tutte le fasce di una parete passano per lo stesso punto, non sono parallele.
- **Ritmo Déco:** un motivo fisso di 22 passi letto dal bordo della colonna verso l'esterno (in px alla base): filetto terracotta 5, vuoto 16, campo sabbia 96, vuoto 10, filetto azzurro 3, vuoto 7, filetto azzurro 3, vuoto 28, fascia azzurra 44, vuoto 12, campo sabbia 130, vuoto 22, filetto terracotta 6, vuoto 34, campo sabbia 72, vuoto 9, fascia azzurra 18, vuoto 46, filetto terracotta 4, vuoto 8, filetto terracotta 4, vuoto 60; poi si ripete. Ogni passo ha una variazione ±25 % da una sequenza con seme fisso (stesso disegno a ogni caricamento) e cresce con la distanza dalla colonna, perché le fasce lontane si vedono compresse.
- **Acquerello:** un filtro SVG applicato a ogni parete: (1) i bordi sono deformati da un rumore (`feTurbulence` + `feDisplacementMap`, 16 px), così la linea tremola come un pennello; (2) la densità del colore varia dentro ogni fascia con un secondo rumore (alfa fra 0,35 e 1), come una campitura non uniforme; (3) un orlo di 2,5 px più scuro (pigmento che si raccoglie sul bordo). Le fasce sono in `mix-blend-mode: multiply` sulla crema.
- Ferme. Il movimento, se si farà, sarà l'ultimo passo e spento con `prefers-reduced-motion`.

## Struttura

- Colonna centrale 1120 px allineata a sinistra; header sticky 64 px con filetto sotto; ogni sezione parte da un filetto, titolo a sinistra (5/12), sottotitolo a destra (7/12).
- Niente card: colonne separate da filetti verticali; i lavori sono righe grandi alternate (immagine 7/12, testo 5/12).
- Chiusura leggera su crema: le due strade, Product e Teaching, in due colonne con icona, titolo, testo e link, separate da un filetto; sotto, il piede con © , email e LinkedIn.
- Mobile: colonna sola, bottoni a tutta larghezza, menu a pannello sotto l'header.

## Decisioni prese da solo (da confermare)

1. **Titolo della pagina:** «Giacomo Bianchi · Product & Design Leadership» (solo la home; le altre pagine restano «Giacomo Bianchi»).
2. **Etichetta «Product & Design Leadership»:** era una pillola sopra il nome; ora è una riga sotto il nome con quadratino terracotta (Impeccable vieta l'etichetta sopra il titolo). Testo invariato.
3. **Evidenziatore ocra** su «establish governance that makes design systems work in production.» nel hero (punto 9 del brief, 3.2).
4. **Metriche d'impatto senza contatore animato** (era «0 +» nell'HTML statico): numeri fermi.
5. **Tag dei progetti** come riga di testo separata da «·» invece di pillole: stessi tag, stesso ordine.
6. **Testimonianze:** tutte e cinque in griglia a due colonne, taglio a fine parola, «Read more» apre il testo sul posto (prima: carosello con finestra modale). Testi identici.
7. **Link dei progetti:** immagine e titolo portano al case study; aggiunto il link testuale «View case study» (era il testo nascosto del link di prima).
8. **Ritratto a colori** con cornice sottile (prima era in bianco e nero).
9. **Footer:** Email e LinkedIn con icona e parola (prima solo icone).
10. **Banner cookie:** componente e logica intoccati. Solo nella home ho alzato la variabile di colore del bottone «Decline» (`--color-text-tertiary`), perché il suo contrasto 3,96:1 impediva Accessibility 100. Si fa in `globals.css`, non nel componente. Se preferisci, lo tolgo e Accessibility resta 96.
11. **Punto di fuga:** uno per parete (speculari), all'angolo interno alto. Si cambia con due numeri in cima a `PerspectiveWalls.tsx` (`VP_INSET`, `VP_Y`); il motivo delle fasce è la lista `MOTIF` nello stesso file.
12. **Larghezza minima per le linee:** 1280 px. Sotto, niente linee.
13. Nessuna roll di direzioni Impeccable: la direzione era già fissata dal brief. Scritti `PRODUCT.md` (dal brief) e `DESIGN.md` (dal risultato) in radice.
14. **Acquerello con filtro SVG:** Impeccable sconsiglia `feTurbulence` come grana decorativa; qui serve all'effetto pennellata che hai chiesto, quindi l'ho usato. Se a schermo risulta troppo «matita», si abbassa l'orlo scuro (alfa 0,55) o la deformazione (16 px).
15. **Revisione indipendente** (agente Impeccable a contesto pulito) sulla prima versione: disposizione «fix», 8 punti materiali, tutti applicati (riga del ruolo più grande, vuoti nel hero ridotti, etichette non più sopra i titoli, immagini bianche fuse sulla crema con `multiply`, bottone «torna su» spostato a sinistra e solo desktop, celle metriche, testimonianza orfana a tutta larghezza, ritmo fra sezioni). Lasciati per dopo: titoli OpenGraph in `layout.tsx` (fuori fase 1), linee disegnate solo dopo il caricamento JS, menu a tendina senza chiusura con Esc.

## File toccati

`app/page.tsx` (titolo, font, shell della home), `app/pages/Home.tsx` (riscritto, stessi contenuti), `app/components/home/` (nuovo: HomeShell, PerspectiveWalls, HomeTestimonials), `app/globals.css` (tema `manifesto` in coda), `app/SiteShell.tsx` (una riga: sulla home usa la nuova shell; le altre pagine invariate), `.gitignore`, `PRODUCT.md`, `DESIGN.md`, `.impeccable/surfaces/` (contratto di direzione), `direzione/screenshots-home/`.
