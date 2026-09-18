"use client";

import { motion } from "framer-motion";
import { MapPin, Plane, TrainFront, Bus, Footprints } from "lucide-react";

const routes = [
  {
    icon: Plane,
    title: "Gaggal Airport (DHM)",
    meta: "22 km · about 1 hr",
    body: "Daily flights from Delhi. We can send a taxi — ₹1,200, arranged the night before.",
  },
  {
    icon: TrainFront,
    title: "Pathankot Railway Station",
    meta: "90 km · about 3 hrs",
    body: "The closest broad-gauge station. Shared cabs run to McLeod Ganj all morning.",
  },
  {
    icon: Bus,
    title: "McLeod Ganj Bus Stand",
    meta: "3 km · about 15 min",
    body: "Overnight Volvo from Delhi ISBT. Auto up to Dharamkot costs ₹200–300.",
  },
  {
    icon: Footprints,
    title: "Last stretch on foot",
    meta: "400 m from the road",
    body: "Vehicles stop at the upper Dharamkot turn. It's a short, flat walk — we'll come help with bags.",
  },
];

const nearby = [
  ["Triund trail head", "25 min walk"],
  ["Bhagsu Waterfall", "35 min walk"],
  ["Dal Lake", "20 min drive"],
  ["Namgyal Monastery", "15 min drive"],
];

export function Location() {
  return (
    <section id="location" className="bg-ivory-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
            Finding Us
          </p>
          <h2 className="mt-3 font-display text-3xl text-forest-950 md:text-4xl">
            Location
          </h2>
          <p className="mt-5 flex items-start gap-2 text-stone-600 leading-relaxed">
            <MapPin className="mt-1 size-4 shrink-0 text-gold-500" />
            Upper Dharamkot, above McLeod Ganj, Dharamshala — Himachal Pradesh
            176219. Roughly 2,100 m up, at the point where the road gives up and
            the pine forest starts.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 lg:col-span-3"
          >
            <iframe
              title="Green House location map, Dharamkot"
              src="https://maps.google.com/maps?q=Dharamkot%2C%20Dharamshala%2C%20Himachal%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="h-[420px] w-full border-0 grayscale-[35%] transition-all duration-700 hover:grayscale-0 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <h3 className="font-display text-xl text-forest-950">
              Getting here
            </h3>
            <div className="mt-6 space-y-6">
              {routes.map((route) => (
                <div key={route.title} className="flex gap-4">
                  <div className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-ivory-100">
                    <route.icon className="size-4 text-gold-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-forest-950">
                      {route.title}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-gold-500">
                      {route.meta}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                      {route.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-ivory-100 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-500">
                Close by
              </p>
              <ul className="mt-4 space-y-2.5">
                {nearby.map(([place, time]) => (
                  <li
                    key={place}
                    className="flex items-center justify-between text-sm text-stone-600"
                  >
                    <span>{place}</span>
                    <span className="text-forest-950">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}