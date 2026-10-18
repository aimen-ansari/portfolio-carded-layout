import { useEffect, useState, type ComponentType } from "react";

import { useHasHover, useMounted, useReducedMotion, useWebGLSupport } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

type SceneComponent = ComponentType<{
  reduced?: boolean;
  quality?: "low" | "high";
  onReady?: () => void;
}>;

/** CSS-only stand-in shown before (or instead of) the WebGL scene. */
function Poster() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="relative h-56 w-56">
        <div
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: "color-mix(in oklch, oklch(0.82 0.15 72) 40%, transparent)",
            animation: "poster-spin 28s linear infinite",
          }}
        />
        <div
          className="absolute inset-7 rounded-full border"
          style={{
            borderColor: "color-mix(in oklch, oklch(0.72 0.17 38) 32%, transparent)",
            animation: "poster-spin 19s linear infinite reverse",
          }}
        />
        <div
          className="absolute inset-16 rotate-45 border"
          style={{ borderColor: "color-mix(in oklch, oklch(0.88 0.13 88) 50%, transparent)" }}
        />
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, oklch(0.8 0.16 68) 45%, transparent), transparent 66%)",
          }}
        />
      </div>
    </div>
  );
}

function Hud({ hover }: { hover: boolean }) {
  return (
    <div className="stage-hud" aria-hidden="true">
      <span className="stage-corner top-3 left-3 border-t border-l" />
      <span className="stage-corner top-3 right-3 border-t border-r" />
      <span className="stage-corner bottom-3 left-3 border-b border-l" />
      <span className="stage-corner right-3 bottom-3 border-b border-r" />

      <div className="absolute top-4 left-4 flex items-center gap-2 sm:top-5 sm:left-5">
        <span className="live-dot text-[oklch(0.88_0.13_88)]">◆</span>
        <span className="text-[10px] tracking-[0.22em] text-[oklch(0.95_0.02_82)]/75 uppercase">
          Live render
        </span>
      </div>

      <div className="absolute top-4 right-4 text-right sm:top-5 sm:right-5">
        <span className="text-[10px] tracking-[0.22em] text-[oklch(0.95_0.02_82)]/45 uppercase">
          three.js / r3f
        </span>
      </div>

      <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
        <p className="text-[10px] tracking-[0.22em] text-[oklch(0.85_0.13_76)]/90 uppercase">
          Aimen / dev_
        </p>
        <p className="mt-1 text-[10px] tracking-[0.2em] text-[oklch(0.95_0.02_82)]/45 uppercase">
          {hover ? "Move cursor to explore" : "Real-time webgl"}
        </p>
      </div>

      <div className="absolute right-4 bottom-4 text-right sm:right-5 sm:bottom-5">
        <p className="text-[10px] tracking-[0.22em] text-[oklch(0.95_0.02_82)]/45 uppercase">
          Full-stack
        </p>
        <p className="mt-1 text-[10px] tracking-[0.22em] text-[oklch(0.95_0.02_82)]/45 uppercase">
          AI · SaaS · Web
        </p>
      </div>
    </div>
  );
}

/**
 * Framed 3D viewport. Loads three.js + the scene lazily on the client only, so
 * nothing WebGL-shaped ever runs during SSR, and degrades to an animated CSS
 * poster when WebGL is unavailable.
 */
export function HeroStage({ className }: { className?: string }) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const webgl = useWebGLSupport();
  const hover = useHasHover();
  const [Scene, setScene] = useState<SceneComponent | null>(null);
  const [quality, setQuality] = useState<"low" | "high">("high");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Build-time guard: three.js stays out of the SSR / Worker bundle entirely.
    if (import.meta.env.SSR || !mounted || !webgl) return;
    let cancelled = false;
    setQuality(window.innerWidth < 768 ? "low" : "high");
    const id = window.setTimeout(() => {
      void import("@/components/three/HeroScene").then((mod) => {
        if (!cancelled) setScene(() => mod.default);
      });
    }, 140);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [mounted, webgl]);

  return (
    <div className={cn("reveal", className)} style={{ animationDelay: "260ms" }}>
      <div className="stage-frame h-[320px] sm:h-[400px] lg:h-[500px]" aria-hidden="true">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            ready ? "opacity-0" : "opacity-100",
          )}
        >
          <Poster />
        </div>
        {Scene ? (
          <div className="absolute inset-0">
            <Scene reduced={reduced} quality={quality} onReady={() => setReady(true)} />
          </div>
        ) : null}
        <Hud hover={hover} />
      </div>
    </div>
  );
}
