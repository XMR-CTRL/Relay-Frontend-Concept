"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollRevealOptions {
  y?: number;
  x?: number;
  rotateX?: number;
  rotateY?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  scrub?: boolean;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const {
      y = 60,
      x = 0,
      rotateX = 0,
      rotateY = 0,
      scale = 1,
      opacity = 0,
      duration = 0.9,
      delay = 0,
      stagger = 0,
      start = "top 88%",
      scrub = false,
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      const children = ref.current!.querySelectorAll(":scope > *");
      const targets = children.length > 0 && stagger > 0 ? children : ref.current;

      gsap.fromTo(
        targets,
        { opacity, y, x, rotateX, rotateY, scale },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
            scrub: scrub ? 1 : false,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [options]);

  return ref;
}
