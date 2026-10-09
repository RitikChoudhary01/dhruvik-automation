import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
        <div>
          <h2 className="h2">Have a workflow worth automating?</h2>
          <p className="prose-tight mt-4">
            Tell me what your team does manually, where the process breaks down, and what a
            better outcome looks like. I&apos;ll suggest a practical automation approach.
          </p>

          <ul className="mt-8 space-y-3 text-[0.95rem]">
            <li className="flex items-center gap-2.5">
              <span className="text-mute">Email</span>
              <span aria-hidden className="text-line-strong">·</span>
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-mute">Client Email</span>
              <span aria-hidden className="text-line-strong">·</span>
              <a href={`mailto:${site.clientEmail}`} className="link text-signal">
                {site.clientEmail}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-mute">GitHub</span>
              <span aria-hidden className="text-line-strong">·</span>
              <a href={site.github} className="link" target="_blank" rel="noopener noreferrer">
                RitikChoudhary01
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-mute">LinkedIn</span>
              <span aria-hidden className="text-line-strong">·</span>
              <a href={site.linkedin} className="link" target="_blank" rel="noopener noreferrer">
                Ritik Choudhari
              </a>
            </li>
          </ul>

          <div className="mt-10 border-t border-line pt-6 text-sm text-mute">
            <p className="font-medium text-bone">What happens after you send this</p>
            <p className="mt-2 max-w-sm">
              I read your message, ask follow-up questions where I need them, and suggest a
              practical approach. There is no obligation to continue.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
