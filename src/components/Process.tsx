const steps = [
  {
    name: "Understand",
    text: "Identify the actual business problem, the existing workflow and the outcome you want.",
    output: "A short written summary of how the work happens today.",
  },
  {
    name: "Design",
    text: "Map the process, define requirements and choose an architecture that fits the problem.",
    output: "A simple map of the system, including what it should refuse to do.",
  },
  {
    name: "Build",
    text: "Implement the workflow, integrations, validation and failure handling.",
    output: "A working system you can try on test data.",
  },
  {
    name: "Test and improve",
    text: "Run realistic scenarios, handle edge cases and improve the solution based on what the tests show.",
    output: "A list of what was tested, what failed and what changed.",
  },
];

export function Process() {
  return (
    <section id="process" className="section">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="h2">How I work</h2>
          <p className="prose-tight mt-4">
            Most automation problems are design problems. The process puts understanding the work
            ahead of writing workflows.
          </p>
        </div>
        <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.name} className="border-t-2 border-signal/30 pt-5 transition-colors hover:border-signal/70">
              <span className="text-xs font-semibold uppercase tracking-widest text-signal">
                Step {i + 1} of {steps.length}
              </span>
              <h3 className="h3 mt-3">{s.name}</h3>
              <p className="mt-3 text-mute">{s.text}</p>
              <p className="mt-4 rounded-lg bg-surface-2 px-3 py-2.5 text-sm">
                <span className="font-medium text-bone">You get: </span>
                <span className="text-mute">{s.output}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
