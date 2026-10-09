import Link from "next/link";

const rows = [
  {
    name: "Workflow orchestration",
    what: "Multi-step n8n workflows with branching, validation and error paths.",
    tools: "n8n",
    proof: [
      { label: "WhatsApp receptionist", href: "/projects/whatsapp-ai-receptionist" },
      { label: "Lead management", href: "/projects/lead-management-revenue-recovery" },
    ],
  },
  {
    name: "API integrations",
    what: "Connecting business tools through REST APIs, Google Calendar, Gmail and Google Sheets.",
    tools: "REST APIs, Google APIs",
    proof: [{ label: "WhatsApp receptionist", href: "/projects/whatsapp-ai-receptionist" }],
  },
  {
    name: "AI agents",
    what: "Language models that return structured results and work inside rules the workflow controls.",
    tools: "OpenAI, Gemini and Groq APIs",
    proof: [
      { label: "WhatsApp receptionist", href: "/projects/whatsapp-ai-receptionist" },
      { label: "Invoice parser, for structured model output", href: "/projects/ai-invoice-parser" },
    ],
  },
  {
    name: "Webhooks",
    what: "Receiving events from forms, ads and messaging platforms, then cleaning and de-duplicating them.",
    tools: "n8n webhooks, FastAPI",
    proof: [{ label: "Lead management", href: "/projects/lead-management-revenue-recovery" }],
  },
  {
    name: "Structured data processing",
    what: "Turning messy text into validated JSON with schemas, so downstream systems get clean data.",
    tools: "Python, Pydantic",
    proof: [{ label: "Invoice parser, public code", href: "/projects/ai-invoice-parser" }],
  },
  {
    name: "Database integration",
    what: "Storing leads, conversations and bookings in a database that other tools read.",
    tools: "Supabase, PostgreSQL",
    proof: [{ label: "WhatsApp receptionist", href: "/projects/whatsapp-ai-receptionist" }],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="h2">What the work is built on</h2>
          <p className="prose-tight mt-4">
            Each capability below links to a project where you can see it used. I also work with Docker, Git and
            GitHub, and have built retrieval pipelines with ChromaDB and Streamlit.
          </p>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {rows.map((r) => (
            <li key={r.name} className="grid gap-2 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
              <h3 className="font-medium">{r.name}</h3>
              <div>
                <p className="text-mute">{r.what}</p>
                <p className="mt-2 text-sm">
                  <span className="text-mute">Tools: </span>
                  {r.tools}
                </p>
                <p className="mt-1 text-sm text-mute">
                  See it in:{" "}
                  {r.proof.map((p, i) => (
                    <span key={p.href}>
                      {i > 0 ? ", " : ""}
                      <Link href={p.href} className="link">
                        {p.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
