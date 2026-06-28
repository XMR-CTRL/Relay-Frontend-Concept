"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const solutions = [
  {
    title: "Marketplaces & platforms",
    description:
      "Split revenue, onboard sellers, and automate payouts across multiple parties and countries.",
  },
  {
    title: "SaaS & subscriptions",
    description:
      "Collect recurring revenue, handle upgrades, and retry failed renewals without writing billing plumbing.",
  },
  {
    title: "E-commerce",
    description:
      "Boost conversion with local payment methods, one-click checkout, and real-time authorization.",
  },
  {
    title: "Global expansion",
    description:
      "Launch in new markets with localized acquiring, tax-ready reporting, and multi-currency settlement.",
  },
];

export function Solutions() {
  const headingRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.9,
    start: "top 85%",
  });
  const gridRef = useScrollReveal<HTMLDivElement>({
    y: 60,
    stagger: 0.1,
    duration: 0.8,
    start: "top 88%",
  });

  return (
    <section id="solutions" className="section bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Built for how you grow
          </h2>
          <p className="mt-4 text-base text-secondary">
            Whether you are a marketplace, SaaS business, or scaling into new
            regions, Relay adapts to your model.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="card p-6 transition-colors hover:border-accent/40"
            >
              <h3 className="text-lg font-semibold tracking-tight text-primary">
                {solution.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
