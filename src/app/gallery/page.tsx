"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, Maximize2, X, ChevronLeft, ChevronRight, MessageSquare, Calendar } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";
import { Footer } from "@/components/footer";

const infrastructureCategories = [
  { id: "all", label: "All Infrastructure" },
  { id: "architecture", label: "Timber Architecture" },
  { id: "interiors", label: "Suites & Living" },
  { id: "grounds", label: "Mountain Grounds & Views" },
];

export default function InfrastructureGalleryPage() {
  const { infrastructureImages, galleryImages, logoImage } = useSiteContent();
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine infrastructure photos with gallery photos for complete property showcase
  const allPhotos = [...(infrastructureImages || []), ...(galleryImages || [])];

  const filteredPhotos = allPhotos.filter((_, index) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "architecture") return index % 3 === 0;
    if (activeFilter === "interiors") return index % 3 === 1;
    if (activeFilter === "grounds") return index % 3 === 2;
    return true;
  });

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <main className="min-h-screen bg-forest-950 text-ivory-50">
      {/* Top Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-gold-500/20 bg-forest-950/95 backdrop-blur-xl px-6 py-4">
        <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ivory-50/80 transition-all hover:border-gold-400 hover:bg-white/10 hover:text-gold-300"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Return to Sanctuary</span>
            <span>← Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="relative grid size-10 place-items-center rounded-xl border border-gold-500/40 bg-forest-900 font-display text-sm font-bold text-gold-400 overflow-hidden shadow-md">
              {logoImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoImage} alt="Green House Logo" className="size-full object-cover" />
              ) : (
                <span>GH</span>
              )}
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-base font-medium text-ivory-50">
                Green <span className="text-gold-400 italic font-normal">House</span>
              </p>
              <p className="text-[10px] tracking-widest text-ivory-50/50 uppercase">
                Property &amp; Infrastructure Showcase
                Property &amp; Rooms Showcase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919816048210?text=Hello%20Rahul,%20I'm%20inquiring%20about%20Green%20House%20infrastructure%20and%20amenities."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs text-emerald-300 transition-colors hover:bg-emerald-900/50"
            >
              <MessageSquare className="size-3.5 text-emerald-400" />
              <span>Concierge WhatsApp</span>
              <span>WhatsApp Rahul</span>
            </a>

            <Link
              href="/reserve"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest-950 shadow-md transition-all hover:brightness-105"
            >
              <Calendar className="size-3.5 text-forest-950" />
              <span>Reserve Stay</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative px-6 pt-16 pb-12 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
            <Camera className="size-3.5 text-gold-400" />
            Infrastructure &amp; Estate Gallery
            Property &amp; Rooms Gallery
          </div>

          <h1 className="font-display text-4xl font-semibold sm:text-5xl lg:text-6xl text-ivory-50">
            Sanctuary Architecture &amp; Grounds
            Property, Rooms &amp; Grounds
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-ivory-50/70 sm:text-base">
            Explore our handcrafted deodar timber architecture, stone pathways, sun-drenched private balconies, and peaceful garden courtyards nestled into Upper Dharamkot’s forest slope (2,100m).
            Explore our wooden rooms, stone pathways, private balconies, and garden courtyards set in Upper Dharamkot (2,100m).
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {infrastructureCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all ${
                  activeFilter === cat.id
                    ? "bg-gold-500 text-forest-950 shadow-md font-bold"
                    : "border border-white/15 bg-white/5 text-ivory-50/70 hover:border-gold-500/40 hover:bg-white/10 hover:text-ivory-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Photo Grid */}
      <section className="mx-auto max-w-[1520px] px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl border border-gold-500/20 bg-forest-900/60 shadow-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`Green House Dharamkot property view ${index + 1}`}
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-90" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-medium text-ivory-50 drop-shadow">
                  Upper Dharamkot Sanctuary View #{index + 1}
                  Green House Dharamkot Photo #{index + 1}
                </span>
                <span className="grid size-8 place-items-center rounded-full bg-forest-950/90 text-gold-400 border border-gold-500/30 backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 size={13} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo view"
              className="absolute right-6 top-6 grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-ivory-50 hover:bg-white/20"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              aria-label="Previous photo"
              className="absolute left-6 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-ivory-50 hover:bg-white/20"
            >
              <ChevronLeft size={24} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-3xl border border-gold-500/30 bg-forest-950 shadow-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filteredPhotos[lightboxIndex]}
                alt="Enlarged retreat photograph"
                className="max-h-[80vh] w-auto object-contain"
              />
              <div className="flex items-center justify-between border-t border-white/10 bg-forest-950/95 px-6 py-3 text-xs text-ivory-50/70">
                <span>
                  Photo {lightboxIndex + 1} of {filteredPhotos.length}
                </span>
                <span className="text-gold-400">Green House Dharamkot Infrastructure</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              aria-label="Next photo"
              className="absolute right-6 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-ivory-50 hover:bg-white/20"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

