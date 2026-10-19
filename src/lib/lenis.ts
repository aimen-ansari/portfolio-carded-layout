import type Lenis from "lenis";

/**
 * Module-level handle on the active Lenis instance so overlays (e.g. the
 * project modal) can pause and resume smooth scrolling without prop drilling.
 * Null while smooth scroll is disabled (SSR, reduced motion, before mount).
 */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
