"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useRef } from "react";

const orbDots = [0, 72, 144, 216, 288];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -50]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.18] pointer-events-none" />

      {/* Ambient orbs — parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[800px] h-[800px] rounded-full bg-cyan-500/[0.06] blur-[180px]" />
        <div className="absolute -bottom-40 -right-20 w-[700px] h-[700px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <div>
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55 }}
              className="mb-8"
            >
              <span className="section-label">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                Søndagsgudstjeneste kl. 10:30 — Alle er velkomne
              </span>
            </motion.div>

            {/* Headline — line-by-line reveal */}
            <div className="mb-7">
              {[
                { text: "Oplev Guds", gradient: false },
                { text: "Kærlighed", gradient: true },
                { text: "& Hans Kraft", gradient: false },
              ].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.08 + i * 0.13,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[1.04] tracking-tight ${
                      line.gradient ? "gradient-text" : "text-white"
                    }`}
                  >
                    {line.text}
                  </motion.h1>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg"
            >
              Et levende kristent fællesskab i Brønderslev med folk fra hele verden.
              Dansk, engelsk, swahili og spansk — du er altid velkommen.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <Link href="/about" className="btn-primary group">
                Lær os at kende
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <a
                href="https://facebook.com/biakdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-[0.72rem] rounded-[10px] border border-white/10 text-slate-300 text-sm font-medium hover:border-cyan-500/30 hover:text-white hover:bg-cyan-500/[0.04] transition-all duration-200"
              >
                <span className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                </span>
                Se Live Stream
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.78 }}
              className="flex items-center gap-8 pt-8 border-t border-white/[0.07]"
            >
              {[
                { n: "10+", label: "Nationaliteter" },
                { n: "4",   label: "Sprog" },
                { n: "∞",   label: "Kærlighed" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.82 + i * 0.1 }}
                >
                  <p className={`text-2xl sm:text-3xl font-black ${s.n === "∞" ? "gradient-text" : "text-white"}`}>
                    {s.n}
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Decorative visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[440px] h-[440px]">

              {/* Spinning rings */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/[0.09] animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border border-blue-400/[0.08] animate-spin-reverse" />
              <div
                className="absolute inset-12 rounded-full border border-cyan-300/[0.06] animate-spin-slow"
                style={{ animationDuration: "40s" }}
              />
              <div className="absolute inset-20 rounded-full border border-dashed border-white/[0.04]" />

              {/* Glow blobs */}
              <div className="absolute inset-[28%] rounded-full bg-cyan-500/12 blur-3xl animate-glow-pulse" />
              <div className="absolute inset-[38%] rounded-full bg-blue-500/18 blur-2xl" />

              {/* Orbiting dots */}
              {orbDots.map((deg, i) => (
                <motion.div
                  key={deg}
                  className="absolute rounded-full"
                  style={{
                    width: i % 2 === 0 ? 10 : 7,
                    height: i % 2 === 0 ? 10 : 7,
                    top: `${50 + 47 * Math.sin((deg * Math.PI) / 180)}%`,
                    left: `${50 + 47 * Math.cos((deg * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                    background: i % 2 === 0
                      ? "rgba(6, 182, 212, 0.75)"
                      : "rgba(96, 165, 250, 0.6)",
                    boxShadow: "0 0 10px rgba(6, 182, 212, 0.55)",
                  }}
                  animate={{ opacity: [0.35, 1, 0.35], scale: [0.7, 1.35, 0.7] }}
                  transition={{
                    duration: 2.5 + i * 0.45,
                    delay: i * 0.55,
                    repeat: Infinity,
                  }}
                />
              ))}

              {/* Cross */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-14 h-28">
                  <div className="absolute left-1/2 -translate-x-1/2 w-[5px] h-full rounded-full bg-gradient-to-b from-transparent via-cyan-400/85 to-transparent" />
                  <div className="absolute top-[33%] left-0 h-[5px] w-full rounded-full bg-gradient-to-r from-transparent via-cyan-400/85 to-transparent" />
                  {/* Glow at intersection */}
                  <div className="absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-400/35 blur-lg" />
                </div>
              </div>

              {/* Floating info cards */}
              <motion.div
                className="absolute -top-8 right-0 card px-4 py-3 shadow-2xl"
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Næste møde</p>
                <p className="text-sm font-bold text-white">Søndag 10:30</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 left-0 card px-4 py-3 shadow-2xl"
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Fællesskab</p>
                <p className="text-sm font-bold gradient-text">10+ nationaliteter</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
