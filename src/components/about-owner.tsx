"use client";

import { motion } from "framer-motion";
import { MessageSquare, Heart, Quote } from "lucide-react";
import { KineticHeading, ParallaxImage } from "@/components/ui/scroll-reveal";

export function AboutOwner() {
  return (
    <section id="about" className="relative bg-ivory-100 py-28 transition-colors duration-300">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12">
        {/* Host Portrait Column with Parallax Depth */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-gold-500/30 shadow-2xl bg-forest-950">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=900&auto=format&fit=crop"
              alt="Rahul Kapoor, founder and host of Green House Dharamkot"
              aspectRatio="aspect-auto"
              className="size-full"
              imgClassName="h-[125%] brightness-[0.95] contrast-[1.05]"
              speed={16}
              scaleRange={[1.08, 1.0]}
              dataEditablePhoto="about-owner"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-60" />
          </div>

          {/* Experience Badge with Spring Lift */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 -right-4 rounded-2xl border border-gold-500/40 bg-forest-950 px-6 py-4 shadow-2xl backdrop-blur-md"
          >
            <p className="font-display text-3xl font-bold text-gold-400">8+ Years</p>
            <p className="text-xs font-medium uppercase tracking-wider text-ivory-50/70">
              Himalayan Hospitality
            </p>
          </motion.div>
        </motion.div>

        {/* Editorial Story Column */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
            <Heart className="size-3 text-gold-600" />
            Your Host in Dharamkot
          </div>

          <KineticHeading
            text="Meet Your Host, Rahul Kapoor"
            highlightWords={["Rahul", "Kapoor"]}
            className="mt-4 font-display text-4xl font-semibold text-forest-950 sm:text-5xl"
          />

          {/* Pull Quote */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 flex items-start gap-3 rounded-2xl border-l-4 border-gold-500 bg-card p-5 shadow-sm"
          >
            <Quote className="size-8 text-gold-500/40 shrink-0 mt-0.5" />
            <p className="font-display text-base italic text-forest-950 leading-relaxed">
              &ldquo;Green House was never designed as a commercial hotel. It was built as an open mountain home for travelers who appreciate the stillness of the pines.&rdquo;
            </p>
          </motion.div>

          <p className="mt-6 text-base text-stone-600 leading-relaxed">
            Rahul grew up watching mountain mist roll over Dharamkot’s pine ridges long before this stretch of hillside became a fixture on travellers’ itineraries. Green House began as a family mountain home — the kind with too many rooms, wood fires, and endless kettles of Kangra tea — and grew organically into a peaceful retreat where guests return season after season.
          </p>

          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            Today, he still greets guests personally, tends the kitchen garden on quiet mornings, and insists that the finest part of Dharamkot is stepping out onto the forest trails. That philosophy shapes every detail here — from the warm breakfast siddu to the handmade trail maps he draws for anyone who asks.
          </p>

          {/* Host Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-border/80 pt-6">
            <div>
              <p className="font-display text-2xl font-bold text-forest-950">1,200+</p>
              <p className="text-xs text-stone-600">Travelers Hosted</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-forest-950">4.9 / 5</p>
              <p className="text-xs text-stone-600">Direct Guest Rating</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-forest-950">100%</p>
              <p className="text-xs text-stone-600">Personal Host Care</p>
            </div>
          </div>

          {/* Direct WhatsApp CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/919816048210?text=Hi%20Rahul,%20I'm%20planning%20a%20trip%20to%20Dharamkot%20and%20would%20love%20to%20learn%20more%20about%20staying%20at%20Green%20House."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-forest-900 px-6 py-3 text-xs font-semibold tracking-wide text-ivory-50 transition-all hover:bg-gold-500 hover:text-forest-950 shadow-md"
            >
              <MessageSquare className="size-4" />
              <span>Ask Rahul a Question on WhatsApp</span>
            </a>

            <span className="text-xs text-stone-500">Usually replies within 2–3 hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}