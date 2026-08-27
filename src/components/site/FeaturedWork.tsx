import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function FeaturedWork({ onOpen }: { onOpen: (slug: string) => void }) {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">03 / Selected work</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Real products, shipped and live.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-28">
          {featured.map((p, i) => (
            <Reveal key={p.slug}>
              <article className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2 lg:col-start-6")}>
                  <button
                    type="button"
                    onClick={() => onOpen(p.slug)}
                    className="group block w-full overflow-hidden rounded-2xl border border-border bg-surface"
                    aria-label={`View ${p.name}`}
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
                </div>

                <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-1 lg:col-start-1")}>
                  <p className="label-mono text-accent">{p.category}</p>
                  <h3 className="mt-4 text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {p.stack.map((t) => (
                      <span key={t} className="font-mono text-[11px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-6">
                    <button
                      type="button"
                      onClick={() => onOpen(p.slug)}
                      className="arrow-shift inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
