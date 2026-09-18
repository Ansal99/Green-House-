"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, HelpCircle, MessageSquare } from "lucide-react";
import { KineticHeading } from "@/components/ui/scroll-reveal";

const faqs = [
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 1:00 PM, check-out by 11:00 AM. If your overnight bus arrives in McLeod Ganj early in the morning (6–8 AM), let Rahul know in advance — we gladly prepare a hot cup of tea, luggage storage, or early room access whenever vacant.",
  },
  {
    q: "Is there a lift, or is the property reached by stairs?",
    a: "All mountain stairs. The property is built into the natural hillside. The Garden Cottage has level ground access from the stone pathway, while the Deodar Suite is on the top floor with panoramic valley views.",
  },
  {
    q: "How do we get to Green House with our luggage?",
    a: "Vehicles stop at the Upper Dharamkot turnaround (400m away on a flat, scenic pine trail). When you are 10 minutes out, message Rahul or our front desk and our team walks down to carry all luggage directly to your room.",
  },
  {
    q: "Are pets genuinely welcome?",
    a: "Wholeheartedly yes. There are zero pet surcharges or breed limits. We only ask that four-legged guests aren't left unattended in rooms, as mountain birds and friendly local village dogs often peer through windows.",
  },
  {
    q: "Do you accept digital UPI, cards, or bank transfer?",
    a: "All Indian UPI apps (Google Pay, PhonePe, Paytm), credit cards, and bank transfers work smoothly. No advance deposit is required to hold your room — bills are settled comfortably during checkout.",
  },
  {
    q: "What is the climate and weather like through the seasons?",
    a: "March to June is bright and crisp (15–26°C). July to September brings magical green monsoons and cascading waterfalls. October to February is cold and sunny (2–14°C) with occasional January snow. All rooms are equipped with quiet radiant heaters.",
  },
  {
    q: "Is Green House suitable for extended remote workations?",
    a: "It is what most of our long-term guests do. We provide dual 150 Mbps fibre Wi-Fi with automatic battery inverter backup, comfortable wooden work desks, and a sunlit reading room that doubles as a quiet Zoom call haven.",
  },
  {
    q: "Can Rahul help organize guided Triund treks and day excursions?",
    a: "Yes. Rahul maps out routes personally and coordinates licensed, trusted local guides for the Triund ridge, Snowline, Indrahar Pass, or quieter secluded forest trails. Just let us know your preferred trek dates.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ivory-100 py-28 transition-colors duration-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12">
        {/* Header Column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
            <HelpCircle className="size-3 text-gold-600" />
            Clear Answers
          </div>
          <KineticHeading
            text="Frequently Asked Questions"
            highlightWords={["Questions"]}
            className="mt-4 font-display text-4xl font-semibold text-forest-950 sm:text-5xl"
          />
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            The most common inquiries from travelers planning their retreat to Dharamkot.
            If you have a unique request or special trip requirements, Rahul is always a message away.
          </p>

          <div className="mt-8 rounded-2xl border border-gold-500/25 bg-card p-6 shadow-sm">
            <h4 className="text-sm font-semibold text-forest-950">Have a custom question?</h4>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
              Message Rahul directly on WhatsApp for live mountain weather updates, route guidance, or special dietary arrangements.
            </p>
            <a
              href="https://wa.me/919816048210?text=Hi%20Rahul,%20I%20have%20a%20question%20about%20staying%20at%20Green%20House."
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest-900 px-5 py-2 text-xs font-semibold text-ivory-50 transition-all hover:bg-gold-500 hover:text-forest-950"
            >
              <MessageSquare className="size-3.5" />
              <span>Ask via WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* Accordion Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-3.5 lg:col-span-7"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-gold-500/50 bg-card shadow-md"
                    : "border-stone-200/80 bg-card/70 hover:border-gold-500/30 hover:bg-card"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-4.5 text-left"
                >
                  <span
                    className={`text-[15px] font-semibold transition-colors duration-300 ${
                      isOpen ? "text-forest-950" : "text-forest-950/80"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-gold-500 bg-gold-500 text-forest-950 rotate-45"
                        : "border-stone-300 text-stone-500"
                    }`}
                  >
                    <Plus className="size-3.5" />
                  </span>
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
                      <p className="border-t border-border/70 px-6 pt-3 pb-5 text-sm leading-relaxed text-stone-600">
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