"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface UseHoverTiltOptions {
  maxRotation?: number;
  lift?: number;
  scale?: number;
}

export function useHoverTilt<T extends HTMLElement>(
  options: UseHoverTiltOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const { maxRotation = 6, lift = 8, scale = 1.02 } = options;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(element, {
        rotateY: x * maxRotation,
        rotateX: -y * maxRotation,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => {
      gsap.to(element, {
        y: -lift,
        scale,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    };

    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [options.maxRotation, options.lift, options.scale]);

  return ref;
}
