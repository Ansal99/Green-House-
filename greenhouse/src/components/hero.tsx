"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
const ref = useRef<HTMLElement>(null);

const { scrollYProgress } = useScroll({
target: ref,
offset: ["start start", "end start"],
});

const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

return ( <section
   id="home"
   ref={ref}
   className="relative h-screen w-full overflow-hidden"
 >
{/* Background Image */}
<motion.div
style={{ y: imageY }}
className="absolute inset-0 h-[130%]"
> <img
       src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop"
       alt="Green House hotel nestled in the pine forests of Dharamkot"
       className="h-full w-full object-cover"
     />


    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/20" />
  </motion.div>

  {/* Hero Content */}
  <motion.div
    style={{ y: textY, opacity }}
    className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
  >
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mb-4 text-xs uppercase tracking-[0.4em] text-gold-400"
    >
      A Sanctuary Above McLeod Ganj
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.9 }}
      className="max-w-3xl font-display text-5xl font-semibold leading-tight text-ivory-50 md:text-7xl"
    >
      Green House
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="mt-5 max-w-xl text-base font-light text-ivory-50/80 md:text-lg"
    >
      Wake up to the deodar forests and snow-lined peaks of Dharamkot —
      where mountain stillness meets quiet, personal hospitality.
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="mt-10 flex flex-wrap justify-center gap-4"
    >
      <a
        href="#booking"
        className="rounded-full bg-gold-500 px-8 py-3 text-sm font-medium text-forest-950 transition-transform hover:scale-105 hover:bg-gold-400"
      >
        Check Availability
      </a>

      <a
        href="#rooms"
        className="rounded-full border border-ivory-50/30 px-8 py-3 text-sm text-ivory-50 transition-colors hover:border-gold-400 hover:text-gold-400"
      >
        Explore Rooms
      </a>
    </motion.div>
  </motion.div>

  {/* Scroll Indicator */}
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivory-50/60"
  >
    <div className="h-9 w-5 rounded-full border border-ivory-50/40 p-1">
      <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
    </div>
  </motion.div>
</section>


);
}
