"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import * as SiIcons from "react-icons/si";

/**
 * ---- Updated Palette with New BG ----
 * bg      -> New Light Off-White #FBF7F4 (আপনার ছবি থেকে নেওয়া)
 * text    -> Deep Blue-Gray      #2E3E4E
 * accent  -> Dusty Blue          #7C9EC4
 * mist    -> Powder Blue         #AFD3DE
 * line    -> Warm Taupe          #CDBEA7
 * -----------------------------------------------------------
 */

const PALETTE = {
  bg: "#FBF7F4", // আপনার নতুন ব্যাকগ্রাউন্ড কালার
  text: "#2E3E4E",
  accent: "#7C9EC4",
  mist: "#AFD3DE",
  line: "#CDBEA7",
};

const groups = [
  {
    label: "Languages",
    items: [
      { name: "HTML5", iconName: "SiHtml5", color: "#E44D26" },
      { name: "CSS3", iconName: "SiCss3", color: "#2965F1" },
      {
        name: "JavaScript",
        iconName: "SiJavascript",
        color: "#F0DB4F",
        dark: true,
      },
      { name: "TypeScript", iconName: "SiTypescript", color: "#3178C6" },
      { name: "Python", iconName: "SiPython", color: "#3776AB" },
      { name: "C", iconName: null, glyph: "C", color: "#A8B9CC" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", iconName: "SiReact", color: "#61DAFB" },
      { name: "Next.js", iconName: "SiNextdotjs", color: PALETTE.text },
      { name: "TailwindCSS", iconName: "SiTailwindcss", color: "#38BDF8" },
      { name: "Bootstrap", iconName: "SiBootstrap", color: "#7952B3" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", iconName: "SiNodedotjs", color: "#5FA04E" },
      { name: "Express", iconName: "SiExpress", color: PALETTE.text },
      { name: "MongoDB", iconName: "SiMongodb", color: "#47A248" },
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      { name: "Git", iconName: "SiGit", color: "#F05032" },
      { name: "GitHub", iconName: "SiGithub", color: PALETTE.text },
      { name: "VS Code", iconName: "SiVisualstudiocode", color: "#3B9EDF" },
      { name: "npm", iconName: "SiNpm", color: "#CB3837" },
      {
        name: "Command Line",
        iconName: "TerminalSquare",
        color: PALETTE.accent,
      },
      { name: "Firebase", iconName: "SiFirebase", color: "#FFA000" },
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

function TechCard({ item }) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  const { name, iconName, glyph, color } = item;

  let IconComponent = null;
  if (iconName === "TerminalSquare") {
    IconComponent = TerminalSquare;
  } else if (iconName && SiIcons[iconName]) {
    IconComponent = SiIcons[iconName];
  }

  return (
    <motion.div
      ref={ref}
      variants={iconPop}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={reduceMotion ? {} : { y: -6 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col items-center gap-3 cursor-default"
    >
      <motion.div
        className="relative flex items-center justify-center w-16 h-16 rounded-2xl border overflow-hidden"
        style={{
          background: `${PALETTE.mist}22`, // নতুন ব্যাকগ্রাউন্ডের সাথে সামঞ্জস্যপূর্ণ হালকা মিস্ট টিন্ট
          borderColor: `${PALETTE.line}66`,
        }}
        animate={
          reduceMotion
            ? {}
            : {
                borderColor: hover ? `${color}66` : `${PALETTE.line}66`,
                boxShadow: hover
                  ? `0 8px 28px -8px ${color}44, 0 0 0 1px ${color}15 inset`
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
              {glyph}
            </span>
          )}
        </motion.div>
      </motion.div>

      <motion.span
        className="font-mono text-xs tracking-wide"
        style={{ color: `${PALETTE.text}8C` }}
        animate={{ color: hover ? color : `${PALETTE.text}8C` }}
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
      className="relative px-6 md:px-10 py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      {/* atmospheric gradient backdrop blur */}
      <div
        className="pointer-events-none absolute -top-40 left-1/3 w-[560px] h-[560px] rounded-full blur-[140px]"
        style={{ backgroundColor: `${PALETTE.mist}33` }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p
            className="eyebrow mb-4 font-mono text-xs tracking-[0.2em]"
            style={{ color: PALETTE.accent }}
          >
            03 / TOOLKIT
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-5xl">
            Technologies I{" "}
            <span style={{ color: PALETTE.accent }}>Work With</span>
          </h2>
          <p
            className="mt-4 font-body max-w-xl"
            style={{ color: `${PALETTE.text}B3` }}
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
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                variants={rowVariants}
                className="flex items-center gap-3 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full"
                    style={{ backgroundColor: `${PALETTE.accent}88` }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: PALETTE.accent }}
                  />
                </span>
                <h3
                  className="font-mono text-xs font-semibold tracking-[0.2em] uppercase"
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
                    backgroundColor: `${PALETTE.line}77`,
                  }}
                  className="h-px flex-1"
                />
              </motion.div>

              <motion.div
                variants={iconGrid}
                className="flex flex-wrap gap-x-8 gap-y-8 md:gap-x-10"
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
