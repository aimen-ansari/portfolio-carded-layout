import { useCallback, useRef, type ReactNode } from "react";

import { useHasHover, useReducedMotion } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

type TiltTag = "div" | "article" | "li" | "section";

/**
 * Pointer-driven 3D tilt. Writes `--mx` / `--my` custom properties so the
 * card's own CSS can render a light that follows the cursor, and applies a
 * subtle perspective rotation for depth.
 */
export function TiltCard({
  children,
  className,
  max = 6,
  lift = 6,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** Peak upward translation in pixels. */
  lift?: number;
  as?: TiltTag;
}) {
  const ref = useRef<HTMLElement>(null);
  const hover = useHasHover();
  const reduced = useReducedMotion();
  const enabled = hover && !reduced;

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      el.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
      const rotateY = (px - 0.5) * 2 * max;
      const rotateX = (0.5 - py) * 2 * max;
      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
        2,
      )}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-${lift}px)`;
    },
    [enabled, lift, max],
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "0%");
  }, []);

  return (
    <Tag
      ref={ref as never}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      className={cn("tilt-card", className)}
    >
      {children}
    </Tag>
  );
}
