import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { projects } from "@/data/projects";

const options = [
  {
    id: "ecommerce",
    label: "E-Commerce",
    copy: "A storefront that sells: structured catalogue, variants, cart, checkout, payments and an admin panel your team runs without a developer.",
  },
  {
    id: "business",
    label: "Business Website",
    copy: "A credibility-first site that explains what you do, earns trust quickly and turns visitors into qualified inquiries.",
  },
  {
    id: "saas",
    label: "SaaS Platform",
    copy: "Multi-user product foundations: authentication, roles, billing-ready data models, dashboards and an interface built to grow.",
  },
  {
    id: "professional",
    label: "Professional Website",
    copy: "A precise, fast, content-managed presence for agencies, studios and firms — built for search visibility and outreach.",
  },
  {
    id: "ai",
    label: "AI Product",
    copy: "Applied AI inside a real product: generation pipelines, vision and language models, queues, cost control and a usable interface.",
  },
  {
    id: "internal",
    label: "Admin / Internal System",
    copy: "Operations tooling that replaces spreadsheets — records, permissions, workflows, reporting and exports.",
  },
  {
    id: "custom",
    label: "Custom Solution",
    copy: "Something that does not fit a category. We define the scope together, then build the smallest complete version that works.",
  },
];

export function BuildSelector({ onSelectProject }: { onSelectProject: (slug: string) => void }) {
  const [active, setActive] = useState<string | null>(null);
  const option = options.find((o) => o.id === active);
  const matches = active ? projects.filter((p) => p.needs.includes(active)).slice(0, 3) : [];

  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">01 / Start here</p>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            What are you looking to build?
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setActive(active === o.id ? null : o.id)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm transition-all duration-300",
                  active === o.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-accent hover:text-foreground",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          className={cn(
            "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            option ? "mt-10 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            {option && (
              <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">
                <p className="max-w-2xl text-base leading-relaxed text-foreground">{option.copy}</p>
                {matches.length > 0 && (
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
                    <span className="label-mono text-muted-foreground">Relevant work</span>
                    {matches.map((p) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => onSelectProject(p.slug)}
                        className="arrow-shift text-sm text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                      >
                        {p.name} <span className="arrow">→</span>
                      </button>
                    ))}
                  </div>
                )}
                <a
                  href="#projects"
                  className="arrow-shift mt-7 inline-flex items-center gap-2 text-sm text-accent"
                >
                  See relevant work <span className="arrow">→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
