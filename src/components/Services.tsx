import { ServiceCta } from "./ServiceCta";

const primary = [
  {
    name: "AI Workflow Automation",
    service: "AI workflow automation",
    icon: "⚙",
    problem:
      "Staff copy data between tools, forward messages and update sheets by hand, and steps get skipped when the day gets busy.",
    build:
      "n8n workflows that connect your apps through APIs and webhooks, validate incoming data, call an AI model only where judgment is needed, and log every run.",
    benefit: "Fewer manual handoffs, and one place to see what ran and what failed.",
    cta: "Automate a workflow",
  },
  {
    name: "WhatsApp AI Receptionist",
    service: "WhatsApp AI receptionist",
    icon: "💬",
    problem:
      "Customers message after hours or while staff are busy. Unanswered enquiries go cold, and booking by chat is slow.",
    build:
      "A WhatsApp assistant that answers from information you approve, collects customer details, checks availability, books without double-booking, and hands over to a person when it is unsure.",
    benefit: "Faster first replies, and bookings captured in a database or calendar instead of chat threads.",
    cta: "Plan a receptionist",
  },
  {
    name: "Lead Capture and Follow-Up",
    service: "Lead capture and follow-up",
    icon: "📥",
    problem:
      "Leads arrive from forms, ads and messages, reach a sheet late, and follow-up depends on someone remembering.",
    build:
      "An intake flow that cleans each lead, flags duplicates, scores it against your rules, notifies the right person, writes to Google Sheets or Supabase, and schedules follow-ups.",
    benefit: "More consistent follow-up, and a clear record of where every lead stands.",
    cta: "Set up lead handling",
  },
];

const secondary = [
  {
    name: "AI agents for a specific task",
    service: "AI agent for a specific task",
    text: "Assistants connected to your tools and data, working inside rules instead of free-form replies.",
  },
  {
    name: "Document processing",
    service: "Document processing",
    text: "Extract fields from invoices and forms into validated JSON, with a path for incomplete documents.",
  },
  {
    name: "Knowledge assistants and support",
    service: "Knowledge assistant or support bot",
    text: "Answer common questions from approved documents, avoid unsupported answers and route hard ones to a person.",
  },
];

export function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="h2">Three systems I focus on</h2>
          <p className="prose-tight mt-4">
            Each targets a specific place where businesses lose time or customers. The benefits listed
            are what these systems are designed to do — not measured results from past clients.
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {primary.map((s) => (
            <article key={s.name} className="panel p-6 transition-all duration-200 hover:border-line-strong sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)] lg:gap-12">
                <div>
                  <span aria-hidden className="text-2xl">{s.icon}</span>
                  <h3 className="h3 mt-3 text-xl sm:text-2xl">{s.name}</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-mute">The problem</h4>
                    <p className="mt-2 text-sm text-mute">{s.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-mute">What I build</h4>
                    <p className="mt-2 text-sm text-mute">{s.build}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-mute">Intended benefit</h4>
                    <p className="mt-2 text-sm text-mute">{s.benefit}</p>
                  </div>
                </div>
              </div>
              <div className="mt-7 border-t border-line pt-5">
                <ServiceCta service={s.service} className="btn btn-ghost">
                  {s.cta}
                </ServiceCta>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="h3">Also available</h3>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {secondary.map((s) => (
              <li key={s.name} className="flex flex-col bg-surface p-5">
                <h4 className="font-medium">{s.name}</h4>
                <p className="mt-2 flex-1 text-sm text-mute">{s.text}</p>
                <ServiceCta service={s.service} className="link mt-4 text-sm">
                  Ask about this
                </ServiceCta>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
