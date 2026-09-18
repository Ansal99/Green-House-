import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Rooms } from "@/components/rooms";
import { Amenities } from "@/components/amenities";
import { Dining } from "@/components/dining";
import { GalleryMarquee } from "@/components/gallery-marquee";
import { AboutOwner } from "@/components/about-owner";
import { Offers } from "@/components/offers";
import { ReservationCTA } from "@/components/reservation-cta";
import { Location } from "@/components/location";
import { Reviews } from "@/components/reviews";
import { FAQ } from "@/components/faq";
import { Policies } from "@/components/policies";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Rooms />
      <Amenities />
      <Dining />
      <GalleryMarquee />
      <AboutOwner />
      <Offers />
      <ReservationCTA />
      <Location />
      <Reviews />
      <FAQ />
      <Policies />
      <Footer />
    </>
  );
}