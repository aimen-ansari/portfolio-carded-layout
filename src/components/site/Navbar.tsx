import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { siWhatsapp } from "simple-icons";

import SplitText from "@/components/bits/SplitText/SplitText";
import { useReducedMotion } from "@/lib/use-mounted";
import { useTheme } from "@/lib/use-theme";
import { Magnetic } from "./Magnetic";

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
  { label: "Email", href: "mailto:info@aimenansari.com", Icon: Mail },
  { label: "WhatsApp +92 316 1794215", href: "https://wa.me/923161794215", Icon: WhatsApp },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="flex items-center gap-2.5" aria-label="Social links">
        {socials.map(({ label, href, Icon }) => (
          <li key={label}>
            <Magnetic strength={0.4} max={7}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-muted-foreground transition-[color,background-color,border-color] duration-300 hover:border-border hover:bg-surface/70 hover:text-accent focus-visible:text-accent"
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </Magnetic>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Live local time in the studio's timezone — a small, human detail. */
function LocalTime() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const format = () => {
      try {
        return new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
      } catch {
        return new Date().toTimeString().slice(0, 5);
      }
    };
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 15000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time} PKT</span>;
}

const railProgress = (el: HTMLElement | null, value: number) => {
  if (el) el.style.transform = `scaleY(${Math.min(1, Math.max(0, value))})`;
};

export function Navbar() {
  const [active, setActive] = useState("about");
  /** Held back until the intro veil lifts so the reveal is actually seen. */
  const [introDone, setIntroDone] = useState(false);
  const { theme, toggle } = useTheme();
  const fillRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = window.setTimeout(() => setIntroDone(true), reduced ? 0 : 1350);
    return () => window.clearTimeout(id);
  }, [reduced]);

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

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      railProgress(fillRef.current, max > 0 ? doc.scrollTop / max : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="relative pt-7 sm:pt-9 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[43%] lg:shrink-0 lg:flex-col lg:justify-between lg:py-12">
      <div>
        <div className="flex items-center justify-between gap-4">
          <a
            href="#top"
            className="group flex items-center gap-3 rounded-lg"
            aria-label="Aimen Ansari, home"
          >
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-border bg-surface/60 transition-colors duration-300 group-hover:border-accent">
              <span
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "linear-gradient(140deg, color-mix(in oklch, var(--accent-3) 26%, transparent), transparent 62%)",
                }}
              />
              <span className="relative rotate-45 text-[11px] leading-none text-accent transition-transform duration-500 group-hover:rotate-[135deg]">
                ◆
              </span>
            </span>
            <span className="font-mono text-xs tracking-[0.28em] text-foreground">
              AIMEN <span className="text-accent">/ DEV_</span>
            </span>
          </a>

          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-[border-color,color,transform] duration-300 hover:rotate-6 hover:border-accent hover:text-accent"
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

        {introDone ? (
          <SplitText
            tag="h1"
            text="Aimen Ansari"
            splitType="words"
            effect="rise"
            trigger="load"
            delay={80}
            duration={0.9}
            staggerFrom="start"
            className="mt-9 text-4xl leading-none font-semibold tracking-[-0.04em] sm:text-5xl lg:mt-8"
          />
        ) : (
          <h1 className="mt-9 text-4xl leading-none font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:mt-8">
            Aimen Ansari
          </h1>
        )}
        <h2 className="mt-4 text-lg font-medium tracking-[-0.01em] text-foreground sm:text-xl">
          Software Engineer &amp; Full-Stack Developer
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
          I build production-ready digital products — from modern websites and e-commerce platforms
          to SaaS systems and AI-powered applications.
        </p>

        <div className="relative mt-10 lg:mt-9">
          <span
            className="pointer-events-none absolute top-1 bottom-1 left-0 hidden w-px bg-border lg:block"
            aria-hidden="true"
          />
          <span
            ref={fillRef}
            className="pointer-events-none absolute top-1 bottom-1 left-0 hidden w-px origin-top bg-accent lg:block"
            style={{ transform: "scaleY(0)" }}
            aria-hidden="true"
          />
          <nav aria-label="In-page navigation">
            <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:space-y-0.5 lg:overflow-visible lg:px-0 lg:pl-4 lg:pb-0">
              {links.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id} className="shrink-0 lg:shrink">
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex min-h-9 items-center gap-3 rounded-full border px-3.5 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 lg:rounded-none lg:border-0 lg:px-0 ${
                        isActive
                          ? "border-accent/40 bg-accent/10 text-accent lg:bg-transparent"
                          : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground lg:border-0"
                      }`}
                    >
                      <span
                        className={`hidden h-px transition-all duration-300 lg:block ${
                          isActive
                            ? "w-8 bg-accent"
                            : "w-3 bg-muted-foreground/60 group-hover:w-8 group-hover:bg-foreground"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="hidden lg:inline">{link.label}</span>
                      <span className="lg:hidden">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="rail-availability glass mt-8 items-center justify-between gap-4 rounded-2xl px-4 py-3.5">
          <p className="label-mono flex items-center gap-2 text-foreground">
            <span className="live-dot text-accent">●</span> Open to work
          </p>
          <span
            className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase"
            aria-label="Local time in Pakistan"
          >
            <LocalTime />
          </span>
        </div>
      </div>

      <div className="mt-12 lg:mt-8">
        <SocialLinks />
        <p className="mt-5 hidden font-mono text-[10px] tracking-[0.18em] text-muted-foreground/70 uppercase lg:block">
          Remote · Worldwide · <span className="text-accent/80">Pakistan</span>
        </p>
      </div>
    </header>
  );
}
