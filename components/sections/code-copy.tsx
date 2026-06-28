"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  "Type-safe SDKs for Node, Python, Go, and Ruby",
  "Idempotency keys and automatic retries",
  "Sandbox environments with instant provisioning",
  "Real-time event logs and observability",
];

export function CodeCopy() {
  const ref = useScrollReveal<HTMLDivElement>({
    x: -60,
    opacity: 0,
    duration: 1,
    start: "top 80%",
  });

  return (
    <div ref={ref} className="max-w-xl lg:w-1/2">
      <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        Built for developers first
      </h2>

      <p className="mt-5 text-base text-secondary">
        Our TypeScript SDK handles retries, idempotency, and webhook
        verification out of the box. You can create a checkout session in
        under ten lines and deploy it the same day.
      </p>

      <ul className="mt-8 space-y-4">
        {features.map((item) => (
          <li key={item} className="flex items-start gap-3 text-secondary">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
