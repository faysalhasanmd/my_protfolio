"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile, softSkills } from "@/lib/data";

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-paper px-6 md:px-10 py-28 md:py-36"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "380px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              width: "100%",
              height: "100%",
              borderRadius: "2rem",
              backgroundColor: "#F3E3D3",
              border: "1px solid rgba(203,187,163,0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-24px",
              right: "-24px",
              width: "96px",
              height: "96px",
              borderRadius: "9999px",
              backgroundColor: "rgba(124,156,192,0.3)",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "2rem",
              overflow: "hidden",
              backgroundColor: "#181C24",
            }}
          >
            <Image
              src="/images/profile.png"
              alt="Portrait of Md. Faysal Hasan"
              fill
              sizes="(max-width: 768px) 256px, 420px"
              style={{ objectFit: "cover" }}
              priority={false}
            />
          </div>
        </motion.div>

        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="eyebrow text-steel mb-4"
          >
            02 / Who's behind the code
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="font-display font-semibold text-3xl md:text-5xl leading-tight mb-6"
          >
            Practical builder, not just a stack of frameworks.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1 }}
            className="text-ink/70 leading-relaxed max-w-xl mb-8"
          >
            {profile.objective}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {softSkills.map((s) => (
              <span
                key={s}
                className="font-mono text-xs px-3 py-1.5 rounded-full bg-sand/30 border border-sand/60 text-ink/70"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
