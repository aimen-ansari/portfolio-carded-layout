import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

const buildOptions = [
  "E-Commerce",
  "Business Website",
  "SaaS Platform",
  "Professional Website",
  "AI Product",
  "Admin / Internal System",
  "Custom Solution",
];

const stages = ["Just an idea", "Have requirements", "Design ready", "Existing product"];

export function ContactSection() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

  return (
    <section id="contact" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">08 / Contact</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-5xl">
            Have something in mind?
            <span className="block text-muted-foreground">
              Tell me what you're trying to build.
            </span>
          </h2>
        </Reveal>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-border bg-surface">
          <div
            className="flex w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: open ? "translateX(-50%)" : "translateX(0)" }}
          >
            {/* Panel 1 */}
            <div
              className={cn(
                "w-1/2 p-8 transition-opacity duration-500 sm:p-14",
                open && "pointer-events-none opacity-0",
              )}
            >
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Share the problem, not the spec. I'll reply with an honest view of scope,
                approach and timeline — usually within one working day.
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="arrow-shift mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start Project <span className="arrow">→</span>
              </button>
            </div>

            {/* Panel 2 */}
            <div className="w-1/2 p-8 sm:p-14">
              {sent ? (
                <div className="reveal py-10">
                  <p className="label-mono text-accent">Inquiry received ✓</p>
                  <p className="mt-6 max-w-md text-lg leading-relaxed">
                    Thanks — your project details are with me. I'll get back to you personally
                    within one working day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setOpen(false);
                    }}
                    className="mt-8 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-accent"
                  >
                    ← Back
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="label-mono text-muted-foreground">Project inquiry</p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-accent"
                    >
                      ← Back
                    </button>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <input required name="name" placeholder="Name" className={field} />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={field}
                    />
                  </div>
                  <select required name="build" defaultValue="" className={field}>
                    <option value="" disabled>
                      What would you like to build?
                    </option>
                    {buildOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <select required name="stage" defaultValue="" className={field}>
                    <option value="" disabled>
                      Project stage
                    </option>
                    {stages.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <textarea
                    required
                    name="description"
                    rows={4}
                    placeholder="Short project description"
                    className={cn(field, "resize-none")}
                  />
                  <button
                    type="submit"
                    className="arrow-shift inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Send Inquiry <span className="arrow">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {[
            { label: "Email", href: "mailto:hello@aimenansari.dev" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/aimenansari" },
            { label: "GitHub", href: "https://github.com/aimenansari" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="arrow-shift font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-accent"
            >
              {l.label} <span className="arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
