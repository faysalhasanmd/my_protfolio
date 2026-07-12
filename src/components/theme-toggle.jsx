"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`group isolate relative flex h-7 w-[68px] items-center justify-between rounded-full px-1 font-mono text-[7px] font-bold uppercase tracking-widest ${className}`}
      style={{
        backgroundColor: isDark ? "#181c24" : "#fbf7f1",
        border: `1.5px solid ${isDark ? "#f3e3d3" : "#181c24"}`,
        transition: "background-color 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* Static labels underneath — knob slides over whichever is active */}
      <span
        className="relative z-0 flex-1 text-center transition-colors duration-300"
        style={{ color: isDark ? "#f3e3d3" : "#181c24" }}
      >
        Day
      </span>
      <span
        className="relative z-0 flex-1 text-center transition-colors duration-300"
        style={{ color: isDark ? "#f3e3d3" : "#181c24" }}
      >
        Night
      </span>

      {/* Sliding knob */}
      <motion.div
        animate={{ x: isDark ? 34 : 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        className="absolute left-1 z-10 flex h-5 w-5 items-center justify-center rounded-full shadow-md"
        style={{
          backgroundColor: isDark ? "#f3e3d3" : "#181c24",
        }}
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {isDark ? (
            <Moon size={10} color="#181c24" strokeWidth={2.4} fill="#181c24" />
          ) : (
            <Sun size={10} color="#fbf7f1" strokeWidth={2.4} />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
