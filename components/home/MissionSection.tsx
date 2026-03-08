"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Globe, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Guds Kærlighed",
    description: "Vi tror på en Gud, der elsker alle mennesker uanset baggrund, nationalitet eller fortid.",
    color: "from-blue-500 to-blue-700",
    glow: "shadow-blue-500/20",
  },
  {
    icon: Zap,
    title: "Hans Kraft",
    description: "Vi oplever og forkynder Guds kraft — helbredelse, mirakel og ånd i aktion.",
    color: "from-indigo-500 to-blue-700",
    glow: "shadow-indigo-500/20",
  },
  {
    icon: Globe,
    title: "International Fællesskab",
    description: "Et mangfoldigt fællesskab med folk fra hele verden — dansk, engelsk, swahili og spansk.",
    color: "from-sky-500 to-blue-700",
    glow: "shadow-sky-500/20",
  },
  {
    icon: Users,
    title: "Forbundne Liv",
    description: "Vi forbinder mennesker med Gud og hinanden, og udruster dem til at leve i deres kald.",
    color: "from-blue-600 to-indigo-800",
    glow: "shadow-blue-600/20",
  },
];

export function MissionSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-slate-900/50" />
      <div className="hero-glow w-[500px] h-[500px] bg-blue-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-4">
            Vores Mission
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            At Åbenbare Guds Kærlighed &{" "}
            <span className="gradient-text">Demonstrere Hans Kraft</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Mark 12:30 — &quot;Du skal elske Herren din Gud af hele dit hjerte og af hele din sjæl&quot;
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-8 group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-xl ${value.glow} group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{value.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 glass-card p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="shimmer absolute inset-0" />
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-6">
              Vores <span className="gradient-text">Vision</span>
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              {[
                { emoji: "🔗", label: "Forbinde", desc: "Mennesker med Gud og hinanden" },
                { emoji: "⚡", label: "Udruste", desc: "Til at leve i kaldet" },
                { emoji: "🌍", label: "Nå Ud", desc: "Lokalt og globalt" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="text-white font-bold text-xl">{item.label}</span>
                  <span className="text-slate-400 text-sm">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
