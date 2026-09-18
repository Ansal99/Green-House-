"use client";

import { motion } from "framer-motion";
import { Clock, UtensilsCrossed, Leaf, Coffee, Check } from "lucide-react";
import { KineticHeading, ParallaxImage } from "@/components/ui/scroll-reveal";

const meals = [
  {
    time: "07:30 – 10:30",
    title: "Mountain Farmhouse Breakfast",
    tagline: "Included with every stay",
    body: "Freshly steamed Himachali Siddu with pure desi ghee, stuffed aloo parathas, seasonal Kangra valley fruit, eggs prepared to order, and endless pots of local Kangra tea.",
  },
  {
    time: "13:00 – 15:00",
    title: "Sunlit Garden Thali",
    tagline: "Slow lunch under the pines",
    body: "A daily rotating single-plate mountain thali — Kangra rajma, sepubari, madra, or fresh seasonal greens picked forty steps away in our garden. Served in the courtyard whenever sunshine allows.",
  },
  {
    time: "19:30 – 22:00",
    title: "The Long-Table Feast",
    tagline: "Candlelight & communal warmth",
    body: "Everyone gathers at one handcrafted deodar table. Authentic festive Himachali Dhaam on weekends, and wood-fired artisanal sourdough pizzas on crisp mountain evenings.",
  },
];

const photos = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
    key: "dining-hall",
    alt: "The long communal dining table at Green House Dharamkot",
    caption: "The Long Table under warm brass lamplight",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
    key: "dining-plate",
    alt: "A plated Himachali meal with local herbs",
    caption: "Farm-to-table ingredients harvested daily",
  },
];

export function Dining() {
  return (
    <section id="dining" className="relative bg-ivory-50 py-28 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          {/* Photo Gallery Column with Asymmetric Multi-Speed Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-5 lg:col-span-5"
          >
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-stone-200/80 shadow-xl bg-forest-950">
              <ParallaxImage
                src={photos[0].src}
                alt={photos[0].alt}
                aspectRatio="aspect-auto"
                className="size-full"
                imgClassName="h-[125%] transition-transform duration-700 ease-out group-hover:scale-105"
                speed={14}
                scaleRange={[1.08, 1.0]}
                dataEditablePhoto={photos[0].key}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-4 left-4 right-4 z-10 text-xs font-medium text-ivory-50/90">
                {photos[0].caption}
              </span>
            </div>

            <div className="group relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl border border-stone-200/80 shadow-xl bg-forest-950">
              <ParallaxImage
                src={photos[1].src}
                alt={photos[1].alt}
                aspectRatio="aspect-auto"
                className="size-full"
                imgClassName="h-[125%] transition-transform duration-700 ease-out group-hover:scale-105"
                speed={24}
                scaleRange={[1.08, 1.0]}
                dataEditablePhoto={photos[1].key}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-4 left-4 right-4 z-10 text-xs font-medium text-ivory-50/90">
                {photos[1].caption}
              </span>
            </div>
          </motion.div>

          {/* Editorial Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
              <UtensilsCrossed className="size-3 text-gold-600" />
              Mountain Hearth &amp; Table
            </div>

            <KineticHeading
              text="Farm-to-Table Dining"
              highlightWords={["Dining"]}
              className="mt-4 font-display text-4xl font-semibold text-forest-950 sm:text-5xl"
            />

            <p className="mt-4 text-base leading-relaxed text-stone-600">
              There is no sterile laminated menu card here. There is an organic kitchen garden,
              a market run down the valley every second dawn, and authentic mountain recipes
              prepared the way we feed family.
            </p>

            {/* Dietary Tags */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1 font-medium text-emerald-800">
                <Leaf className="size-3" /> Vegetarian &amp; Vegan Friendly
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 font-medium text-gold-700">
                <Coffee className="size-3" /> All-Day Kangra Tea Complimentary
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-100 px-3 py-1 font-medium text-stone-700">
                <Check className="size-3" /> Jain &amp; Gluten-free on Request
              </span>
            </div>

            {/* Meal Timecards */}
            <div className="mt-8 space-y-6">
              {meals.map((meal, i) => (
                <motion.div
                  key={meal.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="rounded-2xl border border-stone-200/80 bg-card p-5 shadow-sm transition-all hover:border-gold-500/40 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">
                      <Clock className="size-3.5" />
                      {meal.time}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                      {meal.tagline}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-semibold text-forest-950">
                    {meal.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {meal.body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Inclusions Note */}
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-gold-500/30 bg-gold-500/10 p-4 text-xs text-stone-700">
              <span className="font-medium">
                ✦ <strong>Breakfast is included</strong> with all room bookings. Lunches &amp; long-table dinners billed at transparent local rates (~₹350 &amp; ₹500/person).
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}