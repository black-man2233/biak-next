"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, Music, BookOpen, Star } from "lucide-react";

const services = [
  {
    day: "Søndag",
    time: "10:30 – 12:30",
    title: "Søndagsgudstjeneste",
    description: "Tilbedelse, bøn og forkyndelse. Tolkning tilgængelig på dansk, engelsk, swahili og spansk.",
    icon: Music,
    features: ["Livemusik", "Bibelundervisning", "Bøn", "Fællesskab"],
    color: "from-blue-500 to-indigo-600",
    location: "Kirkevej 10, Brønderslev",
    isMain: true,
  },
  {
    day: "Onsdag",
    time: "18:30 – 20:00",
    title: "Bøn & Bibelundervisning",
    description: "Midtugs-samling med fokus på bøn og fordybelse i Bibelen.",
    icon: BookOpen,
    features: ["Bøn", "Bibelstudium", "Fællesskab"],
    color: "from-sky-500 to-blue-600",
    location: "Kirkevej 12, Brønderslev",
    isMain: false,
  },
  {
    day: "Fredag",
    time: "18:00 – 20:00",
    title: "Ungdomsmøde",
    description: "Månedligt ungdomsmøde med sjov, tilbedelse og stærkt fællesskab for unge.",
    icon: Star,
    features: ["Musik", "Aktiviteter", "Undervisning"],
    color: "from-indigo-500 to-blue-700",
    location: "Kirkevej 10, Brønderslev",
    isMain: false,
  },
];

export function ServicesSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-4">
            Gudstjenester & Møder
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Mød Os{" "}
            <span className="gradient-text">Denne Uge</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Vi samles regelmæssigt og alle er velkomne — uanset baggrund
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative glass-card p-6 sm:p-8 flex flex-col ${service.isMain ? "md:scale-105 border-blue-500/30" : ""}`}
            >
              {service.isMain && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold tracking-wider whitespace-nowrap">
                  PRIMÆR GUDSTJENESTE
                </div>
              )}

              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 sm:mb-6 shadow-xl`}>
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                {service.day}
              </span>

              <h3 className="text-white font-bold text-xl sm:text-2xl mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{service.description}</p>

              <div className="space-y-2 sm:space-y-3 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-slate-300">{service.time}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{service.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stream note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 md:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl glass border border-blue-500/20">
            <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span className="text-slate-300 text-sm">
              Kan du ikke være med fysisk?{" "}
              <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2">
                Følg os live på Facebook
              </a>
              {" "}— hver søndag
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
