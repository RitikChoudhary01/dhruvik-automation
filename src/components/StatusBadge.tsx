import type { ProjectStatus, ImplState } from "@/data/projects";

const projectTone: Record<ProjectStatus, string> = {
  repo: "text-leaf border-leaf/40",
  prototype: "text-amber border-amber/40",
  concept: "text-mute border-line-strong",
};

const implTone: Record<ImplState, string> = {
  built: "text-leaf border-leaf/40",
  prototype: "text-amber border-amber/40",
  "in-progress": "text-cobalt border-cobalt/40",
  planned: "text-mute border-line-strong",
};

export function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${projectTone[status]}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function StateBadge({ state, label }: { state: ImplState; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${implTone[state]}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
