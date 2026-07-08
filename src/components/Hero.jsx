"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { profile } from "@/lib/data";

// কাস্টম থ্রি ডট জেএস নেটওয়ার্ক সিনটি SSR ফলস রেখে ডাইনামিকালি লোড করা হলো
const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

const PALETTE = {
  bg: "#FBF7F4",
  text: "#2E3E4E",
  accent: "#7C9EC4",
  mist: "#AFD3DE",
  line: "#CDBEA7",
};

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
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      {/* 3D Interactivity Layer */}
      <div className="absolute inset-0 z-0">
        <NetworkScene className="w-full h-full opacity-60" />
      </div>

      {/* Gentle Fade Shadow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b via-transparent"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${PALETTE.bg}11, transparent 65%, ${PALETTE.bg})`,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-10 max-w-6xl mx-auto"
      >
        <motion.p
          variants={item}
          className="eyebrow mb-6 font-mono text-xs tracking-[0.2em] uppercase"
          style={{ color: PALETTE.accent }}
        >
          Node 04 · Tangail, Bangladesh
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display font-semibold leading-[0.95] text-[13vw] md:text-[6.4vw] tracking-tight"
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
            React · Next.js · Node.js · MongoDB
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
            className="rounded-full px-6 py-3.5 font-semibold text-white transition-all duration-300 active:scale-[0.98]"
            style={{ backgroundColor: PALETTE.text }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = PALETTE.accent)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = PALETTE.text)
            }
          >
            See the work
          </a>
          <a
            href="#contact"
            className="rounded-full border px-6 py-3.5 font-semibold transition-all duration-300 bg-white/30 active:scale-[0.98]"
            style={{ borderColor: `${PALETTE.text}33`, color: PALETTE.text }}
            onMouseEnter={(e) => {
              e.borderColor = PALETTE.text;
              e.currentTarget.style.backgroundColor = `${PALETTE.mist}33`;
            }}
            onMouseLeave={(e) => {
              e.borderColor = `${PALETTE.text}33`;
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-6 md:left-10 z-10 eyebrow text-xs font-mono tracking-widest"
      >
        Scroll — 01 / 05
      </motion.div>
    </section>
  );
}
