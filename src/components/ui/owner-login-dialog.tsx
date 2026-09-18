"use client";

import { useState, useEffect, useSyncExternalStore, type ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Lock,
  Save,
  X,
  BedDouble,
  Image as ImageIcon,
  CheckCircle2,
  MapPin,
  Tag,
  ArrowLeft,
  ShieldCheck,
  Building,
  Sliders,
  Phone,
  Plus,
  Trash2,
  RotateCcw,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";
import { useSiteContent } from "@/lib/site-content";
import { useSmoothScroll } from "@/components/ui/smooth-scroll";
import { inr } from "@/lib/rooms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "./border-beam";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-ivory-50 outline-none transition-all placeholder:text-ivory-50/30 focus:border-gold-400 focus:bg-white/10 focus:ring-1 focus:ring-gold-400/50 [color-scheme:dark]";

const ownerEmail = "owner@greenhouse.in";
const ownerPassword = "greenhouse";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function parseGoogleMapsInput(input: string): { mapUrl: string; directionsUrl: string } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // If iframe embed tag is pasted
  if (trimmed.includes("<iframe") && trimmed.includes("src=")) {
    const match = trimmed.match(/src=["'](.*?)["']/);
    if (match && match[1]) {
      return {
        mapUrl: match[1],
        directionsUrl: match[1].replace("&output=embed", ""),
      };
    }
  }

  // If already an embed URL
  if (trimmed.includes("output=embed")) {
    return {
      mapUrl: trimmed,
      directionsUrl: trimmed.replace("&output=embed", ""),
    };
  }

  // If standard maps url or address/place name
  let query = trimmed;
  if (trimmed.includes("google.com/maps") || trimmed.includes("maps.app.goo.gl")) {
    try {
      const url = new URL(trimmed);
      const qParam = url.searchParams.get("q") || url.searchParams.get("query");
      if (qParam) query = qParam;
      else if (url.pathname.includes("/place/")) {
        query = decodeURIComponent(url.pathname.split("/place/")[1].split("/")[0]);
      }
    } catch {
      query = trimmed;
    }
  }

  const encoded = encodeURIComponent(query);
  return {
    mapUrl: `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    directionsUrl: `https://maps.google.com/?q=${encoded}`,
  };
}

export function OwnerLoginDialog() {
  const isMounted = useIsMounted();
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const content = useSiteContent();
  const { getLenis } = useSmoothScroll();

  // Prevent background page scrolling & pause Lenis when modal/studio is open
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = originalOverflow;
      lenis?.start();
    };
  }, [open, getLenis]);

  const signIn = () => {
    if (email.trim().toLowerCase() !== ownerEmail || password !== ownerPassword) {
      setError("Use the owner credentials: owner@greenhouse.in / greenhouse");
      return;
    }
    setAuthenticated(true);
    setError("");
  };

  const close = () => {
    setOpen(false);
    setAuthenticated(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const readImage = (
    event: ChangeEvent<HTMLInputElement>,
    onRead: (value: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onRead(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1.5 overflow-hidden rounded-full border border-gold-500/50 bg-forest-900/80 px-4 py-1.5 text-xs font-medium tracking-wide text-ivory-50 shadow-md backdrop-blur-md transition-all hover:border-gold-400 hover:text-gold-300 hover:shadow-[0_0_20px_rgba(216,178,87,0.3)] cursor-pointer"
      >
        <Lock size={12} className="text-gold-400" />
        <span>Owner Studio</span>
        <BorderBeam size={60} duration={4} />
      </motion.button>

      {isMounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {open && (
              !authenticated ? (
                /* Centered Login Modal Overlay */
                <motion.div
                  key="owner-login-modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  data-lenis-prevent="true"
                  className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto overscroll-contain"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) close();
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: 20 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    onClick={(event) => event.stopPropagation()}
                    className="relative w-full max-w-md rounded-3xl border border-gold-500/35 bg-forest-950/95 p-7 text-ivory-50 shadow-2xl backdrop-blur-2xl sm:p-9"
                  >
                    <BorderBeam size={200} duration={7} />
                    <motion.button
                      type="button"
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={close}
                      aria-label="Close login dialog"
                      className="absolute right-5 top-5 grid size-8 place-items-center rounded-full border border-white/10 bg-white/5 text-ivory-50/60 transition-colors hover:border-gold-500/40 hover:bg-white/10 hover:text-ivory-50 cursor-pointer"
                    >
                      <X size={16} />
                    </motion.button>

                    <div className="mx-auto max-w-sm">
                      <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                        <Lock size={11} />
                        Host &amp; Admin Portal
                      </div>

                      <h3 className="mt-3 font-display text-2xl font-semibold text-ivory-50">
                        Owner Login
                      </h3>
                      <p className="mt-1 text-xs text-ivory-50/60 leading-relaxed">
                        Enter credentials to manage room pricing, gallery photography, maps, and logo.
                      </p>

                      <div className="mt-6 space-y-4">
                        <div>
                          <Label className="text-xs text-ivory-50/70">Host Email</Label>
                          <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder={ownerEmail}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-ivory-50/70">Master Password</Label>
                          <Input
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="••••••••••"
                            className={inputClass}
                            onKeyDown={(event) => event.key === "Enter" && signIn()}
                          />
                        </div>

                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl bg-red-500/10 border border-red-500/20 p-2.5 text-xs text-red-300"
                          >
                            {error}
                          </motion.p>
                        )}

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={signIn}
                          className="w-full rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 py-3 text-xs font-bold uppercase tracking-wider text-forest-950 shadow-[0_4px_20px_rgba(216,178,87,0.35)] transition-all hover:shadow-[0_6px_25px_rgba(216,178,87,0.5)] cursor-pointer"
                        >
                          Sign In to Executive Studio
                        </motion.button>

                        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                          <p className="text-[11px] font-medium text-gold-400/90">
                            Demo Credentials Pre-filled:
                          </p>
                          <p className="mt-0.5 text-[11px] text-ivory-50/50">
                            owner@greenhouse.in / greenhouse
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                /* Full-Screen Executive Owner Portal - Mounts directly in portal, 100% isolated scroll */
                <motion.div
                  key="owner-studio-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  data-lenis-prevent="true"
                  className="fixed inset-0 z-[99999] flex flex-col bg-forest-950 text-ivory-50 overflow-y-auto overscroll-contain selection:bg-gold-500/30"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <OwnerExecutiveStudio
                    content={content}
                    readImage={readImage}
                    onClose={close}
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

type StudioTab = "rooms" | "hero" | "offers" | "gallery" | "infrastructure" | "logistics";

function OwnerExecutiveStudio({
  content,
  readImage,
  onClose,
}: {
  content: ReturnType<typeof useSiteContent>;
  readImage: (event: ChangeEvent<HTMLInputElement>, onRead: (value: string) => void) => void;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<StudioTab>("rooms");
  const [logoImage, setLogoImage] = useState(content.logoImage || "");
  const [heroImage, setHeroImage] = useState(content.heroImage);
  const [location, setLocation] = useState(content.location);
  const [rooms, setRooms] = useState(content.rooms);
  const [offers, setOffers] = useState(content.offers);
  const [galleryImages, setGalleryImages] = useState<string[]>(content.galleryImages || []);
  const [infrastructureImages, setInfrastructureImages] = useState<string[]>(content.infrastructureImages || []);
  const [mapsInput, setMapsInput] = useState("");
  const [savedToast, setSavedToast] = useState(false);

  const applyGoogleMaps = () => {
    const parsed = parseGoogleMapsInput(mapsInput);
    if (parsed) {
      setLocation((prev) => ({
        ...prev,
        mapUrl: parsed.mapUrl,
        directionsUrl: parsed.directionsUrl,
      }));
      setMapsInput("");
    }
  };

  const save = () => {
    content.updateContent({
      logoImage,
      heroImage,
      location,
      rooms,
      offers,
      galleryImages,
      infrastructureImages,
    });
    setSavedToast(true);
    window.setTimeout(() => setSavedToast(false), 2400);
  };

  return (
    <div className="min-h-full flex flex-col bg-forest-950">
      {/* Floating Save Confirmation Toast */}
      <AnimatePresence>
        {savedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100000] flex items-center gap-3 rounded-2xl border border-gold-400/50 bg-forest-900/95 px-5 py-3 shadow-[0_12px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(216,178,87,0.35)] backdrop-blur-2xl pointer-events-none"
          >
            <div className="grid size-7 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-ivory-50">Changes Successfully Synchronized!</p>
              <p className="text-[10px] text-gold-400/90">Site memory updated instantly for all visitors.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Luxury Executive App Bar */}
      <header className="sticky top-0 z-40 border-b border-gold-500/20 bg-forest-950/95 backdrop-blur-xl px-6 py-4 shadow-[0_4px_25px_rgba(0,0,0,0.3)]">
        <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative grid size-11 place-items-center rounded-xl border border-gold-500/40 bg-forest-900 font-display text-base font-bold text-gold-400 shadow-md overflow-hidden">
              {logoImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoImage} alt="Brand Logo" className="size-full object-cover" />
              ) : (
                <span>GH</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-semibold text-ivory-50 sm:text-xl">
                  Green House · Executive Owner Studio
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <Sparkles size={10} className="text-gold-400" />
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-ivory-50/50">
                Upper Dharamkot (2,100m) · Property Content, Maps, Gallery &amp; Brand Settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={save}
              className="relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-forest-950 shadow-[0_4px_18px_rgba(216,178,87,0.35)] transition-all hover:shadow-[0_6px_25px_rgba(216,178,87,0.55)] cursor-pointer"
            >
              <Save size={15} />
              <span>{savedToast ? "Changes Saved!" : "Save All Changes"}</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -1, backgroundColor: "rgba(255, 255, 255, 0.12)" }}
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-medium text-ivory-50/80 transition-colors hover:border-gold-500/40 hover:text-ivory-50 cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Exit to</span> Guest Website
            </motion.button>
          </div>
        </div>
      </header>

      {/* Metrics & Status Bar */}
      <div className="border-b border-white/10 bg-forest-900/40 px-6 py-3">
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-center justify-between gap-4 text-xs text-ivory-50/70">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Building size={14} className="text-gold-400" />
              <span>
                Active Suites: <strong className="text-ivory-50">{rooms.length} Units</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon size={14} className="text-gold-400" />
              <span>
                Auto Marquee Photos: <strong className="text-ivory-50">{galleryImages.length} Images</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-gold-400" />
              <span>
                Infrastructure Photos: <strong className="text-ivory-50">{infrastructureImages.length} Images</strong>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Phone size={14} className="text-emerald-400" />
              <span>
                Concierge WhatsApp: <strong className="text-emerald-300">+91 98160 48210</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-ivory-50/50">
            <ShieldCheck size={13} className="text-gold-400" />
            <span>Synchronized to Public Site &amp; Reservation Engine</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto flex w-full max-w-[1520px] flex-1 flex-col px-6 py-8 md:flex-row md:gap-8">
        {/* Navigation Tabs with Smooth Animated Pill Indicator */}
        <aside className="mb-6 flex shrink-0 flex-row gap-2 overflow-x-auto pb-2 md:mb-0 md:w-64 md:flex-col md:pb-0">
          {[
            { id: "rooms", label: "Rooms & Pricing", icon: BedDouble, badge: `${rooms.length}` },
            { id: "hero", label: "Hero & Brand Logo", icon: Sliders },
            { id: "offers", label: "Seasonal Packages", icon: Tag, badge: `${offers.length}` },
            { id: "gallery", label: "Auto Marquee Gallery", icon: ImageIcon, badge: `${galleryImages.length}` },
            { id: "infrastructure", label: "Infrastructure Gallery", icon: Layers, badge: `${infrastructureImages.length}` },
            { id: "logistics", label: "Location & Google Maps", icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as StudioTab)}
                className={`relative flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                  active ? "text-forest-950 font-bold" : "text-ivory-50/70 hover:text-ivory-50 hover:bg-white/5"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeStudioTabPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 shadow-[0_4px_16px_rgba(216,178,87,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </span>
                {tab.badge && (
                  <span
                    className={`relative z-10 rounded-full px-2 py-0.5 text-[10px] transition-colors ${
                      active ? "bg-forest-950/20 text-forest-950 font-bold" : "bg-white/10 text-ivory-50/60"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </aside>

        {/* Tab Panels with Smooth Spring Fade & Blur Transition */}
        <main className="flex-1 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Tab 1: Rooms & Pricing */}
              {activeTab === "rooms" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ivory-50">
                      Room Inventory &amp; Nightly Rates
                    </h2>
                    <p className="mt-1 text-xs text-ivory-50/60">
                      Update nightly tariffs, room imagery, and guest capacity. Changes reflect instantly on the public website and reservation engine.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {rooms.map((room, index) => (
                      <div
                        key={room.slug}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-forest-900/60 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold-500/35 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="rounded-full bg-gold-500/15 border border-gold-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-gold-400 uppercase tracking-wider">
                              {room.size} · {room.tagline}
                            </span>
                            <h3 className="mt-2 font-display text-xl font-medium text-ivory-50">
                              {room.name}
                            </h3>
                          </div>
                          <span className="font-display text-lg font-bold text-gold-400">
                            {inr(room.price)}
                          </span>
                        </div>

                        <div className="mt-5 space-y-4">
                          <div>
                            <label className="text-[11px] font-semibold uppercase tracking-wider text-ivory-50/60">
                              Nightly Rate (INR ₹)
                            </label>
                            <Input
                              type="number"
                              value={String(room.price)}
                              onChange={(e) =>
                                setRooms(
                                  rooms.map((item, itemIdx) =>
                                    itemIdx === index
                                      ? { ...item, price: Number(e.target.value) || 0 }
                                      : item
                                  )
                                )
                              }
                              className={inputClass}
                            />
                          </div>

                          <ImageField
                            label="Room Showcase Photo"
                            value={room.image}
                            onChange={(val) =>
                              setRooms(
                                rooms.map((item, itemIdx) =>
                                  itemIdx === index ? { ...item, image: val } : item
                                )
                              )
                            }
                            readImage={readImage}
                          />

                          <div className="rounded-xl border border-white/5 bg-white/5 p-3 text-xs text-ivory-50/60">
                            <p className="font-medium text-ivory-50/80">Features included:</p>
                            <p className="mt-1 text-[11px]">{room.features.join(" · ")}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Hero & Brand Logo */}
              {activeTab === "hero" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ivory-50">
                      Hero Banner &amp; Brand Logo
                    </h2>
                    <p className="mt-1 text-xs text-ivory-50/60">
                      Upload a custom property logo (replaces the default GH monogram) and manage the hero background.
                    </p>
                  </div>

                  {/* Custom Logo Card */}
                  <div className="rounded-2xl border border-gold-500/30 bg-forest-900/60 p-6 shadow-lg backdrop-blur-md space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="size-4 text-gold-400" />
                        <h3 className="font-display text-lg font-medium text-ivory-50">
                          Property Brand Logo
                        </h3>
                      </div>
                      {logoImage && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setLogoImage("")}
                          className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold text-red-300 hover:bg-red-500/20 cursor-pointer transition-colors"
                        >
                          <RotateCcw size={12} />
                          <span>Reset to GH Monogram</span>
                        </motion.button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      {/* Crest Live Preview */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-ivory-50/60">
                          Navbar Crest Preview
                        </span>
                        <div className="relative grid size-16 place-items-center rounded-2xl border border-gold-500/40 bg-gradient-to-br from-gold-500/20 via-forest-900 to-forest-950 text-gold-400 shadow-md overflow-hidden">
                          {logoImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logoImage} alt="Brand Logo Preview" className="size-full object-cover" />
                          ) : (
                            <span className="font-display text-xl font-bold tracking-tight text-gold-400">
                              GH
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 w-full">
                        <ImageField
                          label="Upload Custom Logo or Enter Image URL"
                          value={logoImage}
                          onChange={setLogoImage}
                          readImage={readImage}
                        />
                        <p className="mt-2 text-[11px] text-ivory-50/50 leading-relaxed">
                          Tip: If left blank, the website automatically displays the classic interlocking GH crest monogram. Uploading an image here replaces the GH monogram across the navbar and header.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hero Banner Image */}
                  <div className="rounded-2xl border border-white/10 bg-forest-900/60 p-6 shadow-lg backdrop-blur-md space-y-5">
                    <h3 className="font-display text-lg font-medium text-ivory-50">
                      Hero Background Image
                    </h3>
                    <ImageField
                      label="Hero Banner Image URL / Upload"
                      value={heroImage}
                      onChange={setHeroImage}
                      readImage={readImage}
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Seasonal Offers */}
              {activeTab === "offers" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ivory-50">
                      Special Packages &amp; Offers
                    </h2>
                    <p className="mt-1 text-xs text-ivory-50/60">
                      Manage special long-stay packages, seasonal discounts, and guided trek perks.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {offers.map((offer, index) => (
                      <div
                        key={offer.key}
                        className="rounded-2xl border border-white/10 bg-forest-900/60 p-6 shadow-lg backdrop-blur-md space-y-4 transition-all duration-300 hover:border-gold-500/30"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-display text-lg font-medium text-ivory-50">
                            {offer.title} ({offer.subtitle})
                          </h3>
                          <span className="rounded-full bg-gold-500/20 border border-gold-500/40 px-3 py-1 text-xs font-semibold text-gold-400">
                            {offer.badge}
                          </span>
                        </div>

                        <Field
                          label="Package Tagline / Subtitle"
                          value={offer.subtitle}
                          onChange={(val) =>
                            setOffers(
                              offers.map((item, itemIdx) =>
                                itemIdx === index ? { ...item, subtitle: val } : item
                              )
                            )
                          }
                        />

                        <Field
                          label="Offer Description"
                          value={offer.body}
                          onChange={(val) =>
                            setOffers(
                              offers.map((item, itemIdx) =>
                                itemIdx === index ? { ...item, body: val } : item
                              )
                            )
                          }
                        />

                        <ImageField
                          label="Package Promotional Photo"
                          value={offer.image}
                          onChange={(val) =>
                            setOffers(
                              offers.map((item, itemIdx) =>
                                itemIdx === index ? { ...item, image: val } : item
                              )
                            )
                          }
                          readImage={readImage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Auto Marquee Gallery (Unlimited photos) */}
              {activeTab === "gallery" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-ivory-50">
                        Auto-Play Marquee Gallery
                      </h2>
                      <p className="mt-1 text-xs text-ivory-50/60">
                        Add as many retreat photographs as you wish. The auto-play marquee on the homepage adapts automatically.
                      </p>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setGalleryImages([
                          ...galleryImages,
                          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=900&auto=format&fit=crop",
                        ])
                      }
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-forest-950 shadow-[0_4px_15px_rgba(216,178,87,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(216,178,87,0.45)] cursor-pointer"
                    >
                      <Plus size={16} />
                      <span>Add Photo ({galleryImages.length})</span>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {galleryImages.map((image, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-white/10 bg-forest-900/60 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:border-gold-500/30"
                      >
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                            Marquee Photo #{index + 1}
                          </span>
                          {galleryImages.length > 2 && (
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.2, color: "#f87171" }}
                              whileTap={{ scale: 0.85 }}
                              onClick={() =>
                                setGalleryImages(galleryImages.filter((_, i) => i !== index))
                              }
                              aria-label="Remove photo"
                              className="text-red-400/80 hover:text-red-300 transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </motion.button>
                          )}
                        </div>
                        <ImageField
                          label={`Image ${index + 1}`}
                          value={image}
                          onChange={(val) =>
                            setGalleryImages(
                              galleryImages.map((item, itemIdx) =>
                                itemIdx === index ? val : item
                              )
                            )
                          }
                          readImage={readImage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Infrastructure Gallery */}
              {activeTab === "infrastructure" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-ivory-50">
                        Hotel &amp; Infrastructure Showcase Photos
                      </h2>
                      <p className="mt-1 text-xs text-ivory-50/60">
                        Curate photographs of the resort architecture, timber rooms, garden grounds, and stone pathways displayed in the dedicated gallery page.
                      </p>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setInfrastructureImages([
                          ...infrastructureImages,
                          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
                        ])
                      }
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-forest-950 shadow-[0_4px_15px_rgba(216,178,87,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(216,178,87,0.45)] cursor-pointer"
                    >
                      <Plus size={16} />
                      <span>Add Infrastructure Photo ({infrastructureImages.length})</span>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {infrastructureImages.map((image, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-white/10 bg-forest-900/60 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:border-gold-500/30"
                      >
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                            Infrastructure View #{index + 1}
                          </span>
                          {infrastructureImages.length > 2 && (
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.2, color: "#f87171" }}
                              whileTap={{ scale: 0.85 }}
                              onClick={() =>
                                setInfrastructureImages(infrastructureImages.filter((_, i) => i !== index))
                              }
                              aria-label="Remove photo"
                              className="text-red-400/80 hover:text-red-300 transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </motion.button>
                          )}
                        </div>
                        <ImageField
                          label={`Showcase View ${index + 1}`}
                          value={image}
                          onChange={(val) =>
                            setInfrastructureImages(
                              infrastructureImages.map((item, itemIdx) =>
                                itemIdx === index ? val : item
                              )
                            )
                          }
                          readImage={readImage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: Location & Google Maps */}
              {activeTab === "logistics" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ivory-50">
                      Location &amp; Google Maps Synchronization
                    </h2>
                    <p className="mt-1 text-xs text-ivory-50/60">
                      Both the Hero mini-map box and the bottom Location section update simultaneously whenever you change the location here.
                    </p>
                  </div>

                  {/* Quick Map Link Paste Card */}
                  <div className="rounded-2xl border border-gold-500/30 bg-forest-900/60 p-6 shadow-lg backdrop-blur-md space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-gold-400" />
                      <h3 className="font-display text-lg font-medium text-ivory-50">
                        Paste Google Maps or WhatsApp Location Link
                      </h3>
                    </div>
                    <p className="text-xs text-ivory-50/70 leading-relaxed">
                      Easily update the retreat location: copy and paste any Google Maps share link, WhatsApp location link, coordinates (e.g. 32.2533, 76.3267), or search query below.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <Input
                        type="text"
                        value={mapsInput}
                        onChange={(e) => setMapsInput(e.target.value)}
                        placeholder="e.g. https://maps.app.goo.gl/... or Upper Dharamkot, Dharamshala"
                        className={inputClass}
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={applyGoogleMaps}
                        className="rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-forest-950 shadow-[0_4px_15px_rgba(216,178,87,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(216,178,87,0.45)] cursor-pointer shrink-0"
                      >
                        Apply Location
                      </motion.button>
                    </div>
                  </div>

                  {/* Live Maps Preview & Manual Fields */}
                  <div className="rounded-2xl border border-white/10 bg-forest-900/60 p-6 shadow-lg backdrop-blur-md space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-medium text-ivory-50">
                        Live Google Map Preview (Shared by Hero &amp; Footer)
                      </h3>
                      <motion.a
                        href={location.directionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        <span>Test Directions Link</span>
                        <ExternalLink size={12} />
                      </motion.a>
                    </div>

                    {/* Interactive Map Frame */}
                    <div className="h-64 w-full overflow-hidden rounded-xl border border-gold-500/30 bg-forest-950 shadow-inner">
                      <iframe
                        src={location.mapUrl}
                        title="Owner Google Maps Preview"
                        className="size-full border-0"
                        loading="lazy"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field
                        label="Property Name / Title"
                        value={location.title}
                        onChange={(val) => setLocation({ ...location, title: val })}
                      />
                      <Field
                        label="Physical Address"
                        value={location.address}
                        onChange={(val) => setLocation({ ...location, address: val })}
                      />
                      <Field
                        label="Active Map Embed URL"
                        value={location.mapUrl}
                        onChange={(val) => setLocation({ ...location, mapUrl: val })}
                      />
                      <Field
                        label="Direct Directions Link"
                        value={location.directionsUrl}
                        onChange={(val) => setLocation({ ...location, directionsUrl: val })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Bottom Action Bar */}
      <footer className="sticky bottom-0 z-40 border-t border-gold-500/20 bg-forest-950/95 backdrop-blur-xl px-6 py-4 shadow-[0_-4px_25px_rgba(0,0,0,0.3)]">
        <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-ivory-50/70">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>Edits persist directly to site memory</span>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-medium text-ivory-50/70 hover:text-ivory-50 transition-colors cursor-pointer"
            >
              Close Studio
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={save}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-forest-950 shadow-[0_4px_15px_rgba(216,178,87,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(216,178,87,0.5)] cursor-pointer"
            >
              <Save size={15} />
              <span>{savedToast ? "Saved!" : "Save Changes"}</span>
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ivory-50/60">
        {label}
      </span>
      <Input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  readImage,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  readImage: (event: ChangeEvent<HTMLInputElement>, onRead: (value: string) => void) => void;
}) {
  return (
    <div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ivory-50/60">
        {label}
      </span>
      <div className="mt-1.5 flex gap-2">
        <Input
          value={value.startsWith("data:") ? "Uploaded Local Image" : value}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
          placeholder="Enter image URL or choose file..."
        />
        <motion.label
          whileHover={{ scale: 1.06, borderColor: "rgba(216, 178, 87, 0.7)" }}
          whileTap={{ scale: 0.94 }}
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/15 bg-white/5 text-gold-400 transition-colors hover:bg-white/10"
        >
          <span className="sr-only">Upload image</span>
          <ImageIcon size={16} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => readImage(event, onChange)}
          />
        </motion.label>
      </div>
      {value && (
        <div className="mt-2 relative h-20 w-full max-w-xs overflow-hidden rounded-xl border border-white/10 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </div>
  );
}
