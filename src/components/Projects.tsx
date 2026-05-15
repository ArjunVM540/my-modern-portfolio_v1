import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: (typeof resumeData.projects)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full md:w-[90vw] md:max-w-xl rounded-t-2xl md:rounded-2xl border border-white/[0.08] bg-[#0a0a1a] flex flex-col max-h-[90vh] md:max-h-[80vh]"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
      >
        {/* Header — fixed at top */}
        <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3 md:px-7 md:pt-7 md:pb-4 border-b border-white/[0.04] shrink-0">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-[10px] tracking-wider uppercase font-mono text-cyan-400/70 border border-cyan-400/20 rounded-full mb-2">
              {project.category}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{project.name}</h3>
          </div>
          <button
            onClick={onClose}
            data-cursor="pointer"
            className="w-8 h-8 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-colors mt-1"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-4 md:px-7 md:py-5 space-y-5">
          <p className="text-sm text-white/50 leading-relaxed">{project.description}</p>

          {project.details && (
            <div className="space-y-4">
              <div>
                <h4 className="text-[11px] tracking-[0.15em] uppercase text-cyan-400/60 font-mono mb-1.5">Challenge</h4>
                <p className="text-sm text-white/60 leading-relaxed">{project.details.challenge}</p>
              </div>
              <div>
                <h4 className="text-[11px] tracking-[0.15em] uppercase text-cyan-400/60 font-mono mb-1.5">Solution</h4>
                <p className="text-sm text-white/60 leading-relaxed">{project.details.solution}</p>
              </div>
              <div>
                <h4 className="text-[11px] tracking-[0.15em] uppercase text-cyan-400/60 font-mono mb-1.5">Outcome</h4>
                <p className="text-sm text-white/60 leading-relaxed">{project.details.outcome}</p>
              </div>
              <div>
                <h4 className="text-[11px] tracking-[0.15em] uppercase text-cyan-400/60 font-mono mb-1.5">Key Features</h4>
                <ul className="space-y-1.5">
                  {project.details.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="text-cyan-400 mt-0.5 shrink-0">&#9656;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase text-white/50 border border-white/[0.06] rounded-full bg-white/[0.02]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer — fixed at bottom */}
        <div className="px-5 py-4 md:px-7 border-t border-white/[0.04] shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white/70 border border-white/[0.08] rounded-full hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-300 bg-white/[0.02]"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            View Source
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: (typeof resumeData.projects)[0];
  index: number;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    const glow = glowRef.current;
    if (!card || !glare || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    const rotateX = ((y - rect.height / 2) / rect.height) * -12;
    const rotateY = ((x - rect.width / 2) / rect.width) * 12;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
    glow.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(0,217,255,0.08), transparent 50%)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    const glow = glowRef.current;
    if (!card || !glare || !glow) return;
    card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    glare.style.background = "transparent";
    glow.style.background = "transparent";
  }, []);

  return (
    <div
      ref={cardRef}
      data-cursor="view"
      className="project-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-cyan-400/15"
      style={{ transition: "transform 0.15s ease-out, border-color 0.5s, box-shadow 0.5s" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Specular glare */}
      <div ref={glareRef} className="absolute inset-0 pointer-events-none z-20 rounded-2xl" />
      {/* Glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Visual */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24 group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-700">
            <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-2xl rotate-12 group-hover:border-cyan-400/40 group-hover:rotate-[24deg] transition-all duration-700" />
            <div className="absolute inset-2 border border-purple-400/15 rounded-xl -rotate-6 group-hover:border-purple-400/30 group-hover:-rotate-[16deg] transition-all duration-700" />
            <div className="absolute inset-4 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-black text-white/20">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,217,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.5) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-[10px] tracking-wider uppercase font-mono text-cyan-400/70 border border-cyan-400/20 rounded-full bg-black/40 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
          {project.name}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed mb-5">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase text-white/50 border border-white/[0.06] rounded-full bg-white/[0.02] group-hover:border-white/10 transition-colors duration-300"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white/70 border border-white/[0.08] rounded-full hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-300 bg-white/[0.02]"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Source
          </a>
          <button
            onClick={onSelect}
            data-cursor="pointer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-black bg-cyan-400 rounded-full hover:bg-cyan-300 transition-colors duration-300"
          >
            View Details
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-cyan-400/[0.03] to-transparent z-[1]" />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof resumeData.projects)[0] | null>(null);

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

      const cards = sectionRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
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
      id="projects"
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute -right-[25%] bottom-0 w-[50vw] h-[50vw] rounded-full bg-blue-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-16 opacity-0">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400/60 font-mono mb-3">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
            Projects<span className="text-cyan-400">.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} onSelect={() => setSelectedProject(project)} />
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
