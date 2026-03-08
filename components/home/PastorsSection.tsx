"use client";

import { motion } from "framer-motion";

const pastors = [
  {
    initial: "M",
    name: "Pastor Martin Mutale",
    role: "Sognepastor",
    bio: "Martin har en kandidatgrad i teologi fra Harvest Bible College i Australien og er uddannet fra Kaniki Bible University College i Zambia. Han leder menigheden med visdom og dyb kærlighed til Gud og mennesker.",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-blue-600",
    delay: 0,
  },
  {
    initial: "R",
    name: "Pastor Ruth Mutale",
    role: "Sognepastor & Kvindeleder",
    bio: "Ruth leder kvindegruppen og tilbedelsesholdet. Med sit hjerte for tilbedelse og evnen til at inspirere er hun en elsket og central del af BIAK. Hun brænder for at se kvinder vokse i troen.",
    gradientFrom: "from-sky-500",
    gradientTo: "to-indigo-600",
    delay: 0.12,
  },
];

export function PastorsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/[0.04] blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 mx-auto block w-fit">Lederskab</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Mød Vores <span className="gradient-text">Pastorer</span>
          </h2>
        </motion.div>

        {/* Pastor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-8">
          {pastors.map((p) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: p.delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="card p-7 flex gap-5 group"
            >
              {/* Circular avatar with animated gradient ring */}
              <div className="relative flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18">
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${p.gradientFrom} ${p.gradientTo} animate-spin-slow opacity-70 blur-[1px]`}
                />
                <div className="absolute inset-[2px] rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-2xl font-black text-white">{p.initial}</span>
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-cyan-100 transition-colors duration-200">
                  {p.name}
                </h3>
                <p className="text-cyan-400 text-xs font-semibold mt-1 mb-3 uppercase tracking-wide">{p.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{p.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="max-w-4xl mx-auto relative"
        >
          <div className="card p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.04] via-transparent to-blue-500/[0.04] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            <div className="text-5xl text-cyan-500/20 font-black leading-none mb-3 select-none">&ldquo;</div>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed italic font-medium max-w-2xl mx-auto">
              Vi ønsker at inspirere mennesker til at opleve Gud og efterligne Jesus
              — i et fællesskab, der er fuld af Guds kraft og kærlighed.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/40" />
              <p className="text-slate-500 text-sm font-medium">Martin & Ruth Mutale</p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/40" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
