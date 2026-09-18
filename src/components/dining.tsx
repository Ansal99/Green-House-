"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const meals = [
  {
    time: "07:30 – 10:30",
    title: "Mountain Breakfast",
    body: "Siddu with ghee, aloo parathas, seasonal fruit from the Kangra market, eggs any way you ask, and unlimited Kangra tea.",
  },
  {
    time: "13:00 – 15:00",
    title: "Garden Lunch",
    body: "A rotating single-plate thali — rajma, madra, kadhi, or whatever the kitchen garden gave us that morning. Served outside when the sun allows.",
  },
  {
    time: "19:30 – 22:00",
    title: "Long-Table Dinner",
    body: "Everyone eats together at one table. Himachali dhaam on weekends, wood-fired pizza on the nights Rahul feels like it.",
  },
];

const photos = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
    key: "dining-hall",
    alt: "The long table at Green House",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
    key: "dining-plate",
    alt: "A plated Himachali meal",
  },
];

export function Dining() {
  return (
    <section id="dining" className="bg-ivory-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl shadow-lg">
              <img
                src={photos[0].src}
                alt={photos[0].alt}
                className="h-full w-full object-cover"
                data-editable-photo={photos[0].key}
              />
            </div>
            <div className="relative mt-10 aspect-3/4 overflow-hidden rounded-2xl shadow-lg">
              <img
                src={photos[1].src}
                alt={photos[1].alt}
                className="h-full w-full object-cover"
                data-editable-photo={photos[1].key}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
              From Our Kitchen
            </p>
            <h2 className="mt-3 font-display text-3xl text-forest-950 md:text-4xl">
              Dining
            </h2>
            <p className="mt-5 text-stone-600 leading-relaxed">
              There is no menu card. There&apos;s a kitchen, a garden, a market run
              every second morning, and someone who cooks the way they&apos;d cook
              at home. Tell us about allergies or preferences a day ahead and
              it&apos;s handled.
            </p>

            <div className="mt-10 space-y-8">
              {meals.map((meal, i) => (
                <motion.div
                  key={meal.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="border-l-2 border-gold-500/40 pl-6"
                >
                  <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-gold-500">
                    <Clock className="size-3" />
                    {meal.time}
                  </p>
                  <h3 className="mt-2 font-display text-lg text-forest-950">
                    {meal.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                    {meal.body}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="mt-10 rounded-xl bg-ivory-100 px-5 py-4 text-sm text-stone-600">
              Breakfast is included with every room. Lunch and dinner are billed
              separately — around ₹350 and ₹500 per person.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}