"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function AnimatedThemeToggler() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const restore = window.setTimeout(() => {
      const isDark = window.localStorage.getItem("green-house-theme") === "dark";
      setDark(isDark);
      document.documentElement.dataset.theme = isDark ? "dark" : "light";
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("green-house-theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/10 text-ivory-50 transition-colors hover:border-gold-400 hover:text-gold-400"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
