"use client";

import { useState } from "react";
import type { WorkflowStep } from "@/data/projects";
import { JsonView } from "./JsonView";

export function StepExplorer({ steps, note }: { steps: WorkflowStep[]; note: string }) {
  const [index, setIndex] = useState(0);
  const step = steps[index];

  return (
    <div className="border border-[#393939] bg-[#242424]">
      <div className="grid md:grid-cols-[17rem_minmax(0,1fr)]">
        <ol className="border-b border-[#393939] p-2 md:border-b-0 md:border-r border-[#393939]" aria-label="Workflow steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? "step" : undefined}
                className={`flex w-full items-start gap-3 px-3 py-2.5 text-left text-sm transition-colors border ${
                  i === index
                    ? "bg-[#171717] border-[#FF6B35] text-[#F5EBDD]"
                    : "border-transparent text-[#B6B1A9] hover:bg-[#171717]/60 hover:text-[#F5EBDD]"
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-0.5 grid size-5 flex-none place-items-center font-mono text-[10px] border ${
                    i === index ? "border-[#FF6B35] bg-[#FF6B35] text-white font-bold" : "border-[#393939] text-[#B6B1A9]"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="font-medium">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="min-w-0 p-5 sm:p-6 bg-[#171717]">
          <div key={index}>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6B35] block mb-1">
              STAGE 0{index + 1}
            </span>
            <h3 className="font-display text-xl font-bold text-[#F5EBDD]">
              {step.title}
              {step.planned ? (
                <span className="ml-3 align-middle font-mono text-xs text-[#B6B1A9]">(planned, not built)</span>
              ) : null}
            </h3>
            <p className="mt-2 text-sm text-[#B6B1A9] leading-relaxed">{step.detail}</p>
            {step.payload ? (
              <div className="mt-4">
                <JsonView data={step.payload} label={`Sample data for step ${index + 1}`} />
              </div>
            ) : null}
            {step.failure ? (
              <div className="mt-4 border border-[#FF6B35]/40 bg-[#FF6B35]/10 px-3.5 py-2.5 text-xs text-[#F5EBDD] font-mono">
                <span className="font-bold text-[#FF6B35]">FAILURE PATH: </span>
                <span>{step.failure}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {note && (
        <div className="border-t border-[#393939] bg-[#171717] px-4 py-2 font-mono text-[11px] text-[#B6B1A9]">
          {note}
        </div>
      )}
    </div>
  );
}
