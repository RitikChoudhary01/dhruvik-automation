import Link from "next/link";

const principles = [
  {
    name: "API and webhook integration",
    text: "Each integration has a defined input and output, and the workflow never assumes an external service will respond.",
  },
  {
    name: "Input validation",
    text: "Check required fields and types at the entry point, before any other step runs.",
    see: true,
  },
  {
    name: "Structured outputs",
    text: "Ask the model for JSON that matches a schema, then validate it before anything depends on it.",
    see: true,
  },
  {
    name: "Database persistence",
    text: "Keep conversation and lead state in a database so a restart or a parallel run does not lose context.",
  },
  {
    name: "Duplicate prevention",
    text: "Webhooks are redelivered. Message and lead IDs make repeats harmless, and unique rules stop conflicting bookings.",
  },
  {
    name: "Error handling",
    text: "Every branch has a defined failure path: reject with a reason, retry, or hand over. Nothing fails silently.",
    see: true,
  },
  {
    name: "Retry logic",
    text: "Retry temporary failures a limited number of times, and never repeat an action that already succeeded.",
  },
  {
    name: "Logging and monitoring",
    text: "Record each run's input, decision and outcome so a problem can be traced afterwards.",
  },
  {
    name: "Human-in-the-loop escalation",
    text: "When the assistant is unsure, or the topic is sensitive, a person takes over.",
  },
  {
    name: "Credential security",
    text: "Keys live in n8n credentials or environment variables, never in workflow text, repositories or frontend code.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="h2">How I keep automations reliable</h2>
          <p className="prose-tight mt-4">
            An automation that works on the happy path is easy. These are the practices I design around so it also
            behaves when something goes wrong.
          </p>
          <p className="mt-8 text-sm text-mute">
            Example from public code. The invoice parser validates the model&apos;s reply against a schema before
            returning it:
          </p>
          <pre className="json mt-3" tabIndex={0} aria-label="Code excerpt from ai-invoice-parser main.py">
            <code>{`class LineItem(BaseModel):
    description: str
    amount: float

class InvoiceData(BaseModel):
    vendor_name: str
    invoice_number: str
    date_issued: str
    total_amount: float
    currency: str
    items: list[LineItem]

parsed_json = json.loads(cleaned_response)
validated_data = InvoiceData(**parsed_json)`}</code>
          </pre>
          <p className="mt-3 text-xs text-mute">
            Excerpt from{" "}
            <Link href="/projects/ai-invoice-parser" className="link">
              ai-invoice-parser
            </Link>
            , with the field descriptions trimmed.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {principles.map((p) => (
            <li key={p.name} className="py-5">
              <h3 className="font-medium">{p.name}</h3>
              <p className="mt-1.5 text-mute">{p.text}</p>
              {p.see ? (
                <p className="mt-1.5 text-sm text-mute">
                  Visible in the{" "}
                  <Link href="/projects/ai-invoice-parser" className="link">
                    invoice parser code
                  </Link>
                  .
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
