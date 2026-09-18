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
  Heart,
  CheckCircle2,
  HeartHandshake,
  SunMedium,
  Compass,
} from "lucide-react";
import { KineticHeading } from "@/components/ui/scroll-reveal";

const amenityPillars = [
  {
    category: "Mountain Comforts",
    tagline: "Designed for peaceful Himalayan living",
    items: [
      {
        icon: Wifi,
        title: "Dual Fibre Wi-Fi",
        body: "Genuinely fast 150 Mbps with automatic power failover. Verified by remote professionals year-round.",
      },
      {
        icon: ShowerHead,
        title: "24×7 Solar Geysers",
        body: "Continuous hot water backed by high-capacity solar systems in every private bathroom.",
      },
      {
        icon: SunMedium,
        title: "Warm Room Heating",
        body: "Quiet radiant oil heaters keep your mountain room cozy even when Dharamkot dips into snow.",
      },
    ],
  },
  {
    category: "Culinary & Garden",
    tagline: "Farm fresh mountain nutrition",
    items: [
      {
        icon: Coffee,
        title: "All-Day Kangra Chai",
        body: "Freshly brewed local tea and herbal Himalayan infusions, always on the house.",
      },
      {
        icon: Leaf,
        title: "Organic Kitchen Garden",
        body: "Fresh greens and herbs harvested just forty steps from your table for breakfast and thalis.",
      },
      {
        icon: HeartHandshake,
        title: "Long-Table Dinners",
        body: "Communal home-style feasts featuring authentic Himachali Dhaam and wood-fired oven nights.",
      },
    ],
  },
  {
    category: "Trails & Excursions",
    tagline: "Discover the real Himachal",
    items: [
      {
        icon: Mountain,
        title: "Guided Ridge Treks",
        body: "Rahul personally maps scenic walks to Triund and quiet pine meadows away from tourist crowds.",
      },
      {
        icon: Flame,
        title: "Pinecone Bonfires",
        body: "Gather around the garden firepit on crisp starlit evenings with fellow travelers.",
      },
      {
        icon: BookOpen,
        title: "Mountain Library",
        body: "A sunlit reading nook with fiction, philosophy, and Himalayan trekking chronicles.",
      },
    ],
  },
  {
    category: "Arrival & Hospitality",
    tagline: "Effortless travel from gate to door",
    items: [
      {
        icon: Car,
        title: "Airport & Station Taxi",
        body: "Pre-arranged reliable transfers from Gaggal Airport (1 hr) or Pathankot Railway Station.",
      },
      {
        icon: Compass,
        title: "Luggage Porterage",
        body: "Vehicles stop at the upper turn — our staff walks down to carry your luggage up the 400m pine trail.",
      },
      {
        icon: Heart,
        title: "Beloved Pets Welcome",
        body: "We warmly welcome four-legged family members with zero pet surcharges or size restrictions.",
      },
    ],
  },
];

export function Amenities() {
  return (
    <section id="amenities" className="relative overflow-hidden bg-forest-950 py-28 text-ivory-50">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 size-[32rem] rounded-full bg-gold-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 size-[28rem] rounded-full bg-gold-500/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300">
            <CheckCircle2 className="size-3 text-gold-400" />
            Comfort &amp; Facilities
          </div>
          <KineticHeading
            text="Amenities & Facilities"
            highlightWords={["Facilities"]}
            className="mt-4 font-display text-4xl text-ivory-50 sm:text-5xl"
          />
          <p className="mt-4 text-base leading-relaxed text-ivory-50/70">
            Everything you need for a comfortable stay — from winter room heaters and 24×7 hot water
            to reliable 150 Mbps Wi-Fi and complimentary luggage porterage.
          </p>
        </motion.div>

        {/* Pillars Grid with Staggered Kinetic Elevation */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {amenityPillars.map((pillar, pillarIdx) => (
            <motion.div
              key={pillar.category}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: pillarIdx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group rounded-3xl border border-gold-500/20 bg-forest-900/50 p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="border-b border-white/10 pb-5">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold-400">
                  {pillar.tagline}
                </span>
                <h3 className="mt-1.5 font-display text-2xl font-semibold text-ivory-50">
                  {pillar.category}
                </h3>
              </div>

              <div className="mt-6 space-y-6">
                {pillar.items.map((item) => (
                  <div key={item.title} className="group flex items-start gap-4">
                    <div className="mt-1 grid size-10 shrink-0 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/15 text-gold-400 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-forest-950">
                      <item.icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-ivory-50 transition-colors group-hover:text-gold-300">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-ivory-50/65">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}