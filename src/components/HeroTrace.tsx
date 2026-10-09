"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { traceFor, type Scenario } from "@/data/trace";
import { JsonView } from "./JsonView";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function HeroTrace() {
  const [scenario, setScenario] = useState<Scenario>("free");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  const stages = traceFor(scenario);
  const stage = stages[index];
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
    <div className="panel overflow-hidden shadow-[0_30px_80px_-40px_rgb(86_212_228/0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="text-sm font-medium">Customer enquiry, step by step</p>
        <div className="flex items-center gap-2">
          <div role="group" aria-label="Scenario" className="flex rounded-lg border border-line-strong p-0.5 text-xs">
            {(
              [
                ["free", "Slot is free"],
                ["taken", "Slot just taken"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={scenario === value}
                onClick={() => changeScenario(value)}
                className={`rounded-md px-2.5 py-1.5 transition-colors ${
                  scenario === value ? "bg-surface-2 text-bone" : "text-mute hover:text-bone"
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
            className="grid size-8 place-items-center rounded-lg border border-line-strong text-mute transition-colors hover:text-bone disabled:opacity-40"
          >
            {playing ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[13.5rem_minmax(0,1fr)]">
        <ol className="relative border-b border-line p-3 md:border-b-0 md:border-r" aria-label="Processing stages">
          <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-line" />
          <span
            aria-hidden
            className="trace-fill absolute left-[1.6rem] top-6 w-px bg-signal"
            style={{ height: `calc((100% - 3rem) * ${index / last})` }}
          />
          {stages.map((s, i) => {
            const done = i < index;
            const live = i === index;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => choose(i)}
                  aria-current={live ? "step" : undefined}
                  className={`relative flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                    live ? "text-bone" : done ? "text-mute" : "text-mute/80 hover:text-bone"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`relative z-10 size-3 flex-none rounded-full border ${
                      live
                        ? "trace-dot-live border-signal bg-signal"
                        : done
                          ? "border-signal bg-ink"
                          : "border-line-strong bg-ink"
                    }`}
                  />
                  <span>{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="min-w-0 p-4 sm:p-5">
          <div key={`${scenario}-${stage.id}`} className="stage-enter">
            <h2 className="h3">{stage.title}</h2>
            <p className="mt-1 text-sm text-mute">{stage.caption}</p>
            <div className="mt-4">
              <JsonView data={stage.payload} label={`Sample data for stage: ${stage.title}`} />
            </div>
            {stage.outcome ? (
              <p
                className={`mt-3 text-sm ${stage.outcome.tone === "ok" ? "text-leaf" : "text-amber"}`}
              >
                {stage.outcome.text}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-surface-2/30 px-4 py-3">
        <p className="text-xs text-mute">
          <strong className="font-medium text-bone">Interactive Demo:</strong> This is an illustrative simulation using sample data. It is not connected to a live database or WhatsApp system.
        </p>
      </div>
    </div>
  );
}
