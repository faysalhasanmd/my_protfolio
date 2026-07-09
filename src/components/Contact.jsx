"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import { profile } from "@/lib/data";

// কন্টাক্ট সেকশনের জন্য আলাদা একটি ৩ডি ব্যাকগ্রাউন্ড সিন ডাইনামিকালি লোড করা হলো
const ContactSignalScene = dynamic(() => import("./ContactSignalScene"), {
  ssr: false,
});

/**
 * Wire this up to Formspree (free, no backend needed) so submissions
 * land straight in your inbox:
 * 1. Create a free form at https://formspree.io
 * 2. Point it at your inbox email (e.g. faysalhasanmd393@gmail.com)
 * 3. Paste the endpoint they give you below.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzjndqg";

const infoCards = [
  {
    label: "email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
  {
    label: "phone",
    value: profile.phone,
    href: `tel:${profile.phone}`,
    Icon: Phone,
  },
  {
    label: "location",
    value: profile.location,
    href: null,
    Icon: MapPin,
  },
  {
    label: "degree",
    value: profile.degree ?? "BSc CSE — Green University",
    href: null,
    Icon: GraduationCap,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-paper px-6 md:px-10 py-16 md:py-20 overflow-hidden"
    >
      {/* 3D Interactive Context Backdrop */}
      <div className="absolute inset-0 z-0">
        <ContactSignalScene className="w-full h-full opacity-35" />
      </div>

      {/* Ambient signature glow overlay */}
      <div className="pointer-events-none absolute top-24 right-0 w-[420px] h-[420px] rounded-full bg-steel/10 blur-[120px] z-0" />

      <div className="relative max-w-6xl mx-auto z-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="eyebrow text-steel mb-4 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-steel/60" />
          06 — GET IN TOUCH
        </motion.p>

        <motion.h2
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="font-display font-semibold text-[9vw] md:text-[4.4vw] leading-[0.95] mb-16"
        >
          Let&apos;s,
          <span className="text-steel">get in touch.</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ---------- Left: contact info ---------- */}
          <motion.div
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs text-steel">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-steel/60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-steel" />
              </span>
              Open to full-time roles &amp; freelance work
            </div>

            <h3 className="font-display font-semibold text-2xl mb-3">
              Contact Information
            </h3>
            <p className="text-ink/60 font-body max-w-md mb-10">
              Have a project, a role, or just an idea worth talking through? I
              read every message myself and usually reply within a day.
            </p>

            <div className="space-y-4">
              {infoCards.map(({ label, value, href, Icon }) => {
                const content = (
                  <div className="group flex items-center gap-4 rounded-2xl border border-sand/60 bg-paper/70 backdrop-blur-md px-5 py-4 transition-colors hover:border-steel/50 hover:bg-steel/5">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-ink/5 text-steel group-hover:bg-steel/10 transition-colors shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow text-ink/40 mb-0.5">{label}</p>
                      <p className="font-mono text-sm truncate">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="block focus-ring rounded-2xl"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          {/* ---------- Right: message form ---------- */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-3xl border border-sand/60 bg-paper/80 backdrop-blur-md p-6 md:p-8 shadow-sm"
          >
            <h3 className="font-display font-semibold text-2xl mb-6">
              Send a Message
            </h3>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="eyebrow text-ink/40 mb-2 block"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-sand/60 bg-paper px-4 py-3 font-body text-sm placeholder:text-ink/30 focus:outline-none focus:border-steel focus:ring-2 focus:ring-steel/20 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="eyebrow text-ink/40 mb-2 block"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-sand/60 bg-paper px-4 py-3 font-body text-sm placeholder:text-ink/30 focus:outline-none focus:border-steel focus:ring-2 focus:ring-steel/20 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="eyebrow text-ink/40 mb-2 block"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={onChange}
                  placeholder="Project enquiry..."
                  className="w-full rounded-xl border border-sand/60 bg-paper px-4 py-3 font-body text-sm placeholder:text-ink/30 focus:outline-none focus:border-steel focus:ring-2 focus:ring-steel/20 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="eyebrow text-ink/40 mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  placeholder="What's on your mind? Tell me about your project..."
                  className="w-full rounded-xl border border-sand/60 bg-paper px-4 py-3 font-body text-sm placeholder:text-ink/30 resize-y focus:outline-none focus:border-steel focus:ring-2 focus:ring-steel/20 transition"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-steel text-paper font-display font-semibold py-3.5 transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus-ring"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="flex items-center gap-2 text-sm font-body text-emerald-600">
                  <CheckCircle2 size={16} />
                  Message sent — thanks! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-2 text-sm font-body text-red-600">
                  <AlertCircle size={16} />
                  Something went wrong. Try again, or email me directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto mt-24 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-ink/40 border-t border-sand/50 relative z-10">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="flex gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-steel focus-ring"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-steel focus-ring"
          >
            LinkedIn
          </a>
        </span>
      </footer>
    </section>
  );
}
