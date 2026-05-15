import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    label: "GitHub",
    href: resumeData.github,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: resumeData.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${resumeData.email}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    ),
  },
];

function MagneticLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  const onClickRipple = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple-circle";
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    ref.current.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClickRipple}
      data-cursor="pointer"
    >
      {children}
    </a>
  );
}

const FORMSPREE_ID = "xnjwkewg";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          className="w-full px-5 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.03] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-cyan-400/30 focus:bg-cyan-400/[0.02] transition-all duration-300"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          className="w-full px-5 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.03] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-cyan-400/30 focus:bg-cyan-400/[0.02] transition-all duration-300"
        />
      </div>
      <div>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Your Message"
          className="w-full px-5 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.03] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-cyan-400/30 focus:bg-cyan-400/[0.02] transition-all duration-300 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        data-cursor="pointer"
        className="magnetic-btn w-full py-3.5 rounded-xl bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      >
        {status === "sending"
          ? "Sending..."
          : status === "sent"
          ? "Message Sent!"
          : status === "error"
          ? "Failed — Try Again"
          : "Send Message"}
      </button>
    </form>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll(".contact-item");
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
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
    <section ref={sectionRef} id="contact" className="relative py-32 md:py-44 overflow-x-clip">
      <div className="absolute -right-[20%] -bottom-[20%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute -left-[20%] -top-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400/60 font-mono mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-6">
            Let's Build<br />
            Something{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Together
            </span>
            <span className="text-cyan-400">.</span>
          </h2>
          <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto">
            Open to roles in Cloud Engineering, DevOps, and SRE. Let's discuss
            how I can help build your infrastructure.
          </p>
        </div>

        <div ref={contentRef} className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="contact-item">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="contact-item">
              <MagneticLink
                href={`mailto:${resumeData.email}`}
                className="group flex items-center gap-4 px-6 py-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-cyan-400/20 hover:bg-cyan-400/[0.03] relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-400/20 transition-colors duration-300">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="text-left min-w-0">
                  <div className="text-sm text-white/40 mb-0.5">Write me at</div>
                  <div className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 truncate">
                    {resumeData.email}
                  </div>
                </div>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/20 ml-auto shrink-0 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17l9.2-9.2M17 17V8H8" />
                </svg>
              </MagneticLink>
            </div>

            <div className="contact-item flex justify-center md:justify-start gap-4">
              {socials.map((s) => (
                <MagneticLink
                  key={s.label}
                  href={s.href}
                  className="group w-14 h-14 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-400/20 hover:bg-cyan-400/[0.03] transition-all duration-300 relative overflow-hidden"
                >
                  {s.icon}
                </MagneticLink>
              ))}
            </div>

            <div className="contact-item text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-sm text-white/30">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {resumeData.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-white/[0.04] pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/20 font-mono">
            &copy; {new Date().getFullYear()} Arjun V M. All rights reserved.
          </div>
          <div className="text-xs text-white/20 font-mono">
            Built with React + GSAP + Three.js
          </div>
        </div>
      </div>
    </section>
  );
}
