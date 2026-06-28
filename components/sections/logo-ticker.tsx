"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const japanLogos = [
  "Mercari",
  "PayPay",
  "SmartNews",
  "Freee",
  "MoneyForward",
  "Base",
  "StoreDot",
  "DeNA",
  "GMO Pepabo",
  "Kyash",
];

export function LogoTicker() {
  const trackRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 1,
    start: "top 90%",
  });

  return (
    <section className="section overflow-hidden border-y border-default bg-background/80 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-tertiary">
          Trusted by teams across Japan
        </p>
      </div>

      <div ref={trackRef} className="relative flex overflow-hidden">
        <div className="marquee-track flex shrink-0 animate-marquee items-center gap-16 px-8">
          {japanLogos.map((name) => (
            <span
              key={name}
              className="shrink-0 text-xl font-semibold tracking-tight text-tertiary"
            >
              {name}
            </span>
          ))}
        </div>
        <div
          className="marquee-track flex shrink-0 animate-marquee items-center gap-16 px-8"
          aria-hidden="true"
        >
          {japanLogos.map((name) => (
            <span
              key={`${name}-dup`}
              className="shrink-0 text-xl font-semibold tracking-tight text-tertiary"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
