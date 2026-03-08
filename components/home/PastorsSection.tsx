"use client";

import { motion } from "framer-motion";

const pastors = [
  {
    initial: "M",
    name: "Pastor Martin Mutale",
    role: "Sognepastor",
    bio: "Martin har en kandidatgrad i teologi fra Harvest Bible College i Australien og er uddannet fra Kaniki Bible University College i Zambia. Han leder menigheden med visdom og dyb kærlighed til Gud og mennesker.",
    color: "from-cyan-600 to-blue-700",
  },
  {
    initial: "R",
    name: "Pastor Ruth Mutale",
    role: "Sognepastor & Kvindeleder",
    bio: "Ruth leder kvindegruppen og tilbedelsesholdet. Med sit hjerte for tilbedelse og evnen til at inspirere er hun en elsket og central del af BIAK. Hun brænder for at se kvinder vokse i troen.",
    color: "from-sky-600 to-blue-700",
  },
];

export function PastorsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 mx-auto block w-fit">Lederskab</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Mød Vores <span className="gradient-text">Pastorer</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {pastors.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="card p-7 flex gap-5"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl font-black text-white flex-shrink-0`}>
                {p.initial}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{p.name}</h3>
                <p className="text-cyan-400 text-xs font-medium mt-0.5 mb-3">{p.role}</p>
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
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-4xl mx-auto card p-8 md:p-10 text-center accent-border-l"
          style={{ borderLeft: "3px solid #06b6d4" }}
        >
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed italic font-medium">
            &ldquo;Vi ønsker at inspirere mennesker til at opleve Gud og efterligne Jesus
            — i et fællesskab, der er fuld af Guds kraft og kærlighed.&rdquo;
          </p>
          <p className="text-slate-500 text-sm mt-4">— Martin & Ruth Mutale</p>
        </motion.div>

      </div>
    </section>
  );
}
