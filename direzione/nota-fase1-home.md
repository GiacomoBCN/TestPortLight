# Fase 1 — home, solo la forma. Nota delle decisioni

Branch: `redesign-home` (da `redesign`). `main` non toccato. Contenuti della home identici: testi, sezioni, ordine, link, pagine collegate.

## Misure

Lighthouse mobile (build statica, `out/`): Performance 98 · Accessibility 100 · Best practices 100 · SEO 100. FCP 1,8 s, LCP 1,8 s, TBT 50 ms, CLS 0.

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
| Campo Product (blocco finale, hover bottoni) | `#A63F1A` | crema sopra 5,4:1 |
| Campo Teaching (blocco finale) | `#45603D` | crema sopra 6,1:1 |
| Evidenziatore ocra nel hero | `#E9C77A` | bruno sopra 10:1 |

Arancio, ocra e giallo mai come testo: solo campi pieni con testo scuro sopra. Nessun blu navy, nessun gradiente, nessuna ombra, nessun glow.

## Come sono costruite le linee

- File: `app/components/home/PerspectiveWalls.tsx`. Un solo SVG fisso a tutto schermo, `aria-hidden`, disegnato solo da 1280 px in su dopo il caricamento (sotto, resta la colonna chiara).
- Ogni fascia è un triangolo: base sul bordo inferiore della finestra, vertice nel **punto di fuga** a (56 % della larghezza, −55 % dell'altezza), cioè in alto e spostato a destra. Tutte le fasce dei due lati puntano allo stesso punto: non sono righe parallele.
- Le fasce sono ritagliate alle due fasce laterali (fuori dalla colonna di 1120 px); la colonna ha un filetto verticale su ogni lato.
- Ritmo irregolare da una sequenza pseudo-casuale con seme fisso (stesso disegno a ogni caricamento): 30 % filetti 2–6 px, 42 % fasce medie 10–32 px, 28 % fasce larghe 44–134 px, vuoti 10–66 px. Tre toni: larghe → sabbia, medie → azzurro polvere (18 % terracotta), sottili → terracotta o azzurro.
- Ferme. Il movimento, se si farà, sarà l'ultimo passo e spento con `prefers-reduced-motion`.

## Struttura

- Colonna centrale 1120 px allineata a sinistra; header sticky 64 px con filetto sotto; ogni sezione parte da un filetto, titolo a sinistra (5/12), sottotitolo a destra (7/12).
- Niente card: colonne separate da filetti verticali; i lavori sono righe grandi alternate (immagine 7/12, testo 5/12).
- Chiusura con due blocchi di colore pieno, Product (terracotta) e Teaching (verde), alla pari.
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
11. **Punto di fuga** a (56 %, −55 %): scelto a occhio sui 1440 e 1920. Si cambia con due numeri in cima a `PerspectiveWalls.tsx` (`VP_X`, `VP_Y`).
12. **Larghezza minima per le linee:** 1280 px. Sotto, niente linee.
13. Nessuna roll di direzioni Impeccable: la direzione era già fissata dal brief. Scritti `PRODUCT.md` (dal brief) e `DESIGN.md` (dal risultato) in radice.

## File toccati

`app/page.tsx` (titolo, font, shell della home), `app/pages/Home.tsx` (riscritto, stessi contenuti), `app/components/home/` (nuovo: HomeShell, PerspectiveWalls, HomeTestimonials), `app/globals.css` (tema `manifesto` in coda), `app/SiteShell.tsx` (una riga: sulla home usa la nuova shell; le altre pagine invariate), `.gitignore`, `PRODUCT.md`, `DESIGN.md`, `.impeccable/surfaces/` (contratto di direzione), `direzione/screenshots-home/`.
