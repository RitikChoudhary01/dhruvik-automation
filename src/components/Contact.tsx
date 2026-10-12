import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-[#171717] text-[#F5EBDD] py-14 sm:py-20 lg:py-28 border-b border-[#393939] overflow-x-clip max-w-full">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-start min-w-0 max-w-full">
        {/* Left Column: Direct Inquiries */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B6B1A9] mb-3">
            <span className="size-2 bg-[#FF6B35]" />
            <span>START A CONVERSATION</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#F5EBDD] leading-[1.05]">
            Let&apos;s automate something that matters.
          </h2>

          <p className="text-base sm:text-lg text-[#B6B1A9] leading-relaxed max-w-xl font-normal">
            Tell me which task consumes too much time or where your current process breaks down. We&apos;ll explore a practical solution.
          </p>

          {/* Contact Methods */}
          <div className="pt-4 border-t border-[#393939] space-y-3 font-mono text-xs text-[#F5EBDD]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Mail className="size-4 text-[#0078D4] flex-none" />
              <span className="text-[#B6B1A9] text-[11px] uppercase tracking-wider">Work Email:</span>
              <a href={`mailto:${site.workEmail}`} className="text-[#F5EBDD] hover:text-[#FF6B35] transition-colors underline underline-offset-4">
                {site.workEmail}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Mail className="size-4 text-[#EA4335] flex-none" />
              <span className="text-[#B6B1A9] text-[11px] uppercase tracking-wider">Personal:</span>
              <a href={`mailto:${site.personalEmail}`} className="text-[#F5EBDD] hover:text-[#FF6B35] transition-colors underline underline-offset-4">
                {site.personalEmail}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Phone className="size-4 text-[#25D366] flex-none" />
              <span className="text-[#B6B1A9] text-[11px] uppercase tracking-wider">Direct / WhatsApp:</span>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#F5EBDD] hover:text-[#25D366] transition-colors underline underline-offset-4">
                {site.phone}
              </a>
            </div>
          </div>

          {/* Expectation Note */}
          <div className="border border-[#393939] bg-[#242424] p-4 text-xs font-mono text-[#B6B1A9]">
            <p className="text-[#F5EBDD] font-semibold uppercase text-[10px] tracking-widest text-[#FF6B35] mb-1">
              WHAT TO EXPECT
            </p>
            <p className="leading-relaxed">
              I personally review every inquiry and reply within 24 hours with scoping questions or a realistic architectural recommendation. Zero obligation.
            </p>
          </div>
        </div>

        {/* Right Column: Working Contact Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
