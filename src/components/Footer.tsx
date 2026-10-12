import Link from "next/link";
import { nav, site } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="bg-[#171717] text-[#F5EBDD] border-t border-[#393939] py-14 sm:py-16">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Brand & Positioning */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-[#F5EBDD]">
              <span className="size-2 bg-[#FF6B35]" />
              <span>{site.brand}</span>
            </div>
            <p className="max-w-sm text-xs sm:text-sm text-[#B6B1A9] leading-relaxed">
              We engineer practical automation systems that help businesses respond to enquiries, manage leads, and eliminate repetitive work.
            </p>
            <div className="pt-2 font-mono text-xs text-[#B6B1A9]">
              <span>Ritik Choudhary · AI Automation Developer</span>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer Navigation">
            <p className="font-mono text-xs uppercase tracking-widest text-[#FF6B35] font-semibold">
              NAVIGATION
            </p>
            <ul className="mt-4 space-y-2.5 font-mono text-xs text-[#B6B1A9]">
              {nav.map((n) => (
                <li key={n.id}>
                  <Link href={n.href} className="hover:text-[#F5EBDD] transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Direct Channels */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#FF6B35] font-semibold">
              CHANNELS
            </p>
            <ul className="mt-4 space-y-2.5 font-mono text-xs text-[#B6B1A9]">
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5EBDD] transition-colors">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5EBDD] transition-colors">
                  WhatsApp: +91 72609 21049 ↗
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5EBDD] transition-colors">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5EBDD] transition-colors">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5EBDD] transition-colors">
                  Facebook ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${site.workEmail}`} className="hover:text-[#F5EBDD] transition-colors">
                  Work: {site.workEmail}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.personalEmail}`} className="hover:text-[#F5EBDD] transition-colors">
                  Personal: {site.personalEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#393939] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#B6B1A9]">
          <p>
            &copy; <CurrentYear /> {site.brand}. Founded by {site.person}.
          </p>
          <p className="text-[#B6B1A9]/80">
            Engineered with Next.js, n8n &amp; Python.
          </p>
        </div>
      </div>
    </footer>
  );
}
