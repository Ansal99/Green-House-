"use client";

import { motion } from "framer-motion";

const rowOne = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=900&auto=format&fit=crop",
];

const rowTwo = [
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=900&auto=format&fit=crop",
];

function MarqueeRow({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  const loop = [...images, ...images];
  return (
    <div className="group flex overflow-hidden">
      <motion.div
        className="flex gap-4 pr-4"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        style={{ willChange: "transform" }}
        whileHover={{ transitionDuration: "90s" } as any}
      >
        {loop.map((src, i) => (
          <div
            key={i}
            className="relative h-64 w-96 flex-shrink-0 overflow-hidden rounded-xl"
          >
            <img
              src={src}
              alt="Green House Dharamkot — property gallery photo"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              data-editable-photo="gallery"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function GalleryMarquee() {
  return (
    <section id="gallery" className="bg-forest-900 py-16">
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-400">
          A Glimpse Inside
        </p>
        <h2 className="mt-2 font-display text-3xl text-ivory-50 md:text-4xl">
          The Green House Gallery
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <MarqueeRow images={rowOne} />
        <MarqueeRow images={rowTwo} reverse />
      </div>
    </section>
  );
}