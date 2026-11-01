# Web Interface Guidelines — review UI (branch redesign-2)

Ruleset: `command.md` scaricato il 2026-11-01 con `curl -sS` da https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md (branch `main`, sha256 del file `d246b026…e0234`; la API GitHub non ha restituito lo SHA del commit). Regole e formato di output seguiti; nessuna modifica ai file del repo.

Legenda: `[categoria]` = categoria della regola violata · `(known)` = già noto e confermato · `(dead)` = componente/pagina non montato in nessuna route (impatto attuale nullo, ma il codice c'è).
Nota trasversale: lucide-react 0.544 aggiunge `aria-hidden="true"` di default alle icone senza label, quindi le icone Lucide decorative **non** sono segnalate. Il focus ring globale `a:focus-visible, button:focus-visible` (app/SiteShell.tsx:72) copre link e bottoni: niente finding "manca focus" per questi.

---

## app/layout.tsx

app/layout.tsx:36 - `statusBarStyle: "black-translucent"` (anche :114): in PWA standalone il contenuto finisce sotto la status bar iOS; né il nav fixed né il body usano `env(safe-area-inset-top)` e il viewport non ha `viewportFit: "cover"` [Safe area/Layout]
app/layout.tsx:110 - nessun `<link rel="preconnect">` per `www.googletagmanager.com` (script GA caricato su ogni pagina) [Performance]
✓ `maximumScale: 5` (zoom non bloccato), `lang="en"`, `themeColor #ffffff` coerente con il wrapper `bg-white` di SiteShell.

## app/SiteShell.tsx

app/SiteShell.tsx:178 - (known) bottone menu mobile solo icona senza `aria-label` (es. "Open menu"/"Close menu") [Accessibilità]
app/SiteShell.tsx:95 - (known) `aria-label="Giacomo Bianchi - Home"` diverso dal testo visibile "Giacomo Bianchi" (su mobile il testo è nascosto, quindi il nome viene solo dall'aria-label: accettabile, ma allinearlo) [Accessibilità]
app/SiteShell.tsx:112 - dropdown "Product Work" si apre solo con `onMouseEnter/Leave`: nessuna apertura da tastiera/focus (`:focus-within`, `onKeyDown`, bottone con `aria-expanded`); le voci sono `invisible` quindi saltate dal Tab [Focus]
app/SiteShell.tsx:135 - `role="menu"`/`role="menuitem"` (:141, :151 e menu mobile :199, :205–:239) su semplici link di navigazione senza gestione frecce: semantica ARIA sbagliata per un nav di sito → usare `<ul>` + link, niente role menu [Accessibilità]
app/SiteShell.tsx:199 - menu mobile aperto: focus non spostato nel pannello né riportato al toggle alla chiusura (Esc chiude ma il focus resta "perso") [Focus]
app/SiteShell.tsx:84 - `transition-all` sul nav (anche :125 dropdown) → elencare `background-color, padding, opacity` [Animazione]
app/SiteShell.tsx:63 - `* { scroll-behavior: smooth }` senza `@media (prefers-reduced-motion: reduce)` [Animazione]
app/SiteShell.tsx:198 - pannello mobile `overflow-y-auto` senza `overscroll-behavior: contain` [Touch]
app/SiteShell.tsx:193 - backdrop `<div onClick>`: accettabile (Esc + toggle disponibili), solo da notare [Accessibilità]
app/SiteShell.tsx:119 - hover dei link nav da #4A3B32 a #2B1D16: differenza quasi impercettibile (anche :161, :165); aggiungere underline o colore accent [Hover]

## app/globals.css

app/globals.css:274 - `@keyframes float` / `.animate-float` (infinite, :294) e `.animate-fade-in` (:298) senza variante `prefers-reduced-motion` (solo le transizioni delle fasce, :397, sono protette) [Animazione]
app/globals.css:251 - body `Arial` qui, `Inter` in SiteShell.tsx:65, ma Inter non viene mai caricato (nessun `next/font`, `@font-face` o preload): font effettivo = font di sistema; `--font-sans: var(--font-geist-sans)` (:236) punta a una variabile inesistente [Performance]
app/globals.css:1 - manca `scroll-padding-top` su `html` pari all'altezza del nav fixed: ancore (#work, #impact, #about) ed elementi raggiunti col Tab possono finire sotto il nav [Focus]
app/globals.css:1 - nessun `touch-action: manipulation` né `-webkit-tap-highlight-color` impostato [Touch]
app/globals.css:1 - nessun `text-wrap: balance` sui titoli in tutto il sito (h1/h2 lunghi tipo "How We Worked: Process, Quality & Collaboration" vanno a capo con vedove) [Tipografia]
✓ Sezioni FASCE LATERALI e LINEE DI COSTRUZIONE (:303–:461): `pointer-events: none`, transizioni protette da reduced-motion, nessun problema tecnico.

## app/not-found.tsx

app/not-found.tsx:21 - `animate-float` infinito sul "404" senza reduced-motion [Animazione]
app/not-found.tsx:39 - `transition-all` (anche :47) [Animazione]
app/not-found.tsx:32 - apostrofi dritti "you're", "doesn't" → ’ [Tipografia]
app/not-found.tsx:65 - separatori "•" letti dallo screen reader → `aria-hidden="true"` (anche :72) [Accessibilità]

## app/components/CookieConsent.tsx

app/components/CookieConsent.tsx:57 - il banner compare in modo asincrono senza `role="region"`/`aria-label` né `aria-live="polite"`: chi usa screen reader non sa che è apparso [Accessibilità]
app/components/CookieConsent.tsx:58 - slide-in framer-motion senza reduced-motion (vedi finding globale "framer-motion") [Animazione]
app/components/CookieConsent.tsx:80 - `transition-all` (anche :86) [Animazione]
app/components/CookieConsent.tsx:62 - `fixed bottom-6` senza `env(safe-area-inset-bottom)` (home indicator iOS) [Safe area/Layout]
app/components/CookieConsent.tsx:62 - su desktop il banner (z-50, bottom-right) copre il bottone ScrollToTop (z-40, stessa posizione) [Focus]
app/components/CookieConsent.tsx:82 - etichette generiche "Decline"/"Accept" (:88) → "Decline Analytics"/"Accept Cookies" [Copy]

## app/components/ExpandableText.tsx (dead: importato in Home.tsx:28 e Teaching.tsx:13 ma mai renderizzato)

app/components/ExpandableText.tsx:29 - `"..."` → `"…"` [Tipografia]
app/components/ExpandableText.tsx:39 - toggle senza `aria-expanded`/`aria-controls`; il bottone viene smontato a ogni click (anche :57, :90) → focus perso [Focus]
app/components/ExpandableText.tsx:52 - `cloneElement` sostituisce i figli con testo piatto: link/grassetti nei figli vengono persi [Contenuti]
app/components/ExpandableText.tsx:72 - animazioni senza reduced-motion (anche :84) [Animazione]

## app/components/PWAInstallPrompt.tsx (dead: non montato da nessuna parte)

app/components/PWAInstallPrompt.tsx:114 - bottone X solo icona senza `aria-label` [Accessibilità]
app/components/PWAInstallPrompt.tsx:101 - `transition-all` (anche :107) [Animazione]
app/components/PWAInstallPrompt.tsx:80 - `fixed top-6` senza safe-area [Safe area/Layout]
Fuori regole: :23 registra `/sw.js` ignorando il basePath.

## app/components/ScrollToTop.tsx

app/components/ScrollToTop.tsx:35 - da nascosto (`opacity-0 pointer-events-none`) resta nel Tab order: focus su un bottone invisibile → smontarlo o `tabIndex={-1}` + `aria-hidden` quando non visibile [Focus]
app/components/ScrollToTop.tsx:23 - `behavior: "smooth"` senza controllo reduced-motion [Animazione]
app/components/ScrollToTop.tsx:35 - `transition-all` [Animazione]
app/components/ScrollToTop.tsx:30 - `bottom-6` senza safe-area [Safe area/Layout]

## app/components/SideBands.tsx

✓ pass (verifica solo tecnica): fasce `aria-hidden` (:158), simbolo `aria-hidden` + `focusable="false"` (:143–:144), `pointer-events: none`, animazione solo con `(hover: hover) and (pointer: fine)` e senza reduced-motion (:47–:49, ricontrollato a ogni tick :82), letture di layout (`getBoundingClientRect` :84, `getBBox` :71) solo in rAF, mai in render, listener `passive`. Nota non bloccante: a idle (:57–:62) vengono iniettate due copie inline del simbolo da ~344 KB anche se il mouse non passa mai sulle fasce.

## app/components/SketchFrame.tsx

✓ pass (`aria-hidden`, `focusable="false"`, `pointer-events: none` da CSS).

## app/components/TestimonialCarousel.tsx

app/components/TestimonialCarousel.tsx:183 - (known) pallini 12×12 px (target < 24 px); in più contrasto non-testuale insufficiente: inattivo #D9CFC4 su bianco ≈1,5:1, attivo #F28C28 ≈2,2:1 (< 3:1), e nessun `aria-current` sul pallino attivo [Touch]
app/components/TestimonialCarousel.tsx:203 - cambio pagina non annunciato: contatore/slide senza `aria-live="polite"` [Accessibilità]
app/components/TestimonialCarousel.tsx:32 - numero di card per vista calcolato via `resize` listener in JS: SSR/static mostra 1 card poi salta a 3 su desktop (layout shift) → usare griglia CSS/`matchMedia` [Safe area/Layout]
app/components/TestimonialCarousel.tsx:94 - `"..."` → `"…"` [Tipografia]
app/components/TestimonialCarousel.tsx:124 - virgolette dritte `"{text}"` → “ ” [Tipografia]
app/components/TestimonialCarousel.tsx:129 - "Read more" ripetuto e generico; aggiungere `aria-label={\`Read full testimonial from ${name}\`}` e `aria-haspopup="dialog"` [Copy]
app/components/TestimonialCarousel.tsx:103 - slide ±1000 px con spring, nessuna variante reduced-motion [Animazione]
app/components/TestimonialCarousel.tsx:171 - `transition-all` (anche :183, :195) [Animazione]
app/components/TestimonialCarousel.tsx:26 - pagina del carousel non riflessa nell'URL (non linkabile) — bassa priorità [Navigazione/Stato]

## app/components/TestimonialModal.tsx

app/components/TestimonialModal.tsx:60 - modale senza `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; focus non spostato dentro, non intrappolato, non restituito a "Read more" alla chiusura [Accessibilità]
app/components/TestimonialModal.tsx:66 - contenitore `overflow-y-auto` senza `overscroll-behavior: contain` [Touch]
app/components/TestimonialModal.tsx:82 - virgolette dritte `"{quote}"` → “ ” [Tipografia]
app/components/TestimonialModal.tsx:72 - `transition-all` [Animazione]
app/components/TestimonialModal.tsx:61 - spring scale/translate senza reduced-motion [Animazione]

## app/components/casestudy/CaseStudyHero.tsx (dead: usato solo da CaseStudyTemplate)

app/components/casestudy/CaseStudyHero.tsx:42 - immagine di sfondo decorativa (opacity 20%) con alt descrittivo `${title} hero image` → `alt=""` [Immagini]

## app/components/casestudy/CaseStudyOverview.tsx (dead)

app/components/casestudy/CaseStudyOverview.tsx:30 - emoji 🎯👤📈⏱️ (:17–:20) lette dagli screen reader ("direct hit"…) → `aria-hidden="true"` [Accessibilità]

## app/components/casestudy/CaseStudySection.tsx (dead)

app/components/casestudy/CaseStudySection.tsx:25 - numero decorativo "01" letto prima del titolo → `aria-hidden="true"` (stesso pattern inline nelle 6 pagine case study, vedi sotto) [Accessibilità]

## app/components/casestudy/ImageTextCard.tsx (usato in VOD, SGPV, XpuntoCero, TuPlanRedondo)

app/components/casestudy/ImageTextCard.tsx:40 - `<div onClick>` apre la gallery: non focusabile, nessun ruolo, nessun handler tastiera → tastiera e screen reader non possono ingrandire le immagini; usare `<button>` con `aria-label="Enlarge: {alt}"` [Accessibilità]
app/components/casestudy/ImageTextCard.tsx:55 - overlay "Click to enlarge": testo #2B1D16 (text-inverse dopo il recolor) su `bg-black/50` → scuro su scuro, illeggibile; solo in hover, assente su touch e da tastiera [Hover]
app/components/casestudy/ImageTextCard.tsx:76 - "•" decorativo dentro `<li>` → `aria-hidden` [Accessibilità]

## app/components/casestudy/LeadershipProfile.tsx (dead)

app/components/casestudy/LeadershipProfile.tsx:28 - `<img>` senza `width`/`height` né `loading="lazy"`; fallback su foto stock Unsplash esterna [Immagini]
app/components/casestudy/LeadershipProfile.tsx:35 - emoji 👤 decorativa senza `aria-hidden` [Accessibilità]

## app/components/casestudy/MetricShowcase.tsx (dead)

app/components/casestudy/MetricShowcase.tsx:14 - valori numerici senza `tabular-nums` [Tipografia]

## app/components/portfolio/BeforeAfterImpactCard.tsx

app/components/portfolio/BeforeAfterImpactCard.tsx:37 - count-up con `setInterval` ignora reduced-motion; l'`<h3>` (:66) cambia 60 volte, gli screen reader possono leggere valori intermedi → mostrare il valore finale con reduced-motion e mettere `aria-label` col valore finale [Animazione]
app/components/portfolio/BeforeAfterImpactCard.tsx:52 - `count.toString()` → "1000" senza separatore delle migliaia; usare `Intl.NumberFormat` [Locale]
app/components/portfolio/BeforeAfterImpactCard.tsx:66 - numero animato senza `tabular-nums` → la larghezza oscilla durante il conteggio [Tipografia]

## app/components/portfolio/GlassCard.tsx

app/components/portfolio/GlassCard.tsx:34 - `hover` è `true` di default → `cursor-pointer` + stile hover su card non interattive (Teaching.tsx:130, :204, :276, :361, :397; DowJones.tsx:246; VODplatform.tsx:413; SGPVEvolution.tsx:352; tutte le `<GlassCard>` senza `hover={false}` nei case study; MetricCard.tsx:16; ImageTextCard.tsx:90): falsa affordance di click → default `false` [Hover]
app/components/portfolio/GlassCard.tsx:28 - fade/slide in senza reduced-motion; con static export il contenuto è a `opacity:0` finché JS non idrata [Animazione]
app/components/portfolio/GlassCard.tsx:33 - `transition-all` [Animazione]

## app/components/portfolio/ProjectCard.tsx

app/components/portfolio/ProjectCard.tsx:120 - `focus:outline-none focus:ring-*` → ring anche al click del mouse; usare `focus-visible:` [Focus]
app/components/portfolio/ProjectCard.tsx:118 - `transition-all` (+ `hover:scale-[1.02]` senza reduced-motion) [Animazione]

## app/components/portfolio/LeadershipCard.tsx · MetricCard.tsx · SectionHeader.tsx

✓ pass (a parte i finding globali: `GlassCard` hover di default, framer-motion senza reduced-motion in SectionHeader.tsx:14, nessun `text-balance` su SectionHeader.tsx:21).

## app/components/work/DecisionTable.tsx · OverviewCard.tsx

✓ pass (vera `<table>` con `<thead>`, versione card su mobile, icone decorative).

## app/components/work/ProjectGallery.tsx (DowJones, VOD, SGPV, XpuntoCero, BackOffice, TuPlanRedondo)

app/components/work/ProjectGallery.tsx:106 - frecce di scroll solo icona senza `aria-label` (anche :147); `opacity-0` finché non c'è `group-hover` → invisibili quando hanno il focus e su touch (aggiungere `focus-visible:opacity-100`) [Accessibilità]
app/components/work/ProjectGallery.tsx:118 - scrollbar nascosta + frecce solo in hover + contenitore non focusabile (`tabIndex` mancante): l'overflow orizzontale non si scopre e non si scorre da tastiera [Contenuti]
app/components/work/ProjectGallery.tsx:126 - miniature `<div onClick>`: niente tastiera, niente ruolo → `<button>` [Accessibilità]
app/components/work/ProjectGallery.tsx:139 - "Click to enlarge" #2B1D16 su `bg-black/50`: illeggibile, solo hover [Hover]
app/components/work/ProjectGallery.tsx:160 - lightbox senza `role="dialog"`/`aria-modal`/label, nessuna gestione del focus, nessun blocco dello scroll della pagina [Accessibilità]
app/components/work/ProjectGallery.tsx:167 - bottone chiudi solo icona senza `aria-label` [Accessibilità]
app/components/work/ProjectGallery.tsx:182 - prev/next `hidden md:flex`: su mobile si naviga solo con swipe (gesto senza alternativa tap) (anche :193) [Touch]
app/components/work/ProjectGallery.tsx:206 - `<img>` senza `width`/`height`; `alt="Enlarged view"` generico (il vero alt è nella didascalia) → `alt={images[i].alt}` [Immagini]
app/components/work/ProjectGallery.tsx:199 - contatore "n / N" senza `aria-live="polite"` [Accessibilità]
app/components/work/ProjectGallery.tsx:108 - `transition-all` (anche :149) [Animazione]
app/components/work/ProjectGallery.tsx:39 - `scrollBy` smooth senza reduced-motion (anche :45) [Animazione]

## app/components/work/ProjectIntroCard.tsx

app/components/work/ProjectIntroCard.tsx:28 - `transition-all` [Animazione]
app/components/work/ProjectIntroCard.tsx:51 - `prose prose-invert` senza plugin typography: classi inerti (se il plugin venisse aggiunto, `prose-invert` schiarirebbe il testo su sfondo chiaro) [Tema]

## app/components/work/ProjectListingCard.tsx

app/components/work/ProjectListingCard.tsx:29 - tutta la card ha hover (`-translate-y-2`, ombra) ma è cliccabile solo il piccolo link in fondo → rendere cliccabile tutta la card (stretched link) o togliere l'hover; c'è anche `transition-all` [Hover]
app/components/work/ProjectListingCard.tsx:53 - `overflow-y-auto` annidato in una card con `max-h-[600px]`: area di scroll interna non focusabile, contenuto tagliato [Contenuti]
app/components/work/ProjectListingCard.tsx:90 - "View Case Study" identico ×6: link ambigui per gli screen reader → `aria-label={\`View case study: ${title}\`}` o testo sr-only [Copy]

## app/pages/Home.tsx

app/pages/Home.tsx:154 - (known) freccia "scroll down" (`motion.a` → #impact) senza testo accessibile; inoltre lampeggia all'infinito (`repeat: Infinity`, :160) senza pausa né reduced-motion, e l'icona #F28C28 su bianco ≈2,2:1 [Animazione]
app/pages/Home.tsx:94 - tutte le animazioni framer-motion (hero :94–:167, about :393–:416) ignorano `prefers-reduced-motion`: non c'è `MotionConfig reducedMotion="user"` in tutto il progetto [Animazione]
app/pages/Home.tsx:142 - `transition-all` (anche :148, :534, :550, :558, :577) [Animazione]
app/pages/Home.tsx:183 - `"60 +"`, `"40 %"` (:192), `"1000 +"` (:201): spazio normale tra numero e segno → "60+" / "40%" o `&nbsp;` [Tipografia]
app/pages/Home.tsx:130 - apostrofi dritti ("I've"; pattern in tutto il sito, es. ProductWork.tsx:191, DowJones.tsx:185, :315) → ’ [Tipografia]
app/pages/Home.tsx:323 - `"XpuntoCero -> SGPV"` → "XpuntoCero → SGPV" [Tipografia]
app/pages/Home.tsx:184 - sottotitoli scritti in MAIUSCOLO nel sorgente (:193, :202): gli screen reader possono fare lo spelling; usare la classe `uppercase` [Copy]
app/pages/Home.tsx:28 - `ExpandableText` importato e mai usato [Contenuti]

## app/pages/ProductWork.tsx

app/pages/ProductWork.tsx:182 - h1 → card con `<h3>` (ProjectListingCard.tsx:36): salta h2 → aggiungere un h2 (anche sr-only) o rendere i titoli delle card h2 [Accessibilità]
app/pages/ProductWork.tsx:9 - categorie scritte a mano in MAIUSCOLO (:91, :115, :130) e incoerenti ("B2C Multi-platform" :37, "SAAS" :61) → testo normale + classe `uppercase` [Copy]

## app/pages/Teaching.tsx

app/pages/Teaching.tsx:131 - h1 (:107) → h3 "Teaching Experience" / "Teaching Approach" (:205): salta h2 [Accessibilità]
app/pages/Teaching.tsx:278 - `-mx-6 -mt-6` ma GlassCard ha `p-8`: l'immagine non arriva al bordo della card (stesso pattern di ProjectCard che usa `-mx-8 -mt-8`) [Contenuti]
app/pages/Teaching.tsx:13 - `ExpandableText` importato e mai usato [Contenuti]

## app/pages/CaseStudyTemplate.tsx (dead: nessuna route lo importa)

app/pages/CaseStudyTemplate.tsx:112 - link "back" solo icona sotto `md` (testo `hidden md:inline`): niente nome accessibile su mobile (stesso pattern nelle 6 pagine) [Accessibilità]
app/pages/CaseStudyTemplate.tsx:175 - emoji 👥💼⚙️❌✅ (:190, :205, :285, :295) senza `aria-hidden` [Accessibilità]
app/pages/CaseStudyTemplate.tsx:362 - "View All Projects" porta a Home (:359), non a ProductWork [Copy]
app/pages/CaseStudyTemplate.tsx:109 - `transition-all` (anche :360, :366) [Animazione]

## Pagine case study — pattern ripetuti (DowJones, VODplatform, SGPVEvolution, XpuntoCero, BackOffice, TuPlanRedondo)

app/pages/DowJones.tsx:118 - link "Back to Projects" solo icona sotto `md` (`hidden md:inline`) → nessun nome accessibile su mobile; stesso codice in VODplatform.tsx:303, SGPVEvolution.tsx:218, XpuntoCero.tsx:228, BackOffice.tsx:118, TuPlanRedondo.tsx:194 → `aria-label="Back to Projects"` o `sr-only` invece di `hidden` [Accessibilità]
app/pages/DowJones.tsx:112 - bottone back `fixed top-24 left-6 z-40` resta sopra il contenuto durante lo scroll e può coprire testo ed elementi a fuoco (su mobile si sovrappone ai paragrafi); idem VODplatform.tsx:297, SGPVEvolution.tsx:212, XpuntoCero.tsx:222, BackOffice.tsx:112, TuPlanRedondo.tsx:188 [Focus]
app/pages/DowJones.tsx:127 - breadcrumb `"Home &gt; Product Work &gt; …"` come testo semplice (né link né `<nav aria-label="Breadcrumb">`); idem VODplatform.tsx:312, SGPVEvolution.tsx:226, XpuntoCero.tsx:237, BackOffice.tsx:128, TuPlanRedondo.tsx:203 [Accessibilità]
app/pages/DowJones.tsx:290 - numeri di sezione decorativi "01…06" (`text-6xl … opacity-20`) letti prima di ogni h2 → `aria-hidden`; DowJones.tsx:290,354,507,526,634 · VODplatform.tsx:466,506,564,583,1078,1183 · SGPVEvolution.tsx:376,493,852,945,966,1095 · XpuntoCero.tsx:445,493,602,622,711 · BackOffice.tsx:306,374,441,460,513,619 · TuPlanRedondo.tsx:416,458,563,584,706 [Accessibilità]
app/pages/DowJones.tsx:115 - `transition-all` su back link e CTA: DowJones.tsx:115,761,767 · VODplatform.tsx:300,729,750,1306,1312 · SGPVEvolution.tsx:215,1187,1193 · XpuntoCero.tsx:225,852,858 · BackOffice.tsx:115,695,701 · TuPlanRedondo.tsx:191,795,801 [Animazione]
app/pages/DowJones.tsx:751 - "Want to see more work?" non in Title Case + "Let's Talk" con apostrofo dritto: DowJones.tsx:751/769 · VODplatform.tsx:1296/1314 · SGPVEvolution.tsx:1177/1195 · XpuntoCero.tsx:842/860 · BackOffice.tsx:686/703 · TuPlanRedondo.tsx:785/803 [Copy]
app/pages/VODplatform.tsx:1325 - lightbox duplicata in pagina (copia di quella di ProjectGallery) con gli stessi problemi: niente `role="dialog"`/gestione focus/blocco scroll (VODplatform.tsx:1325, SGPVEvolution.tsx:1205, XpuntoCero.tsx:871, TuPlanRedondo.tsx:814) [Accessibilità]
app/pages/VODplatform.tsx:1331 - bottone chiudi solo icona senza `aria-label`: VODplatform.tsx:1331, SGPVEvolution.tsx:1211, XpuntoCero.tsx:877, TuPlanRedondo.tsx:820 [Accessibilità]
app/pages/VODplatform.tsx:1341 - prev/next `hidden md:flex` → su mobile solo swipe: VODplatform.tsx:1341/1352, SGPVEvolution.tsx:1220/1231, XpuntoCero.tsx:886/897, TuPlanRedondo.tsx:829/840 [Touch]
app/pages/VODplatform.tsx:1373 - `<img>` senza dimensioni e con `alt="Enlarged view"` generico: VODplatform.tsx:1373, SGPVEvolution.tsx:1252, XpuntoCero.tsx:918, TuPlanRedondo.tsx:861 [Immagini]
app/pages/DowJones.tsx:217 - elenchi con "•" scritto a mano dentro `<li>` (letto dallo screen reader) in tutte le pagine; BackOffice.tsx:400–:406 usa addirittura `<p>• …</p>` al posto di `<ul>` e :663–:671 "→" come bullet [Accessibilità]

### Singoli file

app/pages/DowJones.tsx:738 - didascalia `<p>` dentro il contenitore `aspect-video overflow-hidden` con `<Image fill>` (:730): finisce sovrapposta/tagliata → `<figure>` + `<figcaption>` fuori dal box [Contenuti]
app/pages/VODplatform.tsx:728 - immagini di confronto `<div onClick>` senza tastiera né ruolo (anche :749) [Accessibilità]
app/pages/VODplatform.tsx:740 - "Click to enlarge" #2B1D16 su `bg-black/50` (anche :761) [Hover]
app/pages/VODplatform.tsx:744 - emoji 🟥/🟦, 1️⃣2️⃣3️⃣, ⬆️⬇️⬅️➡️ usate come legenda/contenuto nella tabella e nelle card (:765, :783, :786, :818, :829, :895, :915, :942–:1057): lettura verbosa e distinzione affidata al solo colore → testo esplicito ("Old"/"New") + `aria-hidden` sulle emoji [Accessibilità]
app/pages/BackOffice.tsx:681 - `<section>` CTA annidata dentro la `<section>` precedente (chiusa a :711) [Accessibilità]
Fuori regole: VODplatform.tsx:439, :447 nomi file con spazi ("Vod-1_New _LiveTV.webp", "Vod-3- Nwe_Catch-up.webp") → URL fragili.

---

## Riepilogo

### Conteggio per categoria
(una riga = un finding; i pattern raggruppati contano 1 anche se compaiono in più file)

| Categoria | Finding |
|---|---|
| Accessibilità | 32 |
| Animazione | 27 |
| Tipografia | 11 |
| Focus | 8 |
| Copy | 7 |
| Contenuti | 7 |
| Touch | 6 |
| Hover | 6 |
| Safe area/Layout | 5 |
| Immagini | 4 |
| Performance | 2 |
| Locale | 1 |
| Navigazione/Stato | 1 |
| Tema | 1 |
| Form / Hydration | 0 (nessun form; nessun mismatch di idratazione trovato) |
| **Totale** | **118** |

Di cui `(known)` confermati: 4 (toggle mobile senza aria-label, freccia hero senza testo, pallini carousel 12 px, aria-label del logo).

### Top 10 per impatto sugli utenti

1. **Immagini ingrandibili inaccessibili da tastiera e screen reader** — ImageTextCard.tsx:40, ProjectGallery.tsx:126, VODplatform.tsx:728/749. Fix: sostituire i `<div onClick>` con `<button type="button" aria-label={\`Enlarge: ${alt}\`}>` e mostrare l'overlay anche su `:focus-visible`.
2. **Lightbox/modali non accessibili** (5 copie: ProjectGallery.tsx:160, VOD:1325, SGPV:1205, XpuntoCero:871, TuPlanRedondo:814, più TestimonialModal.tsx:60): niente `role="dialog"`, focus non spostato/intrappolato/restituito, chiudi senza `aria-label`, alt "Enlarged view". Fix: un solo componente `<Lightbox>` riusato ovunque, basato su `<dialog>` nativo (`showModal()`) o Radix Dialog, con `aria-label="Close"`, `alt` reale e `overscroll-behavior: contain`.
3. **Nessun rispetto di `prefers-reduced-motion` per framer-motion** (tutto il sito) + loop infinito della freccia hero (Home.tsx:154), float del 404 (globals.css:274), smooth scroll globale (SiteShell.tsx:63), count-up (BeforeAfterImpactCard.tsx:37). Fix: avvolgere `{children}` in `<MotionConfig reducedMotion="user">` in SiteShell, aggiungere `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } .animate-float, .animate-fade-in { animation: none } }` e saltare il count-up con reduced-motion.
4. **Navigazione principale incompleta da tastiera/screen reader** — toggle mobile senza nome (SiteShell.tsx:178, known), dropdown solo mouse (:112), `role="menu"` improprio (:135/:199), focus non gestito nel menu mobile. Fix: `aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}`; dropdown aperto anche da `:focus-within` o da un bottone chevron con `aria-expanded`; togliere `role="menu"/"menuitem"`; spostare il focus sul primo link all'apertura e riportarlo sul toggle alla chiusura.
5. **Link "Back to Projects" senza nome su mobile** (6 pagine, es. DowJones.tsx:118) e bottone fixed che copre il contenuto. Fix: `className="sr-only md:not-sr-only"` al posto di `hidden md:inline` (o `aria-label`); valutare `absolute` al posto di `fixed`, o nasconderlo durante lo scroll.
6. **Gallery su mobile solo a swipe e frecce invisibili** — prev/next `hidden md:flex` (ProjectGallery.tsx:182 e 4 copie), frecce di scroll `opacity-0` senza label (ProjectGallery.tsx:106/147), scrollbar nascosta (:118). Fix: mostrare prev/next anche su mobile (bottoni da 44 px), `aria-label="Previous images"/"Next images"`, `focus-visible:opacity-100`, `tabIndex={0}` + `aria-label` sul contenitore scrollabile.
7. **"Click to enlarge" illeggibile dopo il recolor** — testo #2B1D16 su overlay nero 50% (ImageTextCard.tsx:55, ProjectGallery.tsx:139, VODplatform.tsx:740/761). Fix: `text-white` (o `text-[var(--color-text-on-dark)]`), testo "Enlarge" o "View larger" (anche per touch) e overlay visibile anche su `group-focus-visible`.
8. **Gerarchia titoli rotta e rumore per screen reader** — h1→h3 in ProductWork.tsx:182 e Teaching.tsx:131; numeri "01–06" decorativi letti (≈34 occorrenze); breadcrumb non semantico (6 pagine); emoji di legenda in VOD. Fix: h2 intermedi (anche `sr-only`), `aria-hidden="true"` sui numeri e sulle emoji, breadcrumb come `<nav aria-label="Breadcrumb"><ol>` con link veri.
9. **Carousel testimonianze** — pallini 12 px a basso contrasto (known, TestimonialCarousel.tsx:183), cambio slide non annunciato (:203), layout shift 1→3 card (:32), "Read more" generico (:129). Fix: target da almeno 24×24 px (pallino visivo dentro un bottone `p-2`), inattivo almeno #8C7B6E, `aria-current="true"`, `aria-live="polite"` sul contatore, `grid-cols` CSS + slicing via `matchMedia` iniziale, `aria-label` con il nome dell'autore.
10. **Affordance di click false e ScrollToTop invisibile ma raggiungibile col Tab** — `GlassCard` con `cursor-pointer` di default su card statiche (GlassCard.tsx:34), ProjectListingCard con hover su tutta la card ma un solo link (:29), ScrollToTop nel tab order da nascosto (ScrollToTop.tsx:35), overlay del banner cookie sopra ScrollToTop. Fix: `hover = false` di default in GlassCard; stretched link (`after:absolute after:inset-0` sul `<Link>`) in ProjectListingCard; smontare ScrollToTop quando `!isVisible` (o `tabIndex={-1}` + `aria-hidden`); `scroll-padding-top` su `html` e spostare ScrollToTop sopra il banner quando il banner è visibile.

