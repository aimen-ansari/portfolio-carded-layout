// import tryonnex from "@/assets/project-tryonnex.jpg";
import rion from "@/assets/project-rion.jpg";
import modernCo from "@/assets/project-modern-co-hero.jpg";
import stahltechBusiness from "@/assets/project-stahltech-business.png";
import stahltechLeather from "@/assets/project-stahltech-leather.png";
import celestia from "@/assets/project-celestia.png";
import aqayyum from "@/assets/project-aqayyum.png";
import aimenPortfolio from "@/assets/project-aimen-portfolio.png";
import aimenPrevious from "@/assets/project-aimen-previous.png";

export type ProjectFilter = "Full Stack" | "Business" | "SaaS" | "AI" | "Frontend";

export type Project = {
  slug: string;
  name: string;
  category: string;
  short: string;
  stack: string[];
  image: string;
  live: string;
  filters: ProjectFilter[];
  needs: string[];
  featured?: boolean;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  roleTitle?: string;
  role: string;
  responsibilities?: string[];
  lifecycle?: string[];
  outcome: string;
};

export const projects: Project[] = [
  /* Tryonnex is temporarily hidden. Remove this comment wrapper to restore it.
  {
    slug: "tryonnex",
    name: "Tryonnex — AI Virtual Try-On Platform",
    category: "AI / Computer Vision · Full-Stack · Project Management",
    short:
      "AI-powered virtual try-on platform combining full-stack development, computer vision, and deep learning to let users preview garments digitally. I led the project as Project Manager and Software Engineer.",
    stack: ["Next.js", "Python", "PyTorch", "OpenCV", "Supabase", "Cloudinary"],
    image: tryonnex,
    live: "https://fyp-naini.vercel.app/",
    filters: ["AI", "Full Stack", "SaaS"],
    needs: ["ai", "saas", "ecommerce"],
    featured: true,
    overview:
      "Tryonnex is an AI-powered virtual try-on platform that combines a full-stack product experience with computer vision and deep learning so users can preview garments digitally.",
    problem:
      "Online apparel shoppers cannot confidently judge how a garment may look from static product images alone, creating uncertainty during the buying decision.",
    solution:
      "A complete virtual try-on workflow that connects the user-facing application, backend services, image handling, and AI generation pipeline in one product experience.",
    features: [
      "User photo and garment image workflow",
      "AI-powered virtual garment preview",
      "Computer-vision and deep-learning integration",
      "Full-stack application and data flow",
      "Testing, deployment, and final delivery",
    ],
    roleTitle: "Project Manager · Software Engineer · Full-Stack / AI Project",
    role: "Led Tryonnex from planning to deployment, managing requirements, project documentation, task coordination, system design, development activities, testing, AI integration, and final delivery. Also contributed directly to the software engineering and full-stack implementation of the AI-powered virtual try-on platform.",
    responsibilities: [
      "Project Planning",
      "Requirements",
      "Team Coordination",
      "System Design",
      "Development",
      "Testing",
      "Documentation",
      "AI Integration",
      "Deployment",
    ],
    lifecycle: ["Planning", "Design", "Development", "Testing", "Deployment"],
    outcome:
      "Delivered the project across its complete lifecycle, from requirements and architecture through implementation, AI integration, testing, deployment, and final handover.",
  },
  */
  {
    slug: "rion-apparels",
    name: "Rion Apparels — E-Commerce Website with Admin Panel",
    category: "E-Commerce · Admin Panel · Full-Stack",
    short:
      "Full-stack e-commerce platform with a customer storefront and secure admin panel for managing products, categories, inventory, orders, customers, and website content.",
    stack: ["React.js", "Next.js", "TanStack", "Supabase"],
    image: rion,
    live: "https://rionapparels.site/",
    filters: ["Full Stack", "Business", "SaaS"],
    needs: ["ecommerce", "business", "internal"],
    featured: true,
    overview:
      "Rion Apparels is a full-stack commerce platform that combines a responsive customer shopping experience with an authenticated administrative management system.",
    problem:
      "The brand needed one reliable system for presenting products to customers while giving its team direct control over catalogue data, stock, orders, customers, and site content.",
    solution:
      "A customer-facing storefront and secure admin panel backed by Supabase, with connected product, category, inventory, customer, and order-management workflows.",
    features: [
      "Responsive product browsing and product-detail experiences",
      "Categories, cart, and checkout flows",
      "Admin product and website-content management",
      "Order, customer, and inventory management",
      "Authentication and Supabase-backed data management",
    ],
    role: "Full-stack software engineering across the storefront, administrative workflows, authentication, application data, and responsive interface implementation.",
    outcome:
      "Created a unified commerce system for both the public shopping journey and the internal day-to-day management of the online store.",
  },
  {
    slug: "modern-co-exports",
    name: "Modern Co Exports",
    category: "Business Website · Export",
    short:
      "Modern responsive business website developed for an export and manufacturing company, focused on product presentation, brand credibility, and customer inquiries.",
    stack: ["React", "Tailwind CSS", "EmailJS", "Netlify"],
    image: modernCo,
    live: "https://moderncoexports.com/",
    filters: ["Business", "Frontend"],
    needs: ["business", "professional"],
    featured: true,
    overview:
      "A modern digital presence for an export and manufacturing business, designed to present its products, craftsmanship, heritage, and international capabilities clearly.",
    problem:
      "The company needed a credible online presentation that could communicate product quality and make it easier for prospective international customers to inquire.",
    solution:
      "A responsive React website with structured product storytelling, clear business information, search-friendly metadata, and an accessible inquiry path.",
    features: [
      "Responsive company and product presentation",
      "Manufacturing and export capability content",
      "Customer inquiry integration",
      "Search-friendly page metadata",
      "Mobile-first navigation and layouts",
    ],
    role: "Frontend development, responsive implementation, content structure, and deployment.",
    outcome:
      "Established a stronger digital presence that supports brand credibility, product discovery, and customer inquiries.",
  },
  {
    slug: "stahltech",
    name: "StahlTech",
    category: "Business Website · B2B",
    short:
      "Professional business platform showcasing company products and services through a clean, responsive, conversion-focused interface.",
    stack: ["WordPress", "WooCommerce", "Elementor", "Bootstrap"],
    image: stahltechBusiness,
    live: "https://stahltech.biz/",
    filters: ["Business"],
    needs: ["business", "professional", "ecommerce"],
    overview:
      "A professional B2B website for a surgical-instrument manufacturer and exporter, structured around product discovery, company credibility, and direct inquiries.",
    problem:
      "Prospective buyers needed a clear way to understand the company, browse its product categories, and make contact from any device.",
    solution:
      "A responsive WordPress and WooCommerce platform with structured catalogue pages, company information, and conversion-focused contact paths.",
    features: [
      "Structured surgical-instrument catalogue",
      "Product and category browsing",
      "Responsive company and service pages",
      "B2B contact and inquiry paths",
      "Content management through WordPress",
    ],
    role: "Website implementation, product-content structure, responsive presentation, and deployment.",
    outcome:
      "Gave the business a professional platform for presenting its manufacturing catalogue to international buyers.",
  },
  {
    slug: "stahltech-leather",
    name: "StahlTech Leather",
    category: "B2B Catalogue · Business Platform",
    short:
      "B2B leather manufacturing website with structured product categories, catalogue presentation, responsive UI, and inquiry-focused workflows.",
    stack: ["React", "Tailwind CSS", "Supabase", "Vercel"],
    image: stahltechLeather,
    live: "https://www.stahltechleather.biz/",
    filters: ["Business", "Full Stack"],
    needs: ["business", "professional", "ecommerce"],
    overview:
      "A product-focused business platform presenting StahlTech Leather's catalogue and craftsmanship through a polished, responsive interface.",
    problem:
      "The business needed an organized online catalogue that could communicate product quality while guiding visitors toward custom orders and inquiries.",
    solution:
      "A responsive React platform with structured collections, product presentation, business content, contact paths, and Supabase-backed services.",
    features: [
      "Structured collections and product categories",
      "Responsive catalogue presentation",
      "Product and craftsmanship content",
      "Custom-order and inquiry workflows",
      "Supabase-backed application services",
    ],
    role: "Full-stack implementation, responsive interface development, data integration, and deployment.",
    outcome:
      "Created a focused digital catalogue that supports product discovery, custom requests, and direct customer inquiries.",
  },
  {
    slug: "celestia-events",
    name: "Celestia Events",
    category: "Event Platform · Frontend",
    short:
      "Modern event-focused web experience featuring responsive layouts, polished visual presentation, and interactive frontend experiences.",
    stack: ["React", "Tailwind CSS", "Supabase", "Vercel"],
    image: celestia,
    live: "https://celestia-events.vercel.app/",
    filters: ["Frontend"],
    needs: ["business", "custom"],
    overview:
      "Celestia Events is a polished venue-discovery experience for exploring hotels, restaurants, cafés, halls, and event spaces.",
    problem:
      "Users need a visually clear and responsive way to discover potential venues without navigating fragmented listings and inconsistent presentation.",
    solution:
      "An interactive React interface with responsive venue discovery, search-oriented navigation, polished content presentation, and Supabase integration.",
    features: [
      "Venue discovery and search experience",
      "Responsive event-focused layouts",
      "Venue category presentation",
      "Interactive frontend states",
      "Supabase-backed application data",
    ],
    role: "Frontend development, responsive interaction design, data integration, and deployment.",
    outcome:
      "Delivered a cohesive event-platform concept that makes venue discovery visual, approachable, and responsive.",
  },
  {
    slug: "aqayyum-lone",
    name: "Aqayyum Lone",
    category: "Personal Brand · Web Development",
    short:
      "Professional personal-brand website designed to present profile information, expertise, and content through a clean responsive experience.",
    stack: ["React", "Tailwind CSS", "Netlify"],
    image: aqayyum,
    live: "https://aqayyumlone.netlify.app/",
    filters: ["Business", "Frontend"],
    needs: ["professional", "business"],
    overview:
      "A responsive personal-brand website for pianist, composer, and music director A. Qayyum Lone, bringing professional information and creative work into one experience.",
    problem:
      "The artist needed a central digital presence for presenting his profile, expertise, career experience, certifications, and creative portfolio.",
    solution:
      "A structured React website with a clear professional narrative, responsive navigation, content sections, gallery access, and direct contact paths.",
    features: [
      "Professional profile and biography",
      "Skills, experience, and certification sections",
      "Creative-work gallery",
      "Responsive navigation and layouts",
      "Direct contact options",
    ],
    role: "Frontend development, responsive implementation, content structure, and deployment.",
    outcome:
      "Created a clear personal-brand destination for presenting the artist's work and professional identity.",
  },
  {
    slug: "aimen-ansari-portfolio",
    name: "Aimen Ansari Portfolio",
    category: "Portfolio · Software Engineering",
    short:
      "Personal developer portfolio showcasing software engineering, full-stack development, projects, technical expertise, and professional services.",
    stack: ["React", "Tailwind CSS", "GSAP", "Three.js"],
    image: aimenPortfolio,
    live: "https://aimenansari.site/",
    filters: ["Frontend"],
    needs: ["professional", "custom"],
    overview:
      "A personal developer portfolio presenting software-engineering capabilities, selected projects, technical expertise, and professional services.",
    problem:
      "A broad full-stack and software-engineering profile needed a distinctive online presentation that remained clear, responsive, and easy to explore.",
    solution:
      "A React portfolio combining structured professional content with motion and 3D-enhanced visual presentation while maintaining responsive navigation.",
    features: [
      "Software-engineering and service presentation",
      "Selected project showcase",
      "Responsive professional profile",
      "GSAP motion and Three.js presentation",
      "Contact and collaboration paths",
    ],
    role: "Portfolio strategy, design implementation, frontend engineering, motion, and deployment.",
    outcome:
      "Built a recognizable professional presence that communicates technical range and makes project work easy to explore.",
  },
  {
    slug: "software-engineer-portfolio-previous",
    name: "Software Engineer Portfolio — Previous Version",
    category: "Portfolio · Frontend",
    short:
      "Earlier software engineering portfolio demonstrating frontend development, project presentation, and personal branding.",
    stack: ["React", "Tailwind CSS", "Netlify"],
    image: aimenPrevious,
    live: "https://aimen-software-engineer.netlify.app/",
    filters: ["Frontend"],
    needs: ["professional", "custom"],
    overview:
      "An earlier version of the software-engineering portfolio, focused on presenting frontend work, technical interests, project experience, and personal branding.",
    problem:
      "The portfolio needed to organize a growing set of skills and projects into a responsive, approachable professional profile.",
    solution:
      "A React-based single-page portfolio with clear section navigation, project presentation, technical content, and contact information.",
    features: [
      "Responsive personal introduction",
      "Skills and project presentation",
      "Experience and profile sections",
      "Single-page section navigation",
      "Contact and collaboration information",
    ],
    role: "Content strategy, frontend development, responsive implementation, and deployment.",
    outcome:
      "Established an earlier professional presence and a foundation for the portfolio's later evolution.",
  },
];

export const getProject = (slug: string | null) =>
  projects.find((project) => project.slug === slug) ?? null;
