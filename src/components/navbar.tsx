"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageSquare, Compass, Calendar } from "lucide-react";
import { OwnerLoginDialog } from "./ui/owner-login-dialog";
import { useSiteContent } from "@/lib/site-content";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Rooms & Suites", href: "/#rooms" },
  { label: "Experiences", href: "/#amenities" },
  { label: "Dining", href: "/#dining" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Story", href: "/#about" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Find Us", href: "/#location" },
];

export function Navbar() {
  const { logoImage } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = ["home", "rooms", "amenities", "dining", "gallery", "about", "reviews", "location", "faq", "policies"];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-gold-500/15 bg-forest-950/92 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "bg-gradient-to-b from-forest-950/85 via-forest-950/35 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between px-6 lg:px-12">
        {/* Boutique Crest & Brand with Custom Logo Support */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 transition-opacity hover:opacity-90"
        >
          <div className="relative grid size-11 place-items-center rounded-xl border border-gold-500/40 bg-gradient-to-br from-gold-500/20 via-forest-900 to-forest-950 text-gold-400 shadow-[0_0_15px_rgba(216,178,87,0.2)] transition-transform duration-300 group-hover:scale-105 overflow-hidden">
            {logoImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoImage} alt="Green House Logo" className="size-full object-cover" />
            ) : (
              <span className="font-display text-base font-bold tracking-tight text-gold-400">
                GH
              </span>
            )}
            <span className="absolute -top-1 -right-1 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-gold-500" />
            </span>
          </div>

          <div>
            <span className="font-display text-xl tracking-tight text-ivory-50 transition-colors group-hover:text-gold-300 sm:text-2xl">
              Green <span className="text-gold-400 italic font-normal">House</span>
            </span>
            <span className="block text-[9.5px] font-sans font-medium tracking-[0.32em] text-ivory-50/60 uppercase">
              Upper Dharamkot · 2,100m
            </span>
          </div>
        </Link>

        {/* Widened Desktop Navigation Links with Lazy Spring Hover */}
        <nav
          className="hidden items-center gap-1 rounded-full border border-gold-500/20 bg-forest-900/60 px-3.5 py-1.5 shadow-inner backdrop-blur-md xl:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((link) => {
            const isRoute = link.href.startsWith("/");
            const targetId = link.href.replace("/#", "").replace("#", "");
            const isActive = isRoute ? false : activeSection === targetId;

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-gold-300 font-semibold"
                    : "text-ivory-50/75 hover:text-ivory-50"
                }`}
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-gold-500/15 border border-gold-400/25 shadow-[0_2px_15px_rgba(216,178,87,0.15)] backdrop-blur-md"
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 24,
                      mass: 1.1,
                    }}
                  />
                )}
                {isActive && !hovered && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-gold-400" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls (Dark Mode Toggler removed) */}
        <div className="hidden items-center gap-3.5 lg:flex">
          <OwnerLoginDialog />

          <Link
            href="/reserve"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-forest-950 shadow-[0_4px_20px_rgba(216,178,87,0.3)] transition-all duration-300 hover:shadow-[0_4px_25px_rgba(216,178,87,0.5)] hover:scale-[1.03] active:scale-[0.98]"
          >
            <Calendar className="size-3 text-forest-950" />
            <span>Reserve Stay</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="grid size-10 place-items-center rounded-xl border border-gold-500/25 bg-forest-900/60 text-ivory-50 transition-colors hover:border-gold-400 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={20} className="text-gold-400" /> : <Menu size={20} />}
        </button>
      </div>

      {/* Luxury Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-gold-500/20 bg-forest-950/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1.5 px-6 pb-7 pt-4">
              <div className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory-50/70">
                <span className="flex items-center gap-1.5 text-gold-400">
                  <Compass size={14} /> Upper Dharamkot · 2,100m
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
                  Direct host open
                </span>
              </div>

              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ivory-50/85 transition-colors hover:bg-gold-500/10 hover:text-gold-300"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-gold-500/60">→</span>
                  </Link>
                </motion.div>
              ))}

              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/919816048210?text=Hi%20Rahul,%20I'm%20interested%20in%20booking%20a%20stay%20at%20Green%20House%20Dharamkot."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 py-2.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-900/40"
                >
                  <MessageSquare size={14} />
                  WhatsApp Host
                </a>

                <a
                  href="tel:+919816048210"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-ivory-50/80 transition-colors hover:bg-white/10"
                >
                  <Phone size={14} />
                  Call Host Directly
                </a>
              </div>

              <Link
                href="/reserve"
                onClick={() => setMobileOpen(false)}
                className="mt-3 block w-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 py-3 text-center text-sm font-semibold tracking-wide uppercase text-forest-950 shadow-lg"
              >
                Check Availability &amp; Reserve
              </Link>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-ivory-50/50">Host Portal</span>
                <OwnerLoginDialog />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}