"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BedDouble, Maximize, Users, Check, X, ArrowRight, Eye, ShieldCheck, Coffee } from "lucide-react";
import { inr, type Room } from "@/lib/rooms";
import { useSiteContent } from "@/lib/site-content";
import { KineticHeading, ParallaxImage } from "@/components/ui/scroll-reveal";

type RoomFilter = "all" | "views" | "suites" | "cozy";

export function Rooms() {
  const router = useRouter();
  const { rooms } = useSiteContent();
  const [filter, setFilter] = useState<RoomFilter>("all");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const filteredRooms = rooms.filter((r) => {
    if (filter === "views") return r.slug.includes("balcony") || r.slug.includes("suite");
    if (filter === "suites") return r.slug.includes("suite") || r.slug.includes("cottage");
    if (filter === "cozy") return r.slug.includes("pine") || r.maxGuests <= 2;
    return true;
  });

  const selectRoomForBooking = (slug: string) => {
    setSelectedRoom(null);
    router.push(`/reserve?room=${slug}`);
  };

  return (
    <section id="rooms" className="relative bg-ivory-100 py-28 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
              <BedDouble className="size-3 text-gold-600" />
              Our Rooms &amp; Cottages
            </div>
            <KineticHeading
              text="Rooms & Suites"
              highlightWords={["Suites"]}
              className="mt-4 font-display text-4xl text-forest-950 sm:text-5xl"
            />
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Four quiet wooden rooms built into the hillside of Dharamkot.
              Unobstructed views of deodar pines, private sit-outs, and comfortable mountain stays.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {[
              { id: "all", label: "All Rooms (4)" },
              { id: "views", label: "Valley & Balcony" },
              { id: "suites", label: "Suites & Cottages" },
              { id: "cozy", label: "Cozy Stays" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as RoomFilter)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                  filter === tab.id
                    ? "bg-forest-900 text-ivory-50 shadow-md ring-1 ring-gold-500/40"
                    : "border border-stone-300/80 bg-white/70 text-stone-600 hover:border-gold-500/50 hover:text-forest-950"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Room Cards Grid with HorizonX-style Spring Elevation & Parallax */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredRooms.map((room, i) => (
            <motion.article
              key={room.slug}
              layout
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.65,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-card shadow-sm transition-shadow duration-500 hover:border-gold-500/40 hover:shadow-2xl"
            >
              {/* Image Frame with Parallax Depth */}
              <div className="relative aspect-[4/3] overflow-hidden bg-forest-950">
                <ParallaxImage
                  src={room.image}
                  alt={room.name}
                  aspectRatio="aspect-auto"
                  className="size-full"
                  imgClassName="h-[125%] transition-transform duration-700 ease-out group-hover:scale-105"
                  speed={12}
                  scaleRange={[1.08, 1.0]}
                  dataEditablePhoto={`room-${room.slug}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                {/* Tagline Badge */}
                <span className="absolute left-3.5 top-3.5 z-10 rounded-full border border-gold-500/30 bg-forest-950/85 px-3 py-1 text-[11px] font-medium tracking-wide text-gold-300 backdrop-blur-md shadow-md">
                  {room.tagline}
                </span>

                {/* Quick View Button on Hover */}
                <button
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-forest-950/80 px-3 py-1.5 text-xs font-medium text-ivory-50 backdrop-blur-md opacity-90 transition-all hover:bg-gold-500 hover:text-forest-950"
                >
                  <Eye className="size-3.5" /> Details
                </button>
              </div>

              {/* Room Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-forest-950">
                    {room.name}
                  </h3>
                </div>

                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-stone-600">
                  {room.description}
                </p>

                {/* Specs Badges */}
                <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium text-stone-600">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-ivory-100 px-2.5 py-1 text-stone-700">
                    <Maximize className="size-3 text-gold-600" />
                    {room.size}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-ivory-100 px-2.5 py-1 text-stone-700">
                    <Users className="size-3 text-gold-600" />
                    Max {room.maxGuests}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-ivory-100 px-2.5 py-1 text-stone-700">
                    <BedDouble className="size-3 text-gold-600" />
                    {room.bed}
                  </span>
                </div>

                {/* Amenities checklist */}
                <ul className="mt-5 space-y-1.5 border-t border-border/80 pt-4 text-xs text-stone-600">
                  {room.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-gold-500" />
                      {f}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-gold-600 font-medium text-[11px]">
                    <Coffee className="size-3" />
                    Himalayan Breakfast Included
                  </li>
                </ul>

                {/* Pricing & CTA */}
                <div className="mt-6 flex items-end justify-between border-t border-border/80 pt-4">
                  <div>
                    <p className="font-display text-2xl font-bold text-forest-950">
                      {inr(room.price)}
                    </p>
                    <p className="text-[10.5px] uppercase tracking-wider text-stone-600">
                      per night · taxes incl.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => selectRoomForBooking(room.slug)}
                    className="group/btn inline-flex items-center gap-1.5 rounded-full bg-forest-900 px-4 py-2 text-xs font-semibold tracking-wide text-ivory-50 transition-all hover:bg-gold-500 hover:text-forest-950 hover:shadow-lg"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold-500/25 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-gold-500/15 text-gold-600">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-forest-950">Direct Booking Guarantee</p>
              <p className="text-xs text-stone-600">No advance payment required to hold rooms · Free cancellation up to 7 days · Guaranteed lowest tariff</p>
            </div>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full border border-forest-900 px-5 py-2 text-xs font-semibold text-forest-900 transition-colors hover:bg-forest-900 hover:text-ivory-50"
          >
            View All Availability →
          </a>
        </div>
      </div>

      {/* Interactive Room Details Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gold-500/30 bg-card p-6 text-foreground shadow-2xl sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedRoom(null)}
                aria-label="Close modal"
                className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
              >
                <X size={16} />
              </button>

              {/* Modal Photo */}
              <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl bg-forest-950">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-forest-950/85 px-3 py-1 text-xs font-medium text-gold-300 backdrop-blur-md">
                  {selectedRoom.tagline}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold text-forest-950">
                    {selectedRoom.name}
                  </h3>
                  <span className="font-display text-2xl font-semibold text-gold-600">
                    {inr(selectedRoom.price)} <span className="text-xs font-sans text-stone-600">/ night</span>
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {selectedRoom.description}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-ivory-100 p-4 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-stone-600">Room Area</p>
                  <p className="mt-1 text-sm font-semibold text-forest-950">{selectedRoom.size}</p>
                </div>
                <div className="border-x border-border">
                  <p className="text-[10px] uppercase tracking-wider text-stone-600">Capacity</p>
                  <p className="mt-1 text-sm font-semibold text-forest-950">Up to {selectedRoom.maxGuests} Guests</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-stone-600">Bed Setup</p>
                  <p className="mt-1 text-sm font-semibold text-forest-950">{selectedRoom.bed}</p>
                </div>
              </div>

              {/* All Inclusions */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                  Room Features &amp; Complimentary Perks
                </h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedRoom.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-stone-700">
                      <Check className="size-3.5 text-gold-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <Check className="size-3.5 text-gold-600 shrink-0" />
                    <span>Daily Farmhouse Himalayan Breakfast</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <Check className="size-3.5 text-gold-600 shrink-0" />
                    <span>Unlimited Local Kangra Tea</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <Check className="size-3.5 text-gold-600 shrink-0" />
                    <span>Solar-powered 24×7 Geysers</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedRoom(null)}
                  className="w-full sm:w-auto rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-stone-600 hover:bg-muted"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => selectRoomForBooking(selectedRoom.slug)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-forest-950 shadow-lg hover:brightness-105"
                >
                  <span>Select &amp; Reserve This Room</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}