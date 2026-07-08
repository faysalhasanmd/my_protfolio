"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "@/lib/data";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }
  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block rounded-3xl bg-paper border border-sand/50 p-8 md:p-10 focus-ring"
    >
      <div className="flex items-start justify-between mb-10">
        <span className="font-mono text-xs text-steel">{String(index + 1).padStart(2, "0")} / {project.kind}</span>
        <span className="w-9 h-9 rounded-full border border-ink/15 grid place-items-center text-ink group-hover:bg-steel group-hover:border-steel group-hover:text-paper transition-colors">
          ↗
        </span>
      </div>

      <h3 className="font-display font-semibold text-2xl md:text-3xl mb-3">{project.name}</h3>
      <p className="text-ink/65 leading-relaxed mb-8 max-w-md">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-cream border border-sand/60 text-ink/70"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative bg-paper px-6 md:px-10 py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow text-steel mb-4">04 / Selected work</p>
        <h2 className="font-display font-semibold text-3xl md:text-5xl mb-14 max-w-xl">
          Three products, shipped and live.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={p.name} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
