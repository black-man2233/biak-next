"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Filter } from "lucide-react";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string | null;
  endTime: string | null;
  location: string;
  category: string;
  isRecurring: boolean;
  recurringDay: string | null;
  imageUrl: string | null;
}

const categoryColors: Record<string, string> = {
  service: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  prayer: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  youth: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  general: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

const categoryLabels: Record<string, string> = {
  all: "Alle",
  service: "Gudstjeneste",
  prayer: "Bøn",
  youth: "Unge",
  general: "Generelt",
};

const catGradients: Record<string, string> = {
  service: "from-blue-600 to-indigo-700",
  prayer: "from-indigo-500 to-blue-700",
  youth: "from-sky-500 to-blue-600",
  general: "from-slate-600 to-slate-700",
};

export function EventsClient({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? events : events.filter((e) => e.category === filter);
  const categories = ["all", ...Array.from(new Set(events.map((e) => e.category)))];

  const upcoming = filtered.filter((e) => new Date(e.date) >= new Date());
  const past = filtered.filter((e) => new Date(e.date) < new Date());

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 animated-bg" />
        <div className="hero-glow w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-6">
              Kalender
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
              Vores <span className="gradient-text">Events</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">Alle gudstjenester, møder og arrangementer på ét sted</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 sm:py-6 bg-slate-900/80 border-b border-white/5 sticky top-[72px] sm:top-20 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "glass text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div className="mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Kommende
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                <AnimatePresence>
                  {upcoming.map((event, i) => {
                    const date = new Date(event.date);
                    return (
                      <motion.div
                        key={event.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.06 }}
                        className="glass-card flex flex-col overflow-hidden"
                      >
                        {/* Event image */}
                        {event.imageUrl && (
                          <div className="w-full h-44 overflow-hidden">
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="p-5 sm:p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 sm:gap-4 mb-4 flex-wrap">
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${catGradients[event.category] || catGradients.general} flex flex-col items-center justify-center flex-shrink-0 shadow-xl p-1.5`}>
                              <span className="text-white text-xs font-bold leading-none">
                                {date.toLocaleDateString("da-DK", { month: "short" })}
                              </span>
                              <span className="text-white text-lg sm:text-xl font-black leading-none">{date.getDate()}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[event.category] || categoryColors.general}`}>
                                {categoryLabels[event.category] || event.category}
                              </span>
                              {event.isRecurring && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium border border-green-500/30 bg-green-500/10 text-green-300">
                                  Tilbagevendende
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{event.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{event.description}</p>

                          <div className="space-y-2 text-sm">
                            {event.startTime && (
                              <div className="flex items-center gap-2 text-slate-400">
                                <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                                {event.startTime}{event.endTime ? ` – ${event.endTime}` : ""}
                              </div>
                            )}
                            <div className="flex items-start gap-2 text-slate-400">
                              <MapPin className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Past */}
          {past.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-500 mb-6 sm:mb-8">Tidligere</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 opacity-60">
                {past.map((event, i) => {
                  const date = new Date(event.date);
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-card p-5 sm:p-6"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span className="text-slate-500 text-sm">
                          {date.toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      </div>
                      <h3 className="text-slate-400 font-bold text-lg mb-1">{event.title}</h3>
                      <p className="text-slate-600 text-sm">{event.location}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 sm:py-20">
              <Calendar className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Ingen events at vise.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
