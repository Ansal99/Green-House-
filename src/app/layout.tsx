import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteContentProvider } from "@/lib/site-content";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll";
import { ScrollProgressBar } from "@/components/ui/scroll-progress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Green House · Boutique Mountain Retreat | Dharamkot, Himachal Pradesh",
  description:
    "A peaceful mountain retreat set among the pine forests of Upper Dharamkot (2,100m). Mountain views, homemade meals, fast Wi-Fi, and warm hospitality hosted by Rahul Kapoor.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("antialiased", inter.variable, playfair.variable, "font-sans")}
    >
      <body className="flex flex-col bg-background text-foreground antialiased selection:bg-gold-500/25 selection:text-forest-950">
        <ScrollProgressBar />
        <SmoothScrollProvider>
          <SiteContentProvider>{children}</SiteContentProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}