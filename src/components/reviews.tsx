"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Ananya Sharma",
    from: "Bengaluru",
    stay: "Valley Balcony Room · March",
    rating: 5,
    body: "I came for three nights and stayed eleven. The balcony ruined every other hotel balcony for me. Rahul drew a trail map on the back of a napkin that turned out better than any app.",
  },
  {
    name: "Tobias Lang",
    from: "Berlin",
    stay: "Deodar Suite · October",
    rating: 5,
    body: "Worked remotely from here for a month. The Wi-Fi genuinely held up on calls, which I did not expect at 2,100 metres. The long-table dinners meant I never once ate alone.",
  },
  {
    name: "Meera & Arjun",
    from: "Mumbai",
    stay: "Garden Cottage · December",
    rating: 5,
    body: "Travelled with a toddler and a very anxious dog. Both were welcomed better than we were. The bonfire every evening became the whole trip for us.",
  },
  {
    name: "Sana Qureshi",
    from: "Delhi",
    stay: "Pine View Room · July",
    rating: 4,
    body: "Monsoon Dharamkot is not for everyone — it rained four days straight. But the reading room, endless chai and that siddu breakfast made it the best kind of stuck.",
  },
  {
    name: "Daniel Okafor",
    from: "London",
    stay: "Valley Balcony Room · May",
    rating: 5,
    body: "Booked directly, got a rate no site could match and an upgrade for free. Staff remembered how I take my tea by day two. Small place, serious hospitality.",
  },
  {
    name: "Ritika Bansal",
    from: "Chandigarh",
    stay: "Deodar Suite · November",
    rating: 5,
    body: "Went solo to write. Nobody bothered me, everybody checked on me — a balance I have never seen a hotel get right before.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="bg-ivory-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
              In Their Words
            </p>
            <h2 className="mt-3 font-display text-3xl text-forest-950 md:text-4xl">
              Guest Reviews
            </h2>
            <p className="mt-5 text-stone-600 leading-relaxed">
              Collected from guests who stayed with us directly. Unedited, minus
              the typos.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-6 rounded-2xl bg-card px-7 py-5 shadow-sm ring-1 ring-black/5">
            <div>
              <p className="font-display text-3xl text-forest-950">4.9</p>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3 fill-gold-500 text-gold-500" />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-sm text-stone-600">
              <p className="text-forest-950">418 reviews</p>
              <p className="text-xs">across Google &amp; Booking.com</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              className="group relative flex flex-col rounded-2xl bg-card p-7 shadow-sm ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <Quote className="size-6 text-gold-500/35" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-stone-600">
                {review.body}
              </blockquote>
              <div className="mt-6 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`size-3.5 ${
                      s < review.rating
                        ? "fill-gold-500 text-gold-500"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <figcaption className="mt-4 border-t border-border pt-4">
                <p className="text-sm text-forest-950">
                  {review.name}
                  <span className="text-stone-600"> · {review.from}</span>
                </p>
                <p className="mt-0.5 text-xs text-stone-600">{review.stay}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}