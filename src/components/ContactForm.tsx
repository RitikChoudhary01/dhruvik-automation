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
  "w-full rounded-lg border border-line-strong bg-surface-2 px-3.5 py-2.5 text-[0.95rem] text-bone placeholder:text-mute/70 transition-[border-color,box-shadow] duration-150 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/30 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger/20";

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
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {optional ? <span className="font-normal text-mute"> (optional)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-mute">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-danger">
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
      <div className="panel p-6 sm:p-8" role="status">
        <h3 className="h3">Message sent</h3>
        <p className="prose-tight mt-3">
          Thanks. I&apos;ll read it and reply to the email address you gave with questions or a suggested approach.
        </p>
        <button type="button" className="btn btn-ghost mt-6" onClick={() => setStatus({ kind: "idle" })}>
          Send another message
        </button>
      </div>
    );
  }

  const busy = status.kind === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="panel space-y-5 p-6 sm:p-8" aria-label="Project inquiry">
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
        <textarea rows={5} maxLength={2000} className={`${inputClass} resize-y`} {...props("message", { hint: true })} />
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

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
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
        <div role="alert" className="rounded-lg border border-amber/40 bg-amber/5 p-4 text-sm">
          <p className="font-medium text-amber">This message was not sent.</p>
          <p className="mt-1 text-mute">
            Form delivery is not set up on this deployment yet. Your text is still in the form. Use the button below to
            send it from your own email app.
          </p>
          <a href={mailtoHref(values)} className="btn btn-ghost mt-3">
            Send by email instead
          </a>
        </div>
      ) : null}

      {status.kind === "error" ? (
        <div role="alert" className="rounded-lg border border-danger/40 bg-danger/5 p-4 text-sm">
          <p className="font-medium text-danger">Could not send your message.</p>
          <p className="mt-1 text-mute">{status.message}</p>
          <a href={mailtoHref(values)} className="btn btn-ghost mt-3">
            Send by email instead
          </a>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Sending..." : "Send project inquiry"}
        </button>
        <p className="text-xs text-mute">Your details are used only to reply to this inquiry.</p>
      </div>
    </form>
  );
}
