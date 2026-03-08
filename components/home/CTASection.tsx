"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute inset-0 dot-grid opacity-[0.12]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/[0.07] blur-[160px] animate-glow-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-blue-600/[0.07] blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Gradient border container */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Animated gradient border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-cyan-500/30 via-blue-500/10 to-cyan-400/30 opacity-80" />

          <div className="relative rounded-3xl bg-[#020617]/95 backdrop-blur-sm p-10 md:p-16 text-center overflow-hidden">
            {/* Subtle inner glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/[0.06] blur-3xl rounded-full pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <span className="section-label mx-auto mb-6 block w-fit">Kom og mød os</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight"
            >
              Klar til at{" "}
              <span className="gradient-text">Møde Gud?</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            >
              Uanset om du er nysgerrig, søgende eller allerede troende —
              du er altid velkommen. Kom og mød os en søndag.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.38 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
            >
              <Link href="/contact" className="btn-primary w-full sm:w-auto justify-center group">
                Kontakt Os
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/events"
                className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-[1.6rem] py-[0.72rem] rounded-[10px] border border-white/10 text-slate-300 text-sm font-medium hover:border-cyan-500/30 hover:text-white hover:bg-cyan-500/[0.04] transition-all duration-200"
              >
                Se Alle Events
              </Link>
            </motion.div>

            {/* Contact shortcuts */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.48 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500"
            >
              <a href="tel:+4526161439" className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-200">
                <Phone className="w-3.5 h-3.5" /> +45 26 16 14 39
              </a>
              <a href="mailto:info@biak.dk" className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-200">
                <Mail className="w-3.5 h-3.5" /> info@biak.dk
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Kirkevej 10, Brønderslev
              </span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
