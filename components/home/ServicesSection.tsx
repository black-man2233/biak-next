"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Music, BookOpen, Star, Wifi } from "lucide-react";

const services = [
  {
    day: "Søndag",
    time: "10:30 – 12:30",
    title: "Søndagsgudstjeneste",
    desc: "Tilbedelse, bøn og forkyndelse. Tolkning på dansk, engelsk, swahili og spansk.",
    icon: Music,
    features: ["Livemusik", "Bibelundervisning", "Bøn"],
    location: "Kirkevej 10, Brønderslev",
    primary: true,
  },
  {
    day: "Onsdag",
    time: "18:30 – 20:00",
    title: "Bøn & Bibelundervisning",
    desc: "Midtugs-samling med fokus på bøn og fordybelse i Bibelen.",
    icon: BookOpen,
    features: ["Bøn", "Bibelstudium"],
    location: "Kirkevej 12, Brønderslev",
    primary: false,
  },
  {
    day: "Fredag",
    time: "18:00 – 20:00",
    title: "Ungdomsmøde",
    desc: "Månedligt møde med sjov, tilbedelse og stærkt fællesskab for unge.",
    icon: Star,
    features: ["Musik", "Aktiviteter"],
    location: "Kirkevej 10, Brønderslev",
    primary: false,
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/[0.04] blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 mx-auto block w-fit">Gudstjenester & Møder</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Mød Os <span className="gradient-text">Denne Uge</span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
            Vi samles regelmæssigt — alle er velkomne uanset baggrund
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative group"
            >
              {/* Gradient border wrapper for primary */}
              {s.primary && (
                <div className="absolute -inset-[1px] rounded-[17px] bg-gradient-to-br from-cyan-500/50 via-blue-500/20 to-cyan-400/40 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              <div
                className={`relative card p-7 flex flex-col h-full rounded-[15px] ${
                  s.primary ? "bg-slate-900/95 border-transparent" : ""
                }`}
              >
                {s.primary && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                      Primær Gudstjeneste
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      s.primary
                        ? "bg-cyan-500/15 border border-cyan-500/25"
                        : "bg-slate-800 border border-white/[0.07]"
                    }`}
                  >
                    <s.icon className={`w-5 h-5 ${s.primary ? "text-cyan-400" : "text-slate-400"}`} />
                  </div>
                  <span className={`text-sm font-semibold ${s.primary ? "text-cyan-400" : "text-slate-400"}`}>
                    {s.day}
                  </span>
                </div>

                <h3 className="text-white font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2.5 text-sm text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                    {s.time}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                    {s.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                  {s.features.map((f) => (
                    <span
                      key={f}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        s.primary
                          ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                          : "bg-slate-800 border border-white/[0.06] text-slate-400"
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live stream bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-6 flex items-center justify-between gap-4 px-6 py-4 card flex-wrap"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping-slow" />
            </div>
            <span className="text-slate-300 text-sm">
              Kan du ikke være med fysisk? Se os live på Facebook — hver søndag kl. 10:30
            </span>
          </div>
          <a
            href="https://facebook.com/biakdk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors flex-shrink-0 flex items-center gap-1 group"
          >
            Gå til Facebook
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
