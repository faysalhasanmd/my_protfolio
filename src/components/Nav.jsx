"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./theme-toggle";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#path", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1S3ukmEylkATc1IgmKUSvk0B5zYaFYKzk/view?usp=sharing";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference"
      >
        <a
          href="#top"
          className="font-display font-semibold text-[color:var(--nav-light)] text-sm tracking-tight focus-ring"
        >
          faysal<span className="text-steel">.</span>dev
        </a>

        {/* Desktop nav — pill-style active/hover highlight */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-[color:var(--nav-light)]/15 bg-[color:var(--nav-light)]/5 p-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => handleLinkClick(l.href)}
              className="eyebrow relative rounded-full px-4 py-2 text-[color:var(--nav-light)]/80 transition-colors hover:text-[color:var(--nav-light)] focus-ring"
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-[color:var(--nav-light)]/15"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle — ekhon mobile-eo dekha jay, hamburger-er thik left side-e */}
          <ThemeToggle />

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow hidden sm:inline-block text-[color:var(--nav-light)] border border-[color:var(--nav-light)]/40 rounded-full px-4 py-2 hover:bg-[color:var(--nav-light)] hover:text-[color:var(--nav-dark)] transition-colors focus-ring"
          >
            Résumé
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-[color:var(--nav-light)]/40 focus-ring"
          >
            <span className="block h-[1.5px] w-4 bg-[color:var(--nav-light)] transition-transform" />
            <span className="block h-[1.5px] w-4 bg-[color:var(--nav-light)] transition-opacity" />
            <span className="block h-[1.5px] w-4 bg-[color:var(--nav-light)] transition-transform" />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-[color:var(--nav-dark)]/60 backdrop-blur-sm md:hidden"
            />

            {/* Panel — fixed dark navy chip, theme-r sathe change hoy na intentionally */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-[70] flex h-full w-[78%] max-w-xs flex-col justify-between bg-[color:var(--nav-dark)] px-8 py-8 md:hidden"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-[color:var(--nav-light)] text-sm">
                    FH<span className="text-steel">.</span>dev
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--nav-light)]/40 text-[color:var(--nav-light)] focus-ring"
                  >
                    <span className="relative block h-4 w-4">
                      <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 rotate-45 bg-[color:var(--nav-light)]" />
                      <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 -rotate-45 bg-[color:var(--nav-light)]" />
                    </span>
                  </button>
                </div>

                <nav className="mt-12 flex flex-col gap-6">
                  {links.map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={() => handleLinkClick(l.href)}
                      initial={{ x: 24, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                      className={`eyebrow text-2xl font-display normal-case tracking-normal transition-colors focus-ring ${
                        active === l.href
                          ? "text-[color:var(--nav-light)]"
                          : "text-[color:var(--nav-light)]/60 hover:text-[color:var(--nav-light)]"
                      }`}
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </nav>
              </div>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow text-center text-[color:var(--nav-light)] border border-[color:var(--nav-light)]/40 rounded-full px-4 py-3 hover:bg-[color:var(--nav-light)] hover:text-[color:var(--nav-dark)] transition-colors focus-ring"
              >
                Résumé
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
