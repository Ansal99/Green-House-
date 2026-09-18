"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { OwnerLoginDialog } from "./ui/owner-login-dialog";

const links = [
  { label: "Home", href: "#home" },
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Offers", href: "#offers" },
  { label: "Amenities", href: "#amenities" },
  { label: "Dining", href: "#dining" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-forest-950/90 backdrop-blur-md py-3 shadow-lg shadow-black/20 border-b border-gold-500/10"
          : "bg-linear-to-b from-black/40 to-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#home"
          className="font-display text-xl tracking-wide text-ivory-50 transition-opacity hover:opacity-80"
        >
          Green<span className="text-gold-500">house</span>
          <span className="block text-[10px] font-sans font-normal tracking-[0.3em] text-ivory-50/50">
            DHARAMKOT · HIMACHAL PRADESH
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm text-ivory-50/75 transition-colors hover:text-gold-400"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <OwnerLoginDialog />
          <a
            href="#booking"
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-medium text-forest-950 transition-transform hover:scale-105 hover:bg-gold-400"
          >
            Book Now
          </a>
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
            <div className="flex flex-col gap-4 px-6 pb-6 pt-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-ivory-50/80 hover:text-gold-400"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-gold-500 px-5 py-2 text-center text-sm font-medium text-forest-950"
              >
                Book Now
              </a>
              <div className="pt-2">
                <OwnerLoginDialog />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}