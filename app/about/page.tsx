"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Users, Globe, BookOpen, Shield, Star } from "lucide-react";
import Link from "next/link";

const beliefs = [
  { icon: BookOpen, title: "Bibelens Autoritet",   desc: "Vi tror at Bibelen er Guds inspirerede og ufejlbarlige ord." },
  { icon: Star,     title: "Treenighed",            desc: "Vi tror på én Gud i tre personer — Fader, Søn og Helligånd." },
  { icon: Heart,    title: "Frelse i Kristus",      desc: "Frelse sker alene ved tro på Jesus Kristus." },
  { icon: Zap,      title: "Helligåndens Kraft",    desc: "Vi tror på Helligåndens indboende kraft og nådegaver." },
  { icon: Shield,   title: "Guddommelig Helbredelse", desc: "Guddommelig helbredelse er del af Jesu forsoning." },
  { icon: Globe,    title: "Kristi Genkomst",       desc: "Vi ser frem til Jesu Kristi snarlige genkomst." },
];

function PageHeader({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle: string }) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden animated-bg">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="section-label mb-5 mx-auto block w-fit">{label}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">{title}</h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader
        label="Om Os"
        title={<>Hvem er <span className="gradient-text">BIAK?</span></>}
        subtitle="BIAK — Brønderslev International Apostolsk Kirke — er et levende kristent fællesskab dedikeret til at åbenbare Guds kærlighed og demonstrere Hans kraft."
      />

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Mission</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-2 mb-5 leading-tight">
                At Åbenbare Guds Kærlighed &{" "}
                <span className="gradient-text">Demonstrere Hans Kraft</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4 text-sm sm:text-base">
                Vores mission er baseret på Markus 12:30 — at elske Gud af hele vores hjerte, sjæl,
                sind og kræfter. Denne kærlighed deler vi med alle, vi møder.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Vi inviterer mennesker til at opleve et levende kristent fællesskab, der er forpligtet
                til at udtrykke Guds kraft og kærlighed til alle mennesker.
              </p>
            </motion.div>

            <div className="space-y-3">
              {[
                { icon: Users, label: "Forbinde",  desc: "Mennesker med Gud og hinanden" },
                { icon: Zap,   label: "Udruste",   desc: "Mennesker til at leve i deres gudgivne kald" },
                { icon: Globe, label: "Nå Ud",     desc: "Lokalt og globalt med evangeliet" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{item.label}</h3>
                    <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pastors */}
      <section className="py-20 md:py-28 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-label mb-4 mx-auto block w-fit">Lederskab</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Vores <span className="gradient-text">Pastorer</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { initial: "M", name: "Pastor Martin Mutale", role: "Sognepastor", color: "from-cyan-600 to-blue-700",
                desc: "Martin har en kandidatgrad i teologi fra Harvest Bible College i Australien og er uddannet fra Kaniki Bible University College i Zambia. Han leder menigheden med visdom, passion og dyb kærlighed til Gud og mennesker. Sammen med Ruth har han fire børn." },
              { initial: "R", name: "Pastor Ruth Mutale", role: "Sognepastor & Kvindeleder", color: "from-sky-600 to-blue-700",
                desc: "Ruth leder kvindegruppen og tilbedelsesholdet. Med sit hjerte for tilbedelse og hendes evne til at inspirere og bygge op, er hun en central og elsket del af BIAK. Hun brænder for at se kvinder vokse i troen." },
            ].map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-7 flex gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl font-black text-white flex-shrink-0`}>{p.initial}</div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{p.name}</h3>
                  <p className="text-cyan-400 text-xs font-medium mt-0.5 mb-3">{p.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="py-20 md:py-28 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-label mb-4 mx-auto block w-fit">Tro</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Hvad vi <span className="gradient-text">Tror På</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {beliefs.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1.5">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-[#020617]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-white mb-3">Kom og <span className="gradient-text">Mød Os</span></h2>
            <p className="text-slate-500 text-sm mb-8">Søndage kl. 10:30 — Kirkevej 10, 9700 Brønderslev</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/contact" className="btn-primary justify-center">Kontakt Os</Link>
              <Link href="/events" className="inline-flex items-center justify-center px-[1.6rem] py-[0.68rem] rounded-[10px] border border-white/10 text-slate-300 text-sm font-medium hover:border-white/20 hover:text-white transition-all">
                Se Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
