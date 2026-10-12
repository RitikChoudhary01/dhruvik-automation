import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const p1 = projects.find((p) => p.slug === "whatsapp-ai-receptionist")!;
  const p2 = projects.find((p) => p.slug === "lead-management-revenue-recovery")!;
  const p3 = projects.find((p) => p.slug === "ai-invoice-parser")!;

  return (
    <section id="projects" className="bg-[#171717] text-[#F5EBDD] py-14 sm:py-20 lg:py-28 border-b border-[#393939]">
      <div className="wrap">
        {/* Section Header */}
        <div className="max-w-3xl pb-8 sm:pb-12 border-b border-[#393939]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B6B1A9] mb-3">
            <span className="size-2 bg-[#FF6B35]" />
            <span>ENGINEERING CASE STUDIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-[#F5EBDD] leading-[1.05]">
            Systems I&apos;ve been building.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B6B1A9] leading-relaxed max-w-2xl font-normal">
            Real implementations and architectural case studies. Each addresses a tangible operational bottleneck with verifiable logic and database constraints.
          </p>
        </div>

        {/* Case Study 01: Full-width Horizontal Architecture Flow */}
        <article className="py-10 sm:py-16 border-b border-[#393939]">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-4xl sm:text-5xl font-light text-[#FF6B35]">01</span>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#B6B1A9]">
                  WORKING PROTOTYPE · LOCAL TESTED
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#F5EBDD] tracking-tight mt-1">
                  {p1.title}
                </h3>
              </div>
            </div>
            <div className="font-mono text-xs text-[#B6B1A9] flex flex-wrap gap-2">
              {p1.stack.slice(0, 4).map((tech) => (
                <span key={tech} className="border border-[#393939] bg-[#242424] px-2.5 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base text-[#B6B1A9] max-w-3xl leading-relaxed">
            {p1.summary} An AI reply cannot be what prevents a double-booking—the relational database enforces slot uniqueness through database constraints.
          </p>

          {/* Technical Illustration 01: Horizontal Workflow Diagram (Swipeable on Mobile) */}
          <div className="mt-8 border border-[#393939] bg-[#242424] p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2 border-b border-[#393939] pb-3 mb-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#FF6B35] font-semibold">
                SYSTEM WORKFLOW ARCHITECTURE
              </p>
              <span className="font-mono text-[10px] text-[#B6B1A9]">7 Resilient Stages</span>
            </div>
            <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-2 overflow-x-auto sm:overflow-visible snap-x no-scrollbar pb-2 pt-1 -mx-2 px-2 sm:mx-0 sm:px-0">
              {[
                "Incoming message",
                "Input validation",
                "Intent classification",
                "Database persistence",
                "Availability check",
                "Appointment handling",
                "Human escalation",
              ].map((node, i) => (
                <div
                  key={node}
                  className="min-w-[130px] sm:min-w-0 snap-center flex-shrink-0 sm:flex-shrink border border-[#393939] bg-[#171717] p-2.5 flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] text-[#FF6B35] font-semibold">
                    0{i + 1}
                  </span>
                  <span className="text-xs font-medium text-[#F5EBDD] mt-2 leading-tight">
                    {node}
                  </span>
                </div>
              ))}
            </div>
            <p className="sm:hidden font-mono text-[9px] text-[#B6B1A9] text-center mt-2 tracking-wider">
              ← SWIPE 7 STAGES →
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Link
              href={`/projects/${p1.slug}`}
              className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#F5EBDD] hover:text-[#FF6B35] transition-colors"
            >
              <span>Explore Technical Case Study</span>
              <ArrowRight className="size-3.5 text-[#FF6B35] transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="font-mono text-xs text-[#B6B1A9] hidden sm:inline">
              Built with n8n &amp; Supabase
            </span>
          </div>
        </article>

        {/* Case Studies 02 & 03: Horizontal Snap Scroll on Mobile / 2-Col Grid on Desktop */}
        <div className="flex lg:grid lg:grid-cols-2 gap-3.5 lg:gap-12 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-4 pt-8 sm:pt-16 -mx-5 sm:-mx-8 lg:mx-0 px-[11vw] sm:px-[14vw] lg:px-0 no-scrollbar scroll-smooth">
          {/* Project 02: Lead Management Pipeline */}
          <article className="w-[76vw] sm:w-[62vw] lg:w-auto min-w-[76vw] sm:min-w-[62vw] lg:min-w-0 max-w-[76vw] sm:max-w-[62vw] lg:max-w-none snap-center flex-shrink-0 lg:flex-shrink border border-[#393939] bg-[#242424] p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#393939] pb-4">
                <span className="font-mono text-3xl font-light text-[#FF6B35]">02</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#B6B1A9] border border-[#393939] px-2 py-0.5 bg-[#171717]">
                  AUTOMATED PIPELINE
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F5EBDD] tracking-tight mt-4">
                {p2.title}
              </h3>
              <p className="mt-3 text-sm text-[#B6B1A9] leading-relaxed">
                {p2.summary} Captures incoming leads, flags duplicates, scores readiness, and writes clean data to Google Sheets &amp; Supabase.
              </p>

              {/* Technical Illustration 02: Lead Moving Through Pipeline */}
              <div className="mt-6 border border-[#393939] bg-[#171717] p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#B6B1A9] mb-3">
                  LEAD STAGE PIPELINE
                </p>
                <div className="space-y-1.5 font-mono text-xs">
                  {[
                    "01. Capture (Webhooks)",
                    "02. Validation (Clean format)",
                    "03. Deduplication (E.164 index)",
                    "04. Qualification (Rules engine)",
                    "05. Storage (Supabase SQL)",
                    "06. Follow-up (Auto-sequence)",
                    "07. Status Tracking (Audit log)",
                  ].map((s) => (
                    <div
                      key={s}
                      className="border border-[#393939]/60 bg-[#242424]/80 px-2.5 py-1 text-[#F5EBDD] flex items-center justify-between text-[11px]"
                    >
                      <span>{s}</span>
                      <span className="size-1.5 bg-[#FF6B35] rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#393939] flex items-center justify-between">
              <Link
                href={`/projects/${p2.slug}`}
                className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#F5EBDD] hover:text-[#FF6B35] transition-colors"
              >
                <span>Read Implementation Notes</span>
                <ArrowRight className="size-3.5 text-[#FF6B35] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>

          {/* Project 03: AI Invoice Parser */}
          <article className="w-[76vw] sm:w-[62vw] lg:w-auto min-w-[76vw] sm:min-w-[62vw] lg:min-w-0 max-w-[76vw] sm:max-w-[62vw] lg:max-w-none snap-center flex-shrink-0 lg:flex-shrink border border-[#393939] bg-[#242424] p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#393939] pb-4">
                <span className="font-mono text-3xl font-light text-[#FF6B35]">03</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6B35] border border-[#FF6B35]/40 px-2 py-0.5 bg-[#FF6B35]/10 flex items-center gap-1.5">
                  <Code2 className="size-3" />
                  PUBLIC REPOSITORY
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F5EBDD] tracking-tight mt-4">
                {p3.title}
              </h3>
              <p className="mt-3 text-sm text-[#B6B1A9] leading-relaxed">
                {p3.summary} Extract line items and tax amounts from messy invoices with typed Pydantic validation schemas and strict error fallbacks.
              </p>

              {/* Technical Illustration 03: Document Input into Structured Output */}
              <div className="mt-6 border border-[#393939] bg-[#171717] p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#B6B1A9] mb-3">
                  TRANSFORMATION FLOW
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="border border-[#393939] bg-[#242424] p-2.5">
                    <p className="text-[10px] text-[#B6B1A9] uppercase">INPUT</p>
                    <p className="text-[#F5EBDD] mt-1 font-semibold">Document input</p>
                    <p className="text-[10px] text-[#B6B1A9] mt-0.5">PDF / Image stream</p>
                  </div>
                  <div className="border border-[#393939] bg-[#242424] p-2.5">
                    <p className="text-[10px] text-[#FF6B35] uppercase">EXTRACT</p>
                    <p className="text-[#F5EBDD] mt-1 font-semibold">Extraction</p>
                    <p className="text-[10px] text-[#B6B1A9] mt-0.5">Vision LLM parser</p>
                  </div>
                  <div className="border border-[#393939] bg-[#242424] p-2.5">
                    <p className="text-[10px] text-[#FF6B35] uppercase">VALIDATE</p>
                    <p className="text-[#F5EBDD] mt-1 font-semibold">Schema validation</p>
                    <p className="text-[10px] text-[#B6B1A9] mt-0.5">Pydantic models</p>
                  </div>
                  <div className="border border-[#393939] bg-[#242424] p-2.5">
                    <p className="text-[10px] text-[#B6B1A9] uppercase">DISPATCH</p>
                    <p className="text-[#F5EBDD] mt-1 font-semibold">Structured output</p>
                    <p className="text-[10px] text-[#B6B1A9] mt-0.5">Human review fallback</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#393939] flex items-center justify-between">
              <Link
                href={`/projects/${p3.slug}`}
                className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#F5EBDD] hover:text-[#FF6B35] transition-colors"
              >
                <span>View Schema &amp; Source Code</span>
                <ArrowRight className="size-3.5 text-[#FF6B35] transition-transform group-hover:translate-x-1" />
              </Link>
              {p3.repo && (
                <a
                  href={p3.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#B6B1A9] hover:text-white"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </article>
        </div>

        {/* Mobile Swipe Hint */}
        <p className="lg:hidden font-mono text-[10px] text-[#B6B1A9] text-center mt-3 tracking-wider">
          ← SWIPE 2 CASE STUDIES →
        </p>
      </div>
    </section>
  );
}
