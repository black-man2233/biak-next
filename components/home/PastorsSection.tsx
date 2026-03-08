"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function PastorsSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="hero-glow w-[500px] h-[500px] bg-blue-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-8" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-4">
            Lederskab
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Mød Vores <span className="gradient-text">Pastorer</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Martin */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-blue-500/20">
                M
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Pastor Martin Mutale</h3>
                <p className="text-blue-400 text-sm">Sognepastor</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Martin har en kandidatgrad i teologi fra Harvest Bible College i Australien og er uddannet fra
              Kaniki Bible University College i Zambia. Han leder menigheden med passion og visdom.
            </p>
          </motion.div>

          {/* Ruth */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-sky-500/20">
                R
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Pastor Ruth Mutale</h3>
                <p className="text-blue-400 text-sm">Sognepastor & Kvindeleder</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ruth leder kvindegruppen og tilbedelsesholdet med hjerte og kraft. Hun er en inspirerende
              leder der hjælper kvinder til at vokse i troen og finde deres kald.
            </p>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="glass-card p-10 relative">
            <Quote className="w-10 h-10 text-blue-500/40 absolute top-6 left-6" />
            <blockquote className="text-xl sm:text-2xl font-medium text-slate-200 leading-relaxed italic">
              &quot;Vi ønsker at inspirere mennesker til at opleve Gud og efterligne Jesus
              — i et fællesskab, der er fuld af Guds kraft og kærlighed.&quot;
            </blockquote>
            <p className="text-blue-400 text-sm mt-4 font-semibold">— Martin & Ruth Mutale</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
