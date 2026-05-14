import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const certDetails = [
  {
    ...resumeData.certifications[0],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
      </svg>
    ),
    color: "cyan",
    description:
      "Validated expertise in SRE principles — incident management, SLOs, error budgets, toil reduction, and building resilient production systems.",
  },
  {
    ...resumeData.certifications[1],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    color: "blue",
    description:
      "Microsoft-certified in Azure cloud concepts, core services, security, privacy, compliance, and pricing models.",
  },
];

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certDetails)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);

  // SVG draw animation on scroll
  useEffect(() => {
    if (!iconRef.current) return;
    const paths = iconRef.current.querySelectorAll("path, circle");
    paths.forEach((p) => {
      const el = p as SVGGeometryElement;
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });

    const ctx = gsap.context(() => {
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.4,
        delay: index * 0.2,
        stagger: 0.15,
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

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -6;
    const ry = ((x - rect.width / 2) / rect.width) * 6;
    cardRef.current.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,217,255,0.1), transparent 60%)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    if (glowRef.current)
      glowRef.current.style.background = "transparent";
  }, []);

  const accentBorder = hovered ? "border-cyan-400/25" : "border-white/[0.06]";
  const accentIcon = hovered ? "text-cyan-400" : "text-white/40";

  return (
    <div
      ref={cardRef}
      className={`cert-card group relative p-6 md:p-8 rounded-2xl border ${accentBorder} bg-white/[0.02] transition-[border-color,box-shadow] duration-500 cursor-default`}
      style={{ transition: "transform 0.15s ease-out, border-color 0.5s" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      data-cursor="pointer"
    >
      <div ref={glowRef} className="absolute inset-0 rounded-2xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top row: icon + badge */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
              hovered
                ? "bg-cyan-400/10 shadow-[0_0_24px_rgba(0,217,255,0.12)]"
                : "bg-white/[0.04]"
            }`}
          >
            <svg
              ref={iconRef}
              viewBox="0 0 24 24"
              className={`w-7 h-7 transition-colors duration-500 ${accentIcon}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {cert.icon.props.children}
            </svg>
          </div>
          <span className="px-3 py-1 text-[10px] tracking-wider uppercase font-mono text-cyan-400/60 border border-cyan-400/15 rounded-full bg-cyan-400/[0.04]">
            {cert.year}
          </span>
        </div>

        {/* Cert name */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-1 tracking-tight">
          {cert.name}
        </h3>

        {/* Issuer */}
        <p className="text-sm text-cyan-400/70 font-medium mb-4">{cert.issuer}</p>

        {/* Description */}
        <p className="text-sm text-white/45 leading-relaxed">{cert.description}</p>

        {/* Verified badge */}
        <div className="mt-5 flex items-center gap-2 text-xs text-white/30">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-400/60" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Verified credential
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-cyan-400/[0.03] to-transparent pointer-events-none" />

      {/* Subtle ring on hover */}
      {hovered && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-cyan-400/15" />
      )}
    </div>
  );
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cards = sectionRef.current?.querySelectorAll(".cert-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute -left-[25%] top-1/3 w-[45vw] h-[45vw] rounded-full bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-16 opacity-0">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400/60 font-mono mb-3">
            Credentials
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
            Achievements<span className="text-cyan-400">.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certDetails.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
