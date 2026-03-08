"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Music, Users, Heart, ArrowRight, Facebook, Clock, MapPin } from "lucide-react";

const activities = [
  { icon: Music,  title: "Tilbedelse",        desc: "Vi elsker at tilbede Gud med moderne musik og lovsange der rammer hjertet." },
  { icon: Users,  title: "Fællesskab",        desc: "Stærke venskaber og en tryg gruppe, hvor alle hører til og er velkomne." },
  { icon: Heart,  title: "Tro i Praksis",     desc: "Vi lærer hvad det vil sige at leve som kristen ung i dag." },
  { icon: Star,   title: "Sjov & Aktiviteter",desc: "Lege, udflugter og arrangementer — fordi trosliv også er glæde." },
];

export default function YouthPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden animated-bg">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label mb-5 mx-auto block w-fit">Unge</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              BIAK <span className="gradient-text">Unge</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Et ungdomsfællesskab der brænder for Gud, hinanden og verden.
              Sjov, dybde og ægte venskaber.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meeting info */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Ungdomsmøde</h2>
            <p className="text-cyan-400 text-sm font-medium mb-7">Én fredag om måneden</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 pb-6 border-b border-white/[0.06]">
              {[
                { icon: Clock,   label: "Tid",   value: "18:00 – 20:00" },
                { icon: MapPin,  label: "Sted",  value: "Kirkevej 10, Brønderslev" },
                { icon: Users,   label: "Alder", value: "Alle unge" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">{item.label}</p>
                    <p className="text-white font-semibold text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-slate-500 text-sm">
              Følg os på{" "}
              <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Facebook
              </a>{" "}
              for at holde dig opdateret om næste ungdomsmøde.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 md:py-28 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-label mb-4 mx-auto block w-fit">Program</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Hvad vi <span className="gradient-text">Laver</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {activities.map((act, i) => (
              <motion.div key={act.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center flex-shrink-0">
                  <act.icon className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{act.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{act.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-slate-900/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-white mb-4">Hold dig <span className="gradient-text">Opdateret</span></h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Ungdomsmøderne annonceres på vores sociale medier. Følg os for ikke at gå glip af næste møde.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
                <Facebook className="w-4 h-4" /> Følg på Facebook
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-[1.6rem] py-[0.68rem] rounded-[10px] border border-white/10 text-slate-300 text-sm font-medium hover:border-white/20 hover:text-white transition-all">
                Kontakt Os <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
