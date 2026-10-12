"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  Pause,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Calendar,
  Database,
  Send,
} from "lucide-react";
import { traceFor, type Scenario } from "@/data/trace";
import { JsonView } from "./JsonView";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

const WORKFLOW_STEPS = [
  { step: "01", label: "WHATSAPP ENQUIRY", icon: MessageSquare, color: "#25D366" },
  { step: "02", label: "VALIDATE MESSAGE", icon: ShieldCheck, color: "#F59E0B" },
  { step: "03", label: "CLASSIFY INTENT", icon: Sparkles, color: "#A855F7" },
  { step: "04", label: "AVAILABILITY CHECK", icon: Calendar, color: "#0EA5E9" },
  { step: "05", label: "STORE LEAD", icon: Database, color: "#10B981" },
  { step: "06", label: "HUMAN HANDOFF / REPLY", icon: Send, color: "#FF6B35" },
];

export function HeroTrace() {
  const [scenario, setScenario] = useState<Scenario>("free");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [viewJson, setViewJson] = useState(false);

  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  const stages = traceFor(scenario);
  const stage = stages[index] || stages[0];
  const playing = !paused && !reduced;
  const last = stages.length - 1;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(
      () => setIndex((i) => (i >= last ? 0 : i + 1)),
      index >= last ? 4200 : 2600,
    );
    return () => clearTimeout(timer);
  }, [playing, index, last]);

  function choose(i: number) {
    setIndex(i);
    setPaused(true);
  }

  function changeScenario(next: Scenario) {
    setScenario(next);
    setIndex(0);
  }

  return (
    <div className="border border-[#393939] bg-[#242424] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#393939] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold tracking-widest text-[#FF6B35] uppercase border border-[#FF6B35]/40 bg-[#FF6B35]/10 px-2 py-0.5">
            INTERACTIVE DEMO
          </span>
          <span className="font-mono text-[11px] text-[#B6B1A9] hidden sm:inline">
            n8n · Production Trace
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex border border-[#393939] bg-[#171717] p-0.5 text-[11px] font-mono">
            {(
              [
                ["free", "Slot free"],
                ["taken", "Slot just taken"],
              ] as const
            ).map(([s, label]) => (
              <button
                key={s}
                type="button"
                onClick={() => changeScenario(s)}
                aria-pressed={scenario === s}
                className={`px-2 py-0.5 transition-colors ${
                  scenario === s
                    ? "bg-[#FF6B35] text-white font-medium shadow-sm"
                    : "text-[#B6B1A9] hover:text-[#F5EBDD]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            disabled={reduced}
            aria-label={playing ? "Pause animation" : "Play animation"}
            className="grid size-6 place-items-center border border-[#393939] bg-[#171717] text-[#B6B1A9] transition-colors hover:text-white hover:border-[#FF6B35] disabled:opacity-40"
          >
            {playing ? <Pause className="size-2.5" aria-hidden /> : <Play className="size-2.5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Main Content: Workflow Track + Active Stage Cockpit */}
      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
        {/* Connected Node Sequence with Colorful Icons */}
        <div className="space-y-1" aria-label="Processing stages">
          {stages.map((s, i) => {
            const live = i === index;
            const done = i < index;
            const meta = WORKFLOW_STEPS[i] || {
              step: `0${i + 1}`,
              label: s.title,
              icon: MessageSquare,
              color: "#FF6B35",
            };
            const StepIcon = meta.icon;

            return (
              <div key={s.id} className="relative">
                <button
                  type="button"
                  aria-label={s.title}
                  onClick={() => choose(i)}
                  aria-current={live ? "step" : undefined}
                  className={`w-full text-left p-2 transition-all border flex items-center justify-between gap-2 ${
                    live
                      ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-md"
                      : done
                      ? "bg-[#171717] border-[#393939] text-[#F5EBDD] hover:border-[#B6B1A9]"
                      : "bg-[#171717]/70 border-[#393939]/70 text-[#B6B1A9] hover:text-[#F5EBDD]"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Vibrant Step Icon */}
                    <div
                      className={`size-6 flex-none flex items-center justify-center transition-transform ${
                        live
                          ? "bg-white text-[#FF6B35]"
                          : "border border-[#393939]"
                      }`}
                      style={{
                        backgroundColor: live ? "#FFFFFF" : `${meta.color}15`,
                        borderColor: live ? "#FFFFFF" : `${meta.color}35`,
                        color: live ? "#FF6B35" : meta.color,
                      }}
                    >
                      <StepIcon className="size-3" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`font-mono text-[9px] uppercase tracking-wider ${
                          live ? "text-white/90" : "text-[#B6B1A9]"
                        }`}
                      >
                        {meta.step} · {meta.label}
                      </p>
                      <p
                        className={`text-xs font-semibold truncate ${
                          live ? "text-white" : "text-[#F5EBDD]"
                        }`}
                      >
                        {s.title}
                      </p>
                    </div>
                  </div>

                  {live && (
                    <span className="size-1.5 bg-white rounded-full animate-ping flex-none" />
                  )}
                </button>

                {i < stages.length - 1 && (
                  <div className="flex justify-center -my-0.5">
                    <ArrowDown
                      className={`size-2.5 ${
                        live ? "text-[#FF6B35]" : "text-[#393939]"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Stage Inspector */}
        <div className="border border-[#393939] bg-[#171717] p-3.5 sm:p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 border-b border-[#393939] pb-2.5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6B35]">
                  STEP {index + 1} OF {stages.length}
                </span>
                <h2 className="font-display text-base sm:text-lg font-bold text-[#F5EBDD]">
                  {stage.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setViewJson(!viewJson)}
                className="font-mono text-[10px] text-[#B6B1A9] hover:text-[#FF6B35] border border-[#393939] px-2 py-0.5 uppercase"
              >
                {viewJson ? "Summary" : "Raw JSON"}
              </button>
            </div>

            <p className="mt-2 text-xs text-[#B6B1A9] leading-relaxed">
              {stage.caption}
            </p>

            {/* Payload View */}
            <div className="mt-3">
              {viewJson ? (
                <div className="max-h-40 overflow-y-auto">
                  <JsonView data={stage.payload} label={`Data for ${stage.title}`} />
                </div>
              ) : (
                <div className="border border-[#393939] bg-[#242424] p-2.5 text-xs font-mono space-y-1">
                  {Object.entries(stage.payload).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex flex-wrap items-baseline gap-2 border-b border-[#393939]/30 pb-0.5 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[#FF6B35] font-medium text-[11px]">
                        {k}:
                      </span>
                      <span className="text-[#F5EBDD] font-sans text-xs break-all">
                        {typeof v === "object" ? JSON.stringify(v) : String(v)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Outcome & Proof Badge */}
          <div className="mt-3 pt-2.5 border-t border-[#393939]">
            {stage.outcome ? (
              <div
                className={`p-2 text-xs font-mono flex items-center gap-2 border ${
                  stage.outcome.tone === "ok"
                    ? "border-[#FF6B35]/40 bg-[#FF6B35]/10 text-[#F5EBDD]"
                    : "border-[#E04535]/50 bg-[#E04535]/10 text-[#F5EBDD]"
                }`}
              >
                {stage.outcome.tone === "ok" ? (
                  <CheckCircle2 className="size-3.5 text-[#FF6B35] flex-none" />
                ) : (
                  <AlertTriangle className="size-3.5 text-[#E04535] flex-none" />
                )}
                <span className="text-[11px]">{stage.outcome.text}</span>
              </div>
            ) : (
              <p className="text-[10px] font-mono text-[#B6B1A9] flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#FF6B35]" />
                Validating payload against system schema.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-2 border-t border-[#393939] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#B6B1A9]">
        <span>Illustrative run with sample data</span>
        <span className="text-[#F5EBDD]">Human confirmation required</span>
      </div>
    </div>
  );
}
