"use client";

import { motion } from "framer-motion";
import { MapPin, Plane, TrainFront, Bus, Footprints, ExternalLink } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";
import { KineticHeading } from "@/components/ui/scroll-reveal";

const routes = [
  {
    icon: Plane,
    title: "Gaggal Airport (DHM)",
    meta: "22 km · approx. 1 hour drive",
    body: "Direct daily flights from Delhi & Chandigarh. We arrange trusted local taxi pickups (₹1,200) scheduled directly with Rahul.",
  },
  {
    icon: TrainFront,
    title: "Pathankot Railway Station (PTK)",
    meta: "90 km · approx. 3 hours drive",
    body: "The nearest broad-gauge Himalayan railhead. Connected to Delhi, Mumbai, and Kolkata. Private cabs available at station round the clock.",
  },
  {
    icon: Bus,
    title: "McLeod Ganj Bus Terminal",
    meta: "3 km · approx. 15 min drive",
    body: "Overnight luxury Volvo buses connect daily from New Delhi (ISBT Kashmere Gate) and Chandigarh. Local mountain autos easily ascend to Upper Dharamkot.",
  },
  {
    icon: Footprints,
    title: "Final 400m Pine Trail & Free Porterage",
    meta: "Scenic car-free pine path",
    body: "Vehicles stop safely at the Upper Dharamkot turnaround. Our team meets you there to carry your bags along the flat deodar trail.",
  },
];

const nearby = [
  ["Triund Trek Trail Head", "25 min walk"],
  ["Bhagsu Waterfall & Cafes", "35 min walk"],
  ["Dal Lake (Dharamsala)", "20 min drive"],
  ["Namgyal Monastery (HH Dalai Lama)", "15 min drive"],
  ["Gallu Devi Temple & Viewpoint", "20 min walk"],
];

export function Location() {
  const { location } = useSiteContent();
  return (
    <section id="location" className="relative bg-ivory-100 py-28 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
            <MapPin className="size-3 text-gold-600" />
            Location &amp; Directions
          </div>
          <KineticHeading
            text="How to Reach Green House"
            highlightWords={["Green", "House"]}
            className="mt-4 font-display text-4xl font-semibold text-forest-950 sm:text-5xl"
          />
          <p className="mt-4 flex items-start gap-2 text-base leading-relaxed text-stone-600">
            <MapPin className="mt-1 size-4.5 shrink-0 text-gold-600" />
            <span>
              <strong>Upper Dharamkot</strong>, perched at 2,100 metres altitude, right where the motor road yields to the ancient deodar forest.
            </span>
          </p>
        </motion.div>

        {/* Map & Routes Layout */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Map Column with Cinematic Spring Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -35, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-card shadow-xl lg:col-span-7"
          >
            <div className="relative h-[420px] w-full lg:h-[500px]">
              <iframe
                title="Green House location map, Upper Dharamkot"
                src={location.mapUrl}
                className="h-full w-full border-0 grayscale-[25%] contrast-[1.05] transition-all duration-700 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/20 to-transparent" />
            </div>

            {/* Map Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border p-5 bg-card">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-950">
                  {location.title}
                </p>
                <p className="text-[11px] text-stone-500">
                  GPS: 32.2541° N, 76.3262° E · Himachal Pradesh 176219
                </p>
              </div>

              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-forest-900 px-4 py-2 text-xs font-semibold text-ivory-50 transition-all hover:bg-gold-500 hover:text-forest-950 shadow-sm"
              >
                <span>Navigate in Google Maps</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Transit Guide Column with Symmetrical Spring Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 35, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-forest-950">
                Arrival Options
              </h3>
              <div className="mt-6 space-y-5">
                {routes.map((route) => (
                  <div key={route.title} className="flex gap-4 rounded-2xl border border-stone-200/70 bg-card p-4 shadow-sm transition-all hover:border-gold-500/30">
                    <div className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-600">
                      <route.icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-forest-950">
                        {route.title}
                      </p>
                      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-gold-600">
                        {route.meta}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-stone-600">
                        {route.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Highlights */}
            <div className="mt-8 rounded-2xl border border-gold-500/25 bg-card p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">
                Walking Proximities
              </p>
              <ul className="mt-3 divide-y divide-border/60">
                {nearby.map(([place, time]) => (
                  <li
                    key={place}
                    className="flex items-center justify-between py-2 text-xs text-stone-600 first:pt-0 last:pb-0"
                  >
                    <span>{place}</span>
                    <span className="font-medium text-forest-950">{time}</span>
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