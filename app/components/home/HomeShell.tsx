"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { createPageUrl } from "@/utils";
import PerspectiveWalls from "./PerspectiveWalls";

const projectLinks = [
  { name: "Dow Jones Design System", path: "DowJones" },
  { name: "VOD Platform", path: "VODplatform" },
  { name: "SGPV Evolution", path: "SGPVEvolution" },
  { name: "XpuntoCero Transformation", path: "XpuntoCero" },
  { name: "Back Office Unification", path: "BackOffice" },
  { name: "TuPlanRedondo PWA", path: "TuPlanRedondo" },
];

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 left-5 z-40 hidden h-11 w-11 md:flex items-center justify-center rounded-[var(--m-radius)] border border-[var(--m-ink)] bg-[var(--m-paper)] text-[var(--m-ink)] transition-opacity duration-200 hover:bg-[var(--m-ink)] hover:text-[var(--m-paper)] ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ChevronUp size={20} aria-hidden="true" />
    </button>
  );
}

export default function HomeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div data-theme="manifesto" className="relative min-h-screen">
      <PerspectiveWalls />

      <a href="#main-content" className="m-skip">
        Skip to main content
      </a>

      <div className="relative z-10 mx-auto w-full max-w-[1120px] bg-[var(--m-paper)] xl:border-x xl:border-[var(--m-rule)]">
        <header className="sticky top-0 z-40 bg-[var(--m-paper)] m-rule-b">
          <nav
            aria-label="Main navigation"
            className="flex h-16 items-center justify-between px-5 md:px-8"
          >
            <Link href={createPageUrl("Home")} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="m-title flex h-9 w-9 items-center justify-center rounded-[var(--m-radius)] bg-[var(--m-ink)] text-sm text-[var(--m-paper)]"
              >
                GB
              </span>
              <span className="sr-only text-base font-bold tracking-[-0.01em] md:not-sr-only">
                Giacomo Bianchi
              </span>
            </Link>

            {/* Desktop */}
            <div className="hidden items-center gap-8 md:flex">
              <div className="group relative">
                <Link
                  href={createPageUrl("ProductWork")}
                  className="m-nav-link flex items-center gap-1"
                >
                  Product Work
                  <ChevronDown size={16} aria-hidden="true" />
                </Link>
                <ul
                  aria-label="Product work submenu"
                  className="invisible absolute left-0 top-full z-50 mt-2 w-72 rounded-[var(--m-radius)] border border-[var(--m-rule-strong)] bg-[var(--m-paper)] py-2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
                >
                  <li>
                    <Link
                      href={createPageUrl("ProductWork")}
                      className="mx-2 block rounded-[6px] px-3 py-2 font-bold hover:bg-[var(--m-paper-2)]"
                    >
                      All Projects
                    </Link>
                  </li>
                  <li aria-hidden="true" className="mx-4 my-1 m-rule-t" />
                  {projectLinks.map((p) => (
                    <li key={p.path}>
                      <Link
                        href={createPageUrl(p.path)}
                        className="mx-2 block rounded-[6px] px-3 py-2 text-sm hover:bg-[var(--m-paper-2)]"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={createPageUrl("Teaching")} className="m-nav-link">
                Teaching
              </Link>
              <Link href="/#about" className="m-nav-link">
                About
              </Link>
              <a
                href="mailto:consulting@giacomobianchi.tech"
                className="m-btn m-btn-solid !min-h-10 !px-4 text-sm"
                aria-label="Contact via email"
              >
                Contact
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-[var(--m-radius)] border border-[var(--m-ink)] md:hidden"
              onClick={() => setMenuOpen((s) => !s)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <Menu size={22} aria-hidden="true" />
              )}
            </button>
          </nav>

          {menuOpen && (
            <div
              id="mobile-menu"
              className="m-rule-t max-h-[calc(100vh-4rem)] overflow-y-auto bg-[var(--m-paper)] px-5 py-4 md:hidden"
            >
              <ul className="flex flex-col">
                <li>
                  <Link
                    href={createPageUrl("ProductWork")}
                    className="block py-3 text-lg"
                  >
                    Product Work
                  </Link>
                  <ul className="mb-2 ml-3 m-rule-l pl-4">
                    {projectLinks.map((p) => (
                      <li key={p.path}>
                        <Link href={createPageUrl(p.path)} className="block py-2 text-sm">
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="m-rule-t">
                  <Link href={createPageUrl("Teaching")} className="block py-3 text-lg">
                    Teaching
                  </Link>
                </li>
                <li className="m-rule-t">
                  <Link href="/#about" className="block py-3 text-lg">
                    About
                  </Link>
                </li>
                <li className="pt-3">
                  <a
                    href="mailto:consulting@giacomobianchi.tech"
                    className="m-btn m-btn-solid w-full"
                    aria-label="Contact via email"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          )}
        </header>

        <main id="main-content">{children}</main>

        <footer role="contentinfo" className="m-rule-t px-5 py-10 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold">© 2026 Giacomo Bianchi.</p>
              <p className="mt-1 text-sm text-[var(--m-ink-2)]">
                Italian by birth. Product leader by craft. Global by vocation.
              </p>
              <p className="mt-1 text-sm text-[var(--m-ink-2)]">
                Barcelona • Open to MENA, Europe &amp; Remote
              </p>
            </div>
            <ul className="flex items-center gap-6">
              <li>
                <a
                  href="mailto:consulting@giacomobianchi.tech"
                  className="m-link inline-flex items-center gap-2 text-sm font-bold"
                >
                  <Mail size={18} aria-hidden="true" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/giacomobianchi00/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-link inline-flex items-center gap-2 text-sm font-bold"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>

      <ScrollTop />
    </div>
  );
}
