import { useEffect, useRef } from "react";

/**
 * Ambient glow that trails the cursor. The position is eased with rAF so the
 * light feels weighted rather than pinned to the pointer. Disabled on
 * touch-only devices via CSS (`.pointer-spotlight` is hidden under 1024px).
 */
export function PointerSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetX = window.innerWidth * 0.6;
    let targetY = 0;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;
    let running = false;

    const apply = () => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--spotlight-x", `${currentX.toFixed(1)}px`);
      el.style.setProperty("--spotlight-y", `${currentY.toFixed(1)}px`);
    };

    const loop = () => {
      if (reduced) {
        currentX = targetX;
        currentY = targetY;
      } else {
        currentX += (targetX - currentX) * 0.16;
        currentY += (targetY - currentY) * 0.16;
      }
      apply();
      if (Math.abs(targetX - currentX) > 0.4 || Math.abs(targetY - currentY) > 0.4) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    apply();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="pointer-spotlight" aria-hidden="true" />;
}
