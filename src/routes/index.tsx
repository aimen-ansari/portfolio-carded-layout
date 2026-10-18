import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { Navbar } from "@/components/site/Navbar";
import { PointerSpotlight } from "@/components/site/PointerSpotlight";
import { PortfolioContent } from "@/components/site/PortfolioContent";
import { Preloader } from "@/components/site/Preloader";
import { ProjectModal } from "@/components/site/ProjectModal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { getProject } from "@/data/projects";

const title = "Aimen Ansari — Full-Stack Developer & Product Engineer";
const description =
  "Full-stack developer building business websites, e-commerce platforms, SaaS products and AI-powered applications — shipped, live and client-ready.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aimen Ansari",
          jobTitle: "Full-Stack Developer",
          description,
          knowsAbout: ["Full-Stack Development", "E-Commerce", "SaaS", "AI Integration"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("project");
    if (initial && getProject(initial)) setSlug(initial);
  }, []);

  const open = useCallback((next: string) => {
    setSlug(next);
    const url = new URL(window.location.href);
    url.searchParams.set("project", next);
    window.history.replaceState(null, "", url.toString());
  }, []);

  const close = useCallback(() => {
    setSlug(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState(null, "", url.toString());
  }, []);

  return (
    <div id="top" className="site-shell relative min-h-screen bg-background text-foreground">
      <Preloader />
      <ScrollProgress />
      <a
        href="#content"
        className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="site-grid" aria-hidden="true" />
      <PointerSpotlight />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-12 lg:flex lg:justify-between lg:gap-16 xl:gap-24">
        <Navbar />
        <PortfolioContent onOpen={open} />
      </div>
      <ProjectModal project={getProject(slug)} onClose={close} onNavigate={open} />
      <div className="site-noise" aria-hidden="true" />
    </div>
  );
}
