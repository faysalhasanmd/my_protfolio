"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#top", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#path", label: "Path" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Track which section is active while scrolling
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
          className="font-display font-semibold text-paper text-sm tracking-tight focus-ring"
        >
          FH<span className="text-steel">.</span>dev
        </a>

        {/* Desktop nav — pill-style active/hover highlight */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-paper/15 bg-paper/5 p-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => handleLinkClick(l.href)}
              className="eyebrow relative rounded-full px-4 py-2 text-paper/80 transition-colors hover:text-paper focus-ring"
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-paper/15"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/Md_Faysal_Hasan_CV.pdf"
            download
            className="eyebrow hidden sm:inline-block text-paper border border-paper/40 rounded-full px-4 py-2 hover:bg-paper hover:text-ink transition-colors focus-ring"
          >
            Résumé
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-paper/40 focus-ring"
          >
            <span className="block h-[1.5px] w-4 bg-paper transition-transform" />
            <span className="block h-[1.5px] w-4 bg-paper transition-opacity" />
            <span className="block h-[1.5px] w-4 bg-paper transition-transform" />
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
              className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-[70] flex h-full w-[78%] max-w-xs flex-col justify-between bg-ink px-8 py-8 md:hidden"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-paper text-sm">
                    FH<span className="text-steel">.</span>dev
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 text-paper focus-ring"
                  >
                    <span className="relative block h-4 w-4">
                      <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 rotate-45 bg-paper" />
                      <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 -rotate-45 bg-paper" />
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
                          ? "text-paper"
                          : "text-paper/60 hover:text-paper"
                      }`}
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </nav>
              </div>

              <a
                href="/Md_Faysal_Hasan_CV.pdf"
                download
                className="eyebrow text-center text-paper border border-paper/40 rounded-full px-4 py-3 hover:bg-paper hover:text-ink transition-colors focus-ring"
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
