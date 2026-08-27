import { useState } from "react";
import { projects, type ProjectFilter } from "@/data/projects";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const filters: ("All" | ProjectFilter)[] = [
  "All",
  "Full Stack",
  "Business",
  "SaaS",
  "AI",
  "Frontend",
];

export function ProjectsGrid({ onOpen }: { onOpen: (slug: string) => void }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = active === "All" ? projects : projects.filter((p) => p.filters.includes(active));

  return (
    <section id="projects" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">06 / Projects</p>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.02em] sm:text-4xl">All projects</h2>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-b border-border pb-5">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={cn(
                  "font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-300",
                  active === f ? "text-accent" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <article>
                <button
                  type="button"
                  onClick={() => onOpen(p.slug)}
                  aria-label={`View ${p.name}`}
                  className="group block w-full overflow-hidden rounded-2xl border border-border bg-surface"
                >
                  <img
                    src={p.image}
                    alt={`${p.name} website screenshot`}
                    loading="lazy"
                    width={1600}
                    height={1008}
                    className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                  />
                </button>
                <p className="label-mono mt-6 text-accent">{p.category}</p>
                <h3 className="mt-3 text-xl font-medium tracking-[-0.01em]">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                <div className="mt-6 flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => onOpen(p.slug)}
                    className="arrow-shift inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"
                  >
                    View Project <span className="arrow">→</span>
                  </button>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-shift inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    Live <span className="arrow">↗</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
