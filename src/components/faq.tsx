"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What are check-in and check-out times?",
    a: "Check-in from 1 PM, check-out by 11 AM. If your bus gets in at 6 AM — which most of them do — tell us and we'll keep a room or at least a sofa and a cup of tea ready.",
  },
  {
    q: "Is there a lift, or is it all stairs?",
    a: "All stairs, unfortunately. The property is built into a slope, and the Deodar Suite is on the top floor. The Garden Cottage is the only ground-level option with no steps from the gate.",
  },
  {
    q: "How do I get here with luggage?",
    a: "Vehicles come up to the upper Dharamkot turn, about 400 metres away on a flat path. Message us when you're 10 minutes out and someone will walk down to help carry bags.",
  },
  {
    q: "Are pets allowed?",
    a: "Yes, and we mean it. There's no extra charge and no size limit. We just ask that pets aren't left alone in rooms, since the local dogs tend to say hello through the window.",
  },
  {
    q: "Do you take card payments or UPI?",
    a: "UPI, cards and bank transfer all work. Nothing is charged when you send a booking request — we confirm availability first, and most guests settle the bill at checkout.",
  },
  {
    q: "What's the weather like through the year?",
    a: "March to June is bright and mild, 15–28°C. July to September is monsoon: green, quiet and much cheaper. October to February gets cold, 2–15°C, with occasional snow in January. Rooms have heaters.",
  },
  {
    q: "Is it suitable for remote work?",
    a: "It's most of what we host. Fibre Wi-Fi with a backup connection, work desks in the larger rooms, power backup for outages, and a reading room that doubles as a quiet call space.",
  },
  {
    q: "Can you help plan treks and day trips?",
    a: "Rahul maps out routes himself and arranges guides for Triund, Indrahar Pass and the lesser-known ridges. Just mention it when you book so we can check conditions ahead of your dates.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ivory-50 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
            Before You Ask
          </p>
          <h2 className="mt-3 font-display text-3xl text-forest-950 md:text-4xl">
            FAQ
          </h2>
          <p className="mt-5 text-stone-600 leading-relaxed">
            The eight questions that land in our inbox most often. Anything else,
            just message — someone actually reads it.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-block rounded-full border border-forest-900 px-5 py-2.5 text-sm text-forest-900 transition-colors duration-300 hover:bg-forest-900 hover:text-ivory-50"
          >
            Ask us something else
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="divide-y divide-border border-y border-border lg:col-span-2"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={`text-[15px] transition-colors duration-300 ${
                      isOpen ? "text-forest-950" : "text-forest-950/80"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-0.5 shrink-0"
                  >
                    <Plus className="size-4 text-gold-500" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-stone-600">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}