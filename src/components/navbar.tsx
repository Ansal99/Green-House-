"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { OwnerLoginDialog } from "./ui/owner-login-dialog";

const links = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-forest-950/85 backdrop-blur-xl py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] border-b border-white/5"
          : "bg-linear-to-b from-black/50 via-black/10 to-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#home"
          className="font-display text-xl tracking-wide text-ivory-50 transition-opacity hover:opacity-80"
        >
          Green<span className="text-gold-400">house</span>
          <span className="block text-[10px] font-sans font-normal tracking-[0.3em] text-ivory-50/45">
            DHARAMKOT · HIMACHAL PRADESH
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-sm lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              className="relative rounded-full px-4 py-1.5 text-[13px] text-ivory-50/70 transition-colors duration-200 hover:text-ivory-50"
            >
              {hovered === link.href && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-gold-500/15"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <OwnerLoginDialog />
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-medium text-forest-950 shadow-[0_0_0_0_rgba(201,162,83,0.5)] transition-shadow hover:shadow-[0_0_20px_2px_rgba(201,162,83,0.35)]"
          >
            Book Now
          </motion.a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-ivory-50 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-forest-950 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-ivory-50/80 transition-colors hover:bg-white/5 hover:text-gold-400"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-full bg-gold-500 px-5 py-2.5 text-center text-sm font-medium text-forest-950"
              >
                Book Now
              </a>
              <div className="pt-3">
                <OwnerLoginDialog />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}