"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Kom og mød os</p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            Klar til at <span className="gradient-text">Møde Gud?</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Uanset om du er nysgerrig, søgende eller allerede troende —
            du er altid velkommen. Kom og mød os en søndag.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link href="/contact" className="btn-primary w-full sm:w-auto justify-center">
              Kontakt Os <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem] rounded-[10px] border border-white/10 text-slate-300 text-sm font-medium hover:border-white/20 hover:text-white transition-all"
            >
              Se Alle Events
            </Link>
          </div>

          {/* Contact shortcuts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500">
            <a href="tel:+4526161439" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Phone className="w-3.5 h-3.5" /> +45 26 16 14 39
            </a>
            <a href="mailto:info@biak.dk" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Mail className="w-3.5 h-3.5" /> info@biak.dk
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Kirkevej 10, Brønderslev
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
