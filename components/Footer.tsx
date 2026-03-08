"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Church, MapPin, Phone, Mail, Facebook, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/10 bg-slate-950">
      {/* Glow line */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Church className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">BIAK</span>
                <p className="text-xs text-blue-300">Brønderslev International Apostolsk Kirke</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Inspiring people to experience God and imitate Jesus. A living Christian fellowship
              committed to expressing God&apos;s power and love.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/biakdk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-400/30 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "Om Os" },
                { href: "/events", label: "Events" },
                { href: "/youth", label: "Unge" },
                { href: "/sermons", label: "Prædikener" },
                { href: "/contact", label: "Kontakt Os" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  Kirkevej 10<br />9700 Brønderslev<br />Danmark
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+4526161439" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                  +45 26 16 14 39
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@biak.dk" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                  info@biak.dk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} BIAK — Brønderslev International Apostolsk Kirke. Alle rettigheder forbeholdes.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all hover:-translate-y-1"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
