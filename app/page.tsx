import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { AnimationProvider } from "@/components/providers/animation";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { LogoTicker } from "@/components/sections/logo-ticker";
import { Features } from "@/components/sections/features";
import { Solutions } from "@/components/sections/solutions";
import { CodeShowcase } from "@/components/sections/code-showcase";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { PricingCta } from "@/components/sections/pricing-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <AnimationProvider>
        <Header />
      <main>
        <Hero />
        <LogoTicker />
        <Features />
        <Solutions />
        <CodeShowcase />
        <Stats />
        <Testimonials />
        <PricingCta />
      </main>
      <Footer />
      </AnimationProvider>
    </SmoothScrollProvider>
  );
}
