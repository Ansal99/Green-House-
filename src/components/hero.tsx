"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Calendar, Users, Star, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";

import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  const { heroImage, location, rooms } = useSiteContent();
  const ref = useRef<HTMLElement>(null);

  // Quick reservation bar state (lazy initialization to satisfy React 19 purity)
  const [today] = useState(() => new Date().toISOString().split("T")[0]);
  const [quickCheckIn, setQuickCheckIn] = useState(() => new Date().toISOString().split("T")[0]);
  const [quickCheckOut, setQuickCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [quickGuests, setQuickGuests] = useState(2);
  const [quickRoom, setQuickRoom] = useState("all");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quickCheckIn) params.set("checkIn", quickCheckIn);
    if (quickCheckOut) params.set("checkOut", quickCheckOut);
    if (quickGuests) params.set("guests", String(quickGuests));
    if (quickRoom && quickRoom !== "all") params.set("room", quickRoom);
    router.push(`/reserve?${params.toString()}`);
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-forest-950"
    >
      {/* Background Image with Parallax & Vignette */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 h-[120%] origin-center">
        <img
          src={heroImage}
          alt="Green House boutique stay in the pine forests of Upper Dharamkot"
          className="h-full w-full object-cover brightness-[0.88] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/85 via-forest-950/45 to-forest-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,29,22,0.7)_100%)]" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-24 text-center"
      >
        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/35 bg-forest-950/70 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-gold-300 uppercase backdrop-blur-md shadow-lg"
        >
          <span className="size-1.5 rounded-full bg-gold-400" />
          Upper Dharamkot, Dharamshala · 2,100m
        </motion.div>

        {/* Hero Title with Kinetic Mask Reveal */}
        <div className="mt-6 max-w-4xl overflow-hidden">
          <motion.h1
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.45, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-semibold leading-[1.1] text-ivory-50 sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Green <span className="italic font-normal text-gold-300">House</span>
          </motion.h1>
        </div>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-ivory-50/85 sm:text-lg md:text-xl"
        >
          A peaceful mountain stay set amid pine trees with panoramic valley views.
          Handcrafted wooden rooms, fresh home-cooked meals, and personal hosting by Rahul Kapoor.
        </motion.p>

        {/* Social Proof & Rating Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-ivory-50/75"
        >
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
            <div className="flex text-gold-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-gold-400" />
              ))}
            </div>
            <span className="font-semibold text-ivory-50">4.9 / 5</span>
            <span className="text-ivory-50/50">· 418 Direct Reviews</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-ivory-50/80 backdrop-blur-sm">
            <ShieldCheck className="size-3.5 text-gold-400" />
            <span>Zero Advance Required · Best Rate Guarantee</span>
          </div>
        </motion.div>

        {/* Resort Quick-Availability Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 w-full max-w-4xl"
        >
          <form
            onSubmit={handleQuickSearch}
            className="grid grid-cols-1 gap-3 rounded-2xl border border-gold-500/25 bg-forest-950/85 p-3.5 shadow-2xl backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* Check-in */}
            <div className="flex flex-col items-start rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-left transition-colors focus-within:border-gold-500/60 focus-within:bg-white/10">
              <label htmlFor="quick-checkin" className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                <Calendar className="size-3" /> Check In
              </label>
              <input
                id="quick-checkin"
                type="date"
                min={today}
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="mt-1 w-full bg-transparent text-sm font-medium text-ivory-50 outline-none [color-scheme:dark]"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col items-start rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-left transition-colors focus-within:border-gold-500/60 focus-within:bg-white/10">
              <label htmlFor="quick-checkout" className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                <Calendar className="size-3" /> Check Out
              </label>
              <input
                id="quick-checkout"
                type="date"
                min={quickCheckIn || today}
                value={quickCheckOut}
                onChange={(e) => setQuickCheckOut(e.target.value)}
                className="mt-1 w-full bg-transparent text-sm font-medium text-ivory-50 outline-none [color-scheme:dark]"
              />
            </div>

            {/* Guests & Room */}
            <div className="flex flex-col items-start rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-left transition-colors focus-within:border-gold-500/60 focus-within:bg-white/10">
              <label htmlFor="quick-guests" className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                <Users className="size-3" /> Guests &amp; Room
              </label>
              <div className="flex w-full items-center gap-2 mt-1">
                <select
                  id="quick-guests"
                  value={quickGuests}
                  onChange={(e) => setQuickGuests(Number(e.target.value))}
                  className="bg-transparent text-xs font-medium text-ivory-50 outline-none [color-scheme:dark]"
                >
                  <option value={1} className="bg-forest-950 text-ivory-50">1 Guest</option>
                  <option value={2} className="bg-forest-950 text-ivory-50">2 Guests</option>
                  <option value={3} className="bg-forest-950 text-ivory-50">3 Guests</option>
                  <option value={4} className="bg-forest-950 text-ivory-50">4 Guests</option>
                  <option value={5} className="bg-forest-950 text-ivory-50">5+ Guests</option>
                </select>
                <span className="text-white/30">|</span>
                <select
                  value={quickRoom}
                  onChange={(e) => setQuickRoom(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-ivory-50 outline-none truncate [color-scheme:dark]"
                >
                  <option value="all" className="bg-forest-950 text-ivory-50">Any Room</option>
                  {rooms.map((r) => (
                    <option key={r.slug} value={r.slug} className="bg-forest-950 text-ivory-50">
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-6 py-3 text-xs font-bold tracking-wider uppercase text-forest-950 shadow-[0_4px_25px_rgba(201,168,106,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(201,168,106,0.6)]"
            >
              <span>Check Rates</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>
      </motion.div>

      {/* Floating Interactive Location Card with Live Google Map Box */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="absolute bottom-6 right-6 z-20 hidden md:flex flex-col items-end gap-2.5"
      >
        {/* Proportioned Live Google Maps Box */}
        <div className="relative h-44 w-72 overflow-hidden rounded-2xl border border-gold-500/30 bg-forest-950/90 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl group">
          <iframe
            src={location.mapUrl}
            title="Green House Dharamkot Live Location Map"
            className="size-full border-0 opacity-90 transition-opacity group-hover:opacity-100"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Top Pill Overlay */}
          <div className="pointer-events-none absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-forest-950/95 border border-gold-500/30 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-gold-400 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Map
          </div>
          {/* Quick External Map Link */}
          <a
            href={location.directionsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in Google Maps"
            className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-forest-950/95 border border-white/20 px-2.5 py-1 text-[10px] font-medium text-ivory-50 shadow-md backdrop-blur-md transition-all hover:bg-gold-500 hover:text-forest-950 hover:border-gold-400"
          >
            <span>Open Map</span>
            <ExternalLink size={10} />
          </a>
        </div>

        {/* Location Info Pill directly beneath the map */}
        <a
          href={location.directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex w-72 items-center gap-3 rounded-2xl border border-gold-500/25 bg-forest-950/90 p-3 text-left text-ivory-50 shadow-2xl backdrop-blur-md transition-all hover:border-gold-400"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30 transition-transform group-hover:scale-105">
            <MapPin size={16} />
          </span>
          <span className="min-w-0 flex-1 pr-1">
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
              <Navigation size={10} /> Property Location
            </span>
            <span className="mt-0.5 block truncate text-xs font-medium text-ivory-50">{location.title}</span>
            <span className="block truncate text-[11px] text-ivory-50/55 group-hover:text-gold-300">Directions &amp; Navigation →</span>
          </span>
        </a>
      </motion.div>
    </section>
  );
}
