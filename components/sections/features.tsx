"use client";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useHoverTilt } from "@/hooks/use-hover-tilt";

const features = [
  {
    title: "Accept payments globally",
    points: [
      "Cards, wallets, bank transfers, and local methods in 135+ currencies.",
      "JCB, Visa, Mastercard, PayPay, and Konbini routed through optimal local acquirers.",
      "Automatic fallback retries and smart 3DS2 orchestration.",
      "Unified reconciliation across every payment rail.",
    ],
  },
  {
    title: "Payouts in real time",
    points: [
      "Instant settlement to bank accounts, cards, or digital wallets.",
      "Bulk payouts with sub-second reconciliation in JPY, USD, EUR, and GBP.",
      "Revenue splitting and marketplace disbursement built in.",
      "Scheduled or event-driven payout triggers via API.",
    ],
  },
  {
    title: "Embedded finance",
    points: [
      "Launch cards, accounts, and lending inside your product.",
      "White-label wallets and branded card programs.",
      "BNPL and installment flows that feel native.",
      "A single API for onboarding, KYC, and issuance.",
    ],
  },
  {
    title: "Enterprise-grade compliance",
    points: [
      "Built-in KYC, AML, sanctions screening, and PCI vaulting.",
      "Automated identity verification across 50+ jurisdictions.",
      "Real-time transaction monitoring and risk scoring.",
      "Audit-ready reports and regulator exports.",
    ],
  },
];

function FeatureCard({
  feature,
  className,
}: {
  feature: (typeof features)[number];
  className?: string;
}) {
  const cardRef = useHoverTilt<HTMLDivElement>({
    maxRotation: 5,
    lift: 6,
    scale: 1.01,
  });

  return (
    <div
      ref={cardRef}
      className={cn(
        "group card relative p-7 transition-colors hover:border-accent/40",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      <h3 className="text-lg font-semibold tracking-tight text-primary">
        {feature.title}
      </h3>
      <ul className="mt-4 space-y-2">
        {feature.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm text-secondary">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {point}
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

export function Features() {
  const headingRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.9,
    start: "top 85%",
  });
  const gridRef = useScrollReveal<HTMLDivElement>({
    y: 60,
    rotateX: 6,
    stagger: 0.08,
    duration: 0.8,
    start: "top 88%",
  });

  return (
    <section id="products" className="section bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Everything you need to move money
          </h2>
          <p className="mt-4 text-base text-secondary">
            Use what you need now and add the rest as you grow. Each product
            shares the same dashboard, API keys, and reconciliation pipeline.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid gap-4 md:grid-cols-2"
          style={{ perspective: "1200px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              className={index === 0 ? "md:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
