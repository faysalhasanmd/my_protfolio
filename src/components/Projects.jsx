"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink, X, Eye } from "lucide-react";
import dynamic from "next/dynamic";

// কাস্টম থ্রি ডট জেএস নেটওয়ার্ক সিনটি SSR ফলস রেখে ডাইনামিকালি লোড করা হলো
const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

const projectData = [
  {
    name: "EduPulse BD",
    kind: "React Application",
    description:
      "An advanced tuition management and analytics platform for tutors and students in Bangladesh.",
    longDescription:
      "EduPulse BD is a premium full-stack platform designed to bridge the gap between tutors and students. It features an interactive student-tutor application process, advanced analytical charts for tracking earnings (monthly & cumulative), and responsive admin management workflows built to handle tuition allocation elegantly.",
    image: "/images/etuition.jpg",
    stack: ["React.js", "Chart.js", "Tailwind CSS", "Node.js", "MongoDB"],
    github: "https://github.com/faysalhasanmd/bdTution",
    live: "https://preeminent-mermaid-04ba7b.netlify.app/",
  },
  {
    name: "AutoWash Pro",
    kind: "Full-Stack Next.js Hub",
    description:
      "A smart automobile cleaning automation and modern booking ecosystem with live statistics.",
    longDescription:
      "AutoWash Pro transforms traditional car wash operations into a sleek SaaS automated hub. It includes live role assignments, user booking summaries, active service updates, and fully integrated monthly revenue tracking visualizer charts.",
    image: "/images/carclean.jpg",
    stack: ["Next.js", "Tailwind CSS", "Node.js", "Express", "Chart.js"],
    github: "https://github.com/faysalhasanmd/car-wash-system",
    live: "https://car-wash-system-two.vercel.app/",
  },
  {
    name: "CineVerse Pro",
    kind: "Web Application",
    description:
      "A high-performance cinematic entertainment index featuring seamless compilation workflows.",
    longDescription:
      "CineVerse Pro offers movie enthusiasts a premium, unified user experience to search, filter, and curate custom personal movie collections. It utilizes dynamic client-side filtering combined with high-performance responsive grid systems for rich media content indexing.",
    image: "/images/movie.jpg",
    stack: ["React.js", "Tailwind CSS", "Context API", "REST API"],
    github: "https://github.com/faysalhasanmd/movie-server",
    live: "https://brilliant-heliotrope-38f016.netlify.app/",
  },
];

const PALETTE = {
  bg: "#FBF7F4",
  text: "#1E293B",
  accent: "#7C9EC4",
  line: "rgba(30, 41, 59, 0.08)",
};

function GithubIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function EqualProjectCard({ project, index, onOpenModal }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 22 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [6, -6]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
    springConfig,
  );

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative w-full h-[540px] rounded-[24px] bg-white/90 backdrop-blur-md border border-slate-200/80 p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 z-10"
    >
      <div className="space-y-4">
        {/* Full Display Image Showcase Area */}
        <div className="w-full h-56 rounded-xl overflow-hidden bg-slate-100 relative border border-slate-100">
          <motion.img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/5 transition-colors duration-300" />

          {/* Project Type Badge Floating over image */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
            <span className="font-mono text-[10px] font-bold text-slate-700 tracking-wide uppercase">
              {project.kind}
            </span>
          </div>
        </div>

        {/* Content Details Block */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-slate-400 font-bold tracking-widest">
              PROJECT // 0{index + 1}
            </span>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-800 transition-colors"
            >
              <ExternalLink size={14} />
            </motion.a>
          </div>

          <h3 className="font-display font-bold text-xl text-slate-900 tracking-tight group-hover:text-[#7C9EC4] transition-colors duration-300">
            {project.name}
          </h3>

          <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Bottom Footer Section (Stack + Buttons) */}
      <div className="space-y-4 pt-3 border-t border-slate-100">
        {/* Modern Tech Stack Badges */}
        <div className="flex flex-wrap gap-1">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[9px] font-medium px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Action Button Group */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenModal(project)}
            className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Eye size={12} /> Details
          </motion.button>
          <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section
      id="work"
      className="relative px-6 md:px-10 py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: PALETTE.bg }}
    >
      {/* 3D Interactive Layer (Background) */}
      <div className="absolute inset-0 z-0">
        <NetworkScene className="w-full h-full opacity-40" />
      </div>

      {/* Gentle Layer Fade Blur To Ensure Text Legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b via-transparent"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${PALETTE.bg}dd, transparent 40%, ${PALETTE.bg}ee)`,
        }}
      />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header Title Section */}
        <div className="mb-16 md:mb-20">
          <p
            className="eyebrow mb-3 font-mono text-xs tracking-[0.25em] uppercase font-bold"
            style={{ color: PALETTE.accent }}
          >
            03 / PROJECT | EXPERIMENTAL BUILDS
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-slate-900">
            Three products,{" "}
            <span style={{ color: PALETTE.accent }}>shipped and live</span>.
          </h2>
        </div>

        {/* Balanced 3-Column Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projectData.map((p, i) => (
            <EqualProjectCard
              key={p.name}
              project={p}
              index={i}
              onOpenModal={setActiveProject}
            />
          ))}
        </div>
      </div>

      {/* Popup Dialog Backdrop & Container Pipeline */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-white rounded-[24px] overflow-hidden shadow-2xl z-5 z-10 border border-slate-100"
            >
              {/* Modal Banner Showcase */}
              <div className="h-52 md:h-60 bg-slate-50 relative border-b border-slate-100">
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-black/5" />
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white backdrop-blur-md hover:scale-105 active:scale-95 transition-transform"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Description Drawer Body */}
              <div className="p-6 md:p-8 space-y-5">
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded font-bold inline-block">
                    {activeProject.kind}
                  </span>
                  <h4 className="text-2xl font-bold font-display text-slate-950 tracking-tight">
                    {activeProject.name}
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed pt-1">
                    {activeProject.longDescription}
                  </p>
                </div>

                {/* Core Framework Tags mapping */}
                <div className="space-y-1.5">
                  <h5 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Engineered Core
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {activeProject.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-slate-600 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Redirection Links */}
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <motion.a
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 font-mono text-xs font-semibold py-3 rounded-xl bg-slate-900 text-white shadow-sm hover:bg-slate-800"
                  >
                    <GithubIcon size={14} /> Repository
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 font-mono text-xs font-semibold py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    <ExternalLink size={14} /> Live Build
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
