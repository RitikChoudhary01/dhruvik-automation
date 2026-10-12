import type { ArchLayer, NodeKind } from "@/data/projects";

const kindStyle: Record<NodeKind, string> = {
  io: "border-[#393939] bg-[#242424] text-[#F5EBDD]",
  logic: "border-[#393939] bg-[#171717] text-[#F5EBDD]",
  ai: "border-[#FF6B35]/50 bg-[#FF6B35]/10 text-[#F5EBDD]",
  data: "border-[#DED6C9]/40 bg-[#242424] text-[#F5EBDD]",
};

const legend: { kind: NodeKind; label: string }[] = [
  { kind: "io", label: "Input / Output Boundary" },
  { kind: "logic", label: "Workflow Logic" },
  { kind: "ai", label: "LLM / AI Model" },
  { kind: "data", label: "Relational Persistence" },
];

export function ArchitectureDiagram({ layers, title }: { layers: ArchLayer[]; title: string }) {
  return (
    <figure className="border border-[#393939] bg-[#242424] p-5 sm:p-6">
      <ol
        className="flex flex-col xl:flex-row xl:items-stretch"
        aria-label={`${title} architecture, in order: ${layers.map((l) => l.label).join(", ")}`}
      >
        {layers.map((layer, i) => (
          <li key={layer.label} className="flex flex-col xl:min-w-0 xl:flex-1 xl:flex-row">
            <div className="min-w-0 flex-1">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[#B6B1A9]">{layer.label}</p>
              <ul className="flex flex-wrap gap-2 xl:flex-col">
                {layer.nodes.map((node) => (
                  <li
                    key={node.name}
                    className={`border px-3 py-2 text-xs leading-snug xl:w-full ${kindStyle[node.kind]} ${
                      node.planned ? "border-dashed" : ""
                    }`}
                  >
                    <span className="font-medium text-[#F5EBDD] block">{node.name}</span>
                    {node.note ? <span className="block font-mono text-[10px] text-[#B6B1A9] mt-0.5">{node.note}</span> : null}
                    {node.planned ? <span className="block font-mono text-[10px] text-[#B6B1A9]">planned</span> : null}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 ? <span aria-hidden className="arch-link my-2 xl:mx-2 xl:my-0" /> : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#393939] pt-4 font-mono text-[11px] text-[#B6B1A9]">
        {legend.map((l) => (
          <span key={l.kind} className="inline-flex items-center gap-2">
            <span aria-hidden className={`size-3 border ${kindStyle[l.kind]}`} />
            {l.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="size-3 border border-dashed border-[#393939]" />
          Planned, not built
        </span>
      </figcaption>
    </figure>
  );
}
