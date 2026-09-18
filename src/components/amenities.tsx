"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Flame,
  Mountain,
  Coffee,
  ShowerHead,
  Car,
  Leaf,
  BookOpen,
} from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    title: "Fibre Wi-Fi",
    body: "Genuinely fast, even in the hills. Tested by a year of remote workers.",
  },
  {
    icon: Flame,
    title: "Bonfire Evenings",
    body: "Lit in the garden most clear nights, October through March.",
  },
  {
    icon: Mountain,
    title: "Guided Trails",
    body: "Rahul maps out day walks to Triund and the quieter ridges nobody posts about.",
  },
  {
    icon: Coffee,
    title: "All-Day Chai",
    body: "The kettle is never off. Local Kangra tea, on the house.",
  },
  {
    icon: ShowerHead,
    title: "Hot Water 24×7",
    body: "Solar-backed geysers in every room — no waiting for a slot.",
  },
  {
    icon: Car,
    title: "Pickup & Parking",
    body: "Taxi from Gaggal airport or McLeod Ganj, and parking at the gate.",
  },
  {
    icon: Leaf,
    title: "Kitchen Garden",
    body: "Most of what lands on your breakfast plate grew about forty steps away.",
  },
  {
    icon: BookOpen,
    title: "Reading Room",
    body: "A small library of books guests left behind. Take one, leave one.",
  },
];

export function Amenities() {
  return (
    <section id="amenities" className="relative overflow-hidden bg-forest-950 py-24">
      <div className="pointer-events-none absolute -left-32 top-1/3 size-96 rounded-full bg-gold-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-gold-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
            What&apos;s Included
          </p>
          <h2 className="mt-3 font-display text-3xl text-ivory-50 md:text-4xl">
            Amenities
          </h2>
          <p className="mt-5 leading-relaxed text-ivory-50/60">
            Nothing here is a gimmick. It&apos;s the short list of things that
            actually made guests&apos; stays better, kept over eight years.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group bg-forest-950 p-8 transition-colors duration-500 hover:bg-forest-900"
            >
              <item.icon
                className="size-6 text-gold-500 transition-transform duration-500 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
              <h3 className="mt-5 font-display text-lg text-ivory-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory-50/55">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}