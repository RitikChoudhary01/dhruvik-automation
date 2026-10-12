import { ServiceCta } from "./ServiceCta";
import { ArrowRight } from "lucide-react";

const services = [
  {
    num: "01",
    name: "Lead Response Systems",
    service: "Lead capture and follow-up",
    tech: "n8n · Webhooks · Supabase · Slack",
    problem:
      "Enquiries arrive through multiple channels (forms, social ads, direct emails) and follow-ups become inconsistent or delayed while staff are occupied.",
    solution:
      "Capture incoming leads instantly, validate and deduplicate their details, update central records, trigger staff notifications, and schedule automated follow-ups.",
    diagram: ["Form / Ads Ingestion", "Schema Deduplication", "CRM & DB Write", "Staff Dispatch"],
    cta: "Configure a Lead System",
  },
  {
    num: "02",
    name: "WhatsApp AI Receptionist",
    service: "WhatsApp AI receptionist",
    tech: "WhatsApp Cloud API · FastAPI · Gemini · PostgreSQL",
    problem:
      "Appointment-based businesses spend hours responding to repetitive enquiries and collecting scheduling details, losing after-hours opportunities.",
    solution:
      "Automate supported customer enquiries, collect required contact details, check database availability, and connect booking requests with seamless human escalation.",
    diagram: ["Customer WhatsApp", "Intent Classification", "Calendar Verification", "Human Handoff"],
    cta: "Plan an AI Receptionist",
  },
  {
    num: "03",
    name: "Document Processing",
    service: "Document processing",
    tech: "Python · Pydantic · Vision Models · REST APIs",
    problem:
      "Operations teams manually copy and paste unstructured information from vendor invoices, contracts, and receipts into internal ERPs or spreadsheets.",
    solution:
      "Extract relevant fields into structured JSON, strictly validate against typed Pydantic schemas, and automatically route uncertain or incomplete documents for human review.",
    diagram: ["Document Upload", "Field Extraction", "Pydantic Schema Check", "Audit Log & ERP"],
    cta: "Automate Document Workflows",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-[#F5EBDD] text-[#24211E] py-14 sm:py-20 lg:py-28 border-b border-[#DED6C9] overflow-x-clip max-w-full">
      <div className="wrap min-w-0 max-w-full">
        {/* Section Header */}
        <div className="max-w-3xl pb-8 sm:pb-12 border-b border-[#DED6C9]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#6B655D] mb-3">
            <span className="size-2 bg-[#FF6B35]" />
            <span>SERVICES &amp; CAPABILITIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-[#24211E] leading-[1.05]">
            Automation for the work that slows you down.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B655D] leading-relaxed max-w-2xl font-normal">
            Bespoke automation systems engineered to eliminate manual bottlenecks, capture every revenue opportunity, and run 24/7 without fail.
          </p>
        </div>

        {/* Horizontal Snap Scroll on Mobile / Editorial Rows on Desktop */}
        <div className="mt-6 lg:mt-0 min-w-0 max-w-full overflow-hidden">
          <div className="flex lg:block overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-3.5 lg:gap-0 pb-4 pt-1 -mx-5 sm:-mx-8 lg:mx-0 px-[11vw] sm:px-[14vw] lg:px-0 no-scrollbar lg:divide-y lg:divide-[#DED6C9] scroll-smooth min-w-0 max-w-full">
          {services.map((s) => (
            <article
              key={s.num}
              className="w-[76vw] sm:w-[62vw] lg:w-auto min-w-[76vw] sm:min-w-[62vw] lg:min-w-0 max-w-[76vw] sm:max-w-[62vw] lg:max-w-none snap-center flex-shrink-0 lg:flex-shrink bg-white/95 lg:bg-transparent border border-[#DED6C9] lg:border-none p-5 sm:p-6 lg:p-0 py-6 sm:py-8 lg:py-16 grid gap-6 lg:gap-8 lg:grid-cols-[10rem_minmax(0,1.2fr)_minmax(0,1.4fr)] lg:items-start flex flex-col justify-between shadow-sm lg:shadow-none"
            >
              {/* Column 1: Oversized Service Number */}
              <div>
                <span className="font-mono text-4xl sm:text-6xl font-light text-[#FF6B35] tracking-tight block">
                  {s.num}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#6B655D] mt-1 block">
                  {s.tech}
                </span>
              </div>

              {/* Column 2: Service Title & Problem */}
              <div className="space-y-4 pr-0 lg:pr-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#24211E] tracking-tight">
                  {s.name}
                </h3>
                <div className="border-l-2 border-[#DED6C9] pl-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#6B655D] font-semibold">
                    THE PROBLEM
                  </p>
                  <p className="mt-1 text-sm text-[#6B655D] leading-relaxed">
                    {s.problem}
                  </p>
                </div>
              </div>

              {/* Column 3: The Solution & Technical Pipeline Flow */}
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#24211E] font-semibold">
                    THE SOLUTION
                  </p>
                  <p className="mt-1 text-sm sm:text-base text-[#24211E] leading-relaxed">
                    {s.solution}
                  </p>
                </div>

                {/* Minimal Architectural Diagram */}
                <div className="border border-[#DED6C9] bg-white/70 p-3 sm:p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#6B655D] mb-2 font-medium">
                    EXECUTION PIPELINE
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                    {s.diagram.map((node, i) => (
                      <span key={node} className="inline-flex items-center gap-1.5">
                        <span className="bg-[#F5EBDD] text-[#24211E] border border-[#DED6C9] px-2 py-1 text-[11px] font-medium">
                          {node}
                        </span>
                        {i < s.diagram.length - 1 && (
                          <span className="text-[#FF6B35] font-bold">&rarr;</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive CTA */}
                <div>
                  <ServiceCta
                    service={s.service}
                    className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#24211E] hover:text-[#FF6B35] transition-colors"
                  >
                    <span>{s.cta}</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1 text-[#FF6B35]" />
                  </ServiceCta>
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <p className="lg:hidden font-mono text-[10px] text-[#6B655D] text-center mt-3 tracking-wider">
          ← SWIPE 3 SERVICES →
        </p>
      </div>
    </section>
  );
}
