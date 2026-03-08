"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Globe, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Guds Kærlighed",         desc: "Vi tror på en Gud der elsker alle uanset baggrund, nationalitet eller fortid.", color: "text-cyan-400",  bg: "bg-cyan-500/10",    border: "border-cyan-500/15" },
  { icon: Zap,   title: "Hans Kraft",              desc: "Vi oplever og forkynder Guds kraft — helbredelse, mirakler og Ånden i aktion.", color: "text-blue-400",  bg: "bg-blue-500/10",    border: "border-blue-500/15" },
  { icon: Globe, title: "Internationalt",          desc: "Folk fra over 10 nationaliteter. Vi taler dansk, engelsk, swahili og spansk.", color: "text-sky-400",   bg: "bg-sky-500/10",     border: "border-sky-500/15" },
  { icon: Users, title: "Forbundne Liv",           desc: "Vi forbinder mennesker med Gud og hinanden, og udruster dem til at leve i kaldet.", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/15" },
];

export function MissionSection() {
  return (
    <section className="py-24 md:py-32 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-16"
        >
          <span className="section-label mb-5 block w-fit">Vores Mission</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-xl leading-tight">
              At Åbenbare Guds Kærlighed &{" "}
              <span className="gradient-text">Demonstrere Hans Kraft</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xs md:text-right leading-relaxed">
              Mark 12:30 — Elsk Herren din Gud af hele dit hjerte
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6"
            >
              <div className={`w-11 h-11 rounded-xl ${v.bg} border ${v.border} flex items-center justify-center mb-5`}>
                <v.icon className={`w-5 h-5 ${v.color}`} />
              </div>
              <h3 className="text-white font-bold text-base mb-2">{v.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 card p-8 md:p-10"
        >
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-6 font-semibold">Vores Vision</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Forbinde",  desc: "Mennesker med Gud og hinanden" },
              { label: "Udruste",   desc: "Til at leve i deres gudgivne kald" },
              { label: "Nå Ud",     desc: "Lokalt og globalt med evangeliet" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
