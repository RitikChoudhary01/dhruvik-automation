export const SERVICE_OPTIONS = [
  "AI workflow automation",
  "WhatsApp AI receptionist",
  "Lead capture and follow-up",
  "AI agent for a specific task",
  "Document processing",
  "Knowledge assistant or support bot",
  "Not sure yet",
] as const;

export const BUDGET_OPTIONS = [
  "Under $500",
  "$500 to $1,500",
  "$1,500 to $5,000",
  "$5,000 or more",
  "Not sure yet",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  budget: string;
  /** Honeypot. Real visitors never see or fill this. */
  website: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: FieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(input: Partial<Record<keyof ContactInput, unknown>>): ValidationResult {
  const data: ContactInput = {
    name: str(input.name),
    email: str(input.email),
    company: str(input.company),
    service: str(input.service),
    message: str(input.message),
    budget: str(input.budget),
    website: str(input.website),
  };
  const errors: FieldErrors = {};

  if (data.name.length < 2) errors.name = "Enter your name (at least 2 characters).";
  else if (data.name.length > 80) errors.name = "Keep your name under 80 characters.";

  if (!data.email) errors.email = "Enter your business email.";
  else if (data.email.length > 254 || !EMAIL_RE.test(data.email)) {
    errors.email = "Enter a valid email address, like name@company.com.";
  }

  if (data.company.length < 2) errors.company = "Enter your company or business name.";
  else if (data.company.length > 120) errors.company = "Keep the company name under 120 characters.";

  if (!(SERVICE_OPTIONS as readonly string[]).includes(data.service)) {
    errors.service = "Choose the type of automation you need.";
  }

  if (data.message.length < 20) {
    errors.message = "Describe the problem in at least 20 characters so I can give a useful answer.";
  } else if (data.message.length > 2000) {
    errors.message = "Keep the description under 2,000 characters.";
  }

  if (data.budget && !(BUDGET_OPTIONS as readonly string[]).includes(data.budget)) {
    errors.budget = "Choose one of the listed ranges, or leave it empty.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}
