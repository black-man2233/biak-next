"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Globe, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Guds Kærlighed",
    desc: "Vi tror på en Gud der elsker alle uanset baggrund, nationalitet eller fortid.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glow: "rgba(6,182,212,0.15)",
  },
  {
    icon: Zap,
    title: "Hans Kraft",
    desc: "Vi oplever og forkynder Guds kraft — helbredelse, mirakler og Ånden i aktion.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: Globe,
    title: "Internationalt",
    desc: "Folk fra over 10 nationaliteter. Vi taler dansk, engelsk, swahili og spansk.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    glow: "rgba(14,165,233,0.15)",
  },
  {
    icon: Users,
    title: "Forbundne Liv",
    desc: "Vi forbinder mennesker med Gud og hinanden, og udruster dem til at leve i kaldet.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    glow: "rgba(99,102,241,0.15)",
  },
];

const visionItems = [
  { label: "Forbinde",  desc: "Mennesker med Gud og hinanden" },
  { label: "Udruste",   desc: "Til at leve i deres gudgivne kald" },
  { label: "Nå Ud",     desc: "Lokalt og globalt med evangeliet" },
];

export function MissionSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/35" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-600/[0.04] blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <span className="section-label mb-5 block w-fit">Vores Mission</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight">
              At Åbenbare Guds Kærlighed &{" "}
              <span className="gradient-text">Demonstrere Hans Kraft</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xs lg:text-right leading-relaxed flex-shrink-0 italic">
              Mark 12:30 — Elsk Herren din Gud af hele dit hjerte
            </p>
          </div>
        </motion.div>

        {/* Value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="card p-6 group cursor-default"
            >
              {/* Icon */}
              <div className="relative mb-5">
                <div
                  className={`w-12 h-12 rounded-2xl ${v.bg} border ${v.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <v.icon className={`w-5 h-5 ${v.color}`} />
                </div>
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 w-12 h-12 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  style={{ background: v.glow }}
                />
              </div>
              <h3 className="text-white font-bold text-base mb-2.5">{v.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="card p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.04] via-transparent to-blue-500/[0.04] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-8 font-semibold">Vores Vision</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {visionItems.map((item, i) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/25 text-cyan-400 text-sm font-black flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{item.label}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
