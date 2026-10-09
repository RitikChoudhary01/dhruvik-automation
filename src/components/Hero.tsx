import { HeroTrace } from "./HeroTrace";

const tools = ["n8n", "Python and FastAPI", "Supabase / PostgreSQL", "OpenAI and Gemini APIs", "Webhooks and REST APIs"];

export function Hero() {
  return (
    <section id="top" className="pb-12 pt-8 sm:pb-20 sm:pt-20 lg:pb-28">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12">
        <div className="relative">
          {/* Ambient Glow */}
          <div className="absolute -left-10 top-10 -z-10 h-72 w-72 rounded-full bg-signal/10 blur-[100px]" />
          <div className="absolute left-40 top-32 -z-10 h-72 w-72 rounded-full bg-cobalt/10 blur-[100px]" />

          <p className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-leaf/30 bg-leaf/5 px-3 py-1.5 text-xs font-medium text-leaf backdrop-blur-sm opacity-0">
            <span aria-hidden className="relative flex size-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-75"></span>
              <span className="relative inline-flex size-1.5 rounded-full bg-leaf"></span>
            </span>
            Open to freelance projects and full-time roles
          </p>
          <h1 className="display animate-fade-in-up delay-100 mt-8 opacity-0 max-w-[16ch]">
            Build Smarter Business Systems{" "}
            <span className="text-signal">With AI Automation.</span>
          </h1>
          <p className="lead animate-fade-in-up delay-200 mt-6 opacity-0 max-w-xl">
            I build AI agents and automated workflows that help businesses manage leads, streamline
            operations, and reduce repetitive work.
          </p>
          <p className="animate-fade-in-up delay-300 mt-4 text-sm text-mute opacity-0">
            Ritik Choudhary &mdash; AI automation developer, based in India.
          </p>
          <div className="animate-fade-in-up delay-400 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center opacity-0">
            <a href="#contact" className="btn btn-primary">
              Discuss Your Project
            </a>
            <a href="#projects" className="btn btn-ghost backdrop-blur-sm">
              Explore My Work
            </a>
          </div>
          <div className="animate-fade-in-up delay-500 mt-12 opacity-0">
            <p className="text-xs font-medium uppercase tracking-widest text-mute">Tools I build with</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tools.map((t) => (
                <li key={t} className="chip border-line-strong/50 bg-surface/50 backdrop-blur-md">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hidden lg:block animate-fade-in-up delay-500 opacity-0">
          <HeroTrace />
        </div>
        
        {/* Mobile Workflow Graphic */}
        <div className="block lg:hidden animate-fade-in-up delay-500 opacity-0 mt-2">
          <div className="panel p-5 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-signal/10 blur-[40px]" />
            <p className="text-sm font-medium mb-5 text-bone">Example: Lead Automation</p>
            <div className="space-y-5 relative before:absolute before:inset-y-0 before:left-2.5 before:w-px before:bg-line">
              <div className="flex gap-4 relative">
                <div className="size-5 rounded-full bg-surface-2 border border-line-strong flex items-center justify-center flex-none mt-0.5 z-10"><div className="size-2 rounded-full bg-mute" /></div>
                <div>
                  <p className="text-sm text-bone font-medium">1. Webhook triggered</p>
                  <p className="text-xs text-mute mt-0.5">New lead captured from website form.</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="size-5 rounded-full bg-surface border border-signal flex items-center justify-center flex-none mt-0.5 z-10"><div className="size-2 rounded-full bg-signal" /></div>
                <div>
                  <p className="text-sm text-bone font-medium">2. AI qualifies intent</p>
                  <p className="text-xs text-mute mt-0.5">LLM extracts budget and generates reply.</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="size-5 rounded-full bg-surface-2 border border-line-strong flex items-center justify-center flex-none mt-0.5 z-10"><div className="size-2 rounded-full bg-mute" /></div>
                <div>
                  <p className="text-sm text-bone font-medium">3. CRM & Team Alert</p>
                  <p className="text-xs text-mute mt-0.5">Saved to database, team pinged on Slack.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
