"use client";

import { motion } from "framer-motion";

const PALETTE = {
  accent: "#7C9EC4",
  line: "#CDBEA7",
  text: "#2E3E4E",
  paper: "#FBF7F4",
};

/**
 * Reusable divider to place between sections.
 * label: optional small mono text in the middle (e.g. "02", "SCROLL", "NEXT")
 */
export default function SectionDivider({ label }) {
  return (
    <div className="relative w-full py-12 md:py-16 flex items-center justify-center overflow-hidden">
      {/* left line */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: "right",
          backgroundImage: `linear-gradient(to left, ${PALETTE.line}, transparent)`,
        }}
        className="h-[1.5px] flex-1 max-w-xs md:max-w-sm"
      />

      {/* center ornament */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-5 md:mx-8 flex items-center justify-center shrink-0"
      >
        {/* soft glow behind ornament */}
        <div
          className="absolute w-10 h-10 rounded-full blur-md"
          style={{ backgroundColor: `${PALETTE.accent}33` }}
        />

        {/* outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="relative w-9 h-9 rounded-full border flex items-center justify-center"
          style={{ borderColor: `${PALETTE.accent}55` }}
        >
          {/* inner diamond */}
          <div
            className="w-2.5 h-2.5 rotate-45"
            style={{
              backgroundColor: PALETTE.accent,
              boxShadow: `0 0 10px ${PALETTE.accent}88`,
            }}
          />
        </motion.div>
      </motion.div>

      {/* label pill */}
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-mono text-[11px] font-semibold tracking-[0.25em] uppercase shrink-0 mx-1 px-3 py-1 rounded-full border"
          style={{
            color: PALETTE.accent,
            borderColor: `${PALETTE.accent}40`,
            backgroundColor: `${PALETTE.accent}0D`,
          }}
        >
          {label}
        </motion.span>
      )}

      {/* right line */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: "left",
          backgroundImage: `linear-gradient(to right, ${PALETTE.line}, transparent)`,
        }}
        className="h-[1.5px] flex-1 max-w-xs md:max-w-sm"
      />
    </div>
  );
}
