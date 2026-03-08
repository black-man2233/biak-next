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

const catColors: Record<string, { text: string; bg: string; border: string }> = {
  service: { text: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/20" },
  prayer:  { text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  youth:   { text: "text-sky-400",    bg: "bg-sky-500/10",    border: "border-sky-500/20" },
  general: { text: "text-slate-400",  bg: "bg-slate-500/10",  border: "border-slate-500/20" },
};
const catLabels: Record<string, string> = {
  service: "Gudstjeneste", prayer: "Bøn", youth: "Unge", general: "Generelt",
};

export function EventsPreview({ events }: { events: Event[] }) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/35" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.04] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 gap-4 flex-wrap"
        >
          <div>
            <span className="section-label mb-4 block w-fit">Kalender</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Kommende <span className="gradient-text">Events</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium"
          >
            Se alle
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-14 text-center"
          >
            <Calendar className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Ingen kommende events på nuværende tidspunkt.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.slice(0, 3).map((event, i) => {
              const date = new Date(event.date);
              const cat = catColors[event.category] ?? catColors.general;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="card overflow-hidden flex flex-col group"
                >
                  {/* Image or accent bar */}
                  {event.imageUrl ? (
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-1.5 bg-gradient-to-r from-cyan-500/60 via-blue-500/40 to-cyan-400/60" />
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    {/* Date + category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-center min-w-[2.5rem]">
                          <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider leading-none">
                            {date.toLocaleDateString("da-DK", { month: "short" })}
                          </p>
                          <p className="text-2xl font-black text-white leading-tight">{date.getDate()}</p>
                        </div>
                        <div className="w-px h-9 bg-white/[0.07]" />
                        <p className="text-slate-500 text-xs capitalize">
                          {date.toLocaleDateString("da-DK", { weekday: "long" })}
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${cat.bg} ${cat.text} ${cat.border}`}>
                        {catLabels[event.category] ?? event.category}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-cyan-100 transition-colors duration-200">
                      {event.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 pt-4 border-t border-white/[0.05]">
                      {event.startTime && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3 flex-shrink-0 text-slate-600" />
                          {event.startTime}{event.endTime ? ` – ${event.endTime}` : ""}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="w-3 h-3 flex-shrink-0 text-slate-600" />
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
