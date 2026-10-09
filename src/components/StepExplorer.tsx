"use client";

import { useState } from "react";
import type { WorkflowStep } from "@/data/projects";
import { JsonView } from "./JsonView";

export function StepExplorer({ steps, note }: { steps: WorkflowStep[]; note: string }) {
  const [index, setIndex] = useState(0);
  const step = steps[index];

  return (
    <div className="panel overflow-hidden">
      <div className="grid md:grid-cols-[17rem_minmax(0,1fr)]">
        <ol className="border-b border-line p-2 md:border-b-0 md:border-r" aria-label="Workflow steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? "step" : undefined}
                className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  i === index ? "bg-surface-2 text-bone" : "text-mute hover:bg-surface-2/60 hover:text-bone"
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-0.5 grid size-5 flex-none place-items-center rounded-full border text-[11px] ${
                    i === index ? "border-signal text-signal" : "border-line-strong"
                  }`}
                >
                  {i + 1}
                </span>
                <span>{s.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="min-w-0 p-5 sm:p-6">
          <div key={index} className="stage-enter">
            <h3 className="h3">
              {step.title}
              {step.planned ? (
                <span className="ml-3 align-middle text-xs font-medium text-mute">(planned, not built)</span>
              ) : null}
            </h3>
            <p className="prose-tight mt-2 text-[0.95rem]">{step.detail}</p>
            {step.payload ? (
              <div className="mt-4">
                <JsonView data={step.payload} label={`Sample data for step ${index + 1}`} />
              </div>
            ) : null}
            {step.failure ? (
              <p className="mt-4 rounded-lg border border-amber/30 bg-amber/5 px-3 py-2 text-sm text-bone">
                <span className="font-medium text-amber">If this fails: </span>
                {step.failure}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <p className="border-t border-line px-5 py-3 text-xs text-mute sm:px-6">{note}</p>
    </div>
  );
}
