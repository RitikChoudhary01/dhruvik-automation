import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { validateContact, type ContactInput } from "@/lib/validation";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort limiter. On serverless platforms each instance has its own memory,
// so this slows casual abuse but is not a hard guarantee.
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

type Delivery = "sent" | "not_configured" | "failed";

async function deliver(data: ContactInput): Promise<Delivery> {
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Type of automation: ${data.service}`,
    `Budget: ${data.budget || "not given"}`,
    "",
    data.message,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  try {
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
          to: [process.env.CONTACT_TO_EMAIL ?? site.email],
          reply_to: data.email,
          subject: oneLine(`Portfolio inquiry: ${data.service} from ${data.name}`),
          text,
        }),
        signal: AbortSignal.timeout(8000),
      });
      return res.ok ? "sent" : "failed";
    }

    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          service: data.service,
          budget: data.budget,
          message: data.message,
          receivedAt: new Date().toISOString(),
          source: "portfolio-contact-form",
        }),
        signal: AbortSignal.timeout(8000),
      });
      return res.ok ? "sent" : "failed";
    }
  } catch {
    return "failed";
  }

  return "not_configured";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json", message: "The request body was not valid JSON." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "invalid_body", message: "The request body must be an object." }, { status: 400 });
  }

  const result = validateContact(body as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json({ error: "validation", fieldErrors: result.errors }, { status: 422 });
  }

  // Honeypot filled: a bot. Pretend success so it does not retry, and send nothing.
  if (result.data.website) return NextResponse.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many messages from this connection. Try again in a few minutes." },
      { status: 429 },
    );
  }

  const outcome = await deliver(result.data);
  if (outcome === "sent") return NextResponse.json({ ok: true });
  if (outcome === "not_configured") {
    return NextResponse.json(
      { error: "not_configured", message: "Form delivery is not configured on this deployment." },
      { status: 503 },
    );
  }
  return NextResponse.json(
    { error: "delivery_failed", message: "The message could not be delivered. Try again, or use the email button." },
    { status: 502 },
  );
}
