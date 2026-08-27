import { Reveal } from "./Reveal";

const steps = [
  { n: "01", title: "Understand", copy: "Business goals, users, requirements." },
  { n: "02", title: "Design", copy: "Product structure, architecture, UI and user flow." },
  {
    n: "03",
    title: "Build",
    copy: "Frontend, backend, authentication, database, APIs and integrations.",
  },
  { n: "04", title: "Launch", copy: "Testing, deployment and optimization." },
];

export function Process() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">02 / Process</p>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.02em] sm:text-4xl">How I work</h2>
        </Reveal>

        <div className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="relative h-full border-t border-border py-8 pr-8">
                <span className="absolute -top-px left-0 h-px w-8 bg-accent" />
                <p className="font-mono text-xs tracking-[0.2em] text-accent">{s.n}</p>
                <h3 className="mt-5 text-xl font-medium tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {s.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
