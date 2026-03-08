"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/",          label: "Hjem" },
  { href: "/about",     label: "Om Os" },
  { href: "/events",    label: "Events" },
  { href: "/youth",     label: "Unge" },
  { href: "/sermons",   label: "Prædikener" },
  { href: "/contact",   label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (isAdmin) return null;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 z-[60] origin-left"
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-black/30" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg group-hover:bg-cyan-400/35 transition-all duration-300 scale-150" />
              <Image
                src="/biak-logo.svg"
                alt="BIAK Logo"
                width={32}
                height={39}
                className="relative drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(6,182,212,0.7)] transition-all duration-300"
                unoptimized
              />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">BIAK</span>
              <p className="text-xs text-cyan-300/80 leading-none hidden sm:block">Brønderslev Int. Kirke</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.08]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
            <Link href="/events" className="ml-3 btn-primary text-sm px-5 py-2">
              Kommende Events
            </Link>
          </div>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.92 }}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg glass text-white border border-white/[0.08]"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden glass border-t border-white/[0.07] shadow-2xl"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? "text-white bg-white/[0.08] border border-white/[0.08]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.04 + 0.05 }}
                className="pt-2"
              >
                <Link
                  href="/events"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-sm w-full justify-center"
                >
                  Kommende Events
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
