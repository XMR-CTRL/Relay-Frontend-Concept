"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-text";

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScroll;
  uniform float uMouse;
  varying vec2 vUv;

  vec3 palette(float t) {
    vec3 a = vec3(0.85, 0.85, 0.9);
    vec3 b = vec3(0.2, 0.2, 0.25);
    vec3 c = vec3(1.2, 1.1, 1.0);
    vec3 d = vec3(0.25, 0.35, 0.55);
    return a + b * cos(6.28318 * (c * t + d));
  }

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;
    uv.y += uScroll * 0.25;
    uv.x += sin(uv.y * 2.0 + uTime) * 0.05;
    float d = length(uv);
    float n = noise(uv * 100.0 + uTime) * 0.03;
    vec3 col = palette(d + uTime * 0.35 + uMouse * 0.1 + n);
    col = mix(vec3(0.96, 0.96, 0.98), col, smoothstep(0.0, 1.4, d) * 0.45);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function GradientMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uScroll: { value: 0 },
      uMouse: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uScroll.value =
          window.scrollY / window.innerHeight;
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x +=
        (e.clientX / window.innerWidth - mouseRef.current.x) * 0.05;
      mouseRef.current.y +=
        (e.clientY / window.innerHeight - mouseRef.current.y) * 0.05;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useFrame(({ clock, size }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.2;
    materialRef.current.uniforms.uResolution.value.set(
      size.width,
      size.height
    );
    materialRef.current.uniforms.uMouse.value +=
      (mouseRef.current.x + mouseRef.current.y - materialRef.current.uniforms.uMouse.value) *
      0.02;
  });

  return (
    <mesh scale={[3, 1.8, 1]}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !contentRef.current || !sectionRef.current)
      return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.to(contentRef.current, {
        y: -180,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(canvasRef.current, {
        y: 120,
        scale: 1.15,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <div ref={canvasRef} className="absolute inset-0 z-0 opacity-80">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <GradientMesh />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/60 to-background" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/60 px-4 py-1.5 text-xs font-medium text-black/60 backdrop-blur-sm shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Now processing ¥1.2T+ annually
        </div>

        <AnimatedText
          as="h1"
          splitBy="words"
          stagger={0.07}
          duration={1.1}
          delay={0.4}
          className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
        >
          Financial infrastructure for the internet
        </AnimatedText>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/60 sm:text-xl">
          Payments, payouts, and compliance for Japanese companies expanding
          globally. One integration connects JCB, Visa, PayPay, Konbini, and 40+
          local methods.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button className="h-12 px-8 text-base">Start building</Button>
          <Button variant="secondary" className="h-12 px-8 text-base">
            Read the docs
          </Button>
        </div>

        <p className="mt-4 text-xs text-black/60">
          Free sandbox. Production-ready in days, not months.
        </p>
      </div>
    </section>
  );
}
