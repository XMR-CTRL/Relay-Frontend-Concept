"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  splitBy?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  delay?: number;
  scrub?: boolean;
}

export function AnimatedText({
  children,
  as: Component = "span",
  className,
  splitBy = "words",
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  scrub = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const split = new SplitType(ref.current, {
        types: splitBy === "chars" ? "chars" : splitBy === "words" ? "words" : "lines",
      });

      const targets =
        splitBy === "chars"
          ? split.chars
          : splitBy === "words"
          ? split.words
          : split.lines;

      if (!targets) return;

      gsap.set(targets, { y: scrub ? 40 : 60, opacity: 0 });

      const animation = gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "power3.out",
        delay,
        scrollTrigger: scrub
          ? {
              trigger: ref.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            }
          : {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
      });

      return () => {
        split.revert();
        animation.kill();
      };
    },
    { scope: ref }
  );

  return (
    <Component ref={ref as never} className={className}>
      {children}
    </Component>
  );
}
