export type Room = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  size: string;
  maxGuests: number;
  bed: string;
  image: string;
  features: string[];
};

export const rooms: Room[] = [
  {
    slug: "pine-view",
    name: "Pine View Room",
    tagline: "Our cosiest corner",
    description:
      "A warm, compact room with a window that frames nothing but deodar pines. Best for solo travellers and couples who plan to be outdoors all day.",
    price: 2400,
    size: "220 sq.ft.",
    maxGuests: 2,
    bed: "1 Queen Bed",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
    features: ["Forest-facing window", "Private bathroom", "Wood interiors", "Free Wi-Fi"],
  },
  {
    slug: "valley-balcony",
    name: "Valley Balcony Room",
    tagline: "Most booked",
    description:
      "A bigger room with a private balcony looking straight down the Kangra valley. Mornings here come with mist, chai and an unreasonably good view.",
    price: 3600,
    size: "310 sq.ft.",
    maxGuests: 3,
    bed: "1 King Bed + Daybed",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
    features: ["Private balcony", "Valley view", "Work desk", "Room heater"],
  },
  {
    slug: "deodar-suite",
    name: "Deodar Suite",
    tagline: "Top floor, top view",
    description:
      "The whole upper floor — a separate living area, a large bed, and wraparound windows on two sides. Our pick for longer stays and slow weeks.",
    price: 5800,
    size: "520 sq.ft.",
    maxGuests: 4,
    bed: "1 King Bed + Sofa Bed",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    features: ["Separate living room", "Bathtub", "Mini kitchenette", "Mountain-view seating"],
  },
  {
    slug: "garden-cottage",
    name: "Garden Cottage",
    tagline: "For families",
    description:
      "A standalone cottage at the far end of the garden with its own entrance and sit-out. Quiet, private, and close enough to the trail head to walk out at sunrise.",
    price: 6900,
    size: "640 sq.ft.",
    maxGuests: 5,
    bed: "2 Queen Beds",
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1200&auto=format&fit=crop",
    features: ["Private entrance", "Garden sit-out", "Two bedrooms", "Bonfire on request"],
  },
];

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);