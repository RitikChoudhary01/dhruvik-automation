export type Scenario = "free" | "taken";

export type TraceStage = {
  id: string;
  title: string;
  caption: string;
  payload: Record<string, unknown>;
  outcome?: { tone: "ok" | "warn"; text: string };
};

const shared: TraceStage[] = [
  {
    id: "inbound",
    title: "Message arrives",
    caption: "The messaging platform sends the customer's message to a webhook.",
    payload: {
      channel: "whatsapp",
      from: "+91 XXXXX XXX10",
      message_id: "wamid.sample-001",
      text: "Can I book a cleaning for Thursday afternoon?",
    },
  },
  {
    id: "normalise",
    title: "Clean and de-duplicate",
    caption: "Reshape the payload. If this message ID was already processed, stop here.",
    payload: {
      message_id: "wamid.sample-001",
      phone_e164: "+91XXXXXXXXX10",
      text: "can i book a cleaning for thursday afternoon?",
      seen_before: false,
    },
    outcome: { tone: "ok", text: "New message. Continue." },
  },
  {
    id: "agent",
    title: "AI agent reads intent",
    caption: "The model returns a structured result. It does not book anything itself.",
    payload: {
      intent: "book_appointment",
      requested: { service: "cleaning", day: "Thursday", window: "afternoon" },
      needs_human: false,
    },
  },
  {
    id: "availability",
    title: "Check availability",
    caption: "Plain workflow logic validates the fields and looks for an open slot.",
    payload: {
      fields_valid: true,
      within_business_hours: true,
      candidate_slot: "Thu 15:00",
      looks_free: true,
    },
    outcome: { tone: "ok", text: "Slot looks free at read time." },
  },
];

const free: TraceStage[] = [
  ...shared,
  {
    id: "write",
    title: "Write the booking",
    caption: "The insert succeeds because the slot is still unique in the database.",
    payload: {
      table: "appointments",
      insert: { slot: "Thu 15:00", service: "cleaning", status: "confirmed" },
      conversation_state: "booked",
    },
    outcome: { tone: "ok", text: "One row written." },
  },
  {
    id: "notify",
    title: "Reply and alert staff",
    caption: "Confirm to the customer and tell the team.",
    payload: {
      reply_to_customer: "You're booked for Thursday at 3:00 pm.",
      staff_alert: "New booking: cleaning, Thu 15:00",
    },
  },
];

const taken: TraceStage[] = [
  ...shared,
  {
    id: "write",
    title: "Write the booking",
    caption: "Another customer booked the same slot a moment earlier. The database rejects the insert.",
    payload: {
      table: "appointments",
      insert: "rejected: unique (resource, slot) already exists",
      conversation_state: "offering_alternatives",
    },
    outcome: { tone: "warn", text: "No row written. No double booking." },
  },
  {
    id: "notify",
    title: "Reply with alternatives",
    caption: "Offer the next open slots instead of failing silently.",
    payload: {
      reply_to_customer: "Thursday at 3:00 pm was just taken. I can do 4:30 pm, or Friday at 10:00 am.",
      staff_alert: null,
    },
  },
];

export function traceFor(scenario: Scenario): TraceStage[] {
  return scenario === "free" ? free : taken;
}
