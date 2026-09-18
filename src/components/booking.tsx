"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, PartyPopper, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";
import { inr } from "@/lib/rooms";
import { useSiteContent } from "@/lib/site-content";

export type BookingProps = {
  initialRoom?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
  initialOffer?: string;
  isStandalonePage?: boolean;
};

type BookingData = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomSlug: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const steps = ["Dates", "Room", "Details", "Review"] as const;

const emptyBooking: BookingData = {
  checkIn: "",
  checkOut: "",
  adults: 2,
  children: 0,
  roomSlug: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-ivory-50 outline-none transition-all placeholder:text-ivory-50/30 focus:border-gold-400 focus:bg-white/10 focus:ring-1 focus:ring-gold-400/50 [color-scheme:dark]";

const labelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400/90";

export function Booking({
  initialRoom = "",
  initialCheckIn = "",
  initialCheckOut = "",
  initialAdults = 2,
  initialChildren = 0,
  initialOffer = "",
  isStandalonePage = false,
}: BookingProps) {
  const { rooms } = useSiteContent();
  const [step, setStep] = useState(() => (initialRoom ? 1 : 0));
  const [data, setData] = useState<BookingData>(() => ({
    ...emptyBooking,
    roomSlug: initialRoom,
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    adults: initialAdults,
    children: initialChildren,
    notes: initialOffer ? `Claiming package: ${initialOffer}` : "",
  }));
  const [done, setDone] = useState(false);

  const [today] = useState(() => new Date().toISOString().split("T")[0]);

  // Listen to quick-book events from Hero or Room cards
  useEffect(() => {
    const handleQuickBook = (e: Event) => {
      const customEvent = e as CustomEvent<Partial<BookingData>>;
      if (customEvent.detail) {
        setData((prev) => ({
          ...prev,
          ...customEvent.detail,
        }));
        if (customEvent.detail.roomSlug) {
          setStep((prev) => Math.max(prev, 1));
        }
      }
    };

    window.addEventListener("greenhouse-quick-book", handleQuickBook);
    return () => window.removeEventListener("greenhouse-quick-book", handleQuickBook);
  }, []);

  const set = <K extends keyof BookingData>(key: K, value: BookingData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const nights = useMemo(() => {
    if (!data.checkIn || !data.checkOut) return 0;
    const diff =
      new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime();
    return Math.max(0, Math.round(diff / 86_400_000));
  }, [data.checkIn, data.checkOut]);

  const selectedRoom = rooms.find((r) => r.slug === data.roomSlug);
  const guests = data.adults + data.children;
  const total = selectedRoom ? selectedRoom.price * nights : 0;

  const canContinue = (() => {
    if (step === 0) return nights > 0 && data.adults > 0;
    if (step === 1) return Boolean(data.roomSlug);
    if (step === 2)
      return (
        data.name.trim().length > 1 &&
        /\S+@\S+\.\S+/.test(data.email) &&
        data.phone.trim().length >= 8
      );
    return true;
  })();

  const reset = () => {
    setData(emptyBooking);
    setStep(0);
    setDone(false);
  };

  // Pre-filled WhatsApp message
  const whatsappUrl = useMemo(() => {
    const roomText = selectedRoom ? `for the ${selectedRoom.name}` : "for a room";
    const dateText =
      data.checkIn && data.checkOut
        ? `from ${formatDate(data.checkIn)} to ${formatDate(data.checkOut)} (${nights} nights)`
        : "for upcoming dates";
    const guestText = `${guests} guest${guests > 1 ? "s" : ""}`;
    const message = `Hello Rahul! I would like to check availability at Green House Dharamkot ${roomText} ${dateText} for ${guestText}. My name is ${data.name || "a traveler"}.`;
    return `https://wa.me/919816048210?text=${encodeURIComponent(message)}`;
  }, [selectedRoom, data.checkIn, data.checkOut, nights, guests, data.name]);

  return (
    <section
      id="booking"
      className={`relative overflow-hidden bg-forest-950 ${isStandalonePage ? "min-h-screen py-10 sm:py-16" : "py-28"}`}
    >
      <div className="pointer-events-none absolute right-0 top-0 size-[32rem] rounded-full bg-gold-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-[28rem] rounded-full bg-gold-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Standalone Page Luxury Header */}
        {isStandalonePage && (
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ivory-50/80 transition-all hover:border-gold-400 hover:bg-white/10 hover:text-gold-300"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              <span>← Back to Home</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-full border border-gold-500/40 bg-forest-900 font-display text-sm font-bold text-gold-400">
                GH
              </div>
              <div className="hidden sm:block">
                <p className="font-display text-base text-ivory-50">Green <span className="text-gold-400 italic font-normal">House</span></p>
                <p className="text-[10px] tracking-widest text-ivory-50/50 uppercase">Upper Dharamkot · 2,100m</p>
              </div>
            </div>

            <a
              href="https://wa.me/919816048210?text=Hello%20Rahul,%20I%20have%20a%20question%20about%20booking%20at%20Green%20House."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs text-emerald-300 transition-colors hover:bg-emerald-900/50"
            >
              <MessageSquare className="size-3.5 text-emerald-400" />
              <span>WhatsApp Rahul</span>
            </a>
          </div>
        )}

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300">
            <Calendar className="size-3 text-gold-400" />
            Direct Reservation
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ivory-50 sm:text-5xl">
            Reserve Your Mountain Stay
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ivory-50/70">
            Reserve directly with host Rahul Kapoor. Zero advance payment needed —
            we verify dates and confirm via WhatsApp or phone within a few hours.
          </p>

          {/* Quick WhatsApp Alternative Banner */}
          <div className="mx-auto mt-6 flex max-w-lg items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-200 backdrop-blur-sm">
            <MessageSquare className="size-4 shrink-0 text-emerald-400" />
            <span>Prefer instant WhatsApp chat?</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-emerald-500 px-3.5 py-1 text-[11px] font-semibold text-forest-950 transition-colors hover:bg-emerald-400"
            >
              Chat on WhatsApp →
            </a>
          </div>
        </motion.div>

        {/* Main Booking Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-12 overflow-hidden rounded-3xl border border-gold-500/20 bg-forest-900/60 shadow-2xl backdrop-blur-xl"
        >
          {/* Stepper */}
          {!done && (
            <div className="border-b border-white/10 px-6 py-6 sm:px-10">
              <div className="flex items-center">
                {steps.map((label, i) => (
                  <div key={label} className="flex flex-1 items-center last:flex-none">
                    <button
                      type="button"
                      onClick={() => i < step && setStep(i)}
                      disabled={i > step}
                      className="flex shrink-0 items-center gap-2.5 disabled:cursor-default"
                    >
                      <span
                        className={`grid size-8 place-items-center rounded-full border text-xs font-semibold transition-colors duration-300 ${
                          i < step
                            ? "border-gold-500 bg-gold-500 text-forest-950"
                            : i === step
                              ? "border-gold-400 bg-gold-500/20 text-gold-300 ring-2 ring-gold-400/30"
                              : "border-white/15 text-ivory-50/30"
                        }`}
                      >
                        {i < step ? <Check className="size-4" /> : i + 1}
                      </span>
                      <span
                        className={`hidden text-xs font-medium tracking-wider uppercase transition-colors duration-300 sm:block ${
                          i <= step ? "text-ivory-50" : "text-ivory-50/35"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                    {i < steps.length - 1 && (
                      <div className="mx-3 h-px flex-1 bg-white/10">
                        <motion.div
                          className="h-px bg-gold-500"
                          initial={false}
                          animate={{ scaleX: i < step ? 1 : 0 }}
                          style={{ originX: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-6 py-10 sm:px-10">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-8 text-center"
                >
                  <div className="mx-auto grid size-14 place-items-center rounded-full bg-gold-500/15">
                    <PartyPopper className="size-6 text-gold-400" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-ivory-50">
                    Request sent, {data.name.split(" ")[0]}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ivory-50/60">
                    We&apos;ve noted {selectedRoom?.name} for {nights}{" "}
                    {nights === 1 ? "night" : "nights"} from{" "}
                    {formatDate(data.checkIn)}. Rahul will confirm on{" "}
                    {data.phone} shortly.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-sm text-ivory-50 transition-colors hover:bg-white/5"
                  >
                    Make another booking
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Step 1 — Dates & guests */}
                  {step === 0 && (
                    <div>
                      <h3 className="font-display text-xl text-ivory-50">
                        When are you coming?
                      </h3>
                      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="check-in">
                            Check in
                          </label>
                          <input
                            id="check-in"
                            type="date"
                            min={today}
                            value={data.checkIn}
                            onChange={(e) => set("checkIn", e.target.value)}
                            className={fieldClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="check-out">
                            Check out
                          </label>
                          <input
                            id="check-out"
                            type="date"
                            min={data.checkIn || today}
                            value={data.checkOut}
                            onChange={(e) => set("checkOut", e.target.value)}
                            className={fieldClass}
                          />
                        </div>
                        <Counter
                          label="Adults"
                          value={data.adults}
                          min={1}
                          max={8}
                          onChange={(v) => set("adults", v)}
                        />
                        <Counter
                          label="Children"
                          value={data.children}
                          min={0}
                          max={6}
                          onChange={(v) => set("children", v)}
                        />
                      </div>
                      {nights > 0 && (
                        <p className="mt-6 text-sm text-gold-400">
                          {nights} {nights === 1 ? "night" : "nights"} ·{" "}
                          {guests} {guests === 1 ? "guest" : "guests"}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Step 2 — Room */}
                  {step === 1 && (
                    <div>
                      <h3 className="font-display text-xl text-ivory-50">
                        Pick a room
                      </h3>
                      <p className="mt-2 text-sm text-ivory-50/50">
                        Showing what fits {guests}{" "}
                        {guests === 1 ? "guest" : "guests"}.
                      </p>
                      <div className="mt-7 space-y-3">
                        {rooms.map((room) => {
                          const tooSmall = room.maxGuests < guests;
                          const active = data.roomSlug === room.slug;
                          return (
                            <button
                              key={room.slug}
                              type="button"
                              disabled={tooSmall}
                              onClick={() => set("roomSlug", room.slug)}
                              className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-300 ${
                                active
                                  ? "border-gold-500 bg-gold-500/10"
                                  : "border-white/10 hover:border-white/25"
                              } ${tooSmall ? "cursor-not-allowed opacity-35" : ""}`}
                            >
                              <img
                                src={room.image}
                                alt={room.name}
                                className="size-16 shrink-0 rounded-xl object-cover"
                                data-editable-photo={`room-${room.slug}`}
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm text-ivory-50">
                                  {room.name}
                                </p>
                                <p className="mt-0.5 text-xs text-ivory-50/45">
                                  {room.bed} · up to {room.maxGuests} guests
                                  {tooSmall && " · too small for your group"}
                                </p>
                              </div>
                              <div className="shrink-0 text-right">
                                <p className="text-sm text-gold-400">
                                  {inr(room.price)}
                                </p>
                                <p className="text-[11px] text-ivory-50/40">
                                  / night
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 3 — Guest details */}
                  {step === 2 && (
                    <div>
                      <h3 className="font-display text-xl text-ivory-50">
                        Who should we expect?
                      </h3>
                      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="guest-name">
                            Full name
                          </label>
                          <input
                            id="guest-name"
                            value={data.name}
                            onChange={(e) => set("name", e.target.value)}
                            placeholder="Ananya Sharma"
                            className={fieldClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="guest-email">
                            Email
                          </label>
                          <input
                            id="guest-email"
                            type="email"
                            value={data.email}
                            onChange={(e) => set("email", e.target.value)}
                            placeholder="you@example.com"
                            className={fieldClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="guest-phone">
                            WhatsApp number
                          </label>
                          <input
                            id="guest-phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            placeholder="+91 98XXX XXXXX"
                            className={fieldClass}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="guest-notes">
                            Anything we should know? (optional)
                          </label>
                          <textarea
                            id="guest-notes"
                            rows={3}
                            value={data.notes}
                            onChange={(e) => set("notes", e.target.value)}
                            placeholder="Arriving late, vegetarian, travelling with a dog…"
                            className={`${fieldClass} resize-none`}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 — Review */}
                  {step === 3 && (
                    <div>
                      <h3 className="font-display text-xl text-ivory-50">
                        Just checking
                      </h3>
                      <dl className="mt-8 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
                        <Row label="Guest" value={data.name} />
                        <Row label="Contact" value={`${data.phone} · ${data.email}`} />
                        <Row
                          label="Dates"
                          value={`${formatDate(data.checkIn)} → ${formatDate(data.checkOut)}`}
                        />
                        <Row
                          label="Guests"
                          value={`${data.adults} adult${data.adults > 1 ? "s" : ""}${
                            data.children ? `, ${data.children} children` : ""
                          }`}
                        />
                        <Row label="Room" value={selectedRoom?.name ?? "—"} />
                        {data.notes && <Row label="Notes" value={data.notes} />}
                      </dl>

                      <div className="mt-6 rounded-2xl border border-gold-500/25 bg-forest-950/80 p-6 shadow-inner">
                        <div className="flex items-center justify-between text-sm text-ivory-50/75">
                          <span>
                            {selectedRoom?.name} ({inr(selectedRoom?.price ?? 0)} × {nights}{" "}
                            {nights === 1 ? "night" : "nights"})
                          </span>
                          <span className="font-medium text-ivory-50">{inr(total)}</span>
                        </div>
                        <div className="mt-2.5 flex items-center justify-between text-xs text-ivory-50/65">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <Check className="size-3.5" /> Farmhouse Himalayan Breakfast
                          </span>
                          <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">Complimentary</span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-xs text-ivory-50/65">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <Check className="size-3.5" /> Unlimited Kangra Tea &amp; Fibre Wi-Fi
                          </span>
                          <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">Included</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                          <div>
                            <span className="text-sm font-semibold text-ivory-50">
                              Estimated Total
                            </span>
                            <span className="block text-[10.5px] text-ivory-50/50">All mountain amenities included</span>
                          </div>
                          <span className="font-display text-3xl font-bold text-gold-400">
                            {inr(total)}
                          </span>
                        </div>
                        <div className="mt-4 rounded-xl bg-gold-500/10 p-3 text-[11.5px] leading-relaxed text-gold-300">
                          ✦ <strong>Zero Advance Charged Now</strong>: This sends your reservation inquiry directly to Rahul Kapoor. He confirms availability and coordinates your mountain arrival before any payment.
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer controls */}
          {!done && (
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-5 sm:px-10">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-sm text-ivory-50/60 transition-colors hover:text-ivory-50 disabled:pointer-events-none disabled:opacity-25"
              >
                <ArrowLeft className="size-4" />
                Back
              </button>

              <motion.button
                type="button"
                whileHover={canContinue ? { scale: 1.03 } : undefined}
                whileTap={canContinue ? { scale: 0.97 } : undefined}
                disabled={!canContinue}
                onClick={() =>
                  step === steps.length - 1
                    ? setDone(true)
                    : setStep((s) => s + 1)
                }
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-medium text-forest-950 transition-shadow hover:shadow-[0_0_24px_2px_rgba(201,162,83,0.3)] disabled:pointer-events-none disabled:opacity-30"
              >
                {step === steps.length - 1 ? "Confirm request" : "Continue"}
                <ArrowRight className="size-4" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-2 py-2">
        <CounterButton
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          symbol="−"
          label={`Decrease ${label}`}
        />
        <span className="text-sm text-ivory-50">{value}</span>
        <CounterButton
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          symbol="+"
          label={`Increase ${label}`}
        />
      </div>
    </div>
  );
}

function CounterButton({
  disabled,
  onClick,
  symbol,
  label,
}: {
  disabled: boolean;
  onClick: () => void;
  symbol: string;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-8 place-items-center rounded-lg text-ivory-50/70 transition-colors hover:bg-white/10 hover:text-ivory-50 disabled:pointer-events-none disabled:opacity-25 cursor-pointer"
    >
      {symbol}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-6 px-5 py-3.5">
      <dt className="w-28 shrink-0 text-xs uppercase tracking-[0.15em] text-ivory-50/40">
        {label}
      </dt>
      <dd className="text-sm text-ivory-50/85">{value}</dd>
    </div>
  );
}

function formatDate(value: string) {
  if (!value) return "—";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}