"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 animated-bg opacity-70" />
      <div className="hero-glow w-[600px] h-[600px] bg-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-8 shadow-2xl shadow-blue-500/30">
            <span className="text-4xl">🙏</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Klar til at{" "}
            <span className="gradient-text">Møde Gud?</span>
          </h2>

          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Uanset om du er nysgerrig, søgende, eller allerede troende —
            du er velkommen her. Kom og mød os en søndag.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/contact" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
              Kontakt Os
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/events" className="flex items-center gap-2 px-8 py-4 rounded-lg glass border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
              Se Alle Events
            </Link>
          </div>

          {/* Contact shortcuts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="tel:+4526161439" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm">
              <Phone className="w-4 h-4" />
              +45 26 16 14 39
            </a>
            <span className="hidden sm:block w-px h-4 bg-slate-700" />
            <a href="mailto:info@biak.dk" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm">
              <Mail className="w-4 h-4" />
              info@biak.dk
            </a>
            <span className="hidden sm:block w-px h-4 bg-slate-700" />
            <span className="text-slate-400 text-sm">
              📍 Kirkevej 10, 9700 Brønderslev
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
