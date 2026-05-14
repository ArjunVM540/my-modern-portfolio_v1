import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const svgPathsRef = useRef<SVGPathElement[]>([]);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    // Fire onComplete immediately so content renders behind the loader
    if (!calledRef.current) {
      calledRef.current = true;
      onComplete();
    }

    const paths = svgPathsRef.current;
    const tl = gsap.timeline();

    paths.forEach((path) => {
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      }
    });

    // Stage 1: Draw SVG logo
    tl.to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.12, ease: "power2.inOut" });

    // Stage 2: Counter 0-100
    tl.to(counterRef.current, { innerText: 100, duration: 1.2, snap: { innerText: 1 }, ease: "power2.inOut" }, 0.2);

    // Progress bar
    tl.to(progressRef.current, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.1);

    // Stage 3: Text reveals
    lineRefs.current.forEach((line, i) => {
      if (line) {
        tl.fromTo(line, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 1.0 + i * 0.08);
      }
    });

    // Stage 4: Fade out content
    tl.to(".loader-inner", { opacity: 0, y: -10, duration: 0.35, ease: "power2.in" }, 1.6);

    // Stage 5: Split panels slide away — no gap, immediate
    tl.to(leftPanelRef.current, { xPercent: -100, duration: 0.7, ease: "power4.inOut" }, 1.95);
    tl.to(rightPanelRef.current, { xPercent: 100, duration: 0.7, ease: "power4.inOut" }, 1.95);

    // Stage 6: Remove overlay from DOM flow
    tl.set(overlayRef.current, { display: "none" }, 2.7);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100]">
      <div ref={leftPanelRef} className="absolute top-0 left-0 w-1/2 h-full bg-[#050510] z-[2]" />
      <div ref={rightPanelRef} className="absolute top-0 right-0 w-1/2 h-full bg-[#050510] z-[2]" />

      <div className="loader-inner absolute inset-0 z-[3] flex flex-col items-center justify-center pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute h-px bg-cyan-400/40" style={{ top: `${(i + 1) * 5}%`, left: 0, right: 0 }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`v${i}`} className="absolute w-px bg-cyan-400/40" style={{ left: `${(i + 1) * 5}%`, top: 0, bottom: 0 }} />
          ))}
        </div>

        <div className="mb-8">
          <svg viewBox="0 0 120 40" className="w-32 md:w-48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path ref={(el) => { if (el) svgPathsRef.current[0] = el; }} d="M5,35 L20,5 L35,35 M11,23 L29,23" className="text-cyan-400" />
            <path ref={(el) => { if (el) svgPathsRef.current[1] = el; }} d="M42,5 L57,35 L72,5" className="text-white" />
            <path ref={(el) => { if (el) svgPathsRef.current[2] = el; }} d="M79,35 L79,5 L94,25 L109,5 L109,35" className="text-cyan-400" />
          </svg>
        </div>

        <div className="mb-6">
          <span className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            <span ref={counterRef}>0</span>
            <span className="text-cyan-400 text-3xl md:text-5xl">%</span>
          </span>
        </div>

        <div className="space-y-1">
          <div ref={(el) => { lineRefs.current[0] = el; }} className="text-xs tracking-[0.3em] uppercase text-cyan-400/50 font-mono text-center opacity-0">
            Cloud & DevOps Engineer
          </div>
          <div ref={(el) => { lineRefs.current[1] = el; }} className="text-[10px] tracking-[0.5em] uppercase text-white/20 font-mono text-center opacity-0">
            Arjun V M — Portfolio
          </div>
        </div>
      </div>

      <div className="loader-inner absolute bottom-12 left-12 right-12 z-[4]">
        <div className="h-px bg-white/5 overflow-hidden">
          <div ref={progressRef} className="h-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}
