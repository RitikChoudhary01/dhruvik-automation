export const site = {
  brand: "Dhruvik Automation",
  person: "Ritik Choudhary",
  title: "AI Automation Developer",
  email: "choudharyritik145@gmail.com",
  clientEmail: "dhruvikautomation@outlook.com",
  github: "https://github.com/RitikChoudhary01",
  linkedin: "https://www.linkedin.com/in/ritikchoudhari/",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dhruvik-automation.vercel.app",
  tagline: "AI agents and automated workflows for lead handling, customer enquiries and repetitive operations.",
  description:
    "Ritik Choudhary is an AI automation developer. He builds n8n workflows, WhatsApp AI receptionists, lead automation and AI agents that help businesses respond faster and cut repetitive work.",
} as const;

export const nav = [
  { id: "home", label: "Home", href: "#top" },
  { id: "services", label: "Services", href: "#services" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

/** Maps each on-page section id to the nav item that should read as active while it is in view. */
export const sectionToNav: Record<string, string> = {
  top: "home",
  capabilities: "home",
  services: "services",
  projects: "projects",
  process: "about",
  approach: "about",
  about: "about",
  contact: "contact",
};
