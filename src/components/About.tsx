import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (textRef.current) {
        const paras = textRef.current.querySelectorAll(".about-line");
        gsap.fromTo(
          paras,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (decorRef.current) {
        gsap.fromTo(
          decorRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: decorRef.current,
              start: "top 80%",
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
      id="about"
      className="relative py-32 md:py-44 overflow-x-clip"
    >
      <div className="absolute -right-[30%] top-0 w-[60vw] h-[60vw] rounded-full bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-stretch">
          {/* Left: Content */}
          <div className="flex flex-col">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-8 opacity-0"
            >
              About<span className="text-cyan-400">.</span>
            </h2>

            <div ref={textRef} className="space-y-5">
              <p className="about-line text-base md:text-lg text-white/60 leading-relaxed">
                Hey, I'm <span className="text-white font-medium">Arjun</span> — a software engineer who genuinely
                loves the craft of building things that scale. There's something deeply satisfying about
                watching a pipeline you built ship code flawlessly at 3 AM while you're asleep.
              </p>
              <p className="about-line text-base md:text-lg text-white/60 leading-relaxed">
                I currently work at <span className="text-cyan-400 font-medium">EY</span>, where I spend
                my days designing CI/CD workflows, wrangling Kubernetes clusters, and automating away
                the repetitive stuff so teams can focus on what actually matters — writing great software.
              </p>
              <p className="about-line text-base md:text-lg text-white/60 leading-relaxed">
                Somewhere along the way I fell in love with cloud infrastructure and the idea
                that good DevOps makes everyone's life easier — fewer late-night pages, faster
                releases, and happier developers all around.
              </p>
              <p className="about-line text-base md:text-lg text-white/60 leading-relaxed">
                When I'm not deploying containers or debugging YAML files, you'll find me
                exploring new tools, tinkering with side projects, or diving into the latest in
                SRE practices. I believe the best infrastructure is the kind nobody has to think about
                — it just works.
              </p>
            </div>
          </div>

          {/* Right: Decorative terminal */}
          <div ref={decorRef} className="opacity-0 flex flex-col">
            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden flex-1 flex flex-col">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <span className="ml-3 text-xs text-white/30 font-mono">
                  about.sh
                </span>
              </div>
              <div className="p-5 font-mono text-sm leading-loose flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-white/30">
                    <span className="text-cyan-400">$</span> whoami
                  </p>
                  <p className="text-white/70 pl-2">arjun-vm</p>
                  <p className="text-white/30 mt-3">
                    <span className="text-cyan-400">$</span> cat role.txt
                  </p>
                  <p className="text-white/70 pl-2">
                    Cloud & DevOps Engineer @ EY
                  </p>
                  <p className="text-white/30 mt-3">
                    <span className="text-cyan-400">$</span> echo $PHILOSOPHY
                  </p>
                  <p className="text-white/70 pl-2">
                    "Automate everything, break nothing."
                  </p>
                  <p className="text-white/30 mt-3">
                    <span className="text-cyan-400">$</span> echo $STACK
                  </p>
                  <p className="text-white/70 pl-2">
                    Azure | Docker | K8s | Terraform
                  </p>
                  <p className="text-white/30 mt-3">
                    <span className="text-cyan-400">$</span> kubectl get pods --all-namespaces
                  </p>
                  <p className="text-green-400/60 pl-2">
                    All systems running
                  </p>
                  <p className="text-white/30 mt-3">
                    <span className="text-cyan-400">$</span> uptime
                  </p>
                  <p className="text-white/70 pl-2">1+ year in production</p>
                </div>
                <p className="text-white/30 mt-4">
                  <span className="text-cyan-400">$</span>{" "}
                  <span className="animate-pulse">_</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          {resumeData.stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center transition-all duration-500 hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]"
            >
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 tracking-wider uppercase">
                {stat.label}
              </div>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-cyan-400/[0.05] to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
