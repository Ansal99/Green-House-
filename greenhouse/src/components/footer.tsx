export function Footer() {
  return (
    <footer id="contact" className="bg-forest-950 py-16 text-ivory-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-xl">
            Green<span className="text-gold-500">house</span>
          </p>
          <p className="mt-3 text-sm text-ivory-50/60">
            Dharamkot, Himachal Pradesh, India — a quiet retreat above
            McLeod Ganj, surrounded by pine forest and mountain air.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-gold-400">Explore</p>
          <ul className="space-y-2 text-sm text-ivory-50/60">
            <li><a href="#rooms" className="hover:text-gold-400">Rooms &amp; Suites</a></li>
            <li><a href="#dining" className="hover:text-gold-400">Dining</a></li>
            <li><a href="#offers" className="hover:text-gold-400">Offers</a></li>
            <li><a href="#gallery" className="hover:text-gold-400">Gallery</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-gold-400">Guest Info</p>
          <ul className="space-y-2 text-sm text-ivory-50/60">
            <li><a href="#faq" className="hover:text-gold-400">FAQ</a></li>
            <li><a href="#policies" className="hover:text-gold-400">Policies</a></li>
            <li><a href="#reviews" className="hover:text-gold-400">Reviews</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-gold-400">Reach Us</p>
          <p className="text-sm text-ivory-50/60">+91 98xxxxxx10</p>
          <p className="text-sm text-ivory-50/60">stay@greenhousedharamkot.com</p>
        </div>
      </div>
      <p className="mt-12 text-center text-xs text-ivory-50/30">
        © {new Date().getFullYear()} Green House, Dharamkot. All rights reserved.
      </p>
    </footer>
  );
}