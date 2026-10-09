import type { ReactNode } from "react";

function renderValue(raw: string): ReactNode {
  const v = raw.trim();
  if (v.startsWith('"')) return <span className="s">{raw}</span>;
  if (/^(true|false|null|-?\d)/.test(v)) return <span className="n">{raw}</span>;
  return <span className="s">{raw}</span>;
}

export function JsonView({ data, label = "Sample payload" }: { data: unknown; label?: string }) {
  const lines = JSON.stringify(data, null, 2).split("\n");
  return (
    <pre className="json" tabIndex={0} aria-label={label}>
      <code>
        {lines.map((line, i) => {
          const m = line.match(/^(\s*)("[^"]+"):\s?(.*)$/);
          return (
            <span key={i} className="block whitespace-pre">
              {m ? (
                <>
                  {m[1]}
                  <span className="k">{m[2]}</span>
                  {": "}
                  {renderValue(m[3])}
                </>
              ) : (
                renderValue(line)
              )}
            </span>
          );
        })}
      </code>
    </pre>
  );
}
