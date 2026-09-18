"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";

function ReserveContent() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = Number(searchParams.get("guests")) || 2;
  const offer = searchParams.get("offer") || "";

  return (
    <main className="min-h-screen bg-forest-950">
      <Booking
        key={`${room}-${checkIn}-${checkOut}-${guests}-${offer}`}
        initialRoom={room}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        initialAdults={guests}
        initialOffer={offer}
        isStandalonePage={true}
      />
      <Footer />
    </main>
  );
}

export default function ReservePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-forest-950 text-ivory-50">
          <div className="text-center space-y-3">
            <div className="inline-block size-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
            <p className="font-display text-sm tracking-widest uppercase text-gold-400">Loading Sanctuary Reservation...</p>
            <p className="font-display text-sm tracking-widest uppercase text-gold-400">Loading Reservation...</p>
          </div>
        </div>
      }
    >
      <ReserveContent />
    </Suspense>
  );
}
