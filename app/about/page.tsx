"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Users, Globe, BookOpen, Shield, Star, Cross } from "lucide-react";
import Link from "next/link";

const beliefs = [
  { icon: BookOpen, title: "Bibelens Autoritet", desc: "Vi tror at Bibelen er Guds inspirerede og ufejlbarlige ord." },
  { icon: Star, title: "Treenighed", desc: "Vi tror på én Gud i tre personer — Fader, Søn og Helligånd." },
  { icon: Heart, title: "Frelse i Kristus", desc: "Frelse sker alene ved tro på Jesus Kristus." },
  { icon: Zap, title: "Helligåndens Kraft", desc: "Vi tror på Helligåndens indboende kraft og nådegaver." },
  { icon: Shield, title: "Guddommelig Helbredelse", desc: "Guddommelig helbredelse er del af Jesu forsoning." },
  { icon: Globe, title: "Kristi Genkomst", desc: "Vi ser frem til Jesu Kristi snarlige genkomst." },
];

const timeline = [
  { year: "Grundlagt", title: "BIAK åbnede dørene", desc: "Brønderslev International Apostolsk Kirke begyndte med en vision om at nå mennesker fra alle nationer." },
  { year: "Vækst", title: "Internationalt fællesskab", desc: "Menigheden voksede til at inkludere folk fra over 10 nationaliteter med tolkning på 4 sprog." },
  { year: "I Dag", title: "Levende menighed", desc: "BIAK er i dag et blomstrende fællesskab med søndagsgudstjenester, bøn og ungdomsarbejde." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 animated-bg" />
        <div className="hero-glow w-[500px] h-[500px] bg-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-6">
              Om Os
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
              Hvem er <span className="gradient-text">BIAK?</span>
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed max-w-3xl mx-auto">
              BIAK — Brønderslev International Apostolsk Kirke — er et levende kristent fællesskab
              dedikeret til at åbenbare Guds kærlighed og demonstrere Hans kraft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Mission</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-6">
                At Åbenbare Guds Kærlighed &{" "}
                <span className="gradient-text">Demonstrere Hans Kraft</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Vores mission er baseret på Markus 12:30 — at elske Gud af hele vores hjerte, sjæl,
                sind og kræfter. Denne kærlighed deler vi med alle, vi møder.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Vi inviterer mennesker til at opleve et levende kristent fællesskab, der er forpligtet
                til at udtrykke Guds kraft og kærlighed til alle mennesker.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              {[
                { icon: Users, label: "Forbinde", desc: "Mennesker med Gud og hinanden" },
                { icon: Zap, label: "Udruste", desc: "Mennesker til at leve i deres gudgivne kald" },
                { icon: Globe, label: "Nå Ud", desc: "Lokalt og globalt med evangeliet" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{item.label}</h3>
                    <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pastors */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-4">
              Lederskab
            </span>
            <h2 className="text-4xl font-black text-white">Vores <span className="gradient-text">Pastorer</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                initial: "M",
                name: "Pastor Martin Mutale",
                role: "Sognepastor",
                color: "from-blue-500 to-indigo-700",
                desc: "Martin har en kandidatgrad i teologi fra Harvest Bible College i Australien og er uddannet fra Kaniki Bible University College i Zambia. Han leder menigheden med visdom, passion og dyb kærlighed til Gud og mennesker. Sammen med Ruth har han fire børn.",
              },
              {
                initial: "R",
                name: "Pastor Ruth Mutale",
                role: "Sognepastor & Kvindeleder",
                color: "from-sky-500 to-blue-700",
                desc: "Ruth leder kvindegruppen og tilbedelsesholdet. Med sit hjerte for tilbedelse og hendes evne til at inspirere og bygge op, er hun en central og elsket del af BIAK. Hun brænder for at se kvinder vokse i troen.",
              },
            ].map((pastor, i) => (
              <motion.div
                key={pastor.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${pastor.color} flex items-center justify-center text-4xl font-black text-white shadow-xl`}>
                    {pastor.initial}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">{pastor.name}</h3>
                    <p className="text-blue-400 text-sm mt-1">{pastor.role}</p>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">{pastor.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-4">
              Tro
            </span>
            <h2 className="text-4xl font-black text-white">Hvad vi <span className="gradient-text">Tror På</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((belief, i) => (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mb-4">
                  <belief.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{belief.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{belief.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-white mb-4">Kom og <span className="gradient-text">Mød Os</span></h2>
            <p className="text-slate-400 mb-8">Søndage kl. 10:30 — Kirkevej 10, 9700 Brønderslev</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="btn-primary">Kontakt Os</Link>
              <Link href="/events" className="px-6 py-3 rounded-lg glass border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
                Se Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
