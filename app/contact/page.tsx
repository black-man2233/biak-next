"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Clock, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const contactItems = [
    { icon: MapPin, label: "Adresse", value: "Kirkevej 10, 9700 Brønderslev", href: "https://maps.google.com/?q=Kirkevej+10+9700+Brønderslev" },
    { icon: Phone, label: "Telefon", value: "+45 26 16 14 39", href: "tel:+4526161439" },
    { icon: Mail, label: "Email", value: "info@biak.dk", href: "mailto:info@biak.dk" },
    { icon: Facebook, label: "Facebook", value: "BIAK Church", href: "https://facebook.com/biakdk" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 animated-bg" />
        <div className="hero-glow w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 uppercase mb-6">
              Kontakt
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
              Kom i <span className="gradient-text">Kontakt</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">Vi hører gerne fra dig — skriv, ring eller mød os søndag</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Kontaktoplysninger</h2>
              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="glass-card p-4 sm:p-5 flex items-start gap-4 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Hours */}
              <div className="glass-card p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-bold">Mødetider</h3>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { day: "Søndag", time: "10:30 – 12:30", label: "Gudstjeneste" },
                    { day: "Onsdag", time: "18:30 – 20:00", label: "Bøn & Bibel" },
                    { day: "Fredag", time: "18:00 – 20:00", label: "Ungdomsmøde (månedligt)" },
                  ].map((s) => (
                    <div key={s.day} className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-slate-300 font-medium">{s.day}</span>
                        <span className="text-slate-500 ml-2 text-xs">{s.label}</span>
                      </div>
                      <span className="text-blue-400 font-medium flex-shrink-0">{s.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Send os en besked</h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-10 sm:p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-2">Besked Sendt!</h3>
                  <p className="text-slate-400">
                    Tak for din henvendelse. Vi vender tilbage til dig hurtigst muligt.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-6 text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    Send en ny besked
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Navn</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Dit fulde navn"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="din@email.dk"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Besked</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Skriv din besked her..."
                      className="form-input resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Besked
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Google Maps embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-12"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ height: "320px" }}>
              <iframe
                src="https://maps.google.com/maps?q=Kirkevej+10,+9700+Br%C3%B8nderslev,+Denmark&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BIAK placering"
              />
            </div>
            <p className="text-center mt-3">
              <a
                href="https://maps.google.com/?q=Kirkevej+10+9700+Brønderslev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                Åbn i Google Maps
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
