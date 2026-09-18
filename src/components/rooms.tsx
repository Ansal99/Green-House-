"use client";

import { motion } from "framer-motion";
import { BedDouble, Maximize, Users } from "lucide-react";
import { rooms, inr } from "@/lib/rooms";

export function Rooms() {
  return (
    <section id="rooms" className="bg-ivory-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
            Where You&apos;ll Stay
          </p>
          <h2 className="mt-3 font-display text-3xl text-forest-950 md:text-4xl">
            Rooms &amp; Suites
          </h2>
          <p className="mt-5 text-stone-600 leading-relaxed">
            Four rooms, no two alike. Every one of them was built into the slope
            rather than on top of it, so each window ends up pointing somewhere
            worth looking.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room, i) => (
            <motion.article
              key={room.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-editable-photo={`room-${room.slug}`}
                />
                <span className="absolute left-4 top-4 rounded-full bg-forest-950/80 px-3 py-1 text-[11px] tracking-wide text-gold-400 backdrop-blur-sm">
                  {room.tagline}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl text-forest-950">
                  {room.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
                  {room.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize className="size-3.5 text-gold-500" />
                    {room.size}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5 text-gold-500" />
                    Up to {room.maxGuests}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble className="size-3.5 text-gold-500" />
                    {room.bed}
                  </span>
                </div>

                <ul className="mt-5 space-y-1.5 border-t border-border pt-5 text-xs text-stone-600">
                  {room.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="size-1 rounded-full bg-gold-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="font-display text-xl text-forest-950">
                      {inr(room.price)}
                    </p>
                    <p className="text-[11px] text-stone-600">per night</p>
                  </div>
                  <a
                    href="#booking"
                    className="rounded-full border border-forest-900 px-4 py-2 text-xs font-medium text-forest-900 transition-colors duration-300 hover:bg-forest-900 hover:text-ivory-50"
                  >
                    Book
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}