"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { profile, softSkills } from "@/lib/data";

// The R3F canvas touches WebGL, so it must never run during SSR.
const ProfileScene = dynamic(() => import("./ProfileScene"), {
  ssr: false,
  loading: () => null,
});

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="about"
      className="relative bg-paper px-6 md:px-10 py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-20 items-center">
        {/* ৩ডি ইন্টারঅ্যাক্টিভ ইমেজ কন্টেইনার (সম্পূর্ণ সার্কেল অবজেক্ট) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative w-full max-w-[340px] aspect-square mx-auto flex items-center justify-center"
        >
          {/* ১. ৩ডি ব্যাকগ্রাউন্ড সিনারিও - যা সার্কেলের চারপাশ দিয়ে প্যাডিং গ্লো ছড়াবে */}
          <div
            aria-hidden="true"
            className="absolute inset-[-40px] z-0 pointer-events-none transition-transform duration-500"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            <ProfileScene hovered={hovered} />
          </div>

          {/* ২. ৩ডি আউটার অরবিট রিং (সার্কেল বর্ডার ও প্যাডিং ইফেক্ট) */}
          <motion.div
            animate={{
              rotate: hovered ? 360 : 0,
              borderColor: hovered
                ? "rgba(124,156,192,0.6)"
                : "rgba(203,187,163,0.3)",
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              default: { duration: 0.4 },
            }}
            className="absolute inset-[-12px] rounded-full border border-dashed z-10 pointer-events-none"
          />

          {/* ৩. ৩ডি ফ্লুইড গ্লো রিং (প্যাডিংয়ের ভেতর একটি লাইভ গ্লো স্পট) */}
          <motion.div
            animate={{
              scale: hovered ? 1.1 : 1,
              opacity: hovered ? 0.4 : 0.15,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 blur-md z-10 pointer-events-none"
          />

          {/* ৪. মেইন সার্কেল ইমেজ ফ্রেম */}
          <motion.div
            animate={{
              scale: hovered ? 1.02 : 1,
              boxShadow: hovered
                ? "0 25px 50px -12px rgba(124,156,192,0.5)"
                : "0 10px 30px -10px rgba(0,0,0,0.3)",
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full rounded-full overflow-hidden border-4 border-paper bg-[#181C24] z-20 shadow-xl"
          >
            <motion.div
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src="/images/profile.png"
                alt="Portrait of Md. Faysal Hasan"
                fill
                sizes="(max-width: 768px) 256px, 420px"
                className="object-cover"
                priority={false}
              />
            </motion.div>

            {/* ইমেজের ওপর প্রফেশনাল লাইটিং শ্যাডো ওভারলে */}
            <motion.div
              animate={{ opacity: hovered ? 0.4 : 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"
            />
          </motion.div>
        </motion.div>

        {/* টেক্সট কন্টেন্ট সেকশন */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p variants={fadeUp} className="eyebrow text-steel mb-4">
            01 / Who's behind the code
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold text-3xl md:text-5xl leading-tight mb-6"
          >
            Practical builder, not just a stack of frameworks.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-ink/70 leading-relaxed max-w-xl mb-8"
          >
            {profile.objective}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <span
                key={s}
                className="font-mono text-xs px-3 py-1.5 rounded-full bg-sand/30 border border-sand/60 text-ink/70"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
