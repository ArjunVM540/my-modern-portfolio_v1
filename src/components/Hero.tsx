import { useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FloatingMesh = lazy(() => import("./FloatingMesh"));

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Cloud Engineer",
  "DevOps Specialist",
  "Infrastructure Architect",
  "Automation Expert",
];

function scrambleText(
  el: HTMLElement,
  final: string,
  duration = 1200
) {
  const pool =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/";
  const len = final.length;
  let frame = 0;
  const totalFrames = duration / 16;
  const step = () => {
    const progress = frame / totalFrames;
    const resolved = Math.floor(progress * len);
    let out = "";
    for (let i = 0; i < len; i++) {
      if (i < resolved) out += final[i];
      else if (final[i] === " ") out += " ";
      else out += pool[Math.floor(Math.random() * pool.length)];
    }
    el.textContent = out;
    frame++;
    if (frame <= totalFrames) requestAnimationFrame(step);
    else el.textContent = final;
  };
  step();
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const roleIndex = useRef(0);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const parallaxOrbsRef = useRef<HTMLDivElement>(null);
  const parallaxGridRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const onMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    if (parallaxTextRef.current) {
      gsap.to(parallaxTextRef.current, {
        x: x * 15,
        y: y * 10,
        duration: 0.6,
        ease: "power2.out",
      });
    }
    if (parallaxOrbsRef.current) {
      gsap.to(parallaxOrbsRef.current, {
        x: x * 35,
        y: y * 25,
        duration: 0.9,
        ease: "power2.out",
      });
    }
    if (parallaxGridRef.current) {
      gsap.to(parallaxGridRef.current, {
        x: x * -8,
        y: y * -6,
        duration: 1.2,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  // Main entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll(".char");
      tl.fromTo(
        chars,
        { y: 50, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.025,
          ease: "power3.out",
        }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );
    }

    return () => { tl.kill(); };
  }, []);

  // Scroll-driven kinetic typography (animates parent, not individual words)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!parallaxTextRef.current || !sectionRef.current) return;
      gsap.to(parallaxTextRef.current, {
        y: -80,
        scale: 0.95,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Role rotation
  useEffect(() => {
    if (!roleRef.current) return;
    const el = roleRef.current;
    const interval = setInterval(() => {
      gsap.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          roleIndex.current = (roleIndex.current + 1) % roles.length;
          el.textContent = roles[roleIndex.current];
          gsap.fromTo(
            el,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const words = "Building Scalable Modern Infrastructure".split(" ");

  const getWordClass = (word: string) => {
    if (word === "Scalable")
      return "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent";
    if (word === "Modern")
      return "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent";
    return "";
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax layer: gradient orbs (midground) */}
      <div
        ref={parallaxOrbsRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-500/[0.03] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-blue-500/[0.02] blur-[100px]" />
      </div>

      {/* Parallax layer: grid (background) */}
      <div
        ref={parallaxGridRef}
        className="absolute inset-[-10%] pointer-events-none opacity-[0.03] will-change-transform"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,217,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* 3D Floating Mesh (lazy loaded) */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-40 hidden md:block">
        <Suspense fallback={null}>
          <FloatingMesh />
        </Suspense>
      </div>

      {/* Parallax layer: text content (foreground) */}
      <div
        ref={parallaxTextRef}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center will-change-transform"
      >
        {/* Eyebrow */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs tracking-[0.2em] uppercase text-cyan-400/80 font-mono">
            Available for opportunities
          </span>
        </motion.div>

        {/* Main headline with scramble */}
        <h1
          ref={headlineRef}
          className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.9] tracking-tighter text-white mb-6"
        >
          {words.map((word, wi) => (
            <span key={wi} className="word inline-block mr-[0.25em]">
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className={`char inline-block opacity-0 ${getWordClass(word)}`}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle with rotating roles */}
        <p ref={subtitleRef} className="opacity-0 mb-10">
          <span className="text-lg md:text-xl text-white/50 font-light">
            Arjun V M —{" "}
          </span>
          <span
            ref={roleRef}
            className="text-lg md:text-xl text-cyan-400 font-medium inline-block"
          >
            {roles[0]}
          </span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            data-cursor="pointer"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="magnetic-btn group relative px-8 py-3.5 rounded-full bg-cyan-400 text-black text-sm font-semibold overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <span className="relative z-10">View Projects</span>
            <span className="btn-ripple" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="/resume.pdf"
            download
            data-cursor="pointer"
            className="magnetic-btn group px-8 py-3.5 rounded-full border border-white/10 text-white text-sm font-medium hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-300 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </span>
            <span className="btn-ripple" />
          </a>
          <a
            href="#contact"
            data-cursor="pointer"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="magnetic-btn group px-8 py-3.5 rounded-full border border-white/10 text-white text-sm font-medium hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-300 overflow-hidden relative"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="btn-ripple" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-mono">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center">
          <motion.div
            className="w-1 h-2 rounded-full bg-cyan-400 mt-1.5"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
