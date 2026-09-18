"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const offers = [
  {
    badge: "Save 20%",
    title: "The Slow Week",
    subtitle: "7 nights or more",
    body: "Stay a week and the nightly rate drops by a fifth. Laundry, one guided trail walk and airport pickup come free.",
    includes: [
      "20% off every night",
      "Free laundry service",
      "One guided day trek",
      "Gaggal airport pickup",
    ],
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    key: "offer-slow-week",
    featured: false,
  },
  {
    badge: "Most Popular",
    title: "Monsoon Escape",
    subtitle: "July – September",
    body: "Dharamkot in the rain is a completely different place — greener, emptier, and far cheaper. Our favourite season to host.",
    includes: [
      "30% off all rooms",
      "Complimentary dinner daily",
      "Late checkout at 2 PM",
      "Free room upgrade if available",
    ],
    image:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1000&auto=format&fit=crop",
    key: "offer-monsoon",
    featured: true,
  },
  {
    badge: "For Two",
    title: "Quiet Weekend",
    subtitle: "2 nights, couples",
    body: "A balcony room, a bonfire booked in your name, and a candlelit dinner set up wherever you'd like it on the property.",
    includes: [
      "Valley Balcony Room",
      "Private bonfire evening",
      "Candlelit dinner for two",
      "Sunrise tea on the terrace",
    ],
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
    key: "offer-quiet-weekend",
    featured: false,
  },
];

export function Offers() {
  return (
    <section id="offers" className="bg-ivory-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
            Stay Longer, Pay Less
          </p>
          <h2 className="mt-3 font-display text-3xl text-forest-950 md:text-4xl">
            Offers &amp; Packages
          </h2>
          <p className="mt-5 text-stone-600 leading-relaxed">
            Booked directly through this page — no aggregator, no commission,
            which is exactly why we can pass the difference on to you.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {offers.map((offer, i) => (
            <motion.article
              key={offer.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl ${
                offer.featured
                  ? "bg-forest-950 text-ivory-50 ring-2 ring-gold-500 md:-mt-4 md:mb-4"
                  : "bg-card ring-1 ring-black/5"
              } shadow-sm transition-shadow duration-500 hover:shadow-xl`}
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-editable-photo={offer.key}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-medium text-forest-950">
                  {offer.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <p
                  className={`text-[11px] uppercase tracking-[0.2em] ${
                    offer.featured ? "text-gold-400" : "text-gold-500"
                  }`}
                >
                  {offer.subtitle}
                </p>
                <h3
                  className={`mt-2 font-display text-2xl ${
                    offer.featured ? "text-ivory-50" : "text-forest-950"
                  }`}
                >
                  {offer.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    offer.featured ? "text-ivory-50/65" : "text-stone-600"
                  }`}
                >
                  {offer.body}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {offer.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2.5 text-sm ${
                        offer.featured ? "text-ivory-50/80" : "text-stone-600"
                      }`}
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#booking"
                  className={`mt-8 rounded-full px-5 py-2.5 text-center text-sm font-medium transition-all duration-300 ${
                    offer.featured
                      ? "bg-gold-500 text-forest-950 hover:shadow-[0_0_24px_2px_rgba(201,162,83,0.35)]"
                      : "border border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-ivory-50"
                  }`}
                >
                  Claim this offer
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-stone-600">
          Offers can&apos;t be combined. Subject to availability — message us if
          your dates fall just outside a window, we usually work something out.
        </p>
      </div>
    </section>
  );
}