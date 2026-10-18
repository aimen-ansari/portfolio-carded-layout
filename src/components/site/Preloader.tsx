import { useEffect, useState } from "react";

/**
 * Brief intro veil. The hide animation lives entirely in CSS (and ends
 * `visibility: hidden`), so the overlay can never trap the page even if the
 * unmount timer is missed. Skipped for reduced-motion users.
 */
export function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const id = window.setTimeout(() => setGone(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-background"
      style={{
        backgroundImage: "var(--site-glow)",
        animation: "intro-out 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      }}
    >
      <div
        className="flex flex-col items-center"
        style={{ animation: "intro-rise 700ms ease both" }}
      >
        <p className="font-mono text-xs tracking-[0.34em] text-foreground">
          AIMEN <span className="text-accent">/ DEV_</span>
        </p>
        <div className="mt-5 h-px w-40 overflow-hidden bg-border">
          <div
            className="h-full w-full origin-left"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--accent-2), var(--accent-3))",
              animation: "intro-bar 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          />
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
          Preparing experience
        </p>
      </div>
    </div>
  );
}
