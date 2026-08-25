"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import dynamic from "next/dynamic";
import * as SiIcons from "react-icons/si";

const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

const PALETTE = {
  bg: "var(--hero-bg)",
  text: "var(--hero-text)",
  accent: "var(--hero-accent)",
  mist: "var(--hero-mist)",
  line: "var(--hero-line)",
};

const withAlpha = (cssVar, percent) =>
  `color-mix(in srgb, ${cssVar} ${percent}%, transparent)`;

const groups = [
  {
    label: "Languages",
    items: [
      { name: "HTML5", iconNames: ["SiHtml5"], color: "#E44D26" },
      { name: "CSS3", iconNames: ["SiCss3", "SiCss"], color: "#2965F1" },
      {
        name: "JavaScript",
        iconNames: ["SiJavascript"],
        color: "#F0DB4F",
        dark: true,
      },
      { name: "TypeScript", iconNames: ["SiTypescript"], color: "#3178C6" },
      { name: "C", iconNames: [], glyph: "C", color: "#A8B9CC" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", iconNames: ["SiReact"], color: "#61DAFB" },
      { name: "Next.js", iconNames: ["SiNextdotjs"], color: PALETTE.text },
      { name: "TailwindCSS", iconNames: ["SiTailwindcss"], color: "#38BDF8" },
      { name: "Bootstrap", iconNames: ["SiBootstrap"], color: "#7952B3" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", iconNames: ["SiNodedotjs"], color: "#5FA04E" },
      { name: "Express", iconNames: ["SiExpress"], color: PALETTE.text },
      { name: "MongoDB", iconNames: ["SiMongodb"], color: "#47A248" },
      { name: "PostgreSQL", iconNames: ["SiPostgresql"], color: "#4169E1" },
      { name: "Prisma", iconNames: ["SiPrisma"], color: "#2D3748" },
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      { name: "Git", iconNames: ["SiGit"], color: "#F05032" },
      { name: "GitHub", iconNames: ["SiGithub"], color: PALETTE.text },
      {
        name: "VS Code",
        iconNames: ["SiVisualstudiocode", "SiVisualstudio"],
        color: "#3B9EDF",
      },
      { name: "npm", iconNames: ["SiNpm"], color: "#CB3837" },
      {
        name: "Command Line",
        iconNames: ["TerminalSquare"],
        color: PALETTE.accent,
      },
      { name: "Firebase", iconNames: ["SiFirebase"], color: "#FFA000" },
    ],
  },
];

const groupVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const iconGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.6, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function resolveIcon(iconNames) {
  for (const name of iconNames) {
    if (name === "TerminalSquare") return TerminalSquare;
    if (SiIcons[name]) return SiIcons[name];
  }
  return null;
}

function TechCard({ item }) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  const { name, iconNames, glyph, color } = item;
  const IconComponent = resolveIcon(iconNames || []);
  const fallbackGlyph = glyph || name?.charAt(0)?.toUpperCase() || "?";

  return (
    <motion.div
      ref={ref}
      variants={iconPop}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={reduceMotion ? {} : { y: -6 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col items-center gap-3 cursor-default relative z-10"
    >
      <motion.div
        className="relative flex items-center justify-center w-16 h-16 rounded-2xl border overflow-hidden backdrop-blur-sm"
        style={{
          background: withAlpha(PALETTE.mist, 15),
          borderColor: withAlpha(PALETTE.line, 55),
        }}
        animate={
          reduceMotion
            ? {}
            : {
                borderColor: hover ? `${color}77` : withAlpha(PALETTE.line, 55),
                boxShadow: hover
                  ? `0 12px 30px -10px ${color}55, 0 0 0 1px ${color}15 inset`
                  : "0 0 0 0 transparent",
              }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.span
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(60% 60% at 50% 40%, ${color}25, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : hover
                ? { scale: 1.14, rotate: [0, -8, 6, 0] }
                : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          {IconComponent ? (
            <IconComponent size={30} color={color} />
          ) : (
            <span
              className="font-display font-bold text-2xl leading-none"
              style={{ color }}
            >
              {fallbackGlyph}
            </span>
          )}
        </motion.div>
      </motion.div>

      <motion.span
        className="font-mono text-[11px] tracking-wide font-medium"
        style={{ color: withAlpha(PALETTE.text, 55) }}
        animate={{ color: hover ? color : withAlpha(PALETTE.text, 55) }}
        transition={{ duration: 0.25 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative px-6 md:px-10 py-16 md:py-20 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      {/* 3D Interactive Layer (Background) */}
      <div className="absolute inset-0 z-0">
        <NetworkScene className="w-full h-full opacity-40" />
      </div>

      {/* Atmospheric gradient backdrop blur blending */}
      <div
        className="pointer-events-none absolute -top-40 left-1/3 w-[560px] h-[560px] rounded-full blur-[140px] z-0"
        style={{ backgroundColor: withAlpha(PALETTE.mist, 13) }}
      />

      {/* Gentle Bottom Fade */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t via-transparent"
        style={{
          backgroundImage: `linear-gradient(to top, ${withAlpha(
            PALETTE.bg,
            80,
          )}, transparent 40%)`,
        }}
      />

      <div className="relative max-w-6xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p
            className="eyebrow mb-4 font-mono text-xs tracking-[0.2em] font-bold"
            style={{ color: PALETTE.accent }}
          >
            02 / SKILLS | TOOLKIT
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight">
            Technologies I{" "}
            <span style={{ color: PALETTE.accent }}>Work With</span>
          </h2>
          <p
            className="mt-4 font-body max-w-xl text-sm md:text-base"
            style={{ color: withAlpha(PALETTE.text, 70) }}
          >
            Here&apos;s the stack I rely on day-to-day to build modern,
            production-ready web apps.
          </p>
        </motion.div>

        <div className="space-y-16">
          {groups.map((group) => (
            <motion.div
              key={group.label}
              variants={groupVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div
                variants={rowVariants}
                className="flex items-center gap-3 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full"
                    style={{ backgroundColor: withAlpha(PALETTE.accent, 53) }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: PALETTE.accent }}
                  />
                </span>
                <h3
                  className="font-mono text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ color: PALETTE.accent }}
                >
                  {group.label}
                </h3>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transformOrigin: "left",
                    backgroundColor: withAlpha(PALETTE.line, 33),
                  }}
                  className="h-px flex-1"
                />
              </motion.div>

              <motion.div
                variants={iconGrid}
                className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap gap-x-8 gap-y-8 md:gap-x-10"
              >
                {group.items.map((item) => (
                  <TechCard key={item.name} item={item} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
