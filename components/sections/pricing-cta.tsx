"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "0%",
    sub: "+ ¥11 per transaction",
    features: [
      "Up to ¥10M monthly volume",
      "Standard checkout",
      "Sandbox access",
      "Email support",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Scale",
    price: "1.5%",
    sub: "+ ¥11 per transaction",
    features: [
      "Unlimited volume",
      "Custom checkout flows",
      "Payouts in 135+ currencies",
      "Priority Slack support",
      "Dedicated account manager",
    ],
    cta: "Talk to sales",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "Volume-based pricing",
    features: [
      "Everything in Scale",
      "Custom contracts",
      "SLA guarantees",
      "On-premise option",
      "Dedicated infrastructure",
    ],
    cta: "Contact us",
    highlighted: false,
  },
];

export function PricingCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.9,
    start: "top 80%",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");

      cards.forEach((card, index) => {
        const direction = index === 0 ? -80 : index === 2 ? 80 : 0;
        const rotateY = index === 0 ? 12 : index === 2 ? -12 : 0;
        const yOffset = index === 1 ? 100 : 120;

        gsap.fromTo(
          card,
          { opacity: 0, y: yOffset, x: direction, rotateY },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.14,
          }
        );

        gsap.to(card, {
          y: index === 1 ? -50 : -20,
          rotateY: index === 0 ? 4 : index === 2 ? -4 : 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (card: HTMLElement) => {
    const glow = card.querySelector<HTMLElement>(".pricing-glow");
    gsap.to(card, {
      y: "-=16",
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
    });
    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        scale: 1.2,
        duration: 0.4,
      });
    }
  };

  const handleMouseLeave = (card: HTMLElement) => {
    const glow = card.querySelector<HTMLElement>(".pricing-glow");
    gsap.to(card, {
      y: "+=16",
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.4,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section relative bg-background py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-glow opacity-0" />

      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-5xl">
            Transparent pricing
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-secondary">
            Pay per transaction. No monthly minimums, no implementation fees.
          </p>
        </div>

        <div
          className="grid gap-5 md:grid-cols-3"
          style={{ perspective: "1400px" }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative flex flex-col rounded-2xl border p-8 pb-10 ${
                plan.highlighted ? "card-elevated" : "card"
              }`}
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div
                className={`pricing-glow pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full blur-3xl ${
                  plan.highlighted ? "bg-accent/20" : "bg-accent/10"
                } opacity-0`}
              />

              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-medium text-primary">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-primary">
                  {plan.price}
                </span>
              </div>
              <p className="mt-1 text-sm text-secondary">{plan.sub}</p>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-secondary"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
