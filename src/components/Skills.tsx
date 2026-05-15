import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const skillPaths: Record<string, string> = {
  Azure: "M12 2L3 19h6l1.5-4h3L15 19h6L12 2zm0 5l2.5 7h-5L12 7z",
  Docker: "M21 10.5c-.4-.3-1.3-.5-2-.4-.2-1-.7-1.8-1.4-2.5l-.3-.3-.3.3c-.6.6-1 1.5-.9 2.3 0 .3.1.7.2 1-.4.2-1 .3-1.8.3H2.1l-.1.5c-.1 1.2.1 2.4.5 3.5.5 1.2 1.2 2 2.2 2.6 1.1.7 2.9 1 4.9.8 1-.1 2-.4 2.9-.8.8-.4 1.5-.9 2.2-1.6.8-1 1.4-2.1 1.8-3.4h.2c1 0 1.6-.4 2-.7.2-.2.4-.5.5-.8l.1-.3-.3-.3z",
  Kubernetes: "M12 2l-8 4.5v9L12 20l8-4.5v-9L12 2zm0 3l4.5 2.5v5L12 15l-4.5-2.5v-5L12 5zm0 3a2 2 0 100 4 2 2 0 000-4z",
  Terraform: "M12.5 2v7l6-3.5V2L12.5 5.5zm-7 4v7l6-3.5V6L5.5 9.5zm7 4v7l6-3.5V10l-6 3.5zm-7 4v7l6-3.5V14l-6 3.5z",
  "GitHub Actions": "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.5 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z",
  Linux: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 3c.8 0 1.5.3 2 .8V8l-1 1v2l2 1v2l-1 1v2.2A7 7 0 0112 5zm-2.5 3L8 9.5V12l1.5 1.5V16l1 1v1.9A7 7 0 015 12c0-1.6.5-3 1.4-4.2L9.5 8z",
  "CI/CD": "M4 6h16M4 10h16M4 14h16M4 18h16M8 6v12M16 6v12",
  Snowflake: "M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14M12 2l3 3M12 2l-3 3M12 22l3-3M12 22l-3-3M2 12l3 3M2 12l3-3M22 12l-3 3M22 12l-3-3",
  React: "M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z",
  TypeScript: "M3 3h18v18H3V3zm10 13v-4h-2v-1.5h5.5V12H14v4c0 .5.4 1 1 1h1v1.5h-1.5c-1 0-1.5-.7-1.5-1.5z",
};

function SkillCard({
  skill,
  index,
  onHover,
}: {
  skill: { name: string; category: string };
  index: number;
  onHover: (idx: number, active: boolean) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [hovered, setHovered] = useState(false);

  // SVG path draw on scroll
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        delay: index * 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glowRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y - rect.height / 2) / rect.height) * -10;
      const ry = ((x - rect.width / 2) / rect.width) * 10;
      cardRef.current.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.05,1.05,1.05)`;
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,217,255,0.12), transparent 60%)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    onHover(index, false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    }
    if (glowRef.current) glowRef.current.style.background = "transparent";
  }, [index, onHover]);

  return (
    <div
      ref={cardRef}
      className="skill-card group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] cursor-default"
      style={{ transition: "transform 0.15s ease-out, border-color 0.5s, box-shadow 0.5s, translate 0.4s cubic-bezier(0.22,1,0.36,1)" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setHovered(true); onHover(index, true); }}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
    >
      <div ref={glowRef} className="absolute inset-0 rounded-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center text-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
            hovered ? "bg-cyan-400/10 shadow-[0_0_20px_rgba(0,217,255,0.15)]" : "bg-white/[0.04]"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-6 h-6 transition-colors duration-500 ${hovered ? "text-cyan-400" : "text-white/50"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              ref={pathRef}
              d={skillPaths[skill.name] || "M12 2L2 22h20L12 2z"}
            />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-white mb-0.5">{skill.name}</div>
          <div className="text-[10px] tracking-wider uppercase text-white/30">{skill.category}</div>
        </div>
      </div>
      {hovered && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-cyan-400/20" />
      )}
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<HTMLDivElement[]>([]);

  // Stagger push neighboring cards on hover
  const handleCardHover = useCallback((idx: number, active: boolean) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLDivElement>(".skill-card");
    const cols = window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 4 : window.innerWidth >= 640 ? 3 : 2;

    cards.forEach((card, i) => {
      if (i === idx) return;
      const row = Math.floor(i / cols);
      const col = i % cols;
      const hRow = Math.floor(idx / cols);
      const hCol = idx % cols;
      const dr = row - hRow;
      const dc = col - hCol;
      const dist = Math.sqrt(dr * dr + dc * dc);

      if (active && dist <= 1.5) {
        const pushX = dc * 4;
        const pushY = dr * 4;
        card.style.translate = `${pushX}px ${pushY}px`;
      } else {
        card.style.translate = "0px 0px";
      }
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        // Character-by-character heading reveal
        const heading = headingRef.current.querySelector("h2");
        if (heading) {
          const text = heading.textContent || "";
          heading.innerHTML = text
            .split("")
            .map((ch) =>
              ch === " "
                ? " "
                : `<span class="inline-block opacity-0" style="transform:translateY(20px)">${ch === "." ? '<span class="text-cyan-400">.</span>' : ch}</span>`
            )
            .join("");

          const chars = heading.querySelectorAll("span.inline-block");
          gsap.to(chars, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.02,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      const cards = sectionRef.current?.querySelectorAll(".skill-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 md:py-44 overflow-x-clip">
      <div className="absolute -left-[30%] top-1/4 w-[50vw] h-[50vw] rounded-full bg-purple-500/[0.02] blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400/60 font-mono mb-3">
            Tech Stack
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
            Skills & Tools.
          </h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {resumeData.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} onHover={handleCardHover} />
          ))}
        </div>
      </div>
    </section>
  );
}
