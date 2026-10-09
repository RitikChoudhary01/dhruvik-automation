import Link from "next/link";
import { projects } from "@/data/projects";
import { StatusBadge } from "./StatusBadge";

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="h2">Selected projects</h2>
          <p className="prose-tight mt-4">
            Every project is labelled for what it is: working code, a prototype, or a design. No
            client results are claimed because none are verified.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="panel group flex flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)] sm:p-7"
            >
              <StatusBadge status={p.status} label={p.statusLabel} />
              <h3 className="h3 mt-4 text-xl sm:text-[1.4rem]">{p.title}</h3>
              <p className="mt-2 text-mute">{p.summary}</p>

              <ol
                aria-label="Pipeline stages"
                className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-mute"
              >
                {p.pipeline.map((step, i) => (
                  <li key={step} className="flex items-center gap-1.5">
                    <span className="rounded border border-line px-1.5 py-0.5">{step}</span>
                    {i < p.pipeline.length - 1 ? <span aria-hidden>›</span> : null}
                  </li>
                ))}
              </ol>

              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-medium">Who it helps</dt>
                  <dd className="mt-1 text-mute">{p.audience}</dd>
                </div>
                <div>
                  <dt className="font-medium">The interesting problem</dt>
                  <dd className="mt-1 text-mute">{p.engineeringProblem}</dd>
                </div>
              </dl>

              <ul className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7">
                <Link
                  href={`/projects/${p.slug}`}
                  className="btn btn-ghost group/btn"
                >
                  Read the case study{" "}
                  <span aria-hidden className="transition-transform group-hover/btn:translate-x-0.5">→</span>
                </Link>
                {p.repo ? (
                  <a
                    href={p.repo}
                    className="link text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View code on GitHub
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
