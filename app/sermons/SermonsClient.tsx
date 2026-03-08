"use client";

import { motion } from "framer-motion";
import { Play, Calendar, User, Video } from "lucide-react";

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  videoUrl: string | null;
  description: string | null;
}

export function SermonsClient({ sermons }: { sermons: Sermon[] }) {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-bg" />
        <div className="hero-glow w-[400px] h-[400px] bg-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-6">
              Prædikener
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              Guds <span className="gradient-text">Ord</span>
            </h1>
            <p className="text-slate-300 text-lg">Lyt til og se vores søndagsprædikener</p>
          </motion.div>
        </div>
      </section>

      {/* Live Stream info */}
      <section className="py-10 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0 shadow-xl shadow-red-500/20">
              <Video className="w-7 h-7 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-xl mb-1">Live Stream</h3>
              <p className="text-slate-400 text-sm">
                Søndagsgudstjenester streames live på Facebook — kl. 10:30 hver søndag.{" "}
                <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                  Følg os på Facebook
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sermons */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sermons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Play className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <h3 className="text-white font-bold text-2xl mb-2">Prædikener kommer snart</h3>
              <p className="text-slate-500">Se os live på Facebook eller kom til gudstjeneste søndag kl. 10:30</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon, i) => {
                const date = new Date(sermon.date);
                return (
                  <motion.div
                    key={sermon.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card p-6 flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="w-full h-40 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center mb-4 relative overflow-hidden group">
                      {sermon.videoUrl ? (
                        <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-blue-600/80 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </a>
                      ) : (
                        <Play className="w-10 h-10 text-slate-600" />
                      )}
                    </div>

                    <h3 className="text-white font-bold text-lg mb-2">{sermon.title}</h3>
                    {sermon.description && (
                      <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-2">{sermon.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-400" />
                        {sermon.speaker}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        {date.toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>

                    {sermon.videoUrl && (
                      <a
                        href={sermon.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all text-sm font-medium"
                      >
                        <Play className="w-4 h-4" />
                        Se Prædiken
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
