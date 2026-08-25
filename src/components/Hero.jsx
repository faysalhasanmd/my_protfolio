"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { profile } from "@/lib/data";

const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

const StackScene = dynamic(() => import("./StackScene"), { ssr: false });

// Hardcoded hex-er bodole CSS variable — globals.css-er .dark class
// toggle hole eigula automatic update hoye jabe, kono re-render lagbe na
const PALETTE = {
  bg: "var(--hero-bg)",
  text: "var(--hero-text)",
  accent: "var(--hero-accent)",
  mist: "var(--hero-mist)",
  line: "var(--hero-line)",
};

// var() color-er upor alpha/transparency lagate hex suffix (jemon `${color}33`)
// kaj kore na — color-mix() diye kortey hoy
const withAlpha = (cssVar, percent) =>
  `color-mix(in srgb, ${cssVar} ${percent}%, transparent)`;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { y: 28, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden flex items-center transition-colors duration-300"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      {/* 3D Interactivity Layer */}
      <div className="absolute inset-0 z-0">
        <NetworkScene className="w-full h-full opacity-40" />
      </div>

      {/* Gentle Fade Shadow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b via-transparent"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${withAlpha(
            PALETTE.bg,
            7,
          )}, transparent 65%, ${PALETTE.bg})`,
        }}
      />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 z-10 py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <motion.p
              variants={item}
              className="eyebrow mb-6 font-mono text-xs tracking-[0.2em] uppercase font-bold"
              style={{ color: PALETTE.accent }}
            >
              Mirpur, Dhaka, Bangladesh
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display font-semibold leading-[0.95] text-[12vw] md:text-[5.5vw] tracking-tight"
            >
              {profile.name.split(" ")[0]}
              <br />
              <span style={{ color: PALETTE.accent }}>
                {profile.name.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span
                className="font-mono text-sm md:text-base font-semibold"
                style={{ color: PALETTE.text }}
              >
                {profile.role}
              </span>
              <span
                className="h-1 w-1 rounded-full hidden md:block"
                style={{ backgroundColor: PALETTE.line }}
              />
              <span className="font-mono text-sm md:text-base opacity-70">
                React · Next.js · Node.js · MongoDB · PostgreSQL · Prisma
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl leading-relaxed opacity-80 text-sm md:text-base"
            >
              {profile.objective}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap gap-4 text-sm font-mono uppercase tracking-wider"
            >
              <a
                href="#work"
                className="rounded-full px-6 py-3.5 font-semibold text-white transition-all duration-300 active:scale-[0.98] shadow-sm
             bg-neutral-900 hover:bg-indigo-600
             dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-indigo-400"
              >
                See the work
              </a>
              <a
                href="#contact"
                className="rounded-full border px-6 py-3.5 font-semibold transition-all duration-300 bg-white/30 active:scale-[0.98]"
                style={{
                  borderColor: withAlpha(PALETTE.text, 20),
                  color: PALETTE.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = PALETTE.text;
                  e.currentTarget.style.backgroundColor = withAlpha(
                    PALETTE.mist,
                    20,
                  );
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = withAlpha(
                    PALETTE.text,
                    20,
                  );
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Get in touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="lg:col-span-5 hidden lg:flex justify-center items-center relative"
          >
            <div
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                width: "340px",
                height: "340px",
                background: `radial-gradient(circle, ${withAlpha(
                  PALETTE.mist,
                  33,
                )}, transparent 70%)`,
              }}
            />
            <div className="relative w-[420px] h-[420px] md:w-[460px] md:h-[460px]">
              <StackScene />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
