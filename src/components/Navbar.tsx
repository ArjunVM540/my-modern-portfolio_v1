import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function MagneticElement({
  children,
  className,
  as: Tag = "div",
  strength = 0.3,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a" | "button";
  strength?: number;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const engaged = useRef(false);

  const onEnter = useCallback(() => {
    engaged.current = true;
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !engaged.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    engaged.current = false;
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 300 && y > lastScroll.current);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, opts?: { offset?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: 0 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
        initial={{ y: -100 }}
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.65, 0.05, 0, 1] }}
        style={{ pointerEvents: "auto" }}
      >
        <div
          className={`mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20 px-6 transition-all duration-500 ${
            scrolled
              ? "bg-[#050510]/70 backdrop-blur-xl border-b border-white/[0.08]"
              : "bg-transparent backdrop-blur-none border-b border-transparent"
          }`}
        >
          <MagneticElement
            as="button"
            className="relative group"
            strength={0.4}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor="pointer"
          >
            <span className="text-lg font-black tracking-tight text-white">
              A<span className="text-cyan-400">.</span>VM
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </MagneticElement>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <MagneticElement
                key={link.href}
                as="button"
                strength={0.25}
                className={`nav-link relative px-4 py-2 text-sm transition-colors duration-300 group ${
                  activeSection === link.href ? "text-cyan-400" : "text-white/60 hover:text-white"
                }`}
                onClick={(e) => scrollTo(e, link.href)}
                data-cursor="pointer"
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-cyan-400 transition-all duration-300 ${
                    activeSection === link.href ? "w-3/4" : "w-0 group-hover:w-3/4"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)" }}
                />
              </MagneticElement>
            ))}
            <MagneticElement
              as="a"
              strength={0.3}
              className="magnetic-btn ml-4 px-5 py-2 text-sm font-medium text-black bg-cyan-400 rounded-full hover:bg-cyan-300 transition-colors duration-300 relative overflow-hidden"
              href="https://www.linkedin.com/in/arjun-vm/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
            >
              <span className="relative z-10">Let's Talk</span>
              <span className="btn-ripple" />
            </MagneticElement>
          </div>

          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-cursor="pointer"
          >
            <div className="relative w-5 h-3.5">
              <span
                className={`absolute left-0 w-full h-px bg-white transition-all duration-300 ${
                  menuOpen ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 w-full h-px bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-px bg-white transition-all duration-300 ${
                  menuOpen ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050510] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`text-3xl font-bold transition-colors ${
                  activeSection === link.href ? "text-cyan-400" : "text-white hover:text-cyan-400"
                }`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.4,
                  ease: [0.65, 0.05, 0, 1],
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
