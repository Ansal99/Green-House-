import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { GalleryMarquee } from "@/components/gallery-marquee";
import { AboutOwner } from "@/components/about-owner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <GalleryMarquee />
      <AboutOwner />
      <Footer />
    </>
  );
}