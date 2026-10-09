import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/ContactForm";

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Asha Rao");
  await user.type(screen.getByLabelText("Business email"), "asha@clinic.example");
  await user.type(screen.getByLabelText("Company or business name"), "Rao Dental");
  await user.selectOptions(screen.getByLabelText("Type of automation needed"), "WhatsApp AI receptionist");
  await user.type(
    screen.getByLabelText("What is the current problem?"),
    "We answer every WhatsApp enquiry by hand and miss many after hours.",
  );
}

describe("ContactForm", () => {
  it("shows field errors, marks fields invalid and moves focus to the first one", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, "fetch");
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send project inquiry" }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Name")).toHaveFocus();
    expect(screen.getByText("Enter your business email.")).toBeInTheDocument();
    expect(screen.getByText("Choose the type of automation you need.")).toBeInTheDocument();
  });

  it("clears an error once the visitor fixes the field", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Send project inquiry" }));
    expect(screen.getByText("Enter your business email.")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Business email"), "a@b.co");
    expect(screen.queryByText("Enter your business email.")).not.toBeInTheDocument();
  });

  it("posts valid data and shows a confirmation on success", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send project inquiry" }));

    await waitFor(() => expect(screen.getByText("Message sent")).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse((init as RequestInit).body as string)).toMatchObject({
      name: "Asha Rao",
      email: "asha@clinic.example",
      service: "WhatsApp AI receptionist",
    });
  });

  it("never claims success when delivery is not configured, and offers a prefilled email", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "not_configured" }), { status: 503 }),
    );
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send project inquiry" }));

    await waitFor(() => expect(screen.getByText("This message was not sent.")).toBeInTheDocument());
    expect(screen.queryByText("Message sent")).not.toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Send by email instead" });
    expect(link.getAttribute("href")).toContain("mailto:choudharyritik145@gmail.com");
    expect(decodeURIComponent(link.getAttribute("href") ?? "")).toContain("Rao Dental");
    // The visitor's text is kept.
    expect(screen.getByLabelText("Name")).toHaveValue("Asha Rao");
  });

  it("shows an error with a fallback when the network fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("offline"));
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send project inquiry" }));
    await waitFor(() => expect(screen.getByText("Could not send your message.")).toBeInTheDocument());
    expect(screen.getByRole("link", { name: "Send by email instead" })).toBeInTheDocument();
  });

  it("preselects the service when a service button fires the prefill event", async () => {
    const { act } = await import("react");
    render(<ContactForm />);
    await act(async () => {
      window.dispatchEvent(new CustomEvent("dhruvik:service", { detail: "Lead capture and follow-up" }));
    });
    await waitFor(() => expect(screen.getByLabelText("Type of automation needed")).toHaveValue("Lead capture and follow-up"));
  });
});
