import {
  ArrowRight,
  ArrowUpRight,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Server,
  Sparkles,
  Store,
} from "lucide-react";

import { projects } from "@/data/projects";
import { ContactForm } from "./ContactForm";
import { HeroStage } from "./HeroStage";
import { Magnetic } from "./Magnetic";
import { Marquee } from "./Marquee";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

const services = [
  {
    name: "Business & E-Commerce Websites",
    description:
      "Modern, responsive websites and online stores built for businesses that need strong presentation, performance, usability, and a reliable digital presence.",
    tags: ["Responsive", "E-Commerce", "SEO"],
    Icon: Store,
  },
  {
    name: "Full-Stack Web Applications",
    description:
      "Complete applications with interactive interfaces, authentication, dashboards, databases, APIs, role-based access, and business workflows.",
    tags: ["Frontend", "Backend", "Database"],
    Icon: LayoutDashboard,
  },
  {
    name: "SaaS & Backend Systems",
    description:
      "Scalable platforms with user accounts, permissions, admin systems, cloud databases, APIs, third-party integrations, and production-ready backend architecture.",
    tags: ["Auth", "APIs", "Cloud"],
    Icon: Server,
  },
  {
    name: "AI-Integrated Solutions",
    description:
      "Practical AI features integrated into real applications, including computer vision, intelligent automation, model-powered workflows, and AI-assisted experiences.",
    tags: ["Python", "Computer Vision", "AI Integration"],
    Icon: Sparkles,
  },
];

const focusAreas = [
  "Full-Stack Development",
  "Business Websites",
  "E-Commerce",
  "SaaS Platforms",
  "Admin Dashboards",
  "AI Integration",
  "Automation",
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

const marqueeItems = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "ASP.NET Core",
  "PostgreSQL",
  "Supabase",
  "Tailwind CSS",
  "Three.js",
  "Python",
  "PyTorch",
  "OpenCV",
  "Vercel",
  "Cloudflare",
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
    <main id="content" className="portfolio-content min-w-0 lg:w-[57%] lg:pt-12">
      {/* ------------------------------------------------------------- stage */}
      <section className="scroll-mt-24 pb-16 lg:pb-24" aria-labelledby="stage-title">
        <h2 id="stage-title" className="sr-only">
          Interactive three-dimensional introduction
        </h2>
        <HeroStage />
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.2} max={9}>
              <a
                href="#projects"
                className="arrow-down shine-sweep inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-90"
              >
                Explore my work <span className="arrow">↓</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.2} max={9}>
              <a
                href="#contact"
                className="arrow-shift inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Discuss your project <span className="arrow">↗</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={170}>
          <div className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-2">
            {focusAreas.slice(0, 4).map((area) => (
              <span
                key={area}
                className="rounded-full border border-border/80 bg-surface/40 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
              >
                {area}
              </span>
            ))}
          </div>
        </Reveal>
        <div className="mt-8 border-y border-border py-4">
          <Marquee
            items={marqueeItems.map((item) => (
              <span
                key={item}
                className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase"
              >
                {item}
              </span>
            ))}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------- about */}
      <section id="about" className="scroll-mt-20 py-16 lg:py-24" aria-labelledby="about-title">
        <SectionTitle>About</SectionTitle>
        <h2 id="about-title" className="sr-only">
          About me
        </h2>
        <Reveal>
          <p className="max-w-2xl text-lg leading-[1.65] text-foreground sm:text-xl">
            I&apos;m a software engineer and full-stack developer focused on building complete,
            production-ready digital products.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-6 space-y-5 text-base leading-[1.8] text-muted-foreground">
            <p>
              I work across frontend development, backend systems, databases, APIs, authentication,
              integrations, and deployment to turn ideas into reliable applications.
            </p>
            <p>
              My work includes business websites, e-commerce platforms, SaaS products, dashboards,
              and AI-powered solutions. I value clean architecture, maintainable code, performance,
              and building software that solves real user and business problems.
            </p>
            <p>
              Rather than adding technology simply for complexity, I focus on choosing tools and
              approaches that support the actual needs of the product, its users, and the business
              behind it.
            </p>
            <p>
              I&apos;m especially interested in full-stack systems and applied AI, where
              technologies such as automation, computer vision, and intelligent workflows can be
              integrated into real-world applications.
            </p>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Focus areas">
            {focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-border/70 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                {area}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- services */}
      <section
        id="services"
        className="scroll-mt-20 py-16 lg:py-24"
        aria-labelledby="services-title"
      >
        <SectionTitle>Services</SectionTitle>
        <h2 id="services-title" className="sr-only">
          Services and capabilities
        </h2>
        <div className="mb-8 hidden items-end justify-between gap-6 lg:flex">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            End-to-end delivery — from the first requirement conversation to a live, maintainable
            product.
          </p>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
            04 disciplines
          </span>
        </div>

        <ol className="card-group space-y-4">
          {services.map((service, index) => (
            <Reveal as="li" key={service.name} delay={index * 60}>
              <TiltCard
                as="article"
                max={4}
                lift={5}
                className="portfolio-card group relative overflow-hidden rounded-2xl p-5 sm:p-6"
              >
                <span
                  className="pointer-events-none absolute top-4 right-5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground/35"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex gap-4 sm:gap-5">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface/70 text-accent transition-colors duration-300 group-hover:border-accent/50"
                    aria-hidden="true"
                  >
                    <service.Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium text-foreground transition-colors group-hover:text-accent">
                      {service.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <ul
                      className="mt-4 flex flex-wrap gap-2"
                      aria-label={`${service.name} capabilities`}
                    >
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-wide text-accent"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {["Understand", "Architect", "Build", "Launch"].map((step, index) => (
              <div key={step} className="group bg-background/60 p-4 backdrop-blur-sm">
                <span className="font-mono text-[10px] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-medium transition-colors group-hover:text-accent">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- projects */}
      <section
        id="projects"
        className="scroll-mt-20 py-16 lg:py-24"
        aria-labelledby="projects-title"
      >
        <SectionTitle>Projects</SectionTitle>
        <h2 id="projects-title" className="sr-only">
          Selected projects
        </h2>

        <div className="mb-8 hidden items-end justify-between gap-6 lg:flex">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Shipped products across commerce, business, events and AI. Open any card for the full
            case study.
          </p>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>

        <ol className="card-group space-y-4">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={index * 45}>
              <TiltCard
                as="article"
                max={3.5}
                lift={5}
                className="portfolio-card group relative grid gap-5 overflow-hidden rounded-2xl p-4 sm:grid-cols-[12.5rem_1fr] sm:items-start sm:p-5"
              >
                <button
                  type="button"
                  onClick={() => onOpen(project.slug)}
                  className="group/img relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface focus-visible:outline-2"
                  aria-label={`View details for ${project.name}`}
                >
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/img:opacity-100"
                    style={{
                      background:
                        "linear-gradient(to top, color-mix(in oklch, oklch(0.13 0.02 30) 78%, transparent), transparent 65%)",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute right-2.5 bottom-2.5 grid h-8 w-8 translate-y-2 place-items-center rounded-full bg-accent text-accent-foreground opacity-0 transition-all duration-500 group-hover/img:translate-y-0 group-hover/img:opacity-100"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpen(project.slug)}
                      className="arrow-shift flex items-center gap-1.5 text-left font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {project.name} <ArrowUpRight className="arrow h-4 w-4" aria-hidden="true" />
                    </button>
                    {project.featured && (
                      <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.16em] text-accent uppercase">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-mono text-[10px] tracking-[0.12em] text-accent uppercase">
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
                        className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-wide text-accent"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <button
                      type="button"
                      onClick={() => onOpen(project.slug)}
                      className="arrow-shift inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-accent"
                    >
                      Case study <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="arrow-shift inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-accent"
                    >
                      Live site <ArrowUpRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------------- stack */}
      <section id="skills" className="scroll-mt-20 py-16 lg:py-24" aria-labelledby="skills-title">
        <SectionTitle>Stack</SectionTitle>
        <h2 id="skills-title" className="sr-only">
          Technology stack
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {stack.map((row, index) => (
            <Reveal key={row.group} delay={index * 55}>
              <TiltCard
                max={4}
                lift={5}
                className="portfolio-card group h-full rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                    {row.group}
                  </h3>
                  <span className="font-mono text-[10px] text-muted-foreground/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {row.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-border/70 bg-surface/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- contact */}
      <section id="contact" className="scroll-mt-20 py-16 lg:py-24" aria-labelledby="contact-title">
        <SectionTitle>Contact</SectionTitle>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 p-7 backdrop-blur-sm sm:p-12">
            <div
              className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklch, var(--accent) 42%, transparent), transparent 68%)",
              }}
              aria-hidden="true"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
              <div>
                <p className="label-mono text-accent">What&apos;s next?</p>
                <h2
                  id="contact-title"
                  className="mt-5 max-w-lg text-3xl font-medium tracking-[-0.035em] text-balance sm:text-4xl"
                >
                  Have something in mind?
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                  Tell me what you&apos;re building, the problem you&apos;re solving, or the role
                  you&apos;re hiring for. I&apos;ll get back to you with the best way we can move
                  forward.
                </p>

                <ul className="mt-8 space-y-3" aria-label="Direct contact details">
                  <li>
                    <a
                      href="mailto:info@aimenansari.com"
                      className="group inline-flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-surface/70 text-accent transition-colors group-hover:border-accent/50">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </span>
                      info@aimenansari.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/923161794215"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-surface/70 text-accent transition-colors group-hover:border-accent/50">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      </span>
                      +92 316 1794215
                    </a>
                  </li>
                </ul>
              </div>

              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="pb-10 text-xs leading-relaxed text-muted-foreground lg:pb-16">
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
