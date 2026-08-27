import portrait from "@/assets/about-portrait.jpg";
import { Reveal } from "./Reveal";

const focus = ["Web Platforms", "SaaS", "Business Systems", "AI Integration"];

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">04 / About</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            The person behind the products.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <img
              src={portrait}
              alt="Aimen Ansari working at his desk"
              loading="lazy"
              width={1008}
              height={1264}
              className="w-full rounded-2xl border border-border object-cover"
            />
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-foreground">
              I'm Aimen Ansari, a full-stack developer working with founders, brands and small
              teams to turn business ideas into products that run in production.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              I work across the whole stack — interface, backend, data and deployment — which
              means one person carries the product from the first requirement conversation to a
              live URL. I care about clarity over cleverness: systems that are simple to operate,
              easy to extend, and built around what the business actually needs to happen.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-border px-4 py-2 font-mono text-[11px] tracking-wide text-muted-foreground"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-12 space-y-3 border-t border-border pt-8">
              <p className="label-mono text-accent">Currently</p>
              <Row k="Building" v="Full-stack business products" />
              <Row k="Exploring" v="AI-integrated web experiences" />
              <Row k="Interested in" v="SaaS · Product Engineering · Applied AI" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <p className="flex flex-col gap-1 text-sm sm:flex-row sm:gap-4">
      <span className="w-32 shrink-0 font-mono text-xs text-muted-foreground">{k}</span>
      <span className="text-foreground">{v}</span>
    </p>
  );
}
