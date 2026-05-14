import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const visible = useRef(false);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly via transform (GPU-composited)
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let raf: number;

    const animate = () => {
      // Ring follows with fast lerp for snappier feel
      pos.current.x = lerp(pos.current.x, target.current.x, 0.45);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.45);
      ring.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (!el) return;
      const state = el.getAttribute("data-cursor") || "pointer";
      ring.setAttribute("data-state", state);
      dot.setAttribute("data-state", state);

      if (state === "view") {
        label.textContent = "View";
        label.classList.add("active");
      } else if (state === "label") {
        label.textContent = el.getAttribute("data-cursor-label") || "";
        label.classList.add("active");
      }
    };

    const onOut = (e: Event) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (!el) return;
      ring.setAttribute("data-state", "default");
      dot.setAttribute("data-state", "default");
      label.textContent = "";
      label.classList.remove("active");
    };

    const onDown = () => {
      ring.classList.add("clicking");
      dot.classList.add("clicking");
    };
    const onUp = () => {
      ring.classList.remove("clicking");
      dot.classList.remove("clicking");
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
