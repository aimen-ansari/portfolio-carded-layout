import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative px-6 pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">
            Full-Stack Development / Digital Products / AI
            <span className="terminal-cursor ml-1 text-accent">_</span>
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-8 max-w-4xl text-[2.6rem] leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl">
            Have an idea that needs to become a real product?
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I design and build complete digital products — from business websites and
            e-commerce platforms to SaaS products, dashboards, internal systems and
            AI-powered applications.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-11 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="arrow-down inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-90"
            >
              Explore My Work <span className="arrow">↓</span>
            </a>
            <a
              href="#contact"
              className="arrow-shift inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Discuss Your Project <span className="arrow">↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="label-mono flex items-center gap-2 text-foreground">
              <span className="live-dot text-accent">●</span> Available for selected projects
            </p>
            <p className="label-mono text-muted-foreground">
              Remote · Freelance · Contract · Worldwide
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
