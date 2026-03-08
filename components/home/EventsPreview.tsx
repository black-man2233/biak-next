"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string | null;
  endTime: string | null;
  location: string;
  category: string;
  imageUrl: string | null;
}

const categoryColors: Record<string, string> = {
  service: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  prayer: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  youth: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  general: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

const categoryLabels: Record<string, string> = {
  service: "Gudstjeneste",
  prayer: "Bøn",
  youth: "Unge",
  general: "Generelt",
};

export function EventsPreview({ events }: { events: Event[] }) {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60" />
      <div className="hero-glow w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-indigo-600 bottom-0 left-1/4 opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 md:mb-16 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-3 sm:mb-4">
              Kalender
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Kommende <span className="gradient-text">Events</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm sm:text-base flex-shrink-0"
          >
            Se alle events <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {events.length === 0 ? (
          <div className="glass-card p-10 sm:p-12 text-center">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Ingen kommende events på nuværende tidspunkt.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {events.slice(0, 3).map((event, i) => {
              const date = new Date(event.date);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
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
                    {/* Date strip */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center flex-shrink-0 p-2">
                        <span className="text-white text-xs font-bold uppercase leading-none">
                          {date.toLocaleDateString("da-DK", { month: "short" })}
                        </span>
                        <span className="text-white text-xl sm:text-2xl font-black leading-none mt-0.5">
                          {date.getDate()}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[event.category] || categoryColors.general}`}>
                        {categoryLabels[event.category] || event.category}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{event.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-slate-400">
                      {event.startTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                          <span>{event.startTime}{event.endTime ? ` – ${event.endTime}` : ""}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
