import type { ArchLayer, NodeKind } from "@/data/projects";

const kindStyle: Record<NodeKind, string> = {
  io: "border-line-strong bg-surface-2",
  logic: "border-line-strong bg-surface",
  ai: "border-signal/60 bg-signal/5",
  data: "border-cobalt/60 bg-cobalt/5",
};

const legend: { kind: NodeKind; label: string }[] = [
  { kind: "io", label: "Input or output" },
  { kind: "logic", label: "Workflow logic" },
  { kind: "ai", label: "AI model" },
  { kind: "data", label: "Stored data" },
];

export function ArchitectureDiagram({ layers, title }: { layers: ArchLayer[]; title: string }) {
  return (
    <figure className="panel p-5 sm:p-6">
      <ol
        className="flex flex-col xl:flex-row xl:items-stretch"
        aria-label={`${title} architecture, in order: ${layers.map((l) => l.label).join(", ")}`}
      >
        {layers.map((layer, i) => (
          <li key={layer.label} className="flex flex-col xl:min-w-0 xl:flex-1 xl:flex-row">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-sm font-medium text-mute">{layer.label}</p>
              <ul className="flex flex-wrap gap-2 xl:flex-col">
                {layer.nodes.map((node) => (
                  <li
                    key={node.name}
                    className={`rounded-lg border px-3 py-2 text-sm leading-snug xl:w-full ${kindStyle[node.kind]} ${
                      node.planned ? "border-dashed" : ""
                    }`}
                  >
                    <span className="text-bone">{node.name}</span>
                    {node.note ? <span className="block text-xs text-mute">{node.note}</span> : null}
                    {node.planned ? <span className="block text-xs text-mute">planned</span> : null}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 ? <span aria-hidden className="arch-link my-2 xl:mx-2 xl:my-0" /> : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-mute">
        {legend.map((l) => (
          <span key={l.kind} className="inline-flex items-center gap-2">
            <span aria-hidden className={`size-3 rounded border ${kindStyle[l.kind]}`} />
            {l.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="size-3 rounded border border-dashed border-line-strong" />
          Planned, not built
        </span>
      </figcaption>
    </figure>
  );
}
