import type { ProjectStatus, ImplState } from "@/data/projects";

const projectTone: Record<ProjectStatus, string> = {
  repo: "text-[#FF6B35] border-[#FF6B35]/50 bg-[#FF6B35]/10 font-mono",
  prototype: "text-[#F5EBDD] border-[#393939] bg-[#242424] font-mono",
  concept: "text-[#B6B1A9] border-[#393939] bg-[#171717] font-mono",
};

const implTone: Record<ImplState, string> = {
  built: "text-[#FF6B35] border-[#FF6B35]/50 bg-[#FF6B35]/10 font-mono",
  prototype: "text-[#F5EBDD] border-[#393939] bg-[#242424] font-mono",
  "in-progress": "text-[#F5EBDD] border-[#393939] bg-[#242424] font-mono",
  planned: "text-[#B6B1A9] border-[#393939] bg-[#171717] font-mono",
};

export function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1 text-xs font-medium uppercase tracking-wider ${projectTone[status]}`}
    >
      <span aria-hidden className="size-1.5 bg-current" />
      {label}
    </span>
  );
}

export function StateBadge({ state, label }: { state: ImplState; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${implTone[state]}`}
    >
      <span aria-hidden className="size-1.5 bg-current" />
      {label}
    </span>
  );
}
