import { useEffect, useRef } from "react";

/** Slim gradient reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (wrapRef.current) wrapRef.current.style.opacity = progress > 0.005 ? "1" : "0";
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[2px] opacity-0 transition-opacity duration-500"
    >
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          transform: "scaleX(0)",
          backgroundImage:
            "linear-gradient(90deg, var(--accent-2), var(--accent) 40%, var(--accent-3))",
          boxShadow: "0 0 18px color-mix(in oklch, var(--accent) 70%, transparent)",
        }}
      />
    </div>
  );
}
