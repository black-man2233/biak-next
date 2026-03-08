"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Music, Users, Heart, ArrowRight, Instagram, Facebook } from "lucide-react";

const activities = [
  { icon: Music, title: "Tilbedelse", desc: "Vi elsker at tilbede Gud med moderne musik og lovsange der rammer hjertet." },
  { icon: Users, title: "Fællesskab", desc: "Stærke venskaber og en tryg gruppe, hvor alle hører til og er velkomne." },
  { icon: Heart, title: "Tro i Praksis", desc: "Vi lærer hvad det vil sige at leve som kristen ung i dag." },
  { icon: Star, title: "Sjov & Aktiviteter", desc: "Lege, udflugter og arrangementer — fordi trosliv også er glæde." },
];

export default function YouthPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 animated-bg" />
        <div className="hero-glow w-[500px] h-[500px] bg-sky-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="text-6xl mb-6">⚡</div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-sky-400 border border-sky-500/30 bg-sky-500/10 uppercase mb-6">
              Unge
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
              BIAK <span className="gradient-text">Unge</span>
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Et ungdomsfællesskab der brænder for Gud, hinanden og verden.
              Sjov, dybde og ægte venskaber — det er det vi vil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meeting info */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 text-center relative overflow-hidden"
          >
            <div className="shimmer absolute inset-0" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-2">Ungdomsmøde</h2>
              <p className="text-blue-400 font-semibold mb-6">Én fredag om måneden</p>
              <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
                <div>
                  <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Tid</p>
                  <p className="text-white font-bold text-xl">18:00 – 20:00</p>
                </div>
                <div className="hidden sm:block w-px bg-white/10" />
                <div>
                  <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Sted</p>
                  <p className="text-white font-bold text-xl">Kirkevej 10, Brønderslev</p>
                </div>
                <div className="hidden sm:block w-px bg-white/10" />
                <div>
                  <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Alder</p>
                  <p className="text-white font-bold text-xl">Alle unge</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Følg os på{" "}
                <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                  Facebook
                </a>{" "}
                eller Instagram for at holde dig opdateret om næste ungdomsmøde.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white">Hvad vi <span className="gradient-text">Laver</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((act, i) => (
              <motion.div
                key={act.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-xl">
                  <act.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">{act.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{act.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social & CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Hold dig <span className="gradient-text">Opdateret</span>
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Ungdomsmøderne annonceres på vores sociale medier. Følg os for ikke at gå glip af næste møde.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <a
                href="https://facebook.com/biakdk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                Følg på Facebook
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg glass border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
              >
                Kontakt Os
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
