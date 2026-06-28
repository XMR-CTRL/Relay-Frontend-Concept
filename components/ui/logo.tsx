interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={`inline-block font-sans text-xl font-semibold tracking-[-0.04em] text-foreground ${className}`}
      aria-label="Relay"
    >
      RELAY
    </span>
  );
}
