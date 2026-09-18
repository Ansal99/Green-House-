"use client";

import { motion } from "framer-motion";

export function AboutOwner() {
  return (
    <section id="about" className="bg-ivory-50 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=900&auto=format&fit=crop"
              alt="Rahul Kapoor, owner of Green House Dharamkot"
              className="h-full w-full object-cover"
              data-editable-photo="about-owner"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-forest-950 px-6 py-4 shadow-lg md:block">
            <p className="font-display text-2xl text-gold-400">8+ Years</p>
            <p className="text-xs text-ivory-50/70">of Mountain Hospitality</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
            The Story Behind Green House
          </p>
          <h2 className="mt-3 font-display text-3xl text-forest-950 md:text-4xl">
            Meet Rahul Kapoor
          </h2>
          <p className="mt-6 text-stone-600 leading-relaxed">
            Rahul grew up watching the mist roll over Dharamkot's pine
            ridges, long before this stretch of hillside became a stop on
            every traveller's map. Green House began as a small family
            home — the kind with too many rooms and too much tea — and
            slowly grew into a place where strangers kept coming back as
            friends.
          </p>
          <p className="mt-4 text-stone-600 leading-relaxed">
            Today he still greets most guests personally, keeps the garden
            himself on quiet mornings, and insists that the best part of
            Dharamkot isn't the view from the room — it's stepping outside
            it. That philosophy shapes everything here, from the
            handpicked local breakfast to the walking trails he maps out
            himself for anyone who asks.
          </p>
          <div className="mt-8 flex gap-10">
            <div>
              <p className="font-display text-2xl text-forest-950">1,200+</p>
              <p className="text-sm text-stone-600">Happy Travellers Hosted</p>
            </div>
            <div>
              <p className="font-display text-2xl text-forest-950">4.9 / 5</p>
              <p className="text-sm text-stone-600">Average Guest Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}