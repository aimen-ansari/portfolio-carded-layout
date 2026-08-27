import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { siWhatsapp } from "simple-icons";

import { useTheme } from "@/lib/use-theme";

function WhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siWhatsapp.path} />
    </svg>
  );
}

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Tech Stack", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/aimen-ansari", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aimen92/", Icon: Linkedin },
  { label: "Email", href: "mailto:hello@aimenansari.dev", Icon: Mail },
  { label: "WhatsApp +92 316 1794215", href: "https://wa.me/923161794215", Icon: WhatsApp },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="flex items-center gap-5" aria-label="Social links">
        {socials.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              title={label}
              className="block rounded-sm text-muted-foreground transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-accent focus-visible:text-accent"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Navbar() {
  const [active, setActive] = useState("about");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="relative pt-7 sm:pt-9 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[43%] lg:shrink-0 lg:flex-col lg:justify-start lg:py-12">
      <div>
        <div className="flex items-start justify-between gap-4">
          <a href="#top" className="group rounded-sm" aria-label="Aimen Ansari, home">
            <span className="font-mono text-xs tracking-[0.28em] text-foreground">
              AIMEN <span className="text-accent">/ DEV_</span>
            </span>
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-[border-color,color,transform] duration-300 hover:rotate-6 hover:border-accent hover:text-accent"
          >
            <Sun
              className={`absolute h-4 w-4 transition-[opacity,transform] duration-300 ${
                theme === "dark" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
              aria-hidden="true"
            />
            <Moon
              className={`absolute h-4 w-4 transition-[opacity,transform] duration-300 ${
                theme === "light" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        <h1 className="mt-9 text-4xl leading-none font-semibold tracking-[-0.04em] sm:text-5xl lg:mt-8">
          Aimen Ansari
        </h1>
        <h2 className="mt-4 text-lg font-medium tracking-[-0.01em] text-foreground sm:text-xl">
          Software Engineer &amp; Full-Stack Developer
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
          I build production-ready digital products — from modern websites and e-commerce platforms
          to SaaS systems and AI-powered applications.
        </p>
        <nav className="mt-10 lg:mt-8" aria-label="In-page navigation">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`group flex min-h-9 w-fit items-center gap-4 rounded-sm py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                    active === link.id
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`h-px transition-all duration-300 ${
                      active === link.id
                        ? "w-16 bg-accent"
                        : "w-8 bg-muted-foreground/60 group-hover:w-16 group-hover:bg-foreground"
                    }`}
                    aria-hidden="true"
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <SocialLinks className="mt-12 lg:mt-8" />
    </header>
  );
}
