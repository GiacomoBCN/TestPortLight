"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // ← Add this line
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { Menu, X, Mail, ChevronDown, Check } from "lucide-react";
import { MotionConfig } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import SideBands from "./components/SideBands";
import SketchFrame from "./components/SketchFrame";
import CopyEmailLink, { CONTACT_EMAIL } from "./components/CopyEmailLink";
import { shell } from "@/content/shell";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const wasMobileMenuOpen = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chiudi overlay/dropdown ad ogni cambio rotta
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductDropdownOpen(false);
  }, [pathname]);

  // PWA solo per chi la vuole: blocca l'annuncio automatico di Chrome
  // ("Installa app" / mini-barra su Android). Resta installabile dal menu del browser.
  useEffect(() => {
    const blockInstallPrompt = (e: Event) => e.preventDefault();
    window.addEventListener("beforeinstallprompt", blockInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", blockInstallPrompt);
  }, []);

  // Esc chiude il mobile menu e il dropdown
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      setIsProductDropdownOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  // Menu mobile: focus sul primo link all'apertura, di nuovo sul bottone alla chiusura
  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuRef.current?.querySelector<HTMLElement>("a")?.focus();
    } else if (wasMobileMenuOpen.current) {
      menuToggleRef.current?.focus();
    }
    wasMobileMenuOpen.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  // Lock scroll quando il mobile menu è aperto
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const projectLinks = shell.nav.projects;

  const isHome = pathname === "/";
  // Voce di menu attiva (trailingSlash: true, quindi "/teaching/")
  const path = (pathname || "/").replace(/\/$/, "") || "/";
  const projectPaths = projectLinks.map((p) => createPageUrl(p.path));
  const isTeachingActive = path === createPageUrl("Teaching");
  const isProductWorkActive =
    path === createPageUrl("ProductWork") || projectPaths.includes(path);
  const footerIconCircle =
    "w-10 h-10 glass rounded-full flex items-center justify-center glow-blue group-hover/icon:bg-blue-600! group-hover/icon:text-white";
  const activeNav =
    "underline decoration-2 underline-offset-8 decoration-[var(--nav-link-active-underline)] text-ink-900";

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-ink-900">
      <SideBands inner={!isHome} />
      <style>{`
        :root { --bg-base:#FFFFFF; --bg-dark:#ffffff; }
        * { scroll-behavior: smooth; }
        body {
          background: #FFFFFF;
        }
        .glow-blue { box-shadow: 0 0 20px rgba(242,140,40,0.3); }
        .mobile-menu-overlay { background: rgba(255,255,255,0.96); backdrop-filter: blur(20px) saturate(180%); }
        .skip-link { position:absolute; top:-40px; left:0; background:#111418; color:#fff; padding:8px 16px; z-index:100; }
        .skip-link:focus { top:0; }
      `}</style>

      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        {shell.skipLink}
      </a>

      {/* Nav */}
      <nav
        className={`sketch fixed top-0 inset-x-0 z-[60] transition-all ${
          isScrolled ? "glass py-4" : "bg-transparent py-6"
        }`}
        aria-label={shell.nav.ariaLabel}
        style={{ left: "var(--band)", right: "var(--band)" }}
      >
        <SketchFrame />
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            href={createPageUrl("Home")}
            className="flex items-center gap-3 min-w-11 min-h-11 -my-0.5 -mr-1"
          >
            <div className="w-10 h-10 glass rounded-full flex items-center justify-center glow-blue">
              <span
                className="text-accent type-signature text-lg"
                aria-hidden="true"
              >
                {shell.nav.logoMark}
              </span>
            </div>
            <span className="type-signature text-xl sr-only md:not-sr-only">
              {shell.nav.siteName}
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {/* La zona hover copre tutta l'altezza del nav (margini negativi =
                padding del nav), cosi' top-full del pannello = bordo inferiore del nav. */}
            <div
              className={`relative self-stretch flex items-center ${
                isScrolled ? "-my-4 py-4" : "-my-6 py-6"
              }`}
              onMouseEnter={() => setIsProductDropdownOpen(true)}
              onMouseLeave={() => setIsProductDropdownOpen(false)}
              onFocus={() => setIsProductDropdownOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setIsProductDropdownOpen(false);
                }
              }}
            >
              <Link
                href={createPageUrl("ProductWork")}
                className={`flex items-center text-slate-300 hover:text-ink-900 ${isProductWorkActive ? activeNav : ""}`}
                aria-current={isProductWorkActive ? "page" : undefined}
                aria-haspopup="true"
                aria-expanded={isProductDropdownOpen}
                aria-controls="product-work-submenu"
              >
                {shell.nav.productWork}{" "}
                <ChevronDown className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
              {/* Il pannello parte sotto tutta la cornice del nav (banda azzurra,
                  tratto a matita e angoli = --sf-ext) piu' 10px d'aria: non tocca
                  la linea blu. Il padding-top trasparente fa da ponte per l'hover. */}
              <div
                className={`absolute top-full left-0 z-20 pt-[calc(var(--sf-ext)+10px)] transition-all ${
                  isProductDropdownOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
              <div
                className="w-64 rounded-xl p-4"
                style={{
                  background: "rgba(255, 255, 255, 0.97)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(7, 9, 11, 0.15)",
                  boxShadow: "0 12px 32px rgba(7, 9, 11, 0.08)",
                }}
                id="product-work-submenu"
              >
                <Link
                  href={createPageUrl("ProductWork")}
                  className="block px-4 py-2 text-ink-900 font-semibold hover:bg-[var(--nav-dropdown-hover)] hover:text-ink-900 rounded-lg transition-colors"
                >
                  {shell.nav.allProjects}
                </Link>
                <div className="h-px bg-ink-900/20 my-2" />
                {projectLinks.map((p) => (
                  <Link
                    key={p.path}
                    href={createPageUrl(p.path)}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-[var(--nav-dropdown-hover)] hover:text-ink-900 rounded-lg transition-colors"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
              </div>
            </div>

            <Link
              href={createPageUrl("Teaching")}
              className={`text-slate-300 hover:text-ink-900 ${isTeachingActive ? activeNav : ""}`}
              aria-current={isTeachingActive ? "page" : undefined}
            >
              {shell.nav.teaching}
            </Link>
            <Link href="/#about" className="text-slate-300 hover:text-ink-900">
              {shell.nav.about}
            </Link>
            <CopyEmailLink
              className="px-6 py-2 glass rounded-lg hover:bg-blue-600! hover:text-white"
              ariaLabel={shell.nav.contactAriaLabel}
            >
              {shell.nav.contact}
            </CopyEmailLink>
          </div>

          {/* Mobile toggle */}
          <button
            ref={menuToggleRef}
            type="button"
            className="md:hidden glass w-11 h-11 -m-px flex items-center justify-center rounded-lg"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? shell.nav.closeMenu : shell.nav.openMenu}
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile overlay + menu */}
        {isMobileMenuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 top-[72px] mobile-menu-overlay"
              aria-hidden="true"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div
              id="mobile-menu"
              ref={mobileMenuRef}
              className="md:hidden fixed top-[72px] left-0 right-0 max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain mobile-menu-overlay border-t border-ink-900/10"
              // Un link verso un'ancora della stessa pagina (es. /#about) non cambia rotta:
              // il menu si chiude al click su qualsiasi link, non solo al cambio di pathname.
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setIsMobileMenuOpen(false);
              }}
            >
              <div className="flex flex-col p-6 gap-4 max-w-7xl mx-auto">
                <Link
                  href={createPageUrl("ProductWork")}
                  className={`text-slate-300 hover:text-ink-900 py-3 px-4 rounded-lg hover:bg-ink-900/5 font-semibold text-lg ${isProductWorkActive ? activeNav : ""}`}
                  aria-current={isProductWorkActive ? "page" : undefined}
                >
                  {shell.nav.productWork}
                </Link>
                <div className="pl-4 space-y-2 border-l-2 border-ink-900/10">
                  {projectLinks.map((p) => (
                    <Link
                      key={p.path}
                      href={createPageUrl(p.path)}
                      className="block text-sm text-gray-300 hover:text-accent py-2 px-4 rounded hover:bg-ink-900/5"
                        >
                      {p.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href={createPageUrl("Teaching")}
                  className={`text-slate-300 hover:text-ink-900 py-3 px-4 rounded-lg hover:bg-ink-900/5 text-lg ${isTeachingActive ? activeNav : ""}`}
                  aria-current={isTeachingActive ? "page" : undefined}
                >
                  {shell.nav.teaching}
                </Link>
                <Link
                  href="/#about"
                  className="text-slate-300 hover:text-ink-900 py-3 px-4 rounded-lg hover:bg-ink-900/5 text-lg"
                >
                  {shell.nav.about}
                </Link>

                <CopyEmailLink
                  className="px-6 py-3 glass rounded-lg hover:bg-blue-600! hover:text-white text-center font-semibold mt-2"
                  ariaLabel={shell.nav.contactAriaLabel}
                >
                  {shell.nav.contact}
                </CopyEmailLink>
              </div>
            </div>
          </>
        )}
      </nav>

      <div style={{ paddingLeft: "var(--band)", paddingRight: "var(--band)" }}>
      <main id="main-content" className="pt-20">
        {children}
      </main>

      <footer
        className="glass sketch mt-32 py-12 border-t border-ink-900/10"
        role="contentinfo"
      >
        <SketchFrame />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-300 text-sm">{shell.footer.copyright}</p>
              <p className="text-slate-500 text-xs mt-1">
                {shell.footer.tagline}
              </p>
              <p className="text-slate-500 text-xs mt-1">
                {shell.footer.location}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Indirizzo in chiaro: si puo' selezionare e copiare anche dove mailto non apre nulla */}
              <CopyEmailLink className="inline-block py-3 -my-3 text-sm text-slate-300 hover:text-ink-900 link-underline break-all">
                {CONTACT_EMAIL}
              </CopyEmailLink>
              {/* Icone: area di tocco 44x44 (invisibile), il cerchio che si vede resta 40x40 */}
              <CopyEmailLink
                className="group/icon w-11 h-11 -m-0.5 flex items-center justify-center rounded-full"
                ariaLabel={shell.footer.emailAriaLabel}
                copiedLabel={<span className={footerIconCircle}><Check size={20} aria-hidden="true" /></span>}
              >
                <span className={footerIconCircle}><Mail size={20} aria-hidden="true" /></span>
              </CopyEmailLink>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/giacomobianchi00/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/icon w-11 h-11 -m-0.5 flex items-center justify-center rounded-full"
                aria-label={shell.footer.linkedinAriaLabel}
              >
                <span className={footerIconCircle}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                </span>
              </a>

              {/* GitHub */}
              {/*
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white glow-blue" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>*/}
            </div>
          </div>
        </div>
      </footer>
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
    </MotionConfig>
  );
}
