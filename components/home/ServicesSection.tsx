"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Music, BookOpen, Star, Wifi } from "lucide-react";
import Link from "next/link";

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
    <section className="py-24 md:py-32 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card p-7 flex flex-col ${s.primary ? "border-cyan-500/25 bg-slate-900/80" : ""}`}
            >
              {s.primary && (
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
                  ★ Primær Gudstjeneste
                </span>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.primary ? "bg-cyan-500/15 border border-cyan-500/20" : "bg-slate-800 border border-white/[0.07]"}`}>
                  <s.icon className={`w-5 h-5 ${s.primary ? "text-cyan-400" : "text-slate-400"}`} />
                </div>
                <span className={`text-sm font-semibold ${s.primary ? "text-cyan-400" : "text-slate-400"}`}>{s.day}</span>
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
                  <span key={f} className="px-2.5 py-1 rounded-full bg-slate-800 border border-white/[0.06] text-slate-400 text-xs">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live stream bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center justify-between gap-4 px-6 py-4 card flex-wrap"
        >
          <div className="flex items-center gap-3">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 text-sm">
              Kan du ikke være med fysisk? Se os live på Facebook — hver søndag kl. 10:30
            </span>
          </div>
          <a
            href="https://facebook.com/biakdk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors flex-shrink-0"
          >
            Gå til Facebook →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
