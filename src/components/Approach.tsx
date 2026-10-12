import Link from "next/link";
import { Check, ShieldCheck, Terminal } from "lucide-react";

const practices = [
  {
    num: "01",
    title: "Input validation at the boundary",
    text: "Incoming webhooks and messages are cleaned, phone numbers normalised to E.164, and required fields asserted before any downstream node executes.",
  },
  {
    num: "02",
    title: "Structured model schemas",
    text: "LLMs are never queried for free-form replies when updating records. We enforce typed Pydantic or JSON schemas and validate the output before database write.",
  },
  {
    num: "03",
    title: "Database persistence over memory",
    text: "Conversation state and candidate booking slots live in Supabase PostgreSQL tables with unique constraints, ensuring concurrent messages cannot cause double bookings.",
  },
  {
    num: "04",
    title: "Deterministic error handling & retries",
    text: "Every external API call has timeout limits, exponential backoff for transient 5xx errors, and explicit dead-letter queues. Nothing fails silently.",
  },
  {
    num: "05",
    title: "Deduplication & idempotency",
    text: "Messaging platforms often redeliver webhooks. Message IDs and lead hashes ensure repeated requests are identified immediately and handled idempotently.",
  },
  {
    num: "06",
    title: "Graceful human escalation",
    text: "When an AI model expresses low confidence or an edge case occurs, the automation routes the conversation to staff via Slack or WhatsApp with full context.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="bg-[#F5EBDD] text-[#24211E] py-14 sm:py-20 lg:py-28 border-b border-[#DED6C9] overflow-x-clip max-w-full">
      <div className="wrap min-w-0 max-w-full">
        {/* Header */}
        <div className="max-w-3xl pb-8 sm:pb-12 border-b border-[#DED6C9]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#6B655D] mb-3">
            <span className="size-2 bg-[#FF6B35]" />
            <span>RELIABILITY ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-[#24211E] leading-[1.05]">
            Built to handle more than the happy path.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B655D] leading-relaxed max-w-2xl font-normal">
            Automating the happy path is straightforward. Production reliability requires engineering explicitly for network timeouts, schema drifts, duplicate webhooks, and concurrency conflicts.
          </p>
        </div>

        {/* Editorial Split: Code/Schema Excerpt vs Practice List */}
        <div className="mt-8 sm:mt-14 grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] lg:items-start min-w-0 max-w-full">
          {/* Left Column: 6 Engineering Practices (Swipeable on Mobile) */}
          <div className="min-w-0 max-w-full overflow-hidden">
            <div className="flex lg:block overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-3.5 lg:gap-0 pb-3 -mx-5 sm:-mx-8 lg:mx-0 px-[11vw] sm:px-[14vw] lg:px-0 no-scrollbar lg:divide-y lg:divide-[#DED6C9] scroll-smooth min-w-0 max-w-full">
              {practices.map((p) => (
                <div
                  key={p.num}
                  className="w-[76vw] sm:w-[50vw] lg:w-auto min-w-[76vw] sm:min-w-[50vw] lg:min-w-0 max-w-[76vw] sm:max-w-[50vw] lg:max-w-none snap-center flex-shrink-0 lg:flex-shrink bg-white/95 lg:bg-transparent border border-[#DED6C9] lg:border-none p-4 sm:p-5 lg:p-0 py-4 sm:py-5 lg:py-5 shadow-sm lg:shadow-none flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="font-mono text-xs font-bold text-[#FF6B35] mt-1">
                      {p.num}
                    </span>
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#24211E]">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-[#6B655D] leading-relaxed">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="lg:hidden font-mono text-[10px] text-[#6B655D] text-center mt-2 tracking-wider">
              ← SWIPE 6 PRINCIPLES →
            </p>
          </div>

          {/* Right Column: Code Excerpt & Validation Inspector */}
          <div className="space-y-6 min-w-0 max-w-full overflow-hidden">
            {/* Architectural Code Excerpt */}
            <div className="border border-[#DED6C9] bg-white p-4 sm:p-6 shadow-sm min-w-0 max-w-full">
              <div className="flex items-center justify-between border-b border-[#DED6C9] pb-3 mb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#24211E]">
                  <Terminal className="size-3.5 text-[#FF6B35]" />
                  <span>schema_guard.py</span>
                </div>
                <span className="font-mono text-[10px] text-[#6B655D] uppercase">
                  Pydantic Validation
                </span>
              </div>
              <pre className="font-mono text-[11px] leading-relaxed text-[#24211E] overflow-x-auto max-w-full max-h-56 sm:max-h-none overflow-y-auto bg-[#F5EBDD]/60 p-3 sm:p-3.5 border border-[#DED6C9]">
                <code>{`class InvoiceExtract(BaseModel):
    vendor_name: str = Field(min_length=2)
    invoice_date: date
    subtotal: Decimal = Field(gt=0)
    tax_amount: Decimal = Field(ge=0)
    total_amount: Decimal = Field(gt=0)
    line_items: list[LineItem]

    @model_validator(mode="after")
    def verify_totals(self):
        if self.subtotal + self.tax_amount != self.total_amount:
            raise ValueError("Subtotal + Tax mismatch")
        return self`}</code>
              </pre>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#6B655D]">
                <span>Status: Strict runtime check</span>
                <span className="text-[#FF6B35] font-semibold">Zero silent failures</span>
              </div>
            </div>

            {/* Verification Principles Banner */}
            <div className="border border-[#DED6C9] bg-white/70 p-4 sm:p-5">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-2">
                <ShieldCheck className="size-4 text-[#FF6B35]" />
                <span>Production Standard</span>
              </div>
              <p className="text-xs text-[#6B655D] leading-relaxed">
                Every automation deployed for client operations maintains a complete execution audit trail, encrypted credential management, and documented manual recovery procedures.
              </p>
              <div className="mt-4 pt-3 border-t border-[#DED6C9] flex items-center justify-between">
                <Link
                  href="/projects/ai-invoice-parser"
                  className="font-mono text-xs font-semibold uppercase text-[#24211E] hover:text-[#FF6B35] transition-colors"
                >
                  Inspect Invoice Parser Architecture &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
