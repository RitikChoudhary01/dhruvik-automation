import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#171717",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.person} | AI Automation Developer, n8n and WhatsApp AI Agents`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "AI automation developer",
    "n8n automation developer",
    "AI workflow automation",
    "WhatsApp AI chatbot",
    "AI agent development",
    "business process automation",
    "lead automation",
  ],
  authors: [{ name: site.person, url: site.github }],
  creator: site.person,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.brand}: AI automation for leads, enquiries and operations`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand}: AI automation for leads, enquiries and operations`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.person,
  jobTitle: site.title,
  url: site.url,
  email: site.email,
  sameAs: [site.github, site.linkedin],
  worksFor: { "@type": "Organization", name: site.brand },
  knowsAbout: ["n8n", "AI agents", "Workflow automation", "WhatsApp automation", "Python", "FastAPI"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
