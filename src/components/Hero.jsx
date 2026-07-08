"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { profile } from "@/lib/data";

// কাস্টম থ্রি ডট জেএস নেটওয়ার্ক সিনটি SSR ফলস রেখে ডাইনামিকালি লোড করা হলো
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
  const rightSideRef = useRef(null);

  // মাউস ট্র্যাকিং মোশন ভ্যালু
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // স্মুথ বসানোর জন্য স্প্রিং কনফিগারেশন
  const springConfig = { stiffness: 120, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, -15]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
    springConfig,
  );
  const floatY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-10, 10]),
    springConfig,
  );

  // মাউস পজিশন ক্যালকুলেট করার ফাংশন
  function handleMouseMove(e) {
    if (!rightSideRef.current) return;
    const rect = rightSideRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden flex items-center"
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
          backgroundImage: `linear-gradient(to bottom, ${PALETTE.bg}11, transparent 65%, ${PALETTE.bg})`,
        }}
      />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 z-10 py-20 md:py-0">
        {/* ২-কলাম গ্রিড লেআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* বামদিকের টেক্সট কন্টেন্ট এরিয়া (Column 7) */}
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
              Node 04 · Tangail, Bangladesh
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
                className="rounded-full px-6 py-3.5 font-semibold text-white transition-all duration-300 active:scale-[0.98] shadow-sm"
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
                style={{
                  borderColor: `${PALETTE.text}33`,
                  color: PALETTE.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = PALETTE.text;
                  e.currentTarget.style.backgroundColor = `${PALETTE.mist}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${PALETTE.text}33`;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Get in touch
              </a>
            </motion.div>
          </motion.div>

          {/* ডানদিকের 3D Motion Interactive Card এরিয়া (Column 5) */}
          <motion.div
            ref={rightSideRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="lg:col-span-5 hidden lg:flex justify-center items-center relative cursor-grab active:cursor-grabbing"
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                y: floatY,
                transformStyle: "preserve-3d",
              }}
              className="w-[360px] h-[360px] md:w-[400px] md:h-[400px] rounded-[40px] border border-white/40 bg-white/10 backdrop-blur-xl relative flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
            >
              {/* Outer Decorative Abstract Ring 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-slate-400/30"
                style={{ transform: "translateZ(20px)" }}
              />

              {/* Outer Decorative Abstract Ring 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute w-[65%] h-[65%] rounded-full border border-slate-300/40"
                style={{ transform: "translateZ(40px)" }}
              />

              {/* Glowing Ambient Core Node */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#7C9EC4] to-[#AFD3DE] opacity-80 blur-xl absolute"
              />

              {/* Center Floating Abstract 3D Cube/Card Mesh */}
              <motion.div
                style={{ transform: "translateZ(60px)" }}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-32 h-32 rounded-3xl bg-white/80 border border-white shadow-xl flex flex-col justify-between p-5 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-lg bg-[#7C9EC4]/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#7C9EC4] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-16 bg-slate-300 rounded" />
                  <div className="h-1.5 w-10 bg-slate-200 rounded" />
                </div>
              </motion.div>

              {/* Extra Floating Small Tag over the Mesh */}
              <motion.div
                style={{ transform: "translateZ(80px)" }}
                className="absolute bottom-16 right-12 px-3 py-1.5 bg-slate-900 text-white font-mono text-[10px] rounded-xl shadow-lg"
              >
                {"<Dev />"}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Footer indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-6 md:left-10 z-10 eyebrow text-xs font-mono tracking-widest"
      >
        Scroll — 01 / 05
      </motion.div> */}
    </section>
  );
}
