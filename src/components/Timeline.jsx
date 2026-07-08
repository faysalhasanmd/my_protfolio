"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data";

/**
 * ---- Portfolio Palette Maintenance ----
 * bg      -> Light Off-White  #FBF7F4 (আপনার ছবি থেকে নেওয়া)
 * text    -> Deep Blue-Gray   #2E3E4E
 * accent  -> Dusty Blue       #7C9EC4
 * line    -> Warm Taupe       #CDBEA7
 */
const PALETTE = {
  bg: "#FBF7F4",
  text: "#2E3E4E",
  accent: "#7C9EC4",
  line: "#CDBEA7",
};

export default function Timeline() {
  // ডাটাকে Education এবং Certification ক্যাটাগরিতে আলাদা করা হয়েছে
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

  return (
    <section
      id="path"
      className="relative px-6 md:px-10 py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <p
            className="eyebrow mb-4 font-mono text-xs tracking-[0.2em]"
            style={{ color: PALETTE.accent }}
          >
            05 / THE PATH HERE
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-5xl">
            2016 to 2026, in order.
          </h2>
        </div>

        {/* Left & Right Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 relative">
          {/* Middle Decorative Divider for Desktop */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-40"
            style={{ backgroundColor: PALETTE.line }}
          />

          {/* LEFT COLUMN: Education */}
          <div className="space-y-8">
            <div
              className="flex items-center gap-3 mb-6 border-b pb-4"
              style={{ borderColor: `${PALETTE.line}55` }}
            >
              <h3
                className="font-mono text-xs font-bold tracking-[0.15em] uppercase"
                style={{ color: PALETTE.accent }}
              >
                Education
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full text-white font-mono"
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
              {educationItems.map((t) => (
                <motion.li
                  key={t.title + t.year}
                  variants={itemVariants}
                  className="group relative pl-4 border-l-2 transition-colors duration-300"
                  style={{ borderColor: `${PALETTE.line}66` }}
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: PALETTE.accent }}
                    >
                      {t.year}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-lg md:text-xl group-hover:text-opacity-80 transition-colors">
                    {t.title}
                  </h4>
                  <p className="text-sm mt-1 font-body opacity-80">
                    {t.place} <span className="opacity-40">·</span> {t.meta}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT COLUMN: Certificates */}
          <div className="space-y-8">
            <div
              className="flex items-center gap-3 mb-6 border-b pb-4"
              style={{ borderColor: `${PALETTE.line}55` }}
            >
              <h3
                className="font-mono text-xs font-bold tracking-[0.15em] uppercase"
                style={{ color: PALETTE.accent }}
              >
                Certification
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full text-white font-mono"
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
              className="space-y-8"
            >
              {certificateItems.map((t) => (
                <motion.li
                  key={t.title + t.year}
                  variants={itemVariants}
                  className="group relative pl-4 border-l-2 transition-colors duration-300"
                  style={{ borderColor: `${PALETTE.line}66` }}
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: PALETTE.accent }}
                    >
                      {t.year}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-lg md:text-xl group-hover:text-opacity-80 transition-colors">
                    {t.title}
                  </h4>
                  <p className="text-sm mt-1 font-body opacity-80">
                    {t.place} <span className="opacity-40">·</span> {t.meta}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
