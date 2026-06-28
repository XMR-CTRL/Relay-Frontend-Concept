"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  scrub?: boolean;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.9,
  distance = 60,
  scrub = false,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.set(ref.current, { opacity: 0, ...directions[direction] });

      gsap.to(ref.current, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: scrub
          ? {
              trigger: ref.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            }
          : {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: once ? "play none none none" : "play none none reverse",
            },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
