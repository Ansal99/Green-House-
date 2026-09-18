"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: boolean;
  scale?: boolean;
  once?: boolean;
  amount?: number;
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.75,
  distance = 32,
  blur = false,
  scale = false,
  once = true,
  amount = 0.25,
  ...props
}: ScrollRevealProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialOffset(),
    ...(scale ? { scale: 0.95 } : {}),
    ...(blur ? { filter: "blur(8px)" } : {}),
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(scale ? { scale: 1 } : {}),
    ...(blur ? { filter: "blur(0px)" } : {}),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const, // Smooth luxury cubic-bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * HorizonX-style Kinetic Heading:
 * Splits text into masked words that rise smoothly from below with staggered timing.
 */
interface KineticHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
  delay?: number;
  once?: boolean;
}

export function KineticHeading({
  text,
  as: Component = "h2",
  className,
  highlightWords = [],
  highlightClass = "italic font-normal text-gold-400",
  delay = 0,
  once = false,
}: KineticHeadingProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "115%",
      opacity: 0,
      filter: "blur(4px)",
    },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.08em]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.2 }}
      >
        {words.map((word, i) => {
          const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
          const isHighlight = highlightWords.some(
            (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
          );

          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
              <motion.span
                variants={wordVariants}
                className={cn(
                  "inline-block will-change-transform",
                  isHighlight && highlightClass
                )}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
}

/**
 * ParallaxImage:
 * Smoothly shifts and scrubs an image within an overflow-hidden container as it passes through the viewport.
 */
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: string;
  speed?: number; // e.g. 12 for subtle, 24 for deeper parallax
  scaleRange?: [number, number];
  dataEditablePhoto?: string;
}

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  aspectRatio = "aspect-[4/3]",
  speed = 14,
  scaleRange = [1.08, 1.0],
  dataEditablePhoto,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], scaleRange[1], scaleRange[0]]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-forest-950", aspectRatio, className)}
    >
      <motion.img
        style={{ y, scale }}
        src={src}
        alt={alt}
        className={cn(
          "h-[125%] -top-[12%] absolute inset-x-0 w-full object-cover will-change-transform",
          imgClassName
        )}
        data-editable-photo={dataEditablePhoto}
      />
    </div>
  );
}
