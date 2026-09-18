"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, CheckCircle2 } from "lucide-react";
import { KineticHeading } from "@/components/ui/scroll-reveal";

type ReviewCategory = "all" | "work" | "couples" | "family" | "solo";

const reviews = [
  {
    name: "Ananya Sharma",
    from: "Bengaluru",
    stay: "Valley Balcony Room · March",
    category: "couples",
    rating: 5,
    body: "I came for three nights and stayed eleven. The private balcony ruined every other mountain balcony for me. Rahul drew a trail map on the back of a napkin that turned out better than any app.",
  },
  {
    name: "Tobias Lang",
    from: "Berlin",
    stay: "Deodar Suite · October",
    category: "work",
    rating: 5,
    body: "Worked remotely from here for a month. The fibre Wi-Fi genuinely held up on Zoom calls, which I did not expect at 2,100 metres. The communal long-table dinners meant I never once felt isolated.",
  },
  {
    name: "Meera & Arjun",
    from: "Mumbai",
    stay: "Garden Cottage · December",
    category: "family",
    rating: 5,
    body: "Travelled with our toddler and a very anxious golden retriever. Both were welcomed with open arms. The pinecone bonfire every evening under the starry Dharamkot sky became the highlight of our winter.",
  },
  {
    name: "Sana Qureshi",
    from: "Delhi",
    stay: "Pine View Room · July",
    category: "solo",
    rating: 5,
    body: "Monsoon Dharamkot is breathtaking — green, misty, and quiet. The sunlit reading room, endless Kangra chai, and steaming siddu breakfasts made it the best kind of mountain cocoon.",
  },
  {
    name: "Daniel Okafor",
    from: "London",
    stay: "Valley Balcony Room · May",
    category: "couples",
    rating: 5,
    body: "Booked directly through this page, got an unbeatable direct rate and a complimentary room upgrade. The staff remembered how I take my morning tea by day two. Small boutique retreat, extraordinary hospitality.",
  },
  {
    name: "Ritika Bansal",
    from: "Chandigarh",
    stay: "Deodar Suite · November",
    category: "work",
    rating: 5,
    body: "Came solo to write my manuscript. Nobody disturbed me, yet Rahul and the team quietly made sure hot tea and meals were ready right when I took breaks. A rare balance few hotels master.",
  },
];

export function Reviews() {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>("all");

  const filteredReviews = reviews.filter((r) => {
    if (activeCategory === "all") return true;
    return r.category === activeCategory;
  });

  return (
    <section id="reviews" className="relative bg-ivory-50 py-28 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header & Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
              <Star className="size-3 text-gold-600 fill-gold-600" />
              Direct Guest Stories
            </div>
            <KineticHeading
              text="In Their Own Words"
              highlightWords={["Words"]}
              className="mt-4 font-display text-4xl font-semibold text-forest-950 sm:text-5xl"
            />
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Real reflections from travelers who stayed with us in Upper Dharamkot.
              Honest notes from our guestbook and WhatsApp messages.
            </p>
          </motion.div>

          {/* Social Proof Stat Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="flex shrink-0 items-center gap-6 rounded-3xl border border-stone-200/80 bg-card px-8 py-5 shadow-lg"
          >
            <div>
              <p className="font-display text-4xl font-bold text-forest-950">4.9</p>
              <div className="mt-1 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold-500 text-gold-500" />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-xs text-stone-600">
              <p className="font-bold text-forest-950 text-sm">418+ Reviews</p>
              <p className="text-stone-500">Google &amp; Direct Guests</p>
              <p className="mt-0.5 font-medium text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="size-3" /> 100% Verified
              </p>
            </div>
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="mt-12 flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Experiences" },
            { id: "work", label: "Remote Work & Writers" },
            { id: "couples", label: "Couples & Escapes" },
            { id: "family", label: "Families & Pets" },
            { id: "solo", label: "Solo Travelers" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as ReviewCategory)}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat.id
                  ? "bg-forest-900 text-ivory-50 shadow-md ring-1 ring-gold-500/40"
                  : "border border-stone-300/80 bg-card text-stone-600 hover:border-gold-500/50 hover:text-forest-950"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-stone-200/80 bg-card p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Quote className="size-7 text-gold-500/30 transition-colors group-hover:text-gold-500/60" />
                  <div className="flex gap-0.5">
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
                </div>

                <blockquote className="mt-4 text-sm leading-relaxed text-stone-600">
                  &ldquo;{review.body}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-6 border-t border-border/80 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-forest-950">
                      {review.name}
                    </p>
                    <p className="text-xs text-stone-500">{review.from}</p>
                  </div>
                  <span className="rounded-full bg-ivory-100 px-2.5 py-0.5 text-[10.5px] font-medium text-stone-600">
                    {review.stay.split("·")[0]}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}