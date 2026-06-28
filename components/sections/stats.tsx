"use client";

import { useRef, useEffect, useState } from "react";

const stats = [
  { value: "99.99", suffix: "%", label: "Uptime SLA" },
  { value: "135", suffix: "+", label: "Currencies supported" },
  { value: "2.9", suffix: "s", label: "Average integration time" },
  { value: "1.2", suffix: "T+", label: "Annual payment volume" },
];

function AnimatedStat({
  stat,
  inView,
}: {
  stat: (typeof stats)[number];
  inView: boolean;
}) {
  const [display, setDisplay] = useState(stat.value);

  useEffect(() => {
    if (!inView) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const target = parseFloat(stat.value);
    const decimals = stat.value.includes(".") ? 1 : 0;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((eased * target).toFixed(decimals));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, stat]);

  return (
    <div className="stat-item text-center">
      <div className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
        {display}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm text-secondary">{stat.label}</div>
    </div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="border-t border-default" />
        <div className="grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
        <div className="border-b border-default" />
      </div>
    </section>
  );
}
