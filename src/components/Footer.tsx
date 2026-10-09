import Link from "next/link";
import { nav, site } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="font-semibold tracking-tight">{site.brand}</p>
          <p className="mt-3 max-w-xs text-sm text-mute">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-medium">Pages</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.id}>
                <Link href={n.href} className="text-mute transition-colors hover:text-bone">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-medium">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={site.github} className="text-mute transition-colors hover:text-bone" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.linkedin} className="text-mute transition-colors hover:text-bone" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all text-mute transition-colors hover:text-bone">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-5 text-xs text-mute">
          &copy; <CurrentYear /> {site.brand}. Projects are labelled as prototypes, working code or designs. No client
          results are claimed.
        </p>
      </div>
    </footer>
  );
}
