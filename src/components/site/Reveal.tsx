import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealVariant = "up" | "fade" | "scale";

const hidden: Record<RevealVariant, string> = {
  up: "translate-y-4 opacity-0",
  fade: "opacity-0",
  scale: "scale-[0.97] opacity-0",
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  variant = "up",
  blur = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "article";
  variant?: RevealVariant;
  /** Adds a subtle de-blur as the element settles in. */
  blur?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        shown
          ? cn("translate-y-0 scale-100 opacity-100", blur && "blur-0")
          : cn(hidden[variant], blur && "blur-[6px]"),
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
