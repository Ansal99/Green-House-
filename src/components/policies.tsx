"use client";

import { motion } from "framer-motion";
import { CalendarClock, CreditCard, Home, ShieldCheck } from "lucide-react";

const groups = [
  {
    icon: CalendarClock,
    title: "Check-in & Check-out",
    items: [
      "Check-in from 1:00 PM, check-out by 11:00 AM",
      "Early check-in and late check-out free when the room is open",
      "Valid photo ID required for every adult guest, as per Himachal rules",
      "Foreign nationals: passport and visa details are recorded at check-in",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment & Cancellation",
    items: [
      "No advance payment — we hold the room on request",
      "Free cancellation up to 7 days before arrival",
      "Within 7 days: one night's tariff charged if we can't refill the room",
      "No-shows are charged the first night; peak-season dates may need a deposit",
    ],
  },
  {
    icon: Home,
    title: "House Rules",
    items: [
      "Quiet hours from 10:30 PM — sound carries far up here",
      "Smoking outdoors only, never in rooms or the reading room",
      "Pets welcome at no charge, but not left alone in rooms",
      "Visitors who aren't staying should be signed in at reception",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Safety & Responsibility",
    items: [
      "Power backup and 24×7 hot water on all floors",
      "First-aid kit at reception; nearest hospital is 20 minutes away",
      "Trek routes are shared as guidance — weather changes fast, ask before heading out",
      "Valuables are the guest's responsibility; a locker is available on request",
    ],
  },
];

export function Policies() {
  return (
    <section id="policies" className="bg-forest-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
            The Fine Print
          </p>
          <h2 className="mt-3 font-display text-3xl text-ivory-50 md:text-4xl">
            Policies
          </h2>
          <p className="mt-5 leading-relaxed text-ivory-50/60">
            Kept short and readable on purpose. If something here doesn&apos;t
            work for your trip, ask — most of it is flexible off-season.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 p-7 transition-colors duration-500 hover:border-gold-500/30"
            >
              <group.icon
                className="size-5 text-gold-500"
                strokeWidth={1.5}
              />
              <h3 className="mt-5 font-display text-lg text-ivory-50">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-ivory-50/55"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-gold-500/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-xs text-ivory-50/35">
          Last updated September 2026 · Green House, Upper Dharamkot, Himachal
          Pradesh 176219
        </p>
      </div>
    </section>
  );
}