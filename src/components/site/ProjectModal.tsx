import { useEffect } from "react";
import { X } from "lucide-react";
import { projects, type Project } from "@/data/projects";

export function ProjectModal({
  project,
  onClose,
  onNavigate,
}: {
  project: Project | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-0 sm:p-6">
      <button
        type="button"
        aria-label="Close project"
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        key={project.slug}
        className="reveal relative z-10 my-0 w-full max-w-4xl border border-border bg-surface sm:my-6 sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/95 px-6 py-4 backdrop-blur sm:rounded-t-3xl sm:px-9">
          <p className="label-mono text-muted-foreground">{project.category}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pt-8 pb-10 sm:px-9 sm:pb-12">
          <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">{project.name}</h2>

          <img
            src={project.image}
            alt={`${project.name} interface screenshot`}
            loading="lazy"
            width={1600}
            height={1008}
            className="mt-8 w-full rounded-2xl border border-border object-cover"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-8">
              <Block title="Overview" body={project.overview} />
              <Block title="Problem" body={project.problem} />
              <Block title="Solution" body={project.solution} />
              <div>
                <p className="label-mono text-muted-foreground">Key features</p>
                <ul className="mt-4 space-y-2.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed text-foreground">
                      <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8 lg:border-l lg:border-border lg:pl-10">
              <div>
                <p className="label-mono text-muted-foreground">My role</p>
                {project.roleTitle && (
                  <p className="mt-3 text-sm font-medium leading-relaxed text-accent">
                    {project.roleTitle}
                  </p>
                )}
                <p
                  className={`${project.roleTitle ? "mt-2" : "mt-3"} text-sm leading-relaxed text-foreground`}
                >
                  {project.role}
                </p>
                {project.responsibilities && (
                  <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-wide text-muted-foreground">
                    {project.responsibilities.join(" · ")}
                  </p>
                )}
                {project.lifecycle && (
                  <p className="mt-4 border-t border-border pt-4 font-mono text-[10px] leading-relaxed tracking-wide text-foreground">
                    {project.lifecycle.map((step, stepIndex) => (
                      <span key={step}>
                        {stepIndex > 0 && <span className="mx-1.5 text-accent">→</span>}
                        {step}
                      </span>
                    ))}
                  </p>
                )}
              </div>
              <div>
                <p className="label-mono text-muted-foreground">Technology stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Block title="Outcome" body={project.outcome} />
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-shift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Visit Live Website <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => onNavigate(prev.slug)}
              className="text-left transition-colors hover:text-accent"
            >
              <span className="label-mono block text-muted-foreground">← Previous</span>
              <span className="mt-1 block text-sm">{prev.name}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next.slug)}
              className="text-right transition-colors hover:text-accent"
            >
              <span className="label-mono block text-muted-foreground">Next →</span>
              <span className="mt-1 block text-sm">{next.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="label-mono text-muted-foreground">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{body}</p>
    </div>
  );
}
