"use client";
import { useEffect } from "react";

/**
 * Traccia in Google Analytics ogni clic su qualcosa di cliccabile (link, bottoni, immagini
 * ingrandibili, card), con un unico listener sul documento: nessun componente va toccato.
 *
 * Eventi (nome → quando):
 *   click_email      link mailto:
 *   click_linkedin   link a linkedin.com
 *   click_external   altri link verso siti esterni
 *   open_case_study  link a una case study (project = nome della pagina, es. "dowjones")
 *   click_nav        link o bottone nella barra di navigazione
 *   click_link       altri link interni
 *   open_image       clic su un'immagine ingrandibile
 *   cookie_choice    Accept / Decline del banner cookie (choice)
 *   click_button     tutti gli altri bottoni ed elementi cliccabili
 *
 * Parametri di ogni evento:
 *   label    testo o aria-label di cio' che e' stato cliccato (max 100 caratteri)
 *   area     zona della pagina: nav, footer, lightbox, cookie, o il titolo della sezione
 *   link_url destinazione, solo per i link
 * La pagina (page_location / page_title) la aggiunge GA da solo.
 */

const CASE_STUDIES = [
  "dowjones",
  "falak",
  "ai-product",
  "design-system",
  "vodplatform",
  "sgpvevolution",
  "xpuntocero",
  "back-office",
  "tu-plan-redondo",
  "ecommerce-management",
];

const CLICKABLE =
  'a[href], button, [role="button"], summary, input[type="submit"], input[type="button"], .cursor-pointer';

type Gtag = (command: "event", name: string, params: Record<string, string>) => void;

const clean = (s: string | null | undefined, max = 100) =>
  (s || "").replace(/\s+/g, " ").trim().slice(0, max);

function labelOf(el: Element, image = false): string {
  const img = el.querySelector("img");
  if (image && img?.getAttribute("alt")) return clean(img.getAttribute("alt"));
  // bottoni con sola icona (lucide): il nome dell'icona, es. "x", "chevron-right"
  const icon = [...(el.querySelector("svg.lucide")?.classList || [])].find((c) => c.startsWith("lucide-"));
  return (
    clean(el.getAttribute("aria-label")) ||
    clean((el as HTMLElement).innerText) ||
    clean(el.getAttribute("title")) ||
    clean(img?.getAttribute("alt")) ||
    (icon ? icon.slice(7) : "") ||
    el.tagName.toLowerCase()
  );
}

function areaOf(el: Element): string {
  const tagged = el.closest("[data-track-area]");
  if (tagged) return clean(tagged.getAttribute("data-track-area"), 40);
  if (el.closest("nav")) return "nav";
  if (el.closest("footer")) return "footer";
  if (el.closest('[role="dialog"], .fixed.inset-0')) return "lightbox";
  const section = el.closest("section");
  if (section) {
    const heading = section.querySelector("h1, h2, h3");
    return clean(heading?.textContent, 40) || clean(section.id, 40) || "section";
  }
  return "page";
}

function classify(el: Element, area: string): { name: string; extra: Record<string, string> } {
  if (area === "cookie") return { name: "cookie_choice", extra: { choice: labelOf(el).toLowerCase() } };
  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute("href") || "";
    const url = new URL(el.href, location.href);
    const link_url = href.startsWith("mailto:") ? "mailto" : url.href.slice(0, 100);
    if (href.startsWith("mailto:")) return { name: "click_email", extra: { link_url } };
    if (/(^|\.)linkedin\.com$/.test(url.hostname)) return { name: "click_linkedin", extra: { link_url } };
    if (url.origin !== location.origin) return { name: "click_external", extra: { link_url } };
    const project = url.pathname.split("/").filter(Boolean)[0]?.toLowerCase() || "";
    if (CASE_STUDIES.includes(project)) return { name: "open_case_study", extra: { project, link_url: url.pathname } };
    if (area === "nav") return { name: "click_nav", extra: { link_url: url.pathname } };
    return { name: "click_link", extra: { link_url: url.pathname + url.hash } };
  }
  if (area === "nav") return { name: "click_nav", extra: {} };
  if (el.classList.contains("cursor-pointer") && el.querySelector("img")) return { name: "open_image", extra: {} };
  return { name: "click_button", extra: {} };
}

export default function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (!gtag || !(e.target instanceof Element)) return;
      const el = e.target.closest(CLICKABLE);
      if (!el || el.closest(".side-band")) return;
      const area = areaOf(el);
      const { name, extra } = classify(el, area);
      gtag("event", name, { label: labelOf(el, name === "open_image"), area, ...extra });
    };
    // fase di cattura: registra il clic anche se un componente ne ferma la propagazione
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
