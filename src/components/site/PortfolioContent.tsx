import { ArrowRight, ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";

const services = [
  {
    name: "Business & E-Commerce Websites",
    description:
      "Modern, responsive websites and online stores built for businesses that need strong presentation, performance, usability, and a reliable digital presence.",
    tags: ["Responsive", "E-Commerce", "SEO"],
  },
  {
    name: "Full-Stack Web Applications",
    description:
      "Complete applications with interactive interfaces, authentication, dashboards, databases, APIs, role-based access, and business workflows.",
    tags: ["Frontend", "Backend", "Database"],
  },
  {
    name: "SaaS & Backend Systems",
    description:
      "Scalable platforms with user accounts, permissions, admin systems, cloud databases, APIs, third-party integrations, and production-ready backend architecture.",
    tags: ["Auth", "APIs", "Cloud"],
  },
  {
    name: "AI-Integrated Solutions",
    description:
      "Practical AI features integrated into real applications, including computer vision, intelligent automation, model-powered workflows, and AI-assisted experiences.",
    tags: ["Python", "Computer Vision", "AI Integration"],
  },
];

const stack = [
  {
    group: "Frontend",
    tools: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Three.js", "GSAP"],
  },
  {
    group: "Backend",
    tools: ["Node.js", "Express.js", "ASP.NET Core", "REST APIs", "Authentication"],
  },
  {
    group: "Database & Cloud",
    tools: ["PostgreSQL", "Supabase", "MongoDB", "Vercel", "Cloudflare"],
  },
  {
    group: "AI / ML",
    tools: ["Python", "PyTorch", "OpenCV", "Computer Vision", "Deep Learning", "YOLO"],
  },
  {
    group: "Tools & CMS",
    tools: ["Git", "GitHub", "VS Code", "Figma", "WordPress", "WooCommerce"],
  },
];

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mobile-section-title mb-8 font-mono text-xs font-medium tracking-[0.18em] text-foreground uppercase lg:sr-only">
      {children}
    </h2>
  );
}

export function PortfolioContent({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <main id="content" className="portfolio-content min-w-0 lg:w-[57%] lg:pt-24">
      <section
        id="about"
        className="scroll-mt-20 py-20 lg:pt-0 lg:pb-36"
        aria-labelledby="about-title"
      >
        <SectionTitle>About</SectionTitle>
        <h2 id="about-title" className="sr-only">
          About me
        </h2>
        <Reveal>
          <p className="text-base leading-[1.8] text-muted-foreground">
            I&apos;m a software engineer and full-stack developer focused on building complete,
            production-ready digital products. I work across frontend development, backend systems,
            databases, APIs, authentication, integrations, and deployment to turn ideas into
            reliable applications.
          </p>
          <p className="mt-6 text-base leading-[1.8] text-muted-foreground">
            My work includes business websites, e-commerce platforms, SaaS products, dashboards, and
            AI-powered solutions. I value clean architecture, maintainable code, performance, and
            building software that solves real user and business problems.
          </p>
          <p className="mt-6 text-base leading-[1.8] text-muted-foreground">
            Rather than adding technology simply for complexity, I focus on choosing tools and
            approaches that support the actual needs of the product, its users, and the business
            behind it.
          </p>
          <p className="mt-6 text-base leading-[1.8] text-muted-foreground">
            I&apos;m especially interested in full-stack systems and applied AI, where technologies
            such as automation, computer vision, and intelligent workflows can be integrated into
            real-world applications to create useful experiences and solve meaningful problems.
          </p>
        </Reveal>
      </section>

      <section
        id="services"
        className="scroll-mt-20 py-20 lg:pb-36"
        aria-labelledby="services-title"
      >
        <SectionTitle>Services</SectionTitle>
        <h2 id="services-title" className="sr-only">
          Services and capabilities
        </h2>
        <ol className="card-group space-y-5">
          {services.map((service, index) => (
            <Reveal as="li" key={service.name} delay={index * 60}>
              <article className="portfolio-card group grid gap-3 rounded-xl p-5 transition sm:grid-cols-[7rem_1fr] sm:gap-5">
                <p className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                  0{index + 1} / Service
                </p>
                <div>
                  <h3 className="font-medium text-foreground transition-colors group-hover:text-accent">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label={`${service.name} capabilities`}
                  >
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] text-accent"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={120}>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {["Understand", "Architect", "Build", "Launch"].map((step, index) => (
              <div key={step} className="bg-background p-4">
                <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                <p className="mt-2 text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="projects"
        className="scroll-mt-20 py-20 lg:pb-36"
        aria-labelledby="projects-title"
      >
        <SectionTitle>Projects</SectionTitle>
        <h2 id="projects-title" className="sr-only">
          Selected projects
        </h2>
        <ol className="card-group space-y-5">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={index * 55}>
              <article className="portfolio-card group relative grid gap-5 rounded-xl p-5 sm:grid-cols-[9rem_1fr]">
                <button
                  type="button"
                  onClick={() => onOpen(project.slug)}
                  className="overflow-hidden rounded-lg border-2 border-border bg-surface sm:mt-1 sm:h-24"
                  aria-label={`View details for ${project.name}`}
                >
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    width={1600}
                    height={1008}
                    className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </button>
                <div>
                  <button
                    type="button"
                    onClick={() => onOpen(project.slug)}
                    className="arrow-shift inline-flex items-center gap-1.5 text-left font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {project.name} <ArrowUpRight className="arrow h-4 w-4" aria-hidden="true" />
                  </button>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-accent uppercase">
                    {project.category}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.short}
                  </p>
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label={`${project.name} technologies`}
                  >
                    {project.stack.slice(0, 4).map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] text-accent"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-shift mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-accent"
                  >
                    Live site <ArrowUpRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="skills" className="scroll-mt-20 py-20 lg:pb-36" aria-labelledby="skills-title">
        <SectionTitle>Stack</SectionTitle>
        <h2 id="skills-title" className="sr-only">
          Technology stack
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {stack.map((row, index) => (
            <Reveal key={row.group} delay={index * 55}>
              <div className="grid gap-4 py-7 sm:grid-cols-[8rem_1fr]">
                <h3 className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                  {row.group}
                </h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-3">
                  {row.tools.map((tool) => (
                    <li
                      key={tool}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 py-20 lg:pb-24" aria-labelledby="contact-title">
        <SectionTitle>Contact</SectionTitle>
        <Reveal>
          <p className="label-mono text-accent">What&apos;s next?</p>
          <h2
            id="contact-title"
            className="mt-5 text-3xl font-medium tracking-[-0.035em] sm:text-4xl"
          >
            Have something in mind?
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Tell me what you&apos;re building, the problem you&apos;re solving, or the role
            you&apos;re hiring for. I&apos;ll get back to you with the best way we can move forward.
          </p>
          <a
            href="mailto:hello@aimenansari.dev"
            className="arrow-shift mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start a conversation <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </section>

      <footer className="pb-10 text-xs leading-relaxed text-muted-foreground lg:pb-24">
        <p className="label-mono mb-5 flex items-center gap-2 text-foreground">
          <span className="live-dot text-accent">●</span> Available for projects &amp; opportunities
        </p>
        <p>Designed and built by Aimen Ansari. Pakistan · Worldwide remote.</p>
        <p className="mt-2 font-mono text-[10px] tracking-[0.15em] uppercase">
          © 2026 EOF<span className="terminal-cursor text-accent">_</span>
        </p>
      </footer>
    </main>
  );
}
