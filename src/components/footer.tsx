"use client";

import { ArrowUp, Compass, MessageSquare, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative border-t border-gold-500/20 bg-forest-950 pt-20 pb-12 text-ivory-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Philosophy */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl border border-gold-500/40 bg-gradient-to-br from-gold-500/20 via-forest-900 to-forest-950 text-gold-400 shadow-md">
                <span className="font-display text-base font-bold">GH</span>
              </div>
              <div>
                <p className="font-display text-2xl font-bold tracking-tight text-ivory-50">
                  Green <span className="italic font-normal text-gold-400">House</span>
                </p>
                <span className="block text-[9.5px] uppercase tracking-[0.3em] text-ivory-50/50 font-medium">
                  Boutique Mountain Sanctuary
                  Boutique Mountain Retreat
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory-50/65">
              Nestled 2,100 metres high in the peaceful deodar ridges of Upper Dharamkot, above McLeod Ganj. A home of mountain stillness, warm siddu breakfasts, and quiet hospitality.
              Located 2,100 metres high in the quiet deodar ridges of Upper Dharamkot, above McLeod Ganj. A home of mountain stillness, warm siddu breakfasts, and quiet hospitality.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-gold-400/90 backdrop-blur-sm">
              <Compass className="size-3.5" />
              <span>Elevation 2,100m · Kangra Valley, HP</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">The Sanctuary</p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Quick Links</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory-50/70">
              <li><a href="#home" className="transition-colors hover:text-gold-300">Sanctuary Home</a></li>
              <li><a href="#home" className="transition-colors hover:text-gold-300">Home</a></li>
              <li><a href="#rooms" className="transition-colors hover:text-gold-300">Rooms &amp; Suites</a></li>
              <li><a href="#amenities" className="transition-colors hover:text-gold-300">Curated Amenities</a></li>
              <li><a href="#dining" className="transition-colors hover:text-gold-300">Farm-to-Table Dining</a></li>
              <li><a href="#amenities" className="transition-colors hover:text-gold-300">Amenities</a></li>
              <li><a href="#dining" className="transition-colors hover:text-gold-300">Dining &amp; Meals</a></li>
              <li><a href="#gallery" className="transition-colors hover:text-gold-300">Photo Gallery</a></li>
              <li><a href="#offers" className="transition-colors hover:text-gold-300">Bespoke Offers</a></li>
              <li><a href="#offers" className="transition-colors hover:text-gold-300">Special Offers</a></li>
            </ul>
          </div>

          {/* Guest Information */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Guest Resources</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory-50/70">
              <li><a href="#about" className="transition-colors hover:text-gold-300">Our Story &amp; Host</a></li>
              <li><a href="#reviews" className="transition-colors hover:text-gold-300">Guest Reflections</a></li>
              <li><a href="#location" className="transition-colors hover:text-gold-300">Directions &amp; Map</a></li>
              <li><a href="#faq" className="transition-colors hover:text-gold-300">Frequently Asked</a></li>
              <li><a href="#policies" className="transition-colors hover:text-gold-300">House Policies</a></li>
              <li><a href="#booking" className="transition-colors hover:text-gold-300">Direct Reservation</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Sanctuary Concierge</p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Contact &amp; Host</p>
            <div className="mt-4 space-y-3 text-sm text-ivory-50/75">
              <a
                href="https://wa.me/919816048210"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 transition-colors hover:text-gold-300"
              >
                <MessageSquare className="size-4 text-emerald-400 shrink-0" />
                <span>+91 98160 48210 (WhatsApp)</span>
              </a>

              <a
                href="tel:+919816048210"
                className="flex items-center gap-2.5 transition-colors hover:text-gold-300"
              >
                <Phone className="size-4 text-gold-400 shrink-0" />
                <span>+91 98160 48210 (Direct Host)</span>
              </a>

              <a
                href="mailto:stay@greenhousedharamkot.com"
                className="flex items-center gap-2.5 transition-colors hover:text-gold-300"
              >
                <Mail className="size-4 text-gold-400 shrink-0" />
                <span>stay@greenhousedharamkot.com</span>
              </a>

              <p className="flex items-start gap-2.5 text-xs text-ivory-50/55 pt-2">
                <MapPin className="size-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Upper Dharamkot, Above McLeod Ganj, Dharamshala, HP 176219</span>
              </p>
            </div>

            <div className="mt-6">
              <a
                href="#booking"
                className="block w-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-forest-950 shadow-md hover:brightness-105"
              >
                Book Direct With Rahul
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ivory-50/40">
          <p>© {new Date().getFullYear()} Green House Dharamkot. Handcrafted with mountain warmth.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-ivory-50/80 transition-colors hover:border-gold-400 hover:text-gold-400"
          >
            <span>Return to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}