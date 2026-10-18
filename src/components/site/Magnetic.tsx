import { useCallback, useRef, type ReactNode } from "react";

import { useHasHover, useReducedMotion } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

/** Attracts its child toward the cursor for a tactile, "magnetic" feel. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  max = 12,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor distance applied as translation. */
  strength?: number;
  /** Maximum translation in pixels. */
  max?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hover = useHasHover();
  const reduced = useReducedMotion();
  const enabled = hover && !reduced;

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      const el = ref.current;
      if (!el || !enabled) return;
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const clamp = (v: number) => Math.max(-max, Math.min(max, v));
      el.style.transform = `translate3d(${clamp(dx * strength).toFixed(2)}px, ${clamp(
        dy * strength,
      ).toFixed(2)}px, 0)`;
    },
    [enabled, max, strength],
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return (
    <span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn("inline-block", className)}
      style={{
        transition: enabled ? "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)" : undefined,
        willChange: "transform",
      }}
    >
      {children}
    </span>
  );
}
