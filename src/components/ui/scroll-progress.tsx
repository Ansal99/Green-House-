"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] pointer-events-none bg-transparent"
    >
      {/* Hairline background track */}
      <div className="absolute inset-0 bg-forest-950/20" />

      {/* Progress Bar with Champagne Gold Gradient & Ambient Glow */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="relative h-full w-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 shadow-[0_0_12px_rgba(216,178,87,0.8)]"
      >
        {/* Leading edge sparkle dot */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-ivory-50 shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
      </motion.div>
    </div>
  );
}

