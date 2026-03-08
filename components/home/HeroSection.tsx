"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.07] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[140px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Søndagsgudstjeneste kl. 10:30 — Alle er velkomne
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-6 tracking-tight"
          >
            Oplev Guds<br />
            <span className="gradient-text">Kærlighed</span><br />
            & Hans Kraft
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Et levende kristent fællesskab i Brønderslev med folk fra hele verden.
            Dansk, engelsk, swahili og spansk — du er altid velkommen.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            <Link href="/about" className="btn-primary">
              Lær os at kende <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://facebook.com/biakdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-[0.68rem] rounded-[10px] border border-white/10 text-slate-300 text-sm font-medium hover:border-white/20 hover:text-white transition-all"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              Se Live Stream
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-8 pt-8 border-t border-white/[0.07]"
          >
            {[
              { n: "10+", label: "Nationaliteter" },
              { n: "4",   label: "Sprog" },
              { n: "∞",   label: "Kærlighed" },
            ].map((s, i) => (
              <div key={s.label}>
                {i > 0 && <span className="hidden" />}
                <p className={`text-2xl sm:text-3xl font-black ${s.n === "∞" ? "gradient-text" : "text-white"}`}>{s.n}</p>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
