"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  validateContact,
  type ContactInput,
  type FieldErrors,
} from "@/lib/validation";
import { site } from "@/lib/site";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "unconfigured" }
  | { kind: "error"; message: string };

const empty: ContactInput = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
  budget: "",
  website: "",
};

const inputClass =
  "w-full rounded-none border border-[#DED6C9] bg-[#F5EBDD] px-3.5 py-2.5 text-sm font-sans text-[#24211E] placeholder:text-[#6B655D]/70 transition-colors focus:border-[#FF6B35] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6B35] aria-[invalid=true]:border-[#E04535] aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-[#E04535]";

function mailtoHref(v: ContactInput) {
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Company: ${v.company}`,
    `Type of automation: ${v.service}`,
    v.budget ? `Budget: ${v.budget}` : "",
    "",
    v.message,
  ]
    .filter((l, i, arr) => l !== "" || arr[i - 1] !== "")
    .join("\n");
  const subject = `Project inquiry: ${v.service || "Automation"}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#F5EBDD]">
        {label}
        {optional ? <span className="font-normal text-[#B6B1A9]"> (optional)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1 font-mono text-[11px] text-[#B6B1A9]">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 font-mono text-xs text-[#E04535]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    const onService = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      setValues((v) => ({ ...v, service }));
      setErrors((err) => ({ ...err, service: undefined }));
    };
    window.addEventListener("dhruvik:service", onService);
    return () => window.removeEventListener("dhruvik:service", onService);
  }, []);

  function update(key: keyof ContactInput) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setValues((v) => ({ ...v, [key]: value }));
      if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
    };
  }

  function validateField(key: keyof ContactInput) {
    const result = validateContact(values);
    setErrors((err) => ({ ...err, [key]: result.ok ? undefined : result.errors[key] }));
  }

  function props(key: keyof ContactInput, extra?: { hint?: boolean }) {
    return {
      id: `field-${key}`,
      name: key,
      value: values[key],
      onChange: update(key),
      onBlur: () => {
        if (values[key] || key === "service") validateField(key);
      },
      "aria-invalid": errors[key] ? (true as const) : undefined,
      "aria-describedby": errors[key] ? `field-${key}-error` : extra?.hint ? `field-${key}-hint` : undefined,
    };
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = (Object.keys(result.errors) as (keyof ContactInput)[])[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const json = (await res.json().catch(() => ({}))) as { fieldErrors?: FieldErrors; message?: string };

      if (res.ok) {
        setStatus({ kind: "sent" });
        setValues(empty);
      } else if (res.status === 422 && json.fieldErrors) {
        setErrors(json.fieldErrors);
        setStatus({ kind: "idle" });
      } else if (res.status === 503) {
        setStatus({ kind: "unconfigured" });
      } else {
        setStatus({
          kind: "error",
          message: json.message ?? "The message could not be sent. Try again, or use the email button below.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "The network request failed. Check your connection and try again, or use the email button below.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="border border-[#FF6B35] bg-[#242424] p-8 text-[#F5EBDD]" role="status">
        <div className="flex items-center gap-2 text-[#FF6B35] mb-2 font-mono text-xs uppercase tracking-widest font-semibold">
          <CheckCircle2 className="size-4" />
          <span>INQUIRY RECEIVED</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-[#F5EBDD]">Message sent</h3>
        <p className="mt-3 text-sm text-[#B6B1A9] leading-relaxed">
          Thanks for reaching out. I personally review every inquiry and will reply to your email address with specific scoping questions or a suggested architectural direction.
        </p>
        <button
          type="button"
          className="btn btn-secondary-dark font-mono text-xs uppercase tracking-wider rounded-none mt-6"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const busy = status.kind === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border border-[#393939] bg-[#242424] p-6 sm:p-8 space-y-5"
      aria-label="Project inquiry"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="field-name" label="Name" error={errors.name}>
          <input type="text" autoComplete="name" className={inputClass} {...props("name")} />
        </Field>
        <Field id="field-email" label="Business email" error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" className={inputClass} {...props("email")} />
        </Field>
      </div>

      <Field id="field-company" label="Company or business name" error={errors.company}>
        <input type="text" autoComplete="organization" className={inputClass} {...props("company")} />
      </Field>

      <Field id="field-service" label="Type of automation needed" error={errors.service}>
        <select className={inputClass} {...props("service")}>
          <option value="">Choose one</option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="field-message"
        label="What is the current problem?"
        error={errors.message}
        hint="What does your team do by hand, and where does it break down?"
      >
        <textarea rows={4} maxLength={2000} className={`${inputClass} resize-y`} {...props("message", { hint: true })} />
      </Field>

      <Field id="field-budget" label="Budget range" optional error={errors.budget}>
        <select className={inputClass} {...props("budget")}>
          <option value="">Prefer not to say</option>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="field-website">Leave this field empty</label>
        <input
          id="field-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update("website")}
        />
      </div>

      {status.kind === "unconfigured" ? (
        <div role="alert" className="border border-[#FF6B35]/50 bg-[#FF6B35]/10 p-4 text-xs font-mono">
          <p className="font-semibold text-[#FF6B35]">This message was not sent.</p>
          <p className="mt-1 text-[#F5EBDD]">
            Form delivery is not configured on this environment. Your text is still preserved in the form.
          </p>
          <a href={mailtoHref(values)} className="btn btn-primary rounded-none font-mono text-xs uppercase mt-3 inline-block">
            Send by email instead
          </a>
        </div>
      ) : null}

      {status.kind === "error" ? (
        <div role="alert" className="border border-[#E04535]/50 bg-[#E04535]/10 p-4 text-xs font-mono">
          <p className="font-semibold text-[#E04535]">Could not send your message.</p>
          <p className="mt-1 text-[#F5EBDD]">{status.message}</p>
          <a href={mailtoHref(values)} className="btn btn-primary rounded-none font-mono text-xs uppercase mt-3 inline-block">
            Send by email instead
          </a>
        </div>
      ) : null}

      <div className="pt-2">
        <button
          type="submit"
          className="btn btn-primary w-full !py-3.5 font-mono text-xs uppercase tracking-wider rounded-none font-semibold hover:bg-[#E85B27] transition-all flex items-center justify-center gap-2"
          disabled={busy}
        >
          <span>{busy ? "Transmitting..." : "Send project inquiry"}</span>
          <ArrowRight className="size-3.5" />
        </button>
        <p className="mt-2 text-center font-mono text-[11px] text-[#B6B1A9]">
          Direct response from Ritik within 24 hours · No spam.
        </p>
      </div>
    </form>
  );
}
