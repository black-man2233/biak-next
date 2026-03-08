"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Megaphone, BookOpen, Plus, ArrowRight, Clock, MapPin } from "lucide-react";

interface Stats {
  eventCount: number;
  announcementCount: number;
  sermonCount: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string | null;
  location: string;
  category: string;
}

export function DashboardClient({
  stats,
  upcomingEvents,
  userName,
}: {
  stats: Stats;
  upcomingEvents: Event[];
  userName: string;
}) {
  const statCards = [
    { label: "Events", value: stats.eventCount, icon: Calendar, color: "from-blue-600 to-indigo-700", href: "/admin/events" },
    { label: "Aktive Meddelelser", value: stats.announcementCount, icon: Megaphone, color: "from-sky-500 to-blue-600", href: "/admin/announcements" },
    { label: "Prædikener", value: stats.sermonCount, icon: BookOpen, color: "from-indigo-500 to-blue-700", href: "/admin/sermons" },
  ];

  const quickActions = [
    { label: "Tilføj Event", href: "/admin/events?new=1", icon: Calendar, color: "from-blue-600 to-indigo-700" },
    { label: "Ny Meddelelse", href: "/admin/announcements?new=1", icon: Megaphone, color: "from-sky-500 to-blue-600" },
    { label: "Upload Prædiken", href: "/admin/sermons?new=1", icon: BookOpen, color: "from-indigo-500 to-blue-700" },
  ];

  return (
    <div className="p-6 lg:p-10 min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-black text-white">
          Goddag, <span className="gradient-text">{userName}</span> 👋
        </h1>
        <p className="text-slate-400 mt-1">Velkommen til BIAK administratorpanelet</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={card.href} className="glass-card p-6 flex items-center gap-4 cursor-pointer block">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-xl flex-shrink-0`}>
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">{card.label}</p>
                <p className="text-3xl font-black text-white">{card.value}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Kommende Events</h2>
            <Link href="/admin/events" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
              Se alle <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card divide-y divide-white/5">
            {upcomingEvents.length === 0 ? (
              <div className="p-8 text-center text-slate-500">Ingen kommende events</div>
            ) : (
              upcomingEvents.map((event) => {
                const date = new Date(event.date);
                return (
                  <div key={event.id} className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold leading-none">
                        {date.toLocaleDateString("da-DK", { month: "short" })}
                      </span>
                      <span className="text-white text-lg font-black leading-none">{date.getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{event.title}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        {event.startTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {event.startTime}
                          </span>
                        )}
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Hurtige Handlinger</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="glass-card p-4 flex items-center gap-4 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium flex-1">{action.label}</span>
                <Plus className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>

          {/* Website link */}
          <div className="mt-6 glass-card p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Hjemmeside</p>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
            >
              Se biak.dk <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
