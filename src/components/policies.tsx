"use client";

import { motion } from "framer-motion";
import { CalendarClock, CreditCard, Home, ShieldCheck, CheckCircle2 } from "lucide-react";
import { KineticHeading } from "@/components/ui/scroll-reveal";

const groups = [
  {
    icon: CalendarClock,
    title: "Check-in & Check-out",
    items: [
      "Check-in from 1:00 PM, check-out by 11:00 AM",
      "Complimentary early arrival lounge and luggage care for 6 AM buses",
      "Valid government photo ID required for every adult guest (Himachal tourism regulations)",
      "Foreign nationals: passport and valid visa recorded at arrival",
    ],
  },
  {
    icon: CreditCard,
    title: "Transparent Payment & Flexibility",
    items: [
      "Zero advance deposit to hold rooms — direct host guarantee",
      "Free 100% cancellation up to 7 days before arrival date",
      "Within 7 days: one night charged only if the room cannot be re-hosted",
      "UPI, credit cards, and direct bank transfers settled at checkout",
    ],
  },
  {
    icon: Home,
    title: "House Rules & Courtesies",
    items: [
      "Quiet hours observed from 10:30 PM — valley sound carries far",
      "Outdoor terrace smoking only; strictly no smoking inside wooden rooms",
      "Beloved pets welcomed at zero charge; please do not leave pets unattended",
      "Outside visitors not staying overnight should be registered at the reception",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Safety, Health & Ecology",
    items: [
      "Complete solar geyser system with 24×7 hot water and power backup",
      "First-aid and emergency mountain kit on site; Zonal Hospital 20 mins away",
      "Daily filtered mountain spring water provided — please minimize single-use plastics",
      "Secure room lockers available on request for valuables and electronics",
    ],
  },
];

export function Policies() {
  return (
    <section id="policies" className="relative overflow-hidden bg-forest-950 py-28 text-ivory-50">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300">
            <ShieldCheck className="size-3 text-gold-400" />
            Guest Information
          </div>
          <KineticHeading
            text="Stay Policies & House Rules"
            highlightWords={["Policies", "Rules"]}
            className="mt-4 font-display text-4xl text-ivory-50 sm:text-5xl"
          />
          <p className="mt-4 text-base leading-relaxed text-ivory-50/70">
            Kept transparent and respectful. We want your Himalayan journey to be easy, relaxed,
            and completely free of surprises.
          </p>
        </motion.div>

        {/* Policy Cards Grid with Spring Dynamics */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-3xl border border-gold-500/20 bg-forest-900/40 p-6 backdrop-blur-md shadow-lg transition-all hover:border-gold-500/40 hover:shadow-xl"
            >
              <div>
                <div className="grid size-11 place-items-center rounded-2xl border border-gold-500/30 bg-gold-500/15 text-gold-400 shadow-sm">
                  <group.icon className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ivory-50">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-ivory-50/65"
                    >
                      <CheckCircle2 className="size-3.5 shrink-0 text-gold-400/80 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-14 text-center text-xs text-ivory-50/40">
          Updated September 2026 · Green House · Upper Dharamkot, Dharamshala, Himachal Pradesh 176219
        </p>
      </div>
    </section>
  );
}