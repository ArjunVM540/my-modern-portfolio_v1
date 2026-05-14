import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cards = sectionRef.current?.querySelectorAll(".timeline-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      const dots = sectionRef.current?.querySelectorAll(".timeline-dot");
      if (dots) {
        dots.forEach((dot) => {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: dot,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute -left-[20%] bottom-1/4 w-[40vw] h-[40vw] rounded-full bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-20 opacity-0">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400/60 font-mono mb-3">
            Career Path
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
            Experience<span className="text-cyan-400">.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/20 to-transparent origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          {resumeData.experience.map((exp, i) => (
            <div
              key={i}
              className={`timeline-card relative mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"
              } pl-16 md:pl-0`}
            >
              {/* Timeline dot */}
              <div
                className="timeline-dot absolute left-6 md:left-1/2 top-6 w-3 h-3 -translate-x-1/2 rounded-full bg-cyan-400 z-10"
                style={{ transform: "translateX(-50%) scale(0)" }}
              >
                <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-30" />
              </div>

              {/* Card */}
              <div className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-cyan-400/15 hover:bg-cyan-400/[0.02]">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-[10px] tracking-wider uppercase font-mono text-cyan-400 border border-cyan-400/20 rounded-full bg-cyan-400/5">
                    {exp.company}
                  </span>
                  <span className="text-xs text-white/30 font-mono">
                    {exp.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                  {exp.title}
                </h3>
                <p className="text-sm text-white/40 mb-5">{exp.location}</p>

                <ul className="space-y-2.5">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-white/50 leading-relaxed"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-cyan-400/50 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/[0.03] to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
