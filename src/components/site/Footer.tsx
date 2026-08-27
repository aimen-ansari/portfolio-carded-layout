export function Footer() {
  return (
    <footer className="px-6 pt-16 pb-14">
      <div className="mx-auto max-w-5xl border-t border-border pt-12">
        <p className="font-mono text-sm tracking-[0.3em]">
          AIMEN <span className="text-accent">/ DEV_</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono flex items-center gap-2 text-foreground">
            <span className="live-dot text-accent">●</span> Available for selected projects
          </p>
          <p className="label-mono text-muted-foreground">Pakistan · Worldwide Remote</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[11px] tracking-[0.18em] uppercase">
          {[
            { label: "GitHub", href: "https://github.com/aimenansari" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/aimenansari" },
            { label: "Email", href: "mailto:hello@aimenansari.dev" },
          ].map((l, i) => (
            <span key={l.label} className="flex items-center gap-4">
              {i > 0 && <span className="text-muted-foreground">·</span>}
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="arrow-shift text-muted-foreground transition-colors hover:text-accent"
              >
                {l.label} <span className="arrow">↗</span>
              </a>
            </span>
          ))}
        </div>

        <p className="mt-12 font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
          © 2026 EOF<span className="terminal-cursor text-accent">_</span>
        </p>
      </div>
    </footer>
  );
}
