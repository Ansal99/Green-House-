"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ShieldCheck, MessageSquare, Coffee, Wifi, ArrowRight, Mountain } from "lucide-react";
import { KineticHeading } from "@/components/ui/scroll-reveal";

export function ReservationCTA() {
  return (
    <section id="reserve-cta" className="relative overflow-hidden bg-ivory-100 py-24 transition-colors duration-300">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="size-96 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-forest-950 p-8 text-ivory-50 shadow-2xl sm:p-14"
        >
          {/* Decorative Corner Accents */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gold-500/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-gold-400/10 blur-2xl" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Content Column */}
            <div className="space-y-5 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                <Calendar className="size-3 text-gold-400" />
                Book Directly With Host
              </div>

              <KineticHeading
                text="Reserve Your Stay in Upper Dharamkot"
                highlightWords={["Upper", "Dharamkot"]}
                className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-ivory-50"
              />

              <p className="max-w-xl text-sm leading-relaxed text-ivory-50/75 sm:text-base">
                Direct reservations managed personally by host Rahul Kapoor. Enjoy complimentary Himalayan farmhouse breakfasts, zero advance deposit, and instant confirmation.
              </p>

              {/* Perk Chips Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-2">
                <div className="flex items-center gap-2.5 text-xs text-ivory-50/85">
                  <ShieldCheck className="size-4 shrink-0 text-gold-400" />
                  <span>Zero advance payment needed</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-ivory-50/85">
                  <Coffee className="size-4 shrink-0 text-gold-400" />
                  <span>Organic breakfast included</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-ivory-50/85">
                  <Mountain className="size-4 shrink-0 text-gold-400" />
                  <span>Free luggage porterage</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-ivory-50/85">
                  <Wifi className="size-4 shrink-0 text-gold-400" />
                  <span>150 Mbps fiber Wi-Fi + inverter</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:col-span-5 lg:p-8">
              <div className="w-full">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">Personal Hospitality</p>
                <h3 className="mt-1 font-display text-2xl font-medium text-ivory-50">Dedicated Booking Portal</h3>
                <p className="mt-2 text-xs leading-relaxed text-ivory-50/70">
                  Select your arrival dates and preferred cottage or suite in our dedicated, distraction-free reservation experience.
                </p>
              </div>

              <div className="w-full space-y-3 pt-2">
                <Link
                  href="/reserve"
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-forest-950 shadow-[0_4px_20px_rgba(216,178,87,0.35)] transition-all hover:shadow-[0_6px_25px_rgba(216,178,87,0.5)]"
                >
                  <Calendar className="size-4 text-forest-950" />
                  <span>Check Availability &amp; Reserve</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://wa.me/919816048210?text=Hi%20Rahul,%20I%20would%20like%20to%20inquire%20about%20staying%20at%20Green%20House%20Dharamkot."
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-medium text-ivory-50/90 transition-all hover:border-gold-500/40 hover:bg-white/10 hover:text-ivory-50"
                >
                  <MessageSquare className="size-3.5 text-emerald-400" />
                  <span>Direct WhatsApp with Rahul</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

