"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/about",    label: "Om Os" },
  { href: "/events",   label: "Events" },
  { href: "/youth",    label: "Unge" },
  { href: "/sermons",  label: "Prædikener" },
  { href: "/contact",  label: "Kontakt Os" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-slate-950 overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-400/15 blur-lg scale-150 group-hover:bg-cyan-400/25 transition-all duration-300" />
                <Image
                  src="/biak-logo.svg"
                  alt="BIAK Logo"
                  width={28}
                  height={34}
                  className="relative drop-shadow-[0_0_6px_rgba(6,182,212,0.45)]"
                  unoptimized
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white">BIAK</span>
                <p className="text-xs text-cyan-300/70 leading-none">Brønderslev International Apostolsk Kirke</p>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
              Inspiring people to experience God and imitate Jesus. A living Christian fellowship
              committed to expressing God&apos;s power and love.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com/biakdk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/[0.06] transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-400 transition-all duration-200 overflow-hidden" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-slate-500 text-sm leading-relaxed">
                  Kirkevej 10<br />9700 Brønderslev<br />Danmark
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400/70 flex-shrink-0" />
                <a href="tel:+4526161439" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200">
                  +45 26 16 14 39
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400/70 flex-shrink-0" />
                <a href="mailto:info@biak.dk" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200">
                  info@biak.dk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} BIAK — Brønderslev International Apostolsk Kirke.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-xl glass border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
