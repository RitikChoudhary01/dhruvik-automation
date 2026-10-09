"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { nav, sectionToNav, site } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefix = isHome ? "" : "/";

  useEffect(() => {
    if (!isHome) return;
    const elements = Object.keys(sectionToNav)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(sectionToNav[entry.target.id]);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = isHome ? active : pathname.startsWith("/projects") ? "projects" : "";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          href={`${prefix}#top`}
          className="flex items-center gap-3 text-[0.95rem] font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo_tight.png"
            alt={`${site.brand} Logo`}
            width={120}
            height={42}
            className="h-9 md:h-[40px] w-auto object-contain mix-blend-lighten"
            priority
          />
          {site.brand}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={`${prefix}${item.href}`}
              aria-current={current === item.id ? "location" : undefined}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                current === item.id ? "text-bone" : "text-mute hover:text-bone"
              }`}
            >
              <span
                className={`border-b pb-1 ${current === item.id ? "border-signal" : "border-transparent"}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
          <Link href={`${prefix}#contact`} className="btn btn-primary ml-3 !min-h-10 !px-4 !py-2 !text-sm">
            {"Let's Talk"}
          </Link>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="grid size-10 place-items-center rounded-md border border-line-strong md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-ink md:hidden">
          <ul className="wrap flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={`${prefix}${item.href}`}
                  onClick={() => setOpen(false)}
                  aria-current={current === item.id ? "location" : undefined}
                  className={`block rounded-md px-2 py-3 text-base ${
                    current === item.id ? "text-signal" : "text-bone"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={`${prefix}#contact`}
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                {"Let's Talk"}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
