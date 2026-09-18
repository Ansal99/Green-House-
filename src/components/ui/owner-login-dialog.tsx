"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "./border-beam";

export function OwnerLoginDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1.5 rounded-full border border-gold-500/40 px-4 py-1.5 text-xs tracking-wide text-ivory-50/80 transition-colors hover:text-gold-400 overflow-hidden"
        style={{ borderColor: "rgba(201,162,83,0.35)" }}
      >
        <Lock size={12} />
        Owner Login
        <BorderBeam size={60} duration={5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl border border-gold-500/20 bg-forest-950 p-8 shadow-2xl"
              style={{ background: "var(--forest-950)" }}
            >
              <BorderBeam size={150} duration={8} />
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-ivory-50/50 hover:text-ivory-50"
              >
                <X size={18} />
              </button>

              <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gold-400">
                Restricted access
              </p>
              <h3 className="mb-6 font-display text-2xl text-ivory-50">
                Owner &amp; Admin Login
              </h3>

              <div className="space-y-4">
                <div>
                  <Label className="text-ivory-50/70">Email</Label>
                  <Input
                    type="email"
                    placeholder="rahul@greenhousedharamkot.com"
                    className="mt-1.5 border-ivory-50/10 bg-white/5 text-ivory-50"
                  />
                </div>
                <div>
                  <Label className="text-ivory-50/70">Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="mt-1.5 border-ivory-50/10 bg-white/5 text-ivory-50"
                  />
                </div>
                <Button className="w-full bg-gold-500 text-forest-950 hover:bg-gold-400">
                  Sign in
                </Button>
                <p className="text-center text-[11px] text-ivory-50/40">
                  This panel will let the owner manage gallery photos and
                  property location once the backend is connected.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}