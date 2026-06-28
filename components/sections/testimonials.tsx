"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useHoverTilt } from "@/hooks/use-hover-tilt";

const testimonials = [
  {
    quote:
      "We replaced three separate payment providers with Relay and cut our reconciliation time by about 80%. The sandbox made migration low-risk.",
    name: "Yuki Tanaka",
    role: "Engineering Lead, Sakura Tech",
  },
  {
    quote:
      "Multi-currency payouts used to require a spreadsheet and three bank portals. Now it's one API call and the funds land the same day.",
    name: "Kenji Mori",
    role: "Finance Director, Base Osaka",
  },
  {
    quote:
      "The webhook signatures and idempotency helpers actually work the way the docs say they do. That shouldn't be notable, but it is.",
    name: "Aiko Sato",
    role: "CTO, MoneyBox",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  const cardRef = useHoverTilt<HTMLDivElement>({
    maxRotation: 4,
    lift: 6,
    scale: 1.01,
  });

  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      ref={cardRef}
      className="card p-8 transition-colors hover:border-accent/30"
      style={{ transformStyle: "preserve-3d" }}
    >
      <p className="text-base leading-relaxed text-primary">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
          {initials}
        </div>
        <div>
          <div className="font-medium text-primary">{testimonial.name}</div>
          <div className="text-sm text-secondary">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const headingRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.9,
    start: "top 85%",
  });
  const gridRef = useScrollReveal<HTMLDivElement>({
    y: 80,
    stagger: 0.1,
    duration: 0.9,
    start: "top 88%",
  });

  return (
    <section className="section bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            What teams say about Relay
          </h2>
        </div>

        <div ref={gridRef} className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
