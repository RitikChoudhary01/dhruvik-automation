import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { JsonView } from "@/components/JsonView";
import { StateBadge, StatusBadge } from "@/components/StatusBadge";
import { StepExplorer } from "@/components/StepExplorer";
import { getProject, projects, stateLabel } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} case study`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/projects/${project.slug}` },
  };
}

const toc = [
  ["overview", "Overview"],
  ["problem", "Business problem"],
  ["solution", "Solution"],
  ["architecture", "Architecture"],
  ["workflow", "Workflow"],
  ["decisions", "Engineering decisions"],
  ["edge-cases", "Edge cases and limits"],
  ["status", "What is built"],
] as const;

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pb-24 pt-10 sm:pt-14">
      <header className="wrap">
        <Link href="/#projects" className="link text-sm">
          All projects
        </Link>
        <div className="mt-6 max-w-3xl">
          <StatusBadge status={project.status} label={project.statusLabel} />
          <h1 className="display mt-5 !text-[clamp(2.1rem,5vw,3.6rem)]">{project.title}</h1>
          <p className="lead mt-5">{project.summary}</p>
        </div>

        <div className="panel mt-10 grid gap-6 p-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <p className="text-sm font-medium">Status</p>
            <p className="mt-2 text-mute">{project.statusNote}</p>
            {project.repo ? (
              <a href={project.repo} className="btn btn-ghost mt-5" target="_blank" rel="noopener noreferrer">
                View the repository on GitHub
              </a>
            ) : null}
          </div>
          <div>
            <p className="text-sm font-medium">Technology</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-medium">Who it helps</p>
            <p className="mt-2 text-sm text-mute">{project.audience}</p>
          </div>
        </div>
      </header>

      <div className="wrap mt-16 grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-24 space-y-2 border-l border-line pl-4 text-sm">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-mute transition-colors hover:text-bone">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-20">
          <section id="overview">
            <h2 className="h2">Overview</h2>
            <p className="prose-tight mt-4 text-lg">{project.overview}</p>
            <p className="mt-6 text-sm font-medium">The most interesting engineering problem</p>
            <p className="prose-tight mt-2">{project.engineeringProblem}</p>
          </section>

          <section id="problem">
            <h2 className="h2">Business problem</h2>
            <p className="prose-tight mt-4">{project.problem}</p>
          </section>

          <section id="solution">
            <h2 className="h2">{project.status === "concept" ? "Proposed solution" : "Solution"}</h2>
            <div className="mt-4 space-y-4">
              {project.solution.map((paragraph) => (
                <p key={paragraph} className="prose-tight">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section id="architecture">
            <h2 className="h2">Architecture</h2>
            <p className="prose-tight mt-4 mb-6">Read left to right, or top to bottom on small screens.</p>
            <ArchitectureDiagram layers={project.architecture} title={project.title} />
          </section>

          <section id="workflow">
            <h2 className="h2">Workflow, step by step</h2>
            <p className="prose-tight mt-4 mb-6">{project.demoNote}</p>
            <StepExplorer
              steps={project.workflow}
              note={
                project.status === "repo"
                  ? "Error messages come from the repository code. Data values are illustrative."
                  : "Illustrative sample data. Not output from a live system."
              }
            />
          </section>

          {project.sample ? (
            <section aria-labelledby="sample-heading">
              <h2 id="sample-heading" className="h3">
                {project.sample.title}
              </h2>
              <p className="prose-tight mt-2 mb-4 text-sm">{project.sample.note}</p>
              <JsonView data={project.sample.payload} label="Sample response" />
            </section>
          ) : null}

          <section id="decisions">
            <h2 className="h2">Key engineering decisions</h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {project.decisions.map((d) => (
                <div key={d.title} className="grid gap-2 py-5 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
                  <dt className="font-medium">{d.title}</dt>
                  <dd className="text-mute">{d.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="edge-cases">
            <h2 className="h2">Edge cases and limitations</h2>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="h3">{project.status === "repo" ? "Cases handled" : "Cases the design covers"}</h3>
                <ul className="mt-4 space-y-3 text-mute">
                  {project.edgeCases.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 size-1 flex-none rounded-full bg-line-strong" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="h3">Limitations</h3>
                <ul className="mt-4 space-y-3 text-mute">
                  {project.limitations.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 size-1 flex-none rounded-full bg-amber" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="status">
            <h2 className="h2">What is built and what is not</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {project.implemented.map((row) => (
                <li key={row.item} className="flex items-center justify-between gap-4 py-3.5">
                  <span>{row.item}</span>
                  <StateBadge state={row.state} label={stateLabel[row.state]} />
                </li>
              ))}
            </ul>
          </section>

          <section className="panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="h3">Need something like this?</h2>
              <p className="mt-1 text-mute">Describe your process and I&apos;ll suggest a practical approach.</p>
            </div>
            <Link href="/#contact" className="btn btn-primary">
              Discuss Your Project
            </Link>
          </section>

          <nav aria-label="Next project" className="border-t border-line pt-8">
            <p className="text-sm text-mute">Next project</p>
            <Link href={`/projects/${next.slug}`} className="h3 mt-1 inline-block transition-colors hover:text-signal">
              {next.title}
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
