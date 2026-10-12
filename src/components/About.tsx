import Image from "next/image";
import { site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export function About() {
  return (
    <section id="about" className="bg-[#F5EBDD] text-[#24211E] py-14 sm:py-20 lg:py-28 border-b border-[#DED6C9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] items-center">
          
          {/* Left Column: Authentic Founder Photograph */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-[280px] sm:max-w-md">
            <div className="relative aspect-square w-full border border-[#DED6C9] bg-[#EAE0D0] overflow-hidden shadow-lg">
              <Image
                src="/profile_clean.png"
                alt="Ritik Choudhary, AI Automation Developer"
                fill
                className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 448px"
                priority
              />
              
              {/* Refined Metadata Strip */}
              <div className="absolute bottom-0 inset-x-0 bg-[#171717]/90 backdrop-blur-sm text-[#F5EBDD] px-4 py-2.5 flex items-center justify-between font-mono text-xs border-t border-[#393939]">
                <span className="font-medium tracking-wide">RITIK CHOUDHARY</span>
                <span className="text-[#FF6B35] font-semibold text-[11px] uppercase tracking-wider">
                  Founder &amp; Engineer
                </span>
              </div>
            </div>

            {/* Subtle Tangerine Corner Accent */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute -top-2 -left-2 size-4 border-t-2 border-l-2 border-[#FF6B35]"
            />
            <div
              aria-hidden="true"
              className="hidden sm:block absolute -bottom-2 -right-2 size-4 border-b-2 border-r-2 border-[#FF6B35]"
            />
          </div>

          {/* Right Column: Editorial Narrative & Channels */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#6B655D] mb-3">
                <span className="size-2 bg-[#FF6B35]" aria-hidden="true" />
                <span>The Person Behind The Systems</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#24211E] leading-[1.12]">
                Engineering practical solutions, one workflow at a time.
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-[1.05rem] text-[#24211E]/90 leading-relaxed">
              <p>
                I&apos;m <strong className="font-bold text-[#24211E]">Ritik Choudhary</strong>, an AI Automation Developer and B.Tech CSE (AI &amp; ML) student at SR University.
              </p>
              <p>
                I work with <strong className="font-semibold text-[#24211E]">n8n, Python, APIs, databases, and AI models</strong> to build systems that solve practical operational problems for growing businesses.
              </p>
              <p className="text-[#6B655D]">
                My approach starts with understanding the work, identifying bottlenecks, designing the workflow, and testing how it behaves when things go wrong—not just when everything goes smoothly.
              </p>
            </div>

            {/* Engineering Principles */}
            <div className="pt-2 grid sm:grid-cols-2 gap-3 font-mono text-xs text-[#24211E]">
              <div className="border border-[#DED6C9] bg-white/70 p-3.5">
                <span className="text-[#FF6B35] font-bold block mb-1 uppercase tracking-wider">
                  Practical Focus
                </span>
                <span className="text-[#6B655D]">No AI for the sake of AI. Only where it delivers real operational leverage.</span>
              </div>
              <div className="border border-[#DED6C9] bg-white/70 p-3.5">
                <span className="text-[#FF6B35] font-bold block mb-1 uppercase tracking-wider">
                  Strict Reliability
                </span>
                <span className="text-[#6B655D]">Explicit error paths, deduplication logic, and atomic database persistence.</span>
              </div>
            </div>

            {/* Social Profiles & Direct Contact Badges */}
            <div className="pt-4 border-t border-[#DED6C9]">
              <p className="font-mono text-xs uppercase tracking-widest text-[#6B655D] mb-3">
                Direct Channels &amp; Profiles:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#0A66C2]/40 bg-[#0A66C2]/10 text-[#24211E] px-3 py-1.5 font-medium hover:bg-[#0A66C2] hover:text-white transition-colors"
                >
                  <span className="size-2 rounded-full bg-[#0A66C2]" aria-hidden="true" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-3 text-[#0A66C2]" />
                </a>

                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#25D366]/50 bg-[#25D366]/15 text-[#24211E] px-3 py-1.5 font-medium hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <span className="size-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                  <span>WhatsApp: +91 72609 21049</span>
                  <ArrowUpRight className="size-3 text-[#25D366]" />
                </a>

                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#E4405F]/40 bg-[#E4405F]/10 text-[#24211E] px-3 py-1.5 hover:bg-[#E4405F] hover:text-white transition-colors"
                >
                  <span className="size-2 rounded-full bg-[#E4405F]" aria-hidden="true" />
                  <span>Instagram</span>
                  <ArrowUpRight className="size-3 text-[#E4405F]" />
                </a>

                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#1877F2]/40 bg-[#1877F2]/10 text-[#24211E] px-3 py-1.5 hover:bg-[#1877F2] hover:text-white transition-colors"
                >
                  <span className="size-2 rounded-full bg-[#1877F2]" aria-hidden="true" />
                  <span>Facebook</span>
                  <ArrowUpRight className="size-3 text-[#1877F2]" />
                </a>

                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#DED6C9] bg-white px-3 py-1.5 text-[#24211E] hover:border-[#171717] transition-colors"
                >
                  <span className="size-2 rounded-full bg-[#171717]" aria-hidden="true" />
                  <span>GitHub</span>
                  <ArrowUpRight className="size-3" />
                </a>

                {/* Work Email */}
                <a
                  href={`mailto:${site.workEmail}`}
                  className="inline-flex items-center gap-1.5 border border-[#0078D4]/40 bg-[#0078D4]/10 text-[#24211E] px-3 py-1.5 hover:bg-[#0078D4] hover:text-white transition-colors"
                >
                  <span className="size-2 rounded-full bg-[#0078D4]" aria-hidden="true" />
                  <span>Work: {site.workEmail}</span>
                  <ArrowUpRight className="size-3 text-[#0078D4]" />
                </a>

                {/* Personal Gmail */}
                <a
                  href={`mailto:${site.personalEmail}`}
                  className="inline-flex items-center gap-1.5 border border-[#EA4335]/40 bg-[#EA4335]/10 text-[#24211E] px-3 py-1.5 hover:bg-[#EA4335] hover:text-white transition-colors"
                >
                  <span className="size-2 rounded-full bg-[#EA4335]" aria-hidden="true" />
                  <span>Personal: {site.personalEmail}</span>
                  <ArrowUpRight className="size-3 text-[#EA4335]" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
