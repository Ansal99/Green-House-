"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Maximize2 } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";
import { KineticHeading } from "@/components/ui/scroll-reveal";

const galleryCaptions = [
  "Sunlight filtering through the deodar pine canopy at sunrise",
  "Warm handcrafted timber interiors with private sitting balconies",
  "The peaceful reading room overlooking the Kangra valley",
  "Evening bonfire gathered under the Himalayan stars",
  "Morning chai served in the stone garden courtyard",
  "Fresh mountain mist rolling over the Upper Dharamkot ridges",
  "Communal long table dinner prepared from our kitchen garden",
  "Snow-capped Dhauladhar peaks visible from the top-floor terrace",
];

function MarqueeRow({
  images,
  reverse = false,
  onImageClick,
}: {
  images: string[];
  reverse?: boolean;
  onImageClick: (index: number) => void;
}) {
  if (!images || images.length === 0) return null;
  // Duplicate enough times to ensure seamless infinite loop
  const repeatCount = Math.max(2, Math.ceil(8 / images.length));
  const loop = Array.from({ length: repeatCount }).flatMap(() => images);
  return (
    <div className="group flex overflow-hidden">
      <motion.div
        className="flex gap-5 pr-5"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        style={{ willChange: "transform" }}
        whileHover={{ transition: { duration: 120 } }}
      >
        {loop.map((src, i) => {
          const originalIndex = i % images.length;
          return (
            <div
              key={i}
              onClick={() => onImageClick(originalIndex)}
              className="group/card relative h-72 w-[26rem] flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-gold-500/20 bg-forest-950 shadow-xl"
            >
              <img
                src={src}
                alt="Green House Dharamkot photo"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                data-editable-photo="gallery"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-60 transition-opacity group-hover/card:opacity-90" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-medium text-ivory-50/90 drop-shadow truncate pr-2">
                  {galleryCaptions[originalIndex % galleryCaptions.length]}
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-forest-950/80 text-gold-400 border border-gold-500/30 backdrop-blur-sm opacity-0 transition-opacity group-hover/card:opacity-100">
                  <Maximize2 size={12} />
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function GalleryMarquee() {
  const { galleryImages } = useSiteContent();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const rowOne = galleryImages.slice(0, Math.ceil(galleryImages.length / 2));
  const rowTwo = galleryImages.slice(Math.ceil(galleryImages.length / 2));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
  }, [lightboxIndex, galleryImages.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
  }, [lightboxIndex, galleryImages.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <section id="gallery" className="relative bg-forest-950 py-28 text-ivory-50">
      {/* Section Header */}
      <div className="mx-auto mb-14 max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300">
          <Camera className="size-3 text-gold-400" />
          Moments at Green House
        </div>
        <KineticHeading
          text="Visual Memories of Dharamkot"
          highlightWords={["Visual", "Memories"]}
          className="mt-4 font-display text-4xl font-semibold text-ivory-50 sm:text-5xl"
        />
        <p className="mx-auto mt-4 max-w-xl text-base text-ivory-50/70">
          Mist over deodar branches, morning chai on sit-outs, and starlit bonfires.
          Click any frame to view in high definition.
        </p>
      </div>

      {/* Marquee Rows */}
      <div className="flex flex-col gap-6">
        <MarqueeRow images={rowOne} onImageClick={(idx) => openLightbox(idx)} />
        <MarqueeRow images={rowTwo} reverse onImageClick={(idx) => openLightbox(rowOne.length + idx)} />
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              className="absolute top-6 right-6 z-50 grid size-10 place-items-center rounded-full border border-white/20 bg-forest-950/80 text-ivory-50 transition-colors hover:bg-gold-500 hover:text-forest-950"
            >
              <X size={20} />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous photograph"
              className="absolute left-6 z-50 grid size-12 place-items-center rounded-full border border-white/20 bg-forest-950/80 text-ivory-50 transition-colors hover:bg-gold-500 hover:text-forest-950"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next photograph"
              className="absolute right-6 z-50 grid size-12 place-items-center rounded-full border border-white/20 bg-forest-950/80 text-ivory-50 transition-colors hover:bg-gold-500 hover:text-forest-950"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-3xl border border-gold-500/30 bg-forest-950 shadow-2xl"
            >
              <img
                src={galleryImages[lightboxIndex]}
                alt="Green House Dharamkot high-resolution gallery"
                className="max-h-[75vh] w-auto object-contain"
              />
              <div className="flex items-center justify-between border-t border-white/10 bg-forest-950/95 px-6 py-4">
                <p className="text-sm font-medium text-ivory-50">
                  {galleryCaptions[lightboxIndex % galleryCaptions.length]}
                </p>
                <span className="text-xs font-semibold text-gold-400">
                  {lightboxIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}