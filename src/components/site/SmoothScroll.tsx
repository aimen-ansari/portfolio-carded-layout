import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { setLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling driven by the GSAP ticker and kept in sync with
 * ScrollTrigger, so every GSAP-powered component (SplitText, scroll effects)
 * reads the correct scroll position.
 *
 * Skipped entirely for reduced-motion users and on the server — the page then
 * falls back to native scrolling. In-page anchors (#about, #projects, …)
 * scroll smoothly with an -80px offset to mimic the sections' `scroll-mt-20`.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      autoRaf: false,
      anchors: { offset: -80 },
    });
    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
