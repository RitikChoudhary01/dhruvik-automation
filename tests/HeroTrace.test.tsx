import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HeroTrace } from "@/components/HeroTrace";

describe("HeroTrace", () => {
  it("starts on the first stage and says the run is illustrative", () => {
    render(<HeroTrace />);
    expect(screen.getByRole("heading", { name: "Message arrives" })).toBeInTheDocument();
    expect(screen.getByText(/Illustrative run with sample data/)).toBeInTheDocument();
  });

  it("advances on its own and stops when the visitor pauses", async () => {
    vi.useFakeTimers();
    render(<HeroTrace />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2700);
    });
    expect(screen.getByRole("heading", { name: "Clean and de-duplicate" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Pause animation" }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10000);
    });
    expect(screen.getByRole("heading", { name: "Clean and de-duplicate" })).toBeInTheDocument();
  });

  it("jumps to a stage on click and pauses", async () => {
    const user = userEvent.setup();
    render(<HeroTrace />);
    await user.click(screen.getByRole("button", { name: "Write the booking" }));
    expect(screen.getByRole("heading", { name: "Write the booking" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play animation" })).toBeInTheDocument();
    expect(screen.getByText("One row written.")).toBeInTheDocument();
  });

  it("shows a rejected insert and alternatives in the 'slot just taken' scenario", async () => {
    const user = userEvent.setup();
    render(<HeroTrace />);
    await user.click(screen.getByRole("button", { name: "Slot just taken" }));
    expect(screen.getByRole("button", { name: "Slot just taken" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Write the booking" }));
    expect(screen.getByText("No row written. No double booking.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reply with alternatives" }));
    expect(screen.getByText(/4:30 pm/)).toBeInTheDocument();
  });
});
