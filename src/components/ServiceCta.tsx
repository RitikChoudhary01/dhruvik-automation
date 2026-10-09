"use client";

import type { ReactNode } from "react";

/** Preselects the service in the contact form, then lets the anchor scroll to it. */
export function ServiceCta({
  service,
  className,
  children,
}: {
  service: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("dhruvik:service", { detail: service }))}
    >
      {children}
    </a>
  );
}
