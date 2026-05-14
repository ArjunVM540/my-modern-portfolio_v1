import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import LoadingScreen from "./components/LoadingScreen";
import ParticleField from "./components/ParticleField";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  // Scroll lock until loader signals ready
  useEffect(() => {
    if (!ready) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [ready]);

  // Section gradient morphing
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const gradients: Record<string, string> = {
      hero: "radial-gradient(ellipse at 30% 20%, rgba(0,217,255,0.04) 0%, transparent 60%)",
      about: "radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.03) 0%, transparent 60%)",
      skills: "radial-gradient(ellipse at 30% 60%, rgba(124,58,237,0.03) 0%, transparent 60%)",
      projects: "radial-gradient(ellipse at 50% 50%, rgba(0,217,255,0.03) 0%, transparent 60%)",
      experience: "radial-gradient(ellipse at 20% 40%, rgba(0,217,255,0.03) 0%, transparent 60%)",
      contact: "radial-gradient(ellipse at 60% 80%, rgba(124,58,237,0.04) 0%, transparent 60%)",
    };

    const bg = document.querySelector(".section-bg-morph") as HTMLElement;
    if (!bg) return;

    const triggers: ScrollTrigger[] = [];
    sections.forEach((section) => {
      const id = section.getAttribute("id") || "";
      const grad = gradients[id];
      if (!grad) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => gsap.to(bg, { background: grad, duration: 1, ease: "power2.out" }),
          onEnterBack: () => gsap.to(bg, { background: grad, duration: 1, ease: "power2.out" }),
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Ripple effect
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest(".magnetic-btn");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple-circle";
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050510] text-white overflow-x-hidden">
      <div className="noise-overlay" />
      <div className="section-bg-morph fixed inset-0 pointer-events-none z-0 transition-[background] duration-1000" />

      {/* Loader sits on top -- content always mounted behind it */}
      <LoadingScreen onComplete={() => setReady(true)} />

      {/* Content always rendered, just hidden behind the loader overlay */}
      <CustomCursor />
      <ScrollProgress />
      <ParticleField />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
