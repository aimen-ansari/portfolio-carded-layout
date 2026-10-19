import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";

import { projects, type Project } from "@/data/projects";
import { getLenis } from "@/lib/lenis";

export function ProjectModal({
  project,
  onClose,
  onNavigate,
}: {
  project: Project | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const slug = project?.slug ?? null;

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      const index = projects.findIndex((p) => p.slug === project.slug);
      if (e.key === "ArrowLeft") {
        onNavigate(projects[(index - 1 + projects.length) % projects.length]!.slug);
      }
      if (e.key === "ArrowRight") {
        onNavigate(projects[(index + 1) % projects.length]!.slug);
      }
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Lenis drives the scroll position itself, so locking the body alone
    // doesn't freeze the page — pause smooth scrolling while the modal is up.
    getLenis()?.stop();
    const raf = requestAnimationFrame(() => dialogRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
      cancelAnimationFrame(raf);
      previouslyFocused?.focus?.();
    };
  }, [project, onClose, onNavigate]);

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
        className="fixed inset-0 bg-background/85 backdrop-blur-md"
        style={{ animation: "fade-in 300ms ease both" }}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        key={slug}
        className="relative z-10 my-0 w-full max-w-4xl border border-border bg-surface/95 outline-none backdrop-blur-xl sm:my-6 sm:rounded-3xl"
        style={{
          animation: "modal-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
          boxShadow:
            "0 40px 100px -40px color-mix(in oklch, var(--accent) 45%, transparent), var(--glass-shadow)",
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/90 px-6 py-4 backdrop-blur-xl sm:rounded-t-3xl sm:px-9">
          <div className="flex items-center gap-3">
            <span className="live-dot text-accent" aria-hidden="true">
              ◆
            </span>
            <p className="label-mono text-muted-foreground">{project.category}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] tracking-[0.16em] text-muted-foreground/70 uppercase sm:inline">
              Esc to close
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-[border-color,color,transform] duration-300 hover:rotate-90 hover:border-accent hover:text-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="px-6 pt-8 pb-10 sm:px-9 sm:pb-12">
          <h2
            id="project-modal-title"
            className="text-3xl font-medium tracking-[-0.02em] text-balance sm:text-4xl"
          >
            {project.name}
          </h2>

          <div className="group relative mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
            <img
              src={project.image}
              alt={`${project.name} interface screenshot`}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          </div>

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
                  <p className="mt-3 text-sm leading-relaxed font-medium text-accent">
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
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
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
                Visit Live Website <ArrowUpRight className="arrow h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => onNavigate(prev.slug)}
              className="group text-left transition-colors hover:text-accent"
            >
              <span className="label-mono block text-muted-foreground">← Previous</span>
              <span className="mt-1 block text-sm transition-transform duration-300 group-hover:-translate-x-0.5">
                {prev.name}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next.slug)}
              className="group text-right transition-colors hover:text-accent"
            >
              <span className="label-mono block text-muted-foreground">Next →</span>
              <span className="mt-1 block text-sm transition-transform duration-300 group-hover:translate-x-0.5">
                {next.name}
              </span>
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
