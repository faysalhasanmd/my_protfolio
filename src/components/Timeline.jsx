"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import dynamic from "next/dynamic";
import { timeline } from "@/lib/data";

// 3D Background Network Scene-টি SSR ফলস রেখে ডাইনামিকালি লোড করা হলো
const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

/**
 * ---- Portfolio Palette Maintenance ----
 * Hardcoded hex-er bodole globals.css-er --hero-* CSS variable use kora hocche,
 * jate .dark class toggle hole automatic update hoy
 */
const PALETTE = {
  bg: "var(--hero-bg)",
  text: "var(--hero-text)",
  accent: "var(--hero-accent)",
  line: "var(--hero-line)",
  mist: "var(--hero-mist)",
};

// var() color-er upor alpha lagate hex suffix kaj kore na — color-mix() lagbe
const withAlpha = (cssVar, percent) =>
  `color-mix(in srgb, ${cssVar} ${percent}%, transparent)`;

// meta স্ট্রিং থেকে GPA/CGPA সংক্রান্ত অংশ বাদ দেয় (ডেটা ফাইল না ছুঁয়েই)
function stripGpa(meta = "") {
  return meta
    .split("·")
    .map((s) => s.trim())
    .filter((s) => !/\b(c?gpa)\b/i.test(s))
    .join(" · ");
}

export default function Timeline() {
  // ডালাকে Education এবং Certification ক্যাটাগরিতে আলাদা করা হয়েছে
  const educationItems = timeline.filter((item) => item.type === "education");
  const certificateItems = timeline.filter((item) => item.type !== "education");

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Education: original vertical timeline-style item (few items, so vertical breathing room works)
  const renderEducationItem = (t) => {
    const cleanMeta = stripGpa(t.meta);
    return (
      <motion.li
        key={t.title + t.year}
        variants={itemVariants}
        className="group relative pl-5 border-l-2 transition-colors duration-300"
        style={{ borderColor: withAlpha(PALETTE.line, 33) }}
        whileHover={{ borderColor: "var(--hero-accent)" }}
      >
        {/* Timeline Node Bullet point effect on hover */}
        <div
          className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border transition-transform duration-300 group-hover:scale-150"
          style={{
            borderColor: PALETTE.accent,
            backgroundColor: PALETTE.bg,
          }}
        />
        <div className="flex items-baseline gap-3 mb-1">
          <span
            className="font-mono text-xs font-bold"
            style={{ color: PALETTE.accent }}
          >
            {t.year}
          </span>
          <span
            className="text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wide"
            style={{
              color: PALETTE.accent,
              backgroundColor: withAlpha(PALETTE.accent, 8),
              border: `1px solid ${withAlpha(PALETTE.accent, 20)}`,
            }}
          >
            Degree
          </span>
        </div>
        <h4 className="font-display font-semibold text-lg md:text-xl text-slate-800 dark:text-slate-100 transition-colors">
          {t.title}
        </h4>
        <p className="text-sm mt-1 font-body text-slate-600 dark:text-slate-400 font-normal">
          {t.place}
          {cleanMeta && (
            <>
              <span className="opacity-40"> · </span>
              {cleanMeta}
            </>
          )}
        </p>
      </motion.li>
    );
  };

  // Certification: compact 2-column grid card — onek item, tai height save korte grid e boshano
  const renderCertificateCard = (t) => {
    const cleanMeta = stripGpa(t.meta);
    return (
      <motion.li
        key={t.title + t.year}
        variants={cardVariants}
        className="group relative rounded-xl border p-4 transition-all duration-300"
        style={{
          background: withAlpha(PALETTE.mist, 10),
          borderColor: withAlpha(PALETTE.line, 30),
        }}
        whileHover={{
          borderColor: "var(--hero-accent)",
          y: -2,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: PALETTE.accent }}
          />
          <span
            className="font-mono text-[11px] font-bold"
            style={{ color: PALETTE.accent }}
          >
            {t.year}
          </span>
        </div>
        <h4 className="font-display font-semibold text-sm md:text-base text-slate-800 dark:text-slate-100 leading-snug">
          {t.title}
        </h4>
        <p className="text-xs mt-1 font-body text-slate-600 dark:text-slate-400 font-normal">
          {t.place}
          {cleanMeta && (
            <>
              <span className="opacity-40"> · </span>
              {cleanMeta}
            </>
          )}
        </p>
      </motion.li>
    );
  };

  return (
    <section
      id="path"
      className="relative px-6 md:px-10 py-16 md:py-20 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      {/* 3D Interactive Layer (Background) */}
      <div className="absolute inset-0 z-0">
        <NetworkScene className="w-full h-full opacity-40" />
      </div>

      {/* Gentle Overlays for Clear Text Legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b via-transparent"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${withAlpha(
            PALETTE.bg,
            87,
          )}, transparent 40%, ${withAlpha(PALETTE.bg, 93)})`,
        }}
      />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <p
            className="eyebrow mb-4 font-mono text-xs tracking-[0.2em]"
            style={{ color: PALETTE.accent }}
          >
            04 / EDUCATION & CERTIFICATIONS | THE PATH HERE
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight">
            EDUCATION &{" "}
            <span style={{ color: PALETTE.accent }}>CERTIFICATIONS</span>
          </h2>
          <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight">
            <span style={{ color: PALETTE.accent }}> 2016 to 2026,</span>in
            order.
          </h2>
        </div>

        {/* Left & Right Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 relative">
          {/* Middle Decorative Divider for Desktop */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-30"
            style={{ backgroundColor: PALETTE.line }}
          />

          {/* LEFT COLUMN: Education (vertical timeline) */}
          <div className="space-y-8">
            <div
              className="flex items-center gap-3 mb-6 border-b pb-4"
              style={{ borderColor: withAlpha(PALETTE.line, 27) }}
            >
              <GraduationCap size={18} style={{ color: PALETTE.accent }} />
              <h3
                className="font-mono text-xs font-bold tracking-[0.15em] uppercase"
                style={{ color: PALETTE.accent }}
              >
                Education
              </h3>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full text-white font-mono font-bold"
                style={{ backgroundColor: PALETTE.accent }}
              >
                {educationItems.length}
              </span>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-8"
            >
              {educationItems.map(renderEducationItem)}
            </motion.ul>
          </div>

          {/* RIGHT COLUMN: Certificates (compact 2-col grid) */}
          <div className="space-y-8">
            <div
              className="flex items-center gap-3 mb-6 border-b pb-4"
              style={{ borderColor: withAlpha(PALETTE.line, 27) }}
            >
              <Award size={18} style={{ color: PALETTE.accent }} />
              <h3
                className="font-mono text-xs font-bold tracking-[0.15em] uppercase"
                style={{ color: PALETTE.accent }}
              >
                Certification
              </h3>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full text-white font-mono font-bold"
                style={{ backgroundColor: PALETTE.accent }}
              >
                {certificateItems.length}
              </span>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {certificateItems.map(renderCertificateCard)}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
