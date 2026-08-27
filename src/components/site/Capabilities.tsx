import { Reveal } from "./Reveal";

const items = [
  {
    title: "Business Websites",
    copy: "A presence that explains your value in seconds and converts attention into inquiries — fast, searchable and easy to update.",
  },
  {
    title: "Full-Stack Applications",
    copy: "Complete products with accounts, permissions, data and integrations — one system your team can actually operate.",
  },
  {
    title: "E-Commerce & Product Catalogues",
    copy: "Sell online without operational chaos: structured products, stock, orders and an admin panel that needs no developer.",
  },
  {
    title: "SaaS Products",
    copy: "Take a subscription idea to a working product — multi-user foundations, dashboards, and an architecture ready for growth.",
  },
  {
    title: "AI-Integrated Products",
    copy: "Put AI where it changes a business outcome: generation, vision, assistants — inside a reliable, cost-aware product.",
  },
  {
    title: "Existing Product Improvements",
    copy: "Inherit an unfinished or slow codebase, stabilise it, then ship the features and performance your users are waiting on.",
  },
];

export function Capabilities() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">07 / Capabilities</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            What I can build for you.
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 70}>
              <div className="h-full border-t border-border py-9 pr-8">
                <h3 className="text-lg font-medium tracking-[-0.01em]">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
