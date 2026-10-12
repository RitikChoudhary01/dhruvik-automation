"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, sectionToNav, site } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefix = isHome ? "" : "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      { rootMargin: "-35% 0px -55% 0px" },
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#171717]/95 border-b border-[#393939] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-[#171717] border-b border-[#393939]/60"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href={`${prefix}#top`}
          className="group flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight font-display text-[#F5EBDD] transition-colors hover:text-white"
          onClick={() => setOpen(false)}
        >
          <span className="size-2 flex-none bg-[#FF6B35] transition-transform duration-200 group-hover:scale-125" />
          <span>{site.brand}</span>
        </Link>

        {/* Primary Desktop Nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const isCurrent = current === item.id;
              return (
                <li key={item.id} className="relative">
                  <Link
                    href={`${prefix}${item.href}`}
                    aria-current={isCurrent ? "location" : undefined}
                    className={`font-mono text-xs uppercase tracking-widest transition-colors py-2 ${
                      isCurrent
                        ? "text-[#F5EBDD] font-semibold"
                        : "text-[#B6B1A9] hover:text-[#F5EBDD]"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isCurrent && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF6B35]"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <Link
            href={`${prefix}#contact`}
            className="btn btn-primary !min-h-9 !px-4 !py-1.5 font-mono text-xs uppercase tracking-wider rounded-none font-semibold hover:bg-[#E85B27] transition-all"
          >
            {"Let's Talk"}
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          ref={buttonRef}
          type="button"
          className="grid size-9 place-items-center border border-[#393939] bg-[#242424] text-[#F5EBDD] md:hidden hover:border-[#FF6B35] transition-colors"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4.5" aria-hidden /> : <Menu className="size-4.5" aria-hidden />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-b border-[#393939] bg-[#171717] px-4 py-6 md:hidden shadow-2xl animate-fade-in"
        >
          <ul className="flex flex-col space-y-4">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={`${prefix}${item.href}`}
                  onClick={() => setOpen(false)}
                  aria-current={current === item.id ? "location" : undefined}
                  className={`block font-mono text-sm uppercase tracking-wider transition-colors py-1 ${
                    current === item.id ? "text-[#FF6B35] font-semibold" : "text-[#B6B1A9] hover:text-[#F5EBDD]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-[#393939]">
              <Link
                href={`${prefix}#contact`}
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full !min-h-11 font-mono text-xs uppercase tracking-wider rounded-none"
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
