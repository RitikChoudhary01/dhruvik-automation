import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

import { Nav } from "@/components/Nav";

describe("Nav", () => {
  beforeEach(() => {
    pathname.value = "/";
  });

  it("links to in-page sections on the home page", () => {
    render(<Nav />);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(primary.querySelector('a[href="#services"]')).not.toBeNull();
    expect(primary.querySelector('a[href="#contact"]')).not.toBeNull();
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
  });

  it("links back to home sections from a project page and marks Projects as current", () => {
    pathname.value = "/projects/ai-invoice-parser";
    render(<Nav />);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(primary.querySelector('a[href="/#services"]')).not.toBeNull();
    expect(primary.querySelector('a[aria-current="location"]')).toHaveTextContent("Projects");
  });

  it("opens and closes the mobile menu with the button and the Escape key", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();

    await user.click(button);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("closes the mobile menu after choosing a link", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const mobile = screen.getByRole("navigation", { name: "Mobile" });
    await user.click(mobile.querySelector('a[href="#projects"]') as HTMLElement);
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });
});
