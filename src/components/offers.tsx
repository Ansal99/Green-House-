"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Tag, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";
import { KineticHeading, ParallaxImage } from "@/components/ui/scroll-reveal";

export function Offers() {
  const { offers } = useSiteContent();
  return (
    <section id="offers" className="relative bg-ivory-50 py-28 transition-colors duration-300">
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
            <Tag className="size-3 text-gold-600" />
            Direct Booking Discounts
          </div>
          <KineticHeading
            text="Special Offers & Extended Stays"
            highlightWords={["Offers", "Stays"]}
            className="mt-4 font-display text-4xl font-semibold text-forest-950 sm:text-5xl"
          />
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Booking directly with us avoids third-party agent commissions.
            That allows us to pass real savings directly to you — including free airport transfers,
            weekly discounts, and complimentary home-cooked breakfasts.
          </p>
        </motion.div>

        {/* Offers Grid with Spring Elevation */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {offers.map((offer, i) => (
            <motion.article
              key={offer.title}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl ${
                offer.featured
                  ? "bg-forest-950 text-ivory-50 ring-2 ring-gold-500 md:-mt-4 md:mb-4 shadow-2xl"
                  : "bg-card border border-stone-200/80 shadow-md"
              } transition-shadow duration-500 hover:shadow-2xl`}
            >
              {/* Photo Frame with Parallax */}
              <div className="relative aspect-[16/10] overflow-hidden bg-forest-950">
                <ParallaxImage
                  src={offer.image}
                  alt={offer.title}
                  aspectRatio="aspect-auto"
                  className="size-full"
                  imgClassName="h-[125%] transition-transform duration-700 group-hover:scale-105"
                  speed={12}
                  scaleRange={[1.08, 1.0]}
                  dataEditablePhoto={offer.key}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 z-10 rounded-full bg-gold-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-forest-950 shadow-md">
                  {offer.badge}
                </span>
              </div>

              {/* Offer Details */}
              <div className="flex flex-1 flex-col p-7">
                <p
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
                    offer.featured ? "text-gold-400" : "text-gold-600"
                  }`}
                >
                  {offer.subtitle}
                </p>

                <h3
                  className={`mt-2 font-display text-2xl font-bold ${
                    offer.featured ? "text-ivory-50" : "text-forest-950"
                  }`}
                >
                  {offer.title}
                </h3>

                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    offer.featured ? "text-ivory-50/75" : "text-stone-600"
                  }`}
                >
                  {offer.body}
                </p>

                {/* Included Checklist */}
                <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-5">
                  {offer.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2.5 text-xs font-medium ${
                        offer.featured ? "text-ivory-50/90" : "text-stone-700"
                      }`}
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Action */}
                <Link
                  href={`/reserve?offer=${offer.key}`}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3 text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    offer.featured
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 text-forest-950 shadow-lg hover:brightness-105"
                      : "border border-forest-900 bg-transparent text-forest-950 hover:bg-forest-900 hover:text-ivory-50"
                  }`}
                >
                  <span>Reserve With This Offer</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Note */}
        <p className="mt-12 text-center text-xs text-stone-500">
          ✦ Direct offers cannot be combined with third-party vouchers. Subject to seasonal availability.
        </p>
      </div>
    </section>
  );
}