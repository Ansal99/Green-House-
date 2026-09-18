"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { rooms as defaultRooms, type Room } from "@/lib/rooms";

export type Offer = {
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  includes: string[];
  image: string;
  key: string;
  featured: boolean;
};

export type LocationContent = {
  title: string;
  address: string;
  mapUrl: string;
  directionsUrl: string;
};

type SiteContent = {
  logoImage: string;
  heroImage: string;
  galleryImages: string[];
  infrastructureImages: string[];
  location: LocationContent;
  rooms: Room[];
  offers: Offer[];
};

type SiteContentContextValue = SiteContent & {
  updateContent: (patch: Partial<SiteContent>) => void;
  resetContent: () => void;
};

const defaultOffers: Offer[] = [
  {
    badge: "Save 20%",
    title: "The Slow Week",
    subtitle: "7 nights or more",
    body: "Stay a week and the nightly rate drops by a fifth. Laundry, one guided trail walk and airport pickup come free.",
    includes: ["20% off every night", "Free laundry service", "One guided day trek", "Gaggal airport pickup"],
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    key: "offer-slow-week",
    featured: false,
  },
  {
    badge: "Most Popular",
    title: "Monsoon Escape",
    subtitle: "July - September",
    body: "Dharamkot in the rain is a completely different place - greener, emptier, and far cheaper. Our favourite season to host.",
    includes: ["30% off all rooms", "Complimentary dinner daily", "Late checkout at 2 PM", "Free room upgrade if available"],
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1000&auto=format&fit=crop",
    key: "offer-monsoon",
    featured: true,
  },
  {
    badge: "For Two",
    title: "Quiet Weekend",
    subtitle: "2 nights, couples",
    body: "A balcony room, a bonfire booked in your name, and a candlelit dinner set up wherever you'd like it on the property.",
    includes: ["Valley Balcony Room", "Private bonfire evening", "Candlelit dinner for two", "Sunrise tea on the terrace"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
    key: "offer-quiet-weekend",
    featured: false,
  },
];

const defaultContent: SiteContent = {
  logoImage: "",
  heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
  galleryImages: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=900&auto=format&fit=crop",
  ],
  infrastructureImages: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop",
  ],
  location: {
    title: "Upper Dharamkot, Dharamshala",
    address: "Upper Dharamkot, above McLeod Ganj, Dharamshala - Himachal Pradesh 176219",
    mapUrl: "https://maps.google.com/maps?q=Dharamkot%2C%20Dharamshala%2C%20Himachal%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://maps.google.com/?q=Dharamkot,Dharamshala,Himachal+Pradesh",
  },
  rooms: defaultRooms,
  offers: defaultOffers,
};

const storageKey = "green-house-site-content";
const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    const restore = window.setTimeout(() => {
      const stored = window.localStorage.getItem(storageKey);
      if (!stored) return;
      try {
        const parsed = JSON.parse(stored);
        setContent({
          ...defaultContent,
          ...parsed,
          logoImage: parsed.logoImage ?? defaultContent.logoImage,
          infrastructureImages: parsed.infrastructureImages && parsed.infrastructureImages.length > 0 ? parsed.infrastructureImages : defaultContent.infrastructureImages,
        });
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  const updateContent = (patch: Partial<SiteContent>) => {
    setContent((current) => {
      const next = { ...current, ...patch };
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const resetContent = () => {
    window.localStorage.removeItem(storageKey);
    setContent(defaultContent);
  };

  return <SiteContentContext.Provider value={{ ...content, updateContent, resetContent }}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return context;
}
