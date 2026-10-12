import Link from "next/link";
import { Cpu, Globe, Bot, Webhook, FileCode2, Database, ArrowRight } from "lucide-react";

const capabilitiesData = [
  {
    icon: Cpu,
    name: "Workflow Orchestration",
    what: "Multi-step production n8n workflows with resilient branching, conditional routing, auto-retries, and error notifications.",
    tools: "n8n Core",
    color: "#FF6B35",
    proof: [
      { label: "WhatsApp Receptionist", href: "/projects/whatsapp-ai-receptionist" },
      { label: "Lead Management", href: "/projects/lead-management-revenue-recovery" },
    ],
  },
  {
    icon: Globe,
    name: "API & Tool Integrations",
    what: "Seamlessly connecting business software via REST APIs, Google Calendar, Gmail, Slack, and Google Sheets.",
    tools: "REST APIs, Google Workspace",
    color: "#10B981",
    proof: [{ label: "WhatsApp Receptionist", href: "/projects/whatsapp-ai-receptionist" }],
  },
  {
    icon: Bot,
    name: "Autonomous AI Agents",
    what: "Fine-tuned prompt pipelines returning deterministic structured JSON payloads guarded by strict system rules.",
    tools: "OpenAI, Gemini & Groq",
    color: "#A855F7",
    proof: [
      { label: "WhatsApp Receptionist", href: "/projects/whatsapp-ai-receptionist" },
      { label: "AI Invoice Parser", href: "/projects/ai-invoice-parser" },
    ],
  },
  {
    icon: Webhook,
    name: "Webhooks & Ingestion",
    what: "Real-time event capture from web forms, Facebook/Google ads, and messaging platforms with deduplication.",
    tools: "n8n Webhooks, FastAPI",
    color: "#F59E0B",
    proof: [{ label: "Lead Management", href: "/projects/lead-management-revenue-recovery" }],
  },
  {
    icon: FileCode2,
    name: "Structured Data Processing",
    what: "Converting untyped text and invoice documents into schema-validated JSON with Pydantic for clean downstream sync.",
    tools: "Python, Pydantic",
    color: "#38BDF8",
    proof: [{ label: "AI Invoice Parser", href: "/projects/ai-invoice-parser" }],
  },
  {
    icon: Database,
    name: "Database Architecture",
    what: "Designing scalable relational databases to persist leads, conversation context, and booking states.",
    tools: "Supabase, PostgreSQL",
    color: "#6366F1",
    proof: [{ label: "WhatsApp Receptionist", href: "/projects/whatsapp-ai-receptionist" }],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-[#171717] text-[#F5EBDD] py-14 sm:py-20 lg:py-28 border-t border-[#393939] overflow-x-clip max-w-full">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 min-w-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] min-w-0 max-w-full">
          {/* Left Column: Sticky Editorial Context */}
          <div className="lg:sticky lg:top-28 lg:self-start min-w-0 max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 bg-[#FF6B35]" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-widest text-[#B6B1A9]">
                Engineering Foundation
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-[1.1]">
              What The Systems <br />
              Are Built On
            </h2>
            <p className="mt-5 text-[#B6B1A9] text-base leading-relaxed">
              Every AI agent and workflow is engineered for production reliability: strict error handling, audit logging, and zero hallucination risk.
            </p>

            <div className="mt-8 pt-6 border-t border-[#393939]">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#B6B1A9] mb-3">
                Supporting Ecosystem
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {["Docker", "Git / GitHub", "ChromaDB", "Streamlit", "Postman", "Linux VPS"].map((tool) => (
                  <span
                    key={tool}
                    className="border border-[#393939] bg-[#242424] text-[#F5EBDD] px-2.5 py-1"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 6 Architectural Cards (Horizontal Scroll on Mobile, 2-Col Grid on Desktop) */}
          <div className="min-w-0 max-w-full overflow-hidden">
            <div className="flex sm:grid sm:grid-cols-2 gap-3.5 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-3 pt-1 -mx-5 sm:-mx-0 px-[11vw] sm:px-0 no-scrollbar scroll-smooth min-w-0 max-w-full">
              {capabilitiesData.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="w-[76vw] sm:w-auto min-w-[76vw] sm:min-w-0 max-w-[76vw] sm:max-w-none snap-center flex-shrink-0 sm:flex-shrink bg-[#242424] border border-[#393939] p-5 sm:p-6 flex flex-col justify-between hover:border-[#FF6B35]/60 transition-colors group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        {/* Vibrant Signature Icon Container */}
                        <div
                          className="size-9 border flex items-center justify-center group-hover:scale-105 transition-transform"
                          style={{
                            backgroundColor: `${item.color}15`,
                            borderColor: `${item.color}40`,
                            color: item.color,
                          }}
                        >
                          <Icon className="size-4" />
                        </div>
                        <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 bg-[#171717] border border-[#393939] text-[#B6B1A9]">
                          {item.tools}
                        </span>
                      </div>

                      <h3 className="font-display font-semibold text-lg text-[#FFFFFF] group-hover:text-[#FF6B35] transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-xs text-[#B6B1A9] leading-relaxed">
                        {item.what}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#393939] flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#B6B1A9]">
                        Proof:
                      </span>
                      {item.proof.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#F5EBDD] bg-[#171717] border border-[#393939] hover:border-[#FF6B35] hover:text-[#FF6B35] px-2.5 py-1 transition-all"
                        >
                          <span>{p.label}</span>
                          <ArrowRight className="size-2.5 text-[#FF6B35]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Swipe Hint */}
            <p className="sm:hidden font-mono text-[10px] text-[#B6B1A9] text-center mt-2 tracking-wider">
              ← SWIPE 6 CAPABILITIES →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
