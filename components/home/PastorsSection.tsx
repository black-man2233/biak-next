"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function PastorsSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-4">
            Lederskab
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Mød Vores <span className="gradient-text">Pastorer</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-4xl mx-auto">
          {/* Martin */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-xl shadow-blue-500/20 flex-shrink-0">
                M
              </div>
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl">Pastor Martin Mutale</h3>
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
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-xl shadow-sky-500/20 flex-shrink-0">
                R
              </div>
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl">Pastor Ruth Mutale</h3>
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
          className="mt-10 sm:mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="glass-card p-8 sm:p-10 relative">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500/40 absolute top-5 sm:top-6 left-5 sm:left-6" />
            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-200 leading-relaxed italic">
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
