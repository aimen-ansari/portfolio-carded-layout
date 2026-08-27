import {
  siReact,
  siNextdotjs,
  siJavascript,
  siHtml5,
  siCss,
  siTailwindcss,
  siThreedotjs,
  siNodedotjs,
  siDotnet,
  siOpenapiinitiative,
  siPostgresql,
  siSupabase,
  siMongodb,
  siCloudinary,
  siPython,
  siPytorch,
  siOpencv,
  siGit,
  siGithub,
  siVercel,
  siCloudflare,
  siFigma,
} from "simple-icons";
import { Reveal } from "./Reveal";
import { projects } from "@/data/projects";

type Icon = { path: string };

const vscode: Icon = {
  path: "M17.5 1.5 8.9 9.9 4.4 6.5 2 7.7v8.6l2.4 1.2 4.5-3.4 8.6 8.4L22 20.6V3.4L17.5 1.5zm0 5.2v10.6L11.6 12l5.9-5.3zM4.6 9.6 7 12l-2.4 2.4V9.6z",
};

const groups: { title: string; items: { name: string; icon: Icon }[] }[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs },
      { name: "JavaScript", icon: siJavascript },
      { name: "HTML", icon: siHtml5 },
      { name: "CSS", icon: siCss },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "Three.js", icon: siThreedotjs },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: siNodedotjs },
      { name: "ASP.NET Core", icon: siDotnet },
      { name: "REST APIs", icon: siOpenapiinitiative },
    ],
  },
  {
    title: "Data & Services",
    items: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Supabase", icon: siSupabase },
      { name: "MongoDB", icon: siMongodb },
      { name: "Cloudinary", icon: siCloudinary },
    ],
  },
  {
    title: "AI",
    items: [
      { name: "Python", icon: siPython },
      { name: "PyTorch", icon: siPytorch },
      { name: "OpenCV", icon: siOpencv },
    ],
  },
  {
    title: "Tools / Deployment",
    items: [
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
      { name: "Vercel", icon: siVercel },
      { name: "Cloudflare", icon: siCloudflare },
      { name: "Figma", icon: siFigma },
      { name: "VS Code", icon: vscode },
    ],
  },
];

const usedIn = (tech: string) => projects.filter((p) => p.stack.includes(tech));

export function TechStack({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <section id="skills" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">05 / Stack</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Technology I build with.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-px">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 60}>
              <div className="grid gap-8 border-t border-border py-9 lg:grid-cols-[200px_1fr]">
                <p className="label-mono text-accent">{g.title}</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
                  {g.items.map((item) => {
                    const used = usedIn(item.name);
                    return (
                      <div key={item.name} className="group">
                        <div className="flex items-center gap-3">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0 fill-muted-foreground transition-colors duration-300 group-hover:fill-accent"
                          >
                            <path d={item.icon.path} />
                          </svg>
                          <span className="text-sm text-foreground">{item.name}</span>
                        </div>
                        {used.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-x-3 pl-8">
                            {used.map((p) => (
                              <button
                                key={p.slug}
                                type="button"
                                onClick={() => onOpen(p.slug)}
                                className="font-mono text-[10px] tracking-wide text-muted-foreground transition-colors hover:text-accent"
                              >
                                {p.name} →
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
