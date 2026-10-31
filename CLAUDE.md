# Portfolio Giacomo Bianchi (giacomobianchi.tech)

Next.js con export statico, pubblicato su GitHub Pages dal workflow `.github/workflows/nextjs.yml` a ogni push su `main`.

## Regole
- Rispondere in italiano, in modo semplice e breve: Giacomo non è uno sviluppatore.
- Lavorare solo sul branch `redesign`. MAI push su `main` (pubblica il sito): il passaggio a main si fa tutto in blocco, solo quando lo chiede Giacomo.
- Non toccare la logica di Google Analytics e del consenso cookie (`app/components/GoogleAnalytics.tsx`, `app/components/CookieConsent.tsx`).
- Tenere: workflow di deploy, file `CNAME`, componente GA, secret `NEXT_PUBLIC_GA_MEASUREMENT_ID`, gli stessi indirizzi delle pagine (/dowjones, /product-work, /teaching, ...).
- Codice in inglese, commenti in italiano.

## Stato del redesign
- Obiettivo: rifare da zero l'identità visiva. Direzione chiara (sfondi chiari), niente look "dark SaaS" da template. Prodotto e insegnamento/PhD sono due percorsi alla pari.
- Skill nel repo: impeccable, web-design-guidelines, playwright-cli (`.claude/skills/`).
- Correzione 404 sui link con barra finale già fatta nel workflow (tolto `static_site_generator: next`): da verificare al primo deploy.
- Prossimo passo: brainstorming di Giacomo e riferimenti scelti dal suo mood board, poi `/impeccable init` (PRODUCT.md) e nuova direzione visiva.

## Problemi noti del sito attuale (dalla critica Impeccable)
Tutto con lo stesso peso (troppi tag e numeri), numeri ed etichette incoerenti tra pagine, nessun CV, stesso `<title>` su tutte le pagine, menu mobile e gallerie poco accessibili, nessun prefers-reduced-motion, immagini troppo pesanti, tailwind.config.ts ignorato da Tailwind v4. Da tenere: le tabelle "Key Decisions & Trade-offs" nei casi studio.
