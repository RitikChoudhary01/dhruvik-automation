import Image from "next/image";
import { site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        
        {/* Left Column: Portrait */}
        <div className="flex flex-col items-center justify-start lg:items-end lg:pr-6 lg:pt-4">
          <div className="relative size-56 sm:size-64 lg:size-72 overflow-hidden rounded-full border-2 border-signal/50 shadow-[0_0_40px_-5px_rgba(86,212,228,0.3)]">
            <Image
              src="/profile_cropped.png"
              alt="Ritik Choudhary, AI Automation Developer"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 256px, 288px"
              priority
            />
          </div>
        </div>

        {/* Right Column: Story */}
        <div className="space-y-6 text-mute">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-signal">
              A little about me
            </p>
            <h2 className="h2 mt-3 text-bone">
              Building smarter systems with AI and automation.
            </h2>
          </div>

          <div className="space-y-5 text-pretty text-[1.05rem]">
            <p>
              Hi, I&apos;m Ritik Choudhary, an AI Automation Developer passionate
              about building intelligent systems that solve real-world problems.
            </p>
            <p>
              I work with AI agents, n8n, APIs, webhooks, and workflow automation
              to build solutions that streamline business operations, automate
              repetitive tasks, and improve lead management.
            </p>
            <p>
              My approach is simple: understand the problem, design the right
              workflow, build a practical solution, and continuously improve it.
            </p>
            <p>
              I&apos;m constantly learning, experimenting with new technologies,
              and turning ideas into functional projects.
            </p>
          </div>

          <div className="border-t border-line pt-6">
            <p className="font-medium text-bone mb-4">The Business Impact of Automation</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-line/50 bg-surface/50 p-3">
                <p className="text-2xl font-bold text-signal">24/7</p>
                <p className="mt-1 text-xs text-mute">Instant lead response</p>
              </div>
              <div className="rounded-lg border border-line/50 bg-surface/50 p-3">
                <p className="text-2xl font-bold text-leaf">10h+</p>
                <p className="mt-1 text-xs text-mute">Saved manually weekly</p>
              </div>
              <div className="rounded-lg border border-line/50 bg-surface/50 p-3 sm:col-span-1 col-span-2">
                <p className="text-2xl font-bold text-cobalt">0</p>
                <p className="mt-1 text-xs text-mute">Data entry errors</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="mb-5 text-[1.05rem] font-medium text-bone">
              Let&apos;s connect and build something useful.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.github}
                className="btn btn-ghost !p-2.5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href={site.linkedin}
                className="btn btn-ghost !p-2.5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={`mailto:${site.email}`} 
                className="btn btn-ghost !p-2.5"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/917260921049"
                className="btn btn-ghost !text-sm !text-leaf !border-leaf/30 hover:!bg-leaf/5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                +91 72609 21049
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
