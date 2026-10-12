const steps = [
  {
    num: "01",
    phase: "DISCOVER",
    title: "Understand the work",
    text: "Understand the business process and desired outcome. We diagnose bottlenecks, manual handoffs, and data flows before touching any tools.",
    deliverable: "Process map & bottleneck analysis",
  },
  {
    num: "02",
    phase: "DESIGN",
    title: "Map & specify architecture",
    text: "Map the workflow, integrations, validation, and failure cases. We define explicitly what the automation should handle and what it must refuse.",
    deliverable: "Schema specs & decision trees",
  },
  {
    num: "03",
    phase: "BUILD",
    title: "Engineer resilient pipelines",
    text: "Implement the automation, APIs, database operations, and error handling using n8n, Python, FastAPI, and Supabase.",
    deliverable: "Working pipeline on test data",
  },
  {
    num: "04",
    phase: "TEST",
    title: "Stress test edge cases",
    text: "Validate realistic scenarios, edge cases, collision states, and handoff behavior under imperfect conditions.",
    deliverable: "Test logs & deployment runbook",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-[#242424] text-[#F5EBDD] py-14 sm:py-20 lg:py-28 border-b border-[#393939]">
      <div className="wrap">
        {/* Section Header */}
        <div className="max-w-3xl pb-8 sm:pb-12 border-b border-[#393939]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B6B1A9] mb-3">
            <span className="size-2 bg-[#FF6B35]" />
            <span>METHODOLOGY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-[#F5EBDD] leading-[1.05]">
            From messy process to working system.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B6B1A9] leading-relaxed max-w-2xl font-normal">
            Most automation failures are design oversights. My engineering process puts operational understanding ahead of writing code.
          </p>
        </div>

        {/* Horizontal Timeline (Desktop) & Vertical (Mobile) */}
        <div className="mt-14 relative">
          {/* Connecting Line (Desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[2.25rem] inset-x-8 h-px bg-[#393939]"
          />

          <ol className="flex lg:grid lg:grid-cols-4 gap-3.5 sm:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-3 pt-1 -mx-5 sm:-mx-8 lg:mx-0 px-[11vw] sm:px-[14vw] lg:px-0 no-scrollbar relative scroll-smooth">
            {steps.map((s, i) => (
              <li key={s.num} className="w-[76vw] sm:w-[50vw] lg:w-auto min-w-[76vw] sm:min-w-[50vw] lg:min-w-0 max-w-[76vw] sm:max-w-[50vw] lg:max-w-none snap-center flex-shrink-0 lg:flex-shrink relative flex flex-col justify-between">
                {/* Step Marker Node */}
                <div className="flex items-center gap-3">
                  <div
                    className={`size-10 flex-none border flex items-center justify-center font-mono text-xs font-bold z-10 ${
                      i === 2
                        ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-[0_0_15px_rgba(255,107,53,0.35)]"
                        : "bg-[#171717] border-[#393939] text-[#F5EBDD]"
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className="font-mono text-xs tracking-widest text-[#FF6B35] font-semibold">
                    {s.phase}
                  </span>
                </div>

                {/* Step Content */}
                <div className="mt-5 border border-[#393939] bg-[#171717] p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#F5EBDD]">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-[#B6B1A9] leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#393939]/60">
                    <p className="font-mono text-[10px] uppercase text-[#B6B1A9]">
                      DELIVERABLE:
                    </p>
                    <p className="font-mono text-[11px] text-[#F5EBDD] font-medium mt-0.5">
                      {s.deliverable}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Mobile Swipe Hint */}
          <p className="lg:hidden font-mono text-[10px] text-[#B6B1A9] text-center mt-3 tracking-wider">
            ← SWIPE 4 PHASES →
          </p>
        </div>
      </div>
    </section>
  );
}
